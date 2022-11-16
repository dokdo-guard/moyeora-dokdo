import React, { useState, useEffect } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import "../css/HistoryPopup.css";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import axios from "axios";
const dummy_data_history = [
  {
    era: "삼국시대 및 그 이전",
    content:
      "서기 512년(신라 지증마립간 13년) 6월 신라의 이사부가 우산국(울릉도)을 항복시켰다는 기록이 삼국사기에 아래와 같이 등장합니다.",
    quotation:
      "지증왕 13년(512년)에 우산국(울릉도)이 항복하고 매년 토산물을 공물로 바쳤다. 우산국 사람들이 지세가 험한 것을 믿고 복종하지 않자, 이사부가 하슬라각주의 군주가 되어 말하기를, “우산국 사람들은 어리석고 성질이 사나워 위엄으로 복종시키기는 어려우니 꾀를 써서 복종시키는 것이 좋겠다.”라고 하였다. 이에 나무로 된 가짜 사자를 많이 만들어 전선(戰船)에 나누어 싣고는 우산국 해안에 이르러 속여 말하기를, “너희들이 만일 복종하지 않는다면 이 맹수들을 풀어 놓아 밟혀 죽게 하겠다.”라고 하니 사람들이 두려워서 바로 항복하였다.",
    img: "삼국사기.jpg",
  },
  {
    era: "고려시대",
    content:
      "고려사 지리지에 따르면, 울릉도는 고려의 행정구역상으로는 동계의 울진현에 소속된 섬이었으나, 여진 피해로부터 세금 감면의 대상이 아닌 점이나 감창사나 안무사 등의 중앙정부 관리를 수시로 파견한 점으로 미루어볼 때 울진현의 울릉도에 대한 행정이 정상적으로 이뤄지지 않았다는 것을 유추할 수 있습니다.\n고려 후기에는 울릉도가 유배지로도 이용되기도 하였는데, 이 점으로 볼 때 고려 후기에는 적어도 울릉도는 고려의 지방행정체계의 범주에 포함되었음을 알 수 있습니다.",
    quotation:
      "우릉도(芋陵島)에서 백길(白吉)과 토두(土豆)를 보내 방물을 바쳤다. 백길에게 정위(正位), 토두에게 정조(正朝) 품계를 각각 주었다.",
  },
  {
    era: "조선시대",
    content:
      "우산국과는 고려 때까지 조공관계가 지속되다 11세기 초에 여진의 침구를 받은 우산국 사람들이 본토로 피난한 이후부터 고려의 직할 구역이 되었습니다. 이는 조선시대에도 지속되었습니다. 조선 초기 세금을 내지 않으려 주민들이 울릉도로 이주하자, 1416년(태종 16년) 조정은 섬의 주민을 강제적으로 본토로 이주시켰습니다(쇄환 정책).\n이듬해 울릉도(당시 무릉도)의 주민 3명을 이주시킨 것을 비롯하여, 여러 차례 무릉도 일대의 주민을 이주시켰습니다. 그러나 대한민국 학자들은 쇄환정책 이후에도 조선에서 관리가 파견되어 독도를 지속적으로 관리했다고 주장합니다.",
  },
  {
    era: "17세기",
    content:
      "임진왜란 이후 조선왕조의 통치력이 약화된 틈을 타서 일본인들은 울릉도를 죽도 혹은 의죽도로, 독도를 송도라 부르면서, 울릉도 · 독도 등지에서 고기를 잡거나 나무를 도벌하기 시작했습니다. 이와 같은 상황에서 조선과 일본의 어부들은 종종 충돌하게 되었으며, 급기야 1693년 안용복을 중심으로 어부 40여명이 울릉도에서 일본어부들과 충돌하게 되면서, 1699년까지 약 6년간에 걸쳐 두 나라간 울릉도 · 독도 영유권에 대해 외교문서가 오가는 논쟁이 발생하게 되었습니다. 이 논쟁은 울릉도 점령의 근거를 얻어내려 한 대마도주의 계략을 간파한 조선조정의 강력한 대응으로 '이후 다시는 울릉도 등지에 왕래하지 않겠다'는 일본 막부의 약속을 받아냄으로써 종결되었습니다.",
  },
  {
    era: "18세기",
    img: "Japanese_Map_of_Dokdo.gif",
    description:
      "1785년 일본에서 제작한 동해 지도에는 독도가 조선의 땅이라고 표시되어 있다.",
  },
  {
    era: "19세기",
    content:
      "1870년에 조선에 파견되었던 일본 외무성 관리 3명이 돌아와 일본 제국 정부에 〈조선국교제시말내탐서〉를 제출하였는데 이 내탐서에는 울릉도와 독도가 조선령이라고 결론지었습니다.\n1900년 10월 25일, 대한제국 정부는 칙령 41호를 공포하여 울릉도를 강원도의 군으로 승격하고, 울릉군의 관할 구역에 석도를 포함시켰습니다.",
    img: "Japanese_old_map_2.png",
    description:
      "에도 시대에 만들어진 개정일본여지로정전도(改正日本輿地路程全圖)에는 독도가 조선과 같은 색으로 표시되어 있다.",
  },
  {
    era: "1946년",
    content:
      "1946년 일본을 통치하던 연합군 최고사령부는 지시령(SCAPIN) 제677호에 일본의 영토를 다음과 같이 지정했습니다. (b)에 명시된 섬은 이후에 다시 일본으로 반환됐지만, 독도와 함께 (a)에 명시되어 있는 울릉도와 제주도는 조선의 영토였기 때문에 대한민국 정부가 수립되고 나서도 계속 영유권을 갖게 되었습니다.",
    quotation:
      "본 지령의 목적상, 일본은 일본 열도를 구성하는 4개의 주요 도서(홋카이도, 혼슈, 규슈, 시코쿠)와, 1000여개의 작은 인접 도서를 포함하는 것으로 정의한다. 여기에는 (a) 우츠료 섬(울릉도), 리앙쿠르 암초(독도)와 쿠엘파트 섬(제주), (b) 북위 30도 이남의 류큐 제도, 이즈 제도, 난포 제도, 오가사와라 제도, 그리고 기타 모든 태평양 부속제도(다이토 제도, 오키노토리시마, 미나미토리시마, 나카노토리시마 포함), (c) 쿠릴 열도, 하보마이 군도(탄필레바섬, 유리섬, 아누치나섬, 젤레니섬, 폴론스코고섬 포함), 시코탄섬은 제외한다.",
    img: "1946년.png",
    description:
      "지시령 677호에 KOREA라는 이름과 라인 안에 독도가 포함되어 있다.",
  },
  {
    era: "1948년 ~ 1950년",
    content:
      "1948년 6월 30일에 미국 공군의 폭격 연습으로 독도 근해에서 출어 중인 어민 수십 명이 희생되어 1951년에 위령비가 건립되었습니다. 일본 정부는 이 점을 지적하며 연합군이 독도를 일본 영토로 간주했다고 주장하고 있으나 대한민국 정부는 이에 강력히 항의했고 당시 미국 공군 사령관이 독도를 미국 공군 연습기지에서 제외한다는 회답을 대한민국 정부에 보내왔습니다. 이에 따라 대한민국에서는 미국 정부가 대한민국 정부에 회답하였음을 들어 독도가 대한민국의 영토임을 재확인하였다고 주장했습니다. 1948년 8월 15일 대한민국 정부가 수립되면서 동시에 독도는 “경상북도 울릉군 울릉읍 도동리 산 42-76번지“로 행정구역이 정해졌습니다.\n1950년 한국 전쟁이 일어나자 국제 연합군은 KADIZ 안에 독도를 포함시켰고 현재도 독도를 대한민국 영토로 방어하고 있습니다.",
  },
  {
    era: "1951년 ~ 1952년",
    content:
      "1951년 9월 8일 일본과 연합국은 샌프란시스코 조약을 조인하며 일본이 권리를 포기해야 하는 한반도의 섬으로 제주도, 거문도, 울릉도를 명시하였습니다.\n1952년 1월 18일에 대한민국 정부는 ‘인접 해양 주권에 관한 대통령 선언'을 발표하면서 독도를 평화선 안에 포함시켜 보호하도록 했습니다. 일본 측은 이에 항의하며 대한민국 측에 독도에 대한 한국 영유권을 부정하는 외교 문서를 보냈고 이후부터 독도는 국제 사회에서 분쟁 지역으로 보이기 시작하였습니다.",
    img: "독도평화선.png",
  },
  {
    era: "1953년 ~ 1960년",
    content:
      "1953년 4월 27일 울릉도 주민 홍순칠을 중심으로 33명의 독도의용수비대가 결성되었습니다. 6월 27일에는 미국 선박으로 위장한 배를 타고 상륙한 일본인이 조난어민 위령비를 파괴하고 ‘일본 시마네현 오키군 고카 촌’이라는 내용의 영토 표식을 하면서 대한민국에 항의하였습니다. 이에 따라 7월 12일 대한민국 국회는 독도를 일본으로부터 지킬 것을 결의했고, 독도 의용 수비대는 1956년 12월 30일 대한민국 경찰이 경비 임무를 인수할 때까지 독도에 상주하게 되었습니다.\n1954년 9월 25일에는 일본 정부가 국제사법재판소에 영유권 분쟁의 최종 결정을 위임하자고 대한민국 정부에 제안했지만, 대한민국 정부는 “독도는 명백히 대한민국의 영토인데 국제사법재판소에 위임하는 것은 현명치 못한 일”이라고 하며 거부하는 서한을 발표했습니다.",
    img: "독도의용수비대.png",
    description:
      "1954년 8월 28일 독도에서 열린 경비 막사 제막식에 참여한 독도의용수비대의 모습이다.",
  },
  {
    era: "1990년 ~ 현재",
    content:
      "1998년 한국은 일본과 한일어업협정을 맺었는데, 그 결과 독도는 한일 배타적 경제 수역 안에 놓이게 되었습니다.\n2000년 울릉군 의회가 독도의 행정구역을 변경하는 내용의 조례를 통과시키며 이에 따라 2000년 4월 1일부터 독도의 행정구역이 “경상북도 울릉군 울릉읍 독도리 산 1-37번지”로 바뀌었습니다.\n2005년 일본 시마네현 의회는 100년 전 독도를 일본 영토로 편입함을 고시한 2월 22일을 다케시마의 날로 정하는 조례안을 제정하여 의회에 상정했고, 3월 16일에 이 안을 최종 통과하였습니다. 대한민국 정부는 이에 항의하였고, 경상북도 도의회는 2005년 6월 9일, 10월을 독도의 달로 하는 조례안을 가결하였습니다.",
    img: "경상북도의회.png",
    description: "독도의 달을 기념하는 경상북도 의회",
  },
];

function HistoryPopup() {
  const MySwal = withReactContent(Swal);
  const [badges, setBadges] = useState([]);
  const quitHistoryPopup = () => {
    const HistoryPop = document.getElementById("HistoryPopup");
    HistoryPop.style.display = "none";

    if (badges.visitHistory === false) {
      MySwal.fire({
        title: <h3>뱃지 획득!</h3>,
        icon: "info",
        html: <p>역사관 방문 뱃지 획득!</p>,
      });
    }
  };
  const [historyData, setHistoryData] = useState(dummy_data_history);

  const accessToken = sessionStorage.getItem("accessToken");
  useEffect(() => {
    const getBadges = async () => {
      await axios
        .get(`https://k7d204.p.ssafy.io/api/badge`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          setBadges(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getBadges();
  }, []);
  return (
    <div style={{ position: "relative" }}>
      <div className='HistoryPopupContainer'>
        <div className='QuizTitle'>독도의 역사</div>
        <img
          src='/assets/icons/cancel.png'
          id='quitButton'
          onClick={quitHistoryPopup}
          className='quitPopup'
        ></img>
        <div className='HistoryPopupWrapper'>
          <div className='HistoryYear'>
            <VerticalTimeline layout='1-column-left'>
              {/* <VerticalTimelineElement
                className='vertical-timeline-element--work'
                date='2011 - present'
                iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
              >
                <h3 className='vertical-timeline-element-title'>
                  Creative Director
                </h3>
                <h4 className='vertical-timeline-element-subtitle'>Miami, FL</h4>
                <p>
                  Creative Direction, User Experience, Visual Design, Project
                  Management, Team Leading
                </p>
              </VerticalTimelineElement> */}
              {historyData.map((data) => {
                return (
                  <>
                    <VerticalTimelineElement
                      className='vertical-timeline-element--work'
                      date={data.era}
                      iconStyle={{ background: "#FFF562", color: "#fff" }}
                      key={data.era}
                      contentStyle={{ width: "80%" }}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <h3 className='vertical-timeline-element-title'>
                        {data.era}
                      </h3>
                      <div className='historyTimeLineElement'>
                        <div
                          className={
                            data.img === undefined
                              ? "hidden"
                              : "historyTimelineImage"
                          }
                        >
                          <img
                            src={
                              "https://ssafy-d204-dokdo.s3.ap-northeast-2.amazonaws.com/" +
                              data?.img
                            }
                            alt='이미지가 없습니다'
                          />
                          <div>* {data.description}</div>
                        </div>
                        <div className='historyTimeLineContent'>
                          {data.content}
                        </div>
                      </div>
                    </VerticalTimelineElement>
                  </>
                );
              })}
            </VerticalTimeline>
          </div>
        </div>
      </div>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "black",
          position: "absolute",
          opacity: "30%",
          zIndex: "9",
        }}
      ></div>
    </div>
  );
}
export default HistoryPopup;
