import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory.tsx';
import Product from './Pages/Product.tsx';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup.tsx';
import Login from './Pages/Login.tsx';
import Logout from './Pages/Logout.tsx'
import Footer from './Components/Footer/Footer';
import PrivateRoute from './Components/Routes/PrivateRoute.tsx';
import PublicRoute from './Components/Routes/PublicRoute.tsx';
import men_banner from './Components/Assets/banner_mens.png'
import women_banner from './Components/Assets/banner_women.png'
import kid_banner from './Components/Assets/banner_kids.png'
import Checkout from './Pages/Checkout.tsx';
import About from './Pages/About.tsx';
import Contact from './Pages/Contact.tsx';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Shop/>}/>
          <Route path="/mens" element={<ShopCategory banner={men_banner} category="MEN"/>}/>
            <Route path="/womens" element={<ShopCategory banner={women_banner} category="WOMEN"/>}/>
            <Route path="/kids" element={<ShopCategory banner={kid_banner} category="KIDS"/>}/>
            <Route path="/product" element={<Product/>}>
              <Route path=":productId" element={<Product/>}/>
            </Route>
            <Route path='/about' element={<About/>} />
            <Route path='/contact' element={<Contact/>} />

          {/* Public routes */}
          <Route element={<PublicRoute />}>
            <Route path="/signup" element={<LoginSignup/>}/>
            <Route path="/login" element={<Login/>}/>
          </Route>

          {/* Private routes */}
          <Route element={<PrivateRoute />}>                    
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/logout" element={<Logout/>}/>
            <Route path="/checkout" element={<Checkout/>}/>
          </Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
