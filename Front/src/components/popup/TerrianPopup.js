import React, { useEffect, useRef, useState } from "react";
import "../css/TerrianPopup.css";
import { getAllTerrians } from "../../api/terrainApi";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
let map = null;

function TerrianPopup(isShown) {
  const mapElement = useRef(null);
  const [places, setPlaces] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [showPlace, setShowPlace] = useState(false);
  const [curPlace, setCurPlace] = useState("");
  const [curMarker, setCurMarker] = useState(null);
  const [badges, setBadges] = useState([]);
  const MySwal = withReactContent(Swal);
  const accessToken = sessionStorage.getItem("accessToken");
  useEffect(() => {
    const getBadges = async () => {
      await axios
        .get(`https://k7d204.p.ssafy.io/api/badge`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          setBadges(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getBadges();
  }, [isLoaded]);
  const getBadges = async () => {
    await axios
      .get(`https://k7d204.p.ssafy.io/api/badge`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setBadges(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const quitTerrianPopup = () => {
    const TerrianPop = document.getElementById("TerrianPopup");
    TerrianPop.style.display = "none";
    console.log(badges);
    getBadges();
    if (badges.visitTerrain === false) {
      MySwal.fire({
        title: <h3>뱃지 획득!</h3>,
        icon: "info",
        html: <p>지형관 방문 뱃지 획득!</p>,
      });
    }
    setShowPlace(false);
    setCurPlace("");
    setCurMarker(null);
  };

  useEffect(() => {
    getAllTerrians()
      .then((res) => {
        setPlaces(res.data);
        setIsLoaded();
      })
      .catch((err) => {
        console.log(err);
      });
    if (map !== null) {
      // 지도 리사이즈
      map.relayout();
    }
  }, [mapLoaded]);
  useEffect(() => {
    // kakao map Start
    const { kakao } = window;
    if (!mapElement.current || !kakao) return;

    const location = new kakao.maps.LatLng(
      37.242014789309735,
      131.86599959590592,
    );
    const mapOptions = {
      center: location,
      // draggable: false,
      // zoomable: false,
      disableDoubleClick: true,
      level: 4,
    };

    map = new kakao.maps.Map(mapElement.current, mapOptions);

    // 지도 리사이즈
    map.relayout();

    // Display Markers
    function displayMarker(place) {
      var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.lat, place.lng),
        title: place.name,
      });
      var infowindow = new kakao.maps.InfoWindow({
        content: `<div style="padding:5px; width:100%;text-align:center;font-weight:300;border-radius:10px;">${place.name}</div>`,
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
    }
    // 현재 선택된 위치 마커 위 인포윈도우 올려두기
    // Load Kakao Map
    kakao.maps.load(() => {
      places.map((place) => {
        displayMarker(place);
        return place;
      });
      setMapLoaded(true);
    });
    var infowindow = new kakao.maps.InfoWindow({
      content: `<div style="padding:5px; width:100%;text-align:center;font-weight:300;border-radius:10px;">${curPlace.name}</div>`,
      removable: true,
    });
    if (curMarker !== null) {
      infowindow.open(map, curMarker);
    }

    // kakao map End
  }, [isShown, isLoaded]);

  const BaseInfo = () => {
    return (
      <div className='baseInfoContainer'>
        <div className='baseInfoTitle'>지리</div>
        <div className='baseInfoContent'>
          <div className='baseInfoContentHeader'>위치</div>
          <div className='baseInfoDetail'>
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
        <div className='baseInfoContent'>
          <div className='baseInfoContentHeader'>구성 도서</div>
          <div className='baseInfoDetail'>91개의 섬</div>
        </div>
        <div className='baseInfoContent'>
          <div className='baseInfoContentHeader'>주요 도서</div>
          <div className='baseInfoDetail'> 동도(東島) · 서도(西島)</div>
        </div>
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
        {/* <div className='baseInfoTitle'>왼쪽 마커를 클릭해보세요!</div> */}
      </div>
    );
  };
  const PlaceInfo = () => {
    return (
      <div className='placeInfoContainer'>
        <div className='placeInfoTitle'>{curPlace.name}</div>
        <div className='placeInfoImageContainer'>
          <div className='placeInfoImageWrapper'>
            <img
              src={
                "https://ssafy-d204-dokdo.s3.ap-northeast-2.amazonaws.com/" +
                curPlace?.img1
              }
              alt='NOIMAGE'
            />
          </div>
        </div>
        <div className='placeInfoLocation'>{curPlace.location}</div>
        <div className='placeInfoSummary'>{curPlace.summary}</div>
      </div>
    );
  };

  return (
    <div style={{ position: "relative" }}>
      <div className='TerrianPopupContainer'>
        <div className='TerrianPopupTitle'>지형 박물관</div>
        <div style={{ margin: "10px 0 5px" }}>
          마커를 누르시면 독도의 지형을 보실 수 있습니다.
        </div>
        <img
          src='/assets/icons/cancel.png'
          id='quitButton'
          onClick={quitTerrianPopup}
          className='quitPopup'
          alt='NOIMAGE'
        ></img>
        <div className='TerrianPopupWrapper'>
          <div ref={mapElement} className='TerrianPopupMap'></div>
          <div className='TerrianPopupInfoTable'>
            {showPlace ? <PlaceInfo /> : <BaseInfo />}
          </div>
        </div>
      </div>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "black",
          position: "absolute",
          opacity: "30%",
          zIndex: "9",
        }}
      ></div>
    </div>
  );
}
export const mapReLoading = () => {
  map.relayout();
};
export default TerrianPopup;
