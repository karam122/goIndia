import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CardBody, Col, Row } from "reactstrap";

//Import images
import userImage1 from "../../../assets/images/user/img-01.jpg";

import { base_url } from "../../../apis/constants";
import { TheTailSpinner } from "../../../components/Spinners";
import { getEmployees } from "../../../apis/User";

const CandidateDetails = () => {
  const [employees, setEmployees] = useState();
  useEffect(async () => {
    getEmployees().then((resp) => {
      setEmployees(resp.data);
    });
  });

  return (
    <React.Fragment>
      <Row className="align-items-center">
        <Col lg={8}>
          <div className="mb-3 mb-lg-0">
            <h6 className="fs-16 mb-0"> Showing 1 – 8 of 11 results </h6>
          </div>
        </Col>

        <Col lg={4}>
          <div className="candidate-list-widgets">
            <Row>
              <Col lg={6}>
                <div className="selection-widget">
                  <select
                    className="form-select"
                    data-trigger
                    name="choices-single-filter-orderby"
                    id="choices-single-filter-orderby"
                    aria-label="Default select example"
                  >
                    <option value="df">Default</option>
                    <option value="ne">Newest</option>
                    <option value="od">Oldest</option>
                    <option value="rd">Random</option>
                  </select>
                </div>
              </Col>
              <Col lg={6}>
                <div className="selection-widget mt-2 mt-lg-0">
                  <select
                    className="form-select"
                    data-trigger
                    name="choices-candidate-page"
                    id="choices-candidate-page"
                    aria-label="Default select example"
                  >
                    <option value="df">All</option>
                    <option value="ne">8 per Page</option>
                    <option value="ne">12 per Page</option>
                  </select>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      {employees ? (
        <div className="candidate-list">
          {employees?.map((candidateDetailsNew, key) => (
            <div
              key={key}
              className={
                "candidate-list-box bookmark-post card mt-4"
                //   candidateDetailsNew.addclassNameBookmark === true
                // ? "candidate-list-box bookmark-post card mt-4"
                // : "candidate-list-box card mt-4"
              }
            >
              <CardBody className="p-4">
                <Row className="align-items-center">
                  <div className="col-auto">
                    <div className="candidate-list-images">
                      <Link to="#">
                        <img
                          // src={candidateDetailsNew.userImg}
                          src={userImage1}
                          alt=""
                          className="avatar-md img-thumbnail rounded-circle"
                        />
                      </Link>
                    </div>
                  </div>
                  <Col lg={5}>
                    <div className="candidate-list-content mt-3 mt-lg-0">
                      <h5 className="fs-19 mb-0">
                        <Link
                          to={{
                            pathname: "/candidatedetails",
                            state: { details: candidateDetailsNew },
                          }}
                          className="primary-link"
                        >
                          {candidateDetailsNew.firstName}{" "}
                          {candidateDetailsNew.lastName}
                        </Link>

                        {/* <span className={candidateDetailsNew.ratingClass}> */}
                        <span className="badge bg-success ms-1">
                          <i className="mdi mdi-star align-middle"></i>
                          {/* {candidateDetailsNew.rating} */}
                          "4.8"
                        </span>
                      </h5>
                      <p className="text-muted mb-2">
                        {" "}
                        {/* {candidateDetailsNew.candidateDesignation} */}
                        {candidateDetailsNew.profession}
                      </p>
                      <ul className="list-inline mb-0 text-muted">
                        <li className="list-inline-item">
                          <i className="mdi mdi-map-marker"></i>{" "}
                          {/* {candidateDetailsNew.location} */}
                          {`${candidateDetailsNew.city} , ${candidateDetailsNew.country}`}
                        </li>
                        <li className="list-inline-item">
                          <i className="uil uil-wallet"></i>{" "}
                          {/* {candidateDetailsNew.salary} */}
                          12 usd- 15usd
                        </li>
                      </ul>
                    </div>
                  </Col>

                  <Col lg={4}>
                    <div className="mt-2 mt-lg-0 d-flex flex-wrap align-items-start gap-1">
                      {(candidateDetailsNew.skills?.split(",") || []).map(
                        //   (badgesInner, key) => (
                        (skill, key) => (
                          <span
                            className="badge bg-soft-secondary fs-14 mt-1"
                            key={key}
                          >
                            {/* {badgesInner.badgeName} */}
                            {skill}
                          </span>
                        )
                      )}
                    </div>
                  </Col>
                </Row>
                <div className="favorite-icon">
                  <Link to="#">
                    <i className="uil uil-heart-alt fs-18"></i>
                  </Link>
                </div>
              </CardBody>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ margin: "auto", width: "300px" }}>
          <TheTailSpinner isLoading={true} width={100} heigth={100} />
        </div>
      )}
    </React.Fragment>
  );
};

export default CandidateDetails;
