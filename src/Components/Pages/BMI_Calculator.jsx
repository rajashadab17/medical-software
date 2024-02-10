import { Box, Typography } from "@mui/material";
import React from "react";
import SideBar from "../Sidebar";

const BMI_Calculator = () => {
  return (
    <>
      <Box display="flex" height={"100vh"} width={"100vw"}>
        <Box
          display={"flex"}
          height={"100vh"}
          width={"17%"}
          // bgcolor={"red"}
        >
          <SideBar />
        </Box>
        <Box width={"83%"} bgcolor={"var(--purple)"}>
          <Typography>BMI Calculator</Typography>
        </Box>
      </Box>
    </>
  );
};

export default BMI_Calculator;
