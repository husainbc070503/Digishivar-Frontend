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
  return products?.length > 0 ? (
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
          {products?.map((product, index) => (
            <WishRow key={product?._id} product={product} index={index + 1} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Typography fontWeight="bold" fontSize={20}>
      No products under wishlist
    </Typography>
  );
};

const WishRow = ({ product, index }) => {
  const { _id, vegetable, img, price, category } = product;
  const { removeFromList, addToCart } = useGlobalContext();

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
        text={
          <AddShoppingCartIcon
            className="fs-5 icon"
            color="error"
            onClick={() => addToCart(_id)}
          />
        }
      />
      <Data
        align="center"
        text={
          <DeleteIcon
            className="fs-5 icon"
            color="error"
            onClick={() => removeFromList(_id)}
          />
        }
      />
    </TableRow>
  );
};

export default Wishlist;
