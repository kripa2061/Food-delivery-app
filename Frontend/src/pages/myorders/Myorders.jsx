import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { storeContext } from "../../Context/Context";
import { assets } from "../../assets/frontend_assets/assets";
import "./Myorders.css";

const Myorders = () => {
  
  const { url, token } = useContext(storeContext);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.post(url + "/api/order/userorder", {}, { headers: { token } });
      setOrders(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (token){
fetchOrders();
    } 
  }, [token]);

  return (
    <div className="myorders">
      {orders.map((order, index) => (
        <div className="order-card" key={index}>
          <img src={assets.parcel_icon} alt="order" className="order-icon" />

          <div className="order-content">
            <div className="order-items">
              {order.items.map((food, index) => (
                <span key={index} className="food-item">
                  {food.name} x {food.quantity}
                </span>
              ))}
            </div>

            <p className="order-amount">${order.amount}.00</p>
            <p className="order-status">
              <span>&#x25cf;</span> <b>{order.status}</b>
            </p>

            <button onClick={fetchOrders}>Track order</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Myorders;
