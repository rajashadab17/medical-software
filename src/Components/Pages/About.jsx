import { Box, Typography } from "@mui/material";
import React from "react";
import SideBar from "../Sidebar";

const About = () => {
  return (
    <>
      <Box display="flex" height={"100vh"} width={"100vw"}>
        <Box
          display={"flex"}
          height={"100vh"}
          width={"15%"}
          // bgcolor={"red"}
        >
          <SideBar />
        </Box>
        <Box width={"85%"} height={"100%"} bgcolor={"#aeaeff"}>
          <Typography
            textAlign={"center"}
            fontSize={"38px"}
            fontWeight={"bold"}
          >
            About
          </Typography>
          <marquee
            behavior="scroll"
            scrollamount="5"
            scrolldelay="3"
            height={"50px"}
            style={{
              display: "flex",
              alignItems: "center",
              background: "#0006",
            }}
          >
              <Typography color={"white"} fontWeight={"bold"}>
                Site under development
              </Typography>
          </marquee>
        </Box>
      </Box>
    </>
  );
};

export default About;
