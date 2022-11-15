import * as THREE from 'three';
import {
	AnimationMixer
} from 'three';
export class NPC {
	constructor(info) {
		this.x = info.x;
		this.y = info.y;
		this.z = info.z;
		this.moving = false;
		this.rotation = info.rotation;

		this.locationXYZ = info.locationXYZ;
		this.time=info.time;
		
		this.speed = 1;


		//현재 위치 인덱스
		this.curIdx=0;
		//위치 바꿀 시간 설정

		info.gltfLoader.load(
			info.modelSrc,
			glb => {
				// glb.scene.traverse(child => {
				// 	if (child.isMesh) {
				// 		child.castShadow = true;
				// 	} 
				// });
				this.modelMesh = glb.scene;
				this.modelMesh.castShadow = true;
				this.modelMesh.position.set(this.x, this.y, this.z);
				this.modelMesh.rotation.set(0, this.rotation, 0);
				this.modelMesh.scale.multiplyScalar(0.8);
				this.modelMesh.name = 'npc';
				info.scene.add(this.modelMesh);
				info.meshes.push(this.modelMesh);

				this.actions = [];
				this.mixer = new AnimationMixer(this.modelMesh);
				this.actions[0] = this.mixer.clipAction(glb.animations[8]);
				this.actions[1] = this.mixer.clipAction(glb.animations[11]);

				// const clock = new THREE.Clock();
				// const delta = clock.getDelta();
				// if (this.mixer) {
				// 	this.mixer.update(delta);
				// 	this.actions[0].play();
				// }
			}
			);
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
		this.modelMesh.position.x += Math.cos(angle) *delta*2;
		this.modelMesh.position.z += Math.sin(angle) *delta*2;


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

	// if (this.camera) this.camera.lookAt(this.modelMesh.position);
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

	// onRaycasted() {
	// 	this.actions[1].setLoop(THREE.LoopOnce);
	// 	this.actions[1].stop();
	// 	this.actions[1].play();
	// 	this.moving =true;
	// }

}