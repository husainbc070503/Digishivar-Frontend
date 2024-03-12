import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { useGlobalContext } from "../contexts/AppContext";
import PaymentIcon from "@mui/icons-material/Payment";
import OrderTable from "../components/OrderTable";

const OrderHistory = () => {
  const { orders, user } = useGlobalContext();
  const myOrders = orders?.filter(
    (item) => item?.user?._id === user?.user?._id
  );

  return (
    <Container maxWidth="xl" className="container">
      <Box>
        <Typography fontSize={35} fontWeight="bold" color="primary" mb={1}>
          <PaymentIcon className="text-dark fs-3 me-2" /> My Past Orders
        </Typography>
        {myOrders?.length > 0 ? (
          <OrderTable orders={myOrders} />
        ) : (
          <Typography fontSize={18} fontWeight="bold">
            No order place till now
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default OrderHistory;
