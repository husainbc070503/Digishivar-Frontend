import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import AboutImg1 from "../../assets/about-1.jpg";
import AboutImg2 from "../../assets/about-2.jpg";
import SectionHeading from "../SectionHeading";

const About = () => {
  const para1 =
    "DigiShivar is a revolutionary web application poised to transform the landscape of agricultural commerce. Unlike traditional models that involve multiple intermediaries, DigiShivar empowers farmers by providing them with a direct platform to showcase and sell their produce to consumers. By eliminating unnecessary middlemen, DigiShivar ensures that farmers receive fair compensation for their hard work while offering customers the freshest and highest-quality products.";

  const para2 =
    "Through DigiShivar, consumers gain access to a diverse range of farm-fresh produce, sourced directly from local farmers. This direct connection fosters transparency and trust, allowing customers to make informed decisions about the food they purchase. Additionally, DigiShivar's user-friendly interface makes the entire shopping experience seamless and convenient, enabling customers to support local agriculture with just a few clicks. With its mission to bridge the gap between farmers and consumers, DigiShivar is revolutionizing the way we buy and sell agricultural products, creating a more sustainable and equitable food system for all.";

  return (
    <Box>
      <div className="section-container">
        <SectionHeading title="About" />
        <Grid container spacing={3} alignItems="center">
          <Grid item md={4}>
            <img src={AboutImg1} alt="about" />
          </Grid>
          <Grid item md={8}>
            <Typography
              fontSize={35}
              fontWeight="bold"
              color="InfoText"
              className="Typography about-heading"
            >
              What is Digi-Shivar?
            </Typography>
            <Typography color="GrayText" fontSize={18} textAlign="justify">
              {para1}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={3} alignItems="center">
          <Grid item md={8}>
            <Typography
              color="GrayText"
              fontSize={18}
              py={3}
              textAlign="justify"
            >
              {para2}
            </Typography>
          </Grid>
          <Grid item md={4}>
            <img src={AboutImg2} alt="about" />
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};

export default About;
