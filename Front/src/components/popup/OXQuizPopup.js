import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
// import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { getQuiz } from "../../api/quizApi.js";
import "../css/OXQuizPopup.css";

// 문제 개수 선택 화면
function OXQuizPopup() {
  const [quizNum, setQuizNum] = useState(0);
  const [selected, setSelected] = useState(false);
  const [quiz, setQuiz] = useState([]);
  const [quizProgress, setQuizProgress] = useState(0);
  const [answerCorrect, setAnswerCorrect] = useState(0);
  useEffect(() => {
    if (quizNum !== 0) {
      getQuiz(quizNum)
        .then((res) => {
          setQuiz(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [quizNum]);
  // useEffect(() => {
  //   // console.log(quiz);
  // }, [quiz]);

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
            5 문제
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
            10 문제
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
            15 문제
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
          {/* 처음으로 돌아가기 버튼 */}
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
          {/* 점수 등록 할 것 */}
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
              <div className='QuizText'>{quiz[quizProgress]?.quizText}</div>
              <div className='QuizOX'>
                <button
                  className='OX_O'
                  onClick={() => {
                    setQuizProgress(quizProgress + 1);
                    if (quiz[quizProgress]?.answer === "O") {
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
                    if (quiz[quizProgress]?.answer === "X") {
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
