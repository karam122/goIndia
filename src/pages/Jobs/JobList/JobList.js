import React from "react";
import { useHistory } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { Modal, ModalBody, Input, Label } from "reactstrap";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import Section from "../../../components/Section";
import JobSearchOptions from "./JobSearchOptions";
import JobVacancyList from "./JobVacancyList";
import Popular from "./Popular";
import Sidebar from "./Sidebar";

//jobImages
import jobImage1 from "../../../assets/images/featured-job/img-01.png";
import { getJobs, ApplyForJob } from "../../../apis/Job";
import { getCurrentUserData } from "../../../apis/User";
import { TheTailSpinner } from "../../../components/Spinners";
import { successToast } from "../../../components/Toasts";
import { ToastContainer } from "react-toastify";
import Pagination from "../../../Features/Components/Pagination";
import "react-toastify/dist/ReactToastify.css";

const JobList = (props) => {
  return (
    <React.Fragment>
      <MetaTags>
        <title>Job List | Jobcy - Job Listing Template | Themesdesign</title>
      </MetaTags>
      <Section
        pageTitle={"Job List"}
        Primary={"Home"}
        primaryLink={"/joblist"}
      />
      <section className="section">
        <Container>
          <Row>
            <Col lg={9}>
              <div className="me-lg-5">
                <JobSearchOptions />
                <Popular />
                <Jobs />
              </div>
            </Col>
            <Sidebar />
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

const Jobs = (props) => {
  //Apply Now Model
  const [modal, setModal] = useState(false);
  const openModal = () => setModal(!modal);
  // Modal Fields
  const [proposal, setProposal] = useState("");
  const [hourlyRate, setHourlyRate] = useState(0);
  const [jobs, setJobs] = useState();
  const [haveJobs, setHaveJobs] = useState(false);
  const [isSpinnerLoadig, setIsSpinnerLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [pageNo, setPageNo] = useState(1);
  const [jobid, setJobId] = useState();
  const [user, setUser] = useState();

  const Id = localStorage.getItem("UserId");

  useEffect(() => {
    getCurrentUserData(Id).then((resp) => {
      console.log("Current User is : ", resp.data);
      setUser(resp.data);
    });
    getJobs(pageNo).then((resp) => {
      console.log("Got Response", resp);
      if (resp.data.resultStatus == 200) {
        setIsSpinnerLoading(false);
        setHaveJobs(true);
        setJobs(resp.data.data);
        setTotalPages(resp.data.totalPages);
      } else {
        setIsSpinnerLoading(false);
        setMessage(resp.data.message);
        //alert(resp.data.message);
      }
    });
  }, []);

  useEffect(() => {
    if (localStorage.getItem("ApprovalStatus") != "approved") {
      if (localStorage.getItem("ApprovalStatus") == "pending") {
        history.push("/profilecompletionform");
      } else if (localStorage.getItem("ApprovalStatus") == "submitted") {
        history.push("/profileunderreview");
      }
    }
  });
  let history = useHistory();

  const handleApplication = () => {
    ApplyForJob(jobid, hourlyRate, proposal)
      .then((resp) => {
        if (resp.status == 200) {
          successToast(resp.data);
          setTimeout(() => {
            setModal(false);
            history.push("/joblist");
          }, 1500);
        }
        if (resp.status == 201) {
          successToast(resp.data);
          setTimeout(() => {
            setModal(false);
            history.push("/joblist");
          }, 1500);
        }
      })
      .catch((error) => {
        successToast("an Error Occured during Applying");
        console.log("Error is :", error);
      });
  };

  const setModalandApply = (id) => {
    openModal();
    setJobId(id);
  };

  return (
    <>
      <div style={{ position: "relative", right: "10px" }}>
        <Link
          to={{ pathname: "/employeeproposals" }}
          className="btn btn-primary"
          style={{ position: "absolute", right: "10px" }}
        >
          Proposals Sent to me
        </Link>
        <br />
        <br />
      </div>
      <div style={{ margin: "auto", width: "25%", marginTop: "100px" }}>
        <TheTailSpinner isLoading={isSpinnerLoadig} width={200} height={200} />
      </div>
      {haveJobs ? (
        <>
          <div>
            <div>
              {jobs?.map((job, key) => (
                <div key={key} className="job-box card mt-4">
                  <div className="p-4">
                    <Row className="align-items-center">
                      {/* <Col md={2}>
              <div className="text-center mb-4 mb-md-0">
                <Link to="/company-details">
                  <img
                    src={jobImage1}
                    alt=""
                    className="img-fluid rounded-3"
                  />
                </Link>
              </div>
            </Col> */}

                      <Col md={3}>
                        <div className="mb-2 mb-md-0">
                          <h5 className="fs-18 mb-1">
                            <Link
                              to={{
                                pathname: "/jobdetails",
                                state: { jobdetail: job },
                              }}
                              className="text-dark"
                            >
                              {job.jobTitle}
                            </Link>
                          </h5>
                          {/* <p className="text-muted fs-14 mb-0">Img</p> */}
                        </div>
                      </Col>

                      <Col md={3}>
                        <div className="d-flex mb-2">
                          <div className="flex-shrink-0">
                            <i className="mdi mdi-map-marker text-primary me-1"></i>
                          </div>
                          <p className="text-muted mb-0">{job.location}</p>
                        </div>
                      </Col>
                      <Col md={3}>
                        <div>
                          <p className="text-muted mb-2">
                            <span className="text-primary">$</span>
                            {job.minRate}-{job.maxRate}/ hours
                          </p>
                        </div>
                      </Col>
                      <Col md={3}>
                        <div>
                          <Link
                            to="#"
                            onClick={() => setModalandApply(job.id)} // className="primary-link"
                            className="btn btn-primary"
                          >
                            <a>Apply</a>
                            <i className="mdi mdi-chevron-double-right"></i>
                          </Link>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          {" "}
          <div style={{ margin: "auto", width: "300px" }}>
            <div style={{ margin: "100px 0 100px 0" }}>
              {/* <TheTailSpinner
                isLoading={isSpinnerLoadig}
                width={100}
                heigth={100}
              /> */}
              <h5>{message}</h5>
            </div>
          </div>
        </>
      )}
      <Pagination
        totalPages={totalPages}
        setJobs={setJobs}
        setIsSpinnerLoading={setIsSpinnerLoading}
        setHaveJobs={setHaveJobs}
        setMessage={setMessage}
      />
      {/* {totalPages ? (
        <>
          <Pagination totalPages={totalPages} />;
        </>
      ) : (
        <></>
      )} */}
      <MyModal
        modal={modal}
        openModal={openModal}
        setProposal={setProposal}
        setHourlyRate={setHourlyRate}
        handleApplication={handleApplication}
        proposal={proposal}
      />
    </>
  );
};

const MyModal = ({
  modal,
  openModal,
  setProposal,
  setHourlyRate,
  handleApplication,
  proposal,
  hourlyRate,
}) => {
  return (
    <>
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
      <div
        className="modal fade"
        id="applyNow"
        tabIndex="-1"
        aria-labelledby="applyNow"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <Modal isOpen={modal} toggle={openModal} centered>
            <ModalBody className="modal-body p-5">
              <div className="text-center mb-4">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Apply For This Job
                </h5>
              </div>
              <div className="position-absolute end-0 top-0 p-3">
                <button
                  type="button"
                  onClick={openModal}
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="mb-3">
                <Label for="messageControlTextarea" className="form-label">
                  Hourly Rate
                </Label>
                <Input
                  type="number"
                  name="hourlyRate"
                  value={hourlyRate}
                  onChange={(e) => {
                    setHourlyRate(e.target.value);
                  }}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <Label for="messageControlTextarea" className="form-label">
                  Write Proposal
                </Label>
                <textarea
                  className="form-control"
                  id="messageControlTextarea"
                  rows="10"
                  value={proposal}
                  onChange={(e) => setProposal(e.target.value)}
                  placeholder="Write your proposal here"
                ></textarea>
              </div>
              {proposal == "" || hourlyRate == 0 ? (
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled
                  onClick={handleApplication}
                >
                  Send Application
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  onClick={handleApplication}
                >
                  Send Application
                </button>
              )}
            </ModalBody>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default JobList;
