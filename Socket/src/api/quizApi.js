import api from "./api";

export const getQuiz = async (number, success, fail) => {
  return await api.get(`/info/quiz?number=${number}`).then(success).catch(fail);
};
