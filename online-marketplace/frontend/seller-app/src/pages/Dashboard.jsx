import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  // Temporary frontend values — dynamic later with backend
  const [stats] = useState({
    totalProducts: 12,
    pendingOrders: 5,
    salesCompleted: 48,
    revenue: 2350, // You can remove if not needed
  });

  const [recentSales] = useState([
    { id: 1, product: "Gaming Mouse", buyer: "Omar Khaled", amount: 45 },
    { id: 2, product: "PS5 Controller", buyer: "Laila Samir", amount: 60 },
    { id: 3, product: "Nintendo Switch Case", buyer: "Youssef Ali", amount: 22 },
    { id: 4, product: "Gaming Headset", buyer: "Mona Adel", amount: 80 },
  ]);

  return (
    <div style={{ display: "flex", background: "#f5f7fa", minHeight: "100vh" }}>
      <Sidebar />

      <div style={{ padding: "30px", flex: 1 }}>
        <h1>Dashboard</h1>
        <p>Overview of your store performance.</p>

        {/* --- Stats Cards --- */}
        <div style={{ display: "flex", gap: "20px", marginTop: "20px", flexWrap: "wrap" }}>
          {[
            { label: "Total Listings", value: stats.totalProducts },
            { label: "Pending Orders", value: stats.pendingOrders },
            { label: "Sales Completed", value: stats.salesCompleted },
            { label: "Revenue", value: "$" + stats.revenue.toLocaleString() }
          ].map((card, index) => (
            <div key={index}
              style={{
                background: "#fff",
                padding: "25px",
                borderRadius: "10px",
                width: "220px",
                textAlign: "center",
                boxShadow: "0 0 6px rgba(0,0,0,0.08)",
              }}
            >
              <h2 style={{ marginBottom: "10px", color: "#007bff" }}>{card.value}</h2>
              <p style={{ fontWeight: "bold" }}>{card.label}</p>
            </div>
          ))}
        </div>

        {/* --- Quick Action Buttons --- */}
        <h2 style={{ marginTop: "40px" }}>Quick Actions</h2>
        <div style={{ display: "flex", gap: "20px", marginTop: "15px", flexWrap: "wrap" }}>
          <Link to="/add-product" style={buttonStyle}>➕ Add Product</Link>
          <Link to="/your-listings" style={buttonStyle}>📦 Your Listings</Link>
          <Link to="/pending-orders" style={buttonStyle}>🕒 Pending Orders</Link>
          <Link to="/history" style={buttonStyle}>📜 Sales History</Link>
        </div>

        {/* --- Recent Sales Section --- */}
        <h2 style={{ marginTop: "50px" }}>Recent Sales</h2>
        <div style={{ background: "#fff", marginTop: "10px", padding: "20px", borderRadius: "10px", boxShadow: "0 0 6px rgba(0,0,0,0.08)" }}>
          {recentSales.length === 0 ? (
            <p>No recent sales.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ textAlign: "left", borderBottom: "2px solid #e1e1e1" }}>
                  <th>Product</th>
                  <th>Buyer</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentSales.map((sale) => (
                  <tr key={sale.id} style={{ borderBottom: "1px solid #eee" }}>
                    <td>{sale.product}</td>
                    <td>{sale.buyer}</td>
                    <td>${sale.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

// Shared button style
const buttonStyle = {
  background: "#007bff",
  padding: "12px 18px",
  borderRadius: "8px",
  color: "white",
  fontWeight: "bold",
  textDecoration: "none",
  display: "inline-block"
};

export default Dashboard;
