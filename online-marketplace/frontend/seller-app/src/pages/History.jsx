import Sidebar from "../components/Sidebar";
import { useState } from "react";

function History() {
  // Sample sold orders for frontend display
  const [soldOrders, setSoldOrders] = useState([
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

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: "20px", background: "#f7f7f7" }}>
        <h1>Sales History</h1>
        <p>All products you have successfully sold are listed below.</p>

        {soldOrders.length === 0 && <p>No sales history yet.</p>}

        <div style={{ marginTop: "20px", display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {soldOrders.map((order) => (
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
              <p>Price: ${order.price.toFixed(2)}</p>
              <p>Total: ${(order.price * order.quantity).toFixed(2)}</p>
              <p>Date Sold: {order.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default History;
