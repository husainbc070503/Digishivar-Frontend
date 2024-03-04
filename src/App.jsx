import { ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import Authentication from "./pages/Authentication";
import { AppContext } from "./contexts/AppContext";
import AddProduct from "./farmer/AddProduct";

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
          </Routes>
        </AppContext>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
