import { ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";

const App = () => {
  const theme = createTheme({
    palette: {
      primary: { main: "#387ADF" },
      secondary: { main: "#EE4266" },
    },
    typography: {
      fontFamily: "Bubblegum Sans",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} index />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
