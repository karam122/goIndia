import React from "react";
import { useHistory, useLocation } from "react-router-dom";
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
import axios from "axios";
import { getMyJobs, ApplyForJob } from "../../../apis/Job";
import { TheTailSpinner } from "../../../components/Spinners";

const JobList = (props) => {
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("ApprovalStatus") != "approved") {
      if (localStorage.getItem("ApprovalStatus") == "pending") {
        history.push("/profilecompletionform");
      } else if (localStorage.getItem("ApprovalStatus") == "submitted") {
        history.push("/profileunderreview");
      }
    }
  });
  return (
    <React.Fragment>
      <MetaTags>
        <title>Job List | Jobcy - Job Listing Template | Themesdesign</title>
      </MetaTags>
      <Section
        pageTitle={"My Jobs"}
        Primary={"Home"}
        Secondary={"My Jobs"}
        // Tertiary={"My Jobs"}
        primaryLink={"/candidatelist"}
        secondaryLink={"/myjobs"}
      />
      <section className="section">
        <Container>
          <Row>
            <Col lg={9}>
              <div className="me-lg-5">
                {/* <JobSearchOptions />
                <Popular /> */}
                <Jobs />
                {/* <JobVacancyList /> */}
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
  const [proposal, setProposal] = useState();
  const [myJobs, setMyJobs] = useState();
  const [isSpinnerLoadig, setIsSpinnerLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [jobid, setJobId] = useState();

  useEffect(() => {
    const id = localStorage.getItem("UserId");
    getMyJobs(id).then((resp) => {
      setIsSpinnerLoading(false);
      if (resp.status == 200) {
        if (resp.data.resultStatus == 200) {
          setMyJobs(resp.data.data);
        } else {
          setMessage(resp.data.message);
        }
      }
    });
  }, []);
  let history = useHistory();

  return (
    <>
      <div style={{ margin: "auto", width: "25%", marginTop: "100px" }}>
        {/* <h5 className="mb-5">Loading ...</h5> */}
        <TheTailSpinner isLoading={isSpinnerLoadig} width={160} height={160} />
      </div>
      {myJobs ? (
        <div>
          <div>
            {myJobs.length === 0 ? (
              <>
                <div>
                  <h1>You Have not posted any Job yet.</h1>
                  <h5 style={{ marginTop: "30px" }}>
                    Click here to post a job
                    <Link
                      to="/jobform"
                      className="btn btn-primary w-25"
                      style={{ marginLeft: "30px" }}
                    >
                      <i className="uil uil-plus"></i> Post a Job
                    </Link>
                  </h5>
                </div>
              </>
            ) : (
              <>
                {myJobs?.map((job, key) => (
                  <div key={key} className="job-box card mt-4">
                    <div className="p-4">
                      <Row className="align-items-center">
                        {/* <Col md={2}>
                    <div className="text-center mb-4 mb-md-0">
                      <Link to="/company-details">
                        <h4>{job.jobTitle}</h4>
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
                            {job.jobHours === 0 ? (
                              <>
                                From {job.dateFrom.slice(0, 10)} To{" "}
                                {job.dateTo.slice(0, 10)}
                              </>
                            ) : (
                              <>
                                <p className="text-muted fs-14 mb-0">
                                  {job.jobHours} hours per week
                                </p>
                              </>
                            )}
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
                              {job.minRate}-{job.maxRate}/ hour
                            </p>
                          </div>
                        </Col>
                        <Col md={3}>
                          <div>
                            <Link
                              to={{
                                pathname: "/jobapplications",
                                state: { jobId: job.id },
                              }}
                              // // onClick={() => setModalandApply(job.id)} // className="primary-link"
                              className="btn btn-primary"
                            >
                              <a>Applications</a>
                              <i className="mdi mdi-chevron-double-right"></i>
                            </Link>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      ) : (
        <>
          <h1>Loading ...</h1>
          <div style={{ margin: "auto", width: "300px" }}>
            <h5>{message}</h5>
          </div>
        </>
      )}
    </>
  );
};

export default JobList;
