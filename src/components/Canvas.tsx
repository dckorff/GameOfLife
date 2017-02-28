import * as React from "react";

// This doesn't work:
//import BABYLON from 'babylonjs';

// This makes the typedefs work, but we still need to manually include/load the babylon.js file
import 'babylonjs';


export interface CanvasProps { }

export default class Canvas extends React.Component<CanvasProps, undefined> {

		componentDidMount(){

			const size = 10;

	    let grid = [];

	    for(let iRow = 0; iRow < 10; iRow++){
	    	let row = [];
	    	for(let iCol= 0; iCol < 10; iCol++){
	    		row.push(0);
	    	}	
	    	grid.push(row);
	    }

	    // This begins the creation of a function that we will 'call' just after it's built
	    var createScene = function (engine) {

	        // Now create a basic Babylon Scene object 
	        var scene = new BABYLON.Scene(engine);

	        // Change the scene background color to gray.
	        scene.clearColor = new BABYLON.Color3(200, 200, 200);

	        // This creates and positions a free camera
	        var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

	        // This targets the camera to scene origin
	        camera.setTarget(BABYLON.Vector3.Zero());

	        // This attaches the camera to the canvas
	        camera.attachControl(canvas, false);


	        // This creates a light, aiming 0,1,0 - to the sky.
	        var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

	        // Dim the light a small amount
	        light.intensity = 0.7;

	        // Let's try our built-in 'sphere' shape. Params: name, subdivisions, size, scene
	        var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);

	        // Move the sphere upward 1/2 its height
	        sphere.position.y = 1;

	        // Create a gray plane
	        // Params: name, width, depth, subdivisions, scene
	        var ground = BABYLON.Mesh.CreateGround("ground1", 10, 6, 2, scene);

	        // Leave this function
	        return scene;

	    }; 

	    // Must be a <canvas /> element
	    //var canvas = document.getElementById("scene");
	    var canvas = this.refs.scene;
	    console.log(canvas);

	    var engine = new BABYLON.Engine(canvas, true);
	    var scene = createScene(engine);

	    // Register a render loop to repeatedly render the scene
	    engine.runRenderLoop(function () {
	        scene.render();
	    });

	    // Otherwise the scene with warp/squish as the size of the window changes
	    window.addEventListener("resize", function () {
	        engine.resize();
	    });
		}


    render() {
        return <canvas style={{width: '100%', height: '100%'}} ref="scene"></canvas>;
    }
}