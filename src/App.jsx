import { ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import Authentication from "./pages/Authentication";
import { AppContext } from "./contexts/AppContext";
import AddProduct from "./farmer/AddProduct";
import Blogs from "./farmer/Blogs";
import CreateBlog from "./farmer/CreateBlog";
import Profile from "./pages/Profile";
import Customers from "./admin/Customers";
import Farmers from "./admin/Farmers";
import Products from "./admin/Products";
import QnA from "./admin/QnA";

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

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppContext>
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} index />
            <Route path="/auth" element={<Authentication />} />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/editProduct/:id" element={<AddProduct />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/addBlog" element={<CreateBlog />} />
            <Route path="/editBlog/:id" element={<CreateBlog />} />
            <Route path="/profile" element={<Profile />} />

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
