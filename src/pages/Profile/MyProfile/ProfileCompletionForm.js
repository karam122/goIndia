import React, { useEffect, useState, useMemo } from "react";
import { Col, Row, Input, Form, Label } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import Select from "react-select";
import Section from "../../../components/Section";
import {
  zipCodeList,
  IdentityTypeList,
  IdentityDocumentTypeList,
} from "../../../CountryandPhoneLists/Lists";
import { completeProfile } from "../../../apis/User";
import { toBase64 } from "../../../ExtraFunctionality/ToBase64";
import countryList from "react-select-country-list";
import { TheTailSpinner } from "../../../components/Spinners";
import { successToast } from "../../../components/Toasts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfileCompletionForm = () => {
  const [countrycode, setCountryCode] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  const [isLoading, setIsLoading] = useState(false);

  const [img, setImg] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [aboutMe, setAboutme] = useState("");
  const [profession, setProfession] = useState("");
  const [phone, setPhone] = useState("");
  const [languages, setLanguages] = useState("");
  const [skills, setSkills] = useState("");

  // Address Info
  const [streetAddress, setStreetAddress] = useState();
  const [streetAddress2, setStreetAddress2] = useState();
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");

  // Identity Info
  const [identityCountry, setIdentityCountry] = useState("");
  const [identityType, setIdentityType] = useState("");
  const [identityNumber, setIdentityNumber] = useState("");
  const [identityDocType, setIdentityDocType] = useState("");
  const [identityFrontImg, setIdentityFrontImg] = useState("");
  const [identityBackImg, setIdentityBackImg] = useState("");

  const handleSubmit = async (e) => {
    const file = e.target.files[0];
    const base64 = await toBase64(file);
    setImg(base64);
    //console.log("Image is : ", img);
  };

  const handleIdentityFront = async (e) => {
    const file = e.target.files[0];
    const base64 = await toBase64(file);
    setIdentityFrontImg(base64);
    // console.log("Base 64 is :", base64);
    // console.log("Identity Front Image: ", identityFrontImg);
  };
  const handleIdentityBack = async (e) => {
    const file = e.target.files[0];
    const base64 = await toBase64(file);

    setIdentityBackImg(base64);
    // console.log("Base 64 is :", base64);
    // console.log("Identity Back Image: ", identityBackImg);
  };

  useEffect(() => {
    if (
      localStorage.getItem("ApprovalStatus") == "submitted" ||
      localStorage.getItem("ApprovalStatus") == "approved"
    ) {
      history.push("/profileunderreview");
    }
  });

  const history = useHistory();
  const profilecompletion = (
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
    setIsLoading(true);
    // console.log("Id is : ", Id);
    // console.log("firstName is : ", firstName);
    // console.log(" middleName is : ", middleName);
    // console.log("lastName is : ", lastName);
    // console.log("Profile Image is : ", img);
    // console.log("dateOfBirth is : ", dateOfBirth);
    // console.log("aboutMe is : ", aboutMe);
    // console.log("profession is : ", profession);
    // console.log("phone is : ", phone);
    // console.log("languages is : ", languages);
    // console.log("skills is : ", skills);
    // console.log("streetAddress is : ", streetAddress);
    // console.log("streetAddress2 is : ", streetAddress2);
    // console.log("city is : ", city);
    // console.log("state is : ", state);
    // console.log("zipCode is : ", zipCode);
    // console.log("country is : ", country);
    // console.log(" identityCountry is : ", identityCountry);
    // console.log("identityType is : ", identityType);
    // console.log("identityNumber is : ", identityNumber);
    // console.log("identityDocType is : ", identityDocType);
    // console.log("identityFrontImg is : ", identityFrontImg);
    // console.log("identityBackImg is : ", identityBackImg);

    completeProfile(
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
    )
      .then((resp) => {
        console.log("Response is : ", resp);

        if (resp.data == "Successfully Submitted Profile For Review") {
          successToast(resp.data);
          setIsLoading(false);
          localStorage.setItem("ApprovalStatus", "submitted");
          setTimeout(() => {
            if (localStorage.getItem("ApprovalStatus") == "submitted") {
              history.push("/profileunderreview");
            }
          }, 700);
        } else if (resp.data == "Successfully Verified Profile") {
          successToast(resp.data);
          setIsLoading(false);
          localStorage.setItem("ApprovalStatus", "approved");
          setTimeout(() => {
            if (localStorage.getItem("ApprovalStatus") == "submitted") {
              history.push("/signin");
            }
          }, 700);
        } else if (resp.data == "Verification Failed") {
          successToast(resp.data);
          localStorage.setItem("ApprovalStatus", "pending");
          window.parent.location = window.parent.location.href;
        }
      })
      .catch((error) => {
        successToast("An Error Occured");
      });
  };
  const Id = localStorage.getItem("UserId");
  return (
    <>
      <Section
        pageTitle={"Profile Completion"}
        Primary={"Profile Completion"}
        primaryLink={"/profilecompletionform"}
      />
      <ToastContainer
        position="top-center"
        autoClose={700}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div style={{ margin: "auto", width: "60%" }}>
        <Form action="#" style={{ margin: "50px 0px 20px 50px" }}>
          <div>
            <h5 className="fs-17 fw-semibold mb-3 mb-0"></h5>
            <div className="text-center">
              <div className="mb-4 profile-user">
                <img
                  // src={userImage2}
                  src={img}
                  className="rounded-circle img-thumbnail profile-img"
                  id="profile-img"
                  alt=""
                />
                <div className="p-0 rounded-circle profile-photo-edit">
                  <Input
                    id="profile-img-file-input"
                    type="file"
                    className="profile-img-file-input"
                    onChange={(e) => handleSubmit(e)}
                  />
                  <Label
                    htmlFor="profile-img-file-input"
                    className="profile-photo-edit avatar-xs"
                  >
                    <i className="uil uil-edit"></i>
                  </Label>
                </div>
              </div>
            </div>
            <Row className="mt-4">
              <h4 className=" mb-4">Personal Information</h4>
              <Col lg={6}>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <Input
                    type="text"
                    className="form-control"
                    id="firstName"
                    defaultValue={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <label htmlFor="middleName" className="form-label">
                    Middle Name
                  </label>
                  <Input
                    type="text"
                    className="form-control"
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="lastName" className="form-label">
                    Last Name
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="lastName"
                    defaultValue={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="lastName" className="form-label">
                    Date of Birth
                  </Label>
                  <Input
                    type="date"
                    className="form-control"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                  />
                </div>
              </Col>
            </Row>
          </div>

          <div className="mt-4">
            <Row>
              <Col lg={12}>
                <div className="mb-3">
                  <Label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    Introduce Yourself
                  </Label>
                  <textarea
                    className="form-control"
                    rows="5"
                    defaultValue={aboutMe}
                    onChange={(e) => setAboutme(e.target.value)}
                  ></textarea>
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="profession" className="form-label">
                    Profession
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="profession"
                    to=""
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                  />
                </div>
              </Col>

              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="phone" className="form-label">
                    Phone
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="phone"
                    to=""
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </Col>

              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="languages" className="form-label">
                    Languages
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="languages"
                    defaultValue={languages}
                    onChange={(e) => setLanguages(e.target.value)}
                  />
                </div>
              </Col>
              <Col md={6}>
                <label htmlFor="choices-single-location" className="form-label">
                  Skills
                </label>
                <Input
                  type="text"
                  className="form-control"
                  id="skills"
                  to=""
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
              </Col>
              <br />
            </Row>
          </div>

          <div className="mt-4">
            <h4>Address Information</h4>
            <Row className="mt-4">
              <Col md={6}>
                <label htmlFor="streetAddress" className="form-label">
                  Street Address 1
                </label>
                <Input
                  type="text"
                  className="form-control"
                  id="streetAddress"
                  to=""
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                />
              </Col>
              <Col md={6}>
                <label htmlFor="streetAddress2" className="form-label">
                  Street Address 2
                </label>
                <Input
                  type="text"
                  className="form-control"
                  id="streetAddress2"
                  value={streetAddress2}
                  onChange={(e) => setStreetAddress2(e.target.value)}
                />
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <label
                    htmlFor="choices-single-location"
                    className="form-label"
                  >
                    City
                  </label>
                  <select
                    className="form-select"
                    data-trigger
                    name="choices-single-location"
                    id="choices-single-location"
                    aria-label="Default select example"
                    onChange={(e) => setCity(e.target.value)}
                  >
                    <option value={city}>{city}</option>
                    <option value="Montenegro">Montenegro</option>
                    <option value="Montserrat">Montserrat</option>
                    <option value="Morocco">Morocco</option>
                    <option value="Mozambique">Mozambique</option>
                  </select>
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="state" className="form-label">
                    State
                  </Label>
                  <Select
                    options={options}
                    defaultValue={state}
                    onChange={(e) => setState(e.value)}
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="zipode" className="form-label">
                    ZipCode
                  </Label>
                  <Select
                    options={zipCodeList}
                    defaultValue={zipCode}
                    onChange={(e) => setZipCode(e.value)}
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="country" className="form-label">
                    Country
                  </Label>
                  <Select
                    options={options}
                    defaultValue={country}
                    onChange={(e) => setCountry(e.value)}
                  />
                </div>
              </Col>
            </Row>
          </div>

          <div className="mt-4">
            <h4>Identity Information</h4>
            <Row className="mt-4">
              <Col md={4}>
                <Label htmlFor="zipode" className="form-label">
                  Select Country
                </Label>
                <Select
                  options={options}
                  defaultValue={identityCountry}
                  onChange={(e) => setIdentityCountry(e.value)}
                />
              </Col>
              <Col md={4}>
                <Label htmlFor="zipode" className="form-label">
                  Identity Type
                </Label>
                <Select
                  options={IdentityTypeList}
                  defaultValue={identityType}
                  onChange={(e) => setIdentityType(e.value)}
                />
              </Col>
              <Col md={4}>
                <Label htmlFor="identityNumber" className="form-label">
                  Identity Number
                </Label>
                <Input
                  type="text"
                  id="identityNumber"
                  className="form-control"
                  defaultValue={identityNumber}
                  onChange={(e) => setIdentityNumber(e.target.value)}
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col md={4}>
                <Label htmlFor="zipode" className="form-label">
                  Identity Document Type
                </Label>
                <Select
                  options={IdentityDocumentTypeList}
                  defaultValue={identityDocType}
                  onChange={(e) => setIdentityDocType(e.value)}
                />
              </Col>
              <Col md={4}>
                <Label htmlFor="identityfrontimg" className="form-label">
                  Identity Document Front
                </Label>
                <Input
                  type="file"
                  className="identityfrontimg"
                  onChange={(e) => handleIdentityFront(e)}
                />
              </Col>
              <Col md={4}>
                <Label htmlFor="identitybackimg" className="form-label">
                  Identity Document Back
                </Label>
                <Input
                  type="file"
                  className="identitybackimg"
                  onChange={(e) => handleIdentityBack(e)}
                />
              </Col>
            </Row>
          </div>
          <br />
          <div className="mt-4 text-end">
            {firstName == "" ||
            lastName == "" ||
            img == "" ||
            aboutMe == "" ||
            languages == "" ||
            city == "" ||
            phone == "" ||
            profession == "" ||
            zipCode == "" ||
            country == "" ||
            skills == "" ||
            streetAddress == "" ||
            state == "" ||
            identityDocType == "" ||
            identityCountry == "" ||
            identityBackImg == null ||
            identityFrontImg == null ||
            identityNumber == "" ||
            identityType == "" ? (
              <>
                <button className="btn btn-primary" disabled>
                  Submit For Review
                </button>
              </>
            ) : (
              <>
                <Link
                  to="#"
                  className="btn btn-primary"
                  onClick={() => {
                    profilecompletion(
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
                    );
                  }}
                >
                  Submit For Review
                  <span
                    style={{
                      display: "inline-block",
                      marginLeft: "50px",
                    }}
                  >
                    <TheTailSpinner
                      isLoading={isLoading}
                      width={23}
                      height={23}
                      color="red"
                    />
                  </span>
                </Link>
              </>
            )}
          </div>
        </Form>
      </div>
    </>
  );
};
export default ProfileCompletionForm;

{
  /* <Link
to="#"
className="btn btn-primary"
onClick={() => {
  completeProfile(
    Id,
    firstname,
    lastname,
    img,
    aboutme,
    languages,
    city,
    phone,
    profession,
    zipcode,
    country,
    skills,
    streetAddress
  ).then((resp) => {
    console.log("Response is : ", resp);
  });
}}
>
Complete Profile
</Link> */
}
