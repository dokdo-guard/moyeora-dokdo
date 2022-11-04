
export class Quiz {
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
				// this.modelMesh.rotation.y = -1.5;
				this.modelMesh.castShadow = true;
				this.modelMesh.position.set(this.x, this.y, this.z);
				this.modelMesh.scale.multiplyScalar(0.4);
				info.scene.add(this.modelMesh);
			}
		);
	}
}
