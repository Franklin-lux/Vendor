import initialDb from "../../../public/data/db.json";

export const getOrders = () => {
  // Always start with fresh data from db.json so manual edits reflect immediately
  const orders = JSON.parse(JSON.stringify(initialDb.orders));

  // Load saved statuses from localStorage to persist UI progress
  const storedStatuses = localStorage.getItem("cityspace_order_statuses");
  if (storedStatuses) {
    const statuses = JSON.parse(storedStatuses);
    orders.forEach(order => {
      if (statuses[order.id]) {
        order.status = statuses[order.id];
      }
    });
  }

  return orders;
};

export const updateOrder = (updatedOrder) => {
  const storedStatuses = localStorage.getItem("cityspace_order_statuses");
  const statuses = storedStatuses ? JSON.parse(storedStatuses) : {};
  
  // Only save the status changes
  statuses[updatedOrder.id] = updatedOrder.status;
  localStorage.setItem("cityspace_order_statuses", JSON.stringify(statuses));
};
