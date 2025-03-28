
let AdKaora = {}
AdKaora.webPageLink = 'prova.it/?tam-test'
slot = {}
slot.currentSlot = {}
slot.currentSlot.id = 'adk_pushdown'

if (AdKaora.webPageLink.includes('?tam-test', '&tam-test') && slot.currentSlot?.id === 'adk_pushdown') {
    console.log('AdKaora');
}


// cerco l'iframe del video
const iframe = document.querySelector('#player_content iframe')

if (iframe) {
    // rimuovo i listener di mouseover e mouseout
    iframe.contentWindow.document.querySelector("[onmouseout*=javascript]") ? iframe.contentWindow.document.querySelector("[onmouseout*=javascript]").setAttribute('onmouseout','') : null
    iframe.contentWindow.document.querySelector("[onmouseover*=javascript]") ? iframe.contentWindow.document.querySelector("[onmouseover*=javascript]").setAttribute('onmouseover','') : null
    // avvio il video
    iframe.contentWindow.document.querySelector('#video_player').play()
    setTimeout(() => {
        // avvio il video ancora che non si sa mai
        iframe.contentWindow.document.querySelector('#video_player').play()
    }, 5000);
}

iframe.contentWindow.alert = function(message) {
    // sovrascrivo l'alert
    console.log(message)
    setTimeout(() => {
        if (message.includes('Finito') || message.includes('INDICE')) {
            console.log('video finito, vado alla prossima slide')
            continueEvent()
        } else {
            console.log('faccio play')
            iframe.contentWindow.document.querySelector('#video_player').play()
        }
    }, 3000);
}

// Simula il mouse nella finestra per la parte degli esercizi di Debora
// va rifatta ad ogni slide evitando di passare sopra la finestra

const iframe = document.querySelector('#player_content iframe')

const div = iframe.contentWindow.document.getElementById('frame');

iframe.contentWindow.document.querySelector('button[aria-label="prossimo"]').click()
div.dispatchEvent(new MouseEvent('mouseover', {
    bubbles: true,
    cancelable: true,
    view: window,
    detail: 0,
    clientX: div.getBoundingClientRect().left,
    clientY: div.getBoundingClientRect().top,
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    metaKey: false,
    button: 0,
    relatedTarget: null
}))

// Simula il click sul pulsante avanti
// eventualmente da agganciare ad un evento di fine video (non ho avuto tempo di finirli)
iframe.contentWindow.document.querySelector('button[aria-label="prossimo"]').click()