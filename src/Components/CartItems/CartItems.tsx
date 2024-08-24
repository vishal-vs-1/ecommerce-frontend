import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CartItems.css';
import remove_icon from '../Assets/cart_cross_icon.png';
import Cookies from 'js-cookie';
import { CartItemResponse } from '../../interfaces/CartItemResponse';

const CartItems: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItemResponse[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  
  const fetchCartItems = async () => {
    const token = Cookies.get('jwt_token');
    if (!token) {
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
      calculateSubtotal(response.data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      alert('Failed to fetch cart items. Please try again.');
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const calculateSubtotal = (items: CartItemResponse[]) => {
    const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    setSubtotal(subtotal);
  };

  const handleRemoveItem = async (productId: number) => {
    const token = Cookies.get('jwt_token');
    if (!token) {
      alert('Please log in to remove items from your cart.');
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/remove/all/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCartItems(); // Refetch cart items after removal
    } catch (error) {
      console.error('Error removing item from cart:', error);
      alert('Failed to remove item from cart. Please try again.');
    }
  };

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
            <p>${item.price.toFixed(2)}</p>
            <button className='cartitems-quantity'>{item.quantity}</button>
            <p>${(item.price * item.quantity).toFixed(2)}</p>
            <img 
              className='cartitems-remove-icon' 
              src={remove_icon}  
              alt="Remove" 
              onClick={() => handleRemoveItem(item.productId)} // Call remove function on click
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
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${subtotal.toFixed(2)}</h3>
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
