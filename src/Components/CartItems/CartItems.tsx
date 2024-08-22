import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './CartItems.css';
import remove_icon from '../Assets/cart_cross_icon.png';
import Cookies from 'js-cookie';
import { CartItemResponse } from '../../interfaces/CartItemResponse';

const CartItems: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItemResponse[]>([]);
  

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = Cookies.get('jwt_token');
      if (!token) {
        // Handle the case where the user is not authenticated
        alert('Please log in to view your cart items.');
        return;
      }

      try {
        const response = await axios.get<CartItemResponse[]>('http://localhost:8080/cart/items', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
        alert('Failed to fetch cart items. Please try again.');
      }
    };

    fetchCartItems();
  }, []);

  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {cartItems.map((item) => (
        <div key={item.productId}>
          <div className="cartitems-format cartitems-format-main">
            <img src={require('../Assets/' + item.imageUrl)} alt={item.productName} className='carticon-product-icon' />
            <p>{item.productName}</p>
            <p>${item.price}</p>
            <button className='cartitems-quantity'>{item.quantity}</button>
            <p>${(item.price * item.quantity).toFixed(2)}</p>
            <img 
              className='cartitems-remove-icon' 
              src={remove_icon}  
              alt="Remove" 
            />
          </div>
          <hr />
        </div>
      ))}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${}</h3>
            </div>
          </div>
          <button>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code, enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder='Promo code' />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
