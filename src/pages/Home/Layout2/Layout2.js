import React from "react";
import NurseHome from "../NurseHome";
import Section from "../Layout2/Section";
import MetaTags from "react-meta-tags";

const Layout2 = () => {
  return (
    <React.Fragment>
      <MetaTags>
        <title>Home | Jobcy - Job Listing Template | Themesdesign</title>
      </MetaTags>
      <Section />
      <NurseHome />
    </React.Fragment>
  );
};
export default Layout2;
