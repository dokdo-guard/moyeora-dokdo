import { Suspense, useEffect, useState } from 'react';
import popupStyles from '../css/Character.module.css';
import PropTypes from 'prop-types';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

const globalDataSet = {
  models: {},
  actions: {},
  mixers: {},
  isAnimated: true,
};

const Character = (props) => {
  const modelUrl = '/assets/glTF/character/' + props.character + '.glb';
  const model = useLoader(GLTFLoader, modelUrl);
  globalDataSet.models[props.character] = model;

  const gltf = globalDataSet.models[props.character];

  let mixer;
  if (gltf.animations.length) {
    mixer = new THREE.AnimationMixer(gltf.scene);
    globalDataSet.mixers[props.character] = mixer;

    const action = mixer.clipAction(gltf.animations[props.animation_num]);
    globalDataSet.actions[props.character] = action;

    action.setLoop(THREE.LoopOnce);
    action.play();
  }

  useFrame((state, delta) => {
    if (
      globalDataSet.isAnimated &&
      !globalDataSet.actions[props.character]?.enabled
    ) {
      console.log('idle');
      const action = mixer.clipAction(gltf.animations[0]);
      action.setLoop(THREE.LoopRepeat);
      globalDataSet.actions[props.character].stop();
      globalDataSet.actions[props.character] = action;
      globalDataSet.actions[props.character].play();
      globalDataSet.isAnimated = false;
    }
    mixer?.update(delta);
  });

  return <primitive object={gltf.scene} scale={3} position={[0, -2, 0]} />;
};

const Popup = ((props) => {
  const characters = [
    'siryeong',
    'sojung',
    'hyoseon',
    'youngjin',
    'seongryeong',
    'chaehyeon',
  ];

  const [show, setShow] = useState(false);
  const [myCharacter, setCharacter] = useState('seongryeong');

  const closeHandler = (e) => {
    setShow(false);
    props.onClose(false);
  };

  const actionHandler = (e) => {
    console.log('motion');
    let gltf = globalDataSet.models[myCharacter];
    let mixer = globalDataSet.mixers[myCharacter];

    const action = mixer.clipAction(gltf.animations[e]);
    action.setLoop(THREE.LoopOnce);
    globalDataSet.actions[myCharacter].stop();
    globalDataSet.actions[myCharacter] = action;
    globalDataSet.actions[myCharacter].play();
    globalDataSet.isAnimated = true;
    // props.changeCharacter()
  };

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);
  
  // 메인페이지에 캐릭터 이름 보내기
  useEffect(()=> {
    if (myCharacter ==='siryeong') {
      props.changeSiryeong()
    }
    console.log(myCharacter)
    if (myCharacter ==='sojung') {
      props.changeSojung()
    }
    if (myCharacter ==='hyoseon') {
      props.changeHyoseon()
    }
    if (myCharacter ==='youngjin') {
      props.changeYoungjin()
    }
    if (myCharacter ==='seongryeong') {
      props.changeSeongryeong()
    }
    if (myCharacter ==='chaehyeon') {
      props.changeChaehyeon()
    }
  },[myCharacter])


  return (
    <div
      // style={{
      //   visibility: show ? 'visible' : 'hidden',
      //   opacity: show ? '1' : '0',
      // }}
      className={popupStyles.overlay}
    >
      {/* <span className={popupStyles.close} onClick={closeHandler} /> */}
      <div className={popupStyles.emotion}>
        <img
          src='/assets/images/emotions/win.png'
          onClick={() => {
            actionHandler(5);
          }}
        ></img>
        <img
          src='/assets/images/emotions/dance.png'
          onClick={() => {
            actionHandler(3);
          }}
        ></img>
        <img
          src='/assets/images/emotions/sad.png'
          onClick={() => {
            actionHandler(2);
          }}
        ></img>
      </div>
      <div className={popupStyles.character}>
        <Suspense fallback={<div>기다리는중...</div>}>
          <Canvas>
            <ambientLight intensity={0.3}></ambientLight>
            <directionalLight
              intensity={1}
              position={[0, 0.5, 1]}
              castShadow
            ></directionalLight>
            <mesh>
              <Character character={myCharacter} animation_num={0}></Character>
            </mesh>
          </Canvas>
        </Suspense>
      </div>
      <div className={popupStyles.characters}>
        {characters.map((c_name, idx) => {
          return (
            <div key={idx}>
                <img
                  src={`/assets/images/characters/${c_name}.png`}
                  onClick={()=> {setCharacter(c_name)}}
                ></img>
            </div>
          );
        })}
      </div>
    </div>
  );
});

Popup.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

Character.propTypes = {
  character: PropTypes.string.isRequired,
};

export default Popup;
