import React, { useEffect } from "react";
import { Container, Row } from "reactstrap";
import LeftSideContent from "./LeftSideContent";
import RightSideContent from "./RightSideContent";
import Section from "./Section";
import MetaTags from "react-meta-tags";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { EDU_API, edu_url } from "../../../apis/Education";
import { EXP_API, exp_url } from "../../../apis/Experience";

const CandidateDetails = () => {
  const location = useLocation();
  const state = location.state;
  const details = state.details;
  const [education, setEducation] = useState();
  const [experience, setExperience] = useState();

  useEffect(async () => {
    const edu = await EDU_API.post(`${edu_url}${details.id}`);
    setEducation(edu.data.degrees);
    const exp = await EXP_API.post(`${exp_url}${details.id}`);
    setExperience(exp.data.experiences);
  }, []);

  return (
    <React.Fragment>
      <MetaTags>
        <title>
          Candidate Details | Jobcy - Job Listing Template | Themesdesign
        </title>
      </MetaTags>
      <Section />
      <section className="section">
        <Container>
          <Row>
            <LeftSideContent detail={details} />
            <RightSideContent
              detail={details}
              education={education}
              experience={experience}
            />
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default CandidateDetails;
