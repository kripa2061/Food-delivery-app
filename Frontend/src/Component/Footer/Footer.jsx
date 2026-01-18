import React from 'react'
import { assets } from '../../assets/frontend_assets/assets'
import './Footer.css'
const Footer = () => {
  return (
    <div>
      <div className="footer">
        <div className="footer-content" id="footer">
            <div className="desc">
            <div className="footer-adjust"><h3>ZestyBites</h3>
             <img className="footer-logo" src={assets.chilliPepper}/></div> 
             <p>“Delivering delicious meals to your doorstep with speed, safety, and satisfaction. Fresh ingredients, trusted partners, and unmatched service.</p>
             <img src={assets.facebook_icon}/>
             <img src={assets.twitter_icon}/>
             <img src={assets.linkedin_icon}/>

            </div>
            <div className="about">
                <h3>Company</h3>
               <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>privacy policy</li>
               </ul>
            </div>
            <div className="contact">
            <h3>GET IN TOUCH</h3>
            <ul>
                <li>980000000</li>
                <li>zestybite001@gmail.com</li>
               
            </ul>
            </div>
        </div>
          <p className='footer-copyright'>© 2025 ZestyBite – Delivering Happiness, One Meal at a Time.</p>
      </div>
    
    </div>
  )
}

export default Footer
