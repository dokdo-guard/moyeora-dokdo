import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
// 마이페이지 호출 버튼
export const clickMyPage = () => {
  const MyPagePop = document.getElementById("myPage");
  MyPagePop.style.display = "block";
  // MyPagePop.addEventListener("mouseup", () => {
  //   isPressed = false;
  // });
};

// 마이페이지 나가기 버튼
export const quitMyPage = () => {
  const MyPagePop = document.getElementById("myPage");
  MyPagePop.style.display = "none";
  // MyPagePop.addEventListener("mouseup", () => {
  //   isPressed = false;
  // });
};

// 튜토리얼 호출 버튼
export const clickTutorial = () => {
  const tutorial = document.getElementById("tutorial");
  tutorial.style.display = "block";
  // tutorial.addEventListener("mouseup", () => {
  //   isPressed = false;
  // });
};

// 튜토리얼 나가기 버튼
export const quitTutorial = () => {
  const tutorial = document.getElementById("tutorial");
  tutorial.style.display = "none";
  // tutorial.addEventListener("mouseup", () => {
  //   isPressed = false;
  // });
};

// 도감 호출 버튼
export const clickDogam = () => {
  const dogam = document.getElementById("dogam");
  dogam.style.display = "block";
  // dogam.addEventListener("mouseup", () => {
  //   isPressed = false;
  // });
};

// 도감 나가기 버튼
export const quitDogam = () => {
  const dogam = document.getElementById("dogam");
  dogam.style.display = "none";
  // dogam.addEventListener("mouseup", () => {
  //   isPressed = false;
  // });
};

export const quitPopup = () => {
  const QuizPop = document.getElementById("QuizPopup");
  // const EcoPop = document.getElementById("EcoPopup");
  // const HistoryPop = document.getElementById("HistoryPopup");
  QuizPop.style.display = "none";
  // EcoPop.style.display = "none";
  // HistoryPop.style.display = "none";
};
export const quitEcoPopup = () => {
  const EcoPop = document.getElementById("EcoPopup");
  EcoPop.style.display = "none";
  MySwal.fire({
    title: <h3>뱃지 획득!</h3>,
    icon: "info",
    html: <p>생태관 방문 뱃지 획득!</p>,
  });
};
export const quitHistoryPopup = () => {
  const HistoryPop = document.getElementById("HistoryPopup");
  HistoryPop.style.display = "none";
  MySwal.fire({
    title: <h3>뱃지 획득!</h3>,
    icon: "info",
    html: <p>역사관 방문 뱃지 획득!</p>,
  });
};
export const quitTerrianPopup = () => {
  const TerrianPop = document.getElementById("TerrianPopup");
  TerrianPop.style.display = "none";
  MySwal.fire({
    title: <h3>뱃지 획득!</h3>,
    icon: "info",
    html: <p>지형관 방문 뱃지 획득!</p>,
  });
};

export const clickChat = () => {
  const ChatPop = document.getElementById("chat");
  ChatPop.style.display = "block";
};

export const quitChat = () => {
  const ChatPop = document.getElementById("chat");
  ChatPop.style.display = "none";
};

export const clickBoard = () => {
  const BoardPop = document.getElementById("board");
  BoardPop.style.display = "block";
};

export const mapPopup = () => {
  const mapPopup = document.getElementById("minimap");
  mapPopup.style.display = "block";
};

export const quitMinimap = () => {
  const mapPopup = document.getElementById("minimap");
  mapPopup.style.display = "none";
};
