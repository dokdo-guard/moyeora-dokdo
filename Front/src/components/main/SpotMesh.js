import * as THREE from "three";

const portalTexture = new THREE.TextureLoader().load("/assets/images/footMesh.png");

// 지형관
export const spotMesh1 = new THREE.Mesh(
    new THREE.PlaneGeometry(3, 3),
    new THREE.MeshStandardMaterial({
      opacity: 0.5,
      map: portalTexture,
      transparent: true,
    }),
  );
  spotMesh1.position.set(27.5, 0.19, -20.5);
  spotMesh1.rotation.x = -Math.PI / 2;

    // 퀴즈관
  export  const spotMesh2 = new THREE.Mesh(
    new THREE.PlaneGeometry(3, 3),
    new THREE.MeshStandardMaterial({
      map: portalTexture,
      transparent: true,
      opacity: 0.5,
    }),
  );
  spotMesh2.position.set(47, 0.19, -3);
  spotMesh2.rotation.x = -Math.PI / 2;
  spotMesh2.rotation.z = -1.6;

  // 생태관
  export const spotMesh3 = new THREE.Mesh(
    new THREE.PlaneGeometry(3, 3),
    new THREE.MeshStandardMaterial({
      map: portalTexture,
      transparent: true,
      opacity: 0.5,
    }),
  );
  spotMesh3.position.set(22, 0.19, 9);
  spotMesh3.rotation.x = -Math.PI / 2;
  spotMesh3.rotation.z = 2.3;

  // 역사관
export const spotMesh4 = new THREE.Mesh(
    new THREE.PlaneGeometry(3, 3),
    new THREE.MeshStandardMaterial({
      map: portalTexture,
      transparent: true,
      opacity: 0.5,
    }),
  );
  spotMesh4.position.set(38, 0.19, 28.1);
  spotMesh4.rotation.x = -Math.PI / 2;
  spotMesh4.rotation.z = 2.1;