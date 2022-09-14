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
  const [isSpinnerLoading, setIsSpinnerLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getEmployerContracts(1).then((resp) => {
      //console.log("My Contracts are : ", resp);
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
        Secondary={"My Contracts"}
        primaryLink={"/candidatelist"}
        secondaryLink={"/employeroffers"}
      />

      <div style={{ margin: "auto", width: "70%" }}>
        <h1 style={{ margin: "30px 0 30px 0", width: "70%" }}>
          Your Contracts are Listed Belows
        </h1>
      </div>
      <div style={{ margin: "auto", width: "25%", marginTop: "100px" }}>
        <TheTailSpinner isLoading={isSpinnerLoading} width={160} height={160} />
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
                          <h5>{contract.jobTitle}</h5>
                          <span>Employee : {contract.hiredBy}</span>
                        </Col>

                        <Col md={2}>
                          <h6>Type:</h6> {contract.jobType}
                        </Col>
                        <Col md={2}>
                          <h6>Hourly Rate :</h6> {contract.hourlyRate} $/h
                        </Col>
                        <Col md={3}>
                          <h6>Job Location :</h6> {contract.location}
                          {/* {contract.type} Hours : {contract.hoursperWeek} */}
                        </Col>
                        <Col md={2}>
                          <h6>Status:</h6> {contract.status}
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

export default EmployerOffers;
