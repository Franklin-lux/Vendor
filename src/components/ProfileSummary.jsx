import React, { useEffect, useState } from "react";

const ProfileSummary = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    createProfile: {
      firstName: "",
      lastName: "",
      email: "",
      emailVerified: false
    },

    kycDetails: {
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
    },

    gstDetails: {
      gstNumber: "",
      legalName: "",
      businessType: "",
      registrationNumber: "",
      businessAddress: ""
    },

    bankDetails: {
      accountNumber: "",
      holderName: "",
      ifscCode: "",
      branchAddress: ""
    },

    agreement: {
      accepted: false
    }
  });

  // --------------------------------
  // Get saved data from JSON Server
  // --------------------------------

  useEffect(() => {
    fetch("http://localhost:5000/userProfile")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        return response.json();
      })
      .then((data) => {
        setUserProfile(data);
        setFormData(data);
      })
      .catch((error) => {
        console.log(error);
        alert("Error loading profile details");
      });
  }, []);

  // --------------------------------
  // Handle Create Profile changes
  // --------------------------------

  const handleCreateProfileChange = (e) => {
    const { name, value } = e.target;

    if (name === "firstName" || name === "lastName") {
      if (!/^[A-Za-z ]*$/.test(value)) {
        return;
      }
    }

    setFormData({
      ...formData,

      createProfile: {
        ...formData.createProfile,
        [name]: value
      }
    });
  };

  // --------------------------------
  // Handle Aadhaar changes
  // --------------------------------

  const handleAadhaarChange = (e) => {
    const { name, value } = e.target;

    if (name === "aadhaarNumber") {
      if (!/^[0-9]*$/.test(value)) {
        return;
      }

      if (value.length > 12) {
        return;
      }
    }

    if (name === "name") {
      if (!/^[A-Za-z ]*$/.test(value)) {
        return;
      }
    }

    setFormData({
      ...formData,

      kycDetails: {
        ...formData.kycDetails,

        aadhaar: {
          ...formData.kycDetails.aadhaar,
          [name]: value
        }
      }
    });
  };

  // --------------------------------
  // Handle PAN changes
  // --------------------------------

  const handlePanChange = (e) => {
    const { name, value } = e.target;

    if (name === "panNumber") {
      if (!/^[A-Za-z0-9]*$/.test(value)) {
        return;
      }

      if (value.length > 10) {
        return;
      }
    }

    if (name === "name") {
      if (!/^[A-Za-z ]*$/.test(value)) {
        return;
      }
    }

    setFormData({
      ...formData,

      kycDetails: {
        ...formData.kycDetails,

        pan: {
          ...formData.kycDetails.pan,
          [name]: value.toUpperCase()
        }
      }
    });
  };

  // --------------------------------
  // Handle GST changes
  // --------------------------------

  const handleGstChange = (e) => {
    const { name, value } = e.target;

    if (name === "gstNumber") {
      if (!/^[A-Za-z0-9]*$/.test(value)) {
        return;
      }

      if (value.length > 15) {
        return;
      }
    }

    if (name === "registrationNumber") {
      if (!/^[A-Za-z0-9]*$/.test(value)) {
        return;
      }
    }

    setFormData({
      ...formData,

      gstDetails: {
        ...formData.gstDetails,
        [name]: value
      }
    });
  };

  // --------------------------------
  // Handle Bank changes
  // --------------------------------

  const handleBankChange = (e) => {
    const { name, value } = e.target;

    if (name === "accountNumber") {
      if (!/^[0-9]*$/.test(value)) {
        return;
      }
    }

    if (name === "holderName") {
      if (!/^[A-Za-z ]*$/.test(value)) {
        return;
      }
    }

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

      bankDetails: {
        ...formData.bankDetails,
        [name]:
          name === "ifscCode"
            ? value.toUpperCase()
            : value
      }
    });
  };

  // --------------------------------
  // Save edited details
  // --------------------------------

  const handleSubmit = () => {
    fetch("http://localhost:5000/userProfile", {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(formData)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update profile");
        }

        return response.json();
      })

      .then((data) => {
        setUserProfile(data);
        setFormData(data);

        setIsEditing(false);

        alert("Profile details updated successfully");
      })

      .catch((error) => {
        console.log(error);

        alert("Error updating profile");
      });
  };

  // --------------------------------
  // Loading
  // --------------------------------

  if (!userProfile) {
    return (
      <div className="form-card">
        <h2>Loading profile details...</h2>
      </div>
    );
  }

  // --------------------------------
  // View Mode
  // --------------------------------

  if (!isEditing) {
    return (
      <div className="form-card">

        <div className="form-header">
          <h2>Profile Summary</h2>

          <p>
            Review your submitted profile details
          </p>
        </div>

        {/* Create Profile */}

        <div className="summary-section">

          <h3>Create Profile</h3>

          <div className="summary-grid">

            <div>
              <span>First Name</span>
              <strong>
                {userProfile.createProfile?.firstName}
              </strong>
            </div>

            <div>
              <span>Last Name</span>
              <strong>
                {userProfile.createProfile?.lastName}
              </strong>
            </div>

            <div>
              <span>Email</span>
              <strong>
                {userProfile.createProfile?.email}
              </strong>
            </div>

            <div>
              <span>Email Status</span>
              <strong>
                {userProfile.createProfile?.emailVerified
                  ? "Verified"
                  : "Not Verified"}
              </strong>
            </div>

          </div>

        </div>

        {/* Aadhaar */}

        <div className="summary-section">

          <h3>Aadhaar Details</h3>

          <div className="summary-grid">

            <div>
              <span>Aadhaar Number</span>
              <strong>
                {userProfile.kycDetails?.aadhaar?.aadhaarNumber}
              </strong>
            </div>

            <div>
              <span>Name</span>
              <strong>
                {userProfile.kycDetails?.aadhaar?.name}
              </strong>
            </div>

            <div>
              <span>Date of Birth</span>
              <strong>
                {userProfile.kycDetails?.aadhaar?.dateOfBirth}
              </strong>
            </div>

            <div>
              <span>Document</span>
              <strong>
                {userProfile.kycDetails?.aadhaar?.document || "Not uploaded"}
              </strong>
            </div>

          </div>

        </div>

        {/* PAN */}

        <div className="summary-section">

          <h3>PAN Details</h3>

          <div className="summary-grid">

            <div>
              <span>PAN Number</span>
              <strong>
                {userProfile.kycDetails?.pan?.panNumber}
              </strong>
            </div>

            <div>
              <span>Name</span>
              <strong>
                {userProfile.kycDetails?.pan?.name}
              </strong>
            </div>

            <div>
              <span>Document</span>
              <strong>
                {userProfile.kycDetails?.pan?.document || "Not uploaded"}
              </strong>
            </div>

          </div>

        </div>

        {/* GST */}

        <div className="summary-section">

          <h3>GST Details</h3>

          <div className="summary-grid">

            <div>
              <span>GST Number</span>
              <strong>
                {userProfile.gstDetails?.gstNumber}
              </strong>
            </div>

            <div>
              <span>Legal Name</span>
              <strong>
                {userProfile.gstDetails?.legalName}
              </strong>
            </div>

            <div>
              <span>Business Type</span>
              <strong>
                {userProfile.gstDetails?.businessType}
              </strong>
            </div>

            <div>
              <span>Registration Number</span>
              <strong>
                {userProfile.gstDetails?.registrationNumber}
              </strong>
            </div>

            <div className="full-width">
              <span>Business Address</span>
              <strong>
                {userProfile.gstDetails?.businessAddress}
              </strong>
            </div>

          </div>

        </div>

        {/* Bank */}

        <div className="summary-section">

          <h3>Bank Details</h3>

          <div className="summary-grid">

            <div>
              <span>Account Number</span>
              <strong>
                {userProfile.bankDetails?.accountNumber}
              </strong>
            </div>

            <div>
              <span>Account Holder Name</span>
              <strong>
                {userProfile.bankDetails?.holderName}
              </strong>
            </div>

            <div>
              <span>IFSC Code</span>
              <strong>
                {userProfile.bankDetails?.ifscCode}
              </strong>
            </div>

            <div className="full-width">
              <span>Branch Address</span>
              <strong>
                {userProfile.bankDetails?.branchAddress}
              </strong>
            </div>

          </div>

        </div>

        {/* Agreement */}

        <div className="summary-section">

          <h3>Agreement</h3>

          <div className="summary-grid">

            <div>
              <span>Agreement Status</span>

              <strong>
                {userProfile.agreement?.accepted
                  ? "Accepted"
                  : "Not Accepted"}
              </strong>
            </div>

          </div>

        </div>

        {/* Edit Button */}

        <div className="form-footer">

          <button
            type="button"
            className="save-button"
            onClick={() => setIsEditing(true)}
          >
            Edit Details
          </button>

        </div>

      </div>
    );
  }

  // --------------------------------
  // Edit Mode
  // --------------------------------

  return (
    <div className="form-card">

      <div className="form-header">

        <h2>Edit Profile Details</h2>

        <p>
          Update your profile information
        </p>

      </div>

      {/* Create Profile */}

      <div className="summary-section">

        <h3>Create Profile</h3>

        <div className="summary-grid">

          <div>
            <label>First Name</label>

            <input
              type="text"
              name="firstName"
              value={formData.createProfile.firstName}
              onChange={handleCreateProfileChange}
            />
          </div>

          <div>
            <label>Last Name</label>

            <input
              type="text"
              name="lastName"
              value={formData.createProfile.lastName}
              onChange={handleCreateProfileChange}
            />
          </div>

          <div className="full-width">

            <label>Email</label>

            <input
              type="email"
              value={formData.createProfile.email}
              disabled
            />

          </div>

        </div>

      </div>

      {/* Aadhaar */}

      <div className="summary-section">

        <h3>Aadhaar Details</h3>

        <div className="summary-grid">

          <div>

            <label>Aadhaar Number</label>

            <input
              type="text"
              name="aadhaarNumber"
              value={
                formData.kycDetails.aadhaar.aadhaarNumber
              }
              onChange={handleAadhaarChange}
              maxLength="12"
            />

          </div>

          <div>

            <label>Name</label>

            <input
              type="text"
              name="name"
              value={
                formData.kycDetails.aadhaar.name
              }
              onChange={handleAadhaarChange}
            />

          </div>

          <div>

            <label>Date of Birth</label>

            <input
              type="date"
              name="dateOfBirth"
              value={
                formData.kycDetails.aadhaar.dateOfBirth
              }
              onChange={handleAadhaarChange}
            />

          </div>

        </div>

      </div>

      {/* PAN */}

      <div className="summary-section">

        <h3>PAN Details</h3>

        <div className="summary-grid">

          <div>

            <label>PAN Number</label>

            <input
              type="text"
              name="panNumber"
              value={
                formData.kycDetails.pan.panNumber
              }
              onChange={handlePanChange}
              maxLength="10"
            />

          </div>

          <div>

            <label>Name</label>

            <input
              type="text"
              name="name"
              value={
                formData.kycDetails.pan.name
              }
              onChange={handlePanChange}
            />

          </div>

        </div>

      </div>

      {/* GST */}

      <div className="summary-section">

        <h3>GST Details</h3>

        <div className="summary-grid">

          <div>

            <label>GST Number</label>

            <input
              type="text"
              name="gstNumber"
              value={formData.gstDetails.gstNumber}
              onChange={handleGstChange}
              maxLength="15"
            />

          </div>

          <div>

            <label>Legal Name</label>

            <input
              type="text"
              name="legalName"
              value={formData.gstDetails.legalName}
              onChange={handleGstChange}
            />

          </div>

          <div>

            <label>Business Type</label>

            <select
              name="businessType"
              value={formData.gstDetails.businessType}
              onChange={handleGstChange}
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

          <div>

            <label>Registration Number</label>

            <input
              type="text"
              name="registrationNumber"
              value={
                formData.gstDetails.registrationNumber
              }
              onChange={handleGstChange}
            />

          </div>

          <div className="full-width">

            <label>Business Address</label>

            <textarea
              name="businessAddress"
              value={
                formData.gstDetails.businessAddress
              }
              onChange={handleGstChange}
              rows="4"
            />

          </div>

        </div>

      </div>

      {/* Bank */}

      <div className="summary-section">

        <h3>Bank Details</h3>

        <div className="summary-grid">

          <div>

            <label>Account Number</label>

            <input
              type="text"
              name="accountNumber"
              value={
                formData.bankDetails.accountNumber
              }
              onChange={handleBankChange}
            />

          </div>

          <div>

            <label>Account Holder Name</label>

            <input
              type="text"
              name="holderName"
              value={
                formData.bankDetails.holderName
              }
              onChange={handleBankChange}
            />

          </div>

          <div>

            <label>IFSC Code</label>

            <input
              type="text"
              name="ifscCode"
              value={
                formData.bankDetails.ifscCode
              }
              onChange={handleBankChange}
              maxLength="11"
            />

          </div>

          <div className="full-width">

            <label>Branch Address</label>

            <textarea
              name="branchAddress"
              value={
                formData.bankDetails.branchAddress
              }
              onChange={handleBankChange}
              rows="4"
            />

          </div>

        </div>

      </div>

      {/* Buttons */}

      <div className="form-footer">

        <button
          type="button"
          className="cancel-button"
          onClick={() => {
            setFormData(userProfile);
            setIsEditing(false);
          }}
        >
          Cancel
        </button>

        <button
          type="button"
          className="save-button"
          onClick={handleSubmit}
        >
          Submit
        </button>

      </div>

    </div>
  );
};

export default ProfileSummary;