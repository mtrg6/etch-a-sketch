const gridContainer = document.getElementById('grid-container');
const colorSettingsBtn = document.querySelector('.color-settings-container');
const sizeSlider = document.getElementById('size-slider');
const colorPicker = document.getElementById('color-picker');
const colorBtn = document.getElementById('color-btn');
const clearBtn = document.getElementById('clear-btn');
const resetBtn = document.getElementById('reset-btn');
const eraserBtn = document.getElementById('eraser-btn');

const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = 'black';
const DEFAULT_SELECTION = 'color';

let currentSize = DEFAULT_SIZE;
let currentColor = DEFAULT_COLOR;
let currentSelection = DEFAULT_SELECTION;

// Create grid
function createGrid(gridSize) {
    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        gridContainer.appendChild(cell);
        cell.addEventListener('mouseover', paintGrid);
    }
}

sizeSlider.onchange = (e) => {
    currentSize = e.target.value;
    newGrid(currentSize);
}

function newGrid(newSize) {
    gridContainer.innerHTML = '';
    createGrid(newSize);
}
// ---------------------------------------------------------------------------------

// Paint grid
function paintGrid(e) {
    if (isDown) {
        if (currentSelection === 'color') {
            e.target.style.backgroundColor = currentColor;
        }
        else if (currentSelection === 'rainbow') {
            e.target.style.backgroundColor = randomColor();
        }
        else if (currentSelection === 'eraser') {
            e.target.style.backgroundColor = `rgb(255, 255, 255)`;
        }
    }
}

colorPicker.onchange = (f) => {
    currentColor = f.target.value;
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor() {
    return (`rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`);
}
// ---------------------------------------------------------------------------------

// Clear/reset functions
clearBtn.onclick = () => clear();

function clear() {
    gridContainer.innerHTML = '';
    createGrid(currentSize);
}

resetBtn.onclick = () => reset();

function reset() {
    gridContainer.innerHTML = '';
    currentSize = DEFAULT_SIZE;
    currentColor = DEFAULT_COLOR;
    createGrid(currentSize);
    defaultValues();
}
// ---------------------------------------------------------------------------------

// Other functions
// Get selection value
colorSettingsBtn.onclick = (e) => {
    let newSelection = e.target.getAttribute('data-selection');
    currentSelection = newSelection;
}

// Checks if mouse is down
let isDown = false;
gridContainer.onmouseup = () => isDown = false;
gridContainer.onmousedown = () => isDown = true;

function defaultValues() {
    colorPicker.value = 'black';
    sizeSlider.value = 16;
}
// ---------------------------------------------------------------------------------

window.onload = () => {
    createGrid(currentSize);
    defaultValues();
}