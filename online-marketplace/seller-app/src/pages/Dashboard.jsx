import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="dashboard-header">
        <h1>Seller Dashboard</h1>
        <button 
          className="btn-sell"
          onClick={() => navigate("/add-product")}
        >
          Sell +
        </button>
      </div>

      <p>Welcome! Manage your products & orders.</p>
    </div>
  );
}
