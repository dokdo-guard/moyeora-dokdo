import "./App.css";
import { Routes, Route } from "react-router-dom";
import React from "react";

import { MainTest } from "./pages/index";
import Login from "./components/login/Login";
import OauthRedirect from "./components/login/OauthRedirect";

function App() {
  return (
    <>
      <Routes>
        <Route path='/main/main' element={<MainTest />} />
        <Route path='/' element={<Login />} />
        <Route path='/oauth/redirect' element={<OauthRedirect />} />
      </Routes>
    </>
  );
}

export default App;
