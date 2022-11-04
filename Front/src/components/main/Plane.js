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
      eastFloorMesh.position.x = 38.58;
      eastFloorMesh.position.y = 0.16;
      eastFloorMesh.position.z = -2.42;
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
  westFloorMesh.position.x = -34.8;
  westFloorMesh.position.y = 0.161;
  westFloorMesh.position.z = -0.6;
  westFloorMesh.receiveShadow = true;

  export const oceanMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(192, 130),
    new THREE.MeshStandardMaterial({
      map: oceanTexture,
    }),
  );
  oceanMesh.name = "ocean";
  oceanMesh.rotation.x = -Math.PI / 2;
  oceanMesh.position.y = -0.7;
  oceanMesh.receiveShadow = true;

  export const oceanBlock1Mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 30),
    new THREE.MeshStandardMaterial({
      map: oceanBlockTexture,
    }),
  );
  oceanBlock1Mesh.name = "ocean";
  oceanBlock1Mesh.rotation.x = -Math.PI / 2;
  oceanBlock1Mesh.rotation.z = 2;
  oceanBlock1Mesh.position.y = 2;
  oceanBlock1Mesh.position.x = -60;
  oceanBlock1Mesh.position.z = -22;
  oceanBlock1Mesh.visible = false;

  export const oceanBlock2Mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 30),
    new THREE.MeshStandardMaterial({
      map: oceanBlockTexture,
    }),
  );
  oceanBlock2Mesh.name = "ocean";
  oceanBlock2Mesh.rotation.x = -Math.PI / 2;
  oceanBlock2Mesh.rotation.z = 2;
  oceanBlock2Mesh.position.y = 2;
  oceanBlock2Mesh.position.x = 60;
  oceanBlock2Mesh.position.z = -30;
  oceanBlock2Mesh.visible = false;

  export const oceanBlock3Mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 30),
    new THREE.MeshStandardMaterial({
      map: oceanBlockTexture,
    }),
  );
  oceanBlock3Mesh.name = "ocean";
  oceanBlock3Mesh.rotation.x = -Math.PI / 2;
  oceanBlock3Mesh.rotation.z = 1.3;
  oceanBlock3Mesh.scale.x = 0.8;
  oceanBlock3Mesh.position.y = 2;
  oceanBlock3Mesh.position.x = 65;
  oceanBlock3Mesh.position.z = 22;
  oceanBlock3Mesh.visible = false;

  export const oceanBlock4Mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 30),
    new THREE.MeshStandardMaterial({
      map: oceanBlockTexture,
    }),
  );
  oceanBlock4Mesh.name = "ocean";
  oceanBlock4Mesh.rotation.x = -Math.PI / 2;
  oceanBlock4Mesh.rotation.z = 0.3;
  oceanBlock4Mesh.position.y = 2;
  oceanBlock4Mesh.position.x = -65;
  oceanBlock4Mesh.position.z = 33;
  oceanBlock4Mesh.visible = false;

  export const oceanBlock5Mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 30),
    new THREE.MeshStandardMaterial({
      map: oceanBlockTexture,
    }),
  );
  oceanBlock5Mesh.name = "ocean";
  oceanBlock5Mesh.rotation.x = -Math.PI / 2;
  oceanBlock5Mesh.rotation.z = 0.3;
  oceanBlock5Mesh.position.y = 1;
  oceanBlock5Mesh.position.x = -10;
  oceanBlock5Mesh.position.z = -30;
  oceanBlock5Mesh.visible = false;