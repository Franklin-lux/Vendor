import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CreateProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    emailVerified: false
  });

  // Check whether email was verified from OTP page
  React.useEffect(() => {
    if (location.state?.emailVerified) {
      setFormData((previousData) => ({
        ...previousData,
        email: location.state.email,
        emailVerified: true
      }));

      alert("Email verified successfully!");

      // Clear navigation state
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // First name and last name - only letters and spaces
    if (name === "firstName" || name === "lastName") {
      if (!/^[A-Za-z ]*$/.test(value)) {
        return;
      }
    }

    // If email is changed after verification,
    // make it unverified again
    if (name === "email") {
      setFormData({
        ...formData,
        email: value,
        emailVerified: false
      });

      return;
    }

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleVerify = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (formData.email.trim() === "") {
      alert("Please enter your email address");
      return;
    }

    if (!emailPattern.test(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Generate random 6-digit OTP
    const generatedOtp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    console.log(`Generated OTP: ${generatedOtp}`);

    // Navigate to OTP page
    navigate("/otp-verification", {
      state: {
        email: formData.email,
        otp: generatedOtp
      }
    });
  };

  const handleSave = () => {
    if (formData.firstName.trim() === "") {
      alert("Please enter your first name");
      return;
    }

    if (formData.lastName.trim() === "") {
      alert("Please enter your last name");
      return;
    }

    if (formData.email.trim() === "") {
      alert("Please enter your email");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (!formData.emailVerified) {
      alert("Please verify your email first");
      return;
    }

    fetch("http://localhost:5000/userProfile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        createProfile: formData
      })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save profile");
        }

        return response.json();
      })
      .then(() => {
        alert("Profile saved successfully");

        navigate("/kyc-details");
      })
      .catch((error) => {
        console.log(error);
        alert("Error saving profile");
      });
  };

  return (
    <div className="form-card">

      <div className="form-header">
        <h2>Create your user profile</h2>

        <p>
          Enter your basic profile information
        </p>
      </div>

      <div className="form-row">

        <div className="form-group">

          <label>First name</label>

          <input
            type="text"
            name="firstName"
            placeholder="e.g. Subash"
            value={formData.firstName}
            onChange={handleChange}
          />

        </div>

        <div className="form-group">

          <label>Last name</label>

          <input
            type="text"
            name="lastName"
            placeholder="e.g. Kumar"
            value={formData.lastName}
            onChange={handleChange}
          />

        </div>

      </div>

      <div className="form-group">

        <label>Email</label>

        <div className="email-row">

          <input
            type="email"
            name="email"
            placeholder="e.g. you@example.com"
            value={formData.email}
            onChange={handleChange}
          />

          <button
            type="button"
            className="verify-button"
            onClick={handleVerify}
          >
            {formData.emailVerified
              ? "Verified"
              : "Verify"}
          </button>

        </div>

      </div>

      <div className="form-footer">

        <button
          type="button"
          className="save-button"
          onClick={handleSave}
        >
          Save Profile
        </button>

      </div>

    </div>
  );
};

export default CreateProfile;