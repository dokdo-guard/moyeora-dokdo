import { useNavigate, useParams } from "react-router-dom";
import '../css/Board.css'
import { useEffect, useState, useRef, useContext } from "react";

const Board = ({quitBoard}) => {


    return(
    <div className="boardPage">
        <img src='/assets/images/dokdoIllust.png' className="dokdoIllust"></img>
        <button onClick={goBoard} className="goBoard">게시판 가기</button>
        <button onClick={quitBoard} className="cancelBoard">취소</button>
    </div>)
    
}

export default Board;