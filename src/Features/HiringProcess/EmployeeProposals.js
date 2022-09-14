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
  const [isSpinnerLoadig, setIsSpinnerLoading] = useState(true);
  const [message, setMessage] = useState("");
  const history = useHistory();
  const updateStatus = (cid) => {
    updateContractStatus(cid).then((resp) => {
      if (resp.data.resultStatus == 200) {
        alert(resp.data.data);
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
      console.log("Response is :", resp);
      setIsSpinnerLoading(false);
      if (resp.status == 200) {
        if (resp.data.resultStatus == 200) {
          setMyContracts(resp.data.data);
        } else {
          setMessage(resp.data.message);
        }
      }
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
      <div style={{ margin: "auto", width: "25%", marginTop: "100px" }}>
        <TheTailSpinner isLoading={isSpinnerLoadig} width={200} height={200} />
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
                          <h5>{contract.jobTitle}</h5>
                          <span>Employer : {contract.hiredBy}</span>
                        </Col>
                        <Col md={2}>{contract.hourlyRate}$ / hour</Col>
                        <Col md={2}>Type: {contract.jobType}</Col>
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
              <h6>{message}</h6>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EmployeeProposals;
