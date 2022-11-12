import * as THREE from 'three';
import {
	AnimationMixer
} from 'three';
export class NPC {
	constructor(info) {
		this.x = info.x;
		this.y = info.y;
		this.z = info.z;

		this.rotation = info.rotation;
		
		info.gltfLoader.load(
			info.modelSrc,
			glb => {
				glb.scene.traverse(child => {
					if (child.isMesh) {
						child.castShadow = true;
					} 
				});
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

				const clock = new THREE.Clock();
				const delta = clock.getDelta();
				if (this.mixer) {
					this.mixer.update();
					this.actions[0].play();
				}
			}
		);
	}

	onRaycasted() {
		this.actions[1].setLoop(THREE.LoopOnce);
		this.actions[1].stop();
		this.actions[1].play();
	}
}