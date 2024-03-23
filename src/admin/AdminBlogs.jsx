import {
  Box,
  Card,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import { useGlobalContext } from "../contexts/AppContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Comments from "../customer/Comments";

const AdminBlogs = () => {
  const { blogs } = useGlobalContext();

  return (
    <Container maxWidth="lg" className="container">
      <Box>
        <Typography fontSize={40} fontWeight="bold" color="primary">
          <HistoryEduIcon className="text-dark fs-1 me-2" /> Blogs
        </Typography>
        <Grid container spacing={2} my={1}>
          {blogs?.length > 0 &&
            blogs?.map((item) => {
              const { title, description, image, likes, comments, user } = item;

              return (
                <Grid item md={6} xs={12}>
                  <Card>
                    <Grid container spacing={2}>
                      <Grid item md={4} xs={4}>
                        <CardMedia
                          component="img"
                          sx={{ height: "100%" }}
                          src={image}
                          alt={title}
                        />
                      </Grid>
                      <Grid item md={8} xs={8} px={1}>
                        <Typography fontSize={30} fontWeight="bold" mb={1}>
                          {title}
                        </Typography>
                        <Typography fontSize={12} textAlign="justify" mb={2}>
                          {description}
                        </Typography>
                        <Grid container mb={1}>
                          <Grid
                            item
                            md={6}
                            xs={6}
                            className="d-flex align-items-center"
                          >
                            <div className="me-2">
                              <FavoriteIcon className="fs-5" color="error" />
                              <span className="ml-1">{likes?.length}</span>
                            </div>
                            <div>
                              <Comments role={user?.role} comments={comments} />
                              <span className="ml-1">{comments?.length}</span>
                            </div>
                          </Grid>
                          <Grid item md={6} xs={6} textAlign="end">
                            <Typography fontSize={14} color="secondary">
                              ~By {user?.name}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </Container>
  );
};

export default AdminBlogs;
