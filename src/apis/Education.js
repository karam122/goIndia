import { base_url } from "./constants";
const axios = require("axios");

export const edu_url = `${base_url}Education/`;

export const EDU_API = axios.create({
  baseURL: edu_url,
  responseType: "json",
});

export const getEducation = async (setEducation, id) => {
  const edu = await EDU_API.post(`getCurrentUserEducation/${id}`);
  setEducation(edu.data.degrees);
};
