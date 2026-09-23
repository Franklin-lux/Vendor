import { Link, useLocation } from "react-router-dom";
import {
  LayoutGrid,
  Home,
  BarChart3,
  ClipboardList,
  Diamond,
  Minus,
  IndianRupee,
  TrendingUp,
  Square,
  Settings,
  LogOut,
} from "lucide-react";
import "./Sidebar.css";

const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "sales", label: "Sales", icon: BarChart3 },
  { id: "orders", label: "Orders", icon: ClipboardList },
  { id: "products", label: "Products", icon: Diamond },
  { id: "inventory", label: "Inventory", icon: Minus },
  { id: "earnings", label: "Earnings", icon: IndianRupee },
  { id: "performance", label: "Performance", icon: TrendingUp },
  { id: "messages", label: "Messages", icon: Square },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-brand">
          <div className="sidebar-brand-row">
            <LayoutGrid size={17} />
            <span className="sidebar-brand-name">cityspace</span>
          </div>
          <p className="sidebar-brand-sub">VENDOR PORTAL</p>
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const expectedPath = `/dashboard/${item.id}`;
            const isActive = currentPath === expectedPath || currentPath.startsWith(`${expectedPath}/`);
            return (
              <Link
                key={item.id}
                to={expectedPath}
                className={`sidebar-nav-item${isActive ? " active" : ""}`}
                style={{ textDecoration: "none" }}
              >
                <Icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="sidebar-footer">
        <p className="sidebar-tagline">{"Local businesses.\nStronger Chennai."}</p>
        <hr className="sidebar-divider" />
        <button className="sidebar-logout">
          <LogOut size={15} />
          Logout
        </button>
      </div>
    </aside>
  );
}
