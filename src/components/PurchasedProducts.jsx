import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Avatar,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Data from "./Data";
import { useGlobalContext } from "../contexts/AppContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  maxWidth: "96%",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const PurchasedProducts = ({ products }) => {
  const { prices } = useGlobalContext();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="d-block mx-auto">
      <VisibilityIcon className="icon" color="secondary" onClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TableContainer>
            <Table>
              <TableHead>
                <Data align="center" text="Sr.No." />
                <Data align="center" text="Image" />
                <Data align="center" text="Vegetable" />
                <Data align="center" text="Quantity" />
                <Data align="center" text="Price" />
              </TableHead>
              <TableBody>
                {products?.map((item, ind) => {
                  const { pro, userQuantity, userQuantityType } = item;
                  const actualPriceOfProduct = prices?.filter((item) =>
                    item?.vegetable
                      .toLowerCase()
                      ?.includes(pro.vegetable.toLowerCase())
                  )[0]?.wholesalePrice;

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
                        text={
                          <Avatar
                            className="d-block mx-auto"
                            src={pro.img}
                            alt={pro.vegetable}
                          />
                        }
                      />
                      <Data
                        align="center"
                        fromData={true}
                        text={pro.vegetable}
                      />
                      <Data
                        align="center"
                        fromData={true}
                        text={userQuantity + " " + userQuantityType}
                      />
                      <Data
                        align="center"
                        fromData={true}
                        text={
                          <span className="badge bg-primary fs-6">
                            &#8377;
                            {userQuantityType === "quintal"
                              ? (
                                  actualPriceOfProduct *
                                  userQuantity *
                                  100
                                ).toLocaleString("en-IN")
                              : (
                                  actualPriceOfProduct * userQuantity
                                ).toLocaleString("en-IN")}
                          </span>
                        }
                      />
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </div>
  );
};

export default PurchasedProducts;
