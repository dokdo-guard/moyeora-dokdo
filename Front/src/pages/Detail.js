import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { DiaryStateContext } from "../App.js"

const Detail =() => {
    const [data, setData] = useState('')
    const { id } = useParams();
    const diaryList = useContext(DiaryStateContext);
    const navigate = useNavigate()
    const goHome =()=> {
        navigate('/home/board')
    }

    useEffect(() => {
        if (diaryList.length >= 1) {
          const targetDiary = diaryList.find(
            (it) => parseInt(it.id) === parseInt(id)
          );
    
          if (targetDiary) {
            // 일기가 존재할 때
            setData(targetDiary);
          } else {
            // 일기가 없을 때
            alert("없는 일기입니다.");
            navigate("/", { replace: true });
          }
        }
      }, [id, diaryList]);
    return (
    <div className="detail">
        내용 : {data.content}
        <button onClick={goHome}>돌아가기</button>
    </div>)
}

export default Detail