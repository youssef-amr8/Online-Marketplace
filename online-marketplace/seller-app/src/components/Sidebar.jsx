import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation(); // to highlight active page

  const linkStyle = (path) => ({
    display: "block",
    padding: "10px 15px",
    color: location.pathname === path ? "#fff" : "#ecf0f1",
    background: location.pathname === path ? "#007bff" : "transparent",
    textDecoration: "none",
    borderRadius: "5px",
    marginBottom: "10px",
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
          <Link to="/" style={linkStyle("/")}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/add-product" style={linkStyle("/add-product")}>
            Add Product
          </Link>
        </li>
        <li>
          <Link to="/orders" style={linkStyle("/orders")}>
            Orders
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
