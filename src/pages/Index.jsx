import { Box, Container } from "@mui/material";
import React from "react";
import Hero from "../components/sections/Hero";
import Features from "../components/sections/Features";
import About from "../components/sections/About";
import Reviews from "../components/sections/Reviews";
import Faqs from "../components/sections/Faqs";
import Contact from "../components/sections/Contact";
import { useGlobalContext } from "../contexts/AppContext";
import FarmerDash from "../farmer/FarmerDash";
import CustomerHome from "../customer/CustomerHome";
import AdminDash from "../admin/AdminDash";

const Index = () => {
  const { user } = useGlobalContext();

  return !user.user ? (
    <Container maxWidth="lg">
      <Box>
        <Hero />
        <Features />
        <About />
        <Reviews />
        <Faqs />
        <Contact />
      </Box>
    </Container>
  ) : user?.user?.role === "farmer" ? (
    <FarmerDash />
  ) : user?.user?.role === "admin" ? (
    <AdminDash />
  ) : (
    <CustomerHome />
  );
};

export default Index;
