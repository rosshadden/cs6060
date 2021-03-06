(function(window, undefined) {
	"use strict";

	// GLOBALS
	var scene, camera, renderer;
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
	})();

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
		// Set up properties of the camera.
		camera.speed = 1;
		camera.lookAt(axes.z);
		camera.position.set(0, 0, -48);
	})();

	// MODELS
	var models = (function() {
		// Save the wallpaper material for use on each wall.
		var wallMaterial = new THREE.MeshLambertMaterial({
			side: THREE.DoubleSide,
			map: (function() {
				var texture = new THREE.ImageUtils.loadTexture("../images/wallpaper.jpg");
				texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
				texture.repeat.set(2, 2);
				return texture;
			})()
		});

		// Create the wall models.
		var walls = {
			north: new THREE
				.Mesh(
					new THREE.PlaneGeometry(128, 64),
					wallMaterial
				)
				.translateX(0)
				.translateY(0)
				.translateZ(-64)
			,
			south: new THREE
				.Mesh(
					new THREE.PlaneGeometry(128, 64),
					wallMaterial
				)
				.translateX(0)
				.translateY(0)
				.translateZ(64)
			,
			east: new THREE
				.Mesh(
					new THREE.PlaneGeometry(128, 64),
					wallMaterial
				)
				.rotateY(Math.PI / 2)
				.translateX(0)
				.translateY(0)
				.translateZ(-64)
			,
			west: new THREE
				.Mesh(
					new THREE.PlaneGeometry(128, 64),
					wallMaterial
				)
				.rotateY(-Math.PI / 2)
				.translateX(0)
				.translateY(0)
				.translateZ(-64)
			,
			ceiling: new THREE
				.Mesh(
					new THREE.PlaneGeometry(128, 128),
					new THREE.MeshLambertMaterial({
						side: THREE.DoubleSide,
						map: (function() {
							var texture = new THREE.ImageUtils.loadTexture("../images/ceiling.jpg");
							texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
							texture.repeat.set(6, 6);
							return texture;
						})()
					})
				)
				.rotateX(Math.PI / 2)
				.translateX(0)
				.translateY(0)
				.translateZ(-32)
			,
			floor: new THREE
				.Mesh(
					new THREE.PlaneGeometry(128, 128),
					new THREE.MeshLambertMaterial({
						side: THREE.DoubleSide,
						map: (function() {
							var texture = new THREE.ImageUtils.loadTexture("../images/checkerboard.jpg");
							texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
							texture.repeat.set(5, 5);
							return texture;
						})()
					})
				)
				.rotateX(Math.PI / 2)
				.translateX(0)
				.translateY(0)
				.translateZ(32)
		};

		// Create the chair model.
		var chair = (function() {
			// Make the overall chair object.
			var chair = new THREE.Geometry();
			// Set the chair material here for reuse.
			var material = new THREE.MeshLambertMaterial({
				map: new THREE.ImageUtils.loadTexture("../images/crate.png")
			});

			// Make blueprints for all the individual parts of the chair.
			var chairParts = {
				back: new THREE.Mesh(
					new THREE.CubeGeometry(12, 16, 1), null
				),
				seat: new THREE.Mesh(
						new THREE.CubeGeometry(12, 1, 12),
						new THREE.MeshLambertMaterial({ color: 0x331100 })
					)
					.translateY(-8.5)
					.translateZ(5.5)
				,
				leg: new THREE.Mesh(
						new THREE.CylinderGeometry(1, 1, 8), null
					)
					.translateY(-13)
			};

			// Create four legs,
			// by cloning and transforming the above blueprint.
			chairParts.legs = [
				chairParts.leg.clone()
					.translateX(-4)
					.translateZ(1),
				chairParts.leg.clone()
					.translateX(4)
					.translateZ(1),
				chairParts.leg.clone()
					.translateX(-4)
					.translateZ(10),
				chairParts.leg.clone()
					.translateX(4)
					.translateZ(10)
			];

			// Tell the renderer which materials to use for each face or part.
			var materials = [
				chairParts.seat.material,
				material
			];
			THREE.GeometryUtils.setMaterialIndex(chairParts.seat.geometry, 0);
			THREE.GeometryUtils.setMaterialIndex(chairParts.back.geometry, 1);

			// Merge all of the individual chair parts into the overall chair object.
			THREE.GeometryUtils.merge(chair, chairParts.seat);
			THREE.GeometryUtils.merge(chair, chairParts.back);
			chairParts.legs.forEach(function(leg) {
				THREE.GeometryUtils.setMaterialIndex(leg.geometry, 1);
				THREE.GeometryUtils.merge(chair, leg);
			});

			// Return the overall chair object,
			// applying the materials defined above.
			return new THREE.Mesh(chair, new THREE.MeshFaceMaterial(materials))
				.rotateY(Math.PI/2)
				.translateX(-48)
				.translateY(-15)
				.translateZ(-48);
		})();

		// Create the tube model that houses the floating face.
		var tube = new THREE.Mesh(
			new THREE.CylinderGeometry(16, 16, 62, 64),
			new THREE.MeshLambertMaterial({ color: 0x7EB6FF, transparent: true, opacity: 0.4 })
		);

		// Create the creepy floating face.
		var face = (function() {
			// Make the overall face object.
			var face = new THREE.Geometry();

			// Make the blueprints for the individual parts to the face.
			var head = new THREE.SphereGeometry(12, 64, 64);

			var nose = new THREE
				.Mesh(
					new THREE.CylinderGeometry(1, 0, 1),
					new THREE.MeshLambertMaterial({ color: 0xeebb99 })
				)
				.translateZ(-12.5)
				.rotateX(Math.PI / 2)
			;

			var eye = new THREE
				.Mesh(
					new THREE.CylinderGeometry(2, 0, 1),
					new THREE.MeshLambertMaterial({ color: 0xffffff })
				)
				.translateY(4)
				.translateZ(-11)
				.rotateX(Math.PI / 2)
			;

			// Make the eyes by cloning and transforming the above eye blueprint.
			var eyes = [
				eye.clone().translateX(3),
				eye.clone().translateX(-3)
			];

			var mouth = new THREE
				.Mesh(
					new THREE.CylinderGeometry(0.2, 0, 1, 64),
					new THREE.MeshLambertMaterial({ color: 0x660000 })
				)
				.translateY(-4)
				.translateZ(-11.3)
				.rotateX(Math.PI / 2.5)
				.rotateY(Math.PI)
			;
			mouth.scale.x = 20;
			mouth.scale.z = 16;

			var tooth = new THREE
				.Mesh(
					new THREE.CubeGeometry(1.6, 1.6, 0.2),
					new THREE.MeshLambertMaterial({ color: 0xffffff })
				)
				.translateY(-2.6)
				.translateZ(-12)
				.rotateX(0.5)
			;

			// Make the teeth by cloning and transforming the above tooth blueprint.
			var teeth = [
				tooth.clone().translateX(1.2),
				tooth.clone().translateX(-1.2)
			];

			// Setup the materials for each individual face part.
			var materials = [
				new THREE.MeshLambertMaterial({ color: 0xFFCC99 }),
				nose.material,
				eye.material,
				mouth.material,
				tooth.material
			];

			// Tell the renderer which materials to use for each model in the overall face.
			THREE.GeometryUtils.setMaterialIndex(head, 0);
			THREE.GeometryUtils.setMaterialIndex(nose.geometry, 1);
			THREE.GeometryUtils.setMaterialIndex(eyes[0].geometry, 2);
			THREE.GeometryUtils.setMaterialIndex(eyes[1].geometry, 2);
			THREE.GeometryUtils.setMaterialIndex(mouth.geometry, 3);
			THREE.GeometryUtils.setMaterialIndex(teeth[0].geometry, 2);
			THREE.GeometryUtils.setMaterialIndex(teeth[1].geometry, 2);

			// Merge all of the individual face parts into the overall object.
			THREE.GeometryUtils.merge(face, head);
			THREE.GeometryUtils.merge(face, nose);
			THREE.GeometryUtils.merge(face, eyes[0]);
			THREE.GeometryUtils.merge(face, eyes[1]);
			THREE.GeometryUtils.merge(face, mouth);
			THREE.GeometryUtils.merge(face, teeth[0]);
			THREE.GeometryUtils.merge(face, teeth[1]);

			// Return the overall face object, with the above material map applied.
			return new THREE.Mesh(face, new THREE.MeshFaceMaterial(materials));
		})();

		return {
			walls: walls,
			chair: chair,
			tube: tube,
			face: face
		};
	})();

	// DRAW
	(function() {
		// Add the main camera.
		scene.add(camera);

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

		// Add the tube for the face.
		scene.add(models.tube);
		// Add the face.
		scene.add(models.face);

		// Add some lights.
		var light = new THREE.PointLight(0xffffff, 0.8);
		var lights = [light.clone(), light.clone()];
		lights[0].position.set(0, 0, +60);
		lights[1].position.set(0, 0, -60);
		lights.forEach(function(light, l) {
			scene.add(light);
		});
	})();

	var cameraSpeed;
	var controls = function() {
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
			camera.rotateX(+Math.PI/64);
		}
		// Look down.
		if (KeyboardJS.combo.active("down")) {
			camera.rotateX(-Math.PI/64);
		}
		// Turn left.
		if (KeyboardJS.combo.active("left")) {
			utils.rotateAroundAxis(camera, axes.y, +Math.PI/64);
		}
		// Turn right.
		if (KeyboardJS.combo.active("right")) {
			utils.rotateAroundAxis(camera, axes.y, -Math.PI/64);
		}
		// Move faster.
		if (KeyboardJS.combo.active("shift")) {
			cameraSpeed = 4 * camera.speed;
		} else {
			cameraSpeed = camera.speed;
		}
	};

	var update = function(clock) {
		// Make the face creepily horizontally oscillate.
		if ((~~clock + 5e3) % 1e4 >= 5e3) {
			models.face.position.y += 0.02;
		} else {
			models.face.position.y -= 0.02;
		}

		// Make the face creepily follow the camera.
		models.face.lookAt(camera.position.clone().multiplyScalar(-1));
	};

	// START
	// Run the animation loop.
	(function render(clock) {
		// Loop-de-loop.
		requestAnimationFrame(render);
		// Handle user input.
		controls(clock);
		// Update anything else necessary.
		update(clock);
		// Render the scene, from the perspective of the main camera.
		renderer.render(scene, camera);
	})();
})(this);
