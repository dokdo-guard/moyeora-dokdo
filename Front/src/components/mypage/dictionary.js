import { useEffect, useState } from "react";
import popupStyles from "../css/MyPagePopup.module.css";
import api from "../../api/api";
import { AWS_S3_BASE_URL } from "../../api/Oauth/uri";
import axios from "axios";

const Dictionary = (props) => {
  const [show, setShow] = useState(false);
  const [dogam, setDogam] = useState([]);
  const [earnedDogam, setEarnedDogam] = useState([]);
  const accessToken = sessionStorage.getItem("accessToken");
  // const closeHandler = (e) => {
  //   setShow(false);
  //   props.onClose(false);
  // };

  const getEarnedDogam = async () => {
    await axios
      .get("http://localhost:8443/api/user/dogams", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        setEarnedDogam(res.data);
        console.log("유저가 얻은 도감 정보");
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const imgErrorHandler = (e) => {
    e.target.src = "/assets/icons/bird_Icon2.png";
  };

  const getBirds = async (e) => {
    await api.get("info/birds").then((res) => {
      // console.log(res.data);
      setDogam(res.data);
    });
  };

  const getSeaAnimals = async (e) => {
    await api.get("info/sea-animals").then((res) => {
      // console.log(res.data);
      setDogam(res.data);
    });
  };
  const getPlants = async (e) => {
    await api.get("info/plants").then((res) => {
      // console.log(res.data);
      setDogam(res.data);
    });
  };

  useEffect(() => {
    // setShow(props.show);
    api.get("info/birds").then((res) => {
      // console.log(res.data);
      setDogam(res.data);
    });
    getEarnedDogam();
  }, [props.show]);

  return (
    <div className={popupStyles.overlay}>
      <div className={popupStyles.popup}>
        <div
          className={popupStyles.icon}
          onClick={getBirds}
          style={{
            left: 20,
          }}
        >
          <img src='/assets/icons/bird_Icon2.png'></img>
        </div>
        <div
          className={popupStyles.icon}
          onClick={getSeaAnimals}
          style={{
            left: 125,
          }}
        >
          <img src='/assets/icons/seaAnimal_Icon.png'></img>
        </div>
        <div
          className={popupStyles.icon}
          onClick={getPlants}
          style={{
            left: 230,
          }}
        >
          <img src='/assets/icons/plant_Icon.png'></img>
        </div>

        <div className={popupStyles.content}>
          {dogam.map((item, index) => {
            return (
              <div className={popupStyles.badge} key={index}>
                <img
                  src={AWS_S3_BASE_URL + item.img}
                  onError={imgErrorHandler}
                ></img>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Dictionary.propTypes = {
//   show: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
// };

export default Dictionary;
