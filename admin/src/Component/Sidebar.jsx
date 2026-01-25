import React from 'react'
import { assets } from '../assets/admin_assets/assets'
import { NavLink } from 'react-router-dom'
import './Sidebar.css'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <NavLink to="/add" className="sidebar-item">
        <img src={assets.add_icon} alt="Add Item" />
        <p>Add Item</p>
      </NavLink>
      <NavLink to="/list" className="sidebar-item">
        <img src={assets.order_icon} alt="List Items" />
        <p>List Items</p>
      </NavLink>
      <NavLink to="/order" className="sidebar-item">
        <img src={assets.parcel_icon} alt="Orders" />
        <p>Orders</p>
      </NavLink>
      <NavLink to="/user" className='sidebar-item'>
      <img src={assets.admin} alt="Customers"/>
      <p>Customers</p>
      </NavLink>
    </div>
  )
}

export default Sidebar
