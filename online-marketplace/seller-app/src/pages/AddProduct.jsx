import React, { useState } from "react";

const AddProduct = () => {
    const categories = [
        {
            name: "Electronics",
            subcategories: ["Mobiles", "Laptops", "Headphones"]
        },
        {
            name: "Clothing",
            subcategories: ["Men", "Women", "Kids"]
        },
        {
            name: "Home",
            subcategories: ["Furniture", "Kitchen", "Decor"]
        }
    ];

    const [formData, setFormData] = useState({
        mainCategory: "",
        subCategory: "",
        otherCategory: ""
    });

    const handleMainCategoryChange = (e) => {
        const value = e.target.value;
        setFormData({
            ...formData,
            mainCategory: value,
            subCategory: "",
            otherCategory: ""
        });
    };

    const handleSubCategoryChange = (e) => {
        setFormData({
            ...formData,
            subCategory: e.target.value
        });
    };

    const handleOtherChange = (e) => {
        setFormData({
            ...formData,
            otherCategory: e.target.value
        });
    };

    return (
        <form className="add-product-form">

            {/* MAIN CATEGORY DROPDOWN */}
            <div className="form-group">
                <label className="form-label">Main Category</label>
                <select
                    className="form-select"
                    name="mainCategory"
                    value={formData.mainCategory}
                    onChange={handleMainCategoryChange}
                    required
                >
                    <option value="">Select main category</option>

                    {categories.map((cat) => (
                        <option key={cat.name} value={cat.name}>
                            {cat.name}
                        </option>
                    ))}

                    <option value="Other">Other</option>
                </select>
            </div>

            {/* SUB CATEGORY DROPDOWN — SHOW ONLY IF MAIN CATEGORY IS NOT EMPTY/OTHER */}
            {formData.mainCategory &&
                formData.mainCategory !== "Other" && (
                    <div className="form-group">
                        <label className="form-label">Sub Category</label>
                        <select
                            className="form-select"
                            name="subCategory"
                            value={formData.subCategory}
                            onChange={handleSubCategoryChange}
                            required
                        >
                            <option value="">Choose subcategory</option>

                            {categories
                                .find(
                                    (cat) => cat.name === formData.mainCategory
                                )
                                .subcategories.map((sub) => (
                                    <option key={sub} value={sub}>
                                        {sub}
                                    </option>
                                ))}
                        </select>
                    </div>
                )}

            {/* OTHER CATEGORY TEXT INPUT */}
            {formData.mainCategory === "Other" && (
                <div className="form-group">
                    <label className="form-label">Enter Category</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Write your category"
                        value={formData.otherCategory}
                        onChange={handleOtherChange}
                        required
                    />
                </div>
            )}
        </form>
    );
};

export default AddProduct;
