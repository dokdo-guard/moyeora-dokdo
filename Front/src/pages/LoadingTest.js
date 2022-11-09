import React from "react";
import { LoadingComponent } from "../components/index";
import { useSelector } from "react-redux";

function LoadingTest() {
  const user = useSelector((state) => state.user.value);
  console.log("LoadingPage");
  console.log(user);

  return <LoadingComponent />;
}
export default LoadingTest;
