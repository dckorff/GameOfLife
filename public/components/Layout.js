"use strict";
var React = require("react");
var ReactDOM = require("react-dom");
var Canvas_1 = require("./Canvas");
var Grid_1 = require("./Grid");
ReactDOM.render(React.createElement("div", null,
    React.createElement(Grid_1.default, null),
    React.createElement(Canvas_1.default, null)), document.getElementById("app"));
