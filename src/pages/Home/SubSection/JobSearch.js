import React from "react";
import { Input } from "reactstrap";

import { setValue } from "../../../Redux/UserSlice";
import { useSelector, useDispatch } from "react-redux/es/exports";

const JobSearch = () => {
  const name = useSelector((state) => state.search.svalue);
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <Input
        type="search"
        id="job-title"
        className="form-control filter-input-box"
        placeholder="Job, Company name..."
        onChange={(e) => dispatch(setValue(e.target.value))}
      />
    </React.Fragment>
  );
};

export default JobSearch;
