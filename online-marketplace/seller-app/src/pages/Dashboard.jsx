import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";

function Dashboard() {
  // Example data
  const recentOrders = [
    { id: 1, product: "Tennis Racket", customer: "John Doe", amount: "$120", status: "Shipped" },
    { id: 2, product: "Tennis Balls", customer: "Jane Smith", amount: "$30", status: "Pending" },
    { id: 3, product: "Shoes", customer: "Mike Brown", amount: "$80", status: "Delivered" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px", background: "#f9f9f9" }}>
        <h1>Seller Dashboard</h1>
        <p>Welcome to your seller dashboard!</p>

        {/* Top Stats */}
        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          <div style={{ padding: "20px", background: "#fff", flex: 1, borderRadius: "8px", boxShadow: "0 0 5px rgba(0,0,0,0.1)" }}>
            <h2>Products</h2>
            <p>10</p>
          </div>
          <div style={{ padding: "20px", background: "#fff", flex: 1, borderRadius: "8px", boxShadow: "0 0 5px rgba(0,0,0,0.1)" }}>
            <h2>Orders</h2>
            <p>5</p>
          </div>
          <div style={{ padding: "20px", background: "#fff", flex: 1, borderRadius: "8px", boxShadow: "0 0 5px rgba(0,0,0,0.1)" }}>
            <h2>Revenue</h2>
            <p>$200</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ marginTop: "30px" }}>
          <h2>Quick Actions</h2>
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <Link to="/add-product">
              <button style={{ padding: "10px 20px", borderRadius: "5px", border: "none", background: "#007bff", color: "#fff", cursor: "pointer" }}>
                Add Product
              </button>
            </Link>
            <Link to="/orders">
              <button style={{ padding: "10px 20px", borderRadius: "5px", border: "none", background: "#28a745", color: "#fff", cursor: "pointer" }}>
                View Orders
              </button>
            </Link>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div style={{ marginTop: "30px" }}>
          <h2>Recent Orders</h2>
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
            <thead>
              <tr style={{ background: "#eee" }}>
                <th style={{ padding: "10px", textAlign: "left" }}>Order ID</th>
                <th style={{ padding: "10px", textAlign: "left" }}>Product</th>
                <th style={{ padding: "10px", textAlign: "left" }}>Customer</th>
                <th style={{ padding: "10px", textAlign: "left" }}>Amount</th>
                <th style={{ padding: "10px", textAlign: "left" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: "10px" }}>{order.id}</td>
                  <td style={{ padding: "10px" }}>{order.product}</td>
                  <td style={{ padding: "10px" }}>{order.customer}</td>
                  <td style={{ padding: "10px" }}>{order.amount}</td>
                  <td style={{ padding: "10px" }}>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Placeholder for Charts (Optional) */}
        <div style={{ marginTop: "30px" }}>
          <h2>Sales Overview</h2>
          <div style={{ height: "200px", background: "#fff", borderRadius: "8px", boxShadow: "0 0 5px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#999" }}>
            Chart placeholder
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
