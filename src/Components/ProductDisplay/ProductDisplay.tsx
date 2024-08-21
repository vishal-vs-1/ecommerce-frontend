import React from 'react';
import './ProductDisplay.css';
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ProductResponse } from '../../interfaces/ProductResponse';

interface ProductDisplayProps {
  product: ProductResponse;
}

const ProductDisplay: React.FC<ProductDisplayProps> = ({ product }) => {
  // Transforming the data to match the expected structure
  const sizes = product.sizes.map((sizeName, index) => ({
    sizeId: index,
    sizeName: sizeName as unknown as string, // Ensure type compatibility
  }));

  const categories = product.categories.map((categoryName, index) => ({
    categoryId: index,
    categoryName: categoryName as unknown as string,
  }));

  const tags = product.tags.map((tagName, index) => ({
    tagId: index,
    tagName: tagName as unknown as string,
  }));

  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          {product.imageUrl && (
            <>
              <img src={require('../Assets/' +  product.imageUrl)} alt="" />
              <img src={require('../Assets/' +  product.imageUrl)} alt="" />
              <img src={require('../Assets/' +  product.imageUrl)} alt="" />
              <img src={require('../Assets/' +  product.imageUrl)} alt="" />
            </>
          )}
        </div>
        <div className="productdisplay-img">
          <img className='productdisplay-main-img' src={require('../Assets/' +  product.imageUrl)} alt={product.productName} />
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
        <div className="productdisplay-right-description">
          {product.description}
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            {sizes.map(size => (
              <div key={size.sizeId}>{size.sizeName}</div>
            ))}
          </div>
        </div>
        <button onClick={() => { /* Add to cart functionality */ }}>ADD TO CART</button>
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
}

export default ProductDisplay;
