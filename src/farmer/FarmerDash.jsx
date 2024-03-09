import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../contexts/AppContext";
import SearchBox from "../components/SearchBox";
import SelectField from "../components/SelectField";
import VegetableCard from "../components/VegetableCard";

const FarmerDash = () => {
  const { products, user } = useGlobalContext();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const myProducts = products?.filter(
    (item) => item?.user?._id === user?.user?._id
  );

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setFilteredProducts(myProducts);

    if (search) {
      setFilteredProducts((prevArr) =>
        prevArr?.filter((item) =>
          item?.vegetable.toLowerCase().includes(search)
        )
      );
    }

    if (category) {
      if (category === "all") {
        setFilteredProducts((prevArr) => prevArr);
      } else {
        setFilteredProducts((prevArr) =>
          prevArr?.filter((item) => item?.category === category.toLowerCase())
        );
      }
    }
  }, [search, category]);

  return (
    <Container maxWidth="xl" className="container">
      <Box>
        <Grid container spacing={2} my={2}>
          <Grid item md={4} xs={12}>
            <Typography
              fontSize={30}
              color="primary"
              fontWeight="bold"
              className="Typography farmer-dash"
            >
              My Vegetables
            </Typography>
          </Grid>
          <Grid item md={4} xs={12}>
            <SearchBox
              title="Product"
              search={search}
              handleChange={(e) => setSearch(e.target.value.toLowerCase())}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <SelectField
              title="Category"
              arr={["all", "leafy vegetable", "rooted vegetable", "herbs"]}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              fromDash={true}
            />
          </Grid>
        </Grid>
        {myProducts?.length > 0 ? (
          <Grid container spacing={2}>
            {(search || category ? filteredProducts : myProducts)?.map(
              (item, ind) => (
                <Grid item md={3} xs={12} key={ind}>
                  <VegetableCard item={item} />
                </Grid>
              )
            )}
          </Grid>
        ) : (
          <Typography fontSize={20} fontWeight="bold">
            No vegetables added. Please add some
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default FarmerDash;
