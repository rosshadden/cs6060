(function(window, undefined) {
	// INIT
	var scene, camera, renderer;
	(function() {
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

		renderer = new THREE.WebGLRenderer({antialias: true});
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(renderer.domElement);
	})();

	// SETUP
	(function() {
		camera.position.z = 32;
	})();

	// DRAW
	(function() {
		var shieldRadius = 16;
		var sectionRadius = shieldRadius / 6;

		var outerPentagon = new THREE.Mesh(
			new THREE.CircleGeometry(shieldRadius - 3 * sectionRadius, 5),
			new THREE.MeshBasicMaterial({ color: 0x000000 })
		);

		var innerPentagon = new THREE.Mesh(
			new THREE.CircleGeometry(shieldRadius - 4.5 * sectionRadius, 5),
			new THREE.MeshBasicMaterial({ color: 0xffffff })
		);

		var lines = outerPentagon.geometry.vertices
			.slice(1, -1)
			.map(function(point, p, points) {
				var p2 = (p + 2 >= points.length) ? p + 2 - points.length : p + 2;
				// triangles.moveTo(point.x, point.y);
				// triangles.lineTo(points[to].x, points[to].y);
				var from = new THREE.Vector2(point.x, point.y);
				var to = new THREE.Vector2(points[p2].x, points[p2].y);
				return from.add(to);
			});

		var triangles = new THREE.Shape([
			new THREE.Vector2(8 * Math.sin(0 * Math.PI / 5), 8 * Math.cos(0 * Math.PI / 5)),
			new THREE.Vector2(4 * Math.sin(1 * Math.PI / 5), 4 * Math.cos(1 * Math.PI / 5)),
			new THREE.Vector2(8 * Math.sin(2 * Math.PI / 5), 8 * Math.cos(2 * Math.PI / 5)),
			new THREE.Vector2(4 * Math.sin(3 * Math.PI / 5), 4 * Math.cos(3 * Math.PI / 5)),
			new THREE.Vector2(8 * Math.sin(4 * Math.PI / 5), 8 * Math.cos(4 * Math.PI / 5)),
			new THREE.Vector2(4 * Math.sin(5 * Math.PI / 5), 4 * Math.cos(5 * Math.PI / 5)),
			new THREE.Vector2(8 * Math.sin(6 * Math.PI / 5), 8 * Math.cos(6 * Math.PI / 5)),
			new THREE.Vector2(4 * Math.sin(7 * Math.PI / 5), 4 * Math.cos(7 * Math.PI / 5)),
			new THREE.Vector2(8 * Math.sin(8 * Math.PI / 5), 8 * Math.cos(8 * Math.PI / 5)),
			new THREE.Vector2(4 * Math.sin(9 * Math.PI / 5), 4 * Math.cos(9 * Math.PI / 5)),
		]);

		// triangles.faces.push(new THREE.Face3(0, 2, 3));

		var star = new THREE.Mesh(
			new THREE.ShapeGeometry(triangles),
			new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
		);

		var shapes = [
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

			// Star.
			// outerPentagon,
			// innerPentagon,
			star,
		];

		shapes
		.reverse()
		.forEach(function(shape) {
			scene.add(shape);
		});
	})();

	// START
	(function render() {
		requestAnimationFrame(render);
		renderer.render(scene, camera);
	})();
})(this);
