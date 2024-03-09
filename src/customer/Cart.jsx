// cart.jsx

import * as React from "react";
import {
  Avatar,
  Container,
  Grid,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
} from "@mui/material";
import { useGlobalContext } from "../contexts/AppContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Data from "../components/Data";
import DeleteIcon from "@mui/icons-material/Delete";

const Cart = () => {
  const { cart } = useGlobalContext();

  const handleBuyAll = () => {
    // Implement logic for buying all products
    console.log("Buying all products");
  };

  return (
    <Container maxWidth="xl" className="container">
      <Typography fontSize={30} fontWeight="bold">
        My Cart
      </Typography>
      <Grid container spacing={2} my={1}>
        <Grid item md={6} xs={12}>
          <Typography fontSize={35} fontWeight="bold" color="primary">
            <ShoppingCartIcon className="text-dark fs-3 me-2" /> Cart
          </Typography>
        </Grid>
      </Grid>
      <div className="cart-container">
        <CartTable products={cart} handleBuyAll={handleBuyAll} />
      </div>
    </Container>
  );
};

const CartTable = ({ products, handleBuyAll }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <Data align="center" text="Sr.No." />
          <Data align="center" text="Image" />
          <Data align="center" text="Vegetable" />
          <Data align="center" text="Quantity" />
          <Data align="center" text="Quantity Type" />
          <Data align="center" text="Category" />
          <Data align="center" text="Price" />
          <Data align="center" text="Total Price" />
          <Data align="center" text="Action" />
        </TableHead>
        <TableBody>
          {products.map((product, index) => (
            <CartRow key={product._id} product={product} index={index + 1} />
          ))}
          <CartSummary onBuyAll={handleBuyAll} />
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const CartSummary = ({ onBuyAll }) => {
  return (
    <div>
      <Button variant="contained" color="primary" onClick={onBuyAll}>
        Buy All
      </Button>
    </div>
  );
};

const CartRow = ({ product, index }) => {
  const { vegetable, img, price, category } = product;
  const [quantityType, setQuantityType] = React.useState("kg");
  const [quantity, setQuantity] = React.useState(1);
  const [calculatedPrice, setCalculatedPrice] = React.useState(0);

  React.useEffect(() => {
    // Calculate price dynamically based on quantity and quantity type
    let newCalculatedPrice;
    if (quantityType === "kg") {
      newCalculatedPrice = price * quantity;
    } else {
      newCalculatedPrice = price * quantity * 100;
    }
    setCalculatedPrice(newCalculatedPrice);
  }, [quantity, quantityType, price]);

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleQuantityTypeChange = (event) => {
    setQuantityType(event.target.value);
  };

  return (
    <TableRow key={index}>
      <Data align="center" text={`${index}.`} fromData={true} />
      <Data
        align="center"
        text={<Avatar src={img} alt={vegetable} className="d-block mx-auto" />}
      />
      <Data align="center" text={vegetable} fromData={true} />
      <Data
        align="center"
        text={
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
          />
        }
      />
      <Data
        align="center"
        text={
          <select
            value={quantityType}
            onChange={handleQuantityTypeChange}
            fontSize={6}
          >
            <option value="kg">Kg</option>
            <option value="quintal">Quintal</option>
          </select>
        }
      />
      <Data align="center" text={category} fromData={true} />
      <Data align="center" text={price} />
      <Data align="center" text={calculatedPrice} />
      <Data align="center" text={<DeleteIcon />} />
    </TableRow>
  );
};

export default Cart;
