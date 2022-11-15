import {
	AnimationMixer, Vector3
} from 'three';

export class Player{

	
	constructor(info) {
		this.name = 'player'
		this.moving = false;
		// super(info);
		this.x = info.x;
		this.y = info.y;
		this.z = info.z;
		this.speed = 1
		
		info.gltfLoader.load(
			info.modelSrc,
			glb => {
				// glb.scene.traverse(child => {
				// 	if (child.isMesh) {
				// 		child.castShadow = true;
				// 	} 
				// });
				this.modelMesh = glb.scene;
				this.modelMesh.position.set(this.x, this.y, this.z);

				//
				this.cameraPosition = new Vector3(
					this.modelMesh.position.x + 1,
					this.modelMesh.position.y + 5,
					this.modelMesh.position.z + 5
				  );
				//

				this.modelMesh.rotation.x = -0.3;

				this.modelMesh.scale.set(1.5,1.5,1.5)

				info.scene.add(this.modelMesh);
				info.meshes.push(this.modelMesh);
				
				this.actions = [];
				
				this.mixer = new AnimationMixer(this.modelMesh);
				this.actions[0] = this.mixer.clipAction(glb.animations[0]);
				this.actions[1] = this.mixer.clipAction(glb.animations[1]);
				this.actions[2] = this.mixer.clipAction(glb.animations[5]);
				this.actions[3] = this.mixer.clipAction(glb.animations[3]);
				this.actions[4] = this.mixer.clipAction(glb.animations[2]);
				this.actions[0].play();
				
			}
			);
			this.camera = info.camera;
			this.destinationPoint = info.position;
		}

		moveTo(destinationPoint) {
			this.destinationPoint = destinationPoint;
			this.moving = true;
			this.modelMesh.lookAt(destinationPoint);
		  }
		
		move(delta) {
		if (!this.destinationPoint) return;
		if (!this.actions) return;
	
		if (this.moving) {
			// 걸어가는 상태
			let angle = Math.atan2(
			this.destinationPoint.z - this.modelMesh.position.z,
			this.destinationPoint.x - this.modelMesh.position.x
			);
			this.modelMesh.position.x += Math.cos(angle) * delta * 7;
			this.modelMesh.position.z += Math.sin(angle) * delta * 7;
	
			if (this.camera) {
			this.camera.position.x =
				this.cameraPosition.x + this.modelMesh.position.x;
			this.camera.position.z =
				this.cameraPosition.z + this.modelMesh.position.z;
			}
	
			this.actions[0].stop();
			this.actions[1].play();
	
			if (

			Math.abs(this.destinationPoint.x - this.modelMesh.position.x) < 0.22 &&
			Math.abs(this.destinationPoint.z - this.modelMesh.position.z) < 0.22
			) {
			this.moving = false;
			}
		} else {
			// 서 있는 상태
			this.actions[1].stop();
			this.actions[0].play();
		}
	
		if (this.camera) this.camera.lookAt(this.modelMesh.position);
		}
	
		update(delta) {
		if (!this.modelMesh) return;
		if (this.mixer) this.mixer.update(delta); // 애니메이션 재생
		this.move(delta); // 캐릭터 이동
		}

		dontMove(destinationPoint) {
			this.destinationPoint = destinationPoint;
			this.moving = false;
			this.modelMesh.lookAt(destinationPoint);
		}

}
