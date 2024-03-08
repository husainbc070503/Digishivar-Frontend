import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const CartCard = ({ product }) => {
  const { title, image, description, price } = product;

  return (
    <Card>
      <CardMedia component="img" src={image} />
      <CardContent>
        <Typography fontSize={28} fontWeight="bold" mb={1} color="secondary">
          {title}
        </Typography>
        <Typography color="GrayText" textAlign="justify" fontSize={15} mb={1}>
          {description}
        </Typography>
        <Typography color="GrayText" textAlign="justify" fontSize={15} mb={1}>
          Price: ${price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CartCard;
