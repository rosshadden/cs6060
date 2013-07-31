(function(window, undefined) {
	"use strict";

	// GLOBALS
	var scene, camera, renderer;

	var PI = Math.PI;
	var axes = {
		x: new THREE.Vector3(1, 0, 0),
		y: new THREE.Vector3(0, 1, 0),
		z: new THREE.Vector3(0, 0, 1),
		matrix: new THREE.Matrix4()
	};

	// UTILITIES
	var utils = (function() {
		var rotWorldMatrix;
		// Rotate an object around an arbitrary axis in world space.
		var rotateAroundAxis = function(object, axis, radians) {
			rotWorldMatrix = new THREE.Matrix4();
			rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);
			// Pre-multiply.
			rotWorldMatrix.multiply(object.matrix);
			object.matrix = rotWorldMatrix;
			object.rotation.setFromRotationMatrix(object.matrix);
		};

		return { rotateAroundAxis: rotateAroundAxis };
	};

	// INIT
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
		camera.speed = 1;
		camera.lookAt(axes.z);
		camera.position.set(0, 0, 0);
		scene.add(camera);

		// Show axes, for debugging.
		var axisHelper = new THREE.AxisHelper(10);
		scene.add(axisHelper);
	})();

	// MODELS
	var models = (function() {
		// Create the wall models.
		var walls = {
			north: new THREE
				.Mesh(
					new THREE.PlaneGeometry(128, 64),
					new THREE.MeshBasicMaterial({ color: 0xcccccc, side: THREE.DoubleSide })
				)
				.translateX(0)
				.translateY(0)
				.translateZ(-64)
			,
			south: new THREE
				.Mesh(
					new THREE.PlaneGeometry(128, 64),
					new THREE.MeshBasicMaterial({ color: 0xcccccc, side: THREE.DoubleSide })
				)
				.translateX(0)
				.translateY(0)
				.translateZ(64)
			,
			east: new THREE
				.Mesh(
					new THREE.PlaneGeometry(128, 64),
					new THREE.MeshBasicMaterial({ color: 0xcccccc, side: THREE.DoubleSide })
				)
				.rotateY(PI / 2)
				.translateX(0)
				.translateY(0)
				.translateZ(-64)
			,
			west: new THREE
				.Mesh(
					new THREE.PlaneGeometry(128, 64),
					new THREE.MeshBasicMaterial({ color: 0xcccccc, side: THREE.DoubleSide })
				)
				.rotateY(-PI / 2)
				.translateX(0)
				.translateY(0)
				.translateZ(-64)
			,
			ceiling: new THREE
				.Mesh(
					new THREE.PlaneGeometry(128, 128),
					new THREE.MeshBasicMaterial({ color: 0x333333, side: THREE.DoubleSide })
				)
				.rotateX(PI / 2)
				.translateX(0)
				.translateY(0)
				.translateZ(-32)
			,
			floor: new THREE
				.Mesh(
					new THREE.PlaneGeometry(128, 128),
					new THREE.MeshBasicMaterial({ color: 0x336666, side: THREE.DoubleSide })
				)
				.rotateX(PI / 2)
				.translateX(0)
				.translateY(0)
				.translateZ(32)
		};

		// Create the chair model.
		var chair = (function() {
			var chairParts = {
				back: new THREE.Mesh(
					new THREE.CubeGeometry(12, 16, 1),
					new THREE.MeshBasicMaterial({ color: 0x855E42 })
				),
				seat: new THREE
					.Mesh(
						new THREE.CubeGeometry(12, 1, 12),
						new THREE.MeshBasicMaterial({ color: 0x331100 })
					)
					.translateY(-8.5)
					.translateZ(5.5)
				,
				legs: [
					new THREE.Mesh(
							new THREE.CylinderGeometry(1, 1, 8),
							new THREE.MeshBasicMaterial({ color: 0x221100 })
						)
						.translateX(-4)
						.translateY(-13)
						.translateZ(1)
					,
					new THREE.Mesh(
							new THREE.CylinderGeometry(1, 1, 8),
							new THREE.MeshBasicMaterial({ color: 0x221100 })
						)
						.translateX(4)
						.translateY(-13)
						.translateZ(1)
					,
					new THREE.Mesh(
							new THREE.CylinderGeometry(1, 1, 8),
							new THREE.MeshBasicMaterial({ color: 0x221100 })
						)
						.translateX(-4)
						.translateY(-13)
						.translateZ(10)
					,
					new THREE.Mesh(
							new THREE.CylinderGeometry(1, 1, 8),
							new THREE.MeshBasicMaterial({ color: 0x221100 })
						)
						.translateX(4)
						.translateY(-13)
						.translateZ(10)
				]
			};

			var materials = [
				chairParts.seat.material,
				chairParts.back.material
			];

			var chairModel = new THREE.Geometry();
			THREE.GeometryUtils.setMaterialIndex(chairParts.seat.geometry, 0);
			THREE.GeometryUtils.merge(chairModel, chairParts.seat);
			THREE.GeometryUtils.setMaterialIndex(chairParts.back.geometry, 1);
			THREE.GeometryUtils.merge(chairModel, chairParts.back);

			chairParts.legs.forEach(function(leg, l) {
				materials.push(leg.material);
				THREE.GeometryUtils.setMaterialIndex(leg.geometry, l + 2);
				THREE.GeometryUtils.merge(chairModel, leg);
			});

			return new THREE.Mesh(chairModel, new THREE.MeshFaceMaterial(materials))
				.rotateY(PI/2)
				.translateX(-48)
				.translateY(-15)
				.translateZ(-48);
		})();

		return {
			walls: walls,
			chair: chair
		};
	})();

	// DRAW
	(function() {
		// Add all of the walls.
		scene.add(models.walls.north);
		scene.add(models.walls.south);
		scene.add(models.walls.east);
		scene.add(models.walls.west);
		scene.add(models.walls.ceiling);
		scene.add(models.walls.floor);

		// Add multiple chairs.
		var numChairs = 6;
		for (var c = 0; c < numChairs; c++) {
			scene.add(models.chair.clone().translateX(c * 20));
		}
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
			rotateAroundAxis(camera, axes.y, +PI/64);
		}
		// Turn right.
		if (KeyboardJS.combo.active("right")) {
			rotateAroundAxis(camera, axes.y, -PI/64);
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

	// DEBUG
	window.camera = camera;
})(this);
