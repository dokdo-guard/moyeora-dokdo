import { useNavigate } from "react-router-dom"

import '../css/Board.css'

const BoardItem =({ id, content, image_url }) => {
    const imageSrc = `https://ssafy-d204-dokdo.s3.ap-northeast-2.amazonaws.com/${image_url}` 
    return(
    <div className="boardItem">
        <figure class="snip1419">
            <figcaption>
                <p>{content}</p>
            </figcaption>
            <img src={imageSrc}/>
        </figure>
    </div>)
}

export default BoardItem