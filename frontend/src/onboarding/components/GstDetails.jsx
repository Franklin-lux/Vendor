import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GstDetails = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    gstNumber: "",
    legalName: "",
    businessType: "",
    registrationNumber: "",
    businessAddress: ""
  });
  const [gstFile, setGstFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // GST number - letters and numbers only
    if (name === "gstNumber") {
      if (!/^[A-Za-z0-9]*$/.test(value)) {
        return;
      }

      if (value.length > 15) {
        return;
      }
    }

    // Legal name - letters, spaces and common characters
    if (name === "legalName") {
      if (!/^[A-Za-z0-9 .,&'-]*$/.test(value)) {
        return;
      }
    }

    // Registration number - letters and numbers only
    if (name === "registrationNumber") {
      if (!/^[A-Za-z0-9]*$/.test(value)) {
        return;
      }
    }

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = () => {
    if (formData.gstNumber === "") {
      alert("Please enter GST number");
      return;
    }

    if (formData.gstNumber.length !== 15) {
      alert("GST number must contain exactly 15 characters");
      return;
    }

    if (formData.legalName.trim() === "") {
      alert("Please enter legal name");
      return;
    }

    if (formData.businessType === "") {
      alert("Please select business type");
      return;
    }

    if (formData.registrationNumber.trim() === "") {
      alert("Please enter registration number");
      return;
    }

    if (formData.businessAddress.trim() === "") {
      alert("Please enter business address");
      return;
    }

    fetch("http://localhost:5000/userProfile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        gstDetails: formData
      })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save GST details");
        }

        return response.json();
      })
      .then(() => {
        navigate("/bank-details");
      })
      .catch((error) => {
        console.log(error);
        alert("Error saving GST details");
      });
  };
  const handleGstDocumentChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    // Store actual file temporarily
    setGstFile(file);

    // Store filename in formData
    setFormData({
      ...formData,
      gst: {
        ...formData.gst,
        document: file.name
      }
    });
  };

  const handleGstDownload = () => {
    if (!gstFile) {
      return;
    }

    const fileUrl = URL.createObjectURL(gstFile);

    const link = document.createElement("a");

    link.href = fileUrl;
    link.download = gstFile.name;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(fileUrl);
  };

  return (
    <div className="form-card">
      <div className="form-header">
        <h2>GST Details</h2>
        <p>Enter your business GST details</p>
      </div>

      <div className="form-group">
        <label>GST Number</label>

        <input
          type="text"
          name="gstNumber"
          placeholder="Enter GST number"
          value={formData.gstNumber}
          onChange={handleChange}
          maxLength="15"
        />
      </div>

      <div className="form-group">
        <label>Legal Name</label>

        <input
          type="text"
          name="legalName"
          placeholder="Enter legal name"
          value={formData.legalName}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Constitution of Business</label>

        <select
          name="businessType"
          value={formData.businessType}
          onChange={handleChange}
        >
          <option value="">Select business type</option>
          <option value="Proprietorship">
            Proprietorship
          </option>
          <option value="Partnership">
            Partnership
          </option>
          <option value="Private Limited">
            Private Limited
          </option>
          <option value="LLP">
            LLP
          </option>
        </select>
      </div>

      <div className="form-group">
        <label>Registration Number</label>

        <input
          type="text"
          name="registrationNumber"
          placeholder="Enter registration number"
          value={formData.registrationNumber}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Business Address</label>

        <textarea
          name="businessAddress"
          placeholder="Enter business address"
          value={formData.businessAddress}
          onChange={handleChange}
          rows="4"
        />
      </div>

      <div className="form-group">
        <label>GST Document</label>

        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleGstDocumentChange}
        />

        {gstFile && (
          <button
            type="button"
            className="file-name-button"
            onClick={handleGstDownload}
          >
            {gstFile.name}
          </button>
        )}
      </div>


      <div className="form-footer">
        <button
          className="save-button"
          onClick={handleSave}
        >
          Save GST Details
        </button>
      </div>
    </div>
  );
};

export default GstDetails;