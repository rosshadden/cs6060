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
		// Raise the camera off the "ground" a bit.
		camera.position.z = 24;
	})();

	// DRAW
	(function() {
		// Some radius variables for easy changing.
		var shieldRadius = 16;
		var sectionRadius = shieldRadius / 6;

		// Build the star in the center,
		// vector-by-vector.
		var pentagram = new THREE.Shape([
			new THREE.Vector2(8 * Math.sin(0 * Math.PI / 5), 8 * Math.cos(0 * Math.PI / 5)),
			new THREE.Vector2(4 * Math.sin(1 * Math.PI / 5), 4 * Math.cos(1 * Math.PI / 5)),
			new THREE.Vector2(8 * Math.sin(2 * Math.PI / 5), 8 * Math.cos(2 * Math.PI / 5)),
			new THREE.Vector2(4 * Math.sin(3 * Math.PI / 5), 4 * Math.cos(3 * Math.PI / 5)),
			new THREE.Vector2(8 * Math.sin(4 * Math.PI / 5), 8 * Math.cos(4 * Math.PI / 5)),
			new THREE.Vector2(4 * Math.sin(5 * Math.PI / 5), 4 * Math.cos(5 * Math.PI / 5)),
			new THREE.Vector2(8 * Math.sin(6 * Math.PI / 5), 8 * Math.cos(6 * Math.PI / 5)),
			new THREE.Vector2(4 * Math.sin(7 * Math.PI / 5), 4 * Math.cos(7 * Math.PI / 5)),
			new THREE.Vector2(8 * Math.sin(8 * Math.PI / 5), 8 * Math.cos(8 * Math.PI / 5)),
			new THREE.Vector2(4 * Math.sin(9 * Math.PI / 5), 4 * Math.cos(9 * Math.PI / 5))
		]);

		var shapes = [
			// The rings.
			new THREE.Mesh(
				new THREE.CircleGeometry(shieldRadius, 64),
				new THREE.MeshBasicMaterial({ color: 0xbb0000, side: THREE.DoubleSide })
			),
			new THREE.Mesh(
				new THREE.CircleGeometry(shieldRadius - sectionRadius, 64),
				new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
			),
			new THREE.Mesh(
				new THREE.CircleGeometry(shieldRadius - 2 * sectionRadius, 64),
				new THREE.MeshBasicMaterial({ color: 0xbb0000, side: THREE.DoubleSide })
			),
			new THREE.Mesh(
				new THREE.CircleGeometry(shieldRadius - 3 * sectionRadius, 64),
				new THREE.MeshBasicMaterial({ color: 0x15659e, side: THREE.DoubleSide })
			),

			// The star.
			new THREE.Mesh(
				new THREE.ShapeGeometry(pentagram),
				new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
			)
		];

		// Draw the shapes.
		// Apparently order matters--likely since everything is on the same plane.
		// Therefore, we draw them in the opposite order we defined them in.
		shapes
		.reverse()
		.forEach(function(shape) {
			scene.add(shape);
		});
	})();

	// START
	// Run the animation loop.
	(function render() {
		requestAnimationFrame(render);
		renderer.render(scene, camera);
	})();
})(this);
