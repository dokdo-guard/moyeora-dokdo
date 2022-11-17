import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Howl } from "howler";
const MySwal = withReactContent(Swal);

export const touchEffect = new Howl({
  src: ["/assets/audio/ddoing.mp3"],
  volume: 1.5,
});

// 마이페이지 호출 버튼
export const clickMyPage = () => {
  const MyPagePop = document.getElementById("myPage");
  MyPagePop.style.display = "block";

  touchEffect.play();
};

// 마이페이지 나가기 버튼
export const quitMyPage = () => {
  const MyPagePop = document.getElementById("myPage");
  MyPagePop.style.display = "none";

  touchEffect.play();
};

// 튜토리얼 호출 버튼
export const clickTutorial = () => {
  const tutorial = document.getElementById("tutorial");
  tutorial.style.display = "block";

  touchEffect.play();
};

// 튜토리얼 나가기 버튼
export const quitTutorial = () => {
  const tutorial = document.getElementById("tutorial");
  tutorial.style.display = "none";

  touchEffect.play();
};

// 도감 호출 버튼
export const clickDogam = () => {
  const dogam = document.getElementById("dogam");
  dogam.style.display = "block";

  touchEffect.play();
};

// 도감 나가기 버튼
export const quitDogam = () => {
  const dogam = document.getElementById("dogam");
  dogam.style.display = "none";

  touchEffect.play();
};

export const quitPopup = () => {
  const QuizPop = document.getElementById("QuizPopup");
  QuizPop.style.display = "none";

  touchEffect.play();
};
export const quitEcoPopup = () => {
  const EcoPop = document.getElementById("EcoPopup");
  EcoPop.style.display = "none";
  MySwal.fire({
    title: <h3>뱃지 획득!</h3>,
    icon: "info",
    html: <p>생태관 방문 뱃지 획득!</p>,
  });
  touchEffect.play();
};
export const quitHistoryPopup = () => {
  const HistoryPop = document.getElementById("HistoryPopup");
  HistoryPop.style.display = "none";
  MySwal.fire({
    title: <h3>뱃지 획득!</h3>,
    icon: "info",
    html: <p>역사관 방문 뱃지 획득!</p>,
  });
  touchEffect.play();
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
  touchEffect.play();
};

export const quitChat = () => {
  const ChatPop = document.getElementById("chat");
  ChatPop.style.display = "none";
  touchEffect.play();
};

export const clickBoard = () => {
  const BoardPop = document.getElementById("board");
  BoardPop.style.display = "block";
  touchEffect.play();
};

export const mapPopup = () => {
  const mapPopup = document.getElementById("minimap");
  mapPopup.style.display = "block";
  touchEffect.play();
};

export const quitMinimap = () => {
  const mapPopup = document.getElementById("minimap");
  mapPopup.style.display = "none";
  touchEffect.play();
};

export const quitGamePopup = () => {
  const GamePopup = document.getElementById("gamePopup");
  GamePopup.style.display = "none";
  touchEffect.play();
};
