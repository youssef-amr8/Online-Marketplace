import Sidebar from "../components/Sidebar";
import { useState } from "react";
import OrdersFilterBar from "../components/OrdersFilterBar";
import BackButton from "../components/BackButton";


function History() {
  // Sample sold orders for frontend display
  const [soldOrders, setSoldOrders] = useState([
    {
      id: 1,
      product: "PlayStation 5",
      category: "Gaming",
      quantity: 2,
      buyer: "John Doe",
      price: 499,
      date: "2025-12-01",
      datePublished: "2025-11-20",
      image: "https://i.imgur.com/PS5.jpg",
    },
    {
      id: 2,
      product: "Nintendo Switch",
      category: "Gaming",
      quantity: 1,
      buyer: "Jane Smith",
      price: 299,
      date: "2025-12-02",
      datePublished: "2025-11-25",
      image: "https://i.imgur.com/NS.jpg",
    },
  ]);
  
  const [filteredOrders, setFilteredOrders] = useState(soldOrders);

  const applyFilters = (filters) => {
    let data = [...soldOrders];

    // By date sold
    if (filters.dateSold) {
      data = data.filter((o) => o.date === filters.dateSold);
    }

    // By date published
    if (filters.datePublished) {
      data = data.filter((o) => o.datePublished === filters.datePublished);
    }

    // Category
    if (filters.category.trim() !== "") {
      data = data.filter((o) =>
        o.category.toLowerCase().includes(filters.category.toLowerCase())
      );
    }

    // Price range
    if (filters.priceRange) {
      const [min, max] = filters.priceRange === "600+"
        ? [600, Infinity]
        : filters.priceRange.split("-").map(Number);

      data = data.filter((o) => o.price >= min && o.price <= max);
    }

    // Sorting
    if (filters.sort === "high-low") {
      data.sort((a, b) => b.price - a.price);
    } else if (filters.sort === "low-high") {
      data.sort((a, b) => a.price - b.price);
    } else if (filters.sort === "recent") {
      data.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    setFilteredOrders(data);
  };


  
return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: "20px", background: "#f7f7f7" }}>
        <BackButton />
        <OrdersFilterBar onFilterChange={applyFilters} showDateSold={true} />

        <h1>Sales History</h1>
        
        <div style={{
          marginTop: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "20px"
        }}>
          {filteredOrders.map((order) => (
            <div key={order.id} style={{
              width: "240px",
              background: "#fff",
              borderRadius: "18px",
              padding: "12px",
              boxShadow: "0 12px 22px rgba(17, 24, 39, 0.08)",
              textAlign: "left",
            }}>
              <img src={order.image} style={{
                width: "100%",
                height: "130px",
                objectFit: "cover",
                borderRadius: "6px"
              }} />

              <h3>{order.product}</h3>

              <p><b>Category:</b> {order.category}</p>
              <p><b>Quantity:</b> {order.quantity}</p>
              <p><b>Price:</b> ${order.price}</p>
              <p><b>Total:</b> ${(order.price * order.quantity).toFixed(2)}</p>
              <p><b>Buyer:</b> {order.buyer}</p>
              <p><b>Date Sold:</b> {order.date}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default History;