
export default class World {

	size: number;
	grid: Array<Array<number>>;
	oldGrids: Array<Array<Array<number>>>;
	onNewGridFunctions: Array<Function>;
	_playIntervalId: number;

    private GRID_SIZE = 100;

	constructor(){

		this.initializeGrid();
        this.onNewGridFunctions = [];

    }

    private initializeGrid(){
        this.grid = this.buildNewGrid(this.GRID_SIZE);

		this.oldGrids = [];

		let initialState = this.getRandomState(this.GRID_SIZE);

		this.applyState(this.grid, initialState);

    }

	private buildNewGrid(size): Array<Array<number>>{

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

	private getNeighbors(grid, x, y){

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
					points.push( {x: ix, y: iy} );
				}
			}
		}

		return points;

	}

	private getRandomState(size){

		let min = 0;
		let max = size - 1;
		let numberOfOnes = 2000;

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

	private applyState(grid, onePoints){
		onePoints.forEach( point => {
			grid[point.x][point.y] = 1;
		});
	}

	private getNextState(){

		let me = this;

		let newGrid = [];

		this.grid.forEach( (row, iRow) => {

			newGrid.push([]);

			row.forEach( (cell, iCol) => {

				let neighbors = me.getNeighbors(me.grid, iRow, iCol);

				let livingNeighbors = neighbors.filter( neighbor => {
					return me.grid[neighbor.x][neighbor.y] == 1
				}).length;

				newGrid[iRow].push(me.grid[iRow][iCol]);

				// Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
				if( (cell == 1) && (livingNeighbors < 2) ){ newGrid[iRow][iCol] = 0; return; }

				// Any live cell with two or three live neighbours lives on to the next generation.
				if( (cell == 1) && ((livingNeighbors == 2) || (livingNeighbors == 3)) ){ newGrid[iRow][iCol] = 1; return; }

				// Any live cell with more than three live neighbours dies, as if by overpopulation.
				if( (cell == 1) && (livingNeighbors > 3) ){ newGrid[iRow][iCol] = 0; return; }

				// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
				if( (cell == 0) && (livingNeighbors == 3) ){ newGrid[iRow][iCol] = 1; return; }

			});

		});

		this.grid = newGrid;

		this.onNewGrid();

	}

	public addOnNewGrid(func){
		this.onNewGridFunctions.push(func);
	}

	public onNewGrid(){
		let me = this;
		this.onNewGridFunctions.forEach( func => func(me) );
	}

	public play(){
		let me = this;
		this._playIntervalId = setInterval( function(){
			me.getNextState();
		}, 50 )
	}

	public stop(){
		clearInterval(this._playIntervalId);
		this._playIntervalId = 0;
	}

	public isPlaying(){
		return !!this._playIntervalId;
    }

    public reset(){
        this.initializeGrid();
    }

}