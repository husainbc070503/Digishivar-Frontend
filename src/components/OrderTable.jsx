import {
  Avatar,
  Button,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import React from "react";
import Data from "./Data";
import DownloadIcon from "@mui/icons-material/Download";
import { Link } from "react-router-dom/dist";

const OrderTable = ({ orders }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <Data align="center" text="Sr.No." />
            <Data align="center" text="Products" />
            <Data align="center" text="Amount Paid" />
            <Data align="center" text="Farmer" />
            <Data align="center" text="Farmer's No." />
            <Data align="center" text="Transportation Mode" />
            <Data align="center" text="Payment Mode" />
            <Data align="center" text="Payment Status" />
            <Data align="center" text="Action" />
          </TableRow>
        </TableHead>
        <TableBody>
          {orders?.map((item, ind) => {
            const {
              _id,
              products,
              totalPrice,
              transportationRequired,
              paymentMode,
              paymentStatus,
              farmer,
            } = item;

            return (
              <TableRow key={ind}>
                <Data fromData={true} align="center" text={`${ind + 1}.`} />
                <Data
                  fromData={true}
                  align="center"
                  text={
                    <div className="d-flex mx-auto">
                      {products?.map((e) => (
                        <Tooltip title={e.pro.vegetable}>
                          <Avatar
                            src={e.pro.img}
                            alt={e.pro.vegetable}
                            className="d-block mx-auto"
                          />
                        </Tooltip>
                      ))}
                    </div>
                  }
                />
                <Data
                  fromData={true}
                  align="center"
                  text={
                    <span className="badge bg-success fs-5">
                      &#8377;{totalPrice}
                    </span>
                  }
                />
                <Data fromData={true} align="center" text={farmer?.name} />
                <Data fromData={true} align="center" text={farmer?.phone} />
                <Data
                  fromData={true}
                  align="center"
                  text={
                    transportationRequired[0].toUpperCase() +
                    transportationRequired.substring(1)
                  }
                />
                <Data
                  fromData={true}
                  align="center"
                  text={paymentMode[0].toUpperCase() + paymentMode.substring(1)}
                />
                <Data
                  fromData={true}
                  align="center"
                  text={paymentStatus ? "Successful" : "Pending"}
                />
                <Data
                  align="center"
                  fromData={true}
                  text={
                    <Tooltip title="Print Invoice">
                      <Link
                        style={{ textDecoration: "none" }}
                        to={`../generateInvoice/${_id}`}
                      >
                        <DownloadIcon color="success" />
                      </Link>
                    </Tooltip>
                  }
                />
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderTable;
