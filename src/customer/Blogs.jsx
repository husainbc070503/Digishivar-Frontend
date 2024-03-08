import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useGlobalContext } from "../contexts/AppContext";
import { CustBlogCard } from "../components/BlogCard";

const Blogs = () => {
  const { blogs } = useGlobalContext();

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
              Blogs
            </Typography>
          </Grid>
        </Grid>
        {blogs?.length > 0 ? (
          <Grid container spacing={2}>
            {blogs?.map((item, ind) => (
              <Grid item md={4} xs={12} key={ind}>
                <CustBlogCard item={item} />
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
