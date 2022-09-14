import React from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";

import { getJobs } from "../../apis/Job";

const Pagination = (props) => {
  console.log("Total Pages on Pagination : ", props.totalPages);
  const totalPages = props.totalPages;
  const pagelinks = [];
  const jobhandler = (pageNo) => {
    console.log("Number is : ", pageNo);
    getJobs(pageNo).then((resp) => {
      console.log("Got Response", resp);
      if (resp.data.resultStatus == 200) {
        props.setIsSpinnerLoading(false);
        props.setHaveJobs(true);
        props.setJobs(resp.data.data);
        // setTotalPages(resp.data.totalPages);
      } else {
        props.setIsSpinnerLoading(false);
        props.setMessage(resp.data.message);
        //alert(resp.data.message);
      }
    });
  };
  for (let i = 1; i <= totalPages; i++) {
    pagelinks.push(i);
  }

  return (
    <React.Fragment>
      <Row>
        {/* <h1>Total Pages are : {props.totalPages}</h1> */}
        <Col lg={12} className="mt-4 pt-2">
          <nav aria-label="Page navigation example">
            <div className="pagination job-pagination mb-0 justify-content-center">
              <li className="page-item ">
                <Link className="page-link" to="#" tabIndex="-1">
                  <i className="mdi mdi-chevron-double-left fs-15"></i>
                </Link>
              </li>
              {pagelinks.map((i, key) => {
                return (
                  <>
                    {" "}
                    <li className="page-item ">
                      <button
                        className="page-link"
                        onClick={() => {
                          jobhandler(i);
                        }}
                      >
                        {i}
                      </button>
                    </li>
                  </>
                );
              })}

              {/* <li className="page-item">
                <Link className="page-link" to="#">
                  1
                </Link>
              </li> */}
              {/* <li className="page-item">
                <Link className="page-link" to="#">
                  2
                </Link>
              </li> */}
              {/* <li className="page-item">
                <Link className="page-link" to="#">
                  3
                </Link>
              </li> */}
              {/* <li className="page-item">
                <Link className="page-link" to="#">
                  4
                </Link>
              </li> */}
              <li className="page-item">
                <Link className="page-link" to="#">
                  <i className="mdi mdi-chevron-double-right fs-15"></i>
                </Link>
              </li>
            </div>
          </nav>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Pagination;
