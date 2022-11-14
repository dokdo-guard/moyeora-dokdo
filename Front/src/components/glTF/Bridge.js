export class Bridge {
	constructor(info) {
		this.x = info.x;
		this.y = info.y;
		this.z = info.z;
		

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
				// this.modelMesh.scale.multiplyScalar(-1.5);
				this.modelMesh.scale.x = 2;
				this.modelMesh.scale.y = 1;
				this.modelMesh.scale.z = 2.7;
				this.modelMesh.rotation.y = 1.9;
				this.modelMesh.name = 'bridge';
				info.scene.add(this.modelMesh);
				info.meshes.push(this.modelMesh);
			}
		);
	}
}
