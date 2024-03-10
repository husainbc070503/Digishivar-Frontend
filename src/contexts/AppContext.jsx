import React, { createContext, useContext, useEffect, useReducer } from "react";
import AppReducer from "../reducers/AppReducer";
import { api } from "../utils/Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpeg";

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

  /* Cart */
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

  const incrementQuantity = (id, quantity) =>
    dispatch({ type: "INCREMENT_QUANTITY", payload: { id, quantity } });

  const decrementQuantity = (id) =>
    dispatch({ type: "DECREMENT_QUANTITY", payload: id });

  const handleChangeUserQuantityType = (id, value) =>
    dispatch({ type: "CHANGE_QUANTITY_TYPE", payload: { id, value } });

  const handleBuyAll = async (amount) => {
    console.log("Buying all products");

    try {
      const rzp = await fetch(`${api}/api/getkey`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
      });
      const raz = await rzp.json();

      const res = await fetch(`${api}/api/payment/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
        body: JSON.stringify({ amount }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await res.json();
      // console.log(data);

      const options = {
        key: raz.key, // Enter the Key ID generated from the Dashboard
        amount: data.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "DigiShivar",
        description: "A farmers world!",
        image: logo,
        order_id: data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: "http://localhost:2704/api/payment/paymentverification",
        prefill: {
          name: "Ritika",
          email: "ritika@gmail.com",
          contact: "9370064905",
        },
        // handler: function (response) {
        //   alert(response.razorpay_payment_id);
        //   alert(response.razorpay_order_id);
        //   alert(response.razorpay_signature);
        // },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Error while buying products:", error);
    }
  };

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

  const removeFromList = (id) =>
    dispatch({ type: "REMOVE_FROM_LIST", payload: id });

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

  const likeBlog = async (id) => {
    try {
      const res = await fetch(`${api}/api/blog/likeBlog/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        dispatch({ type: "UPDATE_BLOG", payload: { id, blog: data.blog } });
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

  const dislikeBlog = async (id) => {
    try {
      const res = await fetch(`${api}/api/blog/dislikeBlog/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        dispatch({ type: "UPDATE_BLOG", payload: { id, blog: data.blog } });
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

  const addComment = async (id, comment, setOpenCommentBox) => {
    try {
      const res = await fetch(`${api}/api/blog/addComment/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
        body: JSON.stringify({ comment }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Comment Added", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        dispatch({
          type: "UPDATE_BLOG",
          payload: { id, blog: data.blog },
        });

        setOpenCommentBox(false);
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

  const deleteComment = async (id, cid) => {
    try {
      const res = await fetch(`${api}/api/blog/deleteComment/${id}/${cid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Comment Deleted", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        dispatch({
          type: "UPDATE_BLOG",
          payload: { id, blog: data.blog },
        });
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
  const addReview = async (id, review, setOpenReview) => {
    try {
      const res = await fetch(`${api}/api/product/addReview/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
        body: JSON.stringify({ review }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Review Added", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        dispatch({
          type: "UPDATE_PRODUCT",
          payload: { id, product: data.product },
        });

        setOpenReview(false);
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

  const deleteReview = async (id, rid) => {
    try {
      const res = await fetch(`${api}/api/product/deleteReview/${id}/${rid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Review Deleted", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        dispatch({
          type: "UPDATE_PRODUCT",
          payload: { id, product: data.product },
        });
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

  const giveRating = async (id, rating) => {
    try {
      const res = await fetch(`${api}/api/product/rate/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
        body: JSON.stringify({ rating }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Product Rated", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        dispatch({
          type: "UPDATE_PRODUCT",
          payload: { id, product: data.product },
        });
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
        addToCart,
        removeFromCart,
        addToWishlist,
        incrementQuantity,
        decrementQuantity,
        handleChangeUserQuantityType,
        removeFromList,
        addReview,
        deleteReview,
        giveRating,
        likeBlog,
        dislikeBlog,
        addComment,
        deleteComment,
      }}
    >
      {children}
    </Context.Provider>
  );
};

const useGlobalContext = () => useContext(Context);
export { AppContext, useGlobalContext };
