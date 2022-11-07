import * as THREE from "three";
import * as CANNON from "cannon-es";
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

import Popup from "../components/mypage/selectCharacter";
import Dictionary from "../components/mypage/dictionary.js";

import Stats from "stats.js";
import { useEffect, useState } from "react";

import { mapReLoading } from "../components/popup/TerrianPopup";

import { LoadingComponent } from "../components/index";

import {
  eastFloorMesh,
  westFloorMesh,
  oceanMesh,
  oceanBlock1Mesh,
  oceanBlock2Mesh,
  oceanBlock3Mesh,
  oceanBlock4Mesh,
  oceanBlock5Mesh,
  fiveMesh,
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
  clickDogam,
  quitDogam,
  quitPopup,
} from "../components/main/PopupButton.js";
import { NPC } from "../components/glTF/NPC";
import Tutorial from "../components/tutorial/tutorial";

function MainTest() {
  // Cannon(물리엔진)
  const cannonWorld = new CANNON.World();
  cannonWorld.gravity.set(0, -10, 0);

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

  // export const cameraPosition = new THREE.Vector3(1, 5, 5);
  camera.position.set(1, 5, 5);
  camera.zoom = 0.15;
  camera.updateProjectionMatrix();

  const ambientLight = new THREE.AmbientLight("white", 0.7);

  const directionalLight = new THREE.DirectionalLight("white", 0.5);
  const directionalLightOriginPosition = new THREE.Vector3(0.5, 1, 1);
  directionalLight.position.x = directionalLightOriginPosition.x;
  directionalLight.position.y = directionalLightOriginPosition.y;
  directionalLight.position.z = directionalLightOriginPosition.z;
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

  // Mesh
  const meshes = [];
  // 동도 구역
  const eastFloorShape = new CANNON.Plane();
  const eastFloorBody = new CANNON.Body({
    mass: 0,
    position: new CANNON.Vec3(38.58, 0.161, -2.42),
    shape: eastFloorShape,
  });
  eastFloorBody.quaternion.setFromAxisAngle(
    new CANNON.Vec3(-1, 0, 0),
    Math.PI / 2,
  );
  cannonWorld.addBody(eastFloorBody);

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
      fiveMesh,
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

  // 마우스 포인터
  // 이 메쉬를 활용해서 마우스가 어디를 클릭해서 플레이어를 이동시키는지 확인 가능
  const pointerMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial({
      // color: "crimson",
      transparent: true,
      opacity: 100,
    }),
  );
  pointerMesh.rotation.x = -Math.PI / 2;

  pointerMesh.position.y = 0.3;
  pointerMesh.position.x = 29;
  pointerMesh.position.z = -4;

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
  gltfLoader.load("/assets/glTF/scene.glb", function () {
    console.log("ISLOADED");
    setIsLoaded(true);
  });

  // 여기서부터 glTF 모델 임포트하는 코드
  // 풍경 나무들
  const nature = new Nature({
    gltfLoader,
    scene,
    modelSrc: "/assets/glTF/scene.glb",
    x: 0,
    y: 0,
    z: 0,
  });

  // 플레이어 캐릭터
  let player = new Player({
    scene,
    meshes,
    gltfLoader,
    // // cannonWorld,
    modelSrc: "/assets/glTF/character/sojung.glb",
    // x : 28,
    // y : 0.5,
    // z : -4
  });

  // 다리
  const bridge = new Bridge({
    gltfLoader,
    scene,
    cannonWorld,
    meshes,
    modelSrc: "/assets/glTF/bridge.gltf",
    x: 4,
    y: -0.4,
    z: 3,
  });

  // 생태관
  const ecosystem = new EcoSystem({
    gltfLoader,
    scene,
    cannonWorld,
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
    x: -10,
    y: 0.5,
    z: 0,
  });

  const 돌고래 = new NPC({
    scene,
    meshes,
    gltfLoader,
    modelSrc: "/assets/glTF/돌고래.gltf",
    x: -30,
    y: 0.2,
    z: -40,
  });

  const 달고기 = new NPC({
    scene,
    meshes,
    gltfLoader,
    modelSrc: "/assets/glTF/달고기.gltf",
    x: -50,
    y: 0.2,
    z: 23,
  });

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

  function draw() {
    render();
    stats.update();
    const delta = clock.getDelta();
    cannonWorld.step(1 / 60, delta, 1);

    if (player.mixer) {
      player.mixer.update(delta);
    }

    if (강치.mixer && 돌고래.mixer && 달고기.mixer) {
      강치.mixer.update(delta);
      강치.actions[0].play();
      돌고래.mixer.update(delta);
      돌고래.actions[0].play();
      달고기.mixer.update(delta);
      달고기.actions[0].play();
    }

    // if (player.cannonBody) {
    //   player.modelMesh.position.copy(player.cannonBody.position);
    //   cannonWorld.addBody(player.cannonBody);
    // }

    if (player.modelMesh) {
      camera.lookAt(player.modelMesh.position);
      if (isPressed) {
        raycasting();
      }

      if (player.moving) {
        // 걸어가는 상태
        angle = Math.atan2(
          destinationPoint.z - player.modelMesh.position.z,
          destinationPoint.x - player.modelMesh.position.x,
        );

        // player.cannonBody.position.x += Math.cos(angle) * 0.05;
        // player.cannonBody.position.z += Math.sin(angle) * 0.05;

        player.speed = 7;
        player.modelMesh.position.x += Math.cos(angle) * delta * player.speed;
        player.modelMesh.position.z += Math.sin(angle) * delta * player.speed;

        camera.position.x = 1 + player.modelMesh.position.x;
        camera.position.z = 5 + player.modelMesh.position.z;

        player.actions[0].stop();
        player.actions[1].play();

        if (
          Math.abs(destinationPoint.x - player.modelMesh.position.x) < 0.03 &&
          Math.abs(destinationPoint.z - player.modelMesh.position.z) < 0.03
        ) {
          player.moving = false;
        }

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
          gsap.to(camera.position, { duration: 1, y: 4 });
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
    renderer.setAnimationLoop(draw);
  }

  // 마우스로 클릭
  function checkIntersects() {
    // raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(meshes);
    const item = intersects[0];
    // console.log(item.object.name)
    // for (const item of intersects) {
    if (
      item.object.name === "floor" ||
      "land_79030" ||
      "land_79020" ||
      "land_79043"
    ) {
      destinationPoint.x = item.point.x;
      destinationPoint.y = 0.3;
      destinationPoint.z = item.point.z;
      player.modelMesh.lookAt(destinationPoint);

      player.moving = true;

      pointerMesh.position.x = destinationPoint.x;
      pointerMesh.position.z = destinationPoint.z;
    }
    if (
      item.object.name === "SeaLion" ||
      item.object.name === "Dolphin" ||
      item.object.name === "Catfish"
    ) {
      강치.actions[1].setLoop(THREE.LoopOnce);
      강치.actions[1].stop();
      강치.actions[1].play();
      돌고래.actions[1].setLoop(THREE.LoopOnce);
      돌고래.actions[1].stop();
      돌고래.actions[1].play();
      달고기.actions[1].setLoop(THREE.LoopOnce);
      달고기.actions[1].stop();
      달고기.actions[1].play();
      player.moving = false;
    }

    if (item.object.name === "ocean") {
      player.moving = false;
    }
    if (item.object.name === "퀴즈팻말") {
      const QuizPop = document.getElementById("QuizPopup");
      QuizPop.style.display = "block";
      QuizPop.addEventListener("mouseup", () => {
        isPressed = false;
      });
      player.moving = false;
    }
    if (item.object.name == "지질팻말") {
      const TerrianPop = document.getElementById("TerrianPopup");
      TerrianPop.style.display = "block";
      TerrianPop.addEventListener("mouseup", () => {
        isPressed = false;
      });
      player.moving = false;
      mapReLoading();
    }
    if (item.object.name === "생태팻말") {
      const EcoPop = document.getElementById("EcoPopup");
      EcoPop.style.display = "block";
      EcoPop.addEventListener("mouseup", () => {
        isPressed = false;
      });
      player.moving = false;
    }
    if (item.object.name === "역사팻말") {
      const HistoryPop = document.getElementById("HistoryPopup");
      HistoryPop.style.display = "block";
      HistoryPop.addEventListener("mouseup", () => {
        isPressed = false;
      });
      player.moving = false;
    }
    //   break;
    // }
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
    const canvas = renderer.domElement;
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
      const canvas = renderer.domElement;
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

  // 캐릭터 이름 선택받기
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
      cannonWorld,
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
      cannonWorld,
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
      cannonWorld,
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
      cannonWorld,
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
      cannonWorld,
      modelSrc: "/assets/glTF/character/chaehyeon.glb",
      x: destinationPoint.x,
      y: 0.3,
      z: destinationPoint.z,
    });
  };

  draw();

  return (
    <>
      {isLoaded ? (
        <div className='mainPage'>
          {/* 팝업 컴포넌트들 */}
          <div
            className='QuizPopup'
            id='QuizPopup'
            style={{ display: "none", marginTop: "40px", marginLeft: "115px" }}
          >
            <img
              src='/assets/icons/cancel.png'
              id='quitButton'
              onClick={quitPopup}
            ></img>
            <OXQuizPopup></OXQuizPopup>
          </div>

          <div
            className='TerrianPopup'
            id='TerrianPopup'
            style={{ display: "none", marginTop: "40px", marginLeft: "115px" }}
          >
            <img
              src='/assets/icons/cancel.png'
              id='quitButton'
              onClick={TerrianQuitPopup}
            ></img>
            <TerrianPopup isShown={popUp}></TerrianPopup>
          </div>

          <div
            className='EcoPopup'
            id='EcoPopup'
            style={{ display: "none", marginTop: "40px", marginLeft: "115px" }}
          >
            <img
              src='/assets/icons/cancel.png'
              id='quitButton'
              onClick={quitPopup}
            ></img>
            <EcoSystemPopup></EcoSystemPopup>
          </div>

          <div
            className='HistoryPopup'
            id='HistoryPopup'
            style={{ display: "none", marginTop: "40px", marginLeft: "115px" }}
          >
            <img
              src='/assets/icons/cancel.png'
              id='quitButton'
              onClick={quitPopup}
            ></img>
            <HistoryPopup></HistoryPopup>
          </div>

          {/* 마이페이지 버튼 */}
          <div className='myPage' onClick={clickMyPage}>
            캐릭터 변경
          </div>
          <div id='myPage' style={{ display: "none" }}>
            <img
              src='/assets/icons/cancel.png'
              className='quitMyPage'
              onClick={quitMyPage}
            ></img>
            <Popup
              changeSojung={changeSojung}
              changeSiryeong={changeSiryeong}
              changeHyoseon={changeHyoseon}
              changeYoungjin={changeYoungjin}
              changeSeongryeong={changeSeongryeong}
              changeChaehyeon={changeChaehyeon}
            ></Popup>
          </div>

          {/* 생태도감 버튼 */}
          <div className='dogamButton' onClick={clickDogam}>
            생태도감
          </div>
          <div style={{ display: "none" }} id='dogam' className='dogamMark'>
            <Dictionary></Dictionary>
            <img
              src='/assets/icons/cancel.png'
              className='quitDogam'
              onClick={quitDogam}
            ></img>
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
            <Tutorial></Tutorial>
            <img
              src='/assets/icons/cancel.png'
              className='quitTutorial'
              onClick={quitTutorial}
            ></img>
          </div>
        </div>
      ) : (
        <LoadingComponent />
      )}
    </>
  );
}

export default MainTest;
