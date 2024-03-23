import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/dist";
import { useGlobalContext } from "../contexts/AppContext";
import { Box, Container, Grid, Typography } from "@mui/material";
import logo from "../assets/logo.jpeg";
import _ from "lodash";
import {
  Avatar,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import Data from "./Data";

const InvoiceNew = () => {
  const { id } = useParams();
  const { orders } = useGlobalContext();

  const [order, setOrder] = useState({});
  const printBox = () => {
    var printContents = document.getElementById("print-box").innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  };

  useEffect(() => {
    setOrder(orders?.filter((item) => item?._id === id)[0]);
  }, [id, orders]);

  useEffect(() => {
    setTimeout(() => {
      window.print();
    }, 5000);
  }, [id]);

  return (
    <Container className="container" maxWidth="sm">
      <Box id="print-box">
        <div className="d-flex align-items-center justify-content-center my-3">
          <div className="invoice-logo">
            <img src={logo} alt="logo" className="image" />
          </div>
          <Typography fontSize={32} ml={1} fontWeight="bold">
            Digishivar
          </Typography>
        </div>
        <div className="invoice-box">
          <Grid container spacing mt={2}>
            <Grid item md={4} xs={4}>
              <Typography>Name</Typography>
            </Grid>
            <Grid item md={8} xs={8}>
              <Typography>{order?.user?.name}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing>
            <Grid item md={4} xs={4}>
              <Typography>Contact</Typography>
            </Grid>
            <Grid item md={8} xs={8}>
              <Typography>{order?.user?.phone}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing>
            <Grid item md={4} xs={4}>
              <Typography>Email</Typography>
            </Grid>
            <Grid item md={8} xs={8}>
              <Typography>{order?.user?.email}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing mt={5} mb={2}>
            <Table>
              <TableHead>
                <TableRow>
                  <Data align="center" text="Sr.No." />
                  <Data align="center" text="Products" />
                  <Data align="center" text="Quantity" />
                </TableRow>
              </TableHead>
              <TableBody>
                {order?.products?.map((item, ind) => {
                  return (
                    <TableRow key={ind}>
                      <Data
                        fromData={true}
                        align="center"
                        text={`${ind + 1}.`}
                      />
                      <Data
                        fromData={true}
                        align="center"
                        text={
                          <div className="d-flex mx-auto">
                            <Tooltip title={item?.pro?.vegetable}>
                              <Avatar
                                src={item?.pro?.img}
                                alt={item?.pro?.vegetable}
                                className="d-block mx-auto"
                              />
                            </Tooltip>
                          </div>
                        }
                      />
                      <Data
                        fromData={true}
                        align="center"
                        text={
                          item?.userQuantity +
                          " " +
                          _.startCase(item?.userQuantityType)
                        }
                      />
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Grid>

          <Grid container spacing>
            <Grid item md={4} xs={4}>
              <Typography>Transport Mode</Typography>
            </Grid>
            <Grid item md={8} xs={8}>
              <Typography>
                {_.startCase(order?.transportationRequired)}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing>
            <Grid item md={4} xs={4}>
              <Typography>Payment Mode</Typography>
            </Grid>
            <Grid item md={8} xs={8}>
              <Typography>{_.startCase(order?.paymentMode)}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing>
            <Grid item md={4} xs={4}>
              <Typography>Total Price</Typography>
            </Grid>
            <Grid item md={8} xs={8}>
              <Typography style={{ fontWeight: "bold" }}>
                {order?.totalPrice + " Rs."}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing>
            <Grid item md={7} xs={4} mt={5}>
              <Typography style={{ fontWeight: "bold" }}>
                Thankyou For Shopping!
              </Typography>
            </Grid>
          </Grid>
        </div>
      </Box>
    </Container>
  );
};

export default InvoiceNew;
