import Sidebar from "../components/Sidebar";
import { useState } from "react";
import BackButton from "../components/BackButton";

function YourListings() {
  // Temporary sample items — now including price
  const [products, setProducts] = useState([
    { id: 1, name: "Football", stock: 10, price: 25.99, image: "https://i.imgur.com/sf1.jpg" },
    { id: 2, name: "Basketball Shoes", stock: 5, price: 75.5, image: "https://i.imgur.com/523.jpg" },
    { id: 3, name: "Tennis Racket", stock: 8, price: 120.0, image: "https://i.imgur.com/UI1.jpg" },
  ]);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: "20px", background: "#f7f7f7" }}>
        <BackButton />
        <h1>Your Listings</h1>
        <p>These are all the products you currently have listed for sale.</p>

        <div style={{ marginTop: "20px", display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {products.map(product => (
            <div
              key={product.id}
              style={{
                width: "200px",
                background: "#fff",
                borderRadius: "18px",
                padding: "12px",
                boxShadow: "0 12px 22px rgba(17, 24, 39, 0.08)",
                textAlign: "center"
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{ width: "100%", height: "130px", objectFit: "cover", borderRadius: "6px" }}
              />
              <h3 style={{ marginTop: "10px" }}>{product.name}</h3>
              <p style={{ fontSize: "14px" }}>Price: ${product.price.toFixed(2)}</p>
              <p style={{ fontSize: "14px" }}>Available: {product.stock}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default YourListings;
