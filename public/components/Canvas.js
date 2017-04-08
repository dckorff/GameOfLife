"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
// This doesn't work:
//import BABYLON from 'babylonjs';
// This makes the typedefs work, but we still need to manually include/load the babylon.js file
require("babylonjs");
var Canvas = (function (_super) {
    __extends(Canvas, _super);
    function Canvas() {
        var _this = _super.call(this) || this;
        _this.state = {
            grid: _this.getInitialGrid()
        };
        return _this;
    }
    Canvas.prototype.getInitialGrid = function () {
        var size = 10;
        var grid = [];
        for (var iRow = 0; iRow < 10; iRow++) {
            var row = [];
            for (var iCol = 0; iCol < 10; iCol++) {
                row.push(0);
            }
            grid.push(row);
        }
        return grid;
    };
    Canvas.prototype.getSquare = function () {
        return BABYLON.Mesh.CreateDisc("disc", 1, 4, this.scene, true);
    };
    Canvas.prototype.componentDidMount = function () {
        // This begins the creation of a function that we will 'call' just after it's built
        var createScene = function (engine) {
            // Now create a basic Babylon Scene object 
            var scene = new BABYLON.Scene(engine);
            // Change the scene background color to gray.
            scene.clearColor = new BABYLON.Color3(200, 200, 200);
            // This creates and positions a free camera
            var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -50), scene);
            // This targets the camera to scene origin
            camera.setTarget(BABYLON.Vector3.Zero());
            // This attaches the camera to the canvas
            camera.attachControl(canvas, false);
            // var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 100, BABYLON.Vector3.Zero(), scene);
            // This creates a light, aiming 0,1,0 - to the sky.
            var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
            // Dim the light a small amount
            light.intensity = 0.7;
            // Let's try our built-in 'sphere' shape. Params: name, subdivisions, size, scene
            // var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);
            // Move the sphere upward 1/2 its height
            //sphere.position.y = 1;
            var sphere1 = BABYLON.Mesh.CreateSphere("Sphere1", 10.0, 6.0, scene);
            var sphere2 = BABYLON.Mesh.CreateSphere("Sphere2", 2.0, 7.0, scene);
            var sphere3 = BABYLON.Mesh.CreateSphere("Sphere3", 10.0, 8.0, scene);
            sphere1.position.x = -40;
            sphere2.position.x = -30;
            var materialSphere3 = new BABYLON.StandardMaterial("texture1", scene);
            // materialSphere1.alpha = 0.5;
            // materialSphere1.diffuseColor = new BABYLON.Color3(1.0, 0.2, 0.7);
            materialSphere3.diffuseTexture = new BABYLON.Texture("vendor/babylon/grass.jpg", scene);
            sphere3.material = materialSphere3;
            // Create a gray plane
            // Params: name, width, depth, subdivisions, scene
            var ground = BABYLON.Mesh.CreateGround("ground1", 10, 6, 2, scene);
            // var precision = {
            //     "w" : 2,
            //     "h" : 2
            // };
            // var subdivisions = {
            //     'h' : 8,
            //     'w' : 8
            // };
            //     var tiledGround = BABYLON.Mesh.CreateTiledGround("Tiled Ground", -3, -3, 3, 3, subdivisions, precision, scene, false);
            // Leave this function
            return scene;
        };
        // Must be a <canvas /> element
        //var canvas = document.getElementById("scene");
        var canvas = this.refs.scene;
        var engine = new BABYLON.Engine(canvas, true);
        var scene = createScene(engine);
        this.scene = scene;
        this.getSquare();
        // Register a render loop to repeatedly render the scene
        engine.runRenderLoop(function () {
            scene.render();
        });
        // Otherwise the scene with warp/squish as the size of the window changes
        window.addEventListener("resize", function () {
            engine.resize();
        });
    };
    Canvas.prototype.render = function () {
        return React.createElement("canvas", { style: { width: '100%', height: '100%' }, ref: "scene" });
    };
    return Canvas;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Canvas;
