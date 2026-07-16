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
        return document.documentElement.clientWidth > 1000;
    }

    static getMhSlotElementId() {
        return AmeMh.isDesktopViewport() ? "flx-mh" : "flx-skin-mob";
    }

    static getMhSlotEl(root) {
        const scope = root || document;
        return scope.querySelector("#" + AmeMh.getMhSlotElementId());
    }

    static syncMhSlotVisibility(root) {
        const scope = root || document;
        const desktopSlot = scope.querySelector("#flx-mh");
        const mobileSlot = scope.querySelector("#flx-skin-mob");
        const showDesktop = AmeMh.isDesktopViewport();

        if (desktopSlot) desktopSlot.style.display = showDesktop ? "flex" : "none";
        if (mobileSlot) mobileSlot.style.display = showDesktop ? "none" : "flex";
    }

    static getHeightFromGptSizes(sizes, eventSize) {
        // Preferisci sempre la size effettivamente renderizzata.
        if (Array.isArray(eventSize) && eventSize.length >= 2) {
            const h = Number(eventSize[1]);
            if (h > 0) return h;
        }
        if (eventSize && typeof eventSize.getHeight === "function") {
            const h = Number(eventSize.getHeight()) || 0;
            if (h > 0) return h;
        }

        if (!sizes) return 0;

        const list = Array.isArray(sizes) ? sizes : [sizes];
        // Evita di prendere il max di tutte le size configurate: usiamo solo se ne esiste una sola.
        if (list.length !== 1) return 0;

        const size = list[0];
        if (Array.isArray(size) && size.length >= 2) return Number(size[1]) || 0;
        if (size && typeof size.getHeight === "function") return Number(size.getHeight()) || 0;
        if (size && typeof size.height === "number") return size.height;
        return 0;
    }

    static getFallbackMhHeight() {
        const gptH = Number(window.__ameMhDorvanGptHeight) || 0;
        if (gptH > 0) return gptH;
        return AmeMh.isDesktopViewport() ? 250 : Math.round(window.innerWidth * 0.33) || 120;
    }

    static rememberGptSlotHeight(height, source) {
        const h = Number(height) || 0;
        if (h <= 0) return 0;
        window.__ameMhDorvanGptHeight = h;
        document.documentElement.style.setProperty("--altezzaMh2021", h + "px");
        try {
            if (localStorage.getItem("mh2021Debug")) {
                console.log("[mh2021] [FLOW] set --altezzaMh2021 from GPT", { height: h, source });
            }
        } catch (e) {
            // noop
        }
        return h;
    }

    static getSlotRenderedHeight(slotEl) {
        if (!slotEl) return Number(window.__ameMhDorvanGptHeight) || 0;

        let mediaHeight = 0;
        try {
            const media = slotEl.querySelectorAll("iframe, img, video, object, embed, div, ins");
            media.forEach((el) => {
                const rectH = el.getBoundingClientRect ? el.getBoundingClientRect().height : 0;
                const attrH = Number(el.getAttribute("height")) || 0;
                const h = Math.max(el.offsetHeight || 0, el.clientHeight || 0, rectH || 0, attrH || 0);
                if (h > mediaHeight) mediaHeight = h;
            });
        } catch (e) {
            // noop
        }

        const slotRectH = slotEl.getBoundingClientRect ? slotEl.getBoundingClientRect().height : 0;
        const mh = document.getElementById("mh2021");
        const containerH = mh ? Math.max(mh.offsetHeight || 0, mh.getBoundingClientRect().height || 0) : 0;
        const gptH = Number(window.__ameMhDorvanGptHeight) || 0;

        return Math.max(
            slotEl.offsetHeight || 0,
            slotEl.scrollHeight || 0,
            slotRectH || 0,
            mediaHeight || 0,
            containerH || 0,
            gptH || 0
        );
    }

    static updateMhHeightFromSlot(root, gptHeight) {
        if (gptHeight && gptHeight > 0) {
            return AmeMh.rememberGptSlotHeight(gptHeight, "updateMhHeightFromSlot");
        }

        const slotEl = AmeMh.getMhSlotEl(root);
        if (!slotEl) return Number(window.__ameMhDorvanGptHeight) || 0;

        const slotHeight = AmeMh.getSlotRenderedHeight(slotEl);
        if (!slotHeight || slotHeight <= 0) return 0;
        document.documentElement.style.setProperty("--altezzaMh2021", slotHeight + "px");
        return slotHeight;
    }

    static startStripAnimationOnce(reason) {
        if (window.__ameMhDorvanStripAnimationStarted || window.stripanimationrun) return;
        window.__ameMhDorvanStripAnimationStarted = true;

        const tryStart = (attempt) => {
            const ameMh = document.querySelector("ame-mh");
            AmeMh.updateMhHeightFromSlot(ameMh);

            const strip = AmeMh.getMhSlotEl(ameMh);
            const stripH = AmeMh.getSlotRenderedHeight(strip);

            if (stripH > 0) {
                try {
                    if (localStorage.getItem("mh2021Debug")) {
                        console.log("[mh2021] [FLOW] start strip_animation", {
                            reason,
                            attempt,
                            stripH,
                            gptHeight: window.__ameMhDorvanGptHeight || 0,
                            slotElementId: AmeMh.getMhSlotElementId(),
                        });
                    }
                } catch (e) {
                    // localStorage non disponibile
                }
                const started = AmeMh.strip_animation();
                if (started !== false) return;
            }

            // Su desk il DOM Dorvan può restare a height 0 anche con creative filled:
            // dopo pochi tentativi forziamo un'altezza GPT/default e avviamo comunque il fix.
            if (attempt >= 5) {
                const forcedH = AmeMh.getFallbackMhHeight();
                AmeMh.rememberGptSlotHeight(forcedH, "forced-fallback");
                const started = AmeMh.strip_animation();
                if (started !== false) return;
            }

            if (attempt >= 40) {
                window.__ameMhDorvanStripAnimationStarted = false;
                try {
                    if (localStorage.getItem("mh2021Debug")) {
                        console.warn("[mh2021] [GUARD] strip_animation aborted: strip height still 0", {
                            reason,
                            slotElementId: AmeMh.getMhSlotElementId(),
                            gptHeight: Number(window.__ameMhDorvanGptHeight) || 0,
                        });
                    }
                } catch (e) {
                    // noop
                }
                return;
            }

            setTimeout(() => tryStart(attempt + 1), 100);
        };

        setTimeout(() => tryStart(0), 50);
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
        this._onViewportChange = () => AmeMh.syncMhSlotVisibility(this);
        window.addEventListener("resize", this._onViewportChange);

        //added class on selector-wrapper
        document.querySelector(this.selectorWrapper).classList.add('mh2021Page');
    }

    disconnectedCallback() {
        if (this._onViewportChange) {
            window.removeEventListener("resize", this._onViewportChange);
        }
    }

    config() {
        //css
        let style = document.createElement("style");
        style.textContent = this.style();
        this.appendChild(style);
        
        //appendo il markup
        this.insertAdjacentHTML('beforeend', this.template())
        AmeMh.syncMhSlotVisibility(this);

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
                min-height: 100%;
                height: 100%;
                max-height: none;
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
            @media all and (min-width: 1000px) {
                :root {
                    --altezzaMh2021 : 250px;
                }
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

                const dispatchFromSlot = (slot, slotElementId, isEmpty, source, eventSize) => {
                    if (didDispatchSlotOnload) return;
                    didDispatchSlotOnload = true;

                    const sizes = slot && typeof slot.getSizes === "function" ? slot.getSizes() : undefined;
                    const gptHeight = AmeMh.getHeightFromGptSizes(sizes, eventSize);

                    if (!isEmpty && gptHeight > 0) {
                        AmeMh.rememberGptSlotHeight(gptHeight, source);
                    }

                    self.dispatchMhEvent("ame-mh:slot-onload", {
                        mhContainerId: "mh2021",
                        slotElementId,
                        isEmpty,
                        sizes,
                        source,
                        gptHeight,
                    });

                    if (isEmpty) {
                        self.dispatchMhEvent("ame-mh:slot-empty", {
                            mhContainerId: "mh2021",
                            slotElementId,
                            sizes,
                            source,
                        });
                    } else {
                        AmeMh.updateMhHeightFromSlot(self, gptHeight);
                        self.dispatchMhEvent("ame-mh:slot-filled", {
                            mhContainerId: "mh2021",
                            slotElementId,
                            sizes,
                            source,
                            gptHeight,
                        });
                        AmeMh.startStripAnimationOnce(source || "slot-filled");
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

                // Preferiamo slotRenderEnded: su desk l'altezza è più affidabile dopo il render.
                // slotOnload resta come fallback se renderEnded non arriva.
                listenerOnload = (event) => {
                    const slot = event && event.slot;
                    if (!slot || typeof slot.getSlotElementId !== "function") return;
                    const slotElementId = slot.getSlotElementId();
                    if (slotElementId !== mhSlotElementId) return;

                    setTimeout(() => {
                        if (didDispatchSlotOnload) return;
                        dispatchFromSlot(
                            slot,
                            slotElementId,
                            computeIsEmpty(event, slot),
                            "slotOnload",
                            event && event.size
                        );
                    }, 300);
                };

                listenerRenderEnded = (event) => {
                    const slot = event && event.slot;
                    if (!slot || typeof slot.getSlotElementId !== "function") return;
                    const slotElementId = slot.getSlotElementId();
                    if (slotElementId !== mhSlotElementId) return;

                    const isEmpty = computeIsEmpty(event, slot);
                    const gptHeight = AmeMh.getHeightFromGptSizes(
                        slot && typeof slot.getSizes === "function" ? slot.getSizes() : undefined,
                        event && event.size
                    );
                    if (!isEmpty && gptHeight > 0) {
                        AmeMh.rememberGptSlotHeight(gptHeight, "slotRenderEnded");
                    } else if (!isEmpty) {
                        AmeMh.updateMhHeightFromSlot(self);
                    }
                    dispatchFromSlot(slot, slotElementId, isEmpty, "slotRenderEnded", event && event.size);
                };

                pubads.addEventListener("slotOnload", listenerOnload);
                pubads.addEventListener("slotRenderEnded", listenerRenderEnded);

                setTimeout(() => {
                    if (didDispatchSlotOnload) return;
                    const isEmpty = AmeMh.isSlotEmptyFallback(AmeMh.getMhSlotEl(self));

                    let slotObj = null;
                    try {
                        const slots = typeof pubads.getSlots === "function" ? pubads.getSlots() : [];
                        slotObj = Array.isArray(slots)
                            ? slots.find(s => s && typeof s.getSlotElementId === "function" && s.getSlotElementId() === mhSlotElementId)
                            : null;
                    } catch (e) {
                        // noop
                    }

                    if (!isEmpty) {
                        AmeMh.updateMhHeightFromSlot(self);
                    }
                    dispatchFromSlot(slotObj, mhSlotElementId, isEmpty, "fallback-timer");
                }, 4000);
            });
        }
        // AME_MH_CUSTOM_EVENTS_END

        // if (this.disableStrip != "true" && !document.querySelector('.no-strip-mobile')) {
        //     let fallback = () => {
        //         setTimeout(() => {  
        //             //fallback solo se non c'è una flyingpush che sta girando
        //             if (document.getElementById('flyfirst-mobile-placement')) {
        //                 if(document.getElementById('flyfirst-mobile-placement').childNodes.length == 0) {
        //                     startStripMobile("fallback timer");
        //                 } else {
        //                     console.log('[strip mobile 2021] fallback fallita per presenza flyfirst')
        //                 }
        //             } else {
        //                 startStripMobile("fallback timer");
        //             }
        //         }, 20000);
        //     };

        //     postTcfReady(fallback);
        // }
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
            stripH = AmeMh.getSlotRenderedHeight(strip);

        if (debug == 1) localStorage.setItem("mh2021Debug", 1);

        let log = (msg, val) => {
            if (localStorage.getItem("mh2021Debug"))
            console.log("[mh2021] - " + msg, val);
        };

        if (stripH == 0) {
            log("Strip ad altezza 0 -> return false");
            window.__ameMhDorvanStripAnimationStarted = false;
            return false;
        }

        // Allinea il container MH all'altezza reale dello slot desk/mobile.
        document.documentElement.style.setProperty("--altezzaMh2021", stripH + "px");

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
            let mhH = AmeMh.getSlotRenderedHeight(strip);
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
                paddingStrip.style.setProperty('--margin-top-adv', AmeMh.getSlotRenderedHeight(strip) + 'px');
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

            // if (getDisableStrip != "true" && !document.querySelector('.no-strip-mobile')) {
            //     if (flyFirstMobile) {
            //         if(flyFirstMobile.childNodes.length == 0) {
            //             setTimeout(() => {
            //                 startStripMobile("mh fixed");
            //             }, 1000);
            //         }
            //     }
            // }
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