import React from 'react';
import './Breadcrum.css';
import arrow_icon from '../Assets/breadcrum_arrow.png';


const Breadcrum  = ({ product }) => {
  return (
    <div className='breadcrum'>
      HOME <img src={arrow_icon} alt="" /> SHOP <img src={arrow_icon} alt="" /> {product.categories.map(category => category.categoryName).join(', ')} <img src={arrow_icon} alt="" /> {product.productName}
    </div>
  )
}

export default Breadcrum;
