import { base_url, currentuserid } from "./constants";
const axios = require("axios");

export const Contract_API = axios.create({
  baseURL: `${base_url}Contract`,
  responseType: "json",
  headers: {
    Authorization: "bearer " + localStorage.getItem("AccessToken"),
  },
});

const Id = localStorage.getItem("UserId");

export const getMyContracts = (pageNo) => {
  return Contract_API.post(`/EmployerContracts/${Id}/${pageNo}`);
};

export const getEmployerContracts = (pageNo) => {
  return Contract_API.post(`/EmployerContracts/${Id}/${pageNo}`);
};

export const getEmployeeContracts = (pageNo) => {
  return Contract_API.post(`/EmployeeContracts/${Id}/${pageNo}`);
};

// get ongoing Employee Contracts
export const getOngoingEmployeeContracts = (pageNo) => {
  return Contract_API.post(`/EmployeeOngoingContracts/${Id}/${pageNo}`);
};

// get ongoing Employee Contracts
export const getOngoingEmployerContracts = (pageNo) => {
  return Contract_API.post(`/EmployerOngoingContracts/${Id}/${pageNo}`);
};

export const hireCandidate = async (
  date,
  EmployerId,
  EmployeeId,
  JobId,
  type,
  hourlyRate,
  hoursPerWeek
) => {
  return await Contract_API.post("/CreateNewContract", {
    dateProcessed: date,
    dateAccepted: "",
    employerId: EmployerId,
    employeeId: EmployeeId,
    jobId: JobId,
    type: type,
    hourlyRate: hourlyRate,
    hoursPerWeek: hoursPerWeek,
    status: "pending",
  });
};

// Update Contract Status

export const updateContractStatus = async (cid) => {
  return await Contract_API.post(`/updateContractStatus/${cid}`);
};
