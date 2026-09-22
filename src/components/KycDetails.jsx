import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const KycDetails = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    aadhaar: {
      aadhaarNumber: "",
      name: "",
      dateOfBirth: "",
      document: ""
    },
    pan: {
      panNumber: "",
      name: "",
      document: ""
    }
  });

  // Store the actual selected files temporarily
  const [aadhaarFile, setAadhaarFile] = useState(null);
  const [panFile, setPanFile] = useState(null);

  // Aadhaar Input Change

  const handleAadhaarChange = (e) => {
    const { name, value } = e.target;

    // Aadhaar number - numbers only
    if (name === "aadhaarNumber") {
      if (!/^[0-9]*$/.test(value)) {
        return;
      }

      if (value.length > 12) {
        return;
      }
    }

    // Aadhaar name - letters and spaces only
    if (name === "name") {
      if (!/^[A-Za-z ]*$/.test(value)) {
        return;
      }
    }

    setFormData({
      ...formData,
      aadhaar: {
        ...formData.aadhaar,
        [name]: value
      }
    });
  };


  // PAN Input Change

  const handlePanChange = (e) => {
    const { name, value } = e.target;

    // PAN name - letters and spaces only
    if (name === "name") {
      if (!/^[A-Za-z ]*$/.test(value)) {
        return;
      }
    }

    // PAN number - letters and numbers only
    if (name === "panNumber") {
      if (!/^[A-Za-z0-9]*$/.test(value)) {
        return;
      }

      if (value.length > 10) {
        return;
      }
    }

    setFormData({
      ...formData,
      pan: {
        ...formData.pan,
        [name]: value.toUpperCase()
      }
    });
  };

  // Aadhaar Document Selection

  const handleAadhaarDocumentChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    // Store actual file temporarily
    setAadhaarFile(file);

    // Store filename in formData
    setFormData({
      ...formData,
      aadhaar: {
        ...formData.aadhaar,
        document: file.name
      }
    });
  };

  // PAN Document Selection

  const handlePanDocumentChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    // Store actual file temporarily
    setPanFile(file);

    // Store filename in formData
    setFormData({
      ...formData,
      pan: {
        ...formData.pan,
        document: file.name
      }
    });
  };

  // Download Aadhaar Document

  const handleAadhaarDownload = () => {
    if (!aadhaarFile) {
      return;
    }

    const fileUrl = URL.createObjectURL(aadhaarFile);

    const link = document.createElement("a");

    link.href = fileUrl;
    link.download = aadhaarFile.name;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(fileUrl);
  };

  // Download PAN Document

  const handlePanDownload = () => {
    if (!panFile) {
      return;
    }

    const fileUrl = URL.createObjectURL(panFile);

    const link = document.createElement("a");

    link.href = fileUrl;
    link.download = panFile.name;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(fileUrl);
  };

  // Save KYC Details
  
  const handleSave = () => {
    const aadhaarNumber = formData.aadhaar.aadhaarNumber;
    const panNumber = formData.pan.panNumber;

    // Aadhaar validation
    if (aadhaarNumber === "") {
      alert("Please enter Aadhaar number");
      return;
    }

    if (aadhaarNumber.length !== 12) {
      alert("Aadhaar number must contain exactly 12 digits");
      return;
    }

    if (formData.aadhaar.name.trim() === "") {
      alert("Please enter name as per Aadhaar");
      return;
    }

    if (formData.aadhaar.dateOfBirth === "") {
      alert("Please select date of birth");
      return;
    }

    if (formData.aadhaar.document === "") {
      alert("Please upload Aadhaar document");
      return;
    }

    // PAN validation
    if (panNumber === "") {
      alert("Please enter PAN number");
      return;
    }

    if (panNumber.length !== 10) {
      alert("PAN number must contain exactly 10 characters");
      return;
    }

    if (formData.pan.name.trim() === "") {
      alert("Please enter name as per PAN");
      return;
    }

    if (formData.pan.document === "") {
      alert("Please upload PAN document");
      return;
    }

    // Save to JSON Server
    fetch("http://localhost:5000/userProfile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        kycDetails: formData
      })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save KYC details");
        }

        return response.json();
      })
      .then(() => {
        alert("KYC details saved successfully");

        navigate("/gst-details");
      })
      .catch((error) => {
        console.log(error);
        alert("Error saving KYC details");
      });
  };

  return (
    <div className="form-card">

      {/* Header */}
      <div className="form-header">
        <h2>Aadhaar & PAN Details</h2>

        <p>
          Enter your Aadhaar and PAN details
        </p>
      </div>

      {/* KYC Cards */}
      <div className="kyc-cards">

        {/* =========================
            AADHAAR CARD
        ========================= */}
        <div className="kyc-card">

          <h3>Aadhaar Details</h3>

          {/* Aadhaar Number */}
          <div className="form-group">
            <label>Aadhaar Number</label>

            <input
              type="text"
              name="aadhaarNumber"
              placeholder="Enter 12 digit Aadhaar number"
              value={formData.aadhaar.aadhaarNumber}
              onChange={handleAadhaarChange}
              maxLength="12"
              inputMode="numeric"
            />
          </div>

          {/* Aadhaar Name */}
          <div className="form-group">
            <label>Name as per Aadhaar</label>

            <input
              type="text"
              name="name"
              placeholder="Enter name"
              value={formData.aadhaar.name}
              onChange={handleAadhaarChange}
            />
          </div>

          {/* Date of Birth */}
          <div className="form-group">
            <label>Date of Birth</label>

            <input
              type="date"
              name="dateOfBirth"
              value={formData.aadhaar.dateOfBirth}
              onChange={handleAadhaarChange}
            />
          </div>

          {/* Aadhaar Document */}
          <div className="form-group">
            <label>Aadhaar Document</label>

            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleAadhaarDocumentChange}
            />

            {aadhaarFile && (
              <button
                type="button"
                className="file-name-button"
                onClick={handleAadhaarDownload}
              >
                {aadhaarFile.name}
              </button>
            )}
          </div>

        </div>

        {/* =========================
            PAN CARD
        ========================= */}
        <div className="kyc-card">

          <h3>PAN Details</h3>

          {/* PAN Number */}
          <div className="form-group">
            <label>PAN Number</label>

            <input
              type="text"
              name="panNumber"
              placeholder="Enter PAN number"
              value={formData.pan.panNumber}
              onChange={handlePanChange}
              maxLength="10"
            />
          </div>

          {/* PAN Name */}
          <div className="form-group">
            <label>Name as per PAN</label>

            <input
              type="text"
              name="name"
              placeholder="Enter name"
              value={formData.pan.name}
              onChange={handlePanChange}
            />
          </div>

          {/* PAN Document */}
          <div className="form-group">
            <label>PAN Document</label>

            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handlePanDocumentChange}
            />

            {panFile && (
              <button
                type="button"
                className="file-name-button"
                onClick={handlePanDownload}
              >
                {panFile.name}
              </button>
            )}
          </div>

        </div>

      </div>

      {/* Save Button */}
      <div className="form-footer">

        <button
          type="button"
          className="save-button"
          onClick={handleSave}
        >
          Save KYC Details
        </button>

      </div>

    </div>
  );
};

export default KycDetails;