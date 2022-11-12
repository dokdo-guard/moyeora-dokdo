import * as THREE from "three";

export const spotMesh1 = new THREE.Mesh(
    new THREE.PlaneGeometry(3, 3),
    new THREE.MeshStandardMaterial({
      color: "yellow",
      transparent: true,
      opacity: 0.4
    }),
  );
  spotMesh1.position.set(27, 0.19, -21);
  spotMesh1.rotation.x = -Math.PI / 2;
  spotMesh1.receiveShadow = true;


  export  const spotMesh2 = new THREE.Mesh(
    new THREE.PlaneGeometry(3, 3),
    new THREE.MeshStandardMaterial({
      color: "green",
      transparent: true,
      opacity: 0,
    }),
  );
  spotMesh2.position.set(48, 0.19, -3);
  spotMesh2.rotation.x = -Math.PI / 2;
  spotMesh2.receiveShadow = true;

  export const spotMesh3 = new THREE.Mesh(
    new THREE.PlaneGeometry(3, 3),
    new THREE.MeshStandardMaterial({
      color: "skyblue",
      transparent: true,
      opacity: 0.5,
    }),
  );
  spotMesh3.position.set(21.5, 0.19, 9.3);
  spotMesh3.rotation.x = -Math.PI / 2;
  spotMesh3.rotation.z = 0.27;
  spotMesh3.receiveShadow = true;

export const spotMesh4 = new THREE.Mesh(
    new THREE.PlaneGeometry(3, 3),
    new THREE.MeshStandardMaterial({
      color: "pink",
      transparent: true,
      opacity: 0,
    }),
  );
  spotMesh4.position.set(38, 0.19, 29);
  spotMesh4.rotation.x = -Math.PI / 2;
  spotMesh4.rotation.z = 1;
  spotMesh4.receiveShadow = true;