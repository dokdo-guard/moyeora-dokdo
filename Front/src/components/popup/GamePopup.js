import {quitGamePopup} from '../main/PopupButton'
import React, {useEffect, useState} from 'react'
// import { CreateMatrix } from './game/Shuffle';
// import MemoryCard from './game/MemoryCard';
import {getRandomDogam} from '../../api/ecoSystemApi.js'
import {random} from './game/RandomDogam'
import '../css/game.css'
import Logo from './game/logo.png'



const GamePopup =() => {



    function MemoryCard({ data, handleClickCard }) {
        const s3Url = "https://ssafy-d204-dokdo.s3.ap-northeast-2.amazonaws.com/"
        return (
          <div
            className={`memory-card ${data.revealed ? 'flip' : ''}`}
            onClick={handleClickCard}
          >
            <img
              data-cell-index={data.id}
              className='back-face'
              src={Logo}
              alt="Click me!"
            />
            <img
              data-cell-index={data.id}
              className='front-face'
              src={s3Url+data.image}
              alt={data.face}
            />
          </div>
        );
      }



    const CreateMatrix = () => {


    // 6개 랜덤으로 받아오기
        const [random, setRandom] = useState([])
        useEffect(()=> {
            getRandomDogam(6)
            .then((res)=> {
                setRandom(res.data)
                console.log(res.data)
            })
            .catch((err)=> {
                console.log(err)
            })
        },[])


        const imagePool = ["감태.png", "강치.png", "개볼락.png", "거북손.png", "고랑딱개비.png", "괭생이모자반.png", "구멍갈파래.png", "구슬모자반.png", "기름가자미.png"]
        const randomImages = randomSelect(imagePool, 6); 
        // const randomImages = random.map((it)=> it.img)
        console.log(randomImages)
        const matrix = [];
        for (let i = 0; i < randomImages.length; i++) {
          const cell = {
            face: randomImages[i].substr(0, randomImages[i].length-4),
            image: randomImages[i],
          };
          let pair = [cell, cell];
          matrix.push(...pair);
        }
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
      
        function randomSelect(imagePool, number) {
          const max = imagePool.length;
          const list = [];
          while(list.length==number){
            const rand = Math.random() * (max-1) + 1;
            if(!list.includes(rand)){
              list.push(rand);
            }
          }
          const imageList = []
          for (let index = 0; index < number; index++) {
            imageList.push(imagePool[index])
          }
          // console.log("imagePool", imagePool);
          // console.log("imageList", imageList);
          return imageList
        }
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
          const cardPosition = parseInt(event.target.getAttribute("data-cell-index"));
          // user cannot select more than two cards
          if (focused.length > 1) return;
      
          // 'cardPosition' is NaN, when user click the same card frequently
          if (isNaN(cardPosition))  return;
      
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
                    : { ...ele }
                )
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
                      : { ...ele, revealed: false }
                  )
                );
                setMatched(paired);
                setFocused([]);
                // alert box to reset game   
                if (paired.length === 12) {
                  setTimeout(() => {
                    var result = window.confirm(
                      "Yayy. You have solved the game. Would you like to play again?"
                    );
                    if(result){
                      resetGame();
                    } else {
                      
                    }
                  }, 2000);
                }
              } else {
                // show only matched and previously selected card. Hide selection after 2s
                setGrid(
                  grid.map((ele) =>
                    selection.indexOf(ele.id) > -1 || matched.indexOf(ele.id) > -1
                      ? { ...ele, revealed: true }
                      : { ...ele, revealed: false }
                  )
                );
                setTimeout(() => {
                  setGrid(
                    grid.map((ele) =>
                      matched.indexOf(ele.id) > -1
                        ? { ...ele, revealed: true }
                        : { ...ele, revealed: false }
                    )
                  );
                  setFocused([]);
                }, 2000);
              }
            }
          }
        };
      
        return (
          <div>
            <section className="memory-game">
              {grid.map((cell, index) => (
                <MemoryCard
                  key={cell.face + index}
                  data={cell}
                  handleClickCard={handleClickCard}
                />
              ))}
            </section>
          </div>
        );
      }




    return (
    <div className="game">
        <img
          src='/assets/icons/cancel.png'
          onClick={quitGamePopup}
          className='quitGame'
        ></img>
        <div style={{width:'85vw',height:'85vh',position:'absolute',zIndex:'11',top:'7vh',left:'7vw'}}>
            <Game></Game>
        </div>
        <div style={{width:'100vw',height:'100vh',backgroundColor:'black',opacity:'50%',position:'absolute',zIndex:'10'}}></div>
    </div>)
}

export default GamePopup