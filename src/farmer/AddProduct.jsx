import React from "react";
import { useGlobalContext } from "../contexts/AppContext";
import { Container, Typography } from "@mui/material";

const AddProduct = () => {
  const { prices } = useGlobalContext();

  return (
    <Container maxWidth="md" className="container">
      <Box>
        <Typography fontWeight="bold" fontSize={30}>
          Add Vegetable
        </Typography>
      </Box>
    </Container>
  );
};

export default AddProduct;
