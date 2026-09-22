import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get email and OTP from Create Profile page
  const email = location.state?.email || "";
  const generatedOtp = location.state?.otp || "";

  const [otp, setOtp] = useState("");

  const handleOtpChange = (e) => {
    const value = e.target.value;

    // Allow only numbers
    if (!/^[0-9]*$/.test(value)) {
      return;
    }

    // Allow maximum 6 digits
    if (value.length > 6) {
      return;
    }

    setOtp(value);
  };

  const handleVerifyOtp = () => {
    if (otp === "") {
      alert("Please enter OTP");
      return;
    }

    if (otp.length !== 6) {
      alert("Please enter the 6-digit OTP");
      return;
    }

    if (otp === generatedOtp) {
      alert("Email verified successfully!");

      navigate("/create-profile", {
        state: {
          emailVerified: true,
          email: email
        }
      });
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="form-card">
      <div className="form-header">
        <h2>Verify your email</h2>

        <p>
          Enter the 6-digit OTP sent to
          <br />
          <strong>{email}</strong>
        </p>
      </div>

      <div className="form-group">
        <label>Enter OTP</label>

        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={handleOtpChange}
          maxLength="6"
          inputMode="numeric"
        />
      </div>

      <div className="form-footer">
        <button
          type="button"
          className="save-button"
          onClick={handleVerifyOtp}
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default OtpVerification;