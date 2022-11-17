import React from "react";
import "../css/LoadingComponent.css";

function LoadingComponent() {
  var tipNum = Math.floor(Math.random() * 5);
  const tipText = [
    { text: "땅을 클릭해서 캐릭터를 움직일 수 있어요." },
    { text: "동도에는 퀴즈, 역사관, 지형관, 생태관이 있어요." },
    { text: "도감을 다 채워보세요!" },
    { text: "마이페이지에서 캐릭터를 변경할 수 있어요!" },
    { text: "퀴즈를 많이 맞추면 뱃지를 획득할 수 있어요." },
    { text: "서도에는 광장이 있어요." },
  ];

  return (
    <div className='LoadingCompoenetContainer'>
      <div className='LoadingTipBox'>
        <img
          className='tipIcon'
          src={process.env.PUBLIC_URL + "/assets/icons/TipIcon.png"}
          alt=''
        ></img>
        <div>{tipText[tipNum].text}</div>
      </div>
      <div className='LoadingCenter'></div>

      <div className='LoadingProgressBar'></div>
    </div>
  );
}
export default LoadingComponent;
