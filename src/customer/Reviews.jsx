import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ReviewsIcon from "@mui/icons-material/Reviews";
import ReviewTable from "../components/ReviewTable";
import { Button, Rating } from "@mui/material";
import TextFieldInput from "../components/TextField";
import { useGlobalContext } from "../contexts/AppContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  maxWidth: "96%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  border: 0,
};

const Reviews = ({ id, reviews, role }) => {
  const { addReview, giveRating } = useGlobalContext();
  const [open, setOpen] = React.useState(false);
  const [openReview, setOpenReview] = React.useState(false);
  const [review, setReview] = React.useState("");
  const [rating, setRating] = React.useState(0);

  return (
    <div className="d-inline-block">
      <ReviewsIcon
        className="icon mx-1 fs-5 text-secondary"
        onClick={() => setOpen(true)}
      />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography fontSize={30} mb={1} color="primary" fontWeight="bold">
            Reviews
          </Typography>

          {reviews?.length > 0 ? (
            <ReviewTable reviews={reviews} id={id} role={role} />
          ) : (
            <Typography fontSize={16} textAlign="justify" fontWeight="bold">
              No reviews. {role === "customer" && "Be the first to add"}
            </Typography>
          )}

          {role === "customer" && (
            <>
              {!openReview ? (
                <Button
                  color="secondary"
                  variant="contained"
                  className="mt-4"
                  onClick={() => setOpenReview(true)}
                >
                  Add Yours
                </Button>
              ) : (
                <div className="my-3">
                  <TextFieldInput
                    type="text"
                    title="Review"
                    multiline={true}
                    rows={6}
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                  />
                  <Button
                    color="success"
                    variant="contained"
                    onClick={() => addReview(id, review, setOpenReview)}
                  >
                    Add
                  </Button>
                  <Button color="error" variant="contained" className="ms-3">
                    Cancel
                  </Button>
                </div>
              )}

              <Typography
                fontSize={26}
                fontWeight="bold"
                mt={3}
                color="primary"
              >
                Give Rating
              </Typography>
              <div className="mt-2 d-flex align-items-center">
                <Rating
                  value={rating}
                  onChange={(event, newValue) => setRating(newValue)}
                  precision={0.5}
                />
                <Button
                  color="success"
                  variant="contained"
                  className="ms-4"
                  onClick={() => giveRating(id, rating)}
                >
                  Rate
                </Button>
              </div>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Reviews;
