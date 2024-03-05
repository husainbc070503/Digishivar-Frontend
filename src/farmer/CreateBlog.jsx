import { Button, Container, Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NoImage from "../assets/no-image.jpg";
import TextFieldInput from "../components/TextField";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import { useGlobalContext } from "../contexts/AppContext";

const initialState = {
  title: "",
  description: "",
  image: "",
};

const CreateBlog = () => {
  const { addBlog, updateBlog, dispatch, blogs } = useGlobalContext();
  const { id } = useParams();
  const [blogDetails, setBlogDetails] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setBlogDetails({ ...blogDetails, [e.target.name]: e.target.value });

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
        toast.success("Blog image uploaded successfully.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setBlogDetails({ ...blogDetails, image: resp.url });
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
        ? await addBlog(blogDetails)
        : await updateBlog(blogDetails, id);

      if (data.success) {
        toast.success(`Blog ${id ? "Updated" : "Added"}`, {
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
          ? dispatch({ type: "ADD_BLOG", payload: data.blog })
          : dispatch({
              type: "UPDATE_BLOG",
              payload: { blog: data.blog, id },
            });

        setBlogDetails(initialState);
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

      navigate("../blogs");
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
    setBlogDetails(blogs?.filter((item) => item?._id === id)[0]);
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
          {id ? "Edit" : "Add"} Blog
        </Typography>
        <div className="product-image">
          <img
            src={
              id
                ? blogDetails?.image
                : blogDetails?.image
                ? blogDetails?.image
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
          title="Title"
          others="title"
          type="text"
          value={blogDetails?.title}
          onChange={handleChange}
        />
        <TextFieldInput
          title="Description"
          others="description"
          type="text"
          multiline={true}
          rows={10}
          value={blogDetails?.description}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="success"
          className="fw-bold mx-auto d-block"
          onClick={handleSubmit}
          disabled={loading}
        >
          {id ? "Update" : "Add"}
        </Button>
      </Box>
    </Container>
  );
};

export default CreateBlog;
