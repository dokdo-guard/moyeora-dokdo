import React, { useState, useLayoutEffect, useEffect } from "react";
import {
  getAllBirds,
  getAllPlants,
  getAllSeaAnimal,
  getAllSeaPlants,
} from "../../api/ecoSystemApi";
import "../css/EcoSystemPopup.css";

function EcoSystemPopup() {
  const [isSelected, setIsSelected] = useState(false);
  const [category, setCategory] = useState("");
  const [selectedData, setSelectedData] = useState([]);
  const [detailSelected, setDetailSelected] = useState(false);
  const [data, setData] = useState([]);

  // useEffect(() => {}, []);

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
    } else if (category === "sea-animal") {
      getAllSeaAnimal()
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (category === "sea-plant") {
      getAllSeaPlants()
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("no category");
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
            }}
          >
            Back
          </button>
        </div>
        <div className='EcoSystemDetailInfo'>
          <div className='EcoSystemDetailImage'>
            {" "}
            <img
              src={
                "https://ssafy-d204-dokdo.s3.ap-northeast-2.amazonaws.com/" +
                selectedData.img
              }
              alt='NO IMAGE'
            />
          </div>
          <div className='EcoSystemDetailName'>{selectedData.name}</div>
          <div>{selectedData.classificationSystem}</div>
          <div className='EcoSystemDetailSpecies'>
            {selectedData.speciesInformation}
          </div>
          <div className='EcoSystemDetailSummary'>{selectedData.summary}</div>
          <div className='EcoSystemDetailSummary'>
            {selectedData.information}
          </div>
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
                return;
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
                        data.img
                      }
                      alt=''
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

  return (
    <>
      <div className='EcosystemContainer'>
        <div className='EcosystemTitle'>독도의 생태계</div>
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
              나무
            </div>
            <div
              className='EcosystemSelectBtn'
              onClick={() => {
                setIsSelected(true);
                setCategory("sea-animal");
              }}
            >
              물개
            </div>
            <div
              className='EcosystemSelectBtn'
              onClick={() => {
                setIsSelected(true);
                setCategory("bird");
              }}
            >
              조류
            </div>
            <div
              className='EcosystemSelectBtn'
              onClick={() => {
                setIsSelected(true);
                setCategory("sea-plant");
              }}
            >
              해양식물
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default EcoSystemPopup;
