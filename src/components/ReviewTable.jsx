import {
  Avatar,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import Data from "./Data";
import { useGlobalContext } from "../contexts/AppContext";
import DeleteIcon from "@mui/icons-material/Delete";

const ReviewTable = ({ reviews, id, role }) => {
  const { user, deleteReview } = useGlobalContext();

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <Data align="center" text="Sr.No." />
            <Data align="center" text="Name" />
            <Data align="center" text="Review" />
            {role === "customer" && <Data align="center" text="Action" />}
          </TableRow>
        </TableHead>
        <TableBody>
          {reviews?.map((item, ind) => (
            <TableRow key={ind}>
              <Data align="center" fromData={true} text={`${ind + 1}.`} />
              <Data align="center" fromData={true} text={item?.user?.name} />
              <Data align="center" fromData={true} text={item?.review} />
              {role === "customer" && (
                <Data
                  align="center"
                  fromData={true}
                  text={
                    item?.user?._id === user?.user?._id && (
                      <DeleteIcon
                        color="error"
                        className="icon fs-5"
                        onClick={() => deleteReview(id, item?._id)}
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

export default ReviewTable;
