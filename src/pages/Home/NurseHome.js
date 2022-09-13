import React from "react";
import Jobcatogaries from "../Home/jobCatogaries";
import NurseJobList from "./JobList/ArshList/NurseJobList";
import HowItWorks from "./HowItWorks";
import Cta from "./Cta";
import Testimonal from "./Testimonal";
import Blog from "../Home/Blog";
import Client from "./Client";

const NurseHome = () => {
  return (
    <React.Fragment>
      {/* <Jobcatogaries/> */}
      {/* <h1 style={{ margin: "auto", width: "25%" }}>This is Nurse Home</h1> */}
      <NurseJobList />
      <HowItWorks />
      <Cta />
      <Testimonal />
      <Blog />
      <Client />
    </React.Fragment>
  );
};

export default NurseHome;
