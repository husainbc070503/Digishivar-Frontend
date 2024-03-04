import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import HeroImage from "../../assets/hero-img.jpg";
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="hero-container">
      <Grid container spacing={2} alignItems="center" className="hero-grid">
        <Grid item md={6} xs={12}>
          <Typography className="Typography title">
            <TypeAnimation
              sequence={[
                "Join the farm-to-table revolution with DigiShivar!",
                1000,
                "DigiShivar: Where fresh produce meets your doorstep, hassle-free!",
                1000,
                "Cut out the middleman and connect farmers directly to you.",
                1000,
                "DigiShivar: Where fresh produce meets your doorstep, hassle-free!",
                1000,
                "Cut out the middleman and connect farmers directly to you.",
                100,
              ]}
              speed={50}
              repeat={Infinity}
            />
          </Typography>
          <Typography className="Typography text">
            Experience the transformative power of DigiShivar, where farmers
            thrive and communities flourish. Connect directly with local
            growers, savoring the freshest produce while supporting sustainable
            agriculture. Embrace a new era of food transparency and empowerment,
            delivered right to your doorstep.
          </Typography>
          <Button variant="contained" onClick={() => navigate("../auth")}>
            Get Started
          </Button>
        </Grid>
        <Grid item md={6} xs={12}>
          <img src={HeroImage} alt="frontimg" className="hero-img" />
        </Grid>
      </Grid>
    </div>
  );
};

export default Hero;
