import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BoardItem from "../components/board/BoardItem";
import { getBoard } from "../api/board";

import AWS from "aws-sdk";

const BoardHome =() => {
    const [board, setBoard] = useState([])
    useEffect(()=> {
        getBoard()
        .then((res)=> {
            setBoard(res.data)
            console.log(res.data)
        })
        .catch((err)=> {
            console.log(err)
        })

    },[board.length])


    const navigate = useNavigate()
    const writeNew =() => {
        navigate('/new')
    }
    const goToDokdo =() => {
        navigate('/main/mainTest')
    }
    
    return(
    <div className="boardHome">
        <h1 className="title">
            여러분의 독도를 꾸며주세요
        </h1>
        <div className="buttons">
            <button onClick={writeNew} className="writeButton">새 글 쓰기</button>
            <button onClick={goToDokdo} className='dokdoButton'>독도로 돌아가기</button>
        </div>

        {board.map((it)=> 
        <div style={{marginLeft:'2%'}}>
            <BoardItem key={it.id} {...it} className="boardItem"></BoardItem>
        </div>)}
    </div>)
}

export default BoardHome