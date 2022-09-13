import React from "react";
import Section from "../Layout1/Section";
import Home from "../Home";
import MetaTags from "react-meta-tags";
import { useEffect } from "react";

const Layout1 = () => {
  useEffect(() => {
    var username = localStorage.getItem("Email");
    var password = localStorage.getItem("Password");
    // if (username == null && password == null) {
    //   window.location.href = "/signin"; // Assign your url to location href
    // } else {
    //   console.log(window.location.hostname);
    // }
  });
  return (
    <div>
      <MetaTags>
        <title>Home | Jobcy - Job Listing Template | Themesdesign</title>
        <script src="https://unicons.iconscout.com/release/v3.0.2/script/monochrome/bundle.js"></script>
      </MetaTags>
      <Section />
      <Home />
    </div>
  );
};

export default Layout1;
