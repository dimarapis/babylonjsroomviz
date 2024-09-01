window.addEventListener('DOMContentLoaded', function () {
    var canvas = document.getElementById('renderCanvas');
    var engine = new BABYLON.Engine(canvas, true);

    var createScene = async function () {
        // Create a basic Babylon Scene object (non-mesh)
        var scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color3(0.1, 0.1, 0.1); // Set background color

        // Create and position a free camera (non-mesh)
        var camera = new BABYLON.ArcRotateCamera("camera1", -0.8, 1.2, 20, new BABYLON.Vector3(0, 0, 0), scene);
        camera.wheelPrecision = 100;
        camera.inertia = 0.97;
        camera.attachControl(canvas, true); // Attach the camera to the canvas

        // Add a light
        var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
        light.intensity = 0.7;

        // Load the OBJ and MTL files
        await BABYLON.SceneLoader.ImportMeshAsync("", "assets/", "model.obj", scene);

        // Optional: Apply some constraints to the camera movement
        scene.onBeforeRenderObservable.add(() => {
            camera.beta = Math.min(camera.beta, 1.45);
            camera.radius = Math.max(camera.radius, 3.);
            camera.radius = Math.min(camera.radius, 20.); // Adjust as necessary for your scene
        });

        return scene;
    };

    // Call the createScene function
    var scene = createScene();

    // Register a render loop to repeatedly render the scene
    engine.runRenderLoop(function () {
        scene.then(s => s.render());
    });

    // Watch for browser/canvas resize events
    window.addEventListener("resize", function () {
        engine.resize();
    });
});
