import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../contexts/AppContext";
import TextFieldInput from "../components/TextField";

const Profile = () => {
  const { user, updateProfile } = useGlobalContext();
  const [update, setUpdate] = useState(false);
  const [updateDetails, setUpdateDetails] = useState({});
  const [loading, setLoading] = useState(false);

  const Details = ({ title, text }) => (
    <div className="mb-3">
      <Typography fontWeight="bold" fontSize={18}>
        {title}
      </Typography>
      <Typography fontSize={16}>{text}</Typography>
    </div>
  );

  const handleChange = (e) =>
    setUpdateDetails({ ...updateDetails, [e.target.name]: e.target.value });

  useEffect(() => {
    setUpdateDetails(user?.user);
  }, [update]);

  return (
    <Container className="container" maxWidth="md">
      <Box>
        <Grid container spacing={2} mb={2}>
          <Grid item md={6} xs={6}>
            <Typography
              fontWeight="bold"
              fontSize={30}
              color="secondary"
              mb={1}
            >
              {update ? "Edit" : "My"} Profile
            </Typography>
          </Grid>
          <Grid item md={6} xs={6} textAlign="end">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setUpdate(!update)}
            >
              {update ? "cancel" : "update"}
            </Button>
          </Grid>
        </Grid>
        {!update ? (
          <>
            <Details title="Name" text={user?.user?.name} />
            <Details title="Email" text={user?.user?.email} />
            <Details title="Phone No." text={user?.user?.phone} />
            <Details title="Adedress" text={user?.user?.address} />
          </>
        ) : (
          <>
            <TextFieldInput
              title="Name"
              type="text"
              others="name"
              value={updateDetails?.name}
              onChange={handleChange}
            />
            <TextFieldInput
              title="Email"
              type="email"
              others="email"
              value={updateDetails?.email}
              onChange={handleChange}
            />
            <TextFieldInput
              title="Phone No."
              type="tel"
              others="phone"
              value={updateDetails?.phone}
              onChange={handleChange}
            />
            <TextFieldInput
              title="Address"
              type="text"
              multiline={true}
              rows={5}
              others="address"
              value={updateDetails?.address}
              onChange={handleChange}
            />
            <Button
              color="success"
              variant="contained"
              disabled={loading}
              onClick={() =>
                updateProfile(updateDetails, setLoading, setUpdate)
              }
            >
              Update
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
};

export default Profile;
