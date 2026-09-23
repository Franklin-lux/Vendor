import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BankDetails = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    accountNumber: "",
    holderName: "",
    ifscCode: "",
    branchAddress: ""
  });
  const [bankFile, setBankFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Account number - numbers only
    if (name === "accountNumber") {
      if (!/^[0-9]*$/.test(value)) {
        return;
      }
    }

    // Holder name - letters and spaces only
    if (name === "holderName") {
      if (!/^[A-Za-z ]*$/.test(value)) {
        return;
      }
    }

    // IFSC - letters and numbers only
    if (name === "ifscCode") {
      if (!/^[A-Za-z0-9]*$/.test(value)) {
        return;
      }

      if (value.length > 11) {
        return;
      }
    }

    setFormData({
      ...formData,
      [name]: name === "ifscCode"
        ? value.toUpperCase()
        : value
    });
  };

  const handleSave = () => {
    if (formData.accountNumber === "") {
      alert("Please enter account number");
      return;
    }

    if (formData.holderName.trim() === "") {
      alert("Please enter account holder name");
      return;
    }

    if (formData.ifscCode === "") {
      alert("Please enter IFSC code");
      return;
    }

    if (formData.ifscCode.length !== 11) {
      alert("IFSC code must contain exactly 11 characters");
      return;
    }

    if (formData.branchAddress.trim() === "") {
      alert("Please enter branch address");
      return;
    }

    fetch("http://localhost:5000/userProfile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        bankDetails: formData
      })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save bank details");
        }

        return response.json();
      })
      .then(() => {
        alert("Bank details saved successfully");
        navigate("/agreement");
      })
      .catch((error) => {
        console.log(error);
        alert("Error saving bank details");
      });
  };
  const handleBankDocumentChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    // Store actual file temporarily
    setBankFile(file);

    // Store filename in formData
    setFormData({
      ...formData,
      bank: {
        ...formData.bank,
        document: file.name
      }
    });
  };

  const handleBankDownload = () => {
    if (!bankFile) {
      return;
    }

    const fileUrl = URL.createObjectURL(bankFile);

    const link = document.createElement("a");

    link.href = fileUrl;
    link.download = bankFile.name;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(fileUrl);
  };

  return (
    <div className="form-card">
      <div className="form-header">
        <h2>Bank Details</h2>
        <p>Enter your bank account details</p>
      </div>

      <div className="form-group">
        <label>Account Number</label>

        <input
          type="text"
          name="accountNumber"
          placeholder="Enter account number"
          value={formData.accountNumber}
          onChange={handleChange}
          inputMode="numeric"
        />
      </div>

      <div className="form-group">
        <label>Account Holder Name</label>

        <input
          type="text"
          name="holderName"
          placeholder="Enter account holder name"
          value={formData.holderName}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>IFSC Code</label>

        <input
          type="text"
          name="ifscCode"
          placeholder="Enter IFSC code"
          value={formData.ifscCode}
          onChange={handleChange}
          maxLength="11"
        />
      </div>

      <div className="form-group">
        <label>Branch Address</label>

        <textarea
          name="branchAddress"
          placeholder="Enter branch address"
          value={formData.branchAddress}
          onChange={handleChange}
          rows="4"
        />
      </div>
      <div className="form-group">
        <label>Bank Passbook</label>

        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleBankDocumentChange}
        />

        {bankFile && (
          <button
            type="button"
            className="file-name-button"
            onClick={handleBankDownload}
          >
            {bankFile.name}
          </button>
        )}
      </div>

      <div className="form-footer">
        <button
          className="save-button"
          onClick={handleSave}
        >
          Save Bank Details
        </button>
      </div>
    </div>
  );
};

export default BankDetails;