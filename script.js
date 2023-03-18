const gridInput = {
    gridBtn: document.querySelector('.grid__btn'),
    
    addGridInputListener: function() {
        this.gridBtn.addEventListener('click', this.gridInputControl);
    },
    
    getSizeInput: function(){
        let gridSize = prompt('Enter a whole number between 2 and 100 to create grid: ');
        return gridSize;
    },
    
    validateGridSize: function(gridSize) {
        let gridSizeNum = Number(gridSize); 
        if (!Number.isInteger(Number(gridSize))) {
            alert('Not a valid input type, please try again');
            return false;
        }
        if (gridSizeNum < 2 || gridSizeNum > 100) {
            alert(`Input number is too ${gridSizeNum < 2 ? 'low' : 'high'}, please enter a number between 2 and 100.`);
            return false;
        }
        return gridSizeNum;
    },

    clearGrid: function(){
        let gridDiv = document.querySelector('.grid__div');
        gridDiv.innerHTML = '';
        gridDiv.style.display = 'none';
    },

    gridInputControl: function() {
        let that = gridInput;
        that.clearGrid();
        let gridSize = that.getSizeInput();
        let gridSizeActual = that.validateGridSize(gridSize);
        if (gridSizeActual) gridSetup.makeGrid(gridSizeActual);
        return;
    }
}

const gridSetup = {
    gridContainer: document.querySelector('.grid__div'),
    squaresArray: [],
    
    createSquares: function(gridSize) {
        let size = gridSize * gridSize;
        this.squaresArray = [];
        for (let i = 0; i < size; i++) {
            let div = document.createElement('div');
            div.classList.add('grid__square', `grid__square--${i}`); 
            div.dataset.brightness = '100';
            this.squaresArray.push(div);
        }
    },
    
    appendSquares: function(){
        this.squaresArray.forEach(square => this.gridContainer.appendChild(square));
    },

    formatGrid: function(gridSize) {
        document.querySelector('.grid__div').style.cssText = `display: grid; grid-template-columns: repeat(${gridSize}, 1fr); grid-template-rows: repeat(${gridSize}, 1fr); border-left: 1px solid black; border-top: 1px solid black;`;
    },
    
    makeGrid: function(gridSize){
        this.createSquares(gridSize);
        this.appendSquares();
        this.formatGrid(gridSize);
    },
}

const gridHoverEvent = {
    square: document.querySelector('.grid__div'),
    
    addGridSquareListener: function(){
        this.square.addEventListener('mouseover', this.changeColorHover);
    },
    
    changeColorHover: function(e) {
        e.stopPropagation();
        
        if(e.target.classList.contains('grid__div')) return;
        
        let that = gridHoverEvent;
        let rgb = that.createRandomRGB(e);
        let brightness = Number(e.target.dataset.brightness);

        e.target.dataset.brightness = `${brightness === 0 ? 0 : brightness - 10}`;

        e.target.style.cssText = `background-color: ${rgb}; filter: brightness(${brightness}%)`

        // ***** Code below returns square to transparent on mouseout
        // e.target.addEventListener('mouseout', function(e){
        //     e.target.style.cssText = `background-color: transparent; filter: brightness(100%);`;
        // });
    },
    
    createRandomRGB: function(e) {
        let rgbArr = [];
        for(let i = 0; i < 3; i++) {
            rgbArr[i] = Math.floor(Math.random() * 225);
        }
        return `rgb(${rgbArr[0]},${rgbArr[1]},${rgbArr[2]})`;
    }
    
}
gridInput.addGridInputListener();
gridHoverEvent.addGridSquareListener();