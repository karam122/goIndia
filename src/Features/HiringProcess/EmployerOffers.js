import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row, Nav } from "reactstrap";
import Section from "../../components/Section";
import { getMyContracts } from "../../apis/contract";
import { TheTailSpinner } from "../../components/Spinners";
import { getContractUser } from "../../apis/User";
import axios from "axios";
import { getEmployerContracts } from "../../apis/contract";

const EmployerOffers = () => {
  const [myContracts, setMyContracts] = useState();
  const [applicants, setApplicatns] = useState();
  const [jobs, setJobs] = useState();

  useEffect(() => {
    getEmployerContracts(1).then((resp) => {
      console.log("My Contracts are : ", resp);
      setMyContracts(resp.data.contracts);
      setApplicatns(resp.data.users);
      setJobs(resp.data.jobs);
    });
  }, []);

  return (
    <>
      <Section
        pageTitle={"My Offers"}
        Primary={"Home"}
        Secondary={"My Contracts"}
        primaryLink={"/candidatelist"}
        secondaryLink={"/employeroffers"}
      />

      <div style={{ margin: "auto", width: "70%" }}>
        <h1 style={{ margin: "30px 0 30px 0", width: "70%" }}>
          Your Contracts are Listed Belows
        </h1>
      </div>

      <div style={{ margin: "20px 0 30px 0" }}>
        {myContracts ? (
          <>
            {myContracts?.map((contract, key) => {
              return (
                <>
                  <div
                    key={key}
                    className="job-box card mt-4"
                    style={{ margin: "auto", width: "70%" }}
                  >
                    <div className="p-4">
                      <Row className="align-items-center">
                        {/* <Col md={2}>
                      {applicants
                        ?.filter((a) => a.id == contract.employeeId)
                        .map((item) => {
                          return (
                            <>
                              <img
                                src={item.profileImage}
                                width="80px"
                                height="80px"
                              />
                            </>
                          );
                        })}
                    </Col> */}

                        <Col md={3}>
                          {jobs
                            ?.filter((j) => j.id == contract.jobId)
                            .map((item) => {
                              return (
                                <>
                                  <h5>{item.jobTitle}</h5>
                                  <span>
                                    {applicants
                                      ?.filter(
                                        (a) => a.id == contract.employeeId
                                      )
                                      .map((usr) => {
                                        return (
                                          <>
                                            <p>
                                              Applicant :{" "}
                                              <Link
                                                to={{
                                                  pathname: "/candidatedetails",
                                                  state: { details: usr },
                                                }}
                                              >
                                                {usr.firstName} {usr.lastName}
                                              </Link>
                                            </p>
                                          </>
                                        );
                                      })}
                                  </span>
                                </>
                              );
                            })}
                        </Col>

                        <Col md={2}>Type: {contract.type}</Col>
                        <Col md={2}>
                          Hourly Rate : {contract.hourlyRate} $/h
                        </Col>
                        <Col md={3}>
                          {" "}
                          {contract.type} Hours : {contract.hoursperWeek}
                        </Col>
                        <Col md={2}>Status: {contract.status}</Col>
                      </Row>
                    </div>
                  </div>
                </>
              );
            })}
          </>
        ) : (
          <div style={{ margin: "auto", width: "300px" }}>
            <div style={{ margin: "100px 0 100px 0" }}>
              <TheTailSpinner isLoading={true} width={100} heigth={100} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EmployerOffers;
