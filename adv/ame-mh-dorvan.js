class AmeMh extends HTMLElement {
    
    constructor() {
        super();
    }

    // AME_MH_CUSTOM_EVENTS_START
    static dispatchMhEvent(targetEl, eventName, detail) {
        if (!targetEl || typeof targetEl.dispatchEvent !== "function") return;
        targetEl.dispatchEvent(
            new CustomEvent(eventName, {
                bubbles: true,
                composed: true,
                detail: detail || {},
            })
        );
    }

    dispatchMhEvent(eventName, detail) {
        AmeMh.dispatchMhEvent(this, eventName, detail);
    }

    static isSlotEmptyFallback(slotEl) {
        if (!slotEl) return true;
        return slotEl.querySelectorAll("iframe, img").length === 0;
    }

    static isDesktopViewport() {
        // Stesso discrimine del CSS: min-width 1000px => flx-mh, sotto => flx-skin-mob
        return document.documentElement.clientWidth >= 1000;
    }

    static getMhSlotElementId() {
        return AmeMh.isDesktopViewport() ? "flx-mh" : "flx-skin-mob";
    }

    static getMhSlotEl(root) {
        const scope = root || document;
        return scope.querySelector("#" + AmeMh.getMhSlotElementId());
    }

    static updateMhHeightFromSlot(root, eventSize) {
        const slotEl = AmeMh.getMhSlotEl(root);
        let height = 0;
        let source = null;

        if (slotEl) {
            height = slotEl.offsetHeight || 0;
            if (height) source = "dom";
        }
        if (!height && Array.isArray(eventSize) && eventSize.length >= 2) {
            height = Number(eventSize[1]) || 0;
            if (height) source = "gpt-event.size";
        }
        if (!height || height <= 0) return 0;

        console.log("[mh2021] [FLOW] update --altezzaMh2021", {
            height,
            source,
            slotElementId: AmeMh.getMhSlotElementId(),
            eventSize,
            isDesktop: AmeMh.isDesktopViewport(),
        });

        document.documentElement.style.setProperty("--altezzaMh2021", height + "px");
        return height;
    }

    static startStripAnimationOnce() {
        if (window.__ameMhDorvanStripAnimationStarted || window.stripanimationrun) return;
        window.__ameMhDorvanStripAnimationStarted = true;

        setTimeout(() => {
            const started = AmeMh.strip_animation();
            if (started === false) {
                window.__ameMhDorvanStripAnimationStarted = false;
            }
        }, 100);
    }
    // AME_MH_CUSTOM_EVENTS_END

    connectedCallback() {
        // AME_MH_CUSTOM_EVENTS_START
        if (!this._mhConsoleEventsTestRegistered) {
            try {
                if (localStorage.getItem("mh2021Debug")) {
                    this._mhConsoleEventsTestRegistered = true;
                    const el = this;
                    const logEv = (name) => (ev) => console.log("[mh2021] [EVENT] " + name, ev && ev.detail ? ev.detail : undefined);
                    el.addEventListener('ame-mh:state-fixed', logEv('ame-mh:state-fixed'));
                    el.addEventListener('ame-mh:state-defixed', logEv('ame-mh:state-defixed'));
                    el.addEventListener('ame-mh:slot-onload', logEv('ame-mh:slot-onload'));
                    el.addEventListener('ame-mh:slot-empty', logEv('ame-mh:slot-empty'));
                    el.addEventListener('ame-mh:slot-filled', logEv('ame-mh:slot-filled'));
                }
            } catch (e) {
                // localStorage non disponibile
            }
        }
        // AME_MH_CUSTOM_EVENTS_END

        this.config();

        //added class on selector-wrapper
        document.querySelector(this.selectorWrapper).classList.add('mh2021Page');
    }

    config() {
        //css
        let style = document.createElement("style");
        style.textContent = this.style();
        this.appendChild(style);
        
        //appendo il markup
        this.insertAdjacentHTML('beforeend', this.template())

        // Altezza iniziale: 250px desk / 33vw mobile (senza media query, così non resta sticky da GPT)
        document.documentElement.style.setProperty(
            "--altezzaMh2021",
            AmeMh.isDesktopViewport() ? "250px" : "33vw"
        );

        // CLS Fix scroll
        this.fixCLSScroll();

        //js
        this.js();
    }

    template() {
        let template = `
            <div id="mh2021" class="mhInView dorvan-slot">
                <div id="flx-mh" class="mh2021Strip mh2021Strip-desktop adv strip"></div>
                <div id="flx-skin-mob" class="mh2021Strip mh2021Strip-mobile adv strip"></div>
            </div>
            <div id="mh2021Fake"></div>
        `;
        return template;
    }

    style() {

        let css = `
            :root {
                --altezzaMh2021: 33vw;
                --bgMh2021: #fff;
                --bgMh2021Page: #fff;
            }
            #mh2021 {
                height: var(--altezzaMh2021);
                width: 100vw;
                position: fixed;
                top: 0;
                left: 0;
                overflow: hidden;
            }
            #mh2021.mhForeground {
                z-index: 9999;
                pointer-events: none;
            }
            #mh2021Fake {
                height: var(--altezzaMh2021);
                width: 90vw;
                position: absolute;
                top: 0;
                left: 5vw;
                overflow: hidden;
                z-index: -100;
            }
            .mh2021Page {
                margin-top: 0;
                transition: margin 300ms ease-in-out;
                position: relative;
                z-index: 1;
                ${ (window.getComputedStyle(document.querySelector(this.selectorWrapper)).backgroundColor == "rgba(0, 0, 0, 0)") ? 'background:var(--bgMh2021Page);' : ''}
            }
            .mh2021Strip {
                width: 100vw;
                max-height: var(--altezzaMh2021);
                overflow: hidden;
                background: ${(this.bgMh) ? this.bgMh : 'var(--bgMh2021)'};
                display: flex;
                justify-content: center;
                align-items: flex-start;
                pointer-events: all;
            }
            .mh2021Strip-desktop {
                display: none;
            }
            .mh2021Strip-mobile {
                display: flex;
            }
            @media all and (min-width: 1000px) {
                .mh2021Strip-desktop {
                    display: flex;
                }
                .mh2021Strip-mobile {
                    display: none;
                }
            }
            #bottomStrip2021 {
                width: 100vw;
                height: 100px;
                position: fixed;
                bottom: -100px;
                left: 0;
                display: flex;
                justify-content: center;
                align-items: start;
                z-index: 99999;
                background-color: rgba(255,255,255,.8);
                transform: translateY(0);
                transition: transform 50ms ease-in-out;
            }
            #bottomStrip2021 > div {
                display: flex;
                justify-content: center;
                align-items: center;
            }
        `;

        return css;
    }

    fixCLSScroll() {
        setTimeout(function(){
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            console.log('Fix cls scroll',scrollTop);
            if(parseInt(scrollTop) <= 50) {
                window.scrollTo(0, 1);
            }
        },1500);
    }

    js() {
        window.googletag = window.googletag || { cmd: [] };

        // AME_MH_CUSTOM_EVENTS_START
        const mhSlotElementId = AmeMh.getMhSlotElementId();
        const mhSlotEl = AmeMh.getMhSlotEl(this);

        if (mhSlotElementId && mhSlotEl && !this._mhSlotOnloadListenerRegistered) {
            this._mhSlotOnloadListenerRegistered = true;
            const self = this;
            let didDispatchSlotOnload = false;

            window.googletag.cmd.push(() => {
                if (!window.googletag || typeof window.googletag.pubads !== "function") return;
                const pubads = window.googletag.pubads();

                let listenerOnload = null;
                let listenerRenderEnded = null;

                const dispatchFromSlot = (slot, slotElementId, isEmpty, eventSize) => {
                    if (didDispatchSlotOnload) return;
                    didDispatchSlotOnload = true;

                    const sizes = slot && typeof slot.getSizes === "function" ? slot.getSizes() : undefined;

                    if (!isEmpty) {
                        AmeMh.updateMhHeightFromSlot(self, eventSize);
                    }

                    self.dispatchMhEvent("ame-mh:slot-onload", {
                        mhContainerId: "mh2021",
                        slotElementId,
                        isEmpty,
                        sizes,
                    });

                    if (isEmpty) {
                        self.dispatchMhEvent("ame-mh:slot-empty", {
                            mhContainerId: "mh2021",
                            slotElementId,
                            sizes,
                        });
                    } else {
                        self.dispatchMhEvent("ame-mh:slot-filled", {
                            mhContainerId: "mh2021",
                            slotElementId,
                            sizes,
                        });
                        AmeMh.startStripAnimationOnce();
                    }

                    try {
                        if (typeof pubads.removeEventListener === "function") {
                            if (listenerOnload) pubads.removeEventListener("slotOnload", listenerOnload);
                            if (listenerRenderEnded) pubads.removeEventListener("slotRenderEnded", listenerRenderEnded);
                        }
                    } catch (e) {
                        // noop
                    }
                };

                const computeIsEmpty = (event, slot) => {
                    if (event && typeof event.isEmpty === "boolean") return event.isEmpty;
                    if (slot && typeof slot.getResponseInformation === "function") {
                        const respInfo = slot.getResponseInformation();
                        if (respInfo && typeof respInfo.isEmpty === "boolean") return respInfo.isEmpty;
                    }
                    return AmeMh.isSlotEmptyFallback(AmeMh.getMhSlotEl(self));
                };

                listenerOnload = (event) => {
                    const slot = event && event.slot;
                    if (!slot || typeof slot.getSlotElementId !== "function") return;
                    const slotElementId = slot.getSlotElementId();
                    if (slotElementId !== mhSlotElementId) return;
                    dispatchFromSlot(slot, slotElementId, computeIsEmpty(event, slot), event && event.size);
                };

                listenerRenderEnded = (event) => {
                    const slot = event && event.slot;
                    if (!slot || typeof slot.getSlotElementId !== "function") return;
                    const slotElementId = slot.getSlotElementId();
                    if (slotElementId !== mhSlotElementId) return;
                    dispatchFromSlot(slot, slotElementId, computeIsEmpty(event, slot), event && event.size);
                };

                pubads.addEventListener("slotOnload", listenerOnload);
                pubads.addEventListener("slotRenderEnded", listenerRenderEnded);

                setTimeout(() => {
                    if (didDispatchSlotOnload) return;
                    const isEmpty = AmeMh.isSlotEmptyFallback(AmeMh.getMhSlotEl(self));
                    dispatchFromSlot(null, mhSlotElementId, isEmpty);
                }, 4000);
            });
        }
        // AME_MH_CUSTOM_EVENTS_END
    }

    get selectorWrapper() {
        return this.getAttribute('selector-wrapper');
    }
    
    get bgMh() {
        return this.getAttribute('bg-mh');
    }

    get disableStrip() {
        return this.getAttribute('disable-strip');
    }

    //strip_animation start
    static strip_animation() {

        let ameMhElement        = document.querySelector('ame-mh'),
            getEnableEvents     = ameMhElement.getAttribute('enable-events'),
            getDisableStrip     = ameMhElement.getAttribute('disable-strip'),
            getViewTimeLimit    = Number(ameMhElement.getAttribute('view-time-limit')),
            getFirstDelay       = Number(ameMhElement.getAttribute('first-delay'));
            
        let debug = 1,
            viewTimeLimit = (getViewTimeLimit && getViewTimeLimit != "") ? getViewTimeLimit : 5000,
            firstDelay = (getFirstDelay && getFirstDelay != "") ? getFirstDelay : 3000;

        let mh = document.getElementById("mh2021"),
            mhFake = document.getElementById("mh2021Fake"),
            page = document.querySelector('.mh2021Page'),
            strip = AmeMh.getMhSlotEl(mh),
            paddingStrip = document.querySelector("#padding-strip"),
            flyFirstMobile = document.getElementById('flyfirst-mobile-placement'),
            
            mhIntersection,
            pageSpacedInTop = 0,
            stripH = strip ? strip.offsetHeight || 0 : 0;

        if (debug == 1) localStorage.setItem("mh2021Debug", 1);

        let log = (msg, val) => {
            if (localStorage.getItem("mh2021Debug"))
            console.log("[mh2021] - " + msg, val);
        };

        if (stripH == 0) {
            log("Strip ad altezza 0 -> return false");
            return false;
        }

        if (typeof window.stripanimationrun !== "undefined") {
            console.warn(
            "[mh2021] - ATTENZIONE! Strip animation richiamata più volte!"
            );
            return false;
        }
        window.stripanimationrun = 1;

        if (getEnableEvents == "true") {
            if (window.gtag) {
                gtag("event", "Start", {
                    event_category: "mh2021",
                    event_label: document.location.href,
                    non_interaction: true,
                });
            } else if (window.ga) {
                ga('send', 'event', "mh2021", "Start", document.location.href, {
                    nonInteraction: true
                });
            } else {}
        }

        let mh2021PageInTopView = (motivo) => {
            log("mh2021PageInTopView", motivo); //log del motivo per cui do margine superiore alla pagina
            observer.disconnect();
            let mhH = strip ? strip.offsetHeight : 0;
            if(mhH <= 50) mhH = 0; //fix per webview fb. Per qualche motivo gira la strip_animation sulla 3x1. Impediamo di mettere margine alla pagina se non c'è uno slot consistente e 50px dovrebbero essere safe.
            let padding = 0
            // se c'è il blocco di padding aggiungo anche quello all'altezza
            if (paddingStrip) padding = paddingStrip.offsetHeight;
            page.style.marginTop = mhH + padding + "px";
            pageSpacedInTop = 1;

            if (getEnableEvents == "true") {
                if (window.gtag) {
                    gtag("event", motivo, {
                        event_category: "mh2021",
                        event_label: document.location.href,
                        non_interaction: true,
                    });
                } else if (window.ga) {
                    ga('send', 'event', "mh2021", motivo, document.location.href, {
                        nonInteraction: true
                    });
                } else {}
            }
            
            /*document.body.removeEventListener('click',mh2021PageInTopView); //DA RIABILITARE IN CUI SI RIATTIVI L'INTERAZIONE UTENTE
            document.body.removeEventListener('keypress',mh2021PageInTopView);*/
        };

        //check iniziale
        setTimeout(() => {
            if (mhIntersection) {
                console.log('top view');
                mh2021PageInTopView("In top view all'inizio");
            }
        }, firstDelay + 100);

        //fix
        setTimeout(() => {
            console.log('top view');
            log("Fix inizio", performance.now());
            mh.classList.add("mhForeground");
            // AME_MH_CUSTOM_EVENTS_START
            AmeMh.dispatchMhEvent(ameMhElement, "ame-mh:state-fixed", {
                mhContainerId: "mh2021",
                slotElementId: AmeMh.getMhSlotElementId(),
                reason: "fix_timer",
            });
            // AME_MH_CUSTOM_EVENTS_END
            if (paddingStrip && strip) {
                paddingStrip.style.setProperty('--margin-top-adv', strip.offsetHeight + 'px');
            }

        }, firstDelay + 400);

        //defix
        setTimeout(() => {
            log("Defix", performance.now());
            mh.classList.remove("mhForeground");
            // AME_MH_CUSTOM_EVENTS_START
            AmeMh.dispatchMhEvent(ameMhElement, "ame-mh:state-defixed", {
                mhContainerId: "mh2021",
                slotElementId: AmeMh.getMhSlotElementId(),
                reason: "defix_timer",
            });
            // AME_MH_CUSTOM_EVENTS_END
        }, firstDelay + viewTimeLimit + 400);

        //callback observer
        let cbMh = (entries, observer) => {
            entries.forEach((entry) => {
            if (entry.isIntersecting) {
                if (pageSpacedInTop == 0 && mhIntersection == false) {
                    mh2021PageInTopView("Ritorno in top view");
                }
                mhIntersection = true;
            } else {
                mhIntersection = false;
            }
            });
        };

        //opzioni observer
        let optObs = {
            rootMargin: "0px",
            threshold: 1,
        };

        //dichiarazione observer
        let observer = new IntersectionObserver(cbMh, optObs);

        //start observer
        log("Start observer", "");
        observer.observe(mhFake);

    }
}
customElements.define("ame-mh", AmeMh);
