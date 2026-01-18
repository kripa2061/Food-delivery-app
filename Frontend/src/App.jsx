import React, { useState } from 'react'
import Navbar from './Component/Navbar/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Mobile_App from './Component/Movile-app/Mobile_App';
import Food_list from './Component/Food_list/Food_list';
import Footer from './Component/Footer/Footer';
import Loginpopup from './Component/LoginPopUp/Loginpopup';
import Verify from './pages/Verify/Verify';
import Myorders from './pages/myorders/Myorders';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Search from './pages/Search/Search';

const App = () => {
  const [showLogin,setShowLogin]=useState(false);
  return (
    <Router>
          <ToastContainer />
   {showLogin && <Loginpopup showLogin={showLogin} setShowLogin={setShowLogin} />}

      <Navbar setShowLogin={setShowLogin}/>

      <Routes>

        <Route path="/" element={<Home />} />
   
        <Route path="/cart" element={< Cart />} />
        <Route path="/order" element={< PlaceOrder />} />
        <Route path="/mobile-app" element={< Mobile_App />} />
        <Route path="/contact-us" element={< Footer />} />
        <Route path="/menu" element={< Food_list />} />
     <Route path="/verify" element={<Verify />}/>
     <Route path="/myorders" element={<Myorders />}/>
     <Route path='/search' element={< Search />}/>
   

      </Routes>
    </Router>

  )
}

export default App
