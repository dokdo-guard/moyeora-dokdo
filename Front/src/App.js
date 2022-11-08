import "./App.css";
import { Routes, Route } from "react-router-dom";
import React from "react";

import { PopupTest, MypageTest, MainTest, LoadingTest } from "./pages/index";
import Login from "./components/login/Login";
import OauthRedirect from "./components/login/OauthRedirect";

// import { useSelector } from "react-redux";

function App() {
  // const user = useSelector((state) => state.user.value);
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/popup/popupTest' element={<PopupTest />} />
        <Route path='/mypage/mypageTest' element={<MypageTest />} />
        <Route path='/main/mainTest' element={<MainTest />} />
        <Route path='/LoadingTest' element={<LoadingTest />} />
        <Route path='/oauth/redirect' element={<OauthRedirect />} />
      </Routes>
    </>
  );
}

export default App;
