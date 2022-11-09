import api from "./api";

// 게시판 정보 다 가져오기
export const getBoard = async(success, fail) => {
    return await api.get('/board/').then(success).catch(fail);
}

// 게시판 작성하기
export const createBoard = async(info,success, fail) => {
    return await api.post('/board/',info).then(success).catch(fail);
}