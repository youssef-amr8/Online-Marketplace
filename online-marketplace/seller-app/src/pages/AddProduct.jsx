import Sidebar from "../components/Sidebar";
import { useState } from "react";
import categories from "../utils/categories";

function AddProduct() {
  const [category, setCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [addedProducts, setAddedProducts] = useState([]);

  const handleSubcategoryClick = (sub) => {
    // Add product automatically on subcategory click
    const newProduct = {
      id: Date.now(),
      category,
      subcategory: sub.name,
      image: sub.image,
    };
    setAddedProducts([...addedProducts, newProduct]);
    setSelectedSubcategory(sub.name);
  };

  const selectedCategory = categories.find((c) => c.name === category);
  const subcategories = selectedCategory?.subcategories || [];

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: "20px" }}>
        <h1>Add Product</h1>

        {/* Category Buttons */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "20px" }}>
          {categories.map((c) => (
            <button
              key={c.name}
              onClick={() => {
                setCategory(c.name);
                setSelectedSubcategory(null);
              }}
              style={{
                padding: "10px 15px",
                border: category === c.name ? "2px solid #007bff" : "1px solid #ccc",
                background: category === c.name ? "#e0f0ff" : "#fff",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Subcategory Boxes */}
        {category && (
          <div style={{ marginTop: "30px" }}>
            <h2>{category} Subcategories</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "10px" }}>
              {subcategories.map((sub) => (
                <div
                  key={sub.name}
                  onClick={() => handleSubcategoryClick(sub)}
                  style={{
                    width: "180px",
                    textAlign: "center",
                    border: selectedSubcategory === sub.name ? "2px solid #007bff" : "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "10px",
                    cursor: "pointer",
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

        {/* Added Products List */}
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
                    borderRadius: "5px",
                    textAlign: "center",
                    padding: "10px",
                  }}
                >
                  <img
                    src={p.image}
                    alt={p.subcategory}
                    style={{ width: "100%", height: "100px", objectFit: "cover", marginBottom: "5px" }}
                  />
                  <p>{p.category}</p>
                  <p><strong>{p.subcategory}</strong></p>
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
