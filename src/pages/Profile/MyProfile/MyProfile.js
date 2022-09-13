import React from "react";
import { MetaTags } from "react-meta-tags";
import { Container, Row } from "reactstrap";
import LeftSideContent from "./LeftSideContent";
import RightSideContent from "./RightSideContent";
import Section from "./Section";
import { useEffect, useState } from "react";
import { getExperience } from "../../../apis/Experience";
import { getEducation } from "../../../apis/Education";
import { getCurrentUserData } from "../../../apis/User";
import { currentuserid } from "../../../apis/constants";

const MyProfile = () => {
  const [user, setUser] = useState();
  const [education, setEducation] = useState();
  const [experience, setExperience] = useState();

  useEffect(async () => {
    const Id = localStorage.getItem("UserId");
    getCurrentUserData(Id).then((resp) => {
      setUser(resp.data);
    });
    getEducation(setEducation, currentuserid);
    getExperience(setExperience, currentuserid);
  }, []);

  return (
    <React.Fragment>
      <MetaTags>
        <title>My Profile | Jobcy - Job Listing Template | Themesdesign</title>
      </MetaTags>
      <Section />
      <section className="section">
        <Container>
          <Row>
            <LeftSideContent user={user} />
            <RightSideContent degrees={education} experiences={experience} />
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default MyProfile;
