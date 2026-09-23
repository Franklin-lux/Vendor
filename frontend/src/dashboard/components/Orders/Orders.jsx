import { useNavigate } from "react-router-dom";
import Topbar from "../Topbar/Topbar";
import { getOrders } from "../../utils/db";
import "../Order/Order.css";
import "./Orders.css";

export default function Orders() {
  const navigate = useNavigate();
  const orders = getOrders();

  const currency = (n) => `₹${n.toLocaleString("en-IN")}`;

  return (
    <div className="order-page">
      <Topbar />
      <div className="order-body">
        <div className="order-header-row">
          <div className="order-heading">
            <h1>Orders</h1>
          </div>
        </div>
        
        <div className="orders-list-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Order Date</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Total Amount</th>
                <th>Payment Status</th>
                <th>Order Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const grandTotal = order.payment.itemsTotal + order.payment.deliveryFee;
                const productName = order.items[0]?.name || "N/A";
                const totalQty = order.items.reduce((sum, item) => sum + item.qty, 0);
                
                // Assuming UPI/Card payments are Paid by default in this mock
                const paymentStatus = "Paid"; 

                return (
                  <tr key={order.id} onClick={() => navigate(`/dashboard/orders/${order.id}`)} style={{ cursor: 'pointer' }}>
                    <td>{order.id}</td>
                    <td>{order.placedOn}</td>
                    <td>{order.customer.name}</td>
                    <td>{productName}</td>
                    <td>{totalQty}</td>
                    <td>{currency(grandTotal)}</td>
                    <td>
                      <span style={{ color: "#14653f", fontWeight: 600 }}>{paymentStatus}</span>
                    </td>
                    <td>
                      <span className={`order-status-badge ${order.status === "Return Requested" || order.status === "Cancelled" ? "returned" : ""}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
