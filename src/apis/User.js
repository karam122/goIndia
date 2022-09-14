import { base_url } from "./constants";
const axios = require("axios");

export const USER_API = axios.create({
  baseURL: `${base_url}User`,
  responseType: "json",
  headers: {
    Authorization: "bearer " + localStorage.getItem("AccessToken"),
  },
});

// Signin
export const Signin = async (email, password) => {
  return await USER_API({
    method: "post",
    url: `/Login`,
    data: {
      email: email,
      password: password,
    },
  });
};

// signup confirmation Code
export const Confirmation = async (confirmation) => {
  return await USER_API({
    method: "post",
    url: `VerifyCode/${confirmation}`,
  });
};

// Sign Up
export const CreateNewUser = async (email, password, type, img) => {
  return await USER_API({
    method: "post",
    url: `/CreateNewUser`,
    data: {
      email: email,
      password: password,
      type: type,
      profileImage: img,
    },
  });
};

// Get Employees to show Employer
export const getEmployees = () => {
  return USER_API({
    method: "get",
    url: `/GetAllEmployees`,
  });
};

export const getCurrentUserData = async (id) => {
  return await USER_API.get(`UserData/${id}`);
};

// Get User for Contracts

export const getContractUser = async (id) => {
  return await USER_API.get(`User/${id}`);
};

// get Applicant

export const getApplicantUser = async (id) => {
  const resp = await USER_API.get(`User/${id}`);
  const data = resp.data;
  return data;
};

export const updateProfile = (
  Id,
  firstname,
  lastname,
  img,
  email,
  password,
  type,
  aboutme,
  languages,
  city,
  phone,
  profession,
  zipcode,
  country,
  streetAddress,
  skills
) => {
  return USER_API({
    method: "post",
    url: `/updateUser/${Id}`,
    data: {
      id: Id,
      firstName: firstname,
      lastName: lastname,
      profileImage: img,
      email: email,
      password: password,
      type: type,
      aboutme: aboutme,
      languages: languages,
      city: city,
      phone: phone,
      profession: profession,
      skills: skills,
      zipCode: zipcode,
      streetAddress: streetAddress,
      country: country,
    },
  });
};

export const completeProfile = (
  Id,
  img,
  firstName,
  middleName,
  lastName,
  dateOfBirth,
  aboutMe,
  profession,
  phone,
  languages,
  skills,
  streetAddress,
  streetAddress2,
  city,
  state,
  zipCode,
  country,
  identityCountry,
  identityType,
  identityNumber,
  identityDocType,
  identityFrontImg,
  identityBackImg
) => {
  return USER_API({
    method: "post",
    url: `/completeProfile/${Id}`,
    data: {
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      profileImage: img,
      dateOfBirth: dateOfBirth,
      aboutme: aboutMe,
      profession: profession,
      phone: phone,
      languages: languages,
      skills: skills,
      streetAddress: streetAddress,
      streetAddress2: streetAddress2,
      city: city,
      state: state,
      zipCode: zipCode,
      country: country,
      identityCountry: identityCountry,
      identityType: identityType,
      identityNumber: identityNumber,
      identityDocType: identityDocType,
      identityFrontImage: identityFrontImg,
      identityBackImage: identityBackImg,
    },
  });
};

// get AIPRICE VERIFICATION RESULT

export const aipriceverification = async (Id) => {
  return await USER_API({
    method: "Post",
    url: `/getAspireVerificationStatus/${Id}`,
  });
};
