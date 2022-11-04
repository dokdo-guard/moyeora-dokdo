import { React, Component } from 'react';
import {
  GOOGLE_AUTH_URL,
  NAVER_AUTH_URL,
  KAKAO_AUTH_URL,
} from '../../api/Oauth/uri';
import '../css/Login.css';

const Login = (props) => {
  return (
    <div className="content">
      <div className="title">
        <h1>모여봐요 우리땅 독도</h1>
      </div>
      <SocialLogin />
    </div>
  );
};

const SocialLogin = (props) => {
  return (
    <div className="socialLogin">
      <a className="" href={GOOGLE_AUTH_URL}>
        <img src="/assets/icons/google-logo.png" alt="Google" /> Log in with
        Google
      </a>
      <a className="" href={NAVER_AUTH_URL}>
        <img src="/assets/icons/naver-logo.png" alt="Naver" /> Log in with Naver
      </a>
      <a className="" href={KAKAO_AUTH_URL}>
        <img src="/assets/icons/kakao-logo.png" alt="Kakao" /> Log in with Kakao
      </a>
    </div>
  );
};

export default Login;
