import {
  Avatar,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Button,
} from "@mui/material";
import React from "react";
import Data from "./Data";
import DownloadIcon from "@mui/icons-material/Download";

const OrderTable = ({ orders }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <Data align="center" text="Sr.No." />
            <Data align="left" text="Products" />
            <Data align="center" text="Amount Paid" />
            <Data align="center" text="Transportation Mode" />
            <Data align="center" text="Payment Mode" />
            <Data align="center" text="Payment Status" />
            <Data align="center" text="Action" />
          </TableRow>
        </TableHead>
        <TableBody>
          {orders?.map((item, ind) => {
            const {
              products,
              totalPrice,
              transportationRequired,
              paymentMode,
              paymentStatus,
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
                          <Avatar src={e.pro.img} alt={e.pro.vegetable} />
                        </Tooltip>
                      ))}
                    </div>
                  }
                />
                <Data fromData={true} align="center" text={totalPrice} />
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
                  fromData={true}
                  align="center"
                  text={
                    <Button>
                      <DownloadIcon />
                    </Button>
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
