export class Nature {
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
				this.modelMesh.castShadow = true;
				this.modelMesh.position.set(this.x, this.y, this.z);
				this.modelMesh.scale.multiplyScalar(1);
                // this.modelMesh.rotation.y = -0.1
				info.scene.add(this.modelMesh);
			}
		);
	}
}
