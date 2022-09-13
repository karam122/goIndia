import { Link, useHistory } from "react-router-dom";
import { aipriceverification } from "../../../apis/User";
import { successToast } from "../../../components/Toasts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfileInReview = () => {
  const Id = localStorage.getItem("UserId");
  const history = useHistory();
  const verificationresult = () => {
    aipriceverification(Id).then((resp) => {
      successToast(resp.data);
      if (resp.data == "Approved") {
        setTimeout(() => {
          history.push("/signin");
        }, 800);
      }
    });
  };
  return (
    <>
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
      <div style={{ margin: "auto", width: "60%" }}>
        <h1 style={{ margin: "200px 0px 20px 0px" }}>
          Your Profile is under Review...
        </h1>
        <Link
          to="/signin"
          style={{ margin: "20px 0px 100px 0px" }}
          className="btn btn-primary"
        >
          Back to Home
        </Link>
        <button onClick={verificationresult} className="btn btn-success">
          Check Verification Status
        </button>
      </div>
    </>
  );
};

export default ProfileInReview;
