import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import SearchBox from "../components/SearchBox";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import { useGlobalContext } from "../contexts/AppContext";
import Data from "../components/Data";

const Farmers = () => {
  const { users, products } = useGlobalContext();
  const [search, setSearch] = useState("");

  const farmers = users?.filter((item) => item?.role === "farmer");

  return (
    <Container maxWidth="lg" className="container">
      <Box>
        <Grid container spacing={2} my={1}>
          <Grid item md={6} xs={12}>
            <Typography fontSize={35} fontWeight="bold" color="primary">
              <AgricultureIcon className="text-dark fs-3 me-2" /> Farmers
            </Typography>
          </Grid>
          <Grid item md={6} xs={12} textAlign="end">
            <SearchBox
              title="Farmer"
              search={search}
              handleChange={(e) => setSearch(e.target.value.toLowerCase())}
            />
          </Grid>
        </Grid>
        <TableContainer>
          <Table>
            <TableHead>
              <Data align="center" text="Sr. No." />
              <Data align="center" text="Name" />
              <Data align="center" text="Email" />
              <Data align="center" text="Phone" />
              <Data align="center" text="No. of Products" />
              <Data text="Address" width={250} />
            </TableHead>
            <TableBody>
              {farmers?.length > 0 &&
                farmers
                  ?.filter((item) => item?.name.toLowerCase().includes(search))
                  ?.map((item, ind) => {
                    const { name, email, phone, address, _id } = item;
                    const noOfProducts = products?.filter(
                      (item) => item?.user?._id == _id
                    )?.length;

                    return (
                      <TableRow key={ind}>
                        <Data
                          align="center"
                          text={`${ind + 1}.`}
                          fromData={true}
                        />
                        <Data align="center" text={name} fromData={true} />
                        <Data align="center" text={email} fromData={true} />
                        <Data align="center" text={phone} fromData={true} />
                        <Data
                          align="center"
                          text={noOfProducts}
                          fromData={true}
                        />
                        <Data
                          align="center"
                          text={address}
                          description={true}
                          fromData={true}
                        />
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default Farmers;
