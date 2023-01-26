import React from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Row,
  Toast,
  ToastBody,
  ToastHeader,
} from "reactstrap";
import MetaTags from "react-meta-tags";

//Import Image
import lightLogo from "../../assets/images/logo-light.png";
import darkLogo from "../../assets/images/logo-dark.png";

import signInImage from "../../assets/images/auth/sign-in.png";
import { Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { Signin } from "../../apis/User";
import { TheTailSpinner } from "../../components/Spinners";
import { successToast } from "../../components/Toasts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Icon } from "@iconify/react";
import Switch from "react-bootstrap/esm/Switch";
import CheckboxField from "eversign/lib/CheckboxField";

const SignIn = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [isLoading, setIsLoading] = useState(false);

  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    Signin(email, password)
      .then((resp) => {
        console.log("response : ", resp.data);
        if (resp.data === undefined || resp.data === null || resp.data === "") {
          setIsLoading(false);
          successToast("Wrong Credentials");
        } else if (resp.data.type === "Employer") {
          localStorage.setItem("email", resp.data.email);
          localStorage.setItem("AccessToken", resp.data.accessToken);
          localStorage.setItem("UserId", resp.data.userId);
          localStorage.setItem("Role", resp.data.type);
          localStorage.setItem("Home", "/myjobs");
          // localStorage.setItem("ApprovalStatus", resp.data.approvalStatus);
          setIsLoading(false);

          setTimeout(() => {
            history.push({
              pathname: "/myjobs",
            });
          }, 1000);

          // if (resp.data.approvalStatus == "pending") {
          //   history.push({
          //     pathname: "/profilecompletionform",
          //   });
          // } else if (resp.data.approvalStatus == "submitted") {
          //   history.push({
          //     pathname: "/profileunderreview",
          //   });
          // } else {
          //   history.push({
          //     pathname: "/myjobs",
          //     state: { home: "/myjobs" },
          //   });
          // }
        } else if (resp.data.type === "Employee") {
          localStorage.setItem("email", resp.data.email);
          localStorage.setItem("AccessToken", resp.data.accessToken);
          localStorage.setItem("UserId", resp.data.userId);
          localStorage.setItem("Role", resp.data.type);
          localStorage.setItem("Home", "/joblist");
          // localStorage.setItem("ApprovalStatus", resp.data.approvalStatus);
          setIsLoading(false);

          setTimeout(() => {
            history.push({
              pathname: "/joblist",
            });
          }, 1000);

          // if (resp.data.approvalStatus == "pending") {
          //   history.push({
          //     pathname: "/profilecompletionform",
          //   });
          // } else if (resp.data.approvalStatus == "submitted") {
          //   history.push({
          //     pathname: "/profileunderreview",
          //   });
          // } else {
          //   history.push({
          //     pathname: "/joblist",
          //     state: { home: "/joblist" },
          //   });
          // }
        }
        // resp.status == 200 &&
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("Error is :", error);
        successToast("Check your credentials");
      });
  };

  const [nmbOfDisplay, setNmbOfDsiplay] = useState([]);
  const [weightLBS, setWeightLBS] = useState();
  const [totalWeightLBS, setTotalWeightLBS] = useState();
  const [addedWeightLBS, setAddedWeightLBS] = useState();

  const handleAddNewRow = (e) => {
    setNmbOfDsiplay([
      ...nmbOfDisplay,
      { Input: " weight (lbs)" },
      // { Select: " Unit type" },
      // { Select: " #of Units" },
      // { Switch: " Stackable" },
      // { Dimensions: " Dimensions" },
      // { Dimensions: " Dimensions" },
      // { Dimensions: " Dimensions" },
    ]);
    // setNmbOfDsiplay(nmbOfDisplay + 1)
    // e.preventDefault();
    // window.location.reload()
    // Array.push(
    //   { title: " weight" },
    //   { title: " Exact weight" },
    //   { title: " Dimensions" },
    //   { title: " Units" }
    // );
    // console.log(Array, "ArrayArray");
  };
  const handleWeightChange = (e, weight) => {
    if (weight === "firstW") {
      setWeightLBS(e.target.value);
    } else setAddedWeightLBS(e.target.value);
    setTotalWeightLBS(weightLBS + addedWeightLBS);
  };
  return (
    <React.Fragment>
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
      <div>
        <div className="main-content">
          <div className="page-content">
            <MetaTags>
              <title>
                Sign In | Jobcy - Job Listing Template | Themesdesign
              </title>
            </MetaTags>
            <section className="bg-auth">
              <Container>
                <Row>
                  <Col lg={4}>
                    <div style={{ display: "flex" }}>
                      <div>
                        <svg
                          onClick={() => handleAddNewRow()}
                          style={{
                            width: 50,
                            cursor: "pointer",
                            marginTop: 30,
                          }}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-plus-circle-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                        </svg>
                      </div>
                      <div>
                        <label>Weight</label>
                        <br />
                        <Input
                          placeholder="Weight"
                          value={weightLBS}
                          onChange={(e) => handleWeightChange(e, "firstW")}
                        ></Input>
                      </div>
                      <div>
                        <label>unit type</label>
                        <br />
                        <Input placeholder="Unit type"></Input>
                      </div>
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div style={{ display: "flex" }}>
                      <div>
                        <label># of Units</label>
                        <br />
                        <Input placeholder="# of Units"></Input>
                      </div>
                      <div>
                        <br />
                        <br />

                        {/* <br /> */}
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckChecked"
                          // checked
                        />
                        <label class="form-check-label" for="flexCheckChecked">
                          Stackable
                        </label>
                      </div>
                    </div>
                  </Col>
                  <Col lg={4}>
                    <label>Dimensions</label>
                    <div style={{ display: "flex" }}>
                      <div>
                        <Input placeholder="Length"></Input>
                      </div>
                      <div>
                        <Input placeholder="Width"></Input>
                      </div>
                      <div>
                        <Input placeholder="Height"></Input>
                      </div>
                      {/* <br/> */}
                    </div>
                    <small>
                      <u>
                        <b>total Weight (lbs){weightLBS}</b>
                      </u>
                    </small>
                  </Col>
                </Row>
                <Row>
                  {nmbOfDisplay
                    // .filter((items) => items.Input)
                    .map((items) => (
                      <Row>
                        <Col lg={4}>
                          <div style={{ display: "flex" }}>
                            <div>
                              <svg
                                onClick={() => handleAddNewRow()}
                                style={{
                                  width: 50,
                                  cursor: "pointer",
                                  marginTop: 30,
                                }}
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-plus-circle-fill"
                                viewBox="0 0 16 16"
                              >
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                              </svg>
                            </div>
                            <div>
                              <label>Weight</label>
                              <br />
                              <Input
                                placeholder="Weight"
                                value={addedWeightLBS}
                                onChange={(e) =>
                                  handleWeightChange(e, "addedW")
                                }
                              ></Input>
                            </div>
                            <div>
                              <label>unit type</label>
                              <br />
                              <Input placeholder="Unit type"></Input>
                            </div>
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div style={{ display: "flex" }}>
                            <div>
                              <label># of Units</label>
                              <br />
                              <Input placeholder="# of Units"></Input>
                            </div>
                            <div>
                              <br />
                              <br />

                              {/* <br /> */}
                              <input
                                class="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckChecked"
                                // checked
                              />
                              <label
                                class="form-check-label"
                                for="flexCheckChecked"
                              >
                                Stackable
                              </label>
                            </div>
                          </div>
                        </Col>
                        <Col lg={4}>
                          <label>Dimensions</label>
                          <div style={{ display: "flex" }}>
                            <div>
                              <Input placeholder="Length"></Input>
                            </div>
                            <div>
                              <Input placeholder="Width"></Input>
                            </div>
                            <div>
                              <Input placeholder="Height"></Input>
                            </div>
                          </div>
                          <small>
                            <u>
                              <b>total Weight (lbs){totalWeightLBS}</b>
                            </u>
                          </small>
                        </Col>
                      </Row>
                    ))}
                </Row>
              </Container>
            </section>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignIn;
