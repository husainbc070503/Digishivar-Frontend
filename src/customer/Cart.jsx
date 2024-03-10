import * as React from "react";
import {
  Avatar,
  Container,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useGlobalContext } from "../contexts/AppContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Data from "../components/Data";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SelectField from "../components/SelectField";
import { NavLink } from "react-router-dom";

const Cart = () => {
  const { cart, prices } = useGlobalContext();

  const totalPrice = () => {
    var sum = 0;

    cart?.forEach((item) => {
      const actualPriceOfProduct = prices?.filter((e) =>
        e?.vegetable?.includes(item?.vegetable)
      )[0]?.wholesalePrice;

      if (item.userQuantityType === "quintal")
        sum += item.userQuantity * actualPriceOfProduct * 100;
      else sum += item.userQuantity * actualPriceOfProduct;
    });
    return sum;
  };

  return (
    <Container maxWidth="xl" className="container">
      <Typography fontSize={35} fontWeight="bold" color="primary">
        <ShoppingCartIcon className="text-dark fs-3 me-2" /> My Cart
      </Typography>
      <div className="cart-container">
        <CartTable products={cart} />
      </div>
      <div className="d-flex align-items-center">
        <CartSummary total={totalPrice()} />
        <Typography
          ml={1}
          mt={2}
          fontSize={20}
          fontWeight="bold"
          className="badge bg-primary"
        >
          Total Price: &#8377;{totalPrice()}
        </Typography>
      </div>
    </Container>
  );
};

const CartTable = ({ products }) => {
  return products?.length > 0 ? (
    <TableContainer>
      <Table>
        <TableHead>
          <Data align="center" text="Sr.No." />
          <Data align="center" text="Image" />
          <Data align="center" text="Vegetable" />
          <Data align="center" text="Quantity" width={100} />
          <Data align="center" text="Quantity Type" />
          <Data align="center" text="Category" />
          <Data align="center" text="Price" />
          <Data align="center" text="Action" />
        </TableHead>
        <TableBody>
          {products.map((product, index) => (
            <CartRow key={product._id} product={product} index={index + 1} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Typography fontWeight="bold" fontSize={20}>
      No products added to cart
    </Typography>
  );
};

// const CartSummary = ({ total }) => {
const CartSummary = () => {
  // const { handleBuyAll } = useGlobalContext();
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
      <NavLink
        to="../pay"
        variant="contained"
        color="success"
        // onClick={() => handleBuyAll(total)}
      >
        Buy All
      </NavLink>
    </div>
  );
};

const CartRow = ({ product, index }) => {
  const {
    prices,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    handleChangeUserQuantityType,
  } = useGlobalContext();

  const {
    _id,
    vegetable,
    img,
    category,
    userQuantity,
    userQuantityType,
    quantity,
  } = product;

  const actualPriceOfProduct = prices?.filter((item) =>
    item?.vegetable?.includes(vegetable)
  )[0]?.wholesalePrice;

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
          <div className="d-flex align-items-center justify-content-between">
            <RemoveIcon
              onClick={() => decrementQuantity(_id)}
              className="icon fs-5"
            />
            <Typography fontSize={25} fontWeight="bold">
              {userQuantity}
            </Typography>
            <AddIcon
              onClick={() => incrementQuantity(_id, quantity)}
              className="fs-5 icon"
            />
          </div>
        }
      />
      <Data
        align="center"
        text={
          userQuantityType === "quintal" ? (
            <SelectField
              value={userQuantityType}
              arr={["quintal", "kg"]}
              onChange={(e) =>
                handleChangeUserQuantityType(_id, e.target.value)
              }
            />
          ) : (
            userQuantityType.toUpperCase()
          )
        }
        fromData={true}
      />
      <Data
        align="center"
        text={category[0].toUpperCase() + category.substring(1)}
        fromData={true}
      />
      <Data
        align="center"
        text={
          <span className="badge bg-info fs-5">
            &#8377;
            {userQuantityType === "quintal"
              ? userQuantity * actualPriceOfProduct * 100
              : userQuantity * actualPriceOfProduct}
          </span>
        }
      />
      <Data
        align="center"
        text={
          <DeleteIcon
            className="fs-5 icon"
            color="error"
            onClick={() => removeFromCart(_id)}
          />
        }
      />
    </TableRow>
  );
};

export default Cart;
