import * as CANNON from 'cannon-es';

export class Building {
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
				this.modelMesh = glb.scene.children[0];
				this.modelMesh.castShadow = true;
				this.modelMesh.position.set(this.x, this.y, this.z);
				// this.modelMesh.scale.multiplyScalar(0.5);
				this.modelMesh.scale.x = 0.6
				this.modelMesh.scale.y = 0.6
				this.modelMesh.scale.z = 0.6
				this.modelMesh.rotation.y = 0.9;
				info.scene.add(this.modelMesh);

				// 물리엔진 적용하기
				this.cannonWorld = info.cannonWorld;
				const shape = new CANNON.Box(new CANNON.Vec3(
					3.8,2,4))
				this.cannonBody = new CANNON.Body({
					mass:0,
					position: new CANNON.Vec3(this.x,this.y,this.z),
					shape,
				})
				this.cannonBody.quaternion.setFromEuler(0, 0.8, 0);
				this.modelMesh.cannonBody = this.cannonBody;
				this.cannonWorld.addBody(this.cannonBody);
				this.cannonWorld.allowSleep = false
			}
		);
	}
}
