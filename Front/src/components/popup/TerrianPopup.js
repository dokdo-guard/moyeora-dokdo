import React, { useEffect, useRef, useState } from "react";
import "../css/TerrianPopup.css";

// dummy_data Start
const dummy_data = [
  {
    name: "닭바위",
    summary: "마치 닭이 알을 품은 형상으로 닭바위로 전하고 있는 바위",
    location: "동도",
    img1: "닭바위1.jpg",
    img2: "닭바위2.jpg",
    img3: "닭바위3.jpg",
    img4: "닭바위4.jpg",
    lat: 37.24133238,
    lng: 131.8686669,
  },
  {
    name: "한반도바위",
    summary: "북쪽에서 바라보면 마치 한반도 형상과 꼭 닮아 붙여진 이름",
    location: "동도",
    img1: "한반도바위1.jpg",
    img2: "한반도바위2.jpg",
    img3: "한반도바위3.jpg",
    img4: "한반도바위4.jpg",
    lat: 37.24054224,
    lng: 131.8707146,
  },
  {
    name: "독립문바위",
    summary: "독립문 형상으로 독특한 모양의 바위",
    location: "동도",
    img1: "독립문바위1.jpg",
    img2: "독립문바위2.jpg",
    img3: "독립문바위3.jpg",
    img4: "독립문바위4.jpg",
    lat: 37.23988236,
    lng: 131.8719601,
  },
  {
    name: "물오리바위",
    summary: "물오리서식지로서 현지어민들에 의해 불려진 명칭",
    location: "동도",
    img1: "물오리바위1.jpg",
    img2: "물오리바위2.jpg",
    img3: "물오리바위3.jpg",
    img4: "물오리바위4jpg",
    lat: 37.24012677,
    lng: 131.8722326,
  },
  {
    name: "얼굴바위",
    summary: "사람의 얼굴과 흡사한 독특한 모양의 바위",
    location: "동도",
    img1: "얼굴바위1.jpg",
    img2: "얼굴바위2.jpg",
    img3: "얼굴바위3.jpg",
    img4: "얼굴바위4.jpg",
    lat: 37.23909369,
    lng: 131.8699547,
  },
  {
    name: "춧발바위",
    summary: "춧발은 갑, 곶 등이 튀나온 곳을 의미하는 현지 방언",
    location: "동도",
    img1: "춧발바위1.jpg",
    img2: "",
    img3: "",
    img4: "",
    lat: 37.23811564,
    lng: 131.8693106,
  },
  {
    name: "부채바위",
    summary: "남서쪽에서 바라보면 마치 부채를 펼친 모양의 바위",
    location: "동도",
    img1: "부채바위1.jpg",
    img2: "부채바위2.jpg",
    img3: "부채바위3.jpg",
    img4: "",
    lat: 37.23864198,
    lng: 131.8679845,
  },
  {
    name: "숫돌바위",
    summary:
      "주민들이 생활할 당시 칼을 갈았다는 곳으로 바위 암질이 숫돌과 비슷하여 붙여진 이름",
    location: "동도",
    img1: "숫돌바위1.jpg",
    img2: "숫돌바위2.jpg",
    img3: "숫돌바위3.jpg",
    img4: "숫돌바위4.jpg",
    lat: 37.23927673,
    lng: 131.8678723,
  },
  {
    name: "천장굴",
    summary: "침식에 의해 함몰로 생긴 천장동굴로 불린 명칭",
    location: "동도",
    img1: "천장굴1.jpg",
    img2: "천장굴2.jpg",
    img3: "천장굴3.jpg",
    img4: "천장굴4.jpg",
    lat: 37.24030128,
    lng: 131.8693975,
  },
  {
    name: "우산봉",
    summary: "독도가 우산도라고 불리워진 것을 반영하여 붙여진 지명",
    location: "동도",
    img1: "대한봉1.jpg",
    img2: "우산봉1.jpg",
    img3: "우산봉2.jpg",
    img4: "",
    lat: 37.2407698,
    lng: 131.8695617,
  },
  {
    name: "대한봉",
    summary: "대한민국 영토를 상징하며, ‘대한민국’을 줄여 붙여진 지명",
    location: "동도",
    img1: "대한봉1.jpg",
    img2: "대한봉2.jpg",
    img3: "대한봉3.jpg",
    img4: "",
    lat: 37.24181404,
    lng: 131.8651692,
  },
  {
    name: "전차바위",
    summary: "전차 형상으로 독특한 모양의 바위",
    location: "동도",
    img1: "전차바위1.jpg",
    img2: "",
    img3: "",
    img4: "",
    lat: 37.23856798,
    lng: 131.8696055,
  },
  {
    name: "해녀바위",
    summary: "예전 해녀들이 쉬었던 바위",
    location: "동도",
    img1: "해녀바위1.jpg",
    img2: "",
    img3: "",
    img4: "",
    lat: 37.23838113,
    lng: 131.8688098,
  },
  {
    name: "큰가제바위",
    summary: "강치(가제)가 출현하는 장소로 현지 어민들의 구전에 의한 명칭",
    location: "서도",
    img1: "큰가제바위1.jpg",
    img2: "큰가제바위2.jpg",
    img3: "큰가제바위3.jpg",
    img4: "큰가제바위4.jpg",
    lat: 37.24736222,
    lng: 131.863804,
  },
  {
    name: "작은가제바위",
    summary: "큰가제바위 우측 작은바위로 현지 어민들의 구전에 의한 명칭",
    location: "서도",
    img1: "큰가제바위1.jpg",
    img2: "",
    img3: "",
    img4: "",
    lat: 37.24676763,
    lng: 131.8644277,
  },
  {
    name: "지네바위",
    summary: "“이진해”라는 어민이 미역을 채취하던 바위(“진해”⇒“지네”)",
    location: "서도",
    img1: "지네바위1.jpg",
    img2: "지네바위2.jpg",
    img3: "지네바위3.jpg",
    img4: "",
    lat: 37.24330656,
    lng: 131.8632229,
  },
  {
    name: "탕건봉",
    summary: "서도 북쪽에 위치, 봉우리 형상이 탕건을 꼭 닮아 붙여진 이름",
    location: "서도",
    img1: "탕건봉1.jpg",
    img2: "탕건봉2.jpg",
    img3: "탕건봉3.jpg",
    img4: "탕건봉4.jpg",
    lat: 37.24361021,
    lng: 131.8654674,
  },
  {
    name: "김바위",
    summary: "독특한 모양에 대한 일관된 명칭(구전으로 김은 해태를 의미)",
    location: "서도",
    img1: "김바위1.jpg",
    img2: "",
    img3: "",
    img4: "",
    lat: 37.24357187,
    lng: 131.866136,
  },
  {
    name: "삼형제굴바위",
    summary:
      "동굴의 입구가 3개로 되어 있으며, 3개의 동굴을 아우르는 명칭으로 현지 어민들의 구전에 의한 명칭",
    location: "서도",
    img1: "삼형제굴바위1.jpg",
    img2: "삼형제굴바위2.jpg",
    img3: "삼형제굴바위3.jpg",
    img4: "삼형제굴바위4.jpg",
    lat: 37.24249362,
    lng: 131.8673996,
  },
  {
    name: "미역바위",
    summary: "어민들이 바위에서 미역채취를 많이 하여 붙혀진 명칭",
    location: "서도",
    img1: "미역바위1.jpg",
    img2: "",
    img3: "",
    img4: "",
    lat: 37.24119839,
    lng: 131.8669378,
  },
  {
    name: "촛대바위",
    summary: "독특한 모양에 대한 명칭으로 권총바위라고도 불렀음",
    location: "서도",
    img1: "촛대바위1.jpg",
    img2: "촛대바위2.jpg",
    img3: "촛대바위3.jpg",
    img4: "촛대바위4.jpg",
    lat: 37.2411125,
    lng: 131.8672745,
  },
  {
    name: "보찰바위",
    summary: "보찰은 거북손으로 따개비와 유사한 서식 해산물",
    location: "서도",
    img1: "보찰바위1.jpg",
    img2: "보찰바위2.jpg",
    img3: "보찰바위3.jpg",
    img4: "",
    lat: 37.23958381,
    lng: 131.8617266,
  },
  {
    name: "코끼리바위",
    summary: "코끼리가 물을 마시는 형상의 독특한 모양의 바위",
    location: "서도",
    img1: "코끼리바위1.jpg",
    img2: "코끼리바위2.jpg",
    img3: "코끼리바위3.jpg",
    img4: "코끼리바위4.jpg",
    lat: 37.24059878,
    lng: 131.8632242,
  },
  {
    name: "넙덕바위",
    summary: "현지 어민의 구전으로 전하는 넙덕바위",
    location: "서도",
    img1: "넙덕바위1.jpg",
    img2: "넙덕바위2.jpg",
    img3: "넙덕바위3.jpg",
    img4: "넙덕바위4.jpg",
    lat: 37.24146866,
    lng: 131.8616859,
  },
  {
    name: "군함바위",
    summary: "군함과 같은 독특한 모양으로 현재어민들의 구전에 의한 명칭",
    location: "서도",
    img1: "군함바위1.jpg",
    img2: "군함바위2.jpg",
    img3: "군함바위3.jpg",
    img4: "군함바위4.jpg",
    lat: 37.24209402,
    lng: 131.8620639,
  },
  {
    name: "물골",
    summary:
      "서도의 봉우리에서 북서방향으로 해안과 접하는 지점에 1일 400리터 정도의 물이 고이는 곳",
    location: "서도",
    img1: "물골1.jpg",
    img2: "물골2.jpg",
    img3: "물골3.jpg",
    img4: "물골4.jpg",
    lat: 37.24245006,
    lng: 131.8645234,
  },
];
// dummy_data End

function TerrianPopup() {
  const mapElement = useRef(null);
  const [places, setPlaces] = useState(dummy_data);
  const [showPlace, setShowPlace] = useState(false);
  const [curPlace, setCurPlace] = useState("");
  const [curMarker, setCurMarker] = useState(null);

  useEffect(() => {
    console.log("useEffect Call");
    // kakao map Start
    const { kakao } = window;
    if (!mapElement.current || !kakao) return;

    const location = new kakao.maps.LatLng(
      37.242318015510335,
      131.8669424097961,
    );
    const mapOptions = {
      center: location,
      draggable: false,
      zoomable: false,
      disableDoubleClick: true,
      level: 4,
    };
    const map = new kakao.maps.Map(mapElement.current, mapOptions);
    // Display Markers
    function displayMarker(place) {
      var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.lat, place.lng),
        title: place.name,
      });
      var infowindow = new kakao.maps.InfoWindow({
        content: `<div style="padding:5px; width:100%;text-align:center;font-weight:300;">${place.name}</div>`,
        removable: true,
      });

      // Infowindow on Marker Click Event

      kakao.maps.event.addListener(marker, "click", function () {
        setShowPlace(true);
        setCurPlace(place);
        setCurMarker(marker);
      });
      kakao.maps.event.addListener(marker, "mouseover", function () {
        infowindow.open(map, marker);
      });
      kakao.maps.event.addListener(marker, "mouseout", function () {
        infowindow.close();
      });
      // console.log(marker);
    }
    // 현재 선택된 위치 마커 위 인포윈도우 올려두기
    // Load Kakao Map
    kakao.maps.load(() => {
      places.map((place) => {
        displayMarker(place);
        return place;
      });
    });
    var infowindow = new kakao.maps.InfoWindow({
      content: `<div style="padding:5px; width:100%;text-align:center;font-weight:300;">${curPlace.name}</div>`,
      removable: true,
    });
    if (curMarker !== null) {
      infowindow.open(map, curMarker);
    }

    // 중심좌표 이동시 중심 좌표 콘솔에 출력
    // kakao.maps.event.addListener(map, "center_changed", function () {
    //   console.log(map.getCenter());
    // });
    // kakao map End
  }, [curMarker]);

  const BaseInfo = () => {
    return (
      <div className='baseInfoContainer'>
        <div className='baseInfoTitle'>지리</div>
        <hr></hr>
        <div className='baseInfoContent'>
          <div className='baseInfoContentHeader'>위치</div>
          <div className='baseInfoDetailt'>
            동도
            <br />
            북위 37° 14′ 26.8″
            <br />
            동경 131° 52′ 10.4″
            <br />
            서도
            <br />
            북위 37° 14′ 30.6″
            <br />
            동경 131° 51′ 54.6″
          </div>
        </div>
        <hr></hr>
        <div className='baseInfoContent'>
          <div className='baseInfoContentHeader'>구성 도서</div>
          <div className='baseInfoDetail'>91개의 섬</div>
        </div>
        <hr></hr>

        <div className='baseInfoContent'>
          <div className='baseInfoContentHeader'>주요 도서</div>
          <div className='baseInfoDetail'> 동도(東島) · 서도(西島)</div>
        </div>
        <hr></hr>

        <div className='baseInfoContent'>
          <div className='baseInfoContentHeader'>면적</div>
          <div className='baseInfoDetail'>
            동도 73,297m²
            <br />
            서도 88,740m²
            <br />
            부속도서 25,517m²
          </div>
        </div>
        <div className='baseInfoTitle'>왼쪽 마커를 클릭해보세요!</div>
      </div>
    );
  };
  const PlaceInfo = () => {
    return (
      <div className='placeInfoContainer'>
        <div className='placeInfoTitle'>{curPlace.name}</div>
        <div className='placeInfoImage'>이미지 컨테이너</div>
        <div className='placeInfoImage'>이미지 컨테이너2</div>
        <div className='placeInfoImage'>이미지 컨테이너3</div>
        <div className='placeInfoLocation'>{curPlace.location}</div>
        <div className='placeInfoSummary'>{curPlace.summary}</div>
      </div>
    );
  };
  return (
    <div className='TerrianPopupContainer'>
      <div className='TerrianPopupTitle'>독도의 지리 및 지리</div>
      <div className='TerrianPopupWrapper'>
        <div ref={mapElement} className='TerrianPopupMap'></div>
        <div className='TerrianPopupInfoTable'>
          {showPlace ? <PlaceInfo /> : <BaseInfo />}
        </div>
      </div>
    </div>
  );
}
export default TerrianPopup;
