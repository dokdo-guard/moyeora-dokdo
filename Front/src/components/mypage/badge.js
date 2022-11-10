import { useEffect, useState } from "react";
import popupStyles from "../css/MyPagePopup.module.css";
import PropTypes from "prop-types";
import api from "../../api/api";
import { useSelector } from "react-redux";

const Badge = () => {
  // access Token 전달하기 위함
  const user = useSelector((state) => state.user.value);
  const [badge, setBadge] = useState([]);

  useEffect(() => {
    console.log("BADGE user accessToken");
    console.log(user.accessToken);
    getBadge();
  }, []);

  const getBadge = async () => {
    await api
      .get("https://k7d204.p.ssafy.io/api/badge", {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        setBadge(res.data);
      });
  };

  return (
    <div style={{}} className={popupStyles.overlay}>
      <div className={popupStyles.popup}>
        <div className={popupStyles.content}>
          {badge.map((item, index) => {
            return (
              <div className={popupStyles.badge} key={index}>
                <img src={item.url} alt='No'></img>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

Badge.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Badge;
