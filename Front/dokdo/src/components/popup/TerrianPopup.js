import React, { useEffect, useRef } from "react";
import "../css/TerrianPopup.css";

// 더미 데이터
// const dummy_data = [
//   {
//     name: "얼굴바위",
//     summary: "사람의 얼굴과 흡사한 독특한 모양의 바위",
//     location: "동도",
//     img1: "얼굴바위1.jpg",
//     img2: "얼굴바위2.jpg",
//     img3: "얼굴바위3.jpg",
//     img4: "얼굴바위4.jpg",
//   },
//   {
//     name: "춧발바위",
//     summary: "춧발은 갑, 곶 등이 튀나온 곳을 의미하는 현지 방언",
//     location: "동도",
//     img1: "춧발바위1.jpg",
//     img2: "",
//     img3: "",
//     img4: "",
//   },
//   {
//     name: "부채바위",
//     summary: "남서쪽에서 바라보면 마치 부채를 펼친 모양의 바위",
//     location: "동도",
//     img1: "부채바위1.jpg",
//     img2: "부채바위2.jpg",
//     img3: "부채바위3.jpg",
//     img4: "",
//   },
//   {
//     name: "숫돌바위",
//     summary:
//       "주민들이 생활할 당시 칼을 갈았다는 곳으로 바위 암질이 숫돌과 비슷하여 붙여진 이름",
//     location: "동도",
//     img1: "숫돌바위1.jpg",
//     img2: "숫돌바위2.jpg",
//     img3: "숫돌바위3.jpg",
//     img4: "숫돌바위4.jpg",
//   },
//   {
//     name: "천장굴",
//     summary: "침식에 의해 함몰로 생긴 천장동굴로 불린 명칭",
//     location: "동도",
//     img1: "천장굴1.jpg",
//     img2: "천장굴2.jpg",
//     img3: "천장굴3.jpg",
//     img4: "천장굴4.jpg",
//   },
//   {
//     name: "우산봉",
//     summary: "독도가 우산도라고 불리워진 것을 반영하여 붙여진 지명",
//     location: "동도",
//     img1: "대한봉1.jpg",
//     img2: "우산봉1.jpg",
//     img3: "우산봉2.jpg",
//     img4: "",
//   },
//   {
//     name: "대한봉",
//     summary: "대한민국 영토를 상징하며, ‘대한민국’을 줄여 붙여진 지명",
//     location: "동도",
//     img1: "대한봉1.jpg",
//     img2: "대한봉2.jpg",
//     img3: "대한봉3.jpg",
//     img4: "",
//   },
//   {
//     name: "전차바위",
//     summary: "전차 형상으로 독특한 모양의 바위",
//     location: "동도",
//     img1: "전차바위1.jpg",
//     img2: "",
//     img3: "",
//     img4: "",
//   },
//   {
//     name: "해녀바위",
//     summary: "예전 해녀들이 쉬었던 바위",
//     location: "동도",
//     img1: "해녀바위1.jpg",
//     img2: "",
//     img3: "",
//     img4: "",
//   },
//   {
//     name: "큰가제바위",
//     summary: "강치(가제)가 출현하는 장소로 현지 어민들의 구전에 의한 명칭",
//     location: "서도",
//     img1: "큰가제바위1.jpg",
//     img2: "큰가제바위2.jpg",
//     img3: "큰가제바위3.jpg",
//     img4: "큰가제바위4.jpg",
//   },
//   {
//     name: "작은가제바위",
//     summary: "큰가제바위 우측 작은바위로 현지 어민들의 구전에 의한 명칭",
//     location: "서도",
//     img1: "큰가제바위1.jpg",
//     img2: "",
//     img3: "",
//     img4: "",
//   },
//   {
//     name: "지네바위",
//     summary: "“이진해”라는 어민이 미역을 채취하던 바위(“진해”⇒“지네”)",
//     location: "서도",
//     img1: "지네바위1.jpg",
//     img2: "지네바위2.jpg",
//     img3: "지네바위3.jpg",
//     img4: "",
//   },
// ];

function TerrianPopup() {
  const mapElement = useRef(null);
  useEffect(() => {
    const { naver } = window;
    if (!mapElement.current || !naver) return;

    const location = new naver.maps.LatLng(37.2435048, 131.866653);
    const mapOptions = {
      center: location,
      zoom: 16,
      scrollWheel: false,
      draggable: false,
      keyboardShortcuts: false,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    };
    const map = new naver.maps.Map(mapElement.current, mapOptions);
    console.log(map.getCenter());
  }, []);
  return (
    <div className='TerrianPopupContainer'>
      <div className='TerrianPopupTitle'>독도의 지리 및 지형</div>
      <div className='TerrianPopupWrapper'>
        <div ref={mapElement} className='TerrianPopupMap'></div>
        <div className='TerrianPopupInfoTable'></div>
      </div>
    </div>
  );
}
export default TerrianPopup;
