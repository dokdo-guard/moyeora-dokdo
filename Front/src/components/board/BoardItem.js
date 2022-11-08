import { useNavigate } from "react-router-dom"

const BoardItem =({ id, content }) => {
    const navigate = useNavigate()
    const goDetail =() => {
        navigate(`/detail/${id}`)
    }

    return(
    <div onClick={goDetail}>
        내용 : {content}
    </div>)
}

export default BoardItem