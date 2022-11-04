import * as CANNON from 'cannon-es';
import { Mesh } from 'three';

export class Bridge {
	constructor(info) {
		this.x = info.x;
		this.y = info.y;
		this.z = info.z;


		info.gltfLoader.load(
			info.modelSrc,
			glb => {
				glb.scene.traverse(child => {
					if (child.isMesh) {
						child.castShadow = true;
					} 
				});
				this.modelMesh = glb.scene;
				this.modelMesh.position.set(this.x, this.y, this.z);
				// this.modelMesh.scale.multiplyScalar(-1.5);
				this.modelMesh.scale.x = 1;
				this.modelMesh.scale.y = 1;
				this.modelMesh.scale.z = 1.2;
				this.modelMesh.rotation.y = -2.8;
				this.modelMesh.name = 'bridge';
				info.scene.add(this.modelMesh);
				info.meshes.push(this.modelMesh);


				// 물리엔진 적용하기
				// this.cannonWorld = info.cannonWorld;
				// const shape = new CANNON.Box(new CANNON.Vec3(
				// 	20,2,3))
				// this.cannonBody = new CANNON.Body({
				// 	mass:0,
				// 	position: new CANNON.Vec3(this.x,this.y,this.z),
				// 	shape
				// })
				// this.modelMesh.cannonBody = this.cannonBody;
				// this.cannonWorld.addBody(this.cannonBody);
			}
		);
	}
}
