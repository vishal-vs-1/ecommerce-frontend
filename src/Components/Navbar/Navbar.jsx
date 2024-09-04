import React, { useEffect, useRef, useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import nav_dropdown from '../Assets/nav_dropdown.png';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const [cartItemCount, setCartItemCount] = useState(0);
    const menuRef = useRef();

    const dropdown_toggle = (e) => {
      menuRef.current.classList.toggle('nav-menu-visible');
      e.target.classList.toggle('open');
    }
      
    const token = Cookies.get('jwt_token');

    const fetchCartItemCount = () => {
      axios.get('http://localhost:8080/cartItemsCount', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setCartItemCount(response.data); // Assuming the response contains the count
      })
      .catch(error => {
        console.error("There was an error fetching the number of cart items:", error);
      });
    }

    useEffect(() => {
      if (token) {
        fetchCartItemCount(); // Fetch cart item count on component mount if token exists
      }
    }, [token]); // Dependency on token, so it runs again if token changes

  return (
    <div className='navbar'>
      <Link to='/' onClick={() => setMenu("shop")} className="nav-logo">
        <img src={logo} alt="Logo" />
        <p>Shoppin</p>
      </Link>
      <img onClick={dropdown_toggle} className='nav-dropdown' src={nav_dropdown} alt="Dropdown" />
      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => setMenu("shop")}><Link to='/'>Shop</Link>{menu === "shop" ? <hr /> : <></>}</li>
        <li onClick={() => setMenu("mens")}><Link to='/mens'>Men</Link>{menu === "mens" ? <hr /> : <></>}</li>
        <li onClick={() => setMenu("womens")}><Link to="womens">Women</Link>{menu === "womens" ? <hr /> : <></>}</li>
        <li onClick={() => setMenu("kids")}><Link to='/kids'>Kids</Link>{menu === "kids" ? <hr /> : <></>}</li>
      </ul>
      <div className="nav-login-cart">
        {token ? (
          <Link to='/logout'><button>Logout</button></Link>
        ) : (
          <Link to='/login'><button>Login</button></Link>
        )}
        <Link to='/cart'><img src={cart_icon} alt="Cart" /></Link>
        <div className="nav-cart-count">
          {cartItemCount > 0 ? cartItemCount : ''}
        </div>
      </div>
    </div>
  )
}

export default Navbar;
