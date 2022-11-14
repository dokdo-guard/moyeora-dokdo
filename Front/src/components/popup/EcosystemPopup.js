import React, { useState, useEffect } from "react";
import {
  getAllBirds,
  getAllPlants,
  getAllSeaAnimal,
  getAllSeaPlants,
} from "../../api/ecoSystemApi";
import "../css/EcoSystemPopup.css";
import axios from "axios";
import { quitPopup } from "../main/PopupButton.js";
function EcoSystemPopup() {
  const [isSelected, setIsSelected] = useState(false);
  const [category, setCategory] = useState("");
  const [selectedData, setSelectedData] = useState([]);
  const [detailSelected, setDetailSelected] = useState(false);
  const [data, setData] = useState([]);
  const accessToken = sessionStorage.getItem("accessToken");

  useEffect(() => {
    if (category === "bird") {
      getAllBirds()
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (category === "plant") {
      getAllPlants()
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (category === "seaAnimal") {
      getAllSeaAnimal()
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (category === "seaPlant") {
      getAllSeaPlants()
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("no category");
      setData([]);
    }
  }, [category]);
  const ShowDetail = () => {
    return (
      <div className='EcoSystemListWrapper'>
        <div className='EcoSystemBackBtn'>
          <button
            onClick={() => {
              setSelectedData("");
              setDetailSelected(false);
              if (!detailSelected) {
                setCategory("");
              }
            }}
          >
            Back
          </button>
        </div>

        <div className='EcoSystemDetailInfo'>
          <div className='getDogamBtn'>
            <button
              onClick={() => {
                setDogam();
              }}
            >
              도감 획득 하기!!
            </button>{" "}
          </div>
          <div className='EcoSystemDetailImage'>
            <img
              src={
                "https://ssafy-d204-dokdo.s3.ap-northeast-2.amazonaws.com/" +
                selectedData.img
              }
              alt='NO '
            />
          </div>
          <div className='EcoSystemDetailName'>{selectedData.name}</div>

          <div className='EcoSystemDetailSummary'>{selectedData.summary}</div>
        </div>
      </div>
    );
  };

  const ShowList = () => {
    if (!detailSelected) {
      return (
        <div className='EcoSystemListWrapper'>
          <div className='EcoSystemBackBtn'>
            <button
              onClick={() => {
                setIsSelected(false);
                setCategory("");
                setSelectedData("");
                setDetailSelected(false);
              }}
            >
              Back
            </button>
          </div>
          <div className='EcoSystemDataList'>
            {data.map((data) => {
              if (data === undefined) {
                return <></>;
              }
              return (
                <div
                  key={data.name}
                  className='EcoSystemListData'
                  onClick={() => {
                    setSelectedData(data);
                    setDetailSelected(true);
                  }}
                >
                  <div className='EcoSystemListImage'>
                    <img
                      src={
                        "https://ssafy-d204-dokdo.s3.ap-northeast-2.amazonaws.com/" +
                        data?.img
                      }
                      alt='NO'
                    />
                  </div>
                  <div className='EcoSystemListName'>{data.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      );
    } else {
      return <ShowDetail />;
    }
  };
  const setDogam = () => {
    axios
      .post(
        "https://k7d204.p.ssafy.io/api/dogam",
        { domain: category, mongo_id: selectedData.name },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then((res) => {
        console.log(res);
        alert(selectedData.name + " 도감 획득 완료!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ position: "relative" }}>
      <div className='EcosystemContainer'>
        <div className='EcosystemTitle'>독도의 생태계</div>
        <img
          src='/assets/icons/cancel.png'
          id='quitButton'
          onClick={quitPopup}
          className='quitPopup'
        ></img>
        {isSelected ? (
          <ShowList />
        ) : (
          <div className='EcosystemSelectBtnWrapper'>
            <div
              className='EcosystemSelectBtn'
              onClick={() => {
                setIsSelected(true);
                setCategory("plant");
              }}
            >
              <img
                src={process.env.PUBLIC_URL + "/assets/icons/plant_Icon.png"}
                alt=''
              />
            </div>
            <div
              className='EcosystemSelectBtn'
              onClick={() => {
                setIsSelected(true);
                setCategory("seaAnimal");
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
              className='EcosystemSelectBtn'
              onClick={() => {
                setIsSelected(true);
                setCategory("bird");
              }}
            >
              <img
                src={process.env.PUBLIC_URL + "/assets/icons/bird_Icon.png"}
                alt=''
              />
            </div>
            <div
              className='EcosystemSelectBtn'
              onClick={() => {
                setIsSelected(true);
                setCategory("seaPlant");
              }}
            >
              <img
                src={process.env.PUBLIC_URL + "/assets/icons/seaPlant_Icon.png"}
                alt=''
              />
            </div>
          </div>
        )}
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
export default EcoSystemPopup;
