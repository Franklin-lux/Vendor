import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Agreement = () => {
  const navigate = useNavigate();

  const [accepted, setAccepted] = useState(false);
  const [hasScrolledToEnd, setHasScrolledToEnd] = useState(false);

  const handleScroll = (e) => {
    const element = e.target;

    const isAtBottom =
      element.scrollHeight - element.scrollTop <=
      element.clientHeight + 5;

    if (isAtBottom) {
      setHasScrolledToEnd(true);
    }
  };

  const handleSubmit = () => {
    if (!hasScrolledToEnd) {
      alert("Please scroll to the end of the agreement");
      return;
    }

    if (!accepted) {
      alert("Please accept the terms and conditions");
      return;
    }

    fetch("http://localhost:5000/userProfile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        agreement: {
          accepted: true
        }
      })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save agreement");
        }

        return response.json();
      })
      .then(() => {
        // Go to Profile Summary
        navigate("/profile-summary");
      })
      .catch((error) => {
        console.log(error);
        alert("Error saving agreement");
      });
  };

  return (
    <div className="form-card">

      <div className="form-header">
        <h2>Agreement</h2>

        <p>
          Please read the terms and conditions carefully
        </p>
      </div>

      <div className="agreement-container">

        <div
          className="agreement-content"
          onScroll={handleScroll}
        >
          <h3>Terms and Conditions</h3>

          <p>
            Welcome to our platform. By creating and maintaining
            your vendor profile, you agree to comply with the terms
            and conditions mentioned below.
          </p>

          <h4>1. Vendor Information</h4>

          <p>
            The vendor is responsible for providing accurate and
            complete information during profile registration. All
            personal, business, bank and identification details
            provided must be correct and up to date.
          </p>

          <h4>2. Account Information</h4>

          <p>
            The vendor is responsible for maintaining the
            confidentiality of the information associated with the
            account.
          </p>

          <h4>3. Aadhaar and PAN Details</h4>

          <p>
            The vendor confirms that the Aadhaar and PAN details
            submitted during registration belong to the vendor and
            are provided for verification purposes.
          </p>

          <h4>4. GST Information</h4>

          <p>
            The vendor is responsible for providing valid GST and
            business registration information.
          </p>

          <h4>5. Bank Details</h4>

          <p>
            The vendor confirms that the bank account details
            provided are accurate and belong to the vendor or
            authorized business entity.
          </p>

          <h4>6. Documents</h4>

          <p>
            All documents uploaded by the vendor must be genuine,
            valid and readable.
          </p>

          <h4>7. Accuracy of Information</h4>

          <p>
            The vendor agrees that all information submitted during
            registration is accurate and complete.
          </p>

          <h4>8. Changes to Information</h4>

          <p>
            If any submitted information changes, the vendor is
            responsible for updating the information.
          </p>

          <h4>9. Platform Usage</h4>

          <p>
            The vendor agrees to use the platform only for
            legitimate business activities.
          </p>

          <h4>10. Acceptance</h4>

          <p>
            By accepting these terms and conditions, the vendor
            confirms that the information provided during
            registration is accurate and agrees to comply with the
            applicable terms and conditions.
          </p>

          <p>
            Please review all the information carefully before
            submitting your agreement.
          </p>

        </div>

        <div className="agreement-check">

          <input
            type="checkbox"
            id="agreement"
            checked={accepted}
            disabled={!hasScrolledToEnd}
            onChange={(e) => setAccepted(e.target.checked)}
          />

          <label htmlFor="agreement">
            {hasScrolledToEnd
              ? "I have read and agree to the terms and conditions"
              : "Please scroll to the end to accept the terms and conditions"}
          </label>

        </div>

      </div>

      <div className="form-footer">

        <button
          type="button"
          className="save-button"
          onClick={handleSubmit}
          disabled={!hasScrolledToEnd || !accepted}
        >
          Submit Agreement
        </button>

      </div>

    </div>
  );
};

export default Agreement;