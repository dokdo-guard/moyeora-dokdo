import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();
const eastFloorTexture = textureLoader.load("/assets/images/east.png");
const westFloorTexture = textureLoader.load("/assets/images/west.png");
const oceanTexture = textureLoader.load("/assets/images/ocean.png");
const oceanBlockTexture = textureLoader.load("/assets/images/oceanBlock.png");
 
export const eastFloorMesh = 
    new THREE.Mesh(
        new THREE.PlaneGeometry(51.38, 87.06),
        new THREE.MeshStandardMaterial({
          map: eastFloorTexture,
          transparent: true,
        }),
      );
      eastFloorMesh.name = "floor";
      eastFloorMesh.rotation.x = -Math.PI / 2;
      eastFloorMesh.position.set(38.58,0.16,-2.42)
      eastFloorMesh.receiveShadow = true;


export const westFloorMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(65.86, 93.72),
    new THREE.MeshStandardMaterial({
      map: westFloorTexture,
      transparent: true,
    }),
  );
  westFloorMesh.name = "floor";
  westFloorMesh.rotation.x = -Math.PI / 2;
  westFloorMesh.position.set(-34.8,0.161,-0.6)
  westFloorMesh.receiveShadow = true;

  export const oceanMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(192, 130),
    new THREE.MeshStandardMaterial({
      map: oceanTexture,
    }),
  );
  oceanMesh.name = "ocean";
  oceanMesh.rotation.x = -Math.PI / 2;
  oceanMesh.position.y = 0;
  oceanMesh.receiveShadow = true;

  export const oceanBlock1Mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 30),
    new THREE.MeshStandardMaterial({
      map: oceanBlockTexture,
    }),
  );
  oceanBlock1Mesh.name = "";
  oceanBlock1Mesh.rotation.set(-Math.PI / 2,oceanBlock1Mesh.rotation.y,2)
  oceanBlock1Mesh.position.set(-60,2,-22)
  oceanBlock1Mesh.visible = false;

  export const oceanBlock2Mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 30),
    new THREE.MeshStandardMaterial({
      map: oceanBlockTexture,
    }),
  );
  oceanBlock2Mesh.name = "ocean";
  oceanBlock2Mesh.rotation.set(-Math.PI / 2,oceanBlock2Mesh.rotation.y,2)
  oceanBlock2Mesh.rotation.z = 2;
  oceanBlock2Mesh.position.set(60,2,-30)
  oceanBlock2Mesh.visible = false;

  export const oceanBlock3Mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 30),
    new THREE.MeshStandardMaterial({
      map: oceanBlockTexture,
    }),
  );
  oceanBlock3Mesh.name = "ocean";
  oceanBlock3Mesh.rotation.set(-Math.PI / 2,oceanBlock3Mesh.rotation.y,1.3)
  oceanBlock3Mesh.scale.x = 0.8;
  oceanBlock3Mesh.position.set(65,2,22)
  oceanBlock3Mesh.visible = false;

  export const oceanBlock4Mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 30),
    new THREE.MeshStandardMaterial({
      map: oceanBlockTexture,
    }),
  );
  oceanBlock4Mesh.name = "ocean";
  oceanBlock4Mesh.rotation.set(-Math.PI / 2,oceanBlock4Mesh.rotation.y,0.3)
  oceanBlock4Mesh.position.set(-65,2,33)
  oceanBlock4Mesh.visible = false;

  export const oceanBlock5Mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 30),
    new THREE.MeshStandardMaterial({
      map: oceanBlockTexture,
    }),
  );
  oceanBlock5Mesh.name = "ocean";
  oceanBlock5Mesh.rotation.set(-Math.PI / 2,oceanBlock5Mesh.rotation.y,0.3)
  oceanBlock5Mesh.position.set(-10,1,-30)
  oceanBlock5Mesh.visible = false;