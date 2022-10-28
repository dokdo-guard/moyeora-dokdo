import { useEffect, useState, Suspense, useRef } from 'react';
import popupStyles from '../css/Character.module.css';
import PropTypes from 'prop-types';
import { Camera, Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Character = (props) => {
  const gltf = useLoader(GLTFLoader, '/assets/glTF/character/' + props.character);
  console.log(gltf)

  return (
    <>
      <primitive object={gltf.scene} scale={1}></primitive>
    </>
  );
};


const MyCanvas = (props) => {
  return (
    <Canvas>
      <ambientLight intensity={0.7}></ambientLight>
      <directionalLight></directionalLight>
      <Suspense fallback={null}>
        <Character {...props}></Character>
        <Character {...props}></Character>
        <Character {...props}></Character>
        <Character {...props}></Character>
      </Suspense>
    </Canvas>
  );
};

const Popup = (props) => {
  const [show, setShow] = useState(false);
  const closeHandler = (e) => {
    setShow(false);
    props.onClose(false);
  };

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  return (
    <div
      style={{
        visibility: show ? 'visible' : 'hidden',
        opacity: show ? '1' : '0',
      }}
      className={popupStyles.overlay}
    >
      <span className={popupStyles.close} onClick={closeHandler} />
      <div></div>
      <div className={popupStyles.models}>
        <MyCanvas character="siryeong.glb"></MyCanvas>
      </div>
    </div>
  );
};

Popup.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

Character.propTypes = {
  character: PropTypes.string.isRequired,
}

export default Popup;
