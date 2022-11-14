import api from "./api";


// NPC와 대화 체크
export const checkNPC = async(name, success, fail) => {
    return await api.post('/user/talk/',name).then(success).catch(fail);
}

// 대화한 NPC 리스트 불러오기
export const checkNPClist = async(success, fail) => {
    return await api.get('/user/talk/').then(success).catch(fail);

}