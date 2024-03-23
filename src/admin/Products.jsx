import {
  Avatar,
  Box,
  Container,
  Grid,
  Rating,
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
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Data from "../components/Data";
import { useGlobalContext } from "../contexts/AppContext";
import Reviews from "../customer/Reviews";

const Products = () => {
  const { products } = useGlobalContext();
  const [search, setSearch] = useState("");

  return (
    <Container className="container" maxWidth="xl">
      <Box>
        <Grid container spacing={2} my={1}>
          <Grid item md={6} xs={12}>
            <Typography fontSize={35} fontWeight="bold" color="primary">
              <ShoppingCartIcon className="text-dark fs-3 me-2" /> Products
            </Typography>
          </Grid>
          <Grid item md={6} xs={12} textAlign="end">
            <SearchBox
              title="Product"
              search={search}
              handleChange={(e) => setSearch(e.target.value.toLowerCase())}
            />
          </Grid>
        </Grid>
        <TableContainer>
          <Table>
            <TableHead>
              <Data align="center" text="Sr.No." />
              <Data align="center" text="Image" />
              <Data align="center" text="Vegetable" />
              <Data align="center" text="Description" width={200} />
              <Data align="center" text="Quantity" />
              <Data align="center" text="Quality" />
              <Data align="center" text="Price" />
              <Data align="center" text="Category" />
              <Data align="center" text="Rating" />
              <Data align="center" text="Reviews" />
            </TableHead>
            <TableBody>
              {products?.length > 0 ? (
                products
                  ?.filter((item) =>
                    item?.vegetable.toLowerCase().includes(search)
                  )
                  ?.map((item, ind) => {
                    const {
                      img,
                      vegetable,
                      desc,
                      quantity,
                      quantity_type,
                      quality,
                      price,
                      category,
                      rating,
                      reviews,
                    } = item;

                    return (
                      <TableRow key={ind}>
                        <Data
                          align="center"
                          text={`${ind + 1}.`}
                          fromData={true}
                        />
                        <Data
                          align="center"
                          text={
                            <Avatar
                              src={img}
                              alt={vegetable}
                              className="d-block mx-auto"
                            />
                          }
                        />
                        <Data align="center" text={vegetable} fromData={true} />
                        <Data
                          align="center"
                          text={desc.substring(0, 60) + "..."}
                          description={true}
                          fromData={true}
                        />
                        <Data
                          align="center"
                          text={quantity + " " + quantity_type}
                          fromData={true}
                        />
                        <Data
                          align="center"
                          text={quality[0].toUpperCase() + quality.substring(1)}
                          fromData={true}
                        />
                        <Data
                          align="center"
                          text={
                            <span className="badge bg-success price">
                              &#8377;{price}
                            </span>
                          }
                        />
                        <Data
                          align="center"
                          fromData={true}
                          text={
                            category[0].toUpperCase() + category.substring(1)
                          }
                        />
                        <Data
                          align="center"
                          fromData={true}
                          text={
                            <Rating value={rating} precision={0.5} readOnly />
                          }
                        />
                        <TableCell align="center">
                          <Reviews reviews={reviews} />
                        </TableCell>
                      </TableRow>
                    );
                  })
              ) : (
                <TableRow>
                  <TableCell colSpan={10}>No products added</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default Products;
