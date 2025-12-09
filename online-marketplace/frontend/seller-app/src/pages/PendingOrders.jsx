import Sidebar from "../components/Sidebar";
import { useState } from "react";

function PendingOrders() {
  // Sample pending orders
  const [pendingOrders, setPendingOrders] = useState([
    {
      id: 1,
      product: "Football",
      quantity: 2,
      buyer: "John Doe",
      image: "https://i.imgur.com/sf1.jpg",
    },
    {
      id: 2,
      product: "Basketball Shoes",
      quantity: 1,
      buyer: "Jane Smith",
      image: "https://i.imgur.com/523.jpg",
    },
  ]);

  // Optional: handle order cancellation
  const cancelOrder = (orderId) => {
    const orderToCancel = pendingOrders.find((o) => o.id === orderId);
    if (!orderToCancel) return;

    // Remove order from pending
    setPendingOrders(pendingOrders.filter((o) => o.id !== orderId));

    // Here you can also increase product stock in YourListings
    // This requires lifting state or using global state/context
    alert(`Order for ${orderToCancel.product} cancelled. Stock should be updated.`);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: "20px", background: "#f7f7f7" }}>
        <h1>Pending Orders</h1>
        <p>These are all the orders that have been placed but not delivered yet.</p>

        <div style={{ marginTop: "20px", display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {pendingOrders.length === 0 && <p>No pending orders at the moment.</p>}

          {pendingOrders.map((order) => (
            <div
              key={order.id}
              style={{
                width: "220px",
                background: "#fff",
                borderRadius: "10px",
                padding: "10px",
                boxShadow: "0 0 5px rgba(0,0,0,0.1)",
                textAlign: "center",
              }}
            >
              <img
                src={order.image}
                alt={order.product}
                style={{ width: "100%", height: "130px", objectFit: "cover", borderRadius: "6px" }}
              />
              <h3 style={{ marginTop: "10px" }}>{order.product}</h3>
              <p>Quantity: {order.quantity}</p>
              <p>Buyer: {order.buyer}</p>
              <button
                onClick={() => cancelOrder(order.id)}
                style={{
                  marginTop: "10px",
                  padding: "6px 12px",
                  borderRadius: "5px",
                  border: "none",
                  background: "#dc3545",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Cancel Order
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PendingOrders;
