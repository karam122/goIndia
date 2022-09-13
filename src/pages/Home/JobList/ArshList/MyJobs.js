import React, { useState } from "react";
import { Col, Row, Modal, ModalBody, Input, Label } from "reactstrap";
import { Link } from "react-router-dom";
import { setName, setValue } from "../../../../Redux/UserSlice";
import { useSelector, useDispatch } from "react-redux/es/exports";

//jobImages
import jobImage1 from "../../../../assets/images/featured-job/img-01.png";
import jobImage2 from "../../../../assets/images/featured-job/img-01.png";
import jobImage3 from "../../../../assets/images/featured-job/img-01.png";
import jobImage4 from "../../../../assets/images/featured-job/img-01.png";

const MyJobs = (props) => {
  return (
    <React.Fragment>
      {/* <Jobs jobs={recentJob} /> */}
      <Jobs2 jobs={props.jobs} searchval={props.search} />
    </React.Fragment>
  );
};

const Jobs2 = (props) => {
  const value = useSelector((state) => state.search.svalue);

  return (
    <div>
      <div>
        {props.jobs
          ?.filter((val) => {
            if (value == "") {
              return val;
            } else if (
              val.location.toLowerCase().includes(value.toLowerCase())
            ) {
              return val;
            }
          })
          .map((job, key) => (
            <div key={key} className="job-box card mt-4">
              <div className="p-4">
                <Row className="align-items-center">
                  <Col md={2}>
                    <div className="text-center mb-4 mb-md-0">
                      <Link to="/company-details">
                        <img
                          src={jobImage1}
                          alt=""
                          className="img-fluid rounded-3"
                        />
                      </Link>
                    </div>
                  </Col>

                  <Col md={3}>
                    <div className="mb-2 mb-md-0">
                      <h5 className="fs-18 mb-1">
                        <Link to="/jobdetails" className="text-dark">
                          {job.JobTitle}
                        </Link>
                      </h5>
                      <p className="text-muted fs-14 mb-0">Img</p>
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
                  <Col md={2}>
                    <div>
                      <p className="text-muted mb-2">
                        <span className="text-primary">$</span>
                        {job.minRate}-{job.maxRate}/ hour
                      </p>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

const Jobs = (props) => {
  //Apply Now Model
  const [modal, setModal] = useState(false);
  const openModal = () => setModal(!modal);

  return (
    <>
      <div>
        {props.jobs.map((recentJobDetails, key) => (
          <div
            key={key}
            className={
              recentJobDetails.addclassNameBookmark === true
                ? "job-box bookmark-post card mt-4"
                : "job-box card mt-4"
            }
          >
            <div className="bookmark-label text-center">
              <Link to="#" className="text-white align-middle">
                <i className="mdi mdi-star"></i>
              </Link>
            </div>
            <div className="p-4">
              <Row className="align-items-center">
                <Col md={2}>
                  <div className="text-center mb-4 mb-md-0">
                    <Link to="/company-details">
                      <img
                        src={recentJobDetails.companyImg}
                        alt=""
                        className="img-fluid rounded-3"
                      />
                    </Link>
                  </div>
                </Col>

                <Col md={3}>
                  <div className="mb-2 mb-md-0">
                    <h5 className="fs-18 mb-1">
                      <Link to="/jobdetails" className="text-dark">
                        {recentJobDetails.jobDescription}
                      </Link>
                    </h5>
                    <p className="text-muted fs-14 mb-0">
                      {recentJobDetails.companyName}
                    </p>
                  </div>
                </Col>

                <Col md={3}>
                  <div className="d-flex mb-2">
                    <div className="flex-shrink-0">
                      <i className="mdi mdi-map-marker text-primary me-1"></i>
                    </div>
                    <p className="text-muted mb-0">
                      {recentJobDetails.location}
                    </p>
                  </div>
                </Col>

                <Col md={2}>
                  <div>
                    <p className="text-muted mb-2">
                      <span className="text-primary">$</span>
                      {recentJobDetails.salary}
                    </p>
                  </div>
                </Col>

                <Col md={2}>
                  <div>
                    <span
                      className={
                        recentJobDetails.fullTime === true
                          ? "badge bg-soft-success fs-13 mt-1 mx-1"
                          : recentJobDetails.partTime === true
                          ? "badge bg-soft-danger fs-13 mt-1 mx-1"
                          : recentJobDetails.freelancer === true
                          ? "badge bg-soft-purple fs-13 mt-1 mx-1"
                          : ""
                      }
                    >
                      {recentJobDetails.timing}
                    </span>

                    {(recentJobDetails.badges || []).map((badgeInner, key) => (
                      <span
                        className={`badge ${badgeInner.badgeclassName} fs-13 mt-1`}
                        key={key}
                      >
                        {badgeInner.badgeName}
                      </span>
                    ))}
                  </div>
                </Col>
              </Row>
            </div>
            <div className="p-3 bg-light">
              <Row>
                <Col md={4}>
                  <div>
                    <p className="text-muted mb-0">
                      <span className="text-dark">Experience :</span>{" "}
                      {recentJobDetails.experience}
                    </p>
                  </div>
                </Col>

                <Col lg={6} md={5}>
                  {}
                  <div>
                    <p className="text-muted mb-0">
                      <span className="text-dark">
                        {recentJobDetails.Notes === null ? "" : "Notes :"}
                      </span>
                      {recentJobDetails.Notes}{" "}
                    </p>
                  </div>
                </Col>

                <Col lg={2} md={3}>
                  <div className="text-start text-md-end">
                    <Link to="#" onClick={openModal} className="primary-link">
                      Apply Now <i className="mdi mdi-chevron-double-right"></i>
                    </Link>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        ))}
        <div className="text-center mt-4 pt-2">
          <Link to="/joblist" className="btn btn-primary">
            View More <i className="uil uil-arrow-right"></i>
          </Link>
        </div>
        <div
          className="modal fade"
          id="applyNow"
          tabIndex="-1"
          aria-labelledby="applyNow"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <Modal isOpen={modal} toggle={openModal} centered>
              <ModalBody className="modal-body p-5">
                <div className="text-center mb-4">
                  <h5 className="modal-title" id="staticBackdropLabel">
                    Apply For This Job
                  </h5>
                </div>
                <div className="position-absolute end-0 top-0 p-3">
                  <button
                    type="button"
                    onClick={openModal}
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="mb-3">
                  <Label for="nameControlInput" className="form-label">
                    Name
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="nameControlInput"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="mb-3">
                  <Label for="emailControlInput2" className="form-label">
                    Email Address
                  </Label>
                  <Input
                    type="email"
                    className="form-control"
                    id="emailControlInput2"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mb-3">
                  <Label for="messageControlTextarea" className="form-label">
                    Message
                  </Label>
                  <textarea
                    className="form-control"
                    id="messageControlTextarea"
                    rows="4"
                    placeholder="Enter your message"
                  ></textarea>
                </div>
                <div className="mb-4">
                  <Label className="form-label" for="inputGroupFile01">
                    Resume Upload
                  </Label>
                  <Input
                    type="file"
                    className="form-control"
                    id="inputGroupFile01"
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Send Application
                </button>
              </ModalBody>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyJobs;