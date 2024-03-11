import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CommentIcon from "@mui/icons-material/Comment";
import { Button } from "@mui/material";
import TextFieldInput from "../components/TextField";
import { useGlobalContext } from "../contexts/AppContext";
import CommentTable from "../components/CommentTable";

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

const Comments = ({ id, comments, role }) => {
  const { addComment } = useGlobalContext();
  const [open, setOpen] = React.useState(false);
  const [openCommentBox, setOpenCommentBox] = React.useState(false);
  const [comment, setComment] = React.useState("");

  return (
    <div className="d-inline-block">
      <CommentIcon className="fs-4 icon" onClick={() => setOpen(true)} />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography fontSize={30} mb={1} color="secondary" fontWeight="bold">
            Comments
          </Typography>

          {comments?.length > 0 ? (
            <CommentTable comments={comments} id={id} role={role} />
          ) : (
            <Typography fontSize={16} textAlign="justify" fontWeight="bold">
              No comments. {role === "customer" && "Be the first to add"}
            </Typography>
          )}

          {role === "customer" && (
            <>
              {!openCommentBox ? (
                <Button
                  color="secondary"
                  variant="contained"
                  className="mt-4"
                  onClick={() => setOpenCommentBox(true)}
                >
                  Add
                </Button>
              ) : (
                <div className="my-3">
                  <TextFieldInput
                    type="text"
                    title="Comment"
                    multiline={true}
                    rows={6}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <Button
                    color="success"
                    variant="contained"
                    onClick={() => addComment(id, comment, setOpenCommentBox)}
                  >
                    Add
                  </Button>
                  <Button
                    color="error"
                    variant="contained"
                    className="ms-3"
                    onClick={() => setOpenCommentBox(false)}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Comments;
