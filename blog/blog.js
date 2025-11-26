// ==UserScript==
// @name         Auto Open Comments
// @namespace    http://tampermonkey.net/
// @version      1.1
// @updateURL    https://gist.githubusercontent.com/quetzalcoatl82/28f935cb86d1fc743ba5f0a4c3db2b27/raw/gistfile1.js
// @downloadURL  https://gist.githubusercontent.com/quetzalcoatl82/28f935cb86d1fc743ba5f0a4c3db2b27/raw/gistfile1.js
// @description  try to take over the world!
// @author       You
// @match        https://www.ilpost.it/*
// @match        https://graphcomment.com/front/?url=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ilpost.it
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';
    // il primo div è finto, gli aggiungo una classe per riconoscerlo
    const fakecommenti = document.querySelector('button#showComments')
    if (fakecommenti) fakecommenti.classList.add('fake')
    let commenti = null
    const mutationObserver = new MutationObserver(() => {
        commenti = document.querySelector('button#showComments:not(.fake)')
        if (commenti) {
console.log("[RefreshSocial] Commenti trovati, attivando Intersection Observer...");
            refreshByIO(opencommenti, commenti, "0px");
            mutationObserver.disconnect(); // Disattiva il MutationObserver dopo aver trovato l'elemento
        }
    });
    // Osserva il corpo della pagina per rilevare modifiche
    mutationObserver.observe(document.body, { childList: true, subtree: true });
    let iframeDoc = null;
    function opencommenti() {
console.log(`[RefreshSocial] apro i commenti`, commenti)
        commenti.click()
    }
    function refreshByIO (runthis, target, rootMargin) {
        let options = {
            rootMargin: rootMargin || "0px"
        };
        const callback = (entries, observer) => {
            if (entries.some(entry => entry.isIntersecting)) {
console.log(`[RefreshSocial] refresh ${target.id} by intersection of ${target.id}`)
                runthis()
                observer.disconnect();
console.log(`[RefreshSocial] observer rimosso`)
            }
        };
        let obs = new IntersectionObserver(callback, options);
        obs.observe(target);
    };
    console.log(window.top)
    console.log(window.self)
    if (window.top !== window.self) {
        let css = '';
        const israel_user = ['Kaspo']
        const troll_user = ['KTG1973']
        israel_user.forEach(el => {
            css = css + `.gc-message[data-auth=${el}] .gc-meta:after{content: '✡';display: inline-block;font-weight: 600;font-size: 1em;color: #0038b8;line-height: 1em;width: 2em;text-align: center;border: .25em solid #0038b8;border-right: 0;border-left: 0;}`
        })
        troll_user.forEach(el => {
            css = css + `.gc-message[data-auth=${el}] .gc-meta:after{content:'👿';display: inline-block;font-weight: 600;font-size: 1em;line-height: 1em;width: 2em;text-align:center;}`
        })
        if (css) {
            let styleElement = GM_addStyle(css);
        }
        console.log(`[RefreshSocial] sono dentro lo script di graphcomment`)
        window.addEventListener('message', event => {
console.log('message ',event)
            if (event.origin=='https://www.ilpost.it') {
                const showmore = document.querySelectorAll('span:not(.ng-hide) > span.gc-show-more');
// console.log('I readmore sono ',showmore.length)
                if (showmore.length) {
                    showmore.forEach(el => {
                        el.click()
                    });
                }
                const firstcomment = document.querySelectorAll('.gc-node:not(.gc-node-expanded) .gc-slider-item:not(.gc-slider-item--active):first-child button')
                if (firstcomment.length) {
                    firstcomment.forEach(el => {
                        el.click()
                    });
                }
                // refresh_auth()
                refresh_auth()

                const all_buttons = document.querySelectorAll('.gc-slider-item:not([data-listening])')
                if (all_buttons.length) {
                    all_buttons.forEach(el => {
                        el.dataset.listening = true
                        el.addEventListener('click', event => {
                            const parenteId = el.closest(".gc-node").id
                            observeUntilElementExists(document.querySelector(`#${parenteId}`), ".child-comment .gc-message", () => {
                                console.log("Azione eseguita!");
                                let parente = document.querySelector(`#${parenteId}`)
console.log('mutation', parente.querySelectorAll(".child-comment .gc-message[data-auth]"))
                            });
                            //let interval = setInterval(() => {
                            //    let parente = document.querySelector(`#${parenteId}`)
                            //    if (parente.classList.contains('gc-node-expanded')) {
                            //        let comenti = parente.querySelectorAll(".child-comment .gc-message[data-auth]")
                            //        if (comenti.length) {
                            //          comenti.forEach(el => {
                            //                // remove data-auth
                            //                el.removeAttribute('data-auth')
                            //                refresh_auth()
                            //            });
                            //            clearInterval(interval)
                            //        }
                            //        console.log(comenti)
                            //    }
                            //    console.log(parente)
                            //},1500)
                            // al click tolgo tutti i data-auth figli

                        })
                    });
                }
                function refresh_auth() {
                    const all_messages = document.querySelectorAll('.gc-message:not([data-auth])')
                    if (all_messages.length) {
                        all_messages.forEach(el => {
                            let auth = el.querySelector('.gc-comment .cursor-pointer')
                            if (auth && auth.textContent) {
                                el.dataset.auth = auth.textContent.trim()
                            }
                        })
                    }
                }
                function observeUntilElementExists(target, querySelector, callback) {
                    if (!target) {
                        console.error("Target non trovato!");
                        return;
                    }

                    const observer = new MutationObserver((mutations, obs) => {
console.log(`[Observer] Target `,target);
                        for (const mutation of mutations) {
                            if (mutation.type === "childList") {
console.log(mutation);
                                console.log("A child node has been added or removed.");
                                if (target.querySelector(querySelector)) {
console.log(target.querySelector(querySelector));
                                    console.log(`[Observer] Elemento trovato con selettore "${querySelector}", eseguo callback e disconnetto`);
                                    callback();
                                    obs.disconnect(); // Disattiva l'Observer
                                    console.log("[Observer] Observer rimosso");
                                }
                            }
                        }
                    });

                    observer.observe(target, { childList: true, subtree: false });
                    console.log(`[Observer] Attivato per il target ${target}`);
                }
            }
        });
    }
})();