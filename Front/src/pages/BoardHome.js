import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BoardItem from "../components/board/BoardItem";
import { getBoard } from "../api/board";

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
    },[])

    const navigate = useNavigate()
    const writeNew =() => {
        navigate('/new')
    }
    const goToDokdo =() => {
        navigate('/main/mainTest')
    }
    
    return(
    <div className="boardHome">
        <h2 className="title">
            여러분의 독도를 꾸며주세요
        </h2>
        <div style={{display:'flex',justifyContent:'center'}}>
            <button onClick={writeNew} className="writeButton">새 글 쓰기</button>
            <button onClick={goToDokdo} className='dokdoButton'>독도로 돌아가기</button>
        </div>
        {board.map((it)=> 
            <BoardItem key={it.id} {...it}></BoardItem>)}
    </div>)
}

export default BoardHome