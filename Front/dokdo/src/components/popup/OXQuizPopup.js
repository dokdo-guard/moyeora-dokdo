import React, { useState } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
// import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import "../css/OXQuizPopup.css";

// 더미 데이터
const dummy_data = [
  {
    id: 1,
    quizText: "독도는 지리적, 역사적, 국제법적으로 대한민국의 고유영토이다.",
    answer: true,
  },
  {
    id: 2,
    quizText: "답 X.2",
    answer: false,
  },
  {
    id: 3,
    quizText: "답 X.3",
    answer: false,
  },
  {
    id: 4,
    quizText: "독도는 지리적, 역사적, 국제법적으로 대한민국의 고유영토이다.4",
    answer: true,
  },
  {
    id: 5,
    quizText: "답 X.5",
    answer: false,
  },
  {
    id: 6,
    quizText: "독도는 지리적, 역사적, 국제법적으로 대한민국의 고유영토이다.6",
    answer: true,
  },
  {
    id: 7,
    quizText: "독도는 지리적, 역사적, 국제법적으로 대한민국의 고유영토이다.7",
    answer: true,
  },
  {
    id: 8,
    quizText: "독도는 지리적, 역사적, 국제법적으로 대한민국의 고유영토이다.8",
    answer: true,
  },
  {
    id: 9,
    quizText: "독도는 지리적, 역사적, 국제법적으로 대한민국의 고유영토이다.9",
    answer: true,
  },
  {
    id: 10,
    quizText: "답 X.10",
    answer: false,
  },
  {
    id: 11,
    quizText: "독도는 지리적, 역사적, 국제법적으로 대한민국의 고유영토이다.11",
    answer: true,
  },
  {
    id: 12,
    quizText: "독도는 지리적, 역사적, 국제법적으로 대한민국의 고유영토이다.12",
    answer: true,
  },
  {
    id: 13,
    quizText: "독도는 지리적, 역사적, 국제법적으로 대한민국의 고유영토이다.13",
    answer: true,
  },
  {
    id: 14,
    quizText: "독도는 지리적, 역사적, 국제법적으로 대한민국의 고유영토이다.14",
    answer: true,
  },
  {
    id: 15,
    quizText: "독도는 지리적, 역사적, 국제법적으로 대한민국의 고유영토이다.15",
    answer: true,
  },
  {
    id: 16,
    quizText: "쓰레기 값",
    asnwer: false,
  },
];

// 문제 개수 선택 화면
function OXQuizPopup() {
  const [quizNum, setQuizNum] = useState(0);
  const [selected, setSelected] = useState(false);
  const [quizProgress, setQuizProgress] = useState(0);
  const [answerCorrect, setAnswerCorrect] = useState(0);
  const [curProgress, setCurProgress] = useState(0);
  const SelectQuizNum = () => {
    return (
      <div className='OXQuizInWrapper'>
        <div>
          <button
            className='selectQuizButton'
            onClick={() => {
              setQuizNum(5);
              setSelected(true);
            }}
          >
            5
          </button>
        </div>
        <div>
          <button
            className='selectQuizButton'
            onClick={() => {
              setQuizNum(10);
              setSelected(true);
            }}
          >
            10
          </button>
        </div>
        <div>
          <button
            className='selectQuizButton'
            onClick={() => {
              setQuizNum(15);
              setSelected(true);
            }}
          >
            15
          </button>
        </div>
      </div>
    );
  };

  // Quiz 끝나면 점수와 함께 보여줄 화면
  const EndQuiz = () => {
    return (
      <div>
        <div className='QuizTitle'>
          Score
          {answerCorrect}
        </div>
        <div>
          <button
            className='endQuizButton'
            onClick={() => {
              setSelected(false);
              setQuizNum(0);
              setQuizProgress(0);
              setAnswerCorrect(0);
            }}
          >
            다시 풀기
          </button>
          <button className='endQuizButton2'>종료하기</button>
        </div>
      </div>
    );
  };

  // Custom Progress Bar
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === "light" ? "#FFF562" : "#308fe8",
    },
  }));

  // Progress Bar
  const LinearProgressWithLabel = (props) => {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <BorderLinearProgress variant='determinate' {...props} />
        </Box>
      </Box>
    );
  };
  LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
  };
  return (
    <>
      <div className='OXQuizContainer'>
        <div className='QuizTitle'>Quiz</div>
        {selected ? (
          <div className='OXQuizInWrapper'>
            <div className={quizProgress < quizNum ? "notHidden" : "hidden"}>
              <div className='QuizProgressBar'>
                <LinearProgressWithLabel
                  value={(quizProgress / quizNum) * 100}
                />
              </div>
              <div className='QuizText'>
                {dummy_data[quizProgress].id}
                {dummy_data[quizProgress].quizText}
              </div>
              <div className='QuizOX'>
                <button
                  className='OX_O'
                  onClick={() => {
                    setQuizProgress(quizProgress + 1);
                    if (dummy_data[quizProgress].answer) {
                      setAnswerCorrect(answerCorrect + 1);
                    }
                  }}
                >
                  O
                </button>
                <button
                  className='OX_X'
                  onClick={() => {
                    setQuizProgress(quizProgress + 1);
                    if (quizProgress >= 15) {
                      return;
                    }
                    if (!dummy_data[quizProgress].answer) {
                      setAnswerCorrect(answerCorrect + 1);
                    }
                  }}
                >
                  X
                </button>
              </div>
            </div>
            <div className={quizProgress < quizNum ? "hidden" : "notHidden"}>
              <EndQuiz />
            </div>
          </div>
        ) : (
          <SelectQuizNum />
        )}
      </div>
    </>
  );
}
export default OXQuizPopup;
