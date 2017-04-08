"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var World_1 = require("../lib/World");
var Grid = (function (_super) {
    __extends(Grid, _super);
    function Grid(props) {
        var _this = _super.call(this, props) || this;
        var myWorld = new World_1.default();
        console.log(myWorld);
        _this.state = { myWorld: myWorld };
        var me = _this;
        setInterval(function () {
            // me.setState({
            // 	myWorld: myWorld.getNextState()
            // })				
            myWorld.getNextState();
            me.render();
        }, 1000);
        return _this;
    }
    Grid.prototype.render = function () {
        console.log("render");
        return (React.createElement("div", null,
            React.createElement("table", null,
                React.createElement("tbody", null, this.state.myWorld.grid.map(function (row, iRow) {
                    return (React.createElement("tr", { key: iRow }, row.map(function (col, iCol) {
                        return (React.createElement("td", { key: iCol }, col));
                    })));
                })))));
    };
    return Grid;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Grid;
