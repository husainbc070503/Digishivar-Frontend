import { Box, Container } from "@mui/material";
import React from "react";
import Hero from "../components/sections/Hero";
import Features from "../components/sections/Features";
import About from "../components/sections/About";
import Reviews from "../components/sections/Reviews";
import Faqs from "../components/sections/Faqs";
import Contact from "../components/sections/Contact";

const Index = () => {
  return (
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
  );
};

export default Index;
