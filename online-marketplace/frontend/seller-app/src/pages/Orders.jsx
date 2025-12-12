import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

function Orders() {
  const navigate = useNavigate();

  // Sample pending orders (same data as your PendingOrders page)
  const [pendingOrders] = useState([
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

  // Sample sold orders (same as your History page)
  const [soldOrders] = useState([
    {
      id: 1,
      product: "PlayStation 5",
      quantity: 2,
      buyer: "John Doe",
      price: 499,
      date: "2025-12-01",
      image: "https://i.imgur.com/PS5.jpg",
    },
    {
      id: 2,
      product: "Nintendo Switch",
      quantity: 1,
      buyer: "Jane Smith",
      price: 299,
      date: "2025-12-02",
      image: "https://i.imgur.com/NS.jpg",
    },
  ]);

  // Show only the first **2** recent items
  const recentPending = pendingOrders.slice(0, 2);
  const recentHistory = soldOrders.slice(0, 2);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: "20px", background: "#f7f7f7" }}>
        <BackButton />
        <h1>Orders Overview</h1>

        {/* ------------------ PENDING ORDERS PREVIEW ------------------ */}
        <div
          style={{
            marginTop: "30px",
            background: "#fff",
            borderRadius: "20px",
            padding: "20px",
            boxShadow: "0 14px 26px rgba(17, 24, 39, 0.1)",
            border: "1px solid #e5e7eb",
          }}
        >
          <h2>Pending Orders</h2>
          <p>Your most recent pending orders.</p>

          {recentPending.length === 0 && <p>No pending orders.</p>}

          <div style={{ marginTop: "20px", display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {recentPending.map((order) => (
              <div
                key={order.id}
                style={{
                  width: "220px",
                  background: "#fff",
                  borderRadius: "16px",
                  padding: "10px",
                  boxShadow: "0 10px 18px rgba(17, 24, 39, 0.08)",
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
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate("/pending-orders")}
            style={{
              marginTop: "20px",
              padding: "10px 18px",
              border: "none",
              borderRadius: "14px",
              background: "#007bff",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            View More
          </button>
        </div>

        {/* ------------------ SALES HISTORY PREVIEW ------------------ */}
        <div
          style={{
            marginTop: "40px",
            background: "#fff",
            borderRadius: "20px",
            padding: "20px",
            boxShadow: "0 14px 26px rgba(17, 24, 39, 0.1)",
            border: "1px solid #e5e7eb",
          }}
        >
          <h2>Sales History</h2>
          <p>Your latest completed orders.</p>

          {recentHistory.length === 0 && <p>No sales history yet.</p>}

          <div style={{ marginTop: "20px", display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {recentHistory.map((order) => (
              <div
                key={order.id}
                style={{
                  width: "220px",
                  background: "#fff",
                  borderRadius: "16px",
                  padding: "10px",
                  boxShadow: "0 10px 18px rgba(17, 24, 39, 0.08)",
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
                <p>Price: ${order.price.toFixed(2)}</p>
                <p>Total: ${(order.price * order.quantity).toFixed(2)}</p>
                <p>Date Sold: {order.date}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate("/history")}
            style={{
              marginTop: "20px",
              padding: "10px 18px",
              border: "none",
              borderRadius: "14px",
              background: "#28a745",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            View More
          </button>
        </div>
      </div>
    </div>
  );
}

export default Orders;
