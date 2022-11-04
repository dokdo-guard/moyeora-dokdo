import { useEffect, useState } from "react";
import popupStyles from "../css/MyPagePopup.module.css";
import PropTypes from "prop-types";
import api from "../../api/api";
import { AWS_S3_BASE_URL } from "../../api/Oauth/uri";

const Popup = (props) => {
  const [show, setShow] = useState(false);
  const [dogam, setDogam] = useState([]);

  const closeHandler = (e) => {
    setShow(false);
    props.onClose(false);
  };

  const imgErrorHandler = (e) => {
    e.target.src = "/assets/icons/bird_Icon2.png";
  };

  const getBirds = (e) => {
    api.get("info/birds").then((res) => {
      console.log(res.data);
      setDogam(res.data);
    });
  };

  const getSeaAnimals = (e) => {
    api.get("info/sea-animals").then((res) => {
      console.log(res.data);
      setDogam(res.data);
    });
  };
  const getPlants = async (e) => {
    api.get("info/plants").then((res) => {
      console.log(res.data);
      setDogam(res.data);
    });
    // api.get('info/sea-plants').then((res) => {
    //   console.log(res.data[0]);
    // });
  };

  useEffect(() => {
    setShow(props.show);
    api.get("info/birds").then((res) => {
      console.log(res.data);
      setDogam(res.data);
    });
  }, [props.show]);

  return (
    <div
      style={{
        visibility: show ? "visible" : "hidden",
        opacity: show ? "1" : "0",
      }}
      className={popupStyles.overlay}
    >
      <span className={popupStyles.close} onClick={closeHandler} />
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

Popup.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Popup;
