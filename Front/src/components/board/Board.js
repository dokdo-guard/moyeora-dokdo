import { useNavigate, useParams } from "react-router-dom";
import '../css/Board.css'
import { useEffect, useState, useRef, useContext } from "react";
import { DiaryDispatchContext } from "../../App.js";

const Board = () => {
    const navigate = useNavigate()
    const goBoard =()=> {
        navigate('/home/board')
    }

    return(<div className="boardPage">
        <button onClick={goBoard}>게시판 가기</button>
    </div>)
}

export default Board;