import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import pic1 from "../../assets/pic1.png";
import {
  FiPackage,
  FiArchive,
  FiDollarSign,
  FiSettings,
  FiUser,
} from "react-icons/fi";
import Topbar from "../Topbar/Topbar";
import "./VendorDashboard.css"; 

export default function VendorDashboard() {
  const [vendorProfile, setVendorProfile] = useState(null);
  const [activeCategoryId, setActiveCategoryId] = useState("profile");
  const location = useLocation();
  const isDashboard = location.pathname === "/";

  // API call: Fetching the vendor profile data that was saved via vendor app
  useEffect(() => {
    fetch("http://localhost:5000/userProfile")
      .then((res) => res.json())
      .then((data) => {
        setVendorProfile(data);
      })
      .catch((err) => console.error("Error fetching vendor profile", err));
  }, []);

  const VENDOR = vendorProfile ? {
    name: vendorProfile.gstDetails?.legalName || "Cityspace",
    image: null, 
    gstNumber: vendorProfile.gstDetails?.gstNumber || "N/A",
    ownerName: `${vendorProfile.createProfile?.firstName || ''} ${vendorProfile.createProfile?.lastName || ''}`.trim() || "N/A",
    phone: vendorProfile.createProfile?.email || "N/A",
    address: vendorProfile.gstDetails?.businessAddress || "N/A",
    since: "Jan 2020",
  } : {
    name: "Loading...",
    image: null, 
    gstNumber: "...",
    ownerName: "...",
    phone: "...",
    address: "...",
    since: "...",
  };

  const CATEGORIES = [
    {
      id: "profile",
      label: "Profile",
      icon: FiUser,
      details: [
        { label: "Owner name", value: VENDOR.ownerName },
        { label: "GST number", value: VENDOR.gstNumber },
        { label: "Contact / Email", value: VENDOR.phone },
        { label: "Address", value: VENDOR.address },
        { label: "Vendor since", value: VENDOR.since },
      ],
    },
    {
      id: "orders",
      label: "Orders",
      icon: FiPackage,
      details: [
        { label: "Orders today", value: "12" },
        { label: "Orders this week", value: "58" },
        { label: "Pending shipment", value: "4" },
      ],
    },
    {
      id: "inventory",
      label: "Inventory",
      icon: FiArchive,
      details: [
        { label: "Products listed", value: "37" },
        { label: "Out of stock", value: "3" },
        { label: "Low stock alerts", value: "6" },
      ],
    },
    {
      id: "earnings",
      label: "Earnings",
      icon: FiDollarSign,
      details: [
        { label: "This month", value: "₹32,400" },
        { label: "Pending payouts", value: "₹4,250" },
        { label: "Last payout", value: "₹18,900" },
      ],
    },
    {
      id: "settings",
      label: "Settings",
      icon: FiSettings,
      details: [
        { label: "Shop name", value: VENDOR.name },
        { label: "Contact / Email", value: VENDOR.phone },
        { label: "Shop status", value: "Active" },
      ],
    },
  ];

  const activeCategory = CATEGORIES.find(c => c.id === activeCategoryId) || CATEGORIES[0];

  return (
    <div className="profile-screen">
      <Topbar />
      <header className={`profile-header ${isDashboard ? "centered" : ""}`}>
        <div className="profile-trigger">
          {VENDOR.image ? (
            <img className="profile-image" src={VENDOR.image} alt={VENDOR.name} />
          ) : (
            <div className="profile-image-fallback">
              <FiUser size={40} />
            </div>
          )}
          <span className="profile-name">{VENDOR.name}</span>
        </div>
      </header>

      <main className="profile-body">
        <div className="dashboard-layout">
          <div className="category-grid">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  className={`category-card ${
                    activeCategory?.id === cat.id ? "active" : ""
                  }`}
                  onClick={() => setActiveCategoryId(cat.id)}
                >
                  <Icon className="category-icon" />
                  <span className="category-label">{cat.label}</span>
                </button>
              );
            })}
          </div>

          <div className="details-panel">
            {activeCategory ? (
              <>
                <div className="details-panel-header">
                  <activeCategory.icon className="category-icon-large" />
                  <h3>{activeCategory.label}</h3>
                </div>
                <div className="details-panel-content">
                  {activeCategory.details.map((item, idx) => (
                    <div className="details-row" key={idx}>
                      <span className="details-row-label">{item.label}</span>
                      <span className="details-row-value">{item.value}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="details-placeholder">
                Select a category to view details
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
