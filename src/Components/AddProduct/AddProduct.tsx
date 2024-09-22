import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AddProduct.css";
import upload_area from "../Assets/upload_area.svg";
import Cookies from "js-cookie";

interface ProductDetails {
  productName: string;
  description: string;
  categories: string[]; // Changed to an array for multiple categories
  cost: string;
  discount: string;
  sizes: string[];
  tags: string[];
  quantity: string;
}

const AddProduct = () => {
  const [image, setImage] = useState<File | null>(null);
  const [productDetails, setProductDetails] = useState<ProductDetails>({
    productName: "",
    description: "",
    categories: [], // Initialize as empty array
    cost: "",
    discount: "",
    sizes: [],
    tags: [],
    quantity: "",
  });

  const availableSizes = ["SMALL", "MEDIUM", "LARGE", "EXTRA_LARGE"];
  const availableTags = ["MODERN", "OLD"];
  const availableCategories = ["WOMEN", "MEN", "KIDS"];

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const handleSizeChange = (size: string) => {
    const updatedSizes = productDetails.sizes.includes(size)
      ? productDetails.sizes.filter((s) => s !== size)
      : [...productDetails.sizes, size];
    setProductDetails({ ...productDetails, sizes: updatedSizes });
  };

  const handleTagChange = (tag: string) => {
    const updatedTags = productDetails.tags.includes(tag)
      ? productDetails.tags.filter((t) => t !== tag)
      : [...productDetails.tags, tag];
    setProductDetails({ ...productDetails, tags: updatedTags });
  };

  const handleCategoryChange = (category: string) => {
    const updatedCategories = productDetails.categories.includes(category)
      ? productDetails.categories.filter((c) => c !== category)
      : [...productDetails.categories, category];
    setProductDetails({ ...productDetails, categories: updatedCategories });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const submitProduct = async () => {
    if (!image) {
      alert("Please upload an image.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", image);

      const productData: ProductDetails = {
        ...productDetails,
        cost: parseFloat(productDetails.cost).toString(),
        discount: parseInt(productDetails.discount).toString(),
      };

      formData.append("productDetails", new Blob([JSON.stringify(productData)], { type: "application/json" }));

      const response = await axios.post("http://localhost:8080/add/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product Added Successfully");
      console.log(response.data);
    } catch (error) {
      console.error("There was an error uploading the product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <div className="addproduct">
      <div className="addproduct-itemfield">
        <p>Product Name</p>
        <input
          type="text"
          name="productName"
          value={productDetails.productName}
          onChange={changeHandler}
          placeholder="Enter product name"
        />
      </div>
      <div className="addproduct-itemfield">
        <p>Product Description</p>
        <input
          type="text"
          name="description"
          value={productDetails.description}
          onChange={changeHandler}
          placeholder="Enter product description"
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            type="number"
            name="cost"
            value={productDetails.cost}
            onChange={changeHandler}
            placeholder="Enter price"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Discount (%)</p>
          <input
            type="number"
            name="discount"
            value={productDetails.discount}
            onChange={changeHandler}
            placeholder="Enter discount"
          />
        </div>

        <div className="addproduct-itemfield">
          <p>Quantity</p>
          <input
            type="number"
            name="quantity"
            value={productDetails.quantity}
            onChange={changeHandler}
            placeholder="Enter quantity"
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Select Categories</p>
        <div className="category-selector">
          {availableCategories.map((category) => (
            <label key={category} style={{ marginRight: "10px" }}>
              <input
                type="checkbox"
                value={category}
                checked={productDetails.categories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      <div className="addproduct-itemfield">
        <p>Select Sizes</p>
        <div className="size-selector">
          {availableSizes.map((size) => (
            <label key={size} style={{ marginRight: "10px" }}>
              <input
                type="checkbox"
                value={size}
                checked={productDetails.sizes.includes(size)}
                onChange={() => handleSizeChange(size)}
              />
              {size}
            </label>
          ))}
        </div>
      </div>

      <div className="addproduct-itemfield">
        <p>Select Tags</p>
        <div className="tag-selector">
          {availableTags.map((tag) => (
            <label key={tag} style={{ marginRight: "10px" }}>
              <input
                type="checkbox"
                value={tag}
                checked={productDetails.tags.includes(tag)}
                onChange={() => handleTagChange(tag)}
              />
              {tag}
            </label>
          ))}
        </div>
      </div>

      <div className="addproduct-itemfield">
        <p>Product Image</p>
        <label htmlFor="file-input">
          <img className="addproduct-thumbnail-img" src={!image ? upload_area : URL.createObjectURL(image)} alt="Product thumbnail" />
        </label>
        <input
          onChange={handleImageUpload}
          type="file"
          name="image"
          id="file-input"
          accept="image/*"
          hidden
        />
      </div>

      <button className="addproduct-btn" onClick={submitProduct}>
        ADD
      </button>
    </div>
  );
};

export default AddProduct;
