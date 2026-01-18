import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../assets/admin_assets/assets";
import "./Order.css";

const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };
const statusHandler=async(event,orderId)=>{
  const response=await axios.post(url+"/api/order/status",{orderId , status:event.target.value})
  if(response.data.success){
    await fetchAllOrders();
  }
}
  useEffect(() => {
    fetchAllOrders();
  }, []);



return (
  <div className="order-page">
    <h3>Order Page</h3>
    {orders.length === 0 && <p className="no-orders">No orders found</p>}
    <div className="orders-wrapper">
      {orders.map((orderItem, index) => (
        <div className="order-card" key={index}>
          <img src={assets.parcel_icon} alt="order" className="order-icon" />

          <div className="order-content">
            <div className="order-items">
              {orderItem.items.map((item, idx) => (
                <span key={idx}>
                  {item.name} x {item.quantity}
                  {idx !== orderItem.items.length - 1 ? ", " : ""}
                </span>
              ))}
            </div>

            <div className="customer-info">
              <p>
                <b>Name:</b> {orderItem.address.firstName} {orderItem.address.lastName}
              </p>
              <p>
                <b>Address:</b> {orderItem.address.street}, {orderItem.address.city}
              </p>
              <p>{orderItem.address.phone}</p>
            </div>

            <div className="order-details">
              <span>Items: {orderItem.items.length}</span>
              <span>Rs. {orderItem.amount}</span>
            </div>

            <select className="order-status-select" onChange={(event)=>statusHandler(event,orderItem._id)} valur={orderItem.status}>
              <option value="food Processing">Food processing</option>
              <option value="packaging">Packaging</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  </div>
);

};

export default Order;
