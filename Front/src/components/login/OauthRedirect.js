import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../UserSlice";
import axios from "axios";

const OauthRedirect = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getUrlParameter = (keyVal) => {
    keyVal = keyVal.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    let regex = new RegExp("[\\?&]" + keyVal + "=([^&#]*)");

    let results = regex.exec(window.location);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  };

  useEffect(() => {
    const token = getUrlParameter("token");
    const error = getUrlParameter("error");
    if (token) {
      localStorage.setItem("accessToken", token);
      const getUserInfo = async (token) => {
        await axios
          .get("https://k7d204.p.ssafy.io/api/user", {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            dispatch(login({ ...res.data, accessToken: token }));
          })
          .catch((err) => {
            console.log("Error in Login OauthRedirect");
            console.log(err);
          });
      };
      getUserInfo(token);
      navigate("/main/mainTest");
    } else {
      console.log(error);
      navigate("/login");
    }
  });
  const user = useSelector((state) => state.user.value);
  return (
    <div>
      리다이렉트 페이지
      <div>Name : {user.name}</div>
      <div>nickname : {user.nickname}</div>
      <div>userCharacter : {user.userCharacter}</div>
      <div>accessToken : {user.accessToken}</div>
    </div>
  );
};

export default OauthRedirect;
