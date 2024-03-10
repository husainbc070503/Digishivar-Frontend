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
import DeleteIcon from "@mui/icons-material/Delete";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ListIcon from "@mui/icons-material/FormatListBulleted";

const Wishlist = () => {
  const { wishlist } = useGlobalContext();

  return (
    <Container maxWidth="xl" className="container">
      <Grid container spacing={2} my={1}>
        <Grid item md={6} xs={12}>
          <Typography fontSize={35} fontWeight="bold" color="primary">
            <ListIcon className="text-dark fs-3 me-2" /> My Wishlist
          </Typography>
        </Grid>
      </Grid>
      <div className="Wish-container">
        <WishTable products={wishlist} />
      </div>
    </Container>
  );
};

const WishTable = ({ products }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <Data align="center" text="Sr.No." />
          <Data align="center" text="Image" />
          <Data align="center" text="Vegetable" />
          <Data align="center" text="Category" />
          <Data align="center" text="Price / Kg" />
          <Data align="center" text="Add to Cart" />
          <Data align="center" text="Delete" />
        </TableHead>
        <TableBody>
          {products.map((product, index) => (
            <WishRow key={product._id} product={product} index={index + 1} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const WishRow = ({ product, index }) => {
  const { vegetable, img, price, category } = product;

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
      <Data
        align="center"
        text={<AddShoppingCartIcon className="text-primary" />}
      />
      <Data align="center" text={<DeleteIcon />} />
    </TableRow>
  );
};

export default Wishlist;
