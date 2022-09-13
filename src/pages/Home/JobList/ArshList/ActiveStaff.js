import React from "react";
import { Link } from "react-router-dom";
import { CardBody, Col, Row } from "reactstrap";

import { useState, useEffect } from "react";
import axios from "axios";

//Import images
import userImage1 from "../../../../assets/images/user/img-01.jpg";
import userImage2 from "../../../../assets/images/user/img-02.jpg";
import userImage3 from "../../../../assets/images/user/img-03.jpg";
import userImage4 from "../../../../assets/images/user/img-04.jpg";
import userImage5 from "../../../../assets/images/user/img-05.jpg";
import userImage6 from "../../../../assets/images/user/img-06.jpg";
import userImage7 from "../../../../assets/images/user/img-07.jpg";
import userImage8 from "../../../../assets/images/user/img-08.jpg";

const ActiveStaff = () => {
  // Fetch Staff
  const user_url = "https://goindia.azurewebsites.net/api/User";
  const [persons, setPersons] = useState();
  useEffect(() => {
    axios({
      method: "get",
      url: user_url,
    }).then((r) => setPersons(r.data));
  }, []);

  return (
    <React.Fragment>
      <Staff2 persons={persons} />
    </React.Fragment>
  );
};

const Staff2 = (props) => {
  return (
    <>
      <hi>I am Person List</hi>

      <Row className="align-items-center">
        <div className="candidate-list">
          {props.persons?.map((person, key) => (
            <div key={key} className={"candidate-list-box card mt-4"}>
              <CardBody className="p-4">
                <Row className="align-items-center">
                  <div className="col-auto">
                    <div className="candidate-list-images">
                      <Link to="#">
                        <img
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
                        <Link to="/candidatedetails" className="primary-link">
                          {person.Name}
                        </Link>

                        <span className={"none"}>
                          <i className="mdi mdi-star align-middle"></i>
                          {"  5"}
                        </span>
                      </h5>
                      <p className="text-muted mb-2">{person.Profession}</p>
                      <ul className="list-inline mb-0 text-muted">
                        <li className="list-inline-item">
                          <i className="mdi mdi-map-marker"></i> {"Karachi"}
                        </li>
                        <li className="list-inline-item">
                          <i className="uil uil-wallet"></i> {"1100"}
                        </li>
                      </ul>
                    </div>
                  </Col>
                  <Col lg={5}>
                    <div className="candidate-list-content mt-3 mt-lg-0">
                      <h5 className="fs-19 mb-0">
                        <Link to="/candidatedetails" className="primary-link">
                          {person.skills?.split(",").map((skill) => (
                            <span
                              className="badge bg-soft-secondary fs-14 mt-1"
                              style={{ margin: "0 10px 0 0" }}
                              key={key}
                            >
                              {skill}
                            </span>
                          ))}
                        </Link>
                      </h5>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </div>
          ))}
        </div>
      </Row>
    </>
  );
};

const Staff = () => {
  //Apply Now Model
  const [modal, setModal] = useState(false);
  const openModal = () => setModal(!modal);

  const candidateDetails = [
    {
      id: 1,
      userImg: userImage1,
      candidateName: "Charles Dickens",
      candidateDesignation: "Project Manager",
      location: "Oakridge Lane Richardson",
      salary: "$650 / hours",
      rating: 4.8,
      ratingClass: "badge bg-success ms-1",
      addclassNameBookmark: false,
      badges: [
        {
          id: 1,
          badgeName: "Leader",
        },
        {
          id: 2,
          badgeName: "Manager",
        },
        {
          id: 2,
          badgeName: "Developer",
        },
      ],
    },
  ];
  return (
    <>
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
      <div className="candidate-list">
        {candidateDetails.map((candidateDetailsNew, key) => (
          <div
            key={key}
            className={
              candidateDetailsNew.addclassNameBookmark === true
                ? "candidate-list-box bookmark-post card mt-4"
                : "candidate-list-box card mt-4"
            }
          >
            <CardBody className="p-4">
              <Row className="align-items-center">
                <div className="col-auto">
                  <div className="candidate-list-images">
                    <Link to="#">
                      <img
                        src={candidateDetailsNew.userImg}
                        alt=""
                        className="avatar-md img-thumbnail rounded-circle"
                      />
                    </Link>
                  </div>
                </div>
                <Col lg={5}>
                  <div className="candidate-list-content mt-3 mt-lg-0">
                    <h5 className="fs-19 mb-0">
                      <Link to="/candidatedetails" className="primary-link">
                        {candidateDetailsNew.candidateName}
                      </Link>

                      <span className={candidateDetailsNew.ratingClass}>
                        <i className="mdi mdi-star align-middle"></i>
                        {candidateDetailsNew.rating}
                      </span>
                    </h5>
                    <p className="text-muted mb-2">
                      {" "}
                      {candidateDetailsNew.candidateDesignation}
                    </p>
                    <ul className="list-inline mb-0 text-muted">
                      <li className="list-inline-item">
                        <i className="mdi mdi-map-marker"></i>{" "}
                        {candidateDetailsNew.location}
                      </li>
                      <li className="list-inline-item">
                        <i className="uil uil-wallet"></i>{" "}
                        {candidateDetailsNew.salary}
                      </li>
                    </ul>
                  </div>
                </Col>

                <Col lg={4}>
                  <div className="mt-2 mt-lg-0 d-flex flex-wrap align-items-start gap-1">
                    {(candidateDetailsNew.badges || []).map(
                      (badgesInner, key) => (
                        <span
                          className="badge bg-soft-secondary fs-14 mt-1"
                          key={key}
                        >
                          {badgesInner.badgeName}
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
    </>
  );
};

export default ActiveStaff;
