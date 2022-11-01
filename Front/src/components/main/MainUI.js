import '../css/MainUI.css'
import * as THREE from 'three';
// import { render } from '@testing-library/react';
// import {draw } from '@testing-library/react'

const MainUI = () => {

    const state = {
        time: 0,
      };

    const camera = new THREE.OrthographicCamera(
        -(window.innerWidth / window.innerHeight), // left
        window.innerWidth / window.innerHeight, // right,
        1, // top
        -1, // bottom
        -1000,
        1000
    );
    const scene = new THREE.Scene();

    const canvas = document.querySelector('#three-canvas');
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true
    });

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
        <div className='mainUI'>
            <button className="screenCapture" id="screenshot"
                type="button"
                onClick={clickScreenCapture}
            >스크린캡처</button>
        </div>
        )
}

export default MainUI