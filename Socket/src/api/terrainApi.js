import api from "./api";

export const getAllTerrians = async (success, fail) => {
  return await api.get(`/info/terrians`).then(success).catch(fail);
};
export const getTerrain = async (name, success, fail) => {
  return await api.get(`/info/terrian?name=${name}`).then(success).catch(fail);
};
