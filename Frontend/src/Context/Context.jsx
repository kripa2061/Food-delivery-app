import { createContext, useEffect, useState } from 'react';
import axios from 'axios'; // REQUIRED
import { food_list as staticFoodlist } from '../assets/frontend_assets/assets';
import { toast } from 'react-toastify';

export const storeContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState({});
  const [food_list, setFoodlist] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userData, setUserData] = useState(null);
  const url = "http://localhost:5001";

  // Fetch user info
const getUserData = async () => {
  if (!token) return;
  try {
    const { data } = await axios.get(url + '/api/user/get', { headers: { token } });
    if (data.success) setUserData(data.user); // now userData has name
    else toast.error(data.message || 'Failed to fetch user data');
  } catch (error) {
    toast.error(error.message);
  }
};


  // Fetch food list
  const fetchList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      setFoodlist(response.data.data);
    } catch (err) {
      console.error("Error fetching food list:", err);
    }
  };

  // Load cart
  const loadCartData = async (token) => {
    try {
      const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
      setCartItem(response.data.cartData || {});
    } catch (err) {
      console.error("Error loading cart data:", err);
    }
  };

  // Add/remove items
const AddToCart = async (itemId) => {
  setCartItem(prev => {
    const currentQty = prev[itemId] ?? 0; 
    return { ...prev, [itemId]: currentQty + 1 };
  });
  if (token) await axios.post(url + "/api/cart/add", { itemId, userId: userData._id }, { headers: { token } });
};


  const RemoveFromCart = async (itemId) => {
    setCartItem(prev => {
      const newCart = { ...prev };
      if (!newCart[itemId]) return prev;
      if (newCart[itemId] === 1) delete newCart[itemId];
      else newCart[itemId] -= 1;
      return newCart;
    });
    if (token) await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
  };

  const getTotal = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        const infoItem = food_list.find(product => product._id === item);
        if (infoItem) totalAmount += infoItem.price * cartItem[item];
      }
    }
    return totalAmount;
  };

  const totalItems = Object.values(cartItem).reduce((acc, val) => acc + val, 0);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      await fetchList();
      if (token) {
        await loadCartData(token);
        await getUserData(); // Fetch user data after login
      }
    };
    loadData();
  }, [token]);

  return (
    <storeContext.Provider value={{
      foodList: food_list,
      AddToCart,
      RemoveFromCart,
      cartItem,
      setCartItem,
      getTotal,
      totalItems,
      url,
      token,
      setToken,
      userData,
      setUserData
    }}>
      {children}
    </storeContext.Provider>
  );
};

export default StoreContextProvider;
