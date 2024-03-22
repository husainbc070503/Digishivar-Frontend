import {
  Box,
  Button,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SearchBox from "../components/SearchBox";
import { useGlobalContext } from "../contexts/AppContext";
import Data from "../components/Data";
import PurchasedProducts from "../components/PurchasedProducts";

const Orders = () => {
  const { orders, handleChangeStatus, user } = useGlobalContext();
  const [search, setSearch] = useState("");

  const ordersToMe = orders?.filter(
    (item) => item?.farmer?._id === user?.user?._id
  );

  return (
    <Container className="container" maxWidth="xl">
      <Box>
        <Grid container spacing={2} my={1}>
          <Grid item md={6} xs={12}>
            <Typography fontSize={35} fontWeight="bold" color="primary">
              Orders
            </Typography>
          </Grid>
          <Grid item md={6} xs={12} textAlign="end">
            <SearchBox
              title="Customer Name"
              search={search}
              handleChange={(e) => setSearch(e.target.value.toLowerCase())}
            />
          </Grid>
        </Grid>
        {ordersToMe?.length > 0 ? (
          <TableContainer>
            <Table>
              <TableHead>
                <Data align="center" text="Sr.No." />
                <Data align="center" text="Name" />
                <Data align="center" text="Address" />
                <Data align="center" text="Contact" />
                <Data align="center" text="Products Purchased" />
                <Data align="center" text="Total Amount" />
                <Data align="center" text="Transportation Mode" />
                <Data align="center" text="Payment Mode" />
                <Data align="center" text="Payment Status" />
                <Data align="center" text="Payment Received" />
              </TableHead>
              <TableBody>
                {ordersToMe
                  ?.filter((item) =>
                    item.user.name.toLowerCase().includes(search)
                  )
                  ?.map((item, ind) => {
                    const {
                      _id,
                      user,
                      products,
                      totalPrice,
                      transportationRequired,
                      paymentMode,
                      paymentStatus,
                    } = item;

                    return (
                      <TableRow key={ind}>
                        <Data
                          align="center"
                          fromData={true}
                          text={`${ind + 1}.`}
                        />
                        <Data
                          align="center"
                          fromData={true}
                          text={user?.name}
                        />
                        <Data
                          align="center"
                          fromData={true}
                          text={user?.address}
                        />
                        <Data
                          align="center"
                          fromData={true}
                          text={user?.phone}
                        />
                        <TableCell align="center">
                          <PurchasedProducts products={products} />
                        </TableCell>
                        <Data
                          align="center"
                          text={
                            <span className="badge bg-info fs-5">
                              &#8377;{totalPrice.toLocaleString("en-IN")}
                            </span>
                          }
                        />
                        <Data
                          align="center"
                          fromData={true}
                          text={
                            transportationRequired[0].toUpperCase() +
                            transportationRequired.substring(1)
                          }
                        />
                        <Data
                          align="center"
                          fromData={true}
                          text={
                            paymentMode[0].toUpperCase() +
                            paymentMode.substring(1)
                          }
                        />
                        <Data
                          align="center"
                          fromData={true}
                          text={paymentStatus ? "Successful" : "Pending"}
                        />
                        <TableCell>
                          {!paymentStatus ? (
                            <Button
                              color="success"
                              variant="contained"
                              onClick={() => handleChangeStatus(_id)}
                            >
                              Cash Received
                            </Button>
                          ) : (
                            <div className="fw-bold fs-6 text-center">Yes</div>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography fontSize={20} fontWeight="bold" mt={1}>
            Still no orders
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Orders;
