import { React, useState } from "react";
import {
  GOOGLE_AUTH_URL,
  NAVER_AUTH_URL,
  KAKAO_AUTH_URL,
} from "../../api/Oauth/uri";
import "../css/Login.css";

function Login(props) {
  const [loginBtnShow, setLoginBtnShow] = useState(false);
  const OnBoard = () => {
    return (
      <div className='socialLogin'>
        <div className='PlayButton'>
          <button
            onClick={() => {
              setLoginBtnShow(true);
            }}
          >
            우리땅 독도로 출발!
          </button>
        </div>
      </div>
    );
  };
  return (
    <div className='content'>
      <div className='LoginWrapper'>
        <div className='LoginTitle waviy'>
          <div style={{ "--i": 1 }}>
            <h1>모</h1>
          </div>
          <div style={{ "--i": 2 }}>
            <h1>여</h1>
          </div>
          <div style={{ "--i": 3 }}>
            <h1>봐</h1>
          </div>
          <div style={{ "--i": 4 }}>
            <h1>요</h1>
          </div>
          <div style={{ "--i": 5 }}>
            <h1>!</h1>
          </div>
        </div>
        <div className='LoginTitle waviy'>
          <div style={{ "--i": 6 }}>
            <h1>우</h1>
          </div>
          <div style={{ "--i": 7 }}>
            <h1>리</h1>
          </div>
          <div style={{ "--i": 8 }}>
            <h1>땅</h1>
          </div>
          <div style={{ "--i": 9 }}>
            <h1>독</h1>
          </div>
          <div style={{ "--i": 10 }}>
            <h1>도</h1>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          디스플레이 125% 크롬 100%환경에서 최적의 경험을 제공합니다.
        </div>
        {loginBtnShow ? <SocialLogin /> : <OnBoard />}
      </div>
    </div>
  );
}

const SocialLogin = (props) => {
  return (
    <div className='socialLogin'>
      <a className='' href={GOOGLE_AUTH_URL}>
        <img src='/assets/icons/google-logo.png' alt='Google' /> Log in with
        Google
      </a>
      <a className='' href={NAVER_AUTH_URL}>
        <img src='/assets/icons/naver-logo.png' alt='Naver' /> Log in with Naver
      </a>
      <a className='' href={KAKAO_AUTH_URL}>
        <img src='/assets/icons/kakao-logo.png' alt='Kakao' /> Log in with Kakao
      </a>
    </div>
  );
};

export default Login;
