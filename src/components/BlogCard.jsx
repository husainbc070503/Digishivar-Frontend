import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import { Grid, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../contexts/AppContext";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";

const BlogCard = ({ item }) => {
  const { deleteBlog } = useGlobalContext();
  const { _id, image, title, description, likes, comments } = item;

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
      </CardContent>
      <CardActions>
        <Grid container spacing={2}>
          <Grid item md={6} xs={6} className="d-flex align-items-center">
            <Tooltip title="Likes">
              <div className="text-danger d-flex align-items-center">
                <FavoriteBorderIcon className="fs-4" />
                <span className="fs-5 ml-1">{likes?.length}</span>
              </div>
            </Tooltip>
            <Tooltip title="Comments">
              <div className="text-secondary d-flex align-items-center ms-2">
                <CommentIcon className="fs-4" />
                <span className="fs-5 ml-1">{comments?.length}</span>
              </div>
            </Tooltip>
          </Grid>
          <Grid item md={6} xs={6} textAlign="end">
            <Tooltip title="Edit">
              <Link to={`../editBlog/${_id}`}>
                <EditIcon className="icon mx-1 fs-5 text-warning" />
              </Link>
            </Tooltip>
            <Tooltip title="Delete">
              <DeleteIcon
                className="text-danger fs-5 icon"
                onClick={() => deleteBlog(_id)}
              />
            </Tooltip>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default BlogCard;