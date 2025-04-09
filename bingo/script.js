// Configuration
const config = {
    centerImage: 'icon.png'
};

// Function to shuffle array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to get random strings for the grid
function getRandomStrings(count) {
    const shuffled = shuffleArray([...bingoStrings]);
    return shuffled.slice(0, count);
}

// Function to create the bingo grid
function createBingoGrid() {
    const grid = document.getElementById('bingoGrid');
    grid.innerHTML = '';

    // Get 24 random strings (we need 24 because the center is free)
    const randomStrings = getRandomStrings(24);
    let stringIndex = 0;

    // Create 5x5 grid
    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            const cell = document.createElement('div');
            cell.className = 'bingo-cell';

            // Check if it's the center cell
            if (row === 2 && col === 2) {
                cell.classList.add('center');
                cell.style.setProperty('--center-image', `url('${config.centerImage}')`);
            } else {
                const item = randomStrings[stringIndex++];
                const title = document.createElement('div');
                title.className = 'title';
                title.textContent = item.title;
                
                const subtitle = document.createElement('div');
                subtitle.className = 'subtitle';
                subtitle.textContent = item.subtitle;
                
                cell.appendChild(title);
                cell.appendChild(subtitle);
                
                cell.addEventListener('click', () => {
                    cell.classList.toggle('selected');
                });
            }

            grid.appendChild(cell);
        }
    }
}

// Function to change the center image
function changeCenterImage(newImage) {
    config.centerImage = newImage;
    const centerCell = document.querySelector('.bingo-cell.center');
    if (centerCell) {
        centerCell.style.setProperty('--center-image', `url('${newImage}')`);
    }
}

// Initialize the game
document.addEventListener('DOMContentLoaded', () => {
    createBingoGrid();
}); 