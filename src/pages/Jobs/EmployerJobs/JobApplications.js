import React from "react";
import { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { getApplicantsForAJob } from "../../../apis/Job";
import { Link } from "react-router-dom";
import { Col, Container, Row, Nav } from "reactstrap";
import Section from "../../../components/Section";
import { TheTailSpinner } from "../../../components/Spinners";

const JobApplications = () => {
  const location = useLocation();
  const jobId = location.state.jobId;
  const [applications, setApplications] = useState();
  const [users, setUsers] = useState();
  const [jobs, setJobs] = useState();
  const [isReadMore, setReadMore] = useState(true);
  useEffect(() => {
    getApplicantsForAJob(jobId).then((resp) => {
      console.log("Response is  : ", resp);
      console.log("Applications are  : ", resp.data.aplications);
      console.log("Users are  : ", resp.data.users);
      setApplications(resp.data.aplications);
      setUsers(resp.data.users);
      setJobs(resp.data.jobs);
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
        Secondary={"My Jobs"}
        Tertiary={"Job Applicants"}
        primaryLink={"/candidatelist"}
        secondaryLink={"/joblist"}
      />
      <div style={{ margin: "auto", width: "60%" }}>
        <h1 style={{ margin: "30px 0 30px -80px" }}> Job Applications</h1>
      </div>
      {applications ? (
        <>
          <div style={{ margin: "auto", width: "70%" }}>
            {applications?.map((application, key) => {
              return (
                <>
                  <div key={key} className="job-box card mt-4">
                    <div className="p-4">
                      <Row className="align-items-center">
                        <Col md={4}>
                          {users
                            ?.filter((u) => u.id == application.userId)
                            .map((user) => {
                              return (
                                <>
                                  {jobs
                                    ?.filter((j) => j.id == application.jobId)
                                    .map((job) => {
                                      return (
                                        <>
                                          <h5>{job.jobTitle}</h5>
                                          <span>
                                            {users
                                              ?.filter(
                                                (u) =>
                                                  u.id == application.userId
                                              )
                                              .map((user) => {
                                                return (
                                                  <>
                                                    <p>
                                                      Applicant :{" "}
                                                      <Link
                                                        to={{
                                                          pathname:
                                                            "/candidatedetails",
                                                          state: {
                                                            details: user,
                                                          },
                                                        }}
                                                      >
                                                        {user.firstName}{" "}
                                                        {user.lastName}
                                                      </Link>
                                                    </p>
                                                  </>
                                                );
                                              })}
                                          </span>
                                        </>
                                      );
                                    })}
                                </>
                              );
                            })}
                        </Col>

                        <Col md={1}>{application.hourlyRate}$ /hours</Col>
                        <Col md={5}>
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
                            Show more
                          </button>
                        </Col>
                        <Col md={2}>
                          <Link
                            className="btn btn-primary w-100"
                            to={{
                              pathname: "/hiringpage",
                              state: {
                                applicationdetails: application,
                                userdetails: users?.filter(
                                  (u) => u.id == application.userId
                                ),
                                jobdetails: jobs?.filter(
                                  (j) => j.id == application.jobId
                                ),
                              },
                            }}
                          >
                            Hire Me
                          </Link>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <div style={{ margin: "auto", width: "300px" }}>
            <div style={{ margin: "100px 0 100px 0" }}>
              <TheTailSpinner isLoading={true} width={100} heigth={100} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default JobApplications;
