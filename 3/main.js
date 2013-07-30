var PI = Math.PI;

(function(window, undefined) {
	"use strict";

	// INIT
	var scene, camera, renderer;
	(function() {
		// Create the scene and camera.
		scene = new THREE.Scene();
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
		camera.lookAt(new THREE.Vector3(0, 0, 1));
		camera.position.set(0, 0, 0);
		scene.add(camera);

		// Show axes, for debugging.
		var axes = new THREE.AxisHelper(10);
		scene.add(axes);
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
					new THREE.PlaneGeometry(128, 64),
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
	// Run the animation loop.
	(function render() {
		if (KeyboardJS.combo.active("w")) {
			camera.translateZ(-camera.speed);
		}
		if (KeyboardJS.combo.active("s")) {
			camera.translateZ(+camera.speed);
		}
		if (KeyboardJS.combo.active("a")) {
			camera.translateX(-camera.speed);
		}
		if (KeyboardJS.combo.active("d")) {
			camera.translateX(+camera.speed);
		}
		if (KeyboardJS.combo.active("space")) {
			camera.translateY(+camera.speed);
		}
		if (KeyboardJS.combo.active("shift")) {
			camera.translateY(-camera.speed);
		}
		if (KeyboardJS.combo.active("up")) {
			camera.rotateX(+PI / 64);
		}
		if (KeyboardJS.combo.active("down")) {
			camera.rotateX(-PI / 64);
		}
		if (KeyboardJS.combo.active("left")) {
			camera.rotateY(+PI / 64);
		}
		if (KeyboardJS.combo.active("right")) {
			camera.rotateY(-PI / 64);
		}

		requestAnimationFrame(render);
		renderer.render(scene, camera);
	})();
})(this);
