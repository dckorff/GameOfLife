import Rules from './Rules';

export default class World {

	size: number;
	grid: Array<Array<number>>;
	newGrids: Array<Array<Array<number>>>;
	// onNewGridFunctions: Array<function>;

	constructor(){

		let size: number = 10;

		this.grid = this.getGrid(size);

		this.newGrids = [];

		let initialState = this.getRandomState(size);

		this.applyState(this.grid, initialState);

		this.onNewGridFunctions = [];

		//this.grid[1][1] = 1;

	}

	getGrid(size): Array<Array<number>>{

		let grid = [];

		for(let iRow = 0; iRow < size; iRow++){
			
			let cols = [];

			for(let iCol = 0; iCol < size; iCol++){
				cols.push(0);
			}

			grid.push(cols);
			
		}

		return grid;

	}

	getNeighbors(grid, x, y){

		let startX = x-1;
		let endX = x+1;
		let startY = y-1;
		let endY = y+1;

		let points = [];
		for( let ix = startX; ix <= endX; ix++ ){
			if(ix < 0){ continue; }
			if(ix >= grid.length) { continue; }
			for(let iy = startY; iy <= endY; iy++){
				if(iy < 0){ continue; }
				if(iy >= grid.length) { continue; }
				if(!(ix == x && iy == y)){
					//points.push([ix,iy]);	
					points.push( {x: ix, y: iy} );
				}				
			}
		}

		// console.log(x, y, points);
		
		return points;		

	}

	getRandomState(size){
		
		// random number of 1's (how many ones)		
		let min = 0;
		let max = size - 1;
		// let numberOfOnes = Math.floor(Math.random() * (max - min)) + min;
		let numberOfOnes = 50;


		// for each, get a random row and col
		let onePoints = [];
		for(let i = 0; i <= numberOfOnes; i++){
			let point = {
				x: Math.floor(Math.random() * (max - min)) + min,
				y: Math.floor(Math.random() * (max - min)) + min
			}
			onePoints.push(point);
		}

		return onePoints;

	}

	applyState(grid, onePoints){
		onePoints.forEach( point => {
			grid[point.x][point.y] = 1;
		});
	}

	getNextState(){

		console.log("getNextState");

		let me = this;

		//let nextGrid = 
		// console.log("before grid:")
		// console.log(this.grid);

		let newGrid = [];

		this.grid.forEach( (row, iRow) => {

			newGrid.push([]);

			row.forEach( (cell, iCol) => {
				
				let neighbors = me.getNeighbors(me.grid, iRow, iCol);
				
				// console.log('neighbors');
				// console.log(neighbors);

				//let livingNeighbors = neighbors.filter( neighbor => ( neighbor == 1 ) ).length;
				let livingNeighbors = neighbors.filter( neighbor => {
					// console.log('me.grid[neighbor.x][neighbor.y]');
					// console.log("value=" + me.grid[neighbor.x][neighbor.y]);
					return me.grid[neighbor.x][neighbor.y] == 1 
				}).length;

				// if(livingNeighbors > 0){					
				// 	console.log('livingNeighbors')
				// 	console.log(livingNeighbors)
				// }

				newGrid[iRow].push(me.grid[iRow][iCol]);

				// Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
				if( (cell == 1) && (livingNeighbors < 2) ){ newGrid[iRow][iCol] = 0; return; }

				// Any live cell with two or three live neighbours lives on to the next generation.
				if( (cell == 1) && ((livingNeighbors == 2) || (livingNeighbors == 3)) ){ newGrid[iRow][iCol] = 0; return; }

				// Any live cell with more than three live neighbours dies, as if by overpopulation.
				if( (cell == 1) && (livingNeighbors > 3) ){ newGrid[iRow][iCol] = 0; return; }

				// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
				if( (cell == 0) && (livingNeighbors == 3) ){ newGrid[iRow][iCol] = 1; return; }

			});

		});

		this.grid = newGrid;


		// console.log("after grid:")
		// console.log(newGrid);
		
		// this.newGrids.push(newGrid);


		// this.grid = nextGrid;

		this.onNewGrid();

	}

	addOnNewGrid(func){
		this.onNewGridFunctions.push(func);
	}

	onNewGrid(){
		
		console.log("onNewGrid");
		console.log(this.onNewGridFunctions);

		let me = this;
		this.onNewGridFunctions.forEach( func => func(me) );
	}

	play(){
		let me = this;
		this._playIntervalId = setInterval( function(){
			me.getNextState();
		}, 1000 )
	}

	stop(){		
		clearInterval(this._playIntervalId);
		this._playIntervalId = false;

	}

	isPlaying(){
		// console.log('isPlaying')
		// console.log(this._playIntervalId)
		// console.log(!this._playIntervalId)
		return !!this._playIntervalId;
	}

}