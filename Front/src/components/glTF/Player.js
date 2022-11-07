import {
	AnimationMixer
} from 'three';
// import {Body, Box, Vec3} from 'cannon-es';
import * as CANNON from 'cannon-es';

export class Player{
	
	constructor(info) {
		// this.moving = false;
		// super(info);
		this.x = info.x;
		this.y = info.y;
		this.z = info.z;
		this.speed = 1
		
		info.gltfLoader.load(
			info.modelSrc,
			glb => {
				glb.scene.traverse(child => {
					if (child.isMesh) {
						child.castShadow = true;
					} 
				});
				// console.log(this.z, info.z)
				this.modelMesh = glb.scene;
				// this.modelMesh.position.x = info.x;
				// this.modelMesh.position.y = info.y;
				// this.modelMesh.position.z = info.z;
				// this.modelMesh.position.x = 28;
				// this.modelMesh.position.y = 0.5;
				// this.modelMesh.position.z = -4;
				this.modelMesh.position.set(this.x, this.y, this.z);
				// console.log(this.modelMesh.position)

				this.modelMesh.rotation.x = -0.3;

				this.modelMesh.scale.x = 1.5
				this.modelMesh.scale.y = 1.5
				this.modelMesh.scale.z = 1.5

				// this.modelMesh.scale.multiplyScalar(0.5);
				info.scene.add(this.modelMesh);
				info.meshes.push(this.modelMesh);
				
				this.actions = [];
				
				this.mixer = new AnimationMixer(this.modelMesh);
				this.actions[0] = this.mixer.clipAction(glb.animations[2]);
				this.actions[1] = this.mixer.clipAction(glb.animations[1]);
				this.actions[0].play();
				
				// 물리엔진 적용하기
				// this.cannonWorld = info.cannonWorld;
				// const shape = new CANNON.Box(new CANNON.Vec3(
				// 	0.3,0.2,0.3))
				// this.cannonBody = new CANNON.Body({
				// 	mass:1,
				// 	position: new CANNON.Vec3(
				// 		this.modelMesh.position.x,this.modelMesh.position.y,this.modelMesh.position.z),
				// 	shape
				// })
				// this.modelMesh.cannonBody = this.cannonBody;
				// this.cannonWorld.addBody(this.cannonBody);
			}
			);
		}
}
