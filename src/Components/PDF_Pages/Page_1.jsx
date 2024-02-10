import React, { useState } from "react";
import College_logo from "../../Images/Bahria-logo.png";
import Male_Weight_Grpah from "../Graph/Male/Weight/Male Weight Graph";
import Female_Weight_Graph from "../Graph/Female/Weight/Female_Weight_Graph";
import Male_Height_Grpah from "../Graph/Male/Height/Male Height Graph";
import Female_Height_Graph from "../Graph/Female/Height/Female_Height_Graph";
import { Box, Typography } from "@mui/material";

const Page_1 = ({ MasterData, Report_Year_Data }) => {
  const [Remark, setRemark] = useState("");

  const Remarks = (data) => {
    setRemark(data);
  };

  return (
    <>
      <Box
        height={"100%"}
        width={"45%"}
        // bgcolor={"blue"}
        textAlign={"center"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box
          height={"50%"}
          width={"100%"}
          // bgcolor={"lightblue"}
        >
          {/* <Typography>Weight-Age Growth Chart</Typography> */}
          <Box
            height={"100%"}
            // bgcolor={"lightblue"}
          >
            {MasterData.Gender == "male" ? (
              <Male_Weight_Grpah
                height={900}
                width={1200}
                // height={800}
                // width={1200}
                legends={false}
                Report={true}
                Report_Year={Report_Year_Data.Report_Year}
              />
            ) : (
              <Female_Weight_Graph
                height={900}
                width={1200}
                legends={false}
                Report={true}
                Report_Year={Report_Year_Data.Report_Year}
              />
            )}
          </Box>
        </Box>
        <Box
          height={"50%"}
          width={"100%"}
          // bgcolor={"pink"}
        >
          {/* <Typography>Height-Age Growth Chart</Typography> */}
          <Box
            height={"100%"}
            // bgcolor={"lightblue"}
          >
            {MasterData.Gender == "male" ? (
              <>
                <Male_Height_Grpah
                  height={900}
                  width={1200}
                  legends={false}
                  sentRemarks={Remarks}
                  Report={true}
                  Report_Year={Report_Year_Data.Report_Year}
                />
                {/* <Typography p={"0 30px"} textAlign={"left"}>
                Remarks : {Remark}
              </Typography> */}
              </>
            ) : (
              <>
                <Female_Height_Graph
                  height={900}
                  width={1200}
                  legends={false}
                  sentRemarks={Remarks}
                  Report={true}
                  Report_Year={Report_Year_Data.Report_Year}
                />
                {/* <Typography p={"0 30px"} textAlign={"left"}>
                Remarks : {Remark}
              </Typography> */}
              </>
            )}
          </Box>
        </Box>
      </Box>
      <Box
        // bgcolor={"red"}
        height={"100%"}
        width={"45%"}
        textAlign={"center"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        alignItems={"center"}
        padding={"30px 0"}
        sx={{ color: "rgb(78, 110, 179)" }}
      >
        <Box
        // bgcolor={"orange"}
        // mt={"70px"}
        >
          <img
            src={College_logo}
            alt="College_logo"
            style={{
              mixBlendMode: "multiply",
              height: "200px",
              marginBottom: "7px",
            }}
          />
          <Typography
            fontWeight={"bold"}
            mb={"10px"}
            fontSize={"32px"}
            sx={{ textDecoration: "underline" }}
          >
            Health Report
          </Typography>
          <Typography>And when I am ill, it is He Who cures me...</Typography>
          <Typography fontStyle={"italic"}>Surah Shu'ara Verse 80</Typography>
        </Box>
        <Box
          // bgcolor={"red"}
          // alignItems={"center"}
          display={"grid"}
          gridTemplateColumns={"1fr 1fr"}
          gridTemplateRows={"repeat(4, 1fr)"}
          width={"80%"}
          margin={"auto"}
          rowGap={"5px"}
          height={"30%"}
          padding={"5px"}
          border={"2px solid rgb(78, 110, 179)"}
          boxSizing={"border-box"}
        >
          <Box
            display={"flex"}
            border={"2px solid rgb(78, 110, 179)"}
            padding={"7px 0 4px 9px"}
            marginRight={"2.5px"}
          >
            <Typography fontWeight={"bold"}>GR Number:</Typography>
            &nbsp;&nbsp;
            <Typography>{MasterData.GR_Number}</Typography>
          </Box>
          <Box
            display={"flex"}
            border={"2px solid rgb(78, 110, 179)"}
            padding={"7px 0 4px 9px"}
            marginLeft={"2.5px"}
          >
            <Typography fontWeight={"bold"}>Report Year:</Typography>
            &nbsp;&nbsp;
            <Typography>{Report_Year_Data.Report_Year}</Typography>
          </Box>
          <Box
            gridColumn={"1/ span 2"}
            display={"flex"}
            border={"2px solid rgb(78, 110, 179)"}
            padding={"7px 0 4px 9px"}
          >
            <Typography fontWeight={"bold"}>Name:</Typography>
            &nbsp;&nbsp;
            <Typography>{MasterData.Student_Name}</Typography>
          </Box>
          <Box
            gridColumn={"1/ span 2"}
            display={"flex"}
            border={"2px solid rgb(78, 110, 179)"}
            padding={"7px 0 4px 9px"}
          >
            <Typography fontWeight={"bold"}>Father's Name:</Typography>
            &nbsp;&nbsp;
            <Typography>{MasterData.Name_of_Parent_Guardian}</Typography>
          </Box>
          <Box
            display={"flex"}
            border={"2px solid rgb(78, 110, 179)"}
            padding={"7px 0 4px 9px"}
            marginRight={"2.5px"}
          >
            <Typography fontWeight={"bold"}>Class:</Typography>
            &nbsp;&nbsp;
            <Typography>
              {Report_Year_Data.Class ? Report_Year_Data.Class : "N/A"}
            </Typography>
          </Box>
          <Box
            display={"flex"}
            border={"2px solid rgb(78, 110, 179)"}
            padding={"7px 0 4px 9px"}
            marginLeft={"2.5px"}
          >
            <Typography fontWeight={"bold"}>Section:</Typography>
            &nbsp;&nbsp;
            <Typography>
              {Report_Year_Data.Section ? Report_Year_Data.Section : "N/A"}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Typography
            fontWeight={"bold"}
            fontSize={"24px"}
            sx={{ textDecoration: "underline" }}
          >
            Bahria College Karsaz
          </Typography>
          <Typography>
            Habib Ibrahim Rehmatullah Road, PNS Karsaz, Karachi
          </Typography>
          <Typography>Contact: Ext 114, 48503252, 48503832</Typography>
          <Typography>Email: medical@bckk.edu.pk</Typography>
        </Box>
      </Box>
    </>
  );
};

export default Page_1;
