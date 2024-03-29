import { ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import Authentication from "./pages/Authentication";
import { AppContext } from "./contexts/AppContext";
import AddProduct from "./farmer/AddProduct";
import Blogs from "./farmer/Blogs";
import Blog from "./customer/Blogs";
import CreateBlog from "./farmer/CreateBlog";
import Profile from "./pages/Profile";
import Customers from "./admin/Customers";
import Farmers from "./admin/Farmers";
import Products from "./admin/Products";
import QnA from "./admin/QnA";
import Cart from "./customer/Cart";
import Wishlist from "./customer/Wishlist";
import TransportSelection from "./customer/TransportSelection";
import OrderHistory from "./customer/OrderHistory";
import Orders from "./farmer/Orders";
import AdminOrders from "./admin/AdminOrders";
import AdminBlogs from "./admin/AdminBlogs";
import Invoice from "./components/Invoice";
import InvoiceNew from "./components/InvoiceNew";
import { useLocation } from "react-router-dom/dist";

const App = () => {
  const theme = createTheme({
    palette: {
      primary: { main: "#65C54B" },
      secondary: { main: "#333A73" },
    },
    typography: {
      fontFamily: "Playfair Display",
    },
  });

  const LocationNavbar = () => {
    const location = useLocation();
    if (location.pathname.includes('generateInvoice')) return null;

    return <Navbar />;
  };

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppContext>
          <LocationNavbar />
          <Routes>
            <Route path="/" element={<Index />} index />
            <Route path="/auth" element={<Authentication />} />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/editProduct/:id" element={<AddProduct />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/readblogs" element={<Blog />} />
            <Route path="/addBlog" element={<CreateBlog />} />
            <Route path="/editBlog/:id" element={<CreateBlog />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/pay" element={<TransportSelection />} />
            <Route path="/orderHistory" element={<OrderHistory />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/adminOrders" element={<AdminOrders />} />
            <Route path="/adminBlogs" element={<AdminBlogs />} />
            <Route path="/generateInvoice/:id" element={<InvoiceNew />} />
            {/* <Route path="/Invoice" element={<Invoice />} /> */}

            {/* ADMIN */}
            <Route path="/customers" element={<Customers />} />
            <Route path="/farmers" element={<Farmers />} />
            <Route path="/products" element={<Products />} />
            <Route path="/qna" element={<QnA />} />
          </Routes>
        </AppContext>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
