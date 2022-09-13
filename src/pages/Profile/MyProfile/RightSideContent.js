import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Nav,
  NavLink,
  TabContent,
  TabPane,
  Card,
  Input,
  Form,
  NavItem,
  CardBody,
  Label,
} from "reactstrap";
import classnames from "classnames";
import { toBase64 } from "../../../ExtraFunctionality/ToBase64";
import { Link } from "react-router-dom";
import { updateProfile, getCurrentUserData } from "../../../apis/User";
import { TailSpin } from "react-loader-spinner";
import {
  countryList,
  cityList,
  zipCodeList,
} from "../../../CountryandPhoneLists/Lists";
import Select from "react-select";
import { successToast } from "../../../components/Toasts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RightSideContent = (props) => {
  const [activeTab, setActiveTab] = useState("1");

  const tabChange = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  // updating User
  const [user, setUser] = useState();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [img, setImg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profession, setProfession] = useState("");
  const [phone, setPhone] = useState("");
  const [zipcode, setZipCode] = useState("");
  const [type, setType] = useState("");
  const [aboutme, setAboutme] = useState("");
  const [languages, setLanguages] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [skills, setSkills] = useState("");
  const [streetAddress, setStreetAddress] = useState();

  const [isUpdating, setISUpdating] = useState(false);

  const handleSubmit = async (e) => {
    const file = e.target.files[0];
    const base64 = await toBase64(file);
    setImg(base64);
    console.log(base64);
  };
  const Id = localStorage.getItem("UserId");
  useEffect(() => {
    getCurrentUserData(Id).then((resp) => {
      setUser(resp.data);
      setFirstName(resp.data.firstName);
      setLastName(resp.data.lastName);
      setImg(resp.data.profileImage);
      setEmail(resp.data.email);
      setPassword(resp.data.password);
      setProfession(resp.data.profession);
      setPhone(resp.data.phone);
      setZipCode(resp.data.zipcode);
      setType(resp.data.type);
      setAboutme(resp.data.aboutme);
      setLanguages(resp.data.languages);
      setCity(resp.data.city);
      setCountry(resp.data.country);
      setSkills(resp.data.skills);
      setStreetAddress(resp.data.streetAddress);
    });
  }, []);

  return (
    <React.Fragment>
      <Col lg={8}>
        <Card className="profile-content-page mt-4 mt-lg-0">
          <Nav
            className="profile-content-nav nav-pills border-bottom mb-4"
            id="pills-tab"
            role="tablist"
          >
            <NavItem role="presentation">
              <NavLink
                to="#"
                className={classnames({ active: activeTab === "1" })}
                onClick={() => {
                  tabChange("1");
                }}
                type="button"
              >
                Overview
              </NavLink>
            </NavItem>
            <NavItem role="presentation">
              <NavLink
                to="#"
                className={classnames({ active: activeTab === "2" })}
                onClick={() => {
                  tabChange("2");
                }}
                type="button"
              >
                Settings {user?.userId}
              </NavLink>
            </NavItem>
          </Nav>
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
          <CardBody className="p-4">
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <div>
                  <h5 className="fs-18 fw-bold">About</h5>
                  <p className="text-muted mt-4">{user?.aboutme}</p>
                </div>

                <div className="candidate-education-details mt-4">
                  <h6 className="fs-18 fw-bold mb-0">Education</h6>
                  {props.degrees?.map((degree) => {
                    return (
                      <div className="candidate-education-content mt-4 d-flex">
                        <div className="circle flex-shrink-0 bg-soft-primary">
                          {degree.name[0]}
                        </div>
                        <div className="ms-4">
                          <h6 className="fs-16 mb-1">
                            {/* BCA - Bachelor of Computer Applications */}
                            {degree.name}
                          </h6>
                          <p className="mb-2 text-muted">
                            {/* International University - (2004 - 2010) */}
                            {`${degree.institute} ${degree.startdate} ${degree.enddate}`}
                          </p>
                          <p className="text-muted">{degree.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="candidate-education-details mt-4">
                  <h6 className="fs-18 fw-bold mb-0">Experiences</h6>
                  <div className="candidate-education-content mt-4 d-flex">
                    {props.experiences?.map((item) => {
                      return (
                        <>
                          <div className="circle flex-shrink-0 bg-soft-primary">
                            W {item.jobTitle[0]}
                          </div>
                          <div className="ms-4">
                            <h6 className="fs-16 mb-1">
                              Web Design & Development Team Leader
                              {item.jobTitle}
                            </h6>
                            <p className="mb-2 text-muted">
                              {item.companyName}- (2013 - 2016)
                            </p>
                            <p className="text-muted">{item.jobDescription}</p>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
                <div className="mt-4">
                  <h5 className="fs-18 fw-bold">Skills</h5>
                </div>
                <div className="mt-0 d-flex flex-wrap align-items-start gap-1">
                  {skills?.split(",").map((skill) => {
                    return (
                      <>
                        <span className="badge fs-13 bg-soft-blue mt-2">
                          {skill}
                        </span>
                      </>
                    );
                  })}
                </div>
                <div className="mt-4">
                  <h5 className="fs-18 fw-bold">Spoken languages</h5>
                </div>
                <div className="mt-0 d-flex flex-wrap align-items-start gap-1">
                  {languages?.split(",").map((language) => {
                    return (
                      <>
                        <span className="badge fs-13 bg-soft-success mt-2">
                          {language}
                        </span>
                      </>
                    );
                  })}
                </div>
              </TabPane>
              <TabPane tabId="2">
                <Form action="#">
                  <div>
                    <h5 className="fs-17 fw-semibold mb-3 mb-0">My Account</h5>
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
                    <Row>
                      <Col lg={6}>
                        <div className="mb-3">
                          <label htmlFor="firstName" className="form-label">
                            First Name
                          </label>
                          <Input
                            type="text"
                            className="form-control"
                            id="firstName"
                            defaultValue={firstname}
                            onChange={(e) => {
                              setFirstName(e.target.value);
                            }}
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
                            defaultValue={lastname}
                            onChange={(e) => setLastName(e.target.value)}
                          />
                        </div>
                      </Col>

                      <Col lg={6}>
                        <div className="mb-3">
                          <label
                            htmlFor="choices-single-categories"
                            className="form-label"
                          >
                            Account Type
                          </label>
                          <select
                            className="form-select"
                            data-trigger
                            name="choices-single-categories"
                            id="choices-single-categories"
                            aria-label="Default select example"
                            defaultValue={type}
                            onChange={(e) => setType(e.target.value)}
                          >
                            {type == "Employer" ? (
                              <>
                                <option value={"Employer"}>Employer</option>
                                <option value={"Employee"}>Employee</option>
                              </>
                            ) : (
                              <>
                                <option value={"Employee"}>Employee</option>
                                <option value={"Employer"}>Employer</option>
                              </>
                            )}

                            {/* <option value="4">Accounting</option>
                            <option value="1">IT & Software</option>
                            <option value="3">Marketing</option>
                            <option value="5">Banking</option> */}
                          </select>
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mb-3">
                          <Label htmlFor="email" className="form-label">
                            Email
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="email"
                            defaultValue={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>

                  <div className="mt-4">
                    <h5 className="fs-17 fw-semibold mb-3">Profile</h5>
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
                            defaultValue={aboutme}
                            onChange={(e) => setAboutme(e.target.value)}
                          ></textarea>
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

                      <Col lg={6}>
                        <div className="mb-3">
                          <label
                            htmlFor="choices-single-location"
                            className="form-label"
                          >
                            Location
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
                      <Col md={6}>
                        <label
                          htmlFor="choices-single-location"
                          className="form-label"
                        >
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
                      <Col md={6}>
                        <label htmlFor="streetAddress" className="form-label">
                          Address
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
                      {/* <Col lg={12}>
                        <div className="mb-3">
                          <Label htmlFor="attachmentscv" className="form-label">
                            Attachments CV
                          </Label>
                          <Input
                            className="form-control"
                            type="file"
                            id="attachmentscv"
                          />
                        </div>
                      </Col> */}
                    </Row>
                  </div>

                  <div className="mt-4">
                    <h5 className="fs-17 fw-semibold mb-3">Social Media</h5>
                    <Row>
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
                      {/* <Col lg={6}>
                        <div className="mb-3">
                          <Label htmlFor="City" className="form-label">
                            City
                          </Label>
                          <Select options={cityList} onChange={(e) => setCity()}/>
                        </div>
                      </Col> */}
                      <Col lg={6}>
                        <div className="mb-3">
                          <Label htmlFor="country" className="form-label">
                            Country
                          </Label>
                          <Select
                            options={countryList}
                            defaultValue={country}
                            onChange={(e) => setCountry(e.value)}
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
                          <Label htmlFor="zipode" className="form-label">
                            ZipCode
                          </Label>
                          <Select
                            options={zipCodeList}
                            onChange={(e) => setZipCode(e.value)}
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>

                  {/* <div className="mt-4">
                    <h5 className="fs-17 fw-semibold mb-3 mb-3">
                      Change Password
                    </h5>
                    <Row>
                      <Col lg={6}>
                        <div className="mb-3">
                          <Label
                            htmlFor="new-password-input"
                            className="form-label"
                          >
                            New password
                          </Label>
                          <Input
                            type="password"
                            className="form-control"
                            placeholder="Enter new password"
                            id="new-password-input"
                            value={props.user?.password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </Col>

                      <Col lg={6}>
                        <div className="mb-3">
                          <Label
                            htmlFor="confirm-password-input"
                            className="form-label"
                          >
                            Confirm Password
                          </Label>
                          <Input
                            type="password"
                            className="form-control"
                            placeholder="Confirm Password"
                            id="confirm-password-input"
                          />
                        </div>
                      </Col>

                      <Col lg={12}>
                        <div className="form-check">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            id="verification"
                          />
                          <Label
                            className="form-check-label"
                            htmlFor="verification"
                          >
                            Enable Two-Step Verification via email
                          </Label>
                        </div>
                      </Col>
                    </Row>
                  </div> */}
                  <div className="mt-4 text-end">
                    <Link
                      to="#"
                      className="btn btn-primary"
                      onClick={() => {
                        setISUpdating(true);
                        updateProfile(
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
                          skills,
                          streetAddress
                        )
                          .then((resp) => {
                            successToast("Successfully Updated Your Account");
                            setISUpdating(false);
                            setTimeout(() => {
                              window.parent.location =
                                window.parent.location.href;
                            }, 1500);
                          })
                          .catch((error) => {
                            if (error) {
                              successToast(
                                "An Error occured while updating Your Profile"
                              );
                              setISUpdating(false);
                              // setTimeout(() => {
                              //   window.parent.location =
                              //     window.parent.location.href;
                              // }, 1500);
                            }
                          });
                      }}
                    >
                      Update
                    </Link>
                  </div>
                </Form>
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </Col>
      {isUpdating ? (
        <>
          {" "}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: "250px",
              marginLeft: "-50px",
            }}
          >
            <h1>Updating ... </h1>
            <TailSpin
              height={200}
              width={200}
              color="blue"
              ariaLabel="tail-spin-loading"
              radius="1"
              visible={props.isLoading}
            />
          </div>
        </>
      ) : (
        <></>
      )}
    </React.Fragment>
  );
};

export default RightSideContent;
