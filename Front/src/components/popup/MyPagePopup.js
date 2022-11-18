import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkNPClist } from "../../api/mainApi.js";
import "../css/MyPagePopup.css";
import Tooltip from "@mui/material/Tooltip";
import Swal from "sweetalert2";
import { touchEffect } from "../main/PopupButton.js";

function MyPagePopup(props) {
  // 끄기
  const quitMyPage = () => {
    const MyPagePop = document.getElementById("myPage");
    MyPagePop.style.display = "none";
    setDogamShow(false);
    setCategoryShow(false);
    setSelectCharacterShow(false);
    setCategory("plant");
    setBadgeShow(false);
    touchEffect.play();
  };

  // 로그아웃 시 메인으로 이동
  const navigate = useNavigate();

  // 다른 컴포넌트 보여주기 위함
  const [selectCharacterShow, setSelectCharacterShow] = useState(false);
  const [dogamShow, setDogamShow] = useState(false);
  const [categoryShow, setCategoryShow] = useState(false);

  const [category, setCategory] = useState("plant");
  const [dogamNum, setDogamNum] = useState(0);
  const [dogam, setDogam] = useState([]);
  const [badges, setBadges] = useState([]);
  const [badgeShow, setBadgeShow] = useState(false);
  // 유저 캐릭터
  const [userCharacter, setUserCharacter] = useState(
    sessionStorage.getItem("userCharacter"),
  );

  // 세션스토리지에서 accessToken 받아옴
  const accessToken = sessionStorage.getItem("accessToken");
  useEffect(() => {
    // 도감 조회
    const getDogam = async () => {
      const dogams = await axios.get(
        `https://k7d204.p.ssafy.io/api/user/dogams/${category}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      setDogam(dogams.data);
      if (dogams.data.length === 10) {
        earnBadge();
      }
    };
    if (category !== "") {
      getDogam();
    }
  }, [category]);

  useEffect(() => {
    const getBadge = async () => {
      const badges = await axios.get(`https://k7d204.p.ssafy.io/api/badge`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setBadges(badges.data);
    };
    getBadge();
  }, [badgeShow]);

  useEffect(() => {
    if (userCharacter === "siryeong") {
      props.changeSiryeong();
    }
    if (userCharacter === "sojung") {
      props.changeSojung();
    }
    if (userCharacter === "hyoseon") {
      props.changeHyoseon();
    }
    if (userCharacter === "youngjin") {
      props.changeYoungjin();
    }
    if (userCharacter === "seongryeong") {
      props.changeSeongryeong();
    }
    if (userCharacter === "chaehyeon") {
      props.changeChaehyeon();
    }
    setCharacter();
  }, [userCharacter]);

  const earnBadge = async () => {
    if (category === "sea-animal") {
      await axios
        .post(
          "https://k7d204.p.ssafy.io/api/badge",
          {
            badge: "sea_animal_complete",
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    }
    if (category === "plant") {
      await axios
        .post(
          "https://k7d204.p.ssafy.io/api/badge",
          {
            badge: "plant_complete",
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    }
    if (category === "sea-plant") {
      await axios
        .post(
          "https://k7d204.p.ssafy.io/api/badge",
          {
            badge: "sea_plant_complete",
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    }
    if (category === "bird") {
      await axios
        .post(
          "https://k7d204.p.ssafy.io/api/badge",
          {
            badge: "bird_complete",
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    }
    Swal.fire({
      title: <h3>뱃지 획득!</h3>,
      icon: "info",
      html: <p>도감 완성 뱃지 획득!</p>,
    });
  };

  // 캐릭터 선택 axios api call
  const setCharacter = async () => {
    await axios
      .put(
        "https://k7d204.p.ssafy.io/api/character",
        { userCharacter: userCharacter },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then((res) => {
        sessionStorage.setItem("userCharacter", userCharacter);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /* #region SelectCharacter */
  // 캐릭터 선택 화면
  const SelectCharacter = () => {
    return (
      <div className='MyPageRightInnerWrapper'>
        <div className='MyPageRightTitle'>캐릭터 선택</div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            cursor: "pointer",
            backgroundColor: "orange",
            width: "100px",
            height: "40px",
            marginLeft: "30px",
            alignItems: "center",
            borderRadius: "10px",
            boxShadow: "3px 3px 20px lightgray",
          }}
          onClick={() => {
            setCharacter();
            setSelectCharacterShow(false);
          }}
        >
          Back
        </div>
        <div className='MyPageCharacterList'>
          <div
            className='MyPageCharacterListElement'
            onClick={() => {
              setUserCharacter("siryeong");
            }}
          >
            <img
              src={
                process.env.PUBLIC_URL +
                "/assets/images/characters/siryeong.png"
              }
              alt='No SiryeonCharacter'
              className={
                userCharacter === "siryeong"
                  ? "MyPageCharacterImg choosenCharacter"
                  : "MyPageCharacterImg"
              }
            />
          </div>
          <div
            className='MyPageCharacterListElement'
            onClick={() => {
              setUserCharacter("hyoseon");
            }}
          >
            <img
              src={
                process.env.PUBLIC_URL + "/assets/images/characters/hyoseon.png"
              }
              alt='No hyoseonCharacter'
              className={
                userCharacter === "hyoseon"
                  ? "MyPageCharacterImg choosenCharacter"
                  : "MyPageCharacterImg"
              }
            />
          </div>
          <div
            className='MyPageCharacterListElement'
            onClick={() => {
              setUserCharacter("seongryeong");
            }}
          >
            <img
              src={
                process.env.PUBLIC_URL +
                "/assets/images/characters/seongryeong.png"
              }
              alt='No seongryeongCharacter'
              className={
                userCharacter === "seongryeong"
                  ? "MyPageCharacterImg choosenCharacter"
                  : "MyPageCharacterImg"
              }
            />
          </div>
        </div>
        <div className='MyPageCharacterList'>
          <div
            className='MyPageCharacterListElement'
            onClick={() => {
              setUserCharacter("sojung");
            }}
          >
            <img
              src={
                process.env.PUBLIC_URL + "/assets/images/characters/sojung.png"
              }
              alt='No sojungCharacter'
              className={
                userCharacter === "sojung"
                  ? "MyPageCharacterImg choosenCharacter"
                  : "MyPageCharacterImg"
              }
            />
          </div>
          <div
            className='MyPageCharacterListElement'
            onClick={() => {
              setUserCharacter("youngjin");
            }}
          >
            <img
              src={
                process.env.PUBLIC_URL +
                "/assets/images/characters/youngjin.png"
              }
              alt='No youngjinCharacter'
              className={
                userCharacter === "youngjin"
                  ? "MyPageCharacterImg choosenCharacter"
                  : "MyPageCharacterImg"
              }
            />
          </div>
          <div
            className='MyPageCharacterListElement'
            onClick={() => {
              setUserCharacter("chaehyeon");
            }}
          >
            <img
              src={
                process.env.PUBLIC_URL +
                "/assets/images/characters/chaehyeon.png"
              }
              alt='No chaehyeonCharacter'
              className={
                userCharacter === "chaehyeon"
                  ? "MyPageCharacterImg choosenCharacter"
                  : "MyPageCharacterImg"
              }
            />
          </div>
        </div>
      </div>
    );
  };
  /* #endRegion SelectCharacter */

  // 도감 물음표 반환 함수
  const notEarnedDogam = (maxNum) => {
    let array = [];
    for (let i = 0; i < maxNum - dogam.length; i++) {
      array.push(
        <div className='DogamItem' key={i}>
          ?
        </div>,
      );
    }
    return array;
  };
  // 도감 화면
  const Dogam = () => {
    return (
      <div className='MyPageRightInnerWrapper'>
        <div className='MyPageRightTitle'>도감</div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            cursor: "pointer",
            backgroundColor: "orange",
            width: "100px",
            height: "40px",
            marginLeft: "30px",
            alignItems: "center",
            borderRadius: "10px",
            boxShadow: "3px 3px 20px lightgray",
          }}
          onClick={() => {
            if (categoryShow) {
              setCategoryShow(false);
            } else if (dogamShow) {
              setDogamShow(false);
            }
            setCategory("");
          }}
        >
          Back
        </div>
        {categoryShow ? (
          <div className='DogamCategoryWrapper'>
            <div className='DogamList'>
              {dogam.map((val) => {
                if (val === undefined) {
                  return <></>;
                }
                return (
                  <div key={val.name} className='DogamItem'>
                    <img
                      src={`	
                      https://ssafy-d204-dokdo.s3.ap-northeast-2.amazonaws.com/${val.image}`}
                      alt='no'
                    />{" "}
                    {val.name}
                  </div>
                );
              })}
              {notEarnedDogam(dogamNum)}
            </div>
          </div>
        ) : (
          <div className='DogamSelectWrapper'>
            <div
              className='dogamSelectBtn'
              onClick={() => {
                setCategoryShow(true);
                setCategory("plant");
                setDogamNum(10);
              }}
            >
              {" "}
              <img
                src={process.env.PUBLIC_URL + "/assets/icons/plant_Icon.png"}
                alt=''
              />
              <div>식물</div>
            </div>
            <div
              className='dogamSelectBtn'
              onClick={() => {
                setCategoryShow(true);
                setCategory("sea-animal");
                setDogamNum(10);
              }}
            >
              {" "}
              <img
                src={
                  process.env.PUBLIC_URL + "/assets/icons/seaAnimal_Icon.png"
                }
                alt=''
              />
              <div>해양동물</div>
            </div>
            <div
              className='dogamSelectBtn'
              onClick={() => {
                setCategoryShow(true);
                setCategory("bird");
                setDogamNum(10);
              }}
            >
              {" "}
              <img
                src={process.env.PUBLIC_URL + "/assets/icons/bird_Icon.png"}
                alt=''
              />
              <div>조류</div>
            </div>
            <div
              className='dogamSelectBtn'
              onClick={() => {
                setCategoryShow(true);
                setCategory("sea-plant");
                setDogamNum(10);
              }}
            >
              {" "}
              <img
                src={process.env.PUBLIC_URL + "/assets/icons/seaPlant_Icon.png"}
                alt=''
              />
              <div>해조류</div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // 뱃지 화면
  const Badge = () => {
    return (
      <div className='MyPageRightInnerWrapper'>
        {" "}
        <div className='MyPageRightTitle'>뱃지</div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            cursor: "pointer",
            backgroundColor: "orange",
            width: "100px",
            height: "40px",
            marginLeft: "30px",
            alignItems: "center",
            borderRadius: "10px",
            boxShadow: "3px 3px 20px lightgray",
          }}
          onClick={() => {
            setBadgeShow(false);
          }}
        >
          Back
        </div>
        <div className='BadgeWrapper'>
          {badges.seaPlantComplete ? (
            <div className='BadgeImage'>
              <Tooltip title='해양 식물 도감 완성' placement='top'>
                <img
                  src={
                    process.env.PUBLIC_URL + "/assets/badges/earnSeaPlant.png"
                  }
                  alt='no Badge'
                />
              </Tooltip>
            </div>
          ) : (
            <div className='BadgeImage'>
              {" "}
              <img
                src={process.env.PUBLIC_URL + "/assets/badges/NoBadge.png"}
                alt='no Badge'
              />
            </div>
          )}
          {badges.birdComplete ? (
            <div className='BadgeImage'>
              <Tooltip title='새 도감 완성' placement='top'>
                <img
                  src={process.env.PUBLIC_URL + "/assets/badges/eranBird.png"}
                  alt='no Badge'
                />
              </Tooltip>
            </div>
          ) : (
            <div className='BadgeImage'>
              {" "}
              <img
                src={process.env.PUBLIC_URL + "/assets/badges/NoBadge.png"}
                alt='no Badge'
              />
            </div>
          )}
          {badges.plantComplete ? (
            <div className='BadgeImage'>
              <Tooltip title='식물 도감 완성' placement='top'>
                <img
                  src={process.env.PUBLIC_URL + "/assets/badges/earnPlant.png"}
                  alt='no Badge'
                />
              </Tooltip>
            </div>
          ) : (
            <div className='BadgeImage'>
              {" "}
              <img
                src={process.env.PUBLIC_URL + "/assets/badges/NoBadge.png"}
                alt='no Badge'
              />
            </div>
          )}
          {badges.seaAnimalComplete ? (
            <div className='BadgeImage'>
              <Tooltip title='해양 도감 완성' placement='top'>
                <img
                  src={
                    process.env.PUBLIC_URL + "/assets/badges/earnSeaAnimal.png"
                  }
                  alt='no Badge'
                />
              </Tooltip>
            </div>
          ) : (
            <div className='BadgeImage'>
              {" "}
              <img
                src={process.env.PUBLIC_URL + "/assets/badges/NoBadge.png"}
                alt='no Badge'
              />
            </div>
          )}
          {badges.quizFive ? (
            <div className='BadgeImage'>
              <Tooltip title='퀴즈 5문제 만점' placement='top'>
                <img
                  src={process.env.PUBLIC_URL + "/assets/badges/3rdBadge.png"}
                  alt='no Badge'
                />
              </Tooltip>
            </div>
          ) : (
            <div className='BadgeImage'>
              {" "}
              <img
                src={process.env.PUBLIC_URL + "/assets/badges/NoBadge.png"}
                alt='no Badge'
              />
            </div>
          )}
          {badges.quizTen ? (
            <div className='BadgeImage'>
              <Tooltip title='퀴즈 10문제 만점' placement='top'>
                <img
                  src={process.env.PUBLIC_URL + "/assets/badges/2ndBadge.png"}
                  alt='no Badge'
                />
              </Tooltip>
            </div>
          ) : (
            <div className='BadgeImage'>
              {" "}
              <img
                src={process.env.PUBLIC_URL + "/assets/badges/NoBadge.png"}
                alt='no Badge'
              />
            </div>
          )}
          {badges.quizFifteen ? (
            <div className='BadgeImage'>
              <Tooltip title='퀴즈 15문제 만점' placement='top'>
                <img
                  src={process.env.PUBLIC_URL + "/assets/badges/1stBadge.png"}
                  alt='no Badge'
                />
              </Tooltip>
            </div>
          ) : (
            <div className='BadgeImage'>
              {" "}
              <img
                src={process.env.PUBLIC_URL + "/assets/badges/NoBadge.png"}
                alt='no Badge'
              />
            </div>
          )}
          {badges.visitBiology ? (
            <div className='BadgeImage'>
              <Tooltip title='생태관 방문' placement='top'>
                <img
                  src={process.env.PUBLIC_URL + "/assets/badges/visitEco.png"}
                  alt='no Badge'
                />
              </Tooltip>
            </div>
          ) : (
            <div className='BadgeImage'>
              {" "}
              <img
                src={process.env.PUBLIC_URL + "/assets/badges/NoBadge.png"}
                alt='no Badge'
              />
            </div>
          )}
          {badges.visitHistory ? (
            <div className='BadgeImage'>
              <Tooltip title='역사관 방문' placement='top'>
                <img
                  src={
                    process.env.PUBLIC_URL + "/assets/badges/visitHistory.png"
                  }
                  alt='no Badge'
                />
              </Tooltip>
            </div>
          ) : (
            <div className='BadgeImage'>
              {" "}
              <img
                src={process.env.PUBLIC_URL + "/assets/badges/NoBadge.png"}
                alt='no Badge'
              />
            </div>
          )}
          {badges.visitTerrain ? (
            <div className='BadgeImage'>
              <Tooltip title='지형관 방문' placement='top'>
                <img
                  src={
                    process.env.PUBLIC_URL + "/assets/badges/visitTerrain.png"
                  }
                  alt='no Badge'
                />
              </Tooltip>
            </div>
          ) : (
            <div className='BadgeImage'>
              {" "}
              <img
                src={process.env.PUBLIC_URL + "/assets/badges/NoBadge.png"}
                alt='no Badge'
              />
            </div>
          )}
        </div>
      </div>
    );
  };
  return (
    <div>
      <div className='MyPageContainer'>
        <div className='MyPageTitle'>MY PAGE</div>
        <div className='MyPageOutBtn'>
          <div
            style={{
              backgroundColor: "rgb(255, 73, 73)",
              cursor: "pointer",
              height: "40px",
              marginRight: "20px",
            }}
            onClick={() => {
              Swal.fire({
                title: "로그아웃 하시겠습니까?",
                showDenyButton: true,
                confirmButtonText: "네",
                denyButtonText: "아니요",
              }).then((result) => {
                if (result.isConfirmed) {
                  sessionStorage.clear();
                  navigate("/");
                }
              });
            }}
          >
            로그아웃
          </div>
        </div>
        <div className='MyPageInnerWrapper'>
          <div className='MyPageInnerLeft'>
            <img
              src={
                process.env.PUBLIC_URL +
                "/assets/images/characters/" +
                userCharacter +
                ".png"
              }
              alt='NOIMAGE'
              className='MyPageCharacterImage'
            />
            {<div>{sessionStorage.getItem("email")}</div>}
            <div>{sessionStorage.getItem("name")}</div>
          </div>
          <div className='MyPageInnerRight'>
            {selectCharacterShow || dogamShow || badgeShow ? null : (
              <div>
                <div
                  onClick={() => {
                    setSelectCharacterShow(true);
                  }}
                  className='MyPageMenu'
                >
                  캐릭터 선택
                </div>
                <div
                  onClick={() => {
                    setDogamShow(true);
                  }}
                  className='MyPageMenu'
                >
                  도감
                </div>
                <div
                  onClick={() => {
                    setBadgeShow(true);
                  }}
                  className='MyPageMenu'
                >
                  뱃지
                </div>
              </div>
            )}
            {selectCharacterShow ? <SelectCharacter /> : null}
            {dogamShow ? <Dogam /> : null}
            {badgeShow ? <Badge /> : null}
          </div>
        </div>
      </div>
      <img
        src='/assets/icons/cancel.png'
        className='quitMyPage'
        onClick={() => {
          quitMyPage();
        }}
        alt='EMPTY'
      ></img>
      <div
        style={{
          position: "absolute",
          width: "100vw",
          height: "100vh",
          backgroundColor: "black",
          opacity: "50%",
          zIndex: "9",
        }}
      ></div>
    </div>
  );
}

export default MyPagePopup;
