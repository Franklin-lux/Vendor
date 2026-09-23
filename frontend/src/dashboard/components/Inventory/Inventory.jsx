import Topbar from "../Topbar/Topbar";

export default function Inventory() {
  return (
    <div className="order-page" style={{ height: "100%", flex: 1, overflowY: "auto", background: "#f4f2ee", fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      <Topbar />
      <div style={{ padding: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#17301f", margin: "0 0 4px" }}>Inventory</h1>
        
      </div>
    </div>
  );
}


