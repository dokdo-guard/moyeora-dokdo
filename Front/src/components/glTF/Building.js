export class Building {
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
				// this.modelMesh.castShadow = true;
				this.modelMesh.position.set(this.x, this.y, this.z);
				// this.modelMesh.scale.multiplyScalar(0.5);
				// this.modelMesh.scale.x = 0.6
				// this.modelMesh.scale.y = 0.6
				// this.modelMesh.scale.z = 0.6
				info.scene.add(this.modelMesh);
				info.meshes.push(this.modelMesh);
			}
		);
	}
}
