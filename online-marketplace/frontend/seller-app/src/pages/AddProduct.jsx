import Sidebar from "../components/Sidebar";
import { useState } from "react";
import categories from "../utils/categories";
import BackButton from "../components/BackButton";

function AddProduct() {
  const [category, setCategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [addedProducts, setAddedProducts] = useState([]);
  const [activeSubcategory, setActiveSubcategory] = useState(null); // for modal/form

  // Form state
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(null);

  const selectedCategory = categories.find((c) => c.name === category);
  const subcategoriesList = selectedCategory?.subcategories || [];

  const openForm = (sub) => {
    setActiveSubcategory(sub);
    setProductName("");
    setPrice("");
    setStock("");
    setImage(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productName || !price || !stock) return;

    const newProduct = {
      id: Date.now(),
      category,
      subcategory: activeSubcategory.name,
      image: image ? URL.createObjectURL(image) : activeSubcategory.image,
      name: productName,
      price: parseFloat(price).toFixed(2),
      stock: parseInt(stock),
    };

    setAddedProducts([...addedProducts, newProduct]);
    setActiveSubcategory(null); // close form
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px" }}>
        <BackButton />
        <h1>Add Product</h1>

        {/* Category Buttons */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "20px" }}>
          {categories.map((c) => (
            <button
              key={c.name}
              onClick={() => setCategory(c.name)}
              style={{
                padding: "10px 15px",
                border: category === c.name ? "2px solid #007bff" : "1px solid #ccc",
                background: category === c.name ? "#e0f0ff" : "#fff",
                borderRadius: "14px",
                cursor: "pointer",
                boxShadow: category === c.name ? "0 8px 16px rgba(13,110,253,0.12)" : "0 4px 10px rgba(0,0,0,0.04)"
              }}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Subcategory Boxes */}
        {category && (
          <div style={{ marginTop: "30px" }}>
            <h2>{category}</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "10px" }}>
              {subcategoriesList.map((sub) => (
                <div
                  key={sub.name}
                  onClick={() => openForm(sub)}
                  style={{
                    width: "180px",
                    textAlign: "center",
                    border: "1px solid #ccc",
                    borderRadius: "16px",
                    padding: "10px",
                    cursor: "pointer",
                    boxShadow: "0 10px 18px rgba(17, 24, 39, 0.08)",
                    background: "#fff"
                  }}
                >
                  <img
                    src={sub.image}
                    alt={sub.name}
                    style={{ width: "100%", height: "120px", objectFit: "cover", marginBottom: "5px" }}
                  />
                  <p>{sub.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal Form */}
        {activeSubcategory && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
            }}
          >
            <form
              onSubmit={handleSubmit}
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "18px",
                width: "400px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                boxShadow: "0 16px 32px rgba(17, 24, 39, 0.14)"
              }}
            >
              <h2>Add Product to {activeSubcategory.name}</h2>
              <input
                type="text"
                placeholder="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Available Stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                <button type="submit" style={{ padding: "10px", background: "#007bff", color: "#fff", border: "none", borderRadius: "12px" }}>
                  Add Product
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSubcategory(null)}
                  style={{ padding: "10px", background: "#ccc", color: "#000", border: "none", borderRadius: "12px" }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Added Products */}
        {addedProducts.length > 0 && (
          <div style={{ marginTop: "30px" }}>
            <h2>Products Added</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
              {addedProducts.map((p) => (
                <div
                  key={p.id}
                  style={{
                    width: "150px",
                    border: "1px solid #ccc",
                    borderRadius: "16px",
                    textAlign: "center",
                    padding: "10px",
                    boxShadow: "0 10px 18px rgba(17, 24, 39, 0.08)",
                    background: "#fff"
                  }}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{ width: "100%", height: "100px", objectFit: "cover", marginBottom: "5px" }}
                  />
                  <p>{p.category}</p>
                  <p><strong>{p.subcategory}</strong></p>
                  <p>${p.price}</p>
                  <p>Stock: {p.stock}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddProduct;
