import { Box, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <>
      <Box bgcolor={"var(--purple-button-hover)"} className="x-y-center"
      // position={"fixed"} bottom={0}
      
      width={"100%"} height={"auto"} minHeight={"35px"}>
        <Typography textAlign={"center"} color={"white"}>
          Copyright &copy; {new Date().getFullYear()}{" "} Medical Management System - Developed by Raja Shadab
        </Typography>
      </Box>
    </>
  );
};

export default Footer;
