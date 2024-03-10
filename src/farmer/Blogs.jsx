import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import SearchBox from "../components/SearchBox";
import { useGlobalContext } from "../contexts/AppContext";
import { Link } from "react-router-dom";
import BlogCard from "../components/BlogCard";

const Blogs = () => {
  const { blogs, user } = useGlobalContext();
  const [search, setSearch] = useState("");
  const myBlogs = blogs?.filter((item) => item?.user?._id === user?.user?._id);

  return (
    <Container maxWidth="xl" className="container">
      <Box>
        <Grid container spacing={2} my={2} alignItems="center">
          <Grid item md={6} xs={12}>
            <Typography
              fontSize={30}
              color="primary"
              fontWeight="bold"
              className="Typography farmer-dash"
            >
              My Blogs
            </Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <Grid container spacing={2} alignItems="center">
              <Grid item md={10} xs={12}>
                <SearchBox
                  title="Blog"
                  search={search}
                  handleChange={(e) => setSearch(e.target.value.toLowerCase())}
                />
              </Grid>
              <Grid item md={2} xs={12}>
                <Link to="../addBlog" className="link">
                  <Button variant="contained" color="secondary">
                    Add Blog
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {myBlogs?.length > 0 ? (
          <Grid container spacing={2}>
            {myBlogs
              ?.filter((item) => item?.title.toLowerCase().includes(search))
              ?.map((item, ind) => (
                <Grid item md={4} xs={12} key={ind}>
                  <BlogCard item={item} />
                </Grid>
              ))}
          </Grid>
        ) : (
          <Typography fontSize={20} fontWeight="bold">
            No blogs created!!
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Blogs;
