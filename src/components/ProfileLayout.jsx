import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./ProfileLayout.css";

const ProfileLayout = () => {
  return (
    <div className="profile-page">

      {/* Main Green Area */}

      <div className="profile-container">

        <div className="profile-wrapper">

          {/* =========================
              LEFT SIDE - FIXED
          ========================= */}

          <div className="steps-card">

            <h2>Profile setup</h2>

            <p className="steps-description">
              Complete the following steps
            </p>


            <div className="steps-list">

              <NavLink
                to="/create-profile"
                className="step-link"
              >
                <span className="step-number">
                  01
                </span>

                <span>
                  Create Profile
                </span>
              </NavLink>


              <NavLink
                to="/kyc-details"
                className="step-link"
              >
                <span className="step-number">
                  02
                </span>

                <span>
                  Aadhaar & PAN Details
                </span>
              </NavLink>


              <NavLink
                to="/gst-details"
                className="step-link"
              >
                <span className="step-number">
                  03
                </span>

                <span>
                  GST Details
                </span>
              </NavLink>


              <NavLink
                to="/bank-details"
                className="step-link"
              >
                <span className="step-number">
                  04
                </span>

                <span>
                  Bank Details
                </span>
              </NavLink>


              <NavLink
                to="/agreement"
                className="step-link"
              >
                <span className="step-number">
                  05
                </span>

                <span>
                  Agreement
                </span>
              </NavLink>

            </div>

          </div>


          {/* =========================
              RIGHT SIDE - CHANGES
          ========================= */}

          <div className="right-content">

            <Outlet />

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProfileLayout;