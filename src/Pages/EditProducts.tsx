import axios from "axios";
import React, { useEffect, useState } from "react";
import { ProductResponse } from "../interfaces/ProductResponse.ts";
import Item from "../Components/Item/Item.tsx";
import './CSS/EditProducts.css'

const EditProducts = () => {
  const [products, setProducts] = useState<ProductResponse[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<ProductResponse[]>(
          "http://localhost:8080/products/list"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/remove/product/${id}`);
      // Update the product list by filtering out the deleted product
      setProducts(products.filter((product) => product.productId !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (id: number) => {
    // Redirect to an edit page or open a modal (example: /edit/:id)
    window.location.href = `/edit/${id}`;
  };

  return (
    <div className="container">
      <div className="container-item">
        {products.map((item) => (
			<div key={item.productId} className="product-container">
          <Item
            key={item.productId}
            id={item.productId}
            name={item.productName}
            image={item.imageUrl}
            new_price={item.cost * (1 - item.discount / 100)}
            old_price={item.cost}
          />
		    <div className="product-overlay">
              <button
                className="btn-delete"
                onClick={() => handleDelete(item.productId)}
              >
                Delete
              </button>
              <button
                className="btn-edit"
                onClick={() => handleEdit(item.productId)}
              >
                Edit
              </button>
            </div>
		  </div>
        ))}
		
      </div>
    </div>
  );
};

export default EditProducts;