
let AdKaora = {}
AdKaora.webPageLink = 'prova.it/?tam-test'
slot = {}
slot.currentSlot = {}
slot.currentSlot.id = 'adk_pushdown'

if (AdKaora.webPageLink.includes('?tam-test', '&tam-test') && slot.currentSlot?.id === 'adk_pushdown') {
    console.log('AdKaora');
}
