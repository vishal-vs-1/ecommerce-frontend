import React, { useState } from 'react';
import axios from 'axios';
import './ProductDisplay.css';
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ProductResponse, Size } from '../../interfaces/ProductResponse';
import { AddToCartRequest } from '../../interfaces/AddToCartRequest';
import Cookies from 'js-cookie';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

interface ProductDisplayProps {
  product: ProductResponse;
}

const ProductDisplay: React.FC<ProductDisplayProps> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const navigate = useNavigate(); // To handle navigation programmatically

  // Transform arrays if they are in simple form (strings) rather than objects
  const sizes = Array.isArray(product.sizes) && typeof product.sizes[0] === 'string' 
    ? product.sizes.map((sizeName, index) => ({ sizeId: index, sizeName: sizeName as string }))
    : product.sizes;

  const categories = Array.isArray(product.categories) && typeof product.categories[0] === 'string' 
    ? product.categories.map((categoryName, index) => ({ categoryId: index, categoryName: categoryName as string }))
    : product.categories;

  const tags = Array.isArray(product.tags) && typeof product.tags[0] === 'string' 
    ? product.tags.map((tagName, index) => ({ tagId: index, tagName: tagName as string }))
    : product.tags;

  const handleSizeClick = (size: Size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = async () => {
    if (!selectedSize) {
      swal({
        text : "Please select a size before adding to cart.",
        timer : 1000
      })
      // alert("Please select a size before adding to cart.");
      return;
    }

    const token = Cookies.get('jwt_token');
    if (!token) {
      navigate('/login'); // Redirect to login if token is not present
      return;
    }

    const addToCartRequest: AddToCartRequest = {
      productId: product.productId,
      productName: product.productName,
      quantity: 1,
      size: selectedSize.sizeName,
    };

    try {
      const response = await axios.post(
        'http://localhost:8080/add/cart',
        addToCartRequest,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );
      // alert(response.data);
      swal({
        text : response.data,
        timer : 500
      })
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Failed to add product to cart. Please try again.");
    }
  };

  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          {product.imageUrl && (
            <>
              <img src={require('../Assets/' + product.imageUrl)} alt={product.productName} />
              <img src={require('../Assets/' + product.imageUrl)} alt={product.productName} />
              <img src={require('../Assets/' + product.imageUrl)} alt={product.productName} />
              <img src={require('../Assets/' + product.imageUrl)} alt={product.productName} />
            </>
          )}
        </div>
        <div className="productdisplay-img">
          <img className='productdisplay-main-img' src={require('../Assets/' + product.imageUrl)} alt={product.productName} />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.productName}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">${product.cost}</div>
          <div className="productdisplay-right-price-new">${(product.cost * (1 - product.discount / 100)).toFixed(2)}</div>
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            {sizes.map(size => (
              <div
                key={size.sizeId}
                className={`size-option ${selectedSize?.sizeId === size.sizeId ? 'selected' : ''}`}
                onClick={() => handleSizeClick(size)}
              >
                {size.sizeName}
              </div>
            ))}
          </div>
        </div>
        <button onClick={handleAddToCart}>ADD TO CART</button>
        <p className='productdisplay-right-category'>
          <span>Category: </span>
          {categories.map(category => category.categoryName).join(', ')}
        </p>
        <p className='productdisplay-right-category'>
          <span>Tags: </span>
          {tags.map(tag => tag.tagName).join(', ')}
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
