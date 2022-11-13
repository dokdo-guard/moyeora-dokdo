import axios from "axios";
import React, { useState, useEffect } from "react";
import { checkNPClist } from "../../api/mainApi.js";
import "../css/MyPagePopup.css";

function MyPagePopup(props) {
  // 다른 컴포넌트 보여주기 위함
  const [selectCharacterShow, setSelectCharacterShow] = useState(false);
  const [dogamShow, setDogamShow] = useState(false);
  const [categoryShow, setCategoryShow] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false);

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
  }, [isLoaded]);

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
    console.log(userCharacter);
  }, [userCharacter]);

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
        console.log(res);
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
            margin: "10px",
            cursor: "pointer",
            backgroundColor: "orange",
            width: "100px",
            alignItems: "center",
            borderRadius: "10px",
            boxShadow: "3px 3px 20px lightgray",
          }}
          onClick={() => {
            setCharacter();
            setSelectCharacterShow(false);
            setSelectCharacterShow(false);
          }}
        >
          선택완료
        </div>
        <div className='MyPageCharacterList'>
          <div
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
            margin: "10px",
            cursor: "pointer",
            backgroundColor: "orange",
            width: "100px",
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
            {category}
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
                setDogamNum(44);
              }}
            >
              {" "}
              <img
                src={process.env.PUBLIC_URL + "/assets/icons/plant_Icon.png"}
                alt=''
              />
            </div>
            <div
              className='dogamSelectBtn'
              onClick={() => {
                setCategoryShow(true);
                setCategory("sea-animal");
                setDogamNum(30);
              }}
            >
              {" "}
              <img
                src={
                  process.env.PUBLIC_URL + "/assets/icons/seaAnimal_Icon.png"
                }
                alt=''
              />
            </div>
            <div
              className='dogamSelectBtn'
              onClick={() => {
                setCategoryShow(true);
                setCategory("bird");
                setDogamNum(35);
              }}
            >
              {" "}
              <img
                src={process.env.PUBLIC_URL + "/assets/icons/bird_Icon.png"}
                alt=''
              />
            </div>
            <div
              className='dogamSelectBtn'
              onClick={() => {
                setCategoryShow(true);
                setCategory("sea-plant");
                setDogamNum(20);
              }}
            >
              {" "}
              <img
                src={process.env.PUBLIC_URL + "/assets/icons/seaPlant_Icon.png"}
                alt=''
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  // 뱃지 화면
  const Badge = () => {
    const [number, setNumber] = useState([]);
    checkNPClist()
      .then((res) => {
        setNumber(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    return (
      <div className='MyPageRightInnerWrapper'>
        {" "}
        <div className='MyPageRightTitle'>뱃지</div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "10px",
            cursor: "pointer",
            backgroundColor: "orange",
            width: "100px",
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
          {badges.talkative ? (
            <div>
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/assets/badges/TooMuchTalkerBadge.png"
                }
                alt='no Badge'
              />
            </div>
          ) : (
            <div>없음</div>
          )}
          {badges.birdComplete ? (
            <div>
              <img
                src={
                  process.env.PUBLIC_URL + "/assets/badges/EarnDogamBadge.png"
                }
                alt='no Badge'
              />
            </div>
          ) : (
            <div>없음</div>
          )}
          {badges.plantComplete ? (
            <div>
              <img
                src={
                  process.env.PUBLIC_URL + "/assets/badges/EarnDogamBadge.png"
                }
                alt='no Badge'
              />
            </div>
          ) : (
            <div>없음</div>
          )}
          {badges.seaAnimalComplete ? (
            <div>
              <img
                src={
                  process.env.PUBLIC_URL + "/assets/badges/EarnDogamBadge.png"
                }
                alt='no Badge'
              />
            </div>
          ) : (
            <div>없음</div>
          )}
          {badges.quizFive ? (
            <div>
              <img
                src={process.env.PUBLIC_URL + "/assets/badges/3rdBadge.png"}
                alt='no Badge'
              />
            </div>
          ) : (
            <div>없음</div>
          )}
          {badges.quizTen ? (
            <div>
              <img
                src={process.env.PUBLIC_URL + "/assets/badges/2rdBadge.png"}
                alt='no Badge'
              />
            </div>
          ) : (
            <div>없음</div>
          )}
          {badges.quizFifteen ? (
            <div>
              <img
                src={process.env.PUBLIC_URL + "/assets/badges/1rdBadge.png"}
                alt='no Badge'
              />
            </div>
          ) : (
            <div>없음</div>
          )}
          {badges.visitBiology ? (
            <div>
              <img
                src={process.env.PUBLIC_URL + "/assets/badges/VisitBadge.png"}
                alt='no Badge'
              />
            </div>
          ) : (
            <div>없음</div>
          )}
          {badges.visitHistory ? (
            <div>
              <img
                src={process.env.PUBLIC_URL + "/assets/badges/VisitBadge.png"}
                alt='no Badge'
              />
            </div>
          ) : (
            <div>없음</div>
          )}
          {badges.visitTerrain ? (
            <div>
              <img
                src={process.env.PUBLIC_URL + "/assets/badges/VisitBadge.png"}
                alt='no Badge'
              />
            </div>
          ) : (
            <div>없음</div>
          )}
        </div>
      </div>
    );
  };
  return (
    <div className='MyPageContainer'>
      <div className='MyPageTitle'>MY PAGE</div>
      <div className='MyPageOutBtn'>
        <div style={{ backgroundColor: "orange" }}>LOGOUT</div>
        <div style={{ backgroundColor: "rgb(255, 73, 73)" }}>회원탈퇴</div>
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
          {/* <div>{sessionStorage.getItem("name").slice(0, 3)}</div> */}
          <div>{sessionStorage.getItem("email")}</div>
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
  );
}

export default MyPagePopup;
