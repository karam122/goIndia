import { base_url } from "./constants";
const axios = require("axios");
const Id = localStorage.getItem("UserId");
const JOB_API = axios.create({
  baseURL: `${base_url}Job`,
  responseType: "json",
});

export const getJobs = async (setJobs) => {
  const Jobs = await JOB_API.get("/allJobs");
  setJobs(Jobs.data);
};

export const getMyJobs = async (Id) => {
  return await JOB_API.post(`getUserJobs/${Id}`);
};

export const PostAJob = (
  Id,
  jobTitle,
  minRate,
  maxRate,
  location,
  category,
  experience,
  employmentType,
  jobHours,
  dailyHours,
  dateFrom,
  dateTo,
  jobDescription
) => {
  return JOB_API({
    method: "post",
    url: `/PostJob`,
    data: {
      userId: Id,
      jobTitle: jobTitle,
      minRate: minRate,
      maxRate: maxRate,
      location: location,
      category: category,
      experience: experience,
      employmentType: employmentType,
      jobHours: jobHours,
      dailyHours: dailyHours,
      dateFrom: dateFrom,
      dateTo: dateTo,
      jobDescription: jobDescription,
    },
  });
};

// get All Applications for a Job

export const getApplicantsForAJob = async (id) => {
  return await JOB_API.post(`/ApplicationsForJob/${id}`);
};

// Get Apllications SubmittedbyEmployee

export const getEmployeeApplications = async (id) => {
  return await JOB_API.post(`EmployeeJobApplications/${id}`);
};

// Apply For Job

export const ApplyForJob = async (jobid, hourlyRate, proposal) => {
  return await JOB_API({
    method: "post",
    url: `/ApplyForJob`,
    data: {
      userId: localStorage.getItem("UserId"),
      jobId: jobid,
      proposal: proposal,
      hourlyRate: hourlyRate,
    },
  });
};
