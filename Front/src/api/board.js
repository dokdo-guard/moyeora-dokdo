import api from "./api";

// Bird 예시예시
// export const getAllBirds = async (success, fail) => {
//     return await api.get(`/info/birds`).then(success).catch(fail);
//   };
//   export const getBird = async (name, success, fail) => {
//     return await api.get(`/info/bird?name=${name}`).then(success).catch(fail);
//   };


// 게시판 정보 다 가져오기
export const getBoard = async(success, fail) => {
    return await api.get(`/board`).then(success).catch(fail);
}

// 게시판 작성하기
export const createBoard = async(success, fail) => {
    return await api.post(`/board`).then(success).catch(fail);
}