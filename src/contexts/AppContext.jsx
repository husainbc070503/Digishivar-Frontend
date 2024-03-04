import React, { createContext, useContext, useEffect, useReducer } from "react";
import AppReducer from "../reducers/AppReducer";
import { api } from "../utils/Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Context = createContext();
const initialState = {
  user: {},
  products: [],
  orders: [],
  blogs: [],
  cart: [],
};

const AppContext = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const navigate = useNavigate();

  /* Authentication */
  const registerUser = async (authDetails) => {
    try {
      const res = await fetch(`${api}/api/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(authDetails),
      });

      const data = await res.json();
      return data;
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const loginUser = async ({ email, password, role }) => {
    try {
      const res = await fetch(`${api}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();
      return data;
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("d-ecomm-user");
    navigate("../auth");
    toast.info("You have been logged out", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  useEffect(() => {
    const authUser = JSON.parse(localStorage.getItem("d-ecomm-user"));
    if (authUser) dispatch({ type: "SET_USER", payload: authUser });
    else dispatch({ type: "REMOVE_USER" });
  }, [navigate]);

  return (
    <Context.Provider
      value={{ ...state, registerUser, loginUser, handleLogout }}
    >
      {children}
    </Context.Provider>
  );
};

const useGlobalContext = () => useContext(Context);
export { AppContext, useGlobalContext };
