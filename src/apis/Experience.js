import { base_url } from "./constants";
const axios = require("axios");

export const exp_url = `${base_url}Experience/`;

export const EXP_API = axios.create({
  baseURL: exp_url,
  responseType: "json",
});

export const getExperience = async (setExperience, id) => {
  const exp = await EXP_API.post(`${exp_url}getCurrentUserExperience/${id}`);
  setExperience(exp.data.experiences);
};
