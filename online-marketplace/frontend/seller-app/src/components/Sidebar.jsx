import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Sidebar() {
  const location = useLocation();

  // Dropdown open/close
  const [openOrders, setOpenOrders] = useState(false);

  // TRUE when user is inside any orders-related page
  const insideOrders =
    location.pathname === "/orders" ||
    location.pathname === "/pending-orders" ||
    location.pathname === "/history";

  // Auto-open dropdown if user navigates inside orders pages
  useEffect(() => {
    if (insideOrders) setOpenOrders(true);
  }, [insideOrders]);

  const linkStyle = (path, isSub = false) => ({
    display: "block",
    padding: isSub ? "8px 15px" : "10px 15px",
    color: location.pathname === path ? "#fff" : "#ecf0f1",
    background: location.pathname === path ? "#007bff" : "transparent",
    textDecoration: "none",
    borderRadius: "5px",
    marginBottom: isSub ? "6px" : "10px",
  });

  return (
    <div
      style={{
        width: "220px",
        background: "#2c3e50",
        color: "#ecf0f1",
        padding: "20px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2 style={{ marginBottom: "30px" }}>Seller Menu</h2>

      <ul style={{ listStyle: "none", padding: 0 }}>

        <li>
          <Link to="/" style={linkStyle("/")}>Dashboard</Link>
        </li>

        <li>
          <Link to="/add-product" style={linkStyle("/add-product")}>Add Product</Link>
        </li>

        <li>
          <Link to="/your-listings" style={linkStyle("/your-listings")}>
            Your Listings
          </Link>
        </li>

        {/* ---------------- ORDERS DROPDOWN WITH ARROW ---------------- */}
        <li style={{ position: "relative" }}>

          {/* Orders main row */}
          <div
            style={{
              ...linkStyle("/orders"),
              background: insideOrders ? "#007bff" : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
          >
            {/* Clicking text navigates to Orders */}
            <Link
              to="/orders"
              style={{ color: "#fff", textDecoration: "none", flex: 1 }}
            >
              Orders
            </Link>

            {/* Arrow button */}
            <span
              onClick={(e) => {
                e.stopPropagation(); // Prevent navigating to /orders
                setOpenOrders(!openOrders);
              }}
              style={{
                cursor: "pointer",
                padding: "0 6px",
                userSelect: "none",
              }}
            >
              {openOrders ? "▼" : "▶"}
            </span>
          </div>

          {/* Dropdown */}
          {openOrders && (
            <ul style={{ listStyle: "none", paddingLeft: "20px", marginTop: "10px" }}>
              <li>
                <Link
                  to="/pending-orders"
                  style={linkStyle("/pending-orders", true)}
                >
                  Pending Orders
                </Link>
              </li>

              <li>
                <Link
                  to="/history"
                  style={linkStyle("/history", true)}
                >
                  History
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
