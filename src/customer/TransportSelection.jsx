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
} from "@mui/material";
import { useGlobalContext } from "../contexts/AppContext";
import Data from "../components/Data";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

const TransportSelection = () => {
  const { cart } = useGlobalContext();

  return (
    <Container maxWidth="xl" className="container">
      <Grid container spacing={2} my={1}>
        <Grid item md={6} xs={12}>
          <Typography fontSize={35} fontWeight="bold" color="primary">
            <ShoppingBagIcon className="text-dark fs-3 me-2" /> My Orders
          </Typography>
        </Grid>
      </Grid>
      <div className="Order-container">
        <OrderTable products={cart} />
      </div>
    </Container>
  );
};

const OrderTable = ({ products }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <Data align="center" text="Sr.No." />
          <Data align="center" text="Image" />
          <Data align="center" text="Vegetable" />
          <Data align="center" text="Category" />
          <Data align="center" text="Price / Kg" />
          <Data align="center" text="Quantity" />
          <Data align="center" text="Quantity Type" />
        </TableHead>
        <TableBody>
          {products.map((product, index) => (
            <OrderRow key={product._id} product={product} index={index + 1} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const OrderRow = ({ product, index }) => {
  const { vegetable, img, price, category, userQuantity, userQuantityType } =
    product;

  return (
    <TableRow key={index}>
      <Data align="center" text={`${index}.`} fromData={true} />
      <Data
        align="center"
        text={<Avatar src={img} alt={vegetable} className="d-block mx-auto" />}
      />
      <Data align="center" text={vegetable} fromData={true} />
      <Data align="center" text={category} fromData={true} />
      <Data align="center" text={price} />
      <Data align="center" text={userQuantity} />
      <Data align="center" text={userQuantityType} />
    </TableRow>
  );
};

export default TransportSelection;
