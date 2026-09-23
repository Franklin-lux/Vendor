import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Order.css";
import Topbar from "../Topbar/Topbar";
import { getOrders, updateOrder } from "../../utils/db";
import { FiCheck, FiArrowLeft } from "react-icons/fi";

const currency = (n) => `₹${n.toLocaleString("en-IN")}`;

const steps = ["View", "Process", "Ship", "Complete"];

export default function OrderView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const orders = getOrders();
  const order = orders.find(o => o.id === id);

  const [orderStatus, setOrderStatus] = useState(order?.status || "");
  const [currentStep, setCurrentStep] = useState(0);
  const [cancelReason, setCancelReason] = useState("");
  const [cancelNotes, setCancelNotes] = useState("");

  if (!order) {
    return (
      <div className="order-page">
        <Topbar />
        <div style={{ padding: 28 }}>Order not found</div>
      </div>
    );
  }


  const subtotal = order.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const grandTotal = order.payment.itemsTotal + order.payment.deliveryFee;

  const handleAccept = () => {
    setOrderStatus("Processing");
    order.status = "Processing";
    updateOrder(order);
    setCurrentStep(1);
  };

  const handleContact = () => {
    window.location.href = `mailto:${order.customer.email}?subject=Regarding Order #${order.id}`;
  };

  const handleCancel = () => {
    setCurrentStep(-1);
  };

  const handleConfirmCancel = () => {
    setOrderStatus("Cancelled");
    order.status = "Cancelled";
    updateOrder(order);
    setCurrentStep(0);
  };

  const handleBack = () => {
    if (currentStep === -1 || currentStep === 1) {
      setCurrentStep(0);
      // We don't revert order.status here because we want changes to persist in the mock db
    } else if (currentStep === 2) {
      setCurrentStep(1);
      setOrderStatus("Processing");
      order.status = "Processing";
      updateOrder(order);
    } else if (currentStep === 3) {
      setCurrentStep(2);
      setOrderStatus("Ready to Ship");
      order.status = "Ready to Ship";
      updateOrder(order);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="order-page">
      <div className="print-header">cityspace</div>
      <Topbar />

      <div className="order-body">
        <button className="btn-back" onClick={handleBack}>
          <FiArrowLeft size={16} />
          <span>Back</span>
        </button>
      
        <div className="order-header-row">
          <div className="order-heading">
            <h1>
              {currentStep === -1 && "Cancel Order"}
              {currentStep === 0 && orderStatus === "Cancelled" && "Cancelled Order"}
              {currentStep === 0 && orderStatus !== "Cancelled" && "View Order"}
              {currentStep === 1 && "Process Order"}
              {currentStep === 2 && "Ship Order"}
              {currentStep === 3 && "Complete"}
            </h1>
            <p>
              {currentStep === -1 && "Cancel this order and notify the customer."}
              {currentStep === 0 && orderStatus === "Cancelled" && "This order has been cancelled and cannot be processed further."}
              {currentStep === 0 && orderStatus !== "Cancelled" && "Review complete order, customer and payment information."}
              {currentStep === 1 && "Confirm items, prepare the package and move the order forward."}
              {currentStep === 2 && "Add courier and tracking details before dispatch."}
              {currentStep === 3 && "Order completed."}
            </p>
          </div>
          <div className="order-stepper">
            {steps.map((step, i) => {
              const isCompleted = currentStep === -1 ? i < 3 : i < currentStep;
              return (
                <span key={step} style={{ display: "flex", alignItems: "center" }}>
                  <span className={`order-step${i === currentStep ? " active" : ""}${isCompleted ? " completed" : ""}`}>
                    {isCompleted && <FiCheck size={12} />}
                    {step}
                  </span>
                  {i < steps.length - 1 && <span className={`order-step-line${isCompleted ? " completed" : ""}`} />}
                </span>
              );
            })}
          </div>
        </div>

        <div className="order-card order-summary-card">
          <div>
            <div className="order-summary-id">Order #{order.id}</div>
            <div className="order-summary-date">Placed on {order.placedOn}</div>
          </div>
          <div>
            <div className="order-summary-label">Customer</div>
            <div className="order-summary-value">{order.customer.name}</div>
          </div>
          <div>
            <div className="order-summary-label">Total Amount</div>
            <div className="order-summary-amount">{currency(grandTotal)}</div>
          </div>
          <div>
            <div className="order-summary-label">Status</div>
            <span className={`order-status-badge ${orderStatus === "Return Requested" || orderStatus === "Cancelled" ? "returned" : ""}`}>{orderStatus}</span>
          </div>
          <div className="order-summary-actions hide-on-print">
            <button className="btn-primary" onClick={() => window.print()}>Print Invoice</button>
          </div>
        </div>

        <div className="order-grid">
          <div className="order-card">
            <div className="order-card-title">Order Items</div>
            {order.items.map((item) => (
              <div className="order-item-row" key={item.sku}>
                <img src={item.image} alt={item.name} className="order-item-thumb" />
                <div style={{ flex: 1 }}>
                  <div className="order-item-name">{item.name}</div>
                  <div className="order-item-meta">{item.meta}</div>
                  <div className="order-item-meta">{item.sku}</div>
                </div>
                <div className="order-item-qty">Qty {item.qty}</div>
                <div className="order-item-price">{currency(item.price)}</div>
              </div>
            ))}
            <div className="order-subtotal-row">
              <span>Subtotal</span>
              <strong>{currency(subtotal)}</strong>
            </div>
          </div>

          <div className="order-card">
            <div className="order-card-title">Customer & Delivery</div>
            <div className="order-customer-body">
              <div className="order-customer-name">{order.customer.name}</div>
              <div className="order-customer-line">{order.customer.phone}</div>
              <div className="order-customer-line">{order.customer.email}</div>
              <hr className="order-divider" />
              <div className="order-address-label">Delivery Address</div>
              <div className="order-address-text">{order.customer.address}</div>
            </div>
          </div>
        </div>

        {currentStep === -1 && (
          <div className="order-grid" style={{ marginTop: 18 }}>
            <div className="order-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="order-card-title">Cancellation Details</div>
              <div className="shipping-form-body" style={{ flex: 1 }}>
                <div className="form-group-row">
                  <div className="form-group" style={{ width: '100%' }}>
                    <label>Reason for Cancellation</label>
                    <input type="text" className="form-control" placeholder="" value={cancelReason} onChange={(e) => setCancelReason(e.target.value)} />
                  </div>
                </div>
                <div className="form-group-row" style={{ marginTop: '15px' }}>
                  <div className="form-group" style={{ width: '100%' }}>
                    <label>Additional Notes</label>
                    <textarea className="form-control" rows="3" placeholder="Add a note for the customer..." value={cancelNotes} onChange={(e) => setCancelNotes(e.target.value)}></textarea>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="order-card-title">Refund Summary</div>
              <div className="refund-summary-body" style={{ flex: 1, height: 'auto' }}>
                <div className="refund-row">
                  <div className="refund-label">Refund amount</div>
                  <div className="refund-value">{currency(grandTotal)}</div>
                </div>
                <div className="refund-row">
                  <div className="refund-label">Refund method</div>
                  <div className="refund-value">Original UPI</div>
                </div>
                <div className="refund-actions">
                  <button className="btn btn-reject" style={{ background: '#c23b3b', color: '#fff', border: 'none' }} onClick={handleConfirmCancel}>Confirm Cancellation</button>
                  <button className="btn btn-contact" onClick={handleBack}>Keep Order</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 0 && (
          <div className="order-grid" style={{ marginTop: 18 }}>
            <div className="order-card">
              <div className="order-card-title">Payment Summary</div>
              <div className="order-payment-row">
                <span>Payment method</span>
                <span>{order.payment.method}</span>
              </div>
              <div className="order-payment-row">
                <span>Items total</span>
                <span>{currency(order.payment.itemsTotal)}</span>
              </div>
              <div className="order-payment-row">
                <span>Delivery fee</span>
                <span>{currency(order.payment.deliveryFee)}</span>
              </div>
              <div className="order-payment-row">
                <span>Grand total</span>
                <span>{currency(grandTotal)}</span>
              </div>
            </div>

            {orderStatus !== "Cancelled" && (
              <div className="order-card hide-on-print">
                <div className="order-card-title">Order Actions</div>
                <div className="order-actions-body">
                  <button className="btn btn-accept" onClick={handleAccept}>Accept &amp; Process Order</button>
                  <button className="btn btn-contact" onClick={handleContact}>Contact Customer</button>
                  <button className="btn btn-cancel" onClick={handleCancel}>Cancel Order</button>
                </div>
              </div>
            )}
            
            {orderStatus === "Cancelled" && (
              <div className="order-card hide-on-print">
                <div className="order-card-title">Cancellation Info</div>
                <div className="return-request-body" style={{ padding: '18px 20px' }}>
                  <div className="return-field">
                    <label>Reason</label>
                    <div className="return-field-box">{cancelReason || "Not provided"}</div>
                  </div>
                  <div className="return-field" style={{ marginTop: 15 }}>
                    <label>Notes</label>
                    <div className="return-field-box">{cancelNotes || "None"}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {currentStep === 1 && (
          <div style={{ marginTop: 18 }}>
            <div className="order-card">
              <div className="order-card-title">Preparation Checklist</div>
              <div className="checklist-body">
                <div className="checklist-item">
                  <div className="checklist-left">
                    <div className="checklist-icon done"><FiCheck size={14} /></div>
                    <div className="checklist-label">Order accepted</div>
                  </div>
                  <div className="checklist-meta">09 Sep, 10:50 AM</div>
                </div>
                <div className="checklist-item">
                  <div className="checklist-left">
                    <div className="checklist-icon done"><FiCheck size={14} /></div>
                    <div className="checklist-label">Item quality checked</div>
                  </div>
                  <div className="checklist-meta">09 Sep, 11:05 AM</div>
                </div>
                <div className="checklist-item">
                  <div className="checklist-left">
                    <div className="checklist-icon pending">3</div>
                    <div className="checklist-label" style={{ color: "#6b6b6b" }}>Package securely</div>
                  </div>
                  <div className="checklist-meta">Mark when packed</div>
                </div>
                <div className="checklist-item">
                  <div className="checklist-left">
                    <div className="checklist-icon pending">4</div>
                    <div className="checklist-label" style={{ color: "#6b6b6b" }}>Invoice attached</div>
                  </div>
                  <div className="checklist-meta">Complete before shipping</div>
                </div>
                <div className="checklist-actions">
                  <button className="btn-primary" onClick={() => {
                    setOrderStatus("Ready to Ship");
                    order.status = "Ready to Ship";
                    updateOrder(order);
                    setCurrentStep(2);
                  }}>Mark Ready to Ship &rarr;</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="order-grid" style={{ marginTop: 18 }}>
            <div className="order-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="order-card-title">Shipping Information</div>
              <div className="shipping-form-body" style={{ flex: 1 }}>
                <div className="form-group-row">
                  <div className="form-group">
                    <label>Courier Partner</label>
                    <select className="form-control">
                      <option>Delivery</option>
                      <option>BlueDart</option>
                      <option>DTDC</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Tracking ID</label>
                    <input type="text" className="form-control" defaultValue="DLVY209874512" />
                  </div>
                </div>
                <div className="form-group-row">
                  <div className="form-group">
                    <label>Pickup date</label>
                    <input type="text" className="form-control" defaultValue="10 Sep 2026" />
                  </div>
                  <div className="form-group">
                    <label>Estimated delivery</label>
                    <input type="text" className="form-control" defaultValue="12 Sep 2026" />
                  </div>
                </div>
              </div>
            </div>

            <div className="order-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="order-card-title">Dispatch Summary</div>
              <div className="dispatch-summary-body" style={{ flex: 1, height: 'auto' }}>
                <div className="dispatch-block">
                  <div className="dispatch-label">Pickup from</div>
                  <div className="dispatch-text">The Local Store, Alwarpet</div>
                </div>
                <div className="dispatch-block">
                  <div className="dispatch-label">Deliver to</div>
                  <div className="dispatch-text">{order.customer.name}, Chennai</div>
                </div>
                <div className="dispatch-actions">
                  <button className="btn-primary" style={{ width: '100%' }} onClick={() => {
                    setOrderStatus("Dispatched");
                    order.status = "Dispatched";
                    updateOrder(order);
                    setCurrentStep(3);
                  }}>Confirm Dispatch &rarr;</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
