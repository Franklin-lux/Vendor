import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Order from "./components/Order/Order";
import Orders from "./components/Orders/Orders";
import Overview from "./components/Overview/Overview";
import Sales from "./components/Sales/Sales";
import Products from "./components/Products/Products";
import Inventory from "./components/Inventory/Inventory";
import Earnings from "./components/Earnings/Earnings";
import Performance from "./components/Performance/Performance";
import Messages from "./components/Messages/Messages";
import Settings from "./components/Settings/Settings";
import VendorDashboard from "./components/VendorDashboard/VendorDashboard";

export default function DashboardApp() {
  return (
    <div className="app-container">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Navigate to="overview" replace />} />
        <Route path="profile" element={<VendorDashboard />} />
        <Route path="overview" element={<Overview />} />
        <Route path="sales" element={<Sales />} />
        <Route path="orders" element={<Orders />} />
        <Route path="orders/:id" element={<Order />} />
        <Route path="products" element={<Products />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="earnings" element={<Earnings />} />
        <Route path="performance" element={<Performance />} />
        <Route path="messages" element={<Messages />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </div>
  );
}
