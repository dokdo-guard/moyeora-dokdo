import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BoardItem from "../components/board/BoardItem";
import { getBoard } from "../api/board";
import "../../src/components/css/Board.css";

const BoardHome = ({ quitBoard }) => {
  const [board, setBoard] = useState([]);
  useEffect(() => {
    getBoard()
      .then((res) => {
        setBoard(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [board.length]);

  const navigate = useNavigate();
  const writeNew = () => {
    navigate("/new");
  };
  const goToDokdo = () => {
    navigate("/main/main");
  };

  return (
    <div>
      <div className='boardHome'>
        <img
          src='/assets/icons/cancel.png'
          id='quitButton'
          onClick={quitBoard}
          className='quitBoard'
        ></img>
        <h1 className='title'>여러분의 독도를 꾸며주세요</h1>

        <div className='buttons'>
          <button onClick={writeNew} className='writeButton'>
            새 글 쓰기
          </button>
          <button onClick={goToDokdo} className='dokdoButton'>
            독도로 돌아가기
          </button>
        </div>

        {board.map((it) => (
          <div style={{ marginLeft: "2%" }}>
            <BoardItem key={it.id} {...it} className='boardItem'></BoardItem>
          </div>
        ))}
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

export default BoardHome;
