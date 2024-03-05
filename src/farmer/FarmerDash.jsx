import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { useGlobalContext } from "../contexts/AppContext";

const FarmerDash = () => {
  const { products } = useGlobalContext();
  console.log(products);

  return (
    <Container maxWidth="xl" className="container">
      <Box>
        <Typography>Farmer Dashboard</Typography>
      </Box>
    </Container>
  );
};

export default FarmerDash;
