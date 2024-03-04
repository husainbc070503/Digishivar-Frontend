import React, { useState } from "react";
import { useGlobalContext } from "../contexts/AppContext";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import TextFieldInput from "../components/TextField";
import SelectField from "../components/SelectField";
import AddIcon from "@mui/icons-material/Add";
import NoImage from "../assets/no-image.jpg";
import { toast } from "react-toastify";

const initialState = {
  vegetable: "",
  desc: "",
  quantity_type: "",
  quantity: 0,
  quality: "",
  price: 0,
  img: "",
  category: "",
};

const AddProduct = () => {
  const { prices, addProduct, dispatch } = useGlobalContext();
  const [productDetails, setProductDetails] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });

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
      const data = await addProduct({
        ...productDetails,
        quantity: parseInt(productDetails.quantity),
        price: parseInt(productDetails.price),
      });

      if (data.success) {
        toast.success("Product Added", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        dispatch({ type: "ADD_PRODUCT", payload: data.product });
        setProductDetails(initialState);
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
          Add Vegetable
        </Typography>
        <div className="product-image">
          <img
            src={productDetails.img ? productDetails.img : NoImage}
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
          value={productDetails.vegetable}
          onChange={handleChange}
        />
        <TextFieldInput
          title="Description about it"
          type="text"
          others="desc"
          multiline={true}
          rows={4}
          value={productDetails.desc}
          onChange={handleChange}
        />
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <TextFieldInput
              title="Quantity"
              type="number"
              others="quantity"
              value={productDetails.quantity}
              onChange={handleChange}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <SelectField
              title="Quantity Type"
              arr={["quintal", "kg"]}
              others="quantity_type"
              value={productDetails.quantity_type}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item md={4} xs={12}>
            <SelectField
              title="Quality"
              arr={["high", "moderate"]}
              others="quality"
              value={productDetails.quality}
              onChange={handleChange}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <TextFieldInput
              title="Price"
              type="number"
              others="price"
              value={productDetails.price}
              onChange={handleChange}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <SelectField
              title="Category"
              arr={["leafy vegetable", "rooted vegetable", "herbs"]}
              others="category"
              value={productDetails.category}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          className="w-100 mt-3"
          disabled={loading}
          onClick={handleSubmit}
        >
          Add
        </Button>
      </Box>
    </Container>
  );
};

export default AddProduct;
