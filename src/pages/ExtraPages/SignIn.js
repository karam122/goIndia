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
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { Signin } from "../../apis/User";
import { TheTailSpinner } from "../../components/Spinners";
import { successToast } from "../../components/Toasts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
          // resp.status == 200 &&
          console.log("Employer Called");
          localStorage.setItem("email", resp.data.email);
          localStorage.setItem("password", resp.data.password);
          localStorage.setItem("UserId", resp.data.id);
          localStorage.setItem("Role", resp.data.type);
          localStorage.setItem("Home", "/myjobs");
          localStorage.setItem("ApprovalStatus", resp.data.approvalStatus);
          setIsLoading(false);

          if (resp.data.approvalStatus == "pending") {
            history.push({
              pathname: "/profilecompletionform",
            });
          } else if (resp.data.approvalStatus == "submitted") {
            history.push({
              pathname: "/profileunderreview",
            });
          } else {
            history.push({
              pathname: "/myjobs",
              state: { home: "/myjobs" },
            });
          }
        } else if (resp.data.type === "Employee") {
          console.log("Employee Called");
          localStorage.setItem("email", resp.data.email);
          localStorage.setItem("password", resp.data.password);
          localStorage.setItem("UserId", resp.data.id);
          localStorage.setItem("Role", resp.data.type);
          localStorage.setItem("Home", "/joblist");
          localStorage.setItem("ApprovalStatus", resp.data.approvalStatus);
          setIsLoading(false);

          if (resp.data.approvalStatus == "pending") {
            history.push({
              pathname: "/profilecompletionform",
            });
          } else if (resp.data.approvalStatus == "submitted") {
            history.push({
              pathname: "/profileunderreview",
            });
          } else {
            history.push({
              pathname: "/joblist",
              state: { home: "/joblist" },
            });
          }
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("Error is :", error);
        successToast("Check your credentials");
      });
  };

  // useEffect(() => {
  //   var username = localStorage.getItem("email");
  //   var password = localStorage.getItem("password");
  //   if (username != null) {
  //     window.location.href = "/joblist"; // Assign your url to location href
  //   }
  // });

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
                                <h5>Welcome Back !</h5>
                                <p className="text-white-70">
                                  Sign in to continue to Jobcy.
                                </p>
                              </div>
                              <Form className="auth-form">
                                <div className="mb-3">
                                  <label
                                    htmlFor="usernameInput"
                                    className="form-label"
                                  >
                                    Username
                                  </label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="usernameInput"
                                    placeholder="Enter your username"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                  />
                                </div>
                                <div className="mb-3">
                                  <label
                                    htmlFor="passwordInput"
                                    className="form-label"
                                  >
                                    Password
                                  </label>
                                  <Input
                                    type="password"
                                    className="form-control"
                                    id="passwordInput"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) =>
                                      setPassword(e.target.value)
                                    }
                                    required
                                  />
                                </div>
                                <div className="mb-4">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id="flexCheckDefault"
                                    />
                                    <Link
                                      to="/resetpassword"
                                      className="float-end text-white"
                                    >
                                      Forgot Password?
                                    </Link>
                                    <label
                                      className="form-check-label"
                                      htmlFor="flexCheckDefault"
                                    >
                                      Remember me
                                    </label>
                                  </div>
                                </div>
                                <div className="text-center">
                                  <button
                                    type="submit"
                                    className="btn btn-white btn-hover w-100"
                                    onClick={handleSubmit}
                                  >
                                    <div>
                                      <span style={{ display: "inline-block" }}>
                                        Sign In
                                      </span>
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
                                        />
                                      </span>
                                    </div>
                                  </button>
                                </div>
                              </Form>
                              <div className="mt-4 text-center">
                                <p className="mb-0">
                                  Don't have an account ?
                                  <Link
                                    to="/signup"
                                    className="fw-medium text-white text-decoration-underline"
                                  >
                                    Sign Up
                                  </Link>
                                </p>
                              </div>
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

export default SignIn;
