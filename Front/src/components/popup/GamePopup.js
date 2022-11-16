import { quitGamePopup } from "../main/PopupButton";
import React, { useEffect, useState } from "react";
// import { CreateMatrix } from './game/Shuffle';
// import MemoryCard from './game/MemoryCard';
import "../css/game.css";
import Logo from "./game/logo.png";
import axios from "axios";

import Swal from "sweetalert2";

const GamePopup = () => {
  const [gameStart, setGameStart] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [random, setRandom] = useState([]);
  const accessToken = sessionStorage.getItem("accessToken");

  const EarnDogam = async (dogam) => {
    await axios.post(`https://k7d204.p.ssafy.io/api/dogam`, dogam, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  const getRandomDogam = async (number) => {
    await axios
      .get(`https://k7d204.p.ssafy.io/api/dogam/random?number=${number}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setRandom(res.data);
        setIsLoaded(true);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getRandomDogam(6);
  }, [gameStart]);
  function MemoryCard({ data, handleClickCard }) {
    const s3Url = "https://ssafy-d204-dokdo.s3.ap-northeast-2.amazonaws.com/";
    return (
      <div
        className={`memory-card ${data.revealed ? "flip" : ""}`}
        onClick={handleClickCard}
      >
        <img
          data-cell-index={data.id}
          className='back-face'
          src={Logo}
          alt='Click me!'
        />
        <img
          data-cell-index={data.id}
          className='front-face'
          src={s3Url + data.image}
          alt={data.face}
        />
      </div>
    );
  }

  const CreateMatrix = () => {
    // 6개 랜덤으로 받아오기

    const matrix = [];

    random.map((val) => {
      const cell = {
        face: val.name,
        image: val.img,
      };
      let pair = [cell, cell];
      matrix.push(...pair);
    });

    // shuffle array
    for (let i = matrix.length - 1; i > 0; i--) {
      let randomPos = Math.floor(Math.random() * (i + 1));
      [matrix[i], matrix[randomPos]] = [matrix[randomPos], matrix[i]];
    }
    return matrix.map((cell, index) => ({
      ...cell,
      id: index,
      revealed: false,
    }));
  };

  function Game() {
    const [grid, setGrid] = useState(CreateMatrix());
    const [matched, setMatched] = useState([]);
    const [focused, setFocused] = useState([]);

    const resetGame = () => {
      setMatched([]);
      setFocused([]);
      setGrid(CreateMatrix());
    };

    const handleClickCard = (event) => {
      // logic for persisting the card(s) if matched otherwise hide them
      const cardPosition = parseInt(
        event.target.getAttribute("data-cell-index"),
      );
      // user cannot select more than two cards
      if (focused.length > 1) return;

      // 'cardPosition' is NaN, when user click the same card frequently
      if (isNaN(cardPosition)) return;

      if (
        focused.indexOf(cardPosition) === -1 &&
        matched.indexOf(cardPosition) === -1
      ) {
        // user clicks the first or second card
        if (!focused.length) {
          // first card is selected
          let selection = [cardPosition];
          setGrid(
            grid.map((ele) =>
              ele.id === cardPosition || matched.indexOf(ele.id) > -1
                ? { ...ele, revealed: true }
                : { ...ele },
            ),
          );
          setFocused(selection);
        } else if (focused.length === 1) {
          // second card is selected
          let prevSelection = focused[0];
          let selection = [prevSelection, cardPosition];
          setFocused(selection);
          if (grid[prevSelection].face === grid[cardPosition].face) {
            // cards have matched
            const paired = matched.concat(...selection);
            setGrid(
              grid.map((ele) =>
                paired.indexOf(ele.id) > -1
                  ? { ...ele, revealed: true }
                  : { ...ele, revealed: false },
              ),
            );
            setMatched(paired);
            setFocused([]);
            // alert box to reset game
            if (paired.length === 12) {
              setTimeout(() => {
                Swal.fire({
                  title: "축하합니다!",
                  text: "게임을 완료 하셨습니다. 도감을 획득 하시겠습니까?",
                  icon: "success",
                  showCancelButton: true,
                  confirmButtonColor: "#ffce8f",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "넹!!",
                  cancelButtonText: "아니요(정말?)",
                }).then((result) => {
                  if (result.isConfirmed) {
                    Swal.fire({
                      title: "도감 획득!",
                      text: "도감을 획득하셨습니다!",
                      icon: "success",
                    });
                  } else {
                    Swal.fire({
                      title: "도감을 획득하지 않으셨습니다.",
                      icon: "error",
                    });
                  }
                  resetGame();
                  setGameStart(true);
                });
              }, 500);
            }
          } else {
            // show only matched and previously selected card. Hide selection after 2s
            setGrid(
              grid.map((ele) =>
                selection.indexOf(ele.id) > -1 || matched.indexOf(ele.id) > -1
                  ? { ...ele, revealed: true }
                  : { ...ele, revealed: false },
              ),
            );
            setTimeout(() => {
              setGrid(
                grid.map((ele) =>
                  matched.indexOf(ele.id) > -1
                    ? { ...ele, revealed: true }
                    : { ...ele, revealed: false },
                ),
              );
              setFocused([]);
            }, 1000);
          }
        }
      }
    };

    return (
      <div className='gameWrapper'>
        <div>
          <section className='memory-game'>
            {grid.map((cell, index) => (
              <MemoryCard
                key={cell.face + index}
                data={cell}
                handleClickCard={handleClickCard}
              />
            ))}
          </section>
        </div>
        <div
          className='gameBackButton'
          onClick={() => {
            setGameStart(true);
          }}
        >
          뒤로가기
        </div>
      </div>
    );
  }
  const GameStartDiv = () => {
    return (
      <div className='gameStartWrapper'>
        <div className='gameStartInner'>
          <div className='gameStartTitle'>카드 뒤집기 게임</div>
          <div>
            카드 뒤집기 게임을 클리어 하시면 도감을 획득하실 수 있습니다.
          </div>

          <div
            className='gameStartButton'
            onClick={() => {
              setGameStart(false);
            }}
          >
            Start
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='game'>
      <img
        src='/assets/icons/cancel.png'
        onClick={quitGamePopup}
        className='quitGame'
      ></img>
      <div
        style={{
          width: "85vw",
          height: "85vh",
          position: "absolute",
          zIndex: "11",
          top: "7vh",
          left: "7vw",
        }}
      >
        {gameStart ? <GameStartDiv /> : <Game />}
      </div>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "black",
          opacity: "50%",
          position: "absolute",
          zIndex: "10",
        }}
      ></div>
    </div>
  );
};

export default GamePopup;
