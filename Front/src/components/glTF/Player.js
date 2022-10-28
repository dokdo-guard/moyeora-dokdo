import {
	AnimationMixer
} from 'three';
import { Stuff } from './Stuff';

export class Player{
	constructor(info) {
		this.moving = false;
		// super(info);

		info.gltfLoader.load(
			info.modelSrc,
			glb => {
				glb.scene.traverse(child => {
					if (child.isMesh) {
						child.castShadow = true;
					} 
				});
		
				this.modelMesh = glb.scene.children[0];
				this.modelMesh.position.y = 0.3;
				this.modelMesh.position.x = 29;
				this.modelMesh.position.z = -4;
				// this.modelMesh.name = 'ilbuni';
				this.modelMesh.scale.multiplyScalar(0.5);
				info.scene.add(this.modelMesh);
				info.meshes.push(this.modelMesh);
				
				this.actions = [];
		 
				this.mixer = new AnimationMixer(this.modelMesh);
				this.actions[0] = this.mixer.clipAction(glb.animations[10]);
				this.actions[1] = this.mixer.clipAction(glb.animations[13]);
				this.actions[0].play();

				
			}
		);
	}
}
