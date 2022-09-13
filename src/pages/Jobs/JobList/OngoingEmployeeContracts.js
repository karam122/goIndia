import { getOngoingEmployeeContracts } from "../../../apis/contract";
import { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import Section from "../../../components/Section";
import { TheTailSpinner } from "../../../components/Spinners";
const OnGoingEmployeeContracts = () => {
  const [myContracts, setMyContracts] = useState();
  const [applicants, setApplicatns] = useState();
  const [jobs, setJobs] = useState();
  useEffect(() => {
    getOngoingEmployeeContracts(1).then((resp) => {
      console.log("Response is : ", resp);
      setMyContracts(resp.data.contracts);
      setApplicatns(resp.data.users);
      setJobs(resp.data.jobs);
    });
  }, []);

  return (
    <>
      <Section
        pageTitle={"My Contracts"}
        Primary={"Home"}
        Secondary={"Contracts"}
        primaryLink={"/joblist"}
        secondaryLink={"/ongoingemployeecontracts"}
      />
      <div style={{ margin: "auto", width: "70%" }}>
        <h1 style={{ margin: "30px 0 30px 0", width: "70%" }}>
          Your Contracts
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

export default OnGoingEmployeeContracts;
