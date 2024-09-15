import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { CartItemResponse } from '../interfaces/CartItemResponse';
import './CSS/Checkout.css';

const Checkout: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItemResponse[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const navigate = useNavigate();
  
  const fetchCartItems = async () => {
    const token = Cookies.get('jwt_token');
    if (!token) {
      alert('Please log in to proceed with checkout.');
      navigate('/login');
      return;
    }

    try {
      const response = await axios.get<CartItemResponse[]>('http://localhost:8080/cart/items', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems(response.data);
      calculateTotalAmount(response.data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      alert('Failed to fetch cart items. Please try again.');
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const calculateTotalAmount = (items: CartItemResponse[]) => {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotalAmount(total);
  };

  const handleOrder = async () => {
    const token = Cookies.get('jwt_token');
    if (!token) {
      alert('Please log in to place your order.');
      navigate('/login');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/order', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert(response.data);
      navigate('/'); // Redirect to home or order confirmation page after placing order
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="checkout">
      <h1>Final Checkout</h1>
      <div className="checkout-items">
        {cartItems.map((item) => (
          <div key={item.productId} className="checkout-item">
            <img src={require("../Components/Assets/" + item.imageUrl)} alt={item.productName} className="checkout-item-img" />
            <p>{item.productName}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>
      <div className="checkout-summary">
        <h2>Final Amount: ${totalAmount.toFixed(2)}</h2>
        <button className="checkout-order-button" onClick={handleOrder}>Place Order</button>
        <button className="checkout-back-button" onClick={() => navigate('/cart')}>Back to Cart</button>
      </div>
    </div>
  );
};

export default Checkout;
