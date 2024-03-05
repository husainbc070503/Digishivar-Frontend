import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../contexts/AppContext";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import TextFieldInput from "../components/TextField";
import SelectField from "../components/SelectField";
import AddIcon from "@mui/icons-material/Add";
import NoImage from "../assets/no-image.jpg";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const initialState = {
  vegetable: "",
  desc: "",
  quantity_type: "",
  quantity: 1,
  quality: "",
  img: "",
  category: "",
};

const AddProduct = () => {
  const { prices, addProduct, dispatch, products, updateProduct } =
    useGlobalContext();
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState(0);
  const [wholesalePrice, setWholesalePrice] = useState(0);
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "vegetable") {
      const item = prices?.filter((item) =>
        item?.vegetable.toLowerCase().includes(e.target.value.toLowerCase())
      );

      setPrice(item[0]?.wholesalePrice);
      setWholesalePrice(item[0]?.wholesalePrice);
    }

    if (e.target.name === "quantity") {
      if (e.target.value !== "") {
        setPrice(wholesalePrice * e.target.value);
      }
    }

    if (e.target.name === "quantity_type") {
      if (e.target.value === "quintal") setPrice(price * 100);
      else setPrice(wholesalePrice * productDetails.quantity);
    }

    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpload = async (file) => {
    setLoading(true);

    if (file === undefined) {
      setLoading(false);
      return toast.error("Please upload vegetable image.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      setLoading(false);
      return toast.error("JPEG/PNG images are accepted.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    try {
      const url = "https://api.cloudinary.com/v1_1/dm7x7knbb/image/upload";
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "digishivar");
      data.append("class", "dm7x7knbb");

      const res = await fetch(url, {
        method: "POST",
        body: data,
      });

      const resp = await res.json();
      if (resp) {
        toast.success("Vegetable image uploaded successfully.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setProductDetails({ ...productDetails, img: resp.url });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = !id
        ? await addProduct({
            ...productDetails,
            quantity: parseInt(productDetails.quantity),
            price,
          })
        : await updateProduct(
            {
              ...productDetails,
              quantity: parseInt(productDetails.quantity),
              price,
            },
            id
          );

      if (data.success) {
        toast.success(`Product ${id ? "Updated" : "Added"}`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        !id
          ? dispatch({ type: "ADD_PRODUCT", payload: data.product })
          : dispatch({
              type: "UPDATE_PRODUCT",
              payload: { product: data.product, id },
            });

        setProductDetails(initialState);
        setPrice(0);
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

      navigate("/");
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      const pro = products?.filter((item) => item?._id === id)[0];
      const item = prices?.filter((item) =>
        item?.vegetable.toLowerCase().includes(pro.vegetable.toLowerCase())
      );

      setProductDetails(pro);
      setPrice(pro?.price);
      setWholesalePrice(item[0]?.wholesalePrice);
    } else {
      setProductDetails(initialState);
      setPrice(0);
    }
  }, [id]);

  return (
    <Container maxWidth="md" className="container">
      <Box>
        <Typography
          fontWeight="bold"
          fontSize={30}
          color="secondary"
          textAlign="center"
          mb={1}
        >
          {id ? "Edit" : "Add"} Vegetable
        </Typography>
        <div className="product-image">
          <img
            src={
              id
                ? productDetails?.img
                : productDetails.img
                ? productDetails.img
                : NoImage
            }
            alt="image"
          />
          <label htmlFor="add-product-image">
            <AddIcon />
          </label>
          <input
            type="file"
            id="add-product-image"
            accept="image/*"
            onChange={(e) => handleUpload(e.target.files[0])}
            style={{ display: "none" }}
          />
        </div>
        <TextFieldInput
          title="Vegetable"
          type="text"
          others="vegetable"
          value={productDetails?.vegetable}
          onChange={handleChange}
        />
        <TextFieldInput
          title="Description about it"
          type="text"
          others="desc"
          multiline={true}
          rows={4}
          value={productDetails?.desc}
          onChange={handleChange}
        />
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <TextFieldInput
              title="Quantity"
              type="number"
              others="quantity"
              value={productDetails?.quantity}
              onChange={handleChange}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <SelectField
              title="Quantity Type"
              arr={["quintal", "kg"]}
              others="quantity_type"
              value={productDetails?.quantity_type}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item md={5} xs={12}>
            <SelectField
              title="Quality"
              arr={["high", "moderate"]}
              others="quality"
              value={productDetails?.quality}
              onChange={handleChange}
            />
          </Grid>
          <Grid item md={5} xs={12}>
            <SelectField
              title="Category"
              arr={["leafy vegetable", "rooted vegetable", "herbs"]}
              others="category"
              value={productDetails?.category}
              onChange={handleChange}
            />
          </Grid>
          <Grid item md={2} xs={12}>
            <Typography fontSize={18} mb={1}>
              Price
            </Typography>
            <Typography fontWeight="bold" fontSize={28}>
              &#8377; {price}
            </Typography>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="success"
          className="w-100 mt-3 fw-bold"
          disabled={loading}
          onClick={handleSubmit}
        >
          {id ? "Update" : "Add"}
        </Button>
      </Box>
    </Container>
  );
};

export default AddProduct;
