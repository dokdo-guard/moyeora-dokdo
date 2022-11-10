import { useEffect, useState } from "react";
import "../css/TutorialGangchi.css";

const gangchiLine = [
  {
    line: "안녕! 나는 독도를 지키는 독도 방범대 강치라고 해치!",
  },
  {
    line: "여기서는 독도를 탐방하면서 독도에 대한 정보를 얻을 수 있치.",
  },
  {
    line: "독도에 사는 동식물을 만나보고 나만의 도감을 만들 수 있치.",
  },
  {
    line: "퀘스트를 완료하고 뱃지도 모아봐치!",
  },
  {
    line: "그러면 이제 모우독에서 즐거운 시간을 보내길 바라!",
  },
  {
    line: "",
  },
];

function TutorialGangchi() {
  const [lineNum, setLineNum] = useState(0);
  const [typing, setTyping] = useState(true);
  const [charNum, setCharNum] = useState(0);

  const nextLine = () => {
    setCharNum(gangchiLine[lineNum].line.length);
    if (lineNum + 1 > 4) {
      return;
    } else {
      setLineNum((lineNum) => lineNum + 1);
      setTimeout(
        setTyping((typing) => !typing),
        50,
      );
    }
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "absolute",
        zIndex: "3",
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      <div
        style={{
          position: "absolute",
          zIndex: "12",
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "150px",
            height: "70px",
            position: "absolute",
            left: "200px",
            bottom: "270px",
            borderRadius: "100px",
            backgroundColor: "lightgray",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "700",
            fontSize: "36px",
          }}
        >
          강치
        </div>
        <img
          src={process.env.PUBLIC_URL + "/assets/images/characters/강치.png"}
          alt='Error on GANGCHI'
          style={{
            zIndex: "8",
            position: "absolute",
            height: "500px",
            width: "500px",
            bottom: "200px",
            left: "-90px",
          }}
        />

        <div className='LineContext'>
          <h3
            // className={typing ? "InnerContext" : "InnerContextNone"}
            id='gangchiLine'
          >
            {gangchiLine[lineNum].line}
            {/* {typing + " "} */}
          </h3>
        </div>
      </div>
      <div
        style={{
          zIndex: "13",
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {lineNum === 4 ? (
          <div>
            <div className='LineENDButton'>시작하기!</div>
          </div>
        ) : (
          <div>
            <div
              className='LineNextButton'
              onClick={() => {
                nextLine();
              }}
            >
              다음
            </div>
            <div
              className='LineSkipButton'
              onClick={() => {
                setLineNum(4);
              }}
            >
              SKIP
            </div>
          </div>
        )}
      </div>
      <div
        style={{
          backgroundColor: "black",
          width: "100vw",
          height: "100vh",
          opacity: "50%",
          position: "absolute",
          zIndex: "4",
        }}
      ></div>
    </div>
  );
}

export default TutorialGangchi;
