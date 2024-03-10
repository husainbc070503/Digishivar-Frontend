import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import { Grid, Rating, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../contexts/AppContext";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import WishListIcon from "@mui/icons-material/Favorite";
import Reviews from "../customer/Reviews";

const VegetableCard = ({ item }) => {
  const { deleteProduct } = useGlobalContext();

  const {
    _id,
    img,
    vegetable,
    desc,
    quantity,
    quality,
    quantity_type,
    price,
    category,
    rating,
    reviews,
  } = item;

  const { user, addToCart, addToWishlist } = useGlobalContext();

  const handleAddToCart = (productId) => {
    addToCart(productId);
  };

  const handleAddToWishlist = (productId) => {
    addToWishlist(productId);
  };

  return (
    <Card>
      <CardMedia component="img" className="CardMedia size" src={img} />
      <CardContent>
        <Typography fontSize={24} fontWeight="bold" mb={1} color="secondary">
          {vegetable}
        </Typography>
        <Typography color="GrayText" textAlign="justify" fontSize={14} mb={1}>
          {desc}
        </Typography>
        <Grid container spacing={2} mb={2}>
          <Grid item md={4} xs={4}>
            <Typography fontSize={17}>Price</Typography>
            <Typography className="fw-bold badge bg-success">
              &#8377; {price}
            </Typography>
          </Grid>
          <Grid item md={4} xs={4}>
            <Typography fontSize={17}>Quantity</Typography>
            <Typography className="fw-bold badge bg-info">
              {quantity + " " + quantity_type}
            </Typography>
          </Grid>
          <Grid item md={4} xs={4}>
            <Typography fontSize={17}>Quality</Typography>
            <Typography className="fw-bold badge bg-warning text-dark">
              {quality[0].toUpperCase() + quality.substring(1)}
            </Typography>
          </Grid>
        </Grid>
        <Typography display="inline-block" fontSize={17}>
          Category
        </Typography>
        <Typography
          display="inline-block"
          className="ms-2 fw-bold badge bg-danger"
        >
          {category[0].toUpperCase() + category.substring(1)}
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container spacing={2}>
          <Grid item md={6} xs={6}>
            <Rating value={rating} precision={0.5} readOnly />
          </Grid>
          <Grid item md={6} xs={6} textAlign="end">
            <Tooltip title="Reviews">
              <Reviews id={_id} reviews={reviews} role={user?.user?.role} />
            </Tooltip>

            {user?.user ? (
              user?.user?.role === "farmer" ? (
                <>
                  <Tooltip title="Edit">
                    <Link to={`../editProduct/${_id}`}>
                      <EditIcon className="icon mx-1 fs-5 text-warning" />
                    </Link>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <DeleteIcon
                      className="text-danger fs-5 icon"
                      onClick={() => deleteProduct(_id)}
                    />
                  </Tooltip>
                </>
              ) : (
                <>
                  <Tooltip title="Add to Cart">
                    <AddShoppingCartIcon
                      className="text-primary fs-5 mx-1 icon"
                      onClick={() => handleAddToCart(item._id)}
                    />
                  </Tooltip>
                  <Tooltip title="Add to Wishlist">
                    <WishListIcon
                      className="text-danger fs-5 icon"
                      onClick={() => handleAddToWishlist(item._id)}
                    />
                  </Tooltip>
                </>
              )
            ) : null}
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default VegetableCard;
