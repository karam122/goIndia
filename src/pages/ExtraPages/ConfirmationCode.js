import React from "react";
import {
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
import { Link, useHistory, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Confirmation } from "../../apis/User";
import { TheTailSpinner } from "../../components/Spinners";
import { successToast } from "../../components/Toasts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ConfirmationCode = () => {
  const [confirmation, setConfirmation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    Confirmation(confirmation).then((resp) => {
      console.log("resp of confirmation is : ", resp);
      if (confirmation === "") {
        successToast("Please enter 6 digit Code");
      } else if (resp.data === true) {
        successToast("User is verified");
        setTimeout(() => {
          history.push("/signin");
        }, 2000);
      } else if (resp.data === false) {
        successToast("Enter Correct OTP");
      }
      //     if (resp.data === undefined || resp.data === null || resp.data === "") {
      //       setIsLoading(false);
      //       successToast("Wrong Credentials");
      //     }
      //       history.push({
      //         pathname: "/myjobs",
      //         state: { home: "/myjobs" },
      //       });
      //     } else if (resp.data.type === "Employee") {
      //       console.log("Employee Called");
      //       localStorage.setItem("email", resp.data.email);
      //       localStorage.setItem("password", resp.data.password);
      //       localStorage.setItem("UserId", resp.data.id);
      //       localStorage.setItem("Role", resp.data.type);
      //       localStorage.setItem("Home", "/joblist");
      //       setIsLoading(false);
      //       history.push({
      //         pathname: "/joblist",
      //         state: { home: "/joblist" },
      //       });
      //     }
      //   })
      //   .catch((error) => {
      //     setIsLoading(false);
      //     console.log("Error is :", error);
      //     successToast("Check your credentials");
    });
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
              <title>Enter Confirmation Code</title>
            </MetaTags>
            <section className="bg-auth">
              <Container>
                <Row className="justify-content-center">
                  <Col xl={10} lg={12}>
                    <Card className="auth-box">
                      <Row className="g-0">
                        <Col lg={6} className="text-center">
                          <CardBody className="p-4">
                            <Link to="/">
                              <img
                                src={lightLogo}
                                alt=""
                                className="logo-light"
                              />
                              <img
                                src={darkLogo}
                                alt=""
                                className="logo-dark"
                              />
                            </Link>
                            <div className="mt-5">
                              <img
                                src={signInImage}
                                alt=""
                                className="img-fluid"
                              />
                            </div>
                          </CardBody>
                        </Col>
                        <Col lg={6}>
                          <CardBody className="auth-content p-5 h-100 text-white">
                            <div className="w-100">
                              <div className="text-center mb-4">
                                <h5>Enter Confirmation Code !</h5>
                                <p className="text-white-70">
                                  Sign in to continue to Jobcy.
                                </p>
                              </div>
                              <Form className="auth-form">
                                <div className="mb-3">
                                  <label
                                    htmlFor="confirmationInput"
                                    className="form-label"
                                  >
                                    ConfirmationCode
                                  </label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="confirmationInput"
                                    placeholder="Confirmation Code"
                                    value={confirmation}
                                    onChange={(e) =>
                                      setConfirmation(e.target.value)
                                    }
                                    required
                                  />
                                </div>

                                <div className="text-center">
                                  <button
                                    // type="submit"
                                    className="btn btn-white btn-hover w-100"
                                    onClick={(e) => {
                                      handleSubmit(e);
                                    }}
                                  >
                                    <div>
                                      <span style={{ display: "inline-block" }}>
                                        Submit
                                      </span>
                                      <span
                                        style={{
                                          display: "inline-block",
                                          marginLeft: "50px",
                                        }}
                                      ></span>
                                    </div>
                                  </button>
                                </div>
                              </Form>
                            </div>
                          </CardBody>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </section>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ConfirmationCode;
