import React from "react";
import { useGlobalContext } from "../contexts/AppContext";
import { Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material";
import Data from "./Data";
import DeleteIcon from "@mui/icons-material/Delete";

const CommentTable = ({ comments, id, role }) => {
  const { user, deleteComment } = useGlobalContext();

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <Data align="center" text="Sr.No." />
            <Data align="center" text="Name" />
            <Data align="center" text="Comment" />
            {role === "customer" && <Data align="center" text="Action" />}
          </TableRow>
        </TableHead>
        <TableBody>
          {comments?.map((item, ind) => (
            <TableRow key={ind}>
              <Data align="center" fromData={true} text={`${ind + 1}.`} />
              <Data align="center" fromData={true} text={item?.user?.name} />
              <Data align="center" fromData={true} text={item?.comment} />
              {role === "customer" && (
                <Data
                  align="center"
                  fromData={true}
                  text={
                    item?.user?._id === user?.user?._id && (
                      <DeleteIcon
                        color="error"
                        className="icon fs-5"
                        onClick={() => deleteComment(id, item?._id)}
                      />
                    )
                  }
                />
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CommentTable;
