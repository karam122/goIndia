import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import Section from "../../../components/Section";
import { PostAJob } from "../../../apis/Job";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { successToast } from "../../../components/Toasts";

const JobForm = () => {
  //Fields

  const defaultDate = "2022-08-02T12:44:48.662Z";
  const [jobTitle, setTitle] = useState("");
  const [minRate, setMinRate] = useState(0);
  const [maxRate, setMaxRate] = useState(0);
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [experience, setExperience] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [jobHours, setJobHours] = useState(0);
  const [dailyHours, setDailyHours] = useState(0);
  const [dateFrom, setdateFrom] = useState("");
  const [dateTo, setDateTo] = useState(defaultDate);
  const [jobDescription, setDescription] = useState("");

  const history = useHistory();

  const Id = localStorage.getItem("UserId");
  const handleJob = async () => {
    await PostAJob(
      Id,
      jobTitle,
      minRate,
      maxRate,
      location,
      category,
      experience,
      employmentType,
      jobHours,
      dailyHours,
      dateFrom,
      dateTo,
      jobDescription
    )
      .then((resp) => {
        console.log("Response is : ", resp);
        if (resp.status == 200 || resp.status == 201) {
          successToast(`Successfully Created the Job`);
          setTimeout(() => {
            history.push("/myjobs");
          }, 1500);
        }
      })
      .catch((error) => {
        successToast("Job not created !. An Error Occured");
      });
  };

  return (
    <>
      <div>
        <Section
          pageTitle={"Add New Job"}
          Primary={"Home"}
          Secondary={"Create New Job"}
          primaryLink={"/candidatelist"}
          secondaryLink={"/jobform"}
        />
        <div style={{ margin: "20px 0 200px 0" }}>
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
          <Form style={{ margin: "auto", width: "40%" }}>
            <FormGroup>
              <Label for="jobTitle">Job Title</Label>
              <Input
                type="text"
                name="jobTitle"
                id="jobTitle"
                value={jobTitle}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Job Title"
              />
            </FormGroup>
            <div className="row">
              <HourlyRate
                minRate={minRate}
                setMinRate={setMinRate}
                maxRate={maxRate}
                setMaxRate={setMaxRate}
              />
            </div>

            <div className="row">
              <FormGroup className="col-md-6">
                <Label for="exampleSelect">Location</Label>
                <Input
                  type="select"
                  name="location"
                  id="exampleSelect"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option>Select a Location</option>
                  <option value="Lahore,Punjab">Lahore,Punjab</option>
                  <option value="Kashmir,India">Kashmir,India</option>
                  <option value="New York, America">New York, America</option>
                </Input>
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label for="category">Category</Label>
                <Input
                  type="select"
                  name="category"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>Select a Category</option>
                  <option value="Category1">Category 1</option>
                  <option value="Category2">Category 2</option>
                  <option value="Category3">Category 3</option>
                </Input>
              </FormGroup>
            </div>

            <div className="row">
              <FormGroup className="col-md-6">
                <Label for="experience">Experience</Label>
                <Input
                  type="select"
                  name="experience"
                  id="experience"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                >
                  <option>Select Experience</option>
                  <option value="0-1 year">0-1 year</option>
                  <option value="more than 1 year">More than 1 year</option>
                  <option value="5 years">5 Years</option>
                </Input>
              </FormGroup>

              <FormGroup className="col-md-6">
                <Label for="employmentType">Employment Type</Label>
                <Input
                  type="select"
                  name="employmentType"
                  id="exampleSelect"
                  placeholder="Employment Type"
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value)}
                >
                  <option>Select Employment Type</option>

                  <option value="Weekly">Weekly</option>
                  <option value="Fixed Hours">Fixed Hours</option>
                </Input>
              </FormGroup>
            </div>
            {/* <button onClick={showDates} type="button">
              showDates
            </button> */}

            <div className="row">
              {employmentType === "Fixed Hours" ? (
                <JobHours
                  jobHours={jobHours}
                  setJobHours={setJobHours}
                  title={"No of Hours"}
                />
              ) : (
                <>
                  <FormGroup className="col-md-6">
                    <Label for="time">From</Label>
                    <Input
                      type="date"
                      value={dateFrom}
                      onChange={(e) => setdateFrom(e.target.value)}
                    />
                  </FormGroup>

                  {/* <FormGroup className="col-md-6">
                    <Label for="time">To</Label>
                    <Input
                      type="date"
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                    />
                  </FormGroup> */}
                  <JobHours
                    jobHours={dailyHours}
                    setJobHours={setDailyHours}
                    title={"daily Hours"}
                  />
                </>
              )}
            </div>

            <FormGroup>
              <Label for="exampleEmail">Job Desctiption</Label>
              <Input
                type="textarea"
                rows="6"
                name="jobDescription"
                id="exampleEmail"
                value={jobDescription}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Job Description"
              />
            </FormGroup>
            {jobTitle === "" ||
            minRate === 0 ||
            maxRate === 0 ||
            location === "" ||
            experience === "" ||
            employmentType === "" ||
            jobDescription === "" ? (
              <Button disabled className="btn btn-primary">
                Add Job
              </Button>
            ) : (
              <Button onClick={handleJob} className="btn btn-primary">
                Add Job
              </Button>
            )}
          </Form>
        </div>
      </div>
    </>
  );
};

const HourlyRate = (props) => {
  return (
    <>
      <h5>Hourly Rate</h5>
      <FormGroup className="col-md-6">
        <Label for="">From</Label>
        <Input
          type="number"
          value={props.minRate}
          onChange={(e) => props.setMinRate(e.target.value)}
        />
      </FormGroup>

      <FormGroup className="col-md-6">
        <Label for="time">To</Label>
        <Input
          type="number"
          value={props.maxRate}
          onChange={(e) => props.setMaxRate(e.target.value)}
        />
      </FormGroup>
    </>
  );
};

const JobHours = (props) => {
  return (
    <>
      <FormGroup className="col-md-12">
        <Label for="jobHours">{props.title}</Label>
        <Input
          name="jobHours"
          type="number"
          value={props.jobHours}
          onChange={(e) => props.setJobHours(e.target.value)}
        />
      </FormGroup>
    </>
  );
};

export default JobForm;
