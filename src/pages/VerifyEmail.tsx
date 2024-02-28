import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const [verificationStatus, setVerificationStatus] = useState("");
  const { token } = useParams(); // Assuming you're using React Router v6

  useEffect(() => {
    verifyEmailToken(token);
  }, [token]);

  const verifyEmailToken = async (token) => {
    try {
      // Replace the URL with your backend endpoint
      const response = await axios.get(
        `http://localhost:3000/api/user/verify-email/${token}`
      );
      setVerificationStatus(
        response.data.message || "Email verified successfully!"
      );
    } catch (error) {
      setVerificationStatus(
        error?.response?.data.message || "Failed to verify email."
      );
    }
  };

  return (
    <div>
      <h2>Email Verification</h2>
      <p>{verificationStatus}</p>
    </div>
  );
};

export default VerifyEmail;
