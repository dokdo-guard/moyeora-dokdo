import { NPC } from "../glTF/NPC.js";
import * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/examples/js/libs/draco/");
dracoLoader.setDecoderConfig({ type: "js" });

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

  // 상호작용할 동물들
export const 강치 = new NPC({
    gltfLoader,
    modelSrc: "/assets/glTF/강치.gltf",
    x: 28,
    y: 0.5,
    z: -1,
  });

export const 돌고래 = new NPC({
    gltfLoader,
    modelSrc: "/assets/glTF/돌고래.gltf",
    x: -7,
    y: -1.2,
    z: 22,
  });