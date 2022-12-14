import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { Contract_API, hireCandidate } from "../../apis/contract";
import Section from "../../components/Section";

import "../../assets/css/ContractPage.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { successToast } from "../../components/Toasts";

const HiringPage = () => {
  const location = useLocation();
  const [details, setDetails] = useState(location.state?.applicationdetails);
  const UserId = localStorage.getItem("UserId");
  const rate = details?.hourlyRate;
  const [hourlyRate, setHourlyRate] = useState(rate);
  const [isWeekly, setIsWeekly] = useState(
    details?.jobType == "Weekly" ? true : false
  );
  console.log("Employment Type is : ", details?.jobType);
  const [type, setType] = useState(details?.jobType);
  const [hoursPerWeek, setHoursPerWeek] = useState(0);
  const [hours, setHours] = useState(0);
  const [response, setResponse] = useState();
  const d = new Date();
  const date = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  const history = useHistory();
  console.log("Details are : ", details);
  const handleHire = () => {
    console.log(
      "api conssole---->",
      date,
      UserId,
      details?.applicantId,
      details?.jobId,
      type,
      parseInt(hourlyRate)
    );
    hireCandidate(
      date,
      UserId,
      details?.applicantId,
      details?.jobId,
      type,
      parseInt(hourlyRate)
    )
      .then((resp) => {
        console.log(resp);
        if (
          resp.data == "A Contract already made with same User for this Job"
        ) {
          successToast("Contract Already Exists");
          setTimeout(() => {
            history.push("/employeroffers");
          }, 1000);
        } else {
          successToast("Contract Created Successfully");
          setTimeout(() => {
            history.push("/employeroffers");
          }, 1000);
        }
      })
      .catch((error) => {
        if (error) {
          successToast(`Contract already made`);
        }
      });
  };

  return (
    <>
      <Section
        pageTitle={"Make an Offer"}
        Primary={"CandidateList"}
        Secondary={"My Jobs"}
        Tertiary={"Job Applicants"}
        primaryLink={"/candidatelist"}
        secondaryLink={"/myjobs"}
      />
      <ToastContainer
        position="top-center"
        autoClose={700}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div
        style={{
          marginTop: "50px",
          marginBottom: "50px",
          marginLeft: "",
        }}
        className=""
      >
        <div style={{ margin: "auto", width: "40%", textAlign: "center" }}>
          <h1>Make an Offer</h1>
          <br />
        </div>
        <div style={{ margin: "auto", width: "40%" }}>
          {/* <span>
            <h6 style={{ display: "inline-block" }}>Candidate Name :</h6>
          </span> */}
          <br />
          <span>
            <h6 style={{ display: "inline-block" }}>Hourly Rate : </h6>
            {details?.hourlyRate} $/h
          </span>
          <br />
          <span>
            <h6 style={{ display: "inline-block" }}>jobTitle : </h6>
            {details?.jobTitle}
          </span>
          <br />
          <span>
            <h6 style={{ display: "inline-block" }}>jobType : </h6>
            {details?.jobType}
          </span>
          <br />
          <span>
            {/* {jobdetails?.map((job) => {
              return (
                <>
                  {" "}
                  {job.employmentType == "Weekly" ? (
                    <>
                      <h6 style={{ display: "inline-block" }}>
                        hours per Day :{" "}
                      </h6>
                      {job.dailyHours}
                    </>
                  ) : (
                    <>
                      {" "}
                      <h6 style={{ display: "inline-block" }}>job Hours : </h6>
                      {job.jobHours}
                    </>
                  )}
                </>
              );
            })} */}
          </span>
          <br />
          <span>
            {/* <h6 style={{ display: "inline-block" }}>Your Proposed Rate : </h6>
            {jobdetails?.map((job) => {
              return (
                <>
                  {job.minRate} - {job.maxRate} $/h
                </>
              );
            })} */}
          </span>
        </div>
        <br />

        <Form style={{ margin: "auto", width: "40%" }}>
          <FormGroup>
            <FormGroup>
              <Label for="hourlyRate">Suggest Hourly Rate</Label>
              <Input
                type="number"
                name="hourlyRate"
                id="hourlyRate"
                value={hourlyRate}
                onChange={(e) => {
                  setHourlyRate(e.target.value);
                }}
                placeholder="HourlyRate"
              />
            </FormGroup>

            <Label for="type">Select Employment Type</Label>
            <Input
              type="select"
              name="type"
              id="type"
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                e.target.value == "Weekly"
                  ? setIsWeekly(true)
                  : setIsWeekly(false);
              }}
            >
              <>
                {details?.jobType == "Weekly" ? (
                  <>
                    <option value={details?.jobType} selected>
                      {details?.jobType}
                    </option>
                    <option value="Fixed Hours">Fixed Hours</option>
                  </>
                ) : (
                  <>
                    <option value={details?.jobType} selected>
                      {details?.jobType}
                    </option>
                    <option value="Weekly">Weekly</option>
                  </>
                )}
              </>
            </Input>
          </FormGroup>
          {type == "Weekly" ? (
            <>
              <FormGroup>
                <Label for="hoursPerWeek">HoursPerWeek</Label>
                <Input
                  type="number"
                  name="hoursPerWeek"
                  id="hoursPerWeek"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(e.target.value)}
                />
              </FormGroup>
            </>
          ) : (
            <>
              <FormGroup>
                <Label for="Hours">Number of Hours</Label>
                <Input
                  type="number"
                  name="Hours"
                  id="Hours"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                />
              </FormGroup>
            </>
          )}

          <Button
            onClick={handleHire}
            // type={"submit"}
            className="btn btn-primary"
          >
            Send Offer
          </Button>
        </Form>
      </div>
    </>
  );
};

export default HiringPage;
