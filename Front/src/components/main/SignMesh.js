import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();
const QuixSignTexture = textureLoader.load("/assets/images/Sign.png");
const TerritorySignTexture = textureLoader.load("/assets/images/Sign.png");
const EcoSignTexture = textureLoader.load("/assets/images/Sign.png");
const HistorySignTexture = textureLoader.load("/assets/images/Sign.png");

export const QuizSignMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(30, 30),
  new THREE.MeshStandardMaterial({
    map: QuixSignTexture,
    transparent: true,
  }),
);
QuizSignMesh.rotation.y = 1.5;
QuizSignMesh.scale.x = 0.1;
QuizSignMesh.scale.y = 0.1;
QuizSignMesh.scale.z = 0.1;
QuizSignMesh.name = "퀴즈팻말";

QuizSignMesh.rotation.y = 0;
QuizSignMesh.position.y = -3;
QuizSignMesh.position.x = 47.3;
QuizSignMesh.position.z = -5;

export const TerritorySignMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 30),
    new THREE.MeshStandardMaterial({
      map: TerritorySignTexture,
      transparent: true,
    }),
  );
  TerritorySignMesh.rotation.y = 1.0;
  TerritorySignMesh.scale.x = 0.1;
  TerritorySignMesh.scale.y = 0.1;
  TerritorySignMesh.scale.z = 0.1;
  TerritorySignMesh.name = "지질팻말";

  TerritorySignMesh.rotation.y = 0;
  TerritorySignMesh.position.x = 30;
  TerritorySignMesh.position.y = -3;
  TerritorySignMesh.position.z = -22;


export const EcoSignMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 30),
    new THREE.MeshStandardMaterial({
      map: EcoSignTexture,
      transparent: true,
    }),
  );
  EcoSignMesh.rotation.y = 3;
  EcoSignMesh.scale.x = 0.1;
  EcoSignMesh.scale.y = 0.1;
  EcoSignMesh.scale.z = 0.1;
  EcoSignMesh.name = "생태팻말";
  EcoSignMesh.rotation.y = 0.5;
  EcoSignMesh.position.x = 20;
  EcoSignMesh.position.y = -3;
  EcoSignMesh.position.z = 8;


export const HistorySignMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 30),
    new THREE.MeshStandardMaterial({
      map: HistorySignTexture,
      transparent: true,
    }),
  );
  HistorySignMesh.rotation.y = 0.2;
  HistorySignMesh.scale.x = 0.1;
  HistorySignMesh.scale.y = 0.1;
  HistorySignMesh.scale.z = 0.1;
  HistorySignMesh.name = "역사팻말";
  HistorySignMesh.position.x = 35;
  HistorySignMesh.position.y = -3;
  HistorySignMesh.position.z = 32;