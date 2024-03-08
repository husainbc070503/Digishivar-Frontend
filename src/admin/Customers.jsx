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
import React, { useState } from "react";
import Groups2Icon from "@mui/icons-material/Groups2";
import SearchBox from "../components/SearchBox";
import { useGlobalContext } from "../contexts/AppContext";
import "./Admin.css";
import Data from "../components/Data";

const Customers = () => {
  const { users } = useGlobalContext();
  const [search, setSearch] = useState("");

  const customers = users?.filter((item) => item?.role === "customer");

  return (
    <Container maxWidth="lg" className="container">
      <Box>
        <Grid container spacing={2} my={1}>
          <Grid item md={6} xs={12}>
            <Typography fontSize={35} fontWeight="bold" color="primary">
              <Groups2Icon className="text-dark fs-3 me-2" /> Customers
            </Typography>
          </Grid>
          <Grid item md={6} xs={12} textAlign="end">
            <SearchBox
              title="Customer"
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
              <Data text="Address" width={350} />
            </TableHead>
            <TableBody>
              {customers?.length > 0 &&
                customers
                  ?.filter((item) => item?.name.toLowerCase().includes(search))
                  ?.map((item, ind) => {
                    const { name, email, phone, address } = item;
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

export default Customers;
