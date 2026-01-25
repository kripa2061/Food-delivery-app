import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import "./List.css";

const ListCustomer = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const url = "http://localhost:5001";
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch customer list
  const fetchList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/api/user/get`);

      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch customers");
    } finally {
      setLoading(false);
    }
  };

  // Delete customer
  const removeItem = async (userId) => {
    try {
      const response = await axios.post(`${url}/api/user/delete`, {
        id: userId,
      });

      if (response.data.success) {
        toast.success("Customer deleted successfully");
        fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  // Refetch list when route changes
  useEffect(() => {
    fetchList();
  }, [location]);

  return (
    <div className="list-container">
      <h2>Customer List</h2>

      <div className="list-header">
        <b>ID</b>
        <b>Name</b>
        <b>Email</b>
        <b>Actions</b>
      </div>

      {loading && <p>Loading customers...</p>}

      {!loading && list.length === 0 && (
        <p>No customers found</p>
      )}

      {!loading &&
        list.map((item) => (
          <div key={item._id} className="list-row">
            <p>{item._id}</p>
            <p>{item.name}</p>
            <p>{item.email}</p>

            <div className="action-buttons">
              <button
                className="edit-btn"
                onClick={() => navigate(`/edit/${item._id}`)}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => removeItem(item._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ListCustomer;
