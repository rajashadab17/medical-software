import { Box, Typography } from "@mui/material";
import React from "react";
import SideBar from "../Sidebar";
import BoysChart from "../../Images/bmi-2-20-boys.png";

const Boys_Chart = () => {
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
        <Box
          width={"83vw"}
          bgcolor={"var(--new-purple)"}
          height={"100%"}
          padding={"50px"}
          overflow={"scroll"}
          sx={{ display: "grid", placeItems: "center" }}
        >
          <Box
            width={"80%"}
            height={"135vh"}
            overflow={"scroll"}
            className="dashboard-grid-box y-center space-around col"
          >
            <Box>
              <Typography fontWeight={"bold"}>Boys Growth Chart</Typography>
            </Box>
            <Box>
              <img src={BoysChart} height={"700px"} alt="" />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Boys_Chart;
