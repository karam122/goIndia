import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row, Nav } from "reactstrap";
import Section from "../../../components/Section";
import { getEmployeeApplications } from "../../../apis/Job";
import { TheTailSpinner } from "../../../components/Spinners";

const EmployeeJobApplications = () => {
  const [applications, setApplications] = useState();
  const [user, setUser] = useState();
  const [jobs, setJobs] = useState();
  const [isReadMore, setReadMore] = useState(true);
  useEffect(() => {
    const Id = localStorage.getItem("UserId");
    getEmployeeApplications(Id).then((resp) => {
      console.log("Employee Applications are : ", resp);
      //setUser(resp.data.user);
      setApplications(resp.data.data);
      //setJobs(resp.data.jobs);
    });
  }, []);

  const toggleReadMore = (id, proposal, isReadMore, btnid) => {
    if (isReadMore == false) {
      document.getElementById(id).innerHTML = proposal.slice(0, 50);
      document.getElementById(btnid).innerHTML = "Show more";
    }
    if (isReadMore == true) {
      document.getElementById(id).innerHTML = proposal;
      document.getElementById(btnid).innerHTML = "Show less";
    }

    setReadMore(!isReadMore);
  };

  return (
    <>
      <Section
        pageTitle={"Job Applicants"}
        Primary={"Home"}
        Secondary={"Job Applicants"}
        primaryLink={"/joblist"}
        secondaryLink={"/employeejobapplications"}
      />
      <div style={{ margin: "auto", width: "60%" }}>
        <h1 style={{ margin: "30px 0 30px 0px" }}>Your Job Applications</h1>
        {applications ? (
          <>
            {applications?.map((application, key) => {
              return (
                <>
                  <div key={key} className="job-box card mt-4 mb-4">
                    <div className="p-4">
                      <Row className="align-items-center">
                        <Col md={3}>
                          <Link
                            to={{
                              pathname: "/jobdetails",
                              // state: { jobdetail: job },
                            }}
                          >
                            <h5>{application.jobTitle}</h5>
                          </Link>
                          {/* {jobs
                            ?.filter((j) => j.id == application.jobId)
                            .map((job) => {
                              return (
                                <>
                                  <Link
                                    to={{
                                      pathname: "/jobdetails",
                                      state: { jobdetail: job },
                                    }}
                                  >
                                    <h5>{job.jobTitle}</h5>
                                  </Link>
                                </>
                              );
                            })} */}
                        </Col>
                        <Col md={2}>
                          <h5 style={{ display: "inline-block" }}>Type :</h5>
                          <span style={{ display: "inline-block" }}>
                            {application.jobType}
                          </span>
                          {/* {jobs
                            ?.filter((j) => j.id == application.jobId)
                            .map((job) => {
                              return (
                                <>
                                  <h5 style={{ display: "inline-block" }}>
                                    Type :
                                  </h5>
                                  <span style={{ display: "inline-block" }}>
                                    {job.employmentType}
                                  </span>{" "}
                                </>
                              );
                            })} */}
                        </Col>
                        <Col md={4}>
                          <h5 style={{ display: "inline-block" }}>Proposals</h5>{" "}
                          <br />
                          <span id={key}>
                            {application.proposal.slice(0, 50)}
                          </span>
                          <button
                            id={`btn${key}`}
                            style={{
                              border: "none",
                              backgroundColor: "white",
                              color: "blueviolet",
                            }}
                            onClick={() =>
                              toggleReadMore(
                                key,
                                application.proposal,
                                isReadMore,
                                `btn${key}`
                              )
                            }
                          >
                            {application.proposal.length < 50 ? (
                              <></>
                            ) : (
                              <>Show more</>
                            )}
                          </button>
                          {/* {jobs
                            ?.filter((j) => j.id == application.jobId)
                            .map((job) => {
                              return (
                                <>
                                  <h5 style={{ display: "inline-block" }}>
                                    Hourly Rate:
                                  </h5>
                                  <span style={{ display: "inline-block" }}>
                                    {job.minRate} - {job.maxRate} $/h
                                   
                                  </span>{" "}
                                </>
                              );
                            })} */}
                        </Col>
                        <Col md={3}>
                          <h5 style={{ display: "inline-block" }}>
                            Your Proposed Rate :
                          </h5>{" "}
                          <span style={{ display: "inline-block" }}>
                            {application.hourlyRate}
                          </span>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </>
              );
            })}
          </>
        ) : (
          <>
            <h3> Loading ...</h3>
            <div style={{ margin: "auto", width: "300px" }}>
              <div style={{ margin: "100px 0 100px 0" }}>
                <TheTailSpinner isLoading={true} width={100} heigth={100} />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default EmployeeJobApplications;
