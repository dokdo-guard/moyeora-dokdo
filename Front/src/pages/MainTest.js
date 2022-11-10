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

import Board from "../components/board/Board.js";

import Popup from "../components/mypage/selectCharacter";
import Dictionary from "../components/mypage/dictionary.js";

import Stats from "stats.js";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  clickChat,
  quitChat,
  clickBoard,

} from "../components/main/PopupButton.js";
import {quitNPCbubble} from '../components/main/NPCspeaking.js'
import { NPC } from "../components/glTF/NPC";
import Tutorial from "../components/tutorial/tutorial";
import { Vector2, Vector3 } from "three";

import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import NPCBubble from "../components/main/NPCbubble";

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
  camera.zoom = 0.13;
  camera.updateProjectionMatrix();

  const ambientLight = new THREE.AmbientLight("white", 0.7);

  const directionalLight = new THREE.DirectionalLight("white", 0.5);
  const directionalLightOriginPosition = new THREE.Vector3(0.5, 1, 1);
  directionalLight.position.set(directionalLightOriginPosition.x,directionalLightOriginPosition.y,directionalLightOriginPosition.z)
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
  // 유저 캐릭터 커스텀
  const user = useSelector((state) => state.user.value);
  const accessToken = user.accessToken;
  const [userCharacter, setUserCharacter] = useState(user.userCharacter);
  // 로딩 페이지 구현 위함
  gltfLoader.load("/assets/glTF/scene.glb", function () {
    console.log("ISLOADED");
    setIsLoaded(true);
  });


  // 캐릭터 변경 핸들러

  // #region = glTF 모델 임포트
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

  const 펭귄 = new NPC({
    scene,
    meshes,
    gltfLoader,
    modelSrc: "/assets/glTF/Penguin.gltf",
    x: -20,
    y: 0.2,
    z: 0,
  })

  const 게시판 = new NPC({
    scene,
    meshes,
    gltfLoader,
    modelSrc: "/assets/glTF/Alligator.gltf",
    x: 0,
    y: 0.2,
    z: 0,
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

    if (강치.mixer && 돌고래.mixer && 달고기.mixer && 펭귄.mixer) {
      강치.mixer.update(delta);
      강치.actions[0].play();
      돌고래.mixer.update(delta);
      돌고래.actions[0].play();
      달고기.mixer.update(delta);
      달고기.actions[0].play();
      펭귄.mixer.update(delta);
      펭귄.actions[0].play();
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
    renderer.setAnimationLoop(update);
  }
  //#endregion


  const animalSpeaking = {
    'penguin' : ['이건 재미있다','파이팅','dd','랜덤가자','sdf','1234'],
    'rabbit' : ['잠온다','힘내자']
}
  var penguinSaying = animalSpeaking.penguin[Math.floor(Math.random() * animalSpeaking.penguin.length)]
    setInterval(() => 
      penguinSaying = animalSpeaking.penguin[Math.floor(Math.random() * animalSpeaking.penguin.length)]
      , 2000);
      setInterval(() => 
      console.log(penguinSaying)
      , 2000);
  

// 마우스로 클릭

function checkIntersects() {
    const intersects = raycaster.intersectObjects(meshes);
    const item = intersects[0];
    if (!item) return;
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
    if (
      item.object.name === "SeaLion" ||
      item.object.name === "Dolphin" ||
      item.object.name === "Catfish"
    ) {
      player.dontMove(destinationPoint);
      강치.onRaycasted();
      돌고래.onRaycasted();
      달고기.onRaycasted();
    }
    if (item.object.name === 'Penguin') {
      player.dontMove(destinationPoint);
      
      펭귄.onRaycasted();
      const penguinPop = document.getElementById("penguin");
      penguinPop.style.display = 'block'
      penguinPop.addEventListener("mouseup", () => {
        isPressed = false;
      });
      // penguinSaying = animalSpeaking.penguin[Math.floor(Math.random() * animalSpeaking.penguin.length)]
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
      player.moving = false
    }
    if (item.object.name == "지질팻말") {
      const TerrianPop = document.getElementById("TerrianPopup");
      TerrianPop.style.display = "block";
      TerrianPop.addEventListener("mouseup", () => {
        isPressed = false;
      });
      mapReLoading();

      player.moving = false;
    }
    if (item.object.name === "생태팻말") {
      const EcoPop = document.getElementById("EcoPopup");
      EcoPop.style.display = "block";
      EcoPop.addEventListener("mouseup", () => {
        isPressed = false;
      });
      player.moving = false
    }
    if (item.object.name === "역사팻말") {
      const HistoryPop = document.getElementById("HistoryPopup");
      HistoryPop.style.display = "block";
      HistoryPop.addEventListener("mouseup", () => {
        isPressed = false;
      });
      player.moving = false

    }
    if (item.object.name === 'Alligator') {
      const BoardPop = document.getElementById('board');
      BoardPop.addEventListener("mouseup", () => {
        isPressed = false;
      });
      BoardPop.style.display = 'block';
      player.moving = false
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
  // canvas.addEventListener("mousemove", (e) => {
  //   if (isPressed) {
  //     calculateMousePosition(e);
  //   }
  // });

  // 스크린 캡처 코드를 위해 render 함수를 따로 분리해서 설정해줌
  function resizeRendererToDisplaySize(renderer) {
    // const canvas = renderer.domElement;
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
      // const canvas = renderer.domElement;
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



  update();




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
              alt='EMPTY'
            ></img>
            <HistoryPopup></HistoryPopup>
          </div>

          {/* 마이페이지 버튼 */}
          <div
            className='myPage'
            onClick={() => {
              clickMyPage();
            }}
          >
            캐릭터 변경
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

          <div className='chatButton' onClick={clickChat}>
            <img src='/assets/icons/chat.png' className='chatImage'></img>
          </div>
          <div id='chat' className='chatCancel'>
            <input className='chat'></input>
            <img
              src='/assets/icons/cancel.png'
              onClick={quitChat}
              className='cancelImage'
            ></img>
          </div>
          <div id='board' className='board'>
            <Board></Board>
          </div>
        
        <div id='penguin' className="npcSpeaking">
          <h1 className="npcSaying">{penguinSaying}</h1>
          <img src='/assets/images/npc/penguin.png' className="npcBubble"></img>
          <button onClick={quitNPCbubble} className="quitNPCbubble">확인</button>
        </div>

        {/* <NPCBubble animalName={animalName}></NPCBubble> */}
        
        </div>
      ) : (
        <LoadingComponent />
      )}
    </>
  );
}

export default MainTest;