const makeGrid = {
    gridContainer: document.querySelector('.grid__div'),
    squaresArray: [],
    createSquares: function() {
        for (let i = 0; i < 16; i++) {
            let div = document.createElement('div');
            div.classList.add('grid__square', `grid__square--${i}`); 
            this.squaresArray.push(div);
        }
    },
    appendSquares: function(){
        this.squaresArray.forEach(square => this.gridContainer.appendChild(square));
    },
    setGrid: function(){
        this.createSquares();
        this.appendSquares();
    },
}

const listenEvents = {
    squaresList: document.querySelector('.grid__div').childNodes,
    addListeners: function() {
        this.squaresList.forEach(square => square.addEventListener('mouseover', this.changeColorHover));
    },
    changeColorHover: function(e) {
        e.target.classList.add('grid__square--hover');
        e.target.addEventListener('mouseout', function(e){
            e.target.classList.remove('grid__square--hover');
        });
    }
}


makeGrid.setGrid();
listenEvents.addListeners();