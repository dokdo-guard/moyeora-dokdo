import "./App.css";
import { Routes, Route } from "react-router-dom";
import React from "react";

import {
  PopupTest,
  MainTest,
  LoadingTest,
  NewPage,
  BoardHome,
} from "./pages/index";
import Login from "./components/login/Login";
import OauthRedirect from "./components/login/OauthRedirect";

function App() {
  return (
    <>
      <Routes>
        <Route path='/popup/popupTest' element={<PopupTest />} />
        <Route path='/main/main' element={<MainTest />} />
        <Route path='/LoadingTest' element={<LoadingTest />} />
        <Route path='/' element={<Login />} />
        <Route path='/oauth/redirect' element={<OauthRedirect />} />
        {/* <Route path='/home/board' element={<BoardHome />} /> */}
        {/* <Route path='/new' element={<NewPage />} /> */}
      </Routes>
    </>
  );
}

export default App;
