(function(window, undefined) {
	// INIT
	var scene, camera, renderer;
	(function() {
		// Create the scene and camera.
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

		// Access the WebGL context.
		renderer = new THREE.WebGLRenderer({antialias: true});

		// Add the canvas output to the page.
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(renderer.domElement);
	})();

	// SETUP
	(function() {
	})();

	// DRAW
	(function() {
	})();

	// START
	// Run the animation loop.
	(function render() {
		requestAnimationFrame(render);
		renderer.render(scene, camera);
	})();
})(this);
