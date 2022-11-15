import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import gsap from "gsap";

import "../components/css/MainTest.css";

import { Player } from "../components/glTF/Player";
import { Nature } from "../components/glTF/Nature";
import { Bridge } from "../components/glTF/Bridge";
import { EcoSystem } from "../components/glTF/EcoSystem";

import HistoryPopup from "../components/popup/HistoryPopup";
import TerrianPopup from "../components/popup/TerrianPopup";
import OXQuizPopup from "../components/popup/OXQuizPopup";
import EcoSystemPopup from "../components/popup/EcosystemPopup";

import Stats from "stats.js";
import { useEffect, useState } from "react";

import { mapReLoading } from "../components/popup/TerrianPopup";

import {
  LoadingComponent,
  MyPagePopup,
  TutorialGangchi,
} from "../components/index";

import {
  eastFloorMesh,
  westFloorMesh,
  oceanMesh,
  oceanBlock1Mesh,
  oceanBlock2Mesh,
  oceanBlock3Mesh,
  oceanBlock4Mesh,
  oceanBlock5Mesh,
} from "../components/main/Plane.js";
import {
  spotMesh1,
  spotMesh2,
  spotMesh3,
  spotMesh4,
} from "../components/main/SpotMesh.js";
import {
  QuizSignMesh,
  TerritorySignMesh,
  EcoSignMesh,
  HistorySignMesh,
} from "../components/main/SignMesh.js";
import {
  clickMyPage,
  quitMyPage,
  clickTutorial,
  quitTutorial,
} from "../components/main/PopupButton.js";
import { NPC } from "../components/glTF/NPC";
import { Vector3 } from "three";
import { checkNPC } from "../api/mainApi.js";

import axios from "axios";
import NPCBubble from "../components/main/NPCbubble";
import BoardHome from "./BoardHome";

function MainTest() {
  //#region = 카메라, 빛, 렌더러, 씬
  // Renderer
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // Scene
  const scene = new THREE.Scene();

  const camera = new THREE.OrthographicCamera(
    -(window.innerWidth / window.innerHeight), // left
    window.innerWidth / window.innerHeight, // right,
    1, // top
    -1, // bottom
    -1000,
    1000,
  );
  camera.position.set(1, 5, 5);
  camera.zoom = 0.14;
  camera.updateProjectionMatrix();

  const ambientLight = new THREE.AmbientLight("white", 0.7);

  const directionalLight = new THREE.DirectionalLight("white", 0.5);
  const directionalLightOriginPosition = new THREE.Vector3(0.5, 1, 1);
  directionalLight.position.set(
    directionalLightOriginPosition.x,
    directionalLightOriginPosition.y,
    directionalLightOriginPosition.z,
  );
  directionalLight.castShadow = true;

  // mapSize 세팅으로 그림자 퀄리티 설정
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  // 그림자 범위
  directionalLight.shadow.camera.left = -100;
  directionalLight.shadow.camera.right = 100;
  directionalLight.shadow.camera.top = 100;
  directionalLight.shadow.camera.bottom = -100;
  directionalLight.shadow.camera.near = -100;
  directionalLight.shadow.camera.far = 100;

  //#endregion

  //#region = scene / meshes add하기
  // Mesh
  const meshes = [];
  // components/main/.js 에서 만든 각 scene 컴포넌트들 한번에 다 scene에 넣기
  useEffect(() => {
    scene.add(
      eastFloorMesh,
      westFloorMesh,
      oceanMesh,
      oceanBlock1Mesh,
      oceanBlock2Mesh,
      oceanBlock3Mesh,
      oceanBlock4Mesh,
      oceanBlock5Mesh,
    );
    scene.add(camera, ambientLight, directionalLight);
    meshes.push(
      eastFloorMesh,
      westFloorMesh,
      oceanMesh,
      oceanBlock1Mesh,
      oceanBlock2Mesh,
      oceanBlock3Mesh,
      oceanBlock4Mesh,
      oceanBlock5Mesh,
    );
    scene.add(spotMesh1, spotMesh2, spotMesh3, spotMesh4);
    scene.add(QuizSignMesh, TerritorySignMesh, EcoSignMesh, HistorySignMesh);
    meshes.push(QuizSignMesh, TerritorySignMesh, EcoSignMesh, HistorySignMesh);
  });
  //#endregion

  // 마우스 포인터
  // 이 메쉬를 활용해서 마우스가 어디를 클릭해서 플레이어를 이동시키는지 확인 가능
  const pointerMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(0.01, 0.01),
    new THREE.MeshBasicMaterial({
      // color: "crimson",
      transparent: true,
      opacity: 0,
    }),
  );
  pointerMesh.rotation.x = -Math.PI / 2;
  pointerMesh.position.set(29, 0.3, -4);
  pointerMesh.receiveShadow = true;
  scene.add(pointerMesh);

  // Draco 오픈소스 -> glTF 용량 줄이기!!!!
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/examples/js/libs/draco/");
  dracoLoader.setDecoderConfig({ type: "js" });

  const gltfLoader = new GLTFLoader();
  gltfLoader.setDRACOLoader(dracoLoader);

  const [isLoaded, setIsLoaded] = useState(false);

  // 로딩 페이지 구현 위함
  gltfLoader.load("/assets/glTF/newScene.glb", function () {
    setIsLoaded(true);
  });

  // 캐릭터 변경 핸들러

  // #region = glTF 모델 임포트
  // 풍경 나무들
  const nature = new Nature({
    gltfLoader,
    scene,
    modelSrc: "/assets/glTF/newScene.glb",
    x: 0,
    y: 0,
    z: 0,
  });

  // 플레이어 캐릭터
  let player = new Player({
    scene,
    meshes,
    gltfLoader,
    camera,
    modelSrc: "/assets/glTF/character/siryeong.glb",
    // x : 0,
    // y : 0,
    // z : 0
  });

  // 다리
  const bridge = new Bridge({
    gltfLoader,
    scene,
    meshes,
    modelSrc: "/assets/glTF/bridge.glb",
    x: 6,
    y: -0.2,
    z: -3.5,
  });

  // 생태관
  const ecosystem = new EcoSystem({
    gltfLoader,
    scene,
    modelSrc: "/assets/glTF/ecosystem.glb",
    x: 15,
    y: -2.25,
    z: 12,
  });

  const 강치 = new NPC({
    scene,
    meshes,
    gltfLoader,
    modelSrc: "/assets/glTF/강치.gltf",
    x: -7.429,
    y: 0.5,
    z: -7.829,
    rotation: 30.6,
  });

  const flamingo = new NPC({
    scene,
    meshes,
    gltfLoader,
    modelSrc: "/assets/glTF/Flamingo.glb",
    x: -20.196,
    y: 0.5,
    z: 0.88,
    rotation: 0,
  });

  const pigeon = new NPC({
    scene,
    meshes,
    gltfLoader,
    modelSrc: "/assets/glTF/Pigeon.glb",
    x: -39.411,
    y: 0.5,
    z: 2.983,
    rotation: -43.4,
  });

  const seagull = new NPC({
    scene,
    meshes,
    gltfLoader,
    modelSrc: "/assets/glTF/Seagull.glb",
    x: -19.82,
    y: 0.5,
    z: 20.572,
    rotation: 0,
  });

  const 바위게 = new NPC({
    scene,
    meshes,
    gltfLoader,
    modelSrc: "/assets/glTF/바위게.glb",
    x: -7.77,
    y: 0.5,
    z: 34.239,
    rotation: 130.2,
  });

  const 독도새우 = new NPC({
    scene,
    meshes,
    gltfLoader,
    modelSrc: "/assets/glTF/독도새우.glb",
    x: -19.18,
    y: 0.5,
    z: -15.894,
    rotation: -70,
  });

  const dog = new NPC({
    scene,
    meshes,
    gltfLoader,
    modelSrc: "/assets/glTF/Dog.gltf",
    x: -25.785,
    y: 0.5,
    z: -7.194,
    rotation: 0,
  });

  const turtle = new NPC({
    scene,
    meshes,
    gltfLoader,
    modelSrc: "/assets/glTF/Turtle.glb",
    x: -47.657,
    y: 0.5,
    z: 21.398,
    rotation: -30.6,
  });

  const 돌고래 = new NPC({
    scene,
    meshes,
    gltfLoader,
    modelSrc: "/assets/glTF/돌고래.glb",
    x: -29.973,
    y: 0.2,
    z: -40.685,
    rotation: 12.8,
  });

  const 펭귄 = new NPC({
    scene,
    meshes,
    gltfLoader,
    modelSrc: "/assets/glTF/Penguin.glb",
    x: -41.336,
    y: 0.2,
    z: -27.849,
    rotation: -5,
  });

  const 게시판 = new NPC({
    scene,
    meshes,
    gltfLoader,
    modelSrc: "/assets/glTF/board.glb",
    x: -28.221,
    y: -0.6,
    z: 14.157,
    rotation: -20.2,
  });

  //#endregion

  // 레이캐스터(마우스 클릭 이벤트)
  const raycaster = new THREE.Raycaster();
  let mouse = new THREE.Vector2();
  let destinationPoint = new THREE.Vector3();
  let angle = 0;
  let isPressed = false; // 마우스를 누르고 있는 상태

  // 그리기
  // 시계를 활용해서 계속 돌아가는 코드임 -> 애니메이션을 위해!
  const clock = new THREE.Clock();

  // fps 체크
  const stats = new Stats();
  document.body.append(stats.domElement);

  //#region = update 함수
  function update() {
    render();
    stats.update();
    const delta = clock.getDelta();

    if (
      강치.mixer &&
      돌고래.mixer &&
      turtle.mixer &&
      펭귄.mixer &&
      dog.mixer &&
      독도새우.mixer &&
      바위게.mixer &&
      flamingo.mixer &&
      pigeon.mixer &&
      seagull.mixer
    ) {
      강치.mixer.update(delta);
      // 강치.actions[0].play();
      돌고래.mixer.update(delta);
      // 돌고래.actions[0].play();
      turtle.mixer.update(delta);
      // turtle.actions[0].play();
      펭귄.mixer.update(delta);
      // 펭귄.actions[0].play();
      dog.mixer.update(delta);
      // dog.actions[0].play();
      독도새우.mixer.update(delta);
      // 독도새우.actions[0].play();
      바위게.mixer.update(delta);
      // 바위게.actions[0].play();
      flamingo.mixer.update(delta);
      // flamingo.actions[0].play();
      pigeon.mixer.update(delta);
      // pigeon.actions[0].play();
      seagull.mixer.update(delta);
      // seagull.actions[0].play();
    }

    if (player.modelMesh) {
      camera.lookAt(player.modelMesh.position);
      if (isPressed) {
        raycasting();
      }
      // player update
      player.update(delta);

      if (player.moving) {
        // 걸어가는 상태
        angle = Math.atan2(
          destinationPoint.z - player.modelMesh.position.z,
          destinationPoint.x - player.modelMesh.position.x,
        );

        camera.position.x = 1 + player.modelMesh.position.x;
        camera.position.z = 5 + player.modelMesh.position.z;

        // 만약 플레이어 캐릭터가 각 건물의 이벤트 안에 들어갔을 경우에 행할 것
        if (
          (Math.abs(spotMesh1.position.x - player.modelMesh.position.x) < 1.5 &&
            Math.abs(spotMesh1.position.z - player.modelMesh.position.z) <
              1.5) ||
          (Math.abs(spotMesh2.position.x - player.modelMesh.position.x) < 1.5 &&
            Math.abs(spotMesh2.position.z - player.modelMesh.position.z) <
              1.5) ||
          (Math.abs(spotMesh3.position.x - player.modelMesh.position.x) < 1.5 &&
            Math.abs(spotMesh3.position.z - player.modelMesh.position.z) <
              1.5) ||
          (Math.abs(spotMesh4.position.x - player.modelMesh.position.x) < 1.5 &&
            Math.abs(spotMesh4.position.z - player.modelMesh.position.z) < 1.5)
        ) {
          gsap.to(camera.position, { duration: 1, y: 3 });
          gsap.to(QuizSignMesh.position, {
            y: 1,
            duration: 1,
            ease: "Bounce.eastOut",
          });
          gsap.to(TerritorySignMesh.position, {
            y: 1,
            duration: 1,
            ease: "Bounce.eastOut",
          });
          gsap.to(EcoSignMesh.position, {
            y: 1,
            duration: 1,
            ease: "Bounce.eastOut",
          });
          gsap.to(HistorySignMesh.position, {
            y: 1,
            duration: 1,
            ease: "Bounce.eastOut",
          });
          gsap.to(ecosystem.modelMesh.position, {
            y: 2.3,
            duration: 1,
            ease: "Bounce.eastOut",
          });
        } else {
          gsap.to(camera.position, { duration: 1, y: 5 });
          gsap.to(QuizSignMesh.position, { y: -4, duration: 1 });
          gsap.to(TerritorySignMesh.position, { y: -4, duration: 1 });
          gsap.to(EcoSignMesh.position, { y: -4, duration: 1 });
          gsap.to(HistorySignMesh.position, { y: -4, duration: 1 });
          gsap.to(ecosystem.modelMesh.position, { y: -2.16, duration: 1 });
        }
      } else {
        // 서 있는 상태
        player.actions[1].stop();
        player.actions[0].play();
        camera.position.x = 1 + player.modelMesh.position.x;
        camera.position.z = 5 + player.modelMesh.position.z;
      }
    }

    renderer.render(scene, camera);
    renderer.setAnimationLoop(update);
  }
  //#endregion

  const quitNPCbubble = () => {
    const 강치Pop = document.getElementById("강치");
    const penguinPop = document.getElementById("penguin");
    const turtlePop = document.getElementById("turtle");
    const dogPop = document.getElementById("dog");
    const 독도새우Pop = document.getElementById("독도새우");
    const dophinPop = document.getElementById("dolphin");
    const 바위게Pop = document.getElementById("바위게");
    const flamingoPop = document.getElementById("flamingo");
    const pigeonPop = document.getElementById("pigeon");
    const seagullPop = document.getElementById("seagull");
    penguinPop.style.display = "none";
    강치Pop.style.display = "none";
    turtlePop.style.display = "none";
    dogPop.style.display = "none";
    dophinPop.style.display = "none";
    바위게Pop.style.display = "none";
    독도새우Pop.style.display = "none";
    flamingoPop.style.display = "none";
    pigeonPop.style.display = "none";
    seagullPop.style.display = "none";
  };

  const touchEffect = new Audio("/assets/audio/ddoing.mp3");
  const NPCSound = new Audio("/assets/audio/npc.mp3");

  // 마우스로 클릭

  function checkIntersects() {
    const intersects = raycaster.intersectObjects(meshes);
    const item = intersects[0];
    if (!item) return;
    let name = item.object.name;
    let answer = { name };
    if (
      item.object.name === "floor" ||
      "land_79030" ||
      "land_79020" ||
      "land_79043"
    ) {
      destinationPoint = new Vector3(item.point.x, 0.3, item.point.z);
      player.moveTo(destinationPoint);

      pointerMesh.position.x = destinationPoint.x;
      pointerMesh.position.z = destinationPoint.z;
    }
    if (item.object.name === "Dolphin") {
      player.dontMove(destinationPoint);
      돌고래.onRaycasted();
      const dolphinPop = document.getElementById("dolphin");
      dolphinPop.style.display = "block";
      isPressed = false;
      checkNPC(answer)
        .then((res) => {
          console.log("api 연결 성공!");
        })
        .catch((err) => {
          console.log(err);
        });
      NPCSound.play();
    }
    if (item.object.name === "SeaLion") {
      player.dontMove(destinationPoint);
      강치.onRaycasted();
      const 강치Pop = document.getElementById("강치");
      강치Pop.style.display = "block";
      isPressed = false;
      checkNPC(answer)
        .then((res) => {
          console.log("api 연결 성공!");
        })
        .catch((err) => {
          console.log(err);
        });
      NPCSound.play();
    }
    if (item.object.name === "Flamingo") {
      player.dontMove(destinationPoint);
      flamingo.onRaycasted();
      const flamingoPop = document.getElementById("flamingo");
      flamingoPop.style.display = "block";
      checkNPC(answer)
        .then((res) => {
          console.log("api 연결 성공!");
        })
        .catch((err) => {
          console.log(err);
        });
      isPressed = false;
      NPCSound.play();
    }
    if (item.object.name === "Pigeon") {
      player.dontMove(destinationPoint);
      pigeon.onRaycasted();
      const pigeonPop = document.getElementById("pigeon");
      pigeonPop.style.display = "block";
      isPressed = false;
      checkNPC(answer)
        .then((res) => {
          console.log("api 연결 성공!");
        })
        .catch((err) => {
          console.log(err);
        });
      NPCSound.play();
    }
    if (item.object.name === "Seagull") {
      player.dontMove(destinationPoint);
      seagull.onRaycasted();
      const seagullPop = document.getElementById("seagull");
      seagullPop.style.display = "block";
      isPressed = false;
      checkNPC(answer)
        .then((res) => {
          console.log("api 연결 성공!");
        })
        .catch((err) => {
          console.log(err);
        });
      NPCSound.play();
    }
    if (item.object.name === "Crab") {
      player.dontMove(destinationPoint);
      바위게.onRaycasted();
      const 바위게Pop = document.getElementById("바위게");
      바위게Pop.style.display = "block";
      isPressed = false;
      checkNPC(answer)
        .then((res) => {
          console.log("api 연결 성공!");
        })
        .catch((err) => {
          console.log(err);
        });
      NPCSound.play();
    }
    if (item.object.name === "Prawn") {
      player.dontMove(destinationPoint);
      독도새우.onRaycasted();
      const 독도새우Pop = document.getElementById("독도새우");
      독도새우Pop.style.display = "block";
      isPressed = false;
      checkNPC(answer)
        .then((res) => {
          console.log("api 연결 성공!");
        })
        .catch((err) => {
          console.log(err);
        });
      NPCSound.play();
    }
    if (item.object.name === "Dog") {
      player.dontMove(destinationPoint);
      dog.onRaycasted();
      const dogPop = document.getElementById("dog");
      dogPop.style.display = "block";
      isPressed = false;
      checkNPC(answer)
        .then((res) => {
          console.log("api 연결 성공!");
        })
        .catch((err) => {
          console.log(err);
        });
      NPCSound.play();
    }
    if (item.object.name === "Turtle") {
      player.dontMove(destinationPoint);
      turtle.onRaycasted();
      const turtlePop = document.getElementById("turtle");
      turtlePop.style.display = "block";
      isPressed = false;
      checkNPC(answer)
        .then((res) => {
          console.log("api 연결 성공!");
        })
        .catch((err) => {
          console.log(err);
        });
      NPCSound.play();
    }
    if (item.object.name === "Penguin") {
      player.dontMove(destinationPoint);
      펭귄.onRaycasted();
      const penguinPop = document.getElementById("penguin");
      penguinPop.style.display = "block";
      isPressed = false;
      checkNPC(answer)
        .then((res) => {
          console.log("api 연결 성공!");
        })
        .catch((err) => {
          console.log(err);
        });
      NPCSound.play();
    }
    if (item.object.name === "ocean") {
      player.moving = false;
    }
    const accessToken = sessionStorage.getItem("accessToken");
    // --관 입장 팻말
    if (item.object.name === "퀴즈팻말") {
      const QuizPop = document.getElementById("QuizPopup");
      QuizPop.style.display = "block";
      QuizPop.addEventListener("mouseup", () => {
        isPressed = false;
      });
      player.moving = false;
      touchEffect.play();
    }
    if (item.object.name == "지질팻말") {
      const TerrianPop = document.getElementById("TerrianPopup");
      TerrianPop.style.display = "block";
      TerrianPop.addEventListener("mouseup", () => {
        isPressed = false;
      });
      TerrianPop.addEventListener("click", () => {
        const visitTerrain = async () => {
          await axios.post(
            `https://k7d204.p.ssafy.io/api/badge`,
            { badge: "visitTerrain" },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            },
          );
        };
        visitTerrain();
      });
      mapReLoading();
      touchEffect.play();
      player.moving = false;
    }
    if (item.object.name === "생태팻말") {
      const EcoPop = document.getElementById("EcoPopup");
      EcoPop.style.display = "block";
      EcoPop.addEventListener("mouseup", () => {
        isPressed = false;
      });
      EcoPop.addEventListener("click", () => {
        const visitEco = async () => {
          await axios.post(
            `https://k7d204.p.ssafy.io/api/badge`,
            { badge: "visitBiology" },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            },
          );
        };
        visitEco();
      });
      player.moving = false;
      touchEffect.play();
    }
    if (item.object.name === "역사팻말") {
      const HistoryPop = document.getElementById("HistoryPopup");
      HistoryPop.style.display = "block";
      HistoryPop.addEventListener("mouseup", () => {
        isPressed = false;
      });
      HistoryPop.addEventListener("click", () => {
        const visitHistory = async () => {
          await axios.post(
            `https://k7d204.p.ssafy.io/api/badge`,
            { badge: "visitHistory" },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            },
          );
        };
        visitHistory();
      });
      player.moving = false;
      touchEffect.play();
    }
    if (item.object.name.includes("land_76002")) {
      const BoardPop = document.getElementById("board");
      isPressed = false;
      BoardPop.style.display = "block";
      player.moving = false;
      touchEffect.play();
    }
  }

  // 지형관 상태 변경 감지 코드
  var popUp = false;
  const TerrianQuitPopup = () => {
    const TerrianPop = document.getElementById("TerrianPopup");
    TerrianPop.style.display = "none";
    // setPopUp(!popUp);
    popUp = !popUp;
  };

  function setSize() {
    camera.left = -(window.innerWidth / window.innerHeight);
    camera.right = window.innerWidth / window.innerHeight;
    camera.top = 1;
    camera.bottom = -1;

    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  // 게시판 안보이는 함수
  const quitBoard = () => {
    const BoardPop = document.getElementById("board");
    BoardPop.style.display = "none";
  };

  // 이벤트
  window.addEventListener("resize", setSize);

  // 마우스 좌표를 three.js에 맞게 변환
  function calculateMousePosition(e) {
    mouse.x = (e.clientX / canvas.clientWidth) * 2 - 1;
    mouse.y = -((e.clientY / canvas.clientHeight) * 2 - 1);
  }

  // 변환된 마우스 좌표를 이용해 래이캐스팅
  function raycasting() {
    raycaster.setFromCamera(mouse, camera);
    checkIntersects();
  }

  // 마우스 이벤트
  canvas.addEventListener("mousedown", (e) => {
    isPressed = true;
    calculateMousePosition(e);
  });
  canvas.addEventListener("mouseup", () => {
    isPressed = false;
  });
  canvas.addEventListener("mousemove", (e) => {
    if (isPressed) {
      calculateMousePosition(e);
    }
  });

  // 스크린 캡처 코드를 위해 render 함수를 따로 분리해서 설정해줌
  function resizeRendererToDisplaySize(renderer) {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render() {
    if (resizeRendererToDisplaySize(renderer)) {
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    renderer.render(scene, camera);
  }

  const clickScreenCapture = () => {
    render();
    canvas.toBlob((blob) => {
      saveBlob(blob, `screencapture-${canvas.width}x${canvas.height}.png`);
    });
  };

  const saveBlob = (function () {
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style.display = "none";
    return function saveData(blob, fileName) {
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = fileName;
      a.click();
    };
  })();
  //

  //#region = 캐릭터 선택하기
  const changeSiryeong = () => {
    scene.remove(player.modelMesh);
    player = new Player({
      scene,
      meshes,
      gltfLoader,
      modelSrc: "/assets/glTF/character/siryeong.glb",
      x: destinationPoint.x,
      y: 0.3,
      z: destinationPoint.z,
    });
  };
  const changeSojung = () => {
    scene.remove(player.modelMesh);
    player = new Player({
      scene,
      meshes,
      gltfLoader,
      modelSrc: "/assets/glTF/character/sojung.glb",
      x: destinationPoint.x,
      y: 0.3,
      z: destinationPoint.z,
    });
  };
  const changeHyoseon = () => {
    scene.remove(player.modelMesh);
    player = new Player({
      scene,
      meshes,
      gltfLoader,
      modelSrc: "/assets/glTF/character/hyoseon.glb",
      x: destinationPoint.x,
      y: 0.3,
      z: destinationPoint.z,
    });
  };
  const changeYoungjin = () => {
    scene.remove(player.modelMesh);
    player = new Player({
      scene,
      meshes,
      gltfLoader,
      modelSrc: "/assets/glTF/character/youngjin.glb",
      x: destinationPoint.x,
      y: 0.3,
      z: destinationPoint.z,
    });
  };
  const changeSeongryeong = () => {
    scene.remove(player.modelMesh);
    player = new Player({
      scene,
      meshes,
      gltfLoader,
      modelSrc: "/assets/glTF/character/seongryeong.glb",
      x: destinationPoint.x,
      y: 0.3,
      z: destinationPoint.z,
    });
  };
  const changeChaehyeon = () => {
    scene.remove(player.modelMesh);
    player = new Player({
      scene,
      meshes,
      gltfLoader,
      modelSrc: "/assets/glTF/character/chaehyeon.glb",
      x: destinationPoint.x,
      y: 0.3,
      z: destinationPoint.z,
    });
  };
  //#endregion

  // 플레이어 캐릭터 행동
  const actionHandler = (e) => {
    render();
    if (player.mixer) {
      player.actions[e].setLoop(THREE.LoopOnce);
      player.actions[e].stop();
      player.actions[e].play();
    }
  };

  update();

  return (
    <>
      {isLoaded ? (
        <div className='mainPage'>
          {/* 맨 처음 강치의 튜토리얼 소개 페이지 */}
          <TutorialGangchi></TutorialGangchi>
          {/* 팝업 컴포넌트들 */}
          <div className='QuizPopup' id='QuizPopup' style={{ display: "none" }}>
            <OXQuizPopup></OXQuizPopup>
          </div>
          <div
            className='TerrianPopup'
            id='TerrianPopup'
            style={{ display: "none" }}
          >
            <TerrianPopup
              isShown={popUp}
              TerrianQuitPopup={TerrianQuitPopup}
            ></TerrianPopup>
          </div>

          <div className='EcoPopup' id='EcoPopup' style={{ display: "none" }}>
            <EcoSystemPopup></EcoSystemPopup>
          </div>

          <div
            className='HistoryPopup'
            id='HistoryPopup'
            style={{ display: "none" }}
          >
            <HistoryPopup></HistoryPopup>
          </div>

          {/* 마이페이지 버튼 */}
          <div
            className='myPage'
            onClick={() => {
              clickMyPage();
            }}
          >
            My Page
          </div>
          <div id='myPage' style={{ display: "none" }}>
            <img
              src='/assets/icons/cancel.png'
              className='quitMyPage'
              onClick={() => {
                quitMyPage();
              }}
              alt='EMPTY'
            ></img>
            <MyPagePopup
              changeSojung={changeSojung}
              changeSiryeong={changeSiryeong}
              changeHyoseon={changeHyoseon}
              changeYoungjin={changeYoungjin}
              changeSeongryeong={changeSeongryeong}
              changeChaehyeon={changeChaehyeon}
              quitMyPage={quitMyPage}
            ></MyPagePopup>
          </div>

          {/* 하단의 스크린샷 버튼과 튜토리얼 버튼 */}
          <div
            className='screenShot'
            onClick={clickScreenCapture}
            id='screenshot'
          >
            <img
              className='screenShotButton'
              src='/assets/images/camera.png'
            ></img>
            <div className='ButtonBackGround'></div>
          </div>

          <div className='tutorial' onClick={clickTutorial}>
            <img
              src='/assets/images/tutorial.png'
              className='tutorialImage'
            ></img>
          </div>
          <div id='tutorial' style={{ display: "none" }}>
            <img
              className='tutorialMark'
              src='/assets/images/tutorial.png'
            ></img>
            <img
              src='/assets/icons/cancel.png'
              className='quitTutorial'
              onClick={quitTutorial}
            ></img>
          </div>

          {/* 플레이어 캐릭터 애니메이션 */}
          <div
            onClick={() => {
              actionHandler(3);
            }}
            className='dance'
          >
            <img
              className='actionImage'
              src='/assets/images/emotions/dance.png'
            ></img>
            <div className='actionButton'></div>
          </div>

          <div
            onClick={() => {
              actionHandler(2);
            }}
            className='victory'
          >
            <img
              className='actionImage'
              src='/assets/images/emotions/hurray.png'
            ></img>
            <div className='actionButton'></div>
          </div>

          <div
            onClick={() => {
              actionHandler(4);
            }}
            className='sad'
          >
            <img
              className='actionImage'
              src='/assets/images/emotions/sad.png'
            ></img>
            <div className='actionButton'></div>
          </div>

          <div id='board' style={{ display: "none" }}>
            <BoardHome quitBoard={quitBoard}></BoardHome>
          </div>

          {/* NPC 캐릭터들 말풍선들 */}
          <NPCBubble quitNPCbubble={quitNPCbubble}></NPCBubble>
        </div>
      ) : (
        <LoadingComponent />
      )}
    </>
  );
}

export default MainTest;
