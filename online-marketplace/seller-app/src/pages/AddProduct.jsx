import Sidebar from "../components/Sidebar";
import { useState } from "react";
import categories from "../utils/categories";


function AddProduct() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !category || !subcategory) return;

    const newProduct = {
      id: Date.now(),
      name,
      price: parseFloat(price).toFixed(2),
      category,
      subcategory,
    };

    setProducts([...products, newProduct]);
    setName("");
    setPrice("");
    setCategory("");
    setSubcategory("");
  };

  const selectedSubcategories = categories.find((c) => c.name === category)?.subcategories || [];

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px" }}>
        <h1>Add Product</h1>

        <form
          onSubmit={handleSubmit}
          style={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            maxWidth: "400px",
          }}
        >
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setSubcategory("");
            }}
            required
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            required
            disabled={!category}
          >
            <option value="">Select Subcategory</option>
            {selectedSubcategories.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>

          <button type="submit" style={{ background: "#007bff", color: "#fff", padding: "10px", border: "none", borderRadius: "5px" }}>
            Add Product
          </button>
        </form>

        {products.length > 0 && (
          <div style={{ marginTop: "30px" }}>
            <h2>Products Added</h2>
            <ul style={{ padding: 0, listStyle: "none" }}>
              {products.map((p) => (
                <li key={p.id} style={{ padding: "10px", marginBottom: "10px", background: "#f5f5f5", borderRadius: "5px" }}>
                  <strong>{p.name}</strong> - ${p.price} <br />
                  <em>{p.category} / {p.subcategory}</em>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddProduct;
