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
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useGlobalContext } from "../contexts/AppContext";
import Data from "../components/Data";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

const TransportSelection = () => {
  const { cart, prices, handleBuyAll, addOrder } = useGlobalContext();
  const [transportationRequired, setTransportationRequired] =
    React.useState("");
  const [paymentMode, setPaymentMode] = React.useState("");

  const totalPrice = () => {
    var sum = 0;

    cart?.forEach((item) => {
      const actualPriceOfProduct = prices?.filter((e) =>
        e?.vegetable.toLowerCase()?.includes(item?.vegetable.toLowerCase())
      )[0]?.wholesalePrice;

      if (item.userQuantityType === "quintal")
        sum += item.userQuantity * actualPriceOfProduct * 100;
      else sum += item.userQuantity * actualPriceOfProduct;
    });
    return sum;
  };

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
      <Grid container spacing={2} my={1}>
        <Grid item md={4} xs={12}>
          <RadioBox
            value={transportationRequired}
            onChange={(e) => setTransportationRequired(e.target.value)}
            title="Transport Mode"
            arr={["Delivery", "Pick Up"]}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <RadioBox
            value={paymentMode}
            onChange={(e) => setPaymentMode(e.target.value)}
            title="Payment Mode"
            arr={["Offline", "Online"]}
          />
        </Grid>
      </Grid>
      {paymentMode &&
        (paymentMode === "online" ? (
          <Button
            onClick={() =>
              handleBuyAll(totalPrice(), transportationRequired, paymentMode)
            }
            variant="contained"
            color="success"
          >
            Checkout
          </Button>
        ) : (
          <Button
            variant="contained"
            color="success"
            onClick={() =>
              addOrder(totalPrice(), transportationRequired, paymentMode, false)
            }
          >
            Confirm Order
          </Button>
        ))}
      <Button color="info" variant="contained" className="ms-2">
        Total Price: &#8377;{totalPrice()}
      </Button>
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
  const { prices } = useGlobalContext();
  const { vegetable, img, category, userQuantity, userQuantityType } = product;
  const actualPriceOfProduct = prices?.filter((item) =>
    item?.vegetable?.toLowerCase()?.includes(vegetable.toLowerCase())
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
      <Data align="center" text={userQuantity + " " + userQuantityType} />
    </TableRow>
  );
};

const RadioBox = ({ value, onChange, arr, title }) => {
  return (
    <FormControl className="mb-4">
      <Typography fontSize={20} fontWeight="bold">
        {title}
      </Typography>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="role"
        value={value}
        onChange={onChange}
      >
        {arr.map((item, index) => (
          <FormControlLabel
            key={index}
            value={item.toLowerCase()}
            control={<Radio />}
            label={item}
            name="role"
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default TransportSelection;
