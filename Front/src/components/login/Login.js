import { React, useState, forwardRef } from "react";
import {
  GOOGLE_AUTH_URL,
  NAVER_AUTH_URL,
  KAKAO_AUTH_URL,
} from "../../api/Oauth/uri";
import "../css/Login.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Icon from "@mui/material/Icon";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

function Login(props) {
  const [loginBtnShow, setLoginBtnShow] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby='alert-dialog-slide-description'
        >
          <DialogTitle>
            <div>{"모여봐요 우리땅 독도는 어떤 사이트인가요?"}</div>
          </DialogTitle>
          <DialogContent>
            <div style={{ fontWeight: "300" }}>
              모여봐요 우리땅 독도(모우독)은 우리 땅 독도를 다양한 컨텐츠로
              알아갈 수 있는 웹서비스입니다. 캐릭터를 움직여 서도, 동도를 오가며
              다양한 컨텐츠를 즐기며 독도에 대해 더 깊이 알아갈 수 있는 시간을
              가져봐요!
            </div>
          </DialogContent>
          <DialogActions>
            <button onClick={handleClose}>넵 ! 잘 알겠어요</button>
          </DialogActions>
        </Dialog>
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
          </div>{" "}
          <div style={{ "--i": 9 }}>
            <h1>,</h1>
          </div>
          <div style={{ "--i": 10 }}>
            <h1>독</h1>
          </div>
          <div style={{ "--i": 11 }}>
            <h1>도</h1>
          </div>
        </div>
        <div className='WhatIsOurServiceBtnWrapper'>
          <div className='WhatIsOurServiceBtn' onClick={handleOpen}>
            <HelpOutlineIcon />
            모여봐요 우리땅 독도? 이게 뭐야?
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
