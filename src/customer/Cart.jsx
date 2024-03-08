import * as React from "react";
import { useGlobalContext } from "../contexts/AppContext";
import CartCard from "../components/CartCard";

const Cart = () => {
  const { cart } = useGlobalContext();

  return (
    <div className="container">
      <h2>Cart</h2>
      <div className="cart-container">
        {cart.map((product) => (
          <CartCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Cart;
