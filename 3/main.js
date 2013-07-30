(function(window, undefined) {
	"use strict";

	var PI = Math.PI;
	var axes = {
		x: new THREE.Vector3(1, 0, 0),
		y: new THREE.Vector3(0, 1, 0),
		z: new THREE.Vector3(0, 0, 1),
		matrix: new THREE.Matrix4()
	};

	// INIT
	var scene, camera, renderer;
	(function() {
		// Create the scene and camera.
		scene = window.scene = new THREE.Scene();
		camera = window.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

		// Access the WebGL context.
		renderer = new THREE.WebGLRenderer({antialias: true});

		// Add the canvas output to the page.
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(renderer.domElement);
	})();

	// SETUP
	(function() {
		camera.speed = 1;
		camera.lookAt(axes.z);
		camera.position.set(0, 0, 0);
		scene.add(camera);

		// Show axes, for debugging.
		var axisHelper = new THREE.AxisHelper(10);
		scene.add(axisHelper);
	})();

	// DRAW
	(function() {
		var walls = {
			north: new THREE
				.Mesh(
					new THREE.PlaneGeometry(128, 64),
					new THREE.MeshBasicMaterial({ color: 0x990000, side: THREE.DoubleSide })
				)
				.translateX(0)
				.translateY(0)
				.translateZ(-64),
			south: new THREE
				.Mesh(
					new THREE.PlaneGeometry(128, 64),
					new THREE.MeshBasicMaterial({ color: 0x009900, side: THREE.DoubleSide })
				)
				.translateX(0)
				.translateY(0)
				.translateZ(64),
			east: new THREE
				.Mesh(
					new THREE.PlaneGeometry(128, 64),
					new THREE.MeshBasicMaterial({ color: 0x000099, side: THREE.DoubleSide })
				)
				.rotateY(PI / 2)
				.translateX(0)
				.translateY(0)
				.translateZ(-64),
			west: new THREE
				.Mesh(
					new THREE.PlaneGeometry(128, 64),
					new THREE.MeshBasicMaterial({ color: 0x009999, side: THREE.DoubleSide })
				)
				.rotateY(-PI / 2)
				.translateX(0)
				.translateY(0)
				.translateZ(-64),
			top: new THREE
				.Mesh(
					new THREE.PlaneGeometry(128, 128),
					new THREE.MeshBasicMaterial({ color: 0x990099, side: THREE.DoubleSide })
				)
				.rotateX(PI / 2)
				.translateX(0)
				.translateY(0)
				.translateZ(-32)
		};

		scene.add(walls.north);
		scene.add(walls.south);
		scene.add(walls.east);
		scene.add(walls.west);
		scene.add(walls.top);
	})();

	// START
	var cameraSpeed;
	// Run the animation loop.
	(function render() {
		// Camera movement.
		// Move forward.
		if (KeyboardJS.combo.active("w")) {
			camera.translateZ(-cameraSpeed);
		}
		// Move backward.
		if (KeyboardJS.combo.active("s")) {
			camera.translateZ(+cameraSpeed);
		}
		// Move left.
		if (KeyboardJS.combo.active("a")) {
			camera.translateX(-cameraSpeed);
		}
		// Move right.
		if (KeyboardJS.combo.active("d")) {
			camera.translateX(+cameraSpeed);
		}
		// Move up.
		if (KeyboardJS.combo.active("space")) {
			camera.translateY(+cameraSpeed);
		}
		// Move down.
		if (KeyboardJS.combo.active("c")) {
			camera.translateY(-cameraSpeed);
		}
		// Look up.
		if (KeyboardJS.combo.active("up")) {
			camera.rotateX(+PI/64);
		}
		// Look down.
		if (KeyboardJS.combo.active("down")) {
			camera.rotateX(-PI/64);
		}
		// Turn left.
		if (KeyboardJS.combo.active("left")) {
			camera.applyMatrix(axes.matrix.makeRotationAxis(axes.y, +PI/64));
		}
		// Turn right.
		if (KeyboardJS.combo.active("right")) {
			camera.applyMatrix(axes.matrix.makeRotationAxis(axes.y, -PI/64));
		}
		// Move faster.
		if (KeyboardJS.combo.active("shift")) {
			cameraSpeed = 4 * camera.speed;
		} else {
			cameraSpeed = camera.speed;
		}

		requestAnimationFrame(render);
		renderer.render(scene, camera);
	})();
})(this);
