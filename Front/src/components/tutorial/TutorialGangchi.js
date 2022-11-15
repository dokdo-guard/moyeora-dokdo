import { useState } from "react";
import "../css/TutorialGangchi.css";
import popupStyles from "../css/Tutorial.module.css";

const gangchiLine = [
  {
    line: "안녕! 나는 독도를 지키는 독도 방범대 강치라고 해치!",
  },
  {
    line: "여기서는 독도를 탐방하면서 독도에 대한 정보를 얻을 수 있치.",
  },
  {
    line: "화면을 클릭해서 캐릭터를 움직일수 있치",
  },
  {
    line: "오른쪽에는 동도가 있치. 동도에서는 역사관, 지형관, 생태관이 있치. 각 관에서 독도에 대한 다양한 정보를 얻을 수 있치!",
  },
  {
    line: "왼쪽에는 서도가 있치. 서도에서는 다양한 NPC를 만나볼 수 있치! NPC에게서 독도에 대한 정보도 들어볼 수 있치.",
  },
  {
    line: "서도에 대한 설명2",
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
    if (lineNum + 1 > 8) {
      return;
    } else {
      setLineNum((lineNum) => lineNum + 1);
      setTimeout(
        setTyping((typing) => !typing),
        50,
      );
    }
  };

  const quitTutorialGangchi = () => {
    const tutorialPop = document.getElementById("tutorialGangchi");
    tutorialPop.style.display = "none";
  };
  return (
    <div
      id='tutorialGangchi'
      style={{
        width: "100%",
        height: "100vh",
        position: "absolute",
        zIndex: "300",
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      <div className={popupStyles.contents}>
        {lineNum === 2 && (
          <div
            style={{
              zIndex: "13",
              position: "absolute",
              top: "40%",
              left: "50%",
              transform: "translate(-40%, -50%)",
              height: "300px",
            }}
          >
            <div>
              <img src='/assets/images/characters/siryeong.png' />
              <img src='/assets/icons/click.png' />
            </div>

            <div
              style={{
                fontSize: "28px",
                color: "white",
                textAlign: "center",
              }}
            >
              원하는 위치를 클릭해 <br />
              캐릭터를 이동할 수 있습니다.
            </div>
          </div>
        )}
        {lineNum === 4 && (
          <div
            style={{
              zIndex: "13",
              position: "absolute",
              top: "40%",
              left: "50%",
              transform: "translate(-40%, -50%)",
              height: "300px",
            }}
          >
            <>
              <img src='/assets/images/characters/siryeong2.png' />
              <img
                style={{
                  width: 200,
                  top: 100,
                }}
                src='/assets/images/characters/penguin.png'
              />
              <div
                style={{
                  fontSize: "28px",
                  color: "white",
                  textAlign: "center",
                }}
              >
                다양한 NPC들과 상호작용 해보세요!
              </div>
            </>
          </div>
        )}
        {lineNum === 6 && (
          <img
            src=''
            alt='NOIMAGE'
            style={{
              top: "40%",
              left: "50%",
              transform: "translate(-40%, -50%)",
              width: "300px",
              height: "300px",
            }}
          />
        )}
      </div>
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
            left: "210px",
            bottom: "250px",
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
            height: "400px",
            width: "400px",
            bottom: "150px",
            left: "-100px",
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
        {lineNum === 8 ? (
          <div>
            <div className='LineENDButton' onClick={quitTutorialGangchi}>
              시작하기!
            </div>
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
                setLineNum(8);
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
