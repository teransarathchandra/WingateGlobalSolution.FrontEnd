import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
import { verifyUser } from "@app_services/userService";
import CommonLoading from "@app_components/loader/CommonLoading";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@app_redux/actions/authActions";

const VerifyEmail = () => {
  // const [verificationStatus, setVerificationStatus] = useState("");
  // const [userVerified, setUserVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const { token } = useParams(); // Assuming you're using React Router v6
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    verifyEmailToken(token);
  }, [token]);

  const verifyEmailToken = async (token) => {
    try {
      const response = await verifyUser(token);
      // setUserVerified(response.isUserVerified);
      // setVerificationStatus(response.message || "Email verified successfully!");
      setLoading(false); // API call is done, remove loading indicator
      
      if (response.isUserVerified) {
        dispatch(loginSuccess(response));
        navigate('/order'); // Adjust route as necessary
      } else {
        navigate('/'); // Navigate to home if not verified
      }
    } catch(error: any) {
      // setUserVerified(false);
      // setVerificationStatus(
      //   error?.response?.message || "Failed to verify email."
      // );
      setLoading(false); // API call is done, remove loading indicator
      navigate('/'); // Navigate to home on error
    }
  };

  if (loading) {
    return <CommonLoading loading={true} />;
  }

  return (
    <>
      {/* <h2>Email Verification</h2>
      <p>{verificationStatus}</p> */}
    </>
  );
};

export default VerifyEmail;
