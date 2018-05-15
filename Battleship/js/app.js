// UNIT 1 PROJECT -- TRENTON MARKS

$(()=>{

    /*======== CLASSES FOR USER AND AI SHIPS AND GAMEBOARDS ========*/
    // Class for both User and AI ships
    class Ship {
        constructor(size) {
            this.size = size;
        }
        getSize() {
            return this.size;
        }
    }

    // Class for both User and AI gameboard
    class Map {
        constructor(rows, columns, containerSelector, isUserMap) {
            this.rows = rows;
            this.columns = columns;
            this.ships = [];
            this.matrix = [];
            this.hits = 0;
            this.hitsToWin = 0;
            this.containerSelector = containerSelector;
            this.isUserMap = isUserMap;

            this.generateMatrix();
            this.draw();
        }
        // Creates a matrix to allow for coordinates
        generateMatrix() {
            let newRow;
            for (let row = 0; row < this.rows; row++) {
                newRow = [];
                for (let column = 0; column < this.columns; column++) {
                        newRow.push('e');
                }
                this.matrix.push(newRow);
            }
        }
        // Sets up allowing opponents to fire on the other's gameboard
        setOpponent(map) {
            this.opponent = map;
        }
        // Gets rows
        getRows() {
            return this.rows;
        }
        // Gets columns
        getColumns() {
            return this.columns;
        }
        // Returns a random number between 0 and 1
        getRandomNumber(size) {
            return Math.floor(Math.random() * size) + 1;
        }
        // Randomly selects if a ship is vertical or horizontal
        // The do/while loop eliminates the rows/columns a ship cannot be placed based on the ship's orientation (vertical/horizontal) and size
        generateCoordinates(ship) {
            let startLocation;
            let startRow;
            let startColumn;
            let coordinates;
            let isVertical = !!this.getRandomNumber(1);
            do {
                if (isVertical) {
                    startRow = this.getRandomNumber(this.getRows() - ship.getSize() - 1);
                    startColumn = this.getRandomNumber(this.getColumns() - 1);
                } else {
                    startRow = this.getRandomNumber(this.getRows() - 1);
                    startColumn = this.getRandomNumber(this.getColumns() - ship.getSize() - 1);
                }
                startLocation = [startRow, startColumn];
                coordinates = this.generateCoordinatesFromStartLocation(startLocation, ship.getSize(), isVertical);
            }
            while (!this.coordinatesAreValid(coordinates));

            return coordinates;
        }
        // Adds the ship's coordinates to the matrix
        addShipCoordinatesToMatrix(coordinates) {
            coordinates.forEach(coordinate => {
                this.matrix[coordinate[0]][coordinate[1]] = 'o';
            });
        }
        // Generates starting coordinates
        generateCoordinatesFromStartLocation(startLocation, size, isVertical) {
            let coordinates = [];
            let row = startLocation[0];
            let column = startLocation[1];

            for (let i = 0; i < size; i++) {
                if (isVertical) {
                    coordinates.push([row + i, column]);
                } else {
                    coordinates.push([row, column + i]);
                }
            };
            return coordinates;
        }
        // Pushes the coordinates of the ship into an array
        addShip(ship) {
            const coordinates = this.generateCoordinates(ship);
            this.ships.push(ship);
            this.addShipCoordinatesToMatrix(coordinates);
            this.hitsToWin += ship.getSize();
            this.draw();
        }
        // Determines if a square is occupied and valid to place ship
        coordinatesAreValid (coordinates) {
            let isValid = true;

            coordinates.forEach((coordinate) => {
                if (this.squareIsOccupied(coordinate[0], coordinate[1])) {
                        isValid = false;
                }
            });
            return isValid;
        }
        // If a square is occupied it will be classified as 'o'
        squareIsOccupied(row, column) {
            return this.matrix[row][column] == 'o';
        }
        // If a square is empty it will be classified as 'e'
        squareIsEmpty(row, column) {
            return this.matrix[row][column] == 'e';
        }
        // If a square has been hit it will be classified as 'h'
        squareHasBeenHit(row, column) {
            return this.matrix[row][column] == 'h';
        }
        // If a square has been targeted but was unoccupied, it will be 'm'
        squareHasBeenMissed(row, column) {
            return this.matrix[row][column] == 'm';
        }
        // If a square has been targeted, it will either have been 'h' or 'm'
        squareHasBeenTargeted(row, column) {
            return this.squareHasBeenHit(row, column) || this.squareHasBeenMissed(row, column);
        }
        // Removes the board and replaces a gameover message
        drawLost () {
            $(this.containerSelector).empty().append('<h1>You Lost</h1>').append('<a href="">Play Again</a>');
        }
        // Proccesss shot
        // If the targeted square was occupied, it will be classified as an 'h' and will increment the number of times the board has been hit by 1
        // If it was unoccupied, it will be classified as a 'm'
        // If the number of times the board has been hit has reached 9, the gameover message will be displayed
        processShot(row, column) {
            if (this.squareIsOccupied(row, column)) {
                this.matrix[row][column] = 'h';
                this.hits++;
            } else {
                this.matrix[row][column] = 'm';
            }
            if (this.hits == this.hitsToWin) {
                this.drawLost();
            } else {
                this.draw();
            }
            console.log(this);
        }
        // Randomly selects a single square from the opponents board to target
        // Processes the shot for the targeted square
        aiShot() {
            let row;
            let column;

            do {
                row = this.getRandomNumber(this.getRows() - 1);
                column = this.getRandomNumber(this.getColumns() - 1);
            } while (this.squareHasBeenTargeted(row, column));
            this.processShot(row, column);
        }
        // Sets up the user's shot to be ready to process
        // Helps for reading and comprehending the code
        userShot(row, column) {
            this.processShot(row, column);
        }
        // Method that draws the board after each action that takes placed on it
        // Uses a 'for-loop' nested within another 'for-loop' to create boards
        // Adds classes to square: 'occupied', 'hit', 'miss'
        draw() {
            const $board = $('<div>')
                .addClass('board');
            for (let row = 0; row < this.getRows(); row++) {
                let $row = $('<div>')
                    .addClass('row');

                for (let column = 0; column < this.getColumns(); column++) {
                    let $column = $('<div>')
                        .addClass('column');

                    if(this.squareIsOccupied(row, column) && this.isUserMap) {
                        // $column.removeClass('untargeted');
                        $column.addClass('occupied');
                    }
                    if (this.squareHasBeenHit(row, column)) {
                        // $column.removeClass('untargeted');
                        $column.addClass('hit');
                    }
                    if (this.squareHasBeenMissed(row, column)) {
                        // $column.removeClass('untargeted');
                        $column.addClass('miss');
                    }
                    // If NOT the users map, square is targeted upon user click
                    // The AI automatically shots right after the user's shot is processed
                    if (!this.isUserMap && !this.squareHasBeenMissed(row, column) && !this.squareHasBeenHit(row, column)) {

                        $column.mouseenter(()=>{
                            $column.css({
                                'background-color': 'white'
                            });
                        });
                        $column.mouseleave(()=>{
                            $column.css({
                                'background-color': '#bfc5cc'
                            });
                        });

                        $column.click(()=>{
                            this.userShot(row, column);
                            this.opponent.aiShot(row, column);
                        });
                    }
                    $row.append($column);
                }
                $board.append($row);
            }
            // Redraws the boards upon each shot
            $(this.containerSelector).empty();
            $board.appendTo(this.containerSelector);
            // Unveiling the console log will reveal how many times the boards are redrawn
            // console.log('draw');
        }
    };


    /*======== START BUTTON ========*/
    // Mouseenter
    $('#start').mouseenter(()=>{
        $('#start').css({
            'color': 'lightblue',
            'border-color': 'lightblue',
            'background-color': 'rgba(0, 0, 0, 0.5)'

        });
    });
    // Mouseleave
    $('#start').mouseleave(()=>{
        $('#start').css({
            'color': 'white',
            'border-color': 'white',
            'background-color': 'transparent'
        });
    });
    // On Click
    $('#start').one('click', ()=>{

        $('#start').remove();


        /*======== USER AND AI'S INSTANTIATED GAMEBOARDS ========*/
        // User's map
        const userMap = new Map(5, 5, '.user-container', true);

        // AI's map
        const aiMap = new Map(5, 5, '.ai-container', false);
        // Sets maps as opponents to one another
        userMap.setOpponent(aiMap);
        aiMap.setOpponent(userMap);

        /*======== USER AND AI'S INSTANTIATED SHIPS ========*/
        // User's ships
        const userLargeShip = new Ship(4);
        const userMediumShip = new Ship(3);
        const userSmallShip = new Ship(2);

        // AI's ships
        const aiLargeShip = new Ship(4);
        const aiMediumShip = new Ship(3);
        const aiSmallShip = new Ship(2);


        /*======== ADDING SHIPS TO BOARDS ========*/
        // Adding ships to user gameboard
        userMap.addShip(userLargeShip);
        userMap.addShip(userMediumShip);
        userMap.addShip(userSmallShip);

        // Adding ships to AI gameboard
        aiMap.addShip(aiLargeShip);
        aiMap.addShip(aiMediumShip);
        aiMap.addShip(aiSmallShip);
    });
});
