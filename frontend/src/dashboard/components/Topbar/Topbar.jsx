import { useNavigate } from "react-router-dom";
import "./Topbar.css";

export default function Topbar({
  title = "Vendor Dashboard",
  user = { name: "Vikram Kumar", store: "The Local Store", initials: "VK" },
}) {
  const navigate = useNavigate();

  return (
    <div className="topbar">
      <div className="topbar-title">{title}</div>
      <div className="topbar-right">
        <span className="topbar-notif">Notifications</span>
        <div 
          className="topbar-user" 
          onClick={() => navigate("/profile")}
          style={{ cursor: "pointer" }}
        >
          <div className="topbar-avatar">{user.initials}</div>
          <div>
            <div className="topbar-user-name">{user.name}</div>
            <div className="topbar-user-sub">{user.store}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
