import { useState } from "react";
import categories from "../../shared/constants/categories";

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    condition: "new",
    location: "",
    payment: "cash",
    category: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Submitting Product", form);
  }

  return (
    <div className="add-product-container">
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            name="category"
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            className="form-input"
            name="name"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-input"
            name="price"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            className="form-textarea"
            name="description"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Condition</label>
          <select
            className="form-select"
            name="condition"
            onChange={handleChange}
          >
            <option value="new">New</option>
            <option value="used">Used</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Location</label>
          <input
            className="form-input"
            name="location"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Payment Method</label>
          <select
            className="form-select"
            name="payment"
            onChange={handleChange}
          >
            <option value="cash">Cash</option>
            <option value="installment">Installment</option>
          </select>
        </div>

        <button className="btn-submit" type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
}
