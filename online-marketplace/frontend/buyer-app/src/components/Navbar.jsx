import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#222", color: "white" }}>
      <Link to="/" style={{ marginRight: "20px", color: "white" }}>
        Home
      </Link>
      <Link to="/catalog" style={{ marginRight: "20px", color: "white" }}>
        Catalog
      </Link>
      <Link to="/cart" style={{ marginRight: "20px", color: "white" }}>
        Cart
      </Link>
      <Link to="/orders" style={{ marginRight: "20px", color: "white" }}>
        Orders
      </Link>
    </nav>
  );
}
