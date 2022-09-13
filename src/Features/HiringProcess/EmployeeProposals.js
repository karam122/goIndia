import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Col, Row } from "reactstrap";
import Section from "../../components/Section";
import {
  getEmployeeContracts,
  updateContractStatus,
} from "../../apis/contract";
import { TheTailSpinner } from "../../components/Spinners";
const EmployeeProposals = () => {
  const [myContracts, setMyContracts] = useState();
  const [applicants, setApplicatns] = useState();
  const [jobs, setJobs] = useState();
  const history = useHistory();
  const updateStatus = (cid) => {
    updateContractStatus(cid).then((resp) => {
      if (resp.data == "Updated Successfully") {
        alert(resp.data);
        // window.parent.location = window.parent.location.href;
        setTimeout(() => {
          history.push("/ongoingemployeecontracts");
        }, 1000);
      } else {
        alert("Sign Contract Document");
      }
    });
  };

  useEffect(() => {
    getEmployeeContracts(1).then((resp) => {
      setMyContracts(resp.data.contracts);
      setApplicatns(resp.data.users);
      setJobs(resp.data.jobs);
      // console.log("Response is as Follow : ", resp);
    });
  }, []);
  return (
    <>
      <Section
        pageTitle={"My Offers"}
        Primary={"Home"}
        Secondary={"offers"}
        primaryLink={"/joblist"}
        secondaryLink={"/employeeproposals"}
      />
      <div style={{ margin: "auto", width: "70%" }}>
        <h1 style={{ margin: "30px 0 30px 0", width: "70%" }}>
          Your Proposals
        </h1>
      </div>

      <div style={{ margin: "20px 0 30px 0" }}>
        {myContracts ? (
          <>
            {myContracts.map((contract, key) => {
              return (
                <>
                  {/* <h1>{contract.id}</h1> */}
                  <div
                    key={key}
                    className="job-box card mt-4"
                    style={{ margin: "auto", width: "70%" }}
                  >
                    <div className="p-4">
                      <Row className="align-items-center">
                        <Col md={4}>
                          {jobs
                            ?.filter((j) => j.id == contract.jobId)
                            .map((item) => {
                              return (
                                <>
                                  <h5>{item.jobTitle}</h5>
                                  <span>
                                    {applicants
                                      ?.filter((a) => a.id == item.userId)
                                      .map((usr) => {
                                        return (
                                          <>
                                            <p>
                                              Employer :
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
                        <Col md={2}>
                          {contract.hourlyRate === 0
                            ? contract.hoursperWeek
                            : contract.hourlyRate}{" "}
                          $ / hour
                        </Col>
                        <Col md={2}>Type: {contract.type}</Col>
                        <Col md={2}>Status: {contract.status}</Col>
                        <Col md={2}>
                          {contract.status == "Completed" ? (
                            <>
                              <button
                                type="button"
                                className="btn btn-primary w-100"
                                disabled
                                onClick={() => updateStatus(contract.id)}
                              >
                                Accept
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                type="button"
                                className="btn btn-primary w-100"
                                onClick={() => updateStatus(contract.id)}
                              >
                                Accept
                              </button>
                            </>
                          )}
                        </Col>
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

export default EmployeeProposals;
