import { React, Component } from 'react';
import {
  GOOGLE_AUTH_URL,
  NAVER_AUTH_URL,
  KAKAO_AUTH_URL,
} from '../../api/Oauth/uri';

class Login extends Component {

  render() {
    return (
      <div className="login-container">
        <div className="login-content">
          <h1 className="login-title">Login to SpringSocial</h1>
          <SocialLogin />
          <div className="or-separator">
            <span className="or-text">OR</span>
          </div>
        </div>
      </div>
    );
  }
}

class SocialLogin extends Component {
  render() {
    return (
      <div className="social-login">
        <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
          <img src="/assets/icons/google-logo.png" alt="Google" /> Log in with
          Google
        </a>
        <a className="btn btn-block social-btn naver" href={NAVER_AUTH_URL}>
          <img src="/assets/icons/github-logo.png" alt="Naver" /> Log in with
          Naver
        </a>
        <a className="btn btn-block social-btn kakao" href={KAKAO_AUTH_URL}>
          <img src="/assets/icons/fb-logo.png" alt="Kakao" /> Log in with Kakao
        </a>
      </div>
    );
  }
}

export default Login;
