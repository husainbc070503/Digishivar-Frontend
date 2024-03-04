import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import TextFieldInput from "../components/authentication/auth/TextField";
import RegisterImg from "../assets/register-img.jpg";
import LoginImg from "../assets/login-img.jpg";
import PasswordField from "../components/authentication/auth/PasswordField";
import AuthButtons from "../components/authentication/auth/AuthButtons";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import HomeIcon from "@mui/icons-material/Home";
import RadioField from "../components/authentication/auth/RadioField";
import { useGlobalContext } from "../contexts/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  address: "",
  phone: "",
  role: "",
};

const Authentication = () => {
  const { registerUser, loginUser } = useGlobalContext();
  const [details, setDetails] = useState(initialState);
  const [openReg, setOpenReg] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setDetails({ ...details, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setLoading(true);

    try {
      if (!openReg) {
        const data = await loginUser(details);

        if (data.success) {
          toast.success("Logged In Successfully", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          setDetails(initialState);
          localStorage.setItem("d-ecomm-user", JSON.stringify(data.user));
          navigate("/");
        } else {
          toast.error(data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } else {
        if (details.password !== details.confirmPassword) {
          setLoading(false);
          return toast.error("Mismatch Passwords", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }

        const data = await registerUser(details);
        if (data.success) {
          toast.success("Registered Successfully.", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          setDetails(initialState);
          setOpenReg(false);
        } else {
          toast.error(data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" className="container">
      <Grid container spacing={6} alignItems="center">
        <Grid item md={5} xs={12}>
          <div className="auth-imag">
            <img src={openReg ? RegisterImg : LoginImg} alt="image" />
          </div>
        </Grid>
        <Grid item md={7} xs={12}>
          <Typography
            textAlign="center"
            fontSize={40}
            fontWeight="bold"
            color="primary"
          >
            {openReg ? "REGISTER" : "LOGIN"}
          </Typography>
          <Box className="Box auth-box">
            {openReg && (
              <TextFieldInput
                title="Name"
                type="name"
                others="name"
                value={details.name}
                onChange={handleChange}
                autoFocus={openReg && true}
                icon={<PersonIcon />}
              />
            )}
            <TextFieldInput
              title="Email"
              type="email"
              others="email"
              value={details.email}
              onChange={handleChange}
              autoFocus={!openReg && true}
              icon={<EmailIcon />}
            />

            <PasswordField
              title="Password"
              others="password"
              value={details.password}
              onChange={handleChange}
            />

            {!openReg && (
              <RadioField value={details.role} onChange={handleChange} />
            )}

            {openReg && (
              <>
                <PasswordField
                  title="Repeat Password"
                  others="confirmPassword"
                  value={details.confirmPassword}
                  onChange={handleChange}
                />
                <TextFieldInput
                  title="Phone No."
                  type="tel"
                  others="phone"
                  value={details.phone}
                  onChange={handleChange}
                  icon={<LocalPhoneIcon />}
                />
                <TextFieldInput
                  title="Address"
                  type="text"
                  others="address"
                  value={details.address}
                  onChange={handleChange}
                  multiline={true}
                  rows={4}
                  icon={<HomeIcon />}
                />
                <RadioField value={details.role} onChange={handleChange} />
              </>
            )}
            <AuthButtons
              openReg={openReg}
              setOpenReg={setOpenReg}
              loading={loading}
              handleSubmit={handleSubmit}
            />
            {/* {!openReg && <ForgotPassword />} */}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Authentication;
