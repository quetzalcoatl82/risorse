// Dati dell'applicazione
const appData = {
    // Elenco delle persone con i loro veti (locali che non gradiscono)
    people: [
        { id: 1, name: "Matilde", vetos: ["ramen"] },
        { id: 2, name: "GG", vetos: [] },
        { id: 3, name: "Ilaria", vetos: ["non-veg"] },
        { id: 4, name: "Federico", vetos: [] },
        { id: 5, name: "Stefano", vetos: ["sushi","ginocchia-problem"] },
        { id: 6, name: "Marco", vetos: [] },
        { id: 7, name: "Lore", vetos: [] },
        { id: 8, name: "Martina", vetos: [] }
    ],
    
    // Elenco dei locali con le loro caratteristiche
    places: [
        { id: 1, name: "Ammu", type: "italiano", features: ["pasta","tradizionale","cannoli", "siciliano"] },
        { id: 2, name: "Olimpico", type: "italiano", features: ["pasta","arrabbiata"] },
        { id: 3, name: "Eppol", type: "italiano", features: ["pasta", "tradizionale"] },
        { id: 4, name: "Eppolino", type: "italiano", features: ["pasta", "tradizionale"] },
        { id: 5, name: "Eppol Pie", type: "italiano", features: ["pasta", "tradizionale","ginocchia-problem"] },
        { id: 6, name: "Brolo", type: "italiano", features: ["pasta","tradizionale","veg-only"] },
        { id: 7, name: "Bun Burgers", type: "fast-food", features: ["hamburger", "patatine"] },
        { id: 8, name: "Nun", type: "fast-food", features: ["kebab"] },
        { id: 9, name: "Crocca", type: "pizza", features: ["forno a legna"] }
    ],
    
    // Tag mood per orientare la scelta
    moodTags: [
        { id: 1, name: "Piccante", related: ["piccante", "speziato", "messicano", "indiano"] },
        { id: 2, name: "Tradizionale", related: ["tradizionale", "italiano", "pasta"] },
        { id: 3, name: "Fast", related: ["fast-food", "street food", "kebab", "hamburger"] },
        { id: 4, name: "Esotico", related: ["asiatico", "sushi", "cinese", "indiano"] },
        { id: 5, name: "Comfort food", related: ["pizza", "pasta", "hamburger"] }
    ]
};

// Funzioni dell'applicazione
document.addEventListener('DOMContentLoaded', () => {
    // Riferimenti agli elementi DOM
    const peopleListElement = document.getElementById('people-list');
    const moodTagsElement = document.getElementById('mood-tags');
    const findPlaceButton = document.getElementById('find-place');
    const resetButton = document.getElementById('reset');
    const resultPanel = document.getElementById('result-panel');
    const resultElement = document.getElementById('result');
    const tryAgainButton = document.getElementById('try-again');

    // Inizializza l'applicazione
    init();

    // Event listeners
    findPlaceButton.addEventListener('click', findPlace);
    resetButton.addEventListener('click', resetSelection);
    tryAgainButton.addEventListener('click', () => {
        resultPanel.classList.add('hidden');
    });

    // Funzione di inizializzazione
    function init() {
        // Popola la lista delle persone
        appData.people.forEach(person => {
            const personDiv = document.createElement('div');
            personDiv.className = 'checkbox-item';
            personDiv.innerHTML = `
                <input type="checkbox" id="person-${person.id}" data-id="${person.id}">
                <label for="person-${person.id}">${person.name}</label>
            `;
            peopleListElement.appendChild(personDiv);
        });
        
        // Popola i tag mood
        appData.moodTags.forEach(tag => {
            const tagSpan = document.createElement('span');
            tagSpan.className = 'tag-item';
            tagSpan.textContent = tag.name;
            tagSpan.dataset.id = tag.id;
            tagSpan.addEventListener('click', () => {
                tagSpan.classList.toggle('selected');
            });
            moodTagsElement.appendChild(tagSpan);
        });
    }

    // Funzione per trovare un posto dove mangiare
    function findPlace() {
        // Ottieni le persone selezionate
        const selectedPeople = getSelectedPeople();
        
        if (selectedPeople.length === 0) {
            alert('Seleziona almeno una persona!');
            return;
        }

        // Ottieni i mood selezionati
        const selectedMoods = getSelectedMoods();
        
        // Trova i posti possibili (escludendo i veti e considerando i mood)
        const possiblePlaces = findPossiblePlaces(selectedPeople, selectedMoods);
        
        if (possiblePlaces.length === 0) {
            resultElement.innerHTML = '<p class="no-result">Non è stato trovato nessun posto compatibile con le preferenze e i mood selezionati!</p>';
        } else {
            // Seleziona un posto a caso
            const randomPlace = possiblePlaces[Math.floor(Math.random() * possiblePlaces.length)];
            resultElement.innerHTML = `
                <h3>${randomPlace.name}</h3>
                <p>Tipo: ${randomPlace.type}</p>
                <p>Caratteristiche: ${randomPlace.features.join(', ')}</p>
            `;
        }
        
        // Mostra il pannello dei risultati
        resultPanel.classList.remove('hidden');
    }

    // Funzione per ottenere le persone selezionate
    function getSelectedPeople() {
        const checkboxes = document.querySelectorAll('#people-list input[type="checkbox"]:checked');
        return Array.from(checkboxes).map(checkbox => {
            const personId = parseInt(checkbox.dataset.id);
            return appData.people.find(person => person.id === personId);
        });
    }
    
    // Funzione per ottenere i mood selezionati
    function getSelectedMoods() {
        const selectedTags = document.querySelectorAll('#mood-tags .tag-item.selected');
        return Array.from(selectedTags).map(tag => {
            const tagId = parseInt(tag.dataset.id);
            return appData.moodTags.find(mood => mood.id === tagId);
        });
    }

    // Funzione per trovare i posti possibili in base ai veti delle persone selezionate e ai mood
    function findPossiblePlaces(selectedPeople, selectedMoods) {
        // Crea una lista di tutti i veti delle persone selezionate
        const allVetos = [];
        selectedPeople.forEach(person => {
            allVetos.push(...person.vetos);
        });

        // Filtra prima in base ai veti
        let filteredPlaces = appData.places.filter(place => {
            // Controlla se il tipo del locale è nella lista dei veti
            if (allVetos.includes(place.type)) {
                return false;
            }
            // Controlla anche se una delle caratteristiche del locale è nella lista dei veti
            for (const feature of place.features) {
                if (allVetos.includes(feature)) {
                    return false;
                }
            }
            return true;
        });
        
        // Se ci sono mood selezionati, filtra ulteriormente
        if (selectedMoods.length > 0) {
            // Crea una lista di tutte le caratteristiche legate ai mood selezionati
            const moodRelatedFeatures = [];
            selectedMoods.forEach(mood => {
                moodRelatedFeatures.push(...mood.related);
            });
            
            // Filtra i posti che hanno almeno una caratteristica o tipo legato ai mood selezionati
            filteredPlaces = filteredPlaces.filter(place => {
                // Controlla se il tipo del locale è legato ai mood
                if (moodRelatedFeatures.includes(place.type)) {
                    return true;
                }
                // Controlla se almeno una delle caratteristiche del locale è legata ai mood
                for (const feature of place.features) {
                    if (moodRelatedFeatures.includes(feature)) {
                        return true;
                    }
                }
                return false;
            });
        }
        
        return filteredPlaces;
    }

    // Funzione per resettare la selezione
    function resetSelection() {
        // Reset delle persone
        const checkboxes = document.querySelectorAll('#people-list input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Reset dei mood
        const tags = document.querySelectorAll('#mood-tags .tag-item');
        tags.forEach(tag => {
            tag.classList.remove('selected');
        });
        
        // Nascondi i risultati
        resultPanel.classList.add('hidden');
    }
});