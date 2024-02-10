import React from "react";
import SideBar from "../Sidebar";
import Male_Growth_Chart from "./Male_Growth_Chart";
import { Box, Typography } from "@mui/material";
import Female_Growth_Chart from "./Female_Growth_Chart";


const GrowthTable = () => {
  return (
    <>
      <Box display="flex" height={"100vh"} width={"100vw"}>
        <Box display={"flex"} height={"100vh"} width={"17%"}>
          <SideBar />
        </Box>
        <Box width={"83%"} bgcolor={"var(--new-purple)"} overflow={"scroll"}>
          <Box  margin={"50px"}>
            <Typography textAlign={"center"} fontWeight={"bold"}>
              Body Mass Index for Age Tables, Children Ages 2-20 Years
            </Typography>
            <Typography textAlign={"center"} fontWeight={"bold"}>
              Selected Percentiles
            </Typography>

            <Typography textAlign={"center"}>
              Body Mass Index, or BMI, is calculated using the following
              formula:
            </Typography>

            <Typography textAlign={"center"}>
              BMI = Weight(Kg) / Height(Meter)<sup>2</sup>
            </Typography>
            <Box>
              <Male_Growth_Chart/>
              <Female_Growth_Chart/>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default GrowthTable;
