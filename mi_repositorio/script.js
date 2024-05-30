document.addEventListener("DOMContentLoaded", function() {
    const gridSize = 12;
    const crucigramaContainer = document.getElementById('crucigrama-container');
    const cluesContainer = document.querySelector('#clues-container table');
    const checkBtn = document.getElementById('check-btn');
    const resetBtn = document.getElementById('reset-btn');

    const words = [
        { word: "ALGORITMO", clue: "Conjunto de instrucciones para resolver un problema.", startRow: 0, startCol: 0, direction: "horizontal" },
        { word: "RED", clue: "Conexión de múltiples nodos para intercambiar información.", startRow: 2, startCol: 1, direction: "vertical" },
        { word: "NEURONA", clue: "Unidad básica de una red neuronal.", startRow: 5, startCol: 2, direction: "horizontal" },
        { word: "BIGDATA", clue: "Conjunto de datos extremadamente grandes y complejos.", startRow: 4, startCol: 7, direction: "vertical" },
        { word: "MACHINE", clue: "Parte del término utilizado para describir el aprendizaje automático.", startRow: 10, startCol: 0, direction: "horizontal" },
        { word: "MODEL", clue: "Representación matemática de un proceso.", startRow: 8, startCol: 8, direction: "horizontal" },
        { word: "DEEP", clue: "Tipo de aprendizaje que utiliza redes neuronales profundas.", startRow: 7, startCol: 4, direction: "vertical" },
        { word: "PYTHON", clue: "Lenguaje de programación popular en IA.", startRow: 1, startCol: 8, direction: "vertical" },
        { word: "SUPERVISED", clue: "Tipo de aprendizaje donde el modelo se entrena con datos etiquetados.", startRow: 11, startCol: 0, direction: "horizontal" },
        { word: "CLUSTER", clue: "Agrupación de datos basada en similitudes.", startRow: 3, startCol: 5, direction: "horizontal" }
    ];

    const crucigrama = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));

    words.forEach((word, index) => {
        const { word: wordText, startRow, startCol, direction } = word;
        const clueLetterIndex = Math.floor(wordText.length / 2); // La letra de pista será la del medio
        for (let i = 0; i < wordText.length; i++) {
            const row = direction === "horizontal" ? startRow : startRow + i;
            const col = direction === "horizontal" ? startCol + i : startCol;
            crucigrama[row][col] = { letter: wordText[i], number: (i === 0 ? index + 1 : null), clue: (i === clueLetterIndex || i === wordText.length - 1) };
        }
    });

    function createGrid() {
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                if (crucigrama[i][j] === '') {
                    cell.classList.add('black');
                } else {
                    const input = document.createElement('input');
                    input.setAttribute('maxlength', '1');
                    if (crucigrama[i][j].number) {
                        const number = document.createElement('div');
                        number.classList.add('number');
                        number.textContent = crucigrama[i][j].number;
                        cell.appendChild(number);
                    }
                    if (crucigrama[i][j].clue) {
                        input.value = crucigrama[i][j].letter;
                        input.setAttribute('readonly', true);
                        input.classList.add('clue');
                    }
                    cell.appendChild(input);
                }
                crucigramaContainer.appendChild(cell);
            }
        }
    }

    function populateClues() {
        words.forEach((word, index) => {
            const row = document.createElement('tr');
            const numberCell = document.createElement('td');
            const clueCell = document.createElement('td');

            numberCell.textContent = index + 1;
            clueCell.textContent = word.clue;

            numberCell.classList.add('clue-cell');
            clueCell.classList.add('clue-cell');

            row.appendChild(numberCell);
            row.appendChild(clueCell);
            cluesContainer.appendChild(row);
        });
    }

    function checkAnswers() {
        const cells = document.querySelectorAll('.cell input');
        let correct = true;
        cells.forEach((input, index) => {
            const row = Math.floor(index / gridSize);
            const col = index % gridSize;
            if (input.value.toUpperCase() !== (crucigrama[row][col]?.letter || '')) {
                input.style.backgroundColor = '#ffdddd';
                correct = false;
            } else {
                input.style.backgroundColor = '#ddffdd';
            }
        });
        if (correct) {
            alert('¡Felicidades! Has completado el crucigrama correctamente.');
        } else {
            alert('Algunas respuestas son incorrectas. Por favor, verifica de nuevo.');
        }
    }

    function resetGame() {
        const inputs = document.querySelectorAll('.cell input');
        inputs.forEach(input => {
            if (!input.classList.contains('clue')) {
                input.value = '';
                input.style.backgroundColor = '#ddffdd';
            }
        });
    }

    checkBtn.addEventListener('click', checkAnswers);
    resetBtn.addEventListener('click', resetGame);

    createGrid();
    populateClues();
});
