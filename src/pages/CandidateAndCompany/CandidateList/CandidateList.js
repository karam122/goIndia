import React, { useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import CandidateDetails from "./CandidateDetails";
import JobFilters from "./JobFilters";
import Section from "../../../components/Section";
import Pagination from "../../Jobs/JobList2/Pagination";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";

const CandidateList = () => {
  return (
    <React.Fragment>
      <MetaTags>
        <title>
          Candidate List | Jobcy - Job Listing Template | Themesdesign HAHAH
        </title>
      </MetaTags>
      <Section
        pageTitle={"Candidate List"}
        Primary={"Home"}
        primaryLink={"/candidatelist"}
      />
      <section className="section">
        <Container>
          <JobFilters />
          <div>
            <Link to="/jobform" className="btn btn-primary w-25 ">
              <i className="uil uil-plus"></i> Add New Job
            </Link>
            <Link
              to="/myjobs"
              className="btn btn-success w-25"
              style={{ marginLeft: "25px" }}
            >
              <i className="uil uil-plus"></i> See My Jobs
            </Link>
          </div>
          <br />

          <Row>
            <Col lg={12}>
              <CandidateDetails />
            </Col>
          </Row>
          <Pagination />
        </Container>
      </section>
    </React.Fragment>
  );
};

export default CandidateList;
