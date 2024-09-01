window.addEventListener('DOMContentLoaded', function () {
    // Get the canvas element
    var canvas = document.getElementById('renderCanvas');

    // Generate the Babylon.js 3D engine
    var engine = new BABYLON.Engine(canvas, true);

    // Create a scene
    var createScene = function () {
        var scene = new BABYLON.Scene(engine);

        // Add a camera to the scene and attach it to the canvas
        var camera = new BABYLON.ArcRotateCamera("camera1", Math.PI / 2, Math.PI / 4, 6, BABYLON.Vector3.Zero(), scene);
        camera.attachControl(canvas, true);

        // Add a light to the scene
        var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
        light.intensity = 0.7;

        // Load the 3D model with OBJ and MTL files
        BABYLON.SceneLoader.ImportMesh("", "assets/", "room.obj", scene, function (meshes) {
            scene.createDefaultCameraOrLight(true, true, true);
            scene.createDefaultEnvironment();
        });

        return scene;
    };

    // Call the createScene function
    var scene = createScene();

    // Register a render loop to repeatedly render the scene
    engine.runRenderLoop(function () {
        scene.render();
    });

    // Watch for browser/canvas resize events
    window.addEventListener("resize", function () {
        engine.resize();
    });
});
