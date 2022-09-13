import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Card,
  Col,
  Input,
  Row,
  CardBody,
  Label,
  FormGroup,
} from "reactstrap";
import MetaTags from "react-meta-tags";

import lightLogo from "../../assets/images/logo-light.png";
import darkLogo from "../../assets/images/logo-dark.png";
import signUpImage from "../../assets/images/auth/sign-up.png";
import { Form } from "react-bootstrap";

import { useState } from "react";
import { useHistory } from "react-router-dom";
import { base_url } from "../../apis/constants";
import { CreateNewUser } from "../../apis/User";
import { TheTailSpinner } from "../../components/Spinners";
import { successToast } from "../../components/Toasts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  const [responseMessage, setResponseMessge] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const user_post_url = `https://goindia.azurewebsites.net/api/User`;

  const history = useHistory();

  const SignupUser = () => {
    setIsLoading(true);
    CreateNewUser(email, password, type, 2)
      .then((resp) => {
        setResponseMessge(resp.data);
        if (resp.status == 200) {
          successToast(resp.data);
          setTimeout(() => {
            history.push("/confirmation");
          }, 2000);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        successToast("An error occured, Try Again");
      });
  };
  return (
    <React.Fragment>
      <div>
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
        <div className="main-content">
          <div className="page-content">
            <MetaTags>
              <title>
                Sign Up | Jobcy - Job Listing Templates | Themesdesign
              </title>
            </MetaTags>
            <section className="bg-auth">
              <Container>
                <Row className="justify-content-center">
                  <Col xl={10} lg={12}>
                    <Card className="auth-box">
                      <Row className="align-items-center">
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
                                src={signUpImage}
                                alt=""
                                className="img-fluid"
                              />
                            </div>
                          </CardBody>
                        </Col>
                        <Col lg={6}>
                          <CardBody className="auth-content p-5 text-white">
                            <div className="w-100">
                              <div className="text-center">
                                <h5>Let's Get Starteds</h5>
                                <p className="text-white-70">
                                  Sign Up and get access to all the features of
                                  Jobcy
                                </p>
                              </div>
                              {/* action="/" */}
                              <Form className="auth-form">
                                <div className="mb-3">
                                  <label htmlFor="email" className="form-label">
                                    Email
                                  </label>
                                  <Input
                                    type="email"
                                    className="form-control"
                                    required
                                    id="emailInput"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                  />
                                </div>
                                <div className="mb-3">
                                  <label
                                    htmlFor="emailInput"
                                    className="form-label"
                                  >
                                    Password
                                  </label>
                                  <Input
                                    type="password"
                                    className="form-control"
                                    id="passwordInput"
                                    required
                                    value={password}
                                    onChange={(e) =>
                                      setPassword(e.target.value)
                                    }
                                    placeholder="Enter your password"
                                  />
                                </div>
                                <div>
                                  <Label for="exampleSelect">Select</Label>
                                  <Input
                                    type="select"
                                    name="type"
                                    id="exampleSelect"
                                    required
                                    defaultValue={type}
                                    onChange={(e) => setType(e.target.value)}
                                  >
                                    <option>Select a Role</option>
                                    <option value="Employer">Employer</option>
                                    <option value="Employee">Employee</option>
                                  </Input>
                                </div>
                                <div className="mb-4">
                                  <div className="form-check">
                                    <Input
                                      className="form-check-input"
                                      type="checkbox"
                                      id="flexCheckDefault"
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="flexCheckDefault"
                                    >
                                      I agree to the
                                      <Link
                                        to="#"
                                        className="text-white text-decoration-underline"
                                      >
                                        Terms and conditions
                                      </Link>
                                    </label>
                                  </div>
                                </div>
                                <div className="text-center">
                                  {email == "" ||
                                  password == "" ||
                                  type == "" ? (
                                    <button
                                      type="submit"
                                      disabled
                                      onClick={SignupUser}
                                      className="btn btn-white btn-hover w-100"
                                    >
                                      SignUp
                                    </button>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={SignupUser}
                                      className="btn btn-white btn-hover w-100"
                                    >
                                      <span>Sign up</span>
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
                                          color="white"
                                        />
                                      </span>
                                    </button>
                                  )}
                                </div>
                              </Form>
                              <div className="mt-3 text-center">
                                <p className="mb-0">
                                  Already a member ?
                                  <Link
                                    to="/signin"
                                    className="fw-medium text-white text-decoration-underline"
                                  >
                                    <span>Sign In</span>
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

export default SignUp;
