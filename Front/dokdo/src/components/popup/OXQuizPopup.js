import React, { useState } from "react";

import "../css/OXQuizPopup.css";

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
    quizText: "독도는 지리적, 역사적, 국제법적으로 대한민국의 고유영토이다.3",
    answer: true,
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
];

function OXQuizPopup() {
  const [quizNum, setQuizNum] = useState(0);
  const [selected, setSelected] = useState(false);
  const [quizProgress, setQuizProgress] = useState(0);
  const [answerCorrect, setAnswerCorrect] = useState(0);
  const SelectQuizNum = () => {
    return (
      <div className='QuizNumSelectContainer'>
        <div className='QuizTitle'>Quiz</div>
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

  return (
    <>
      {selected ? (
        <div className='OXQuizContainer'>
          <div className='QuizTitle'>Quiz</div>
          <div className='QuizProgressBar'>Progress Bar</div>
          <div className='QuizText'>
            <div>
              {dummy_data[quizProgress].id}
              {dummy_data[quizProgress].quizText}
            </div>
          </div>
          <div className='QuizOX'>
            <button
              className='OX_O'
              onClick={() => {
                setQuizProgress(quizProgress + 1);
                if (dummy_data[quizProgress]) {
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
                if (!dummy_data[quizProgress]) {
                  setAnswerCorrect(answerCorrect + 1);
                }
              }}
            >
              X
            </button>
          </div>
        </div>
      ) : (
        <SelectQuizNum />
      )}
    </>
  );
}
export default OXQuizPopup;
