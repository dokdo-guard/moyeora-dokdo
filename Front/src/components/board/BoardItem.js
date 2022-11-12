import { useNavigate } from "react-router-dom"

import '../css/Board.css'

const BoardItem =({ id, content, image_url }) => {
    const imageSrc = `https://ssafy-d204-dokdo.s3.ap-northeast-2.amazonaws.com/${image_url}` 
    return(
    <div className="boardItem animate__animated animate__bounceIn">

        <figure className="snip1332">
            <div className="img">      
                <img src={imageSrc} alt=""/>
            </div>
            <figcaption>
                <p>{content}</p>
            </figcaption>
        </figure>

    </div>)
}

export default BoardItem