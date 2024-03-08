import * as React from "react";
import { useGlobalContext } from "../contexts/AppContext";
import CartCard from "../components/CartCard";
import { Container, Typography } from "@mui/material";

const Cart = () => {
  const { cart } = useGlobalContext();

  return (
    <Container maxWidth="xl" className="container">
      <Typography fontSize={30} fontWeight="bold">
        My Cart
      </Typography>
      <div className="cart-container">
        {cart.map((product) => (
          <CartCard key={product._id} product={product} />
        ))}
      </div>
    </Container>
  );
};

export default Cart;
