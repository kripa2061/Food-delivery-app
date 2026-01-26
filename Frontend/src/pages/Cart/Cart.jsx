import React, { useContext, useEffect, useState } from 'react'
import { storeContext } from '../../Context/Context';
import { food_list } from '../../assets/frontend_assets/assets';
import './Cart.css'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Cart = () => {
     
  const { AddToCart, RemoveFromCart, cartItem, getTotal ,url,foodList,token} = useContext(storeContext);
  const navigate = useNavigate();
useEffect(()=>{
  if(!token){
    navigate("/")
    toast.error("Please Login first")
  }
},[token])
  return (
    <div>
      <div className="cart">
        <div className="cart-item">
          <p>Item</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        {foodList.map((item) => {
          if (cartItem[item._id] > 0) {
            return (
              <div className="cart-item-display" key={item._id}>
                <img src={url+"/uploads/"+item.image} />
                <p>{item.name}</p>
                <p>Rs.{item.price}</p>
                <p>{cartItem[item._id]}</p>
                <p>Rs.{item.price * cartItem[item._id]}</p>
                <p onClick={() => RemoveFromCart(item._id)}>⛌</p>
              </div>
            )
          }
        })}
      </div>

      <div className="cart-footer">
        <div className="cart-buttom">
          <div className="subtotal">
            <p>Subtotal</p>
            <p>Rs.{getTotal()}</p>
          </div>

          <div className="delivery">
            <p>Delivery Fee</p>
            <p>Rs.{getTotal() === 0 ? 0 : 200}</p>
          </div>

          <div className="total">
            <p>Total</p>
            <p>Rs.{getTotal() === 0 ? 0 : getTotal() + 200}</p>
          </div>

          <button onClick={() => navigate('/order')}>Proceed to Checkout</button>
        </div>
      </div>

    
    </div>
  )
}

export default Cart;
