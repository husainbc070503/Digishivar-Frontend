import logo from "../assets/logo.jpeg";
import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useGlobalContext } from "../contexts/AppContext";
import { Container, Box, Button, Grid, Typography } from "@mui/material";
import OrderTable from "../components/OrderTable";

const Invoice = () => {
  const [loader, setLoader] = useState(false);
    const { orders, user } = useGlobalContext();
    const myOrders = orders?.filter(
      (item) => item?.user?._id === user?.user?._id
    );

  const downloadPDF = () => {
    const capture = document.querySelector(".actual-receipt");
    setLoader(true);
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const doc = new jsPDF("p", "mm", "a4");
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
      setLoader(false);
      doc.save("receipt.pdf");
    });
  };

  return (
    <Container className="container" maxWidth="md">
      <Box className="actual-receipt">
        <Typography fontSize={35} fontWeight="bold" color="primary" mb={1}>
          {logo}
        </Typography>
        {myOrders?.length > 0 ? (
          <OrderTable orders={myOrders} />
        ) : (
          <Typography fontSize={18} fontWeight="bold">
            No order place till now
          </Typography>
        )}
      </Box>
      <Button onClick={downloadPDF}>Download</Button>
    </Container>
  );
};
export default Invoice;
