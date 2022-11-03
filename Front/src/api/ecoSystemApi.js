import api from "./api";

// Bird
export const getAllBirds = async (success, fail) => {
  return await api.get(`/info/birds`).then(success).catch(fail);
};
export const getBird = async (name, success, fail) => {
  return await api.get(`/info/bird?name=${name}`).then(success).catch(fail);
};

// Plant
export const getAllPlants = async (success, fail) => {
  return await api.get(`/info/plants`).then(success).catch(fail);
};
export const getPlant = async (name, success, fail) => {
  return await api.get(`/info/plant?name=${name}`).then(success).catch(fail);
};

// Resource
export const getAllResources = async (success, fail) => {
  return await api.get(`/info/resources`).then(success).catch(fail);
};
export const getResource = async (name, success, fail) => {
  return await api.get(`/info/resource?name=${name}`).then(success).catch(fail);
};

// Sea Animal
export const getAllSeaAnimal = async (success, fail) => {
  return await api.get(`/info/sea-animals`).then(success).catch(fail);
};
export const getSeaAnimal = async (name, success, fail) => {
  return await api
    .get(`/info/sea-animal?name=${name}`)
    .then(success)
    .catch(fail);
};

// Sea Plant
export const getAllSeaPlants = async (success, fail) => {
  return await api.get(`/info/sea-plants`).then(success).catch(fail);
};
export const getSeaPlant = async (name, success, fail) => {
  return await api
    .get(`/info/sea-plant?name=${name}`)
    .then(success)
    .catch(fail);
};
