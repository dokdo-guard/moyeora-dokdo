import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "../components/board/Editor";
import '../components/css/Board.css'

const NewPage =() => {
    const [isLoaded, setIsLoaded] = useState(false)
    useEffect(()=> {
        setIsLoaded(!isLoaded)
    },[])

    const navigate = useNavigate()
    return (<div className="newPage">
        독도에 대해 새 글을 써주세요
        <Editor></Editor>
        <button onClick={()=> navigate('/home/board')}>취소하기</button>
    </div>)
}

export default NewPage