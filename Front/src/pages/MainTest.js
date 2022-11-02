import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import gsap from 'gsap';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

import '../components/css/MainTest.css'

import { Player } from '../components/glTF/Player';
import { Building } from '../components/glTF/Building';
import { Nature } from '../components/glTF/Nature';
import {Bridge} from '../components/glTF/Bridge'
import {Territory} from '../components/glTF/Territory'
import { EcoSystem } from '../components/glTF/EcoSystem';
import {NPC} from '../components/glTF/NPC'
import { Quiz } from '../components/glTF/Quiz';

import HistoryPopup from '../components/popup/HistoryPopup';
import TerrianPopup from '../components/popup/TerrianPopup';
import OXQuizPopup from '../components/popup/OXQuizPopup'
import EcoSystemPopup from '../components/popup/EcosystemPopup';


function MainTest() {


// Cannon(물리엔진)
const cannonWorld = new CANNON.World();
cannonWorld.gravity.set(0,-10,0);

// 성능을 위한 세팅
// cannonWorld.allowSleep = true;
// cannonWorld.broadphase = new CANNON.SAPBroadphase(cannonWorld);


// Renderer
const canvas = document.querySelector('#three-canvas');
const renderer = new THREE.WebGLRenderer({
	canvas,
	antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.OrthographicCamera(
	-(window.innerWidth / window.innerHeight), // left
	window.innerWidth / window.innerHeight, // right,
	1, // top
	-1, // bottom
	-1000,
	1000
);

const cameraPosition = new THREE.Vector3(1, 5, 5);
camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
camera.zoom = 0.15;
camera.updateProjectionMatrix();
scene.add(camera);

// Light
const ambientLight = new THREE.AmbientLight('white', 0.7);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight('white', 0.5);
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
scene.add(directionalLight);




// 여기서부터 땅 표현
// Texture
const textureLoader = new THREE.TextureLoader();
const eastFloorTexture = textureLoader.load('/assets/images/east.png');
const westFloorTexture = textureLoader.load('/assets/images/west.png');
const oceanTexture = textureLoader.load('/assets/images/ocean.png')
const oceanBlockTexture = textureLoader.load('/assets/images/oceanBlock.png')

// Mesh
const meshes = [];
// 동도 구역
const eastFloorMesh = new THREE.Mesh(
	new THREE.PlaneGeometry(51.38, 87.06),
	new THREE.MeshStandardMaterial({
		map: eastFloorTexture,
		transparent: true
	})
	);
eastFloorMesh.name = 'floor';
eastFloorMesh.rotation.x = -Math.PI/2;
eastFloorMesh.position.x = 38.580
eastFloorMesh.position.y = 0.161
eastFloorMesh.position.z = -2.42
eastFloorMesh.receiveShadow = true;
scene.add(eastFloorMesh);
meshes.push(eastFloorMesh);

const eastFloorShape = new CANNON.Plane();
const eastFloorBody = new CANNON.Body({
	mass:0,
	position: new CANNON.Vec3(38.580,0.161,-2.42),
	shape : eastFloorShape
})
eastFloorBody.quaternion.setFromAxisAngle(
	new CANNON.Vec3(-1,0,0),
	Math.PI / 2
);
cannonWorld.addBody(eastFloorBody)


// 서도 구역
const westFloorMesh = new THREE.Mesh(
	new THREE.PlaneGeometry(65.86, 93.72),
	new THREE.MeshStandardMaterial({
		map: westFloorTexture,
		transparent: true
	})
)
westFloorMesh.name = 'floor';
westFloorMesh.rotation.x = -Math.PI/2;
westFloorMesh.position.x = -34.8
westFloorMesh.position.y = 0.161
westFloorMesh.position.z = -0.6
westFloorMesh.receiveShadow = true;
scene.add(westFloorMesh);
meshes.push(westFloorMesh);
	
const oceanMesh = new THREE.Mesh(
	new THREE.PlaneGeometry(192, 130),
	new THREE.MeshStandardMaterial({
		map: oceanTexture
	})
)

// 바다구역
oceanMesh.name = 'ocean';
oceanMesh.rotation.x = -Math.PI/2;
oceanMesh.position.y = -0.7
oceanMesh.receiveShadow = true;
scene.add(oceanMesh);
meshes.push(oceanMesh);

// 위 바다구역만으로는 가려지지 않는 바다 구역들이 있음(png를 인식 못하고 전체 이미지 크기 영역대로 인식해서)
// 그래서 다른 플레인들을 추가적으로 설치하여 섬 모양대로 깎음
// 여기서 이용된 플레인 개체 수 5장
const oceanBlock1Mesh = new THREE.Mesh(
	new THREE.PlaneGeometry(30, 30),
	new THREE.MeshStandardMaterial({
		map: oceanBlockTexture
	})
)
oceanBlock1Mesh.name = 'ocean'
oceanBlock1Mesh.rotation.x = -Math.PI/2;
oceanBlock1Mesh.rotation.z = 2;
oceanBlock1Mesh.position.y = 2
oceanBlock1Mesh.position.x = -60
oceanBlock1Mesh.position.z = -22
oceanBlock1Mesh.visible = false
scene.add(oceanBlock1Mesh);
meshes.push(oceanBlock1Mesh);

const oceanBlock2Mesh = new THREE.Mesh(
	new THREE.PlaneGeometry(30, 30),
	new THREE.MeshStandardMaterial({
		map: oceanBlockTexture
	})
)
oceanBlock2Mesh.name = 'ocean'
oceanBlock2Mesh.rotation.x = -Math.PI/2;
oceanBlock2Mesh.rotation.z = 2;
oceanBlock2Mesh.position.y = 2
oceanBlock2Mesh.position.x = 60
oceanBlock2Mesh.position.z = -30
oceanBlock2Mesh.visible = false
scene.add(oceanBlock2Mesh);
meshes.push(oceanBlock2Mesh);


const oceanBlock3Mesh = new THREE.Mesh(
	new THREE.PlaneGeometry(30, 30),
	new THREE.MeshStandardMaterial({
		map: oceanBlockTexture
	})
)
oceanBlock3Mesh.name = 'ocean'
oceanBlock3Mesh.rotation.x = -Math.PI/2;
oceanBlock3Mesh.rotation.z = 1.3;
oceanBlock3Mesh.scale.x = 0.8;
oceanBlock3Mesh.position.y = 2
oceanBlock3Mesh.position.x = 65
oceanBlock3Mesh.position.z = 22
oceanBlock3Mesh.visible = false
scene.add(oceanBlock3Mesh);
meshes.push(oceanBlock3Mesh);

const oceanBlock4Mesh = new THREE.Mesh(
	new THREE.PlaneGeometry(30, 30),
	new THREE.MeshStandardMaterial({
		map: oceanBlockTexture
	})
)
oceanBlock4Mesh.name = 'ocean'
oceanBlock4Mesh.rotation.x = -Math.PI/2;
oceanBlock4Mesh.rotation.z = 0.3;
oceanBlock4Mesh.position.y = 2
oceanBlock4Mesh.position.x = -65
oceanBlock4Mesh.position.z = 33
oceanBlock4Mesh.visible = false
scene.add(oceanBlock4Mesh);
meshes.push(oceanBlock4Mesh);

const oceanBlock5Mesh = new THREE.Mesh(
	new THREE.PlaneGeometry(30, 30),
	new THREE.MeshStandardMaterial({
		map: oceanBlockTexture
	})
)
oceanBlock5Mesh.name = 'ocean'
oceanBlock5Mesh.rotation.x = -Math.PI/2;
oceanBlock5Mesh.rotation.z = 0.3;
oceanBlock5Mesh.position.y = 1
oceanBlock5Mesh.position.x = -10
oceanBlock5Mesh.position.z = -30
oceanBlock5Mesh.visible = false
scene.add(oceanBlock5Mesh);
meshes.push(oceanBlock5Mesh);




// 마우스 포인터
// 이 메쉬를 활용해서 마우스가 어디를 클릭해서 플레이어를 이동시키는지 확인 가능
const pointerMesh = new THREE.Mesh(
	new THREE.PlaneGeometry(0.001, 0.001),
	new THREE.MeshBasicMaterial({
		color: 'crimson',
		// transparent: true,
		opacity: 50
	})
);
pointerMesh.rotation.x = -Math.PI/2;

pointerMesh.position.y = 0.3;
pointerMesh.position.x = 29;
pointerMesh.position.z = -4;

pointerMesh.receiveShadow = true;
scene.add(pointerMesh);


// 지형관 이벤트 위치
// 이 이벤트 영역 안에 들어오면 카메라 앵글 바뀌고 팻말이 등장
const spotMesh1 = new THREE.Mesh(
	new THREE.PlaneGeometry(3, 3),
	new THREE.MeshStandardMaterial({
		color: 'yellow',
		// transparent: true,
		// opacity: 0.5
	})
);
spotMesh1.position.set(27, 0.19, -21);
spotMesh1.rotation.x = -Math.PI/2;
spotMesh1.receiveShadow = true;
scene.add(spotMesh1);

// 퀴즈관 이벤트 위치
const spotMesh2 = new THREE.Mesh(
	new THREE.PlaneGeometry(3, 3),
	new THREE.MeshStandardMaterial({
		color: 'green',
		transparent: true,
		opacity: 0.5
	})
);
spotMesh2.position.set(48,0.19, -3);
spotMesh2.rotation.x = -Math.PI/2;
spotMesh2.receiveShadow = true;
scene.add(spotMesh2);

// 생태관 이벤트 위치
const spotMesh3 = new THREE.Mesh(
	new THREE.PlaneGeometry(3, 3),
	new THREE.MeshStandardMaterial({
		color: 'skyblue',
		transparent: true,
		opacity: 0.5
	})
);
spotMesh3.position.set(21, 0.19, 10);
spotMesh3.rotation.x = -Math.PI/2;
spotMesh3.rotation.z = 0.27;
spotMesh3.receiveShadow = true;
scene.add(spotMesh3);

// 역사관 이벤트 위치
const spotMesh4 = new THREE.Mesh(
	new THREE.PlaneGeometry(3, 3),
	new THREE.MeshStandardMaterial({
		color: 'pink',
		transparent: true,
		opacity: 0.5
	})
);
spotMesh4.position.set(38, 0.19, 29);
spotMesh4.rotation.x = -Math.PI/2;
spotMesh4.rotation.z = 1;
spotMesh4.receiveShadow = true;
scene.add(spotMesh4);


// Draco 오픈소스 -> glTF 용량 줄이기!!!!
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/examples/js/libs/draco/')
dracoLoader.setDecoderConfig({ type: 'js' });

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader)


// 카메라 각도 움직이는 orbitcontrol 코드
//   const orbit = new OrbitControls(camera, renderer.domElement);
//   orbit.update();


// 여기서부터 glTF 모델 임포트하는 코드
// 풍경 나무들
const nature = new Nature({
	gltfLoader,
	scene,
	modelSrc: '/assets/glTF/scene.glb',
	x: 0,
	y: 0,
	z : 0,
})

// 플레이어 캐릭터
const player = new Player({
	scene,
	meshes,
	gltfLoader,
	cannonWorld,
	modelSrc: '/assets/glTF/character/sojung.glb',
});


// 상호작용할 동물들
const 강치 = new NPC({
	gltfLoader,
	  scene,
	  meshes,
	  modelSrc: '/assets/glTF/강치.gltf',
	  x: -10,
	  y: 0,
	  z: -13,
  })

const 돌고래 = new NPC({
	gltfLoader,
	  scene,
	  meshes,
	  modelSrc: '/assets/glTF/돌고래.gltf',
	  x: -7,
	  y: -1.2,
	  z: 22,
  })


// 다리
const bridge = new Bridge({
  gltfLoader,
	scene,
	cannonWorld,
	meshes,
	modelSrc: '/assets/glTF/bridge.gltf',
  	x: 2,
	y: -0.1,
	z : -3,
})


// 역사관
const history = new Building({
  gltfLoader,
	scene,
	cannonWorld,
	modelSrc: '/assets/glTF/history.glb',
	x: 35,
	y: 0.3,
	z: 26,
})

// 지형관
const territory = new Territory({
  gltfLoader,
	scene,
	cannonWorld,
	modelSrc: '/assets/glTF/territory.gltf',
	x: 28,
	y: 1,
	z: -25,
})

// 퀴즈관
const quiz = new Quiz({
	gltfLoader,
	  scene,
	  cannonWorld,
	  modelSrc: '/assets/glTF/quiz.gltf',
	  x: 50,
	  y: 1,
	  z: 0,
  })

// 생태관
const ecosystem = new EcoSystem({
	gltfLoader,
	  scene,
	  cannonWorld,
	  modelSrc: '/assets/glTF/ecosystem.glb',
	  x: 15,
	  y: -2.25,
	  z: 12,
  })



// 퀴즈관 나무 팻말
const QuixSignTexture = textureLoader.load('/assets/images/woodenSign.png')
const QuizSignMesh= new THREE.Mesh(
	new THREE.PlaneGeometry(30, 30),
	new THREE.MeshStandardMaterial({
		map: QuixSignTexture,
		transparent: true,
	})
)
QuizSignMesh.rotation.y = 1.5;
QuizSignMesh.scale.x = 0.1;
QuizSignMesh.scale.y = 0.1;
QuizSignMesh.scale.z = 0.1;
QuizSignMesh.name = '퀴즈팻말'

QuizSignMesh.rotation.y = 0;
QuizSignMesh.position.y = -3
QuizSignMesh.position.x = 47.3
QuizSignMesh.position.z = -5
scene.add(QuizSignMesh);
meshes.push(QuizSignMesh);

// 지질관 나무 팻말
const TerritorySignTexture = textureLoader.load('/assets/images/woodenSign.png')
const TerritorySignMesh= new THREE.Mesh(
	new THREE.PlaneGeometry(30, 30),
	new THREE.MeshStandardMaterial({
		map: TerritorySignTexture,
		transparent: true,
	})
)
TerritorySignMesh.rotation.y = 1.5;
TerritorySignMesh.scale.x = 0.1;
TerritorySignMesh.scale.y = 0.1;
TerritorySignMesh.scale.z = 0.1;
TerritorySignMesh.name = '지질팻말'

TerritorySignMesh.rotation.y = 0;
TerritorySignMesh.position.x = 30
TerritorySignMesh.position.y = -3
TerritorySignMesh.position.z = -22
scene.add(TerritorySignMesh);
meshes.push(TerritorySignMesh);


// 생태관 나무 팻말
const EcoSignTexture = textureLoader.load('/assets/images/woodenSign.png')
const EcoSignMesh= new THREE.Mesh(
	new THREE.PlaneGeometry(30, 30),
	new THREE.MeshStandardMaterial({
		map: EcoSignTexture,
		transparent: true,
	})
)
EcoSignMesh.rotation.y = 3;
EcoSignMesh.scale.x = 0.1;
EcoSignMesh.scale.y = 0.1;
EcoSignMesh.scale.z = 0.1;
EcoSignMesh.name = '생태팻말'
EcoSignMesh.rotation.y = 0.5;
EcoSignMesh.position.x = 20
EcoSignMesh.position.y = -3
EcoSignMesh.position.z = 8
scene.add(EcoSignMesh);
meshes.push(EcoSignMesh);

// 역사관 나무 팻말
const HistorySignTexture = textureLoader.load('/assets/images/woodenSign.png')
const HistorySignMesh= new THREE.Mesh(
	new THREE.PlaneGeometry(30, 30),
	new THREE.MeshStandardMaterial({
		map: HistorySignTexture,
		transparent: true,
	})
)
HistorySignMesh.rotation.y = 3;
HistorySignMesh.scale.x = 0.1;
HistorySignMesh.scale.y = 0.1;
HistorySignMesh.scale.z = 0.1;
HistorySignMesh.name = '역사팻말'
HistorySignMesh.rotation.y = 1;
HistorySignMesh.position.x = 37
HistorySignMesh.position.y = -3
HistorySignMesh.position.z = 28.7
scene.add(HistorySignMesh);
meshes.push(HistorySignMesh);




// 레이캐스터(마우스 클릭 이벤트)
const raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
let destinationPoint = new THREE.Vector3();
let angle = 0;
let isPressed = false; // 마우스를 누르고 있는 상태

// 그리기
// 시계를 활용해서 계속 돌아가는 코드임 -> 애니메이션을 위해!
const clock = new THREE.Clock();

function draw() {
	render()
	const delta = clock.getDelta();
	cannonWorld.step(1/60, delta, 1);
	eastFloorMesh.position.copy(eastFloorBody.position);

	if (player.mixer) {
		player.mixer.update(delta);
	}

	if (강치.mixer) {
		강치.mixer.update(delta)
		강치.actions[0].play()
	}

	if (돌고래.mixer) {
		돌고래.mixer.update(delta)
		돌고래.actions[0].play()
	}

	if (player.modelMesh) {
		camera.lookAt(player.modelMesh.position);
	}

	if(player.cannonBody) {
		player.modelMesh.position.copy(player.cannonBody.position);
		cannonWorld.addBody(player.cannonBody)
	}

	if (territory.cannonBody) {
		territory.modelMesh.position.copy(territory.cannonBody.position);
		cannonWorld.addBody(territory.cannonBody)
	}

	// if (ecosystem.cannonBody) {
	// 	ecosystem.modelMesh.position.copy(ecosystem.cannonBody.position);
	// 	cannonWorld.addBody(ecosystem.cannonBody)
	// }

	if (player.modelMesh) {

		if (isPressed) {
			raycasting();
		}

		if (player.moving) {
			// 걸어가는 상태
			angle = Math.atan2(
				destinationPoint.z - player.modelMesh.position.z,
				destinationPoint.x - player.modelMesh.position.x
			);

			player.cannonBody.position.x += Math.cos(angle) * 0.05
			player.cannonBody.position.z += Math.sin(angle) * 0.05

			camera.position.x = cameraPosition.x + player.modelMesh.position.x;
			camera.position.z = cameraPosition.z + player.modelMesh.position.z;
 			
			player.actions[0].stop();
			player.actions[1].play();
			
			
			if (
				Math.abs(destinationPoint.x - player.modelMesh.position.x) < 0.03 &&
				Math.abs(destinationPoint.z - player.modelMesh.position.z) < 0.03
			) {
				player.moving = false;
				console.log('멈춤');
			}

      // 만약 플레이어 캐릭터가 각 건물의 이벤트 안에 들어갔을 경우에 행할 것
			if (
				(Math.abs(spotMesh1.position.x - player.modelMesh.position.x) < 1.5 &&
				Math.abs(spotMesh1.position.z - player.modelMesh.position.z) < 1.5)
        ||
        (Math.abs(spotMesh2.position.x - player.modelMesh.position.x) < 1.5 &&
				Math.abs(spotMesh2.position.z - player.modelMesh.position.z) < 1.5)
        ||
        (Math.abs(spotMesh3.position.x - player.modelMesh.position.x) < 1.5 &&
				Math.abs(spotMesh3.position.z - player.modelMesh.position.z) < 1.5)
        ||
        (Math.abs(spotMesh4.position.x - player.modelMesh.position.x) < 1.5 &&
				Math.abs(spotMesh4.position.z - player.modelMesh.position.z) < 1.5)
			) {
				gsap.to(
					camera.position,
          {
            duration: 1,
            y: 2.5,
          }
		);
		gsap.to(
			QuizSignMesh.position,
			{
				y : 1,
				duration: 1,
				ease: 'Bounce.eastOut'
			}
		);
		gsap.to(
			TerritorySignMesh.position,
			{
				y : 1,
				duration: 1,
				ease: 'Bounce.eastOut'
			}
		)
		gsap.to(
			EcoSignMesh.position,
			{
				y : 1,
				duration: 1,
				ease: 'Bounce.eastOut'
			}
		)
		gsap.to(
			HistorySignMesh.position,
			{
				y : 1,
				duration: 1,
				ease: 'Bounce.eastOut'
			}
		)
		gsap.to(
			ecosystem.modelMesh.position,
			{
				y : 2.3,
				duration: 1,
				ease: 'Bounce.eastOut'
			}
		)
			
			} else  {
				gsap.to(
					camera.position,
					{
						duration: 1,
						y: 5
					}
				);
				gsap.to(
					QuizSignMesh.position,
			{
				y : -8,
				duration: 1,
			}
				)
				gsap.to(
					TerritorySignMesh.position,
			{
				y : -8,
				duration: 1,
			}
				)
				gsap.to(
					EcoSignMesh.position,
			{
				y : -8,
				duration: 1,
			}
				)
				gsap.to(
					HistorySignMesh.position,
			{
				y : -8,
				duration: 1,
			}
				)
				gsap.to(
					ecosystem.modelMesh.position,
			{
				y : -2.16,
				duration: 1,
			}
				)
				
			}
		} else {
			// 서 있는 상태
			player.actions[1].stop();
			player.actions[0].play();
      		camera.position.x = cameraPosition.x + player.modelMesh.position.x;
			camera.position.z = cameraPosition.z + player.modelMesh.position.z;
		}
	}

	renderer.render(scene, camera);
	renderer.setAnimationLoop(draw);
}



// 마우스로 클릭
function checkIntersects() {
	// raycaster.setFromCamera(mouse, camera);
	const intersects = raycaster.intersectObjects(meshes);
	for (const item of intersects) {
		console.log(item)
		if (item.object.name === 'floor') {
			destinationPoint.x = item.point.x;
			destinationPoint.y = 0.3;
			destinationPoint.z = item.point.z;
			player.modelMesh.lookAt(destinationPoint);

			player.moving = true;

			pointerMesh.position.x = destinationPoint.x;
			pointerMesh.position.z = destinationPoint.z;
			
			console.log('땅이다')

		}
		else if (item.object.name === 'land_79030' || item.object.name === 'land_79020'
		||item.object.name === 'land_79043') {
			destinationPoint.x = item.point.x;
			destinationPoint.y = 0.3;
			destinationPoint.z = item.point.z;
			player.modelMesh.lookAt(destinationPoint);

			player.moving = true;

			pointerMesh.position.x = destinationPoint.x;
			pointerMesh.position.z = destinationPoint.z;
			
			console.log('다리다')
		}
		else if (item.object.name === 'SeaLion') {
			console.log('강치를 터치하였습니다!')
			강치.actions[1].setLoop(THREE.LoopOnce)
			강치.actions[1].stop()
			강치.actions[1].play()
		}
		else if (item.object.name === 'Dolphin') {
			console.log('돌고래를 터치하였습니다!')
			돌고래.actions[1].setLoop(THREE.LoopOnce)
			돌고래.actions[1].stop()
			돌고래.actions[1].play()
		}
		
		else if (item.object.name === 'ocean') {
			console.log('바다다')
		}
		else if (item.object.name === '퀴즈팻말') {
			const QuizPop = document.getElementById('QuizPopup')
			QuizPop.style.display = 'block'
			QuizPop.addEventListener('mouseup', () => {
				isPressed = false;
			});
			console.log('보인다')
		}
		else if (item.object.name === '지질팻말') {
			const TerrianPop = document.getElementById('TerrianPopup')
			TerrianPop.style.display = 'block'
			TerrianPop.addEventListener('mouseup', () => {
				isPressed = false;
			});
			console.log('보인다')
		}
		else if (item.object.name === '생태팻말') {
			const EcoPop = document.getElementById('EcoPopup')
			EcoPop.style.display = 'block'
			EcoPop.addEventListener('mouseup', () => {
				isPressed = false;
			});
			console.log('보인다')
		}
		else if (item.object.name === '역사팻말') {
			const HistoryPop = document.getElementById('HistoryPopup')
			HistoryPop.style.display = 'block'
			HistoryPop.addEventListener('mouseup', () => {
				isPressed = false;
			});
			console.log('보인다')
		}
		break;
	}
}

const quitPopup =() => {
	const QuizPop = document.getElementById('QuizPopup')
	const TerrianPop = document.getElementById('TerrianPopup')
	const EcoPop = document.getElementById('EcoPopup')
	const HistoryPop = document.getElementById('HistoryPopup')
	TerrianPop.style.display = 'none'
	QuizPop.style.display = 'none'
	EcoPop.style.display = 'none'
	HistoryPop.style.display = 'none'
	console.log('나가자!!!')
}


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
window.addEventListener('resize', setSize);

// 마우스 좌표를 three.js에 맞게 변환
function calculateMousePosition(e) {
	mouse.x = e.clientX / canvas.clientWidth * 2 - 1;
	mouse.y = -(e.clientY / canvas.clientHeight * 2 - 1);
}

// 변환된 마우스 좌표를 이용해 래이캐스팅
function raycasting() {
	raycaster.setFromCamera(mouse, camera);
	checkIntersects();
}


// 마우스 이벤트
canvas.addEventListener('mousedown', e => {
	isPressed = true;
	calculateMousePosition(e);
});
canvas.addEventListener('mouseup', () => {
	isPressed = false;
});
canvas.addEventListener('mousemove', e => {
	if (isPressed) {
		calculateMousePosition(e);
	}
});

// 터치 이벤트
canvas.addEventListener('touchstart', e => {
	isPressed = true;
	calculateMousePosition(e.touches[0]);
});
canvas.addEventListener('touchend', () => {
	isPressed = false;
});
canvas.addEventListener('touchmove', e => {
	if (isPressed) {
		calculateMousePosition(e.touches[0]);
	}
});



draw();


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
	  const canvas  = renderer.domElement;
	  camera.aspect = canvas.clientWidth / canvas.clientHeight;
	  camera.updateProjectionMatrix();
	}
	renderer.render(scene, camera)
}

const clickScreenCapture =() => {
	render()
	canvas.toBlob((blob) => {
	saveBlob(blob, `screencapture-${ canvas.width }x${ canvas.height }.png`);
  });
}
 
const saveBlob = (function() {
	const a = document.createElement('a');
	document.body.appendChild(a);
	a.style.display = 'none';
	return function saveData(blob, fileName) {
	   const url = window.URL.createObjectURL(blob);
	   a.href = url;
	   a.download = fileName;
	   a.click();
	};
  }());



  return (
<>
  <div className="mainPage">

	{/* 팝업 컴포넌트들 */}
	<div className='QuizPopup' id='QuizPopup' style={{display:'none'}}>
		<img src="/assets/icons/close.png" id='quitButton'
			onClick={quitPopup}
		></img>
		<OXQuizPopup></OXQuizPopup>
	</div>

	<div className='TerrianPopup' id='TerrianPopup' style={{display:'none'}}>
		<img src="/assets/icons/close.png" id='quitButton'
			onClick={quitPopup}
		></img>
		<TerrianPopup></TerrianPopup>
	</div>

	<div className='EcoPopup' id='EcoPopup' style={{display:'none'}}>
		<img src="/assets/icons/close.png" id='quitButton'
			onClick={quitPopup}
		></img>
		<EcoSystemPopup></EcoSystemPopup>
	</div>

	<div className='HistoryPopup' id='HistoryPopup' style={{display:'none'}}>
		<img src="/assets/icons/close.png" id='quitButton'
			onClick={quitPopup}
		></img>
		<HistoryPopup></HistoryPopup>
	</div>

	{/* <div className='screenShot' onClick={clickScreenCapture} id="screenshot">
		<img className='screenShotButton'
			src='/assets/images/camera.png'
		></img>
		<div className='ButtonBackGround'></div>
	</div> */}

	{/* <div className='tutorial'>
		<img className='tutorialMark'
			src='/assets/images/tutorial.png'
		></img>
		<div className='ButtonBackGround'></div>
	</div> */}

  </div>;
</>
  )
}


const Main =() => {
	return (<>
		<MainTest></MainTest>
	</>)
}

export default Main;