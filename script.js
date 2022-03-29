const gridContainer = document.getElementById('grid-container');
const DEFAULT_SIZE = 16;
let currentSize = DEFAULT_SIZE;

const sizeSlider = document.getElementById('size-slider');

function createGrid(gridSize) {
    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        gridContainer.appendChild(cell);
    }
}

sizeSlider.onchange = (e) => {
    let newSize = e.target.value;
    currentSize = newSize;
    newGrid(currentSize);
}

function newGrid(newSize) {
    gridContainer.innerHTML = '';
    createGrid(newSize);
}

window.onload = () => {
    createGrid(currentSize);
}