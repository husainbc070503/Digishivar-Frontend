import React, { createContext, useContext, useEffect, useReducer } from "react";
import AppReducer from "../reducers/AppReducer";
import { api } from "../utils/Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Context = createContext();
const initialState = {
  user: {},
  users: [],
  prices: [],
  products: [],
  orders: [],
  blogs: [],
  cart: [],
  contacts: [],
  wishlist: [],
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

  const updateProfile = async (updateDetails, setLoading, setUpdate) => {
    setLoading(true);
    try {
      const res = await fetch(`${api}/api/user/updateProfile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
        body: JSON.stringify(updateDetails),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Profile updated", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        localStorage.setItem(
          "d-ecomm-user",
          JSON.stringify({ user: data.user, token: state.user.token })
        );

        navigate("/");
        setUpdate(false);
      } else {
        toast.error(data.message, {
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
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${api}/api/user/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
      });

      const data = await res.json();
      if (data.success) dispatch({ type: "SET_USERS", payload: data.users });
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

  /* Produt Prices */
  const fetchProductPrices = async () => {
    try {
      const res = await fetch(`${api}/api/price/prices`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
      });

      const data = await res.json();
      if (data.success) dispatch({ type: "SET_PRICES", payload: data.prices });
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

  /* Products */
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${api}/api/product/products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
      });

      const data = await res.json();
      if (data.success)
        dispatch({ type: "SET_PRODUCTS", payload: data.products });
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

  const addProduct = async (productDetails) => {
    try {
      const res = await fetch(`${api}/api/product/addProduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
        body: JSON.stringify(productDetails),
      });

      const data = await res.json();
      if (data.success) return data;
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

  const updateProduct = async (productDetails, id) => {
    try {
      const res = await fetch(`${api}/api/product/editProduct/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
        body: JSON.stringify(productDetails),
      });

      const data = await res.json();
      if (data.success) return data;
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

  const deleteProduct = async (id) => {
    try {
      const res = await fetch(`${api}/api/product/deleteProduct/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Product Deleted", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        dispatch({ type: "DELETE_PRODUCT", payload: id });
      } else {
        toast.error(data.message, {
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

  //CART
  const addToCart = (productId) => {
    const productToAdd = state.products.find(
      (product) => product._id === productId
    );

    if (state.cart.find((item) => item?._id === productToAdd?._id)) {
      return toast.error("Product already in cart", {
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

    if (productToAdd) {
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          productToAdd,
          quantity: productToAdd?.quantity,
          quantityType: productToAdd?.quantity_type,
        },
      });
      toast.success("Product added to cart", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error("Product not found", {
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

  const removeFromCart = (id) =>
    dispatch({ type: "REMOVE_FROM_CART", payload: id });

  const removeFromList = (id) =>
    dispatch({ type: "REMOVE_FROM_LIST", payload: id });

  const incrementQuantity = (id, quantity) =>
    dispatch({ type: "INCREMENT_QUANTITY", payload: { id, quantity } });

  const decrementQuantity = (id) =>
    dispatch({ type: "DECREMENT_QUANTITY", payload: id });

  const handleChangeUserQuantityType = (id, value) =>
    dispatch({ type: "CHANGE_QUANTITY_TYPE", payload: { id, value } });

  /* WishList */
  const addToWishlist = (productId) => {
    const listOfProducts = state.products.find(
      (product) => product._id === productId
    );

    if (state.wishlist.find((item) => item?._id === listOfProducts?._id)) {
      return toast.error("Product already in list", {
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
    if (listOfProducts) {
      dispatch({ type: "ADD_TO_LIST", payload: listOfProducts });
      toast.success("Product added to Wishlist", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error("Product not found", {
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

  /* Blogs */
  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${api}/api/blog/blogs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
      });

      const data = await res.json();
      if (data.success) dispatch({ type: "SET_BLOGS", payload: data.blogs });
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

  const readBlog = async () => {
    try {
      const res = await fetch(`${api}/api/blog/readblogs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
      });

      const data = await res.json();
      if (data.success) dispatch({ type: "SET_BLOGS", payload: data.blogs });
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

  const addBlog = async (blogDetails) => {
    try {
      const res = await fetch(`${api}/api/blog/createBlog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
        body: JSON.stringify(blogDetails),
      });

      const data = await res.json();
      if (data.success) return data;
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

  const updateBlog = async (blogDetails, id) => {
    try {
      const res = await fetch(`${api}/api/blog/updateBlog/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
        body: JSON.stringify(blogDetails),
      });

      const data = await res.json();
      if (data.success) return data;
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

  const deleteBlog = async (id) => {
    try {
      const res = await fetch(`${api}/api/blog/deleteBlog/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Blog Deleted", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        dispatch({ type: "DELETE_BLOG", payload: id });
      } else {
        toast.error(data.message, {
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

  /* Review */
  const readReview = async (productDetails, id) => {
    try {
      const res = await fetch(`${api}/api/product/readReview/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
        body: JSON.stringify(productDetails),
      });

      const data = await res.json();
      if (data.success) return data;
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

  /* Contacts */
  const fetchContacts = async (req, res) => {
    try {
      const res = await fetch(`${api}/api/contact/contacts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
      });

      const data = await res.json();
      if (data.success)
        dispatch({ type: "SET_CONTACTS", payload: data.contacts });
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

  useEffect(() => {
    const authUser = JSON.parse(localStorage.getItem("d-ecomm-user"));
    if (authUser) dispatch({ type: "SET_USER", payload: authUser });
    else dispatch({ type: "REMOVE_USER" });

    const storedCart = JSON.parse(localStorage.getItem("d-ecomm-cart"));
    if (storedCart) dispatch({ type: "SET_CART", payload: storedCart });

    const storedList = JSON.parse(localStorage.getItem("d-ecomm-wishlist"));
    if (storedList) dispatch({ type: "SET_LIST", payload: storedList });
  }, [navigate]);

  useEffect(() => {
    fetchProductPrices();
    fetchProducts();
    fetchBlogs();
    fetchUsers();
    fetchContacts();
  }, [state.user]);

  useEffect(() => {
    console.log("Cart-updated");
    localStorage.setItem("d-ecomm-cart", JSON.stringify(state.cart));
    if (state.cart.length === 0) localStorage.removeItem("d-ecomm-cart");
  }, [state.cart]);

  useEffect(() => {
    console.log("Wishlist-updated");
    localStorage.setItem("d-ecomm-wishlist", JSON.stringify(state.wishlist));
    if (state.wishlist.length === 0)
      localStorage.removeItem("d-ecomm-wishlist");
  }, [state.wishlist]);

  return (
    <Context.Provider
      value={{
        ...state,
        dispatch,
        registerUser,
        loginUser,
        updateProfile,
        handleLogout,
        addProduct,
        updateProduct,
        deleteProduct,
        addBlog,
        updateBlog,
        deleteBlog,
        readBlog,
        addToCart,
        removeFromCart,
        addToWishlist,
        incrementQuantity,
        decrementQuantity,
        handleChangeUserQuantityType,
        removeFromList,
        readReview,
      }}
    >
      {children}
    </Context.Provider>
  );
};

const useGlobalContext = () => useContext(Context);
export { AppContext, useGlobalContext };
