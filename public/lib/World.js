"use strict";
var World = (function () {
    function World() {
        var size = 10;
        this.grid = this.getGrid(size);
        var initialState = this.getRandomState(size);
        this.applyState(this.grid, initialState);
        //this.grid[1][1] = 1;
    }
    World.prototype.getGrid = function (size) {
        var grid = [];
        for (var iRow = 0; iRow < size; iRow++) {
            var cols = [];
            for (var iCol = 0; iCol < size; iCol++) {
                cols.push(0);
            }
            grid.push(cols);
        }
        return grid;
    };
    World.prototype.getNeighbors = function (grid, x, y) {
        var startX = x - 1;
        var endX = x + 1;
        var startY = y - 1;
        var endY = y + 1;
        var points = [];
        for (var ix = startX; ix <= endX; ix++) {
            if (ix < 0) {
                continue;
            }
            if (ix >= grid.length) {
                continue;
            }
            for (var iy = startY; iy <= endY; iy++) {
                if (iy < 0) {
                    continue;
                }
                if (iy >= grid.length) {
                    continue;
                }
                if (!(ix == x && iy == y)) {
                    points.push([ix, iy]);
                }
            }
        }
        // console.log(x, y, points);
        return points;
    };
    World.prototype.getRandomState = function (size) {
        // random number of 1's (how many ones)		
        var min = 0;
        var max = size - 1;
        var numberOfOnes = Math.floor(Math.random() * (max - min)) + min;
        // for each, get a random row and col
        var onePoints = [];
        for (var i = 0; i <= numberOfOnes; i++) {
            var point = {
                x: Math.floor(Math.random() * (max - min)) + min,
                y: Math.floor(Math.random() * (max - min)) + min
            };
            onePoints.push(point);
        }
        return onePoints;
    };
    World.prototype.applyState = function (grid, onePoints) {
        onePoints.forEach(function (point) {
            grid[point.x][point.y] = 1;
        });
    };
    World.prototype.getNextState = function () {
        console.log("getNextState");
        var me = this;
        //let nextGrid = 
        console.log("before grid:");
        console.log(this.grid);
        var newGrid = [];
        this.grid.forEach(function (row, iRow) {
            newGrid.push([]);
            row.forEach(function (cell, iCol) {
                var neighbors = me.getNeighbors(me.grid, iRow, iCol);
                //console.log(neighbors);
                var livingNeighbors = neighbors.filter(function (neighbor) { return (neighbor == 1); }).length;
                // Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
                if ((cell == 1) && (livingNeighbors < 2)) {
                    newGrid[iRow].push(0);
                    return;
                }
                // Any live cell with two or three live neighbours lives on to the next generation.
                if ((cell == 1) && ((livingNeighbors == 2) || (livingNeighbors == 3))) {
                    cell = 0;
                    return;
                }
                // Any live cell with more than three live neighbours dies, as if by overpopulation.
                if ((cell == 1) && (livingNeighbors > 3)) {
                    cell = 0;
                    return;
                }
                // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
                if ((cell == 0) && (livingNeighbors == 3)) {
                    cell = 1;
                    return;
                }
            });
        });
        console.log("after grid:");
        console.log(this.grid);
        // this.grid = nextGrid;
    };
    return World;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = World;
