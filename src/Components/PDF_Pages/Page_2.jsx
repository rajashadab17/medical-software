import React, { useEffect, useState } from "react";
import College_logo from "../../Images/Bahria-logo.png";
import Male_Graph from "../Graph/Male/Age/Graph";
import Female_Graph from "../Graph/Female/Age/Female_Graph";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import { Patient } from "styled-icons/fluentui-system-filled";

const Page_2 = ({ MasterData, Report_Year_Data }) => {
  const [Remark, setRemark] = useState("");
  const [Report_Remark, setReport_Remark] = useState("");
  const [LAST_2_BMI, setLAST_2_BMI] = useState("");

  const Remarks = (data) => {
    data && setRemark(data);
  };
  console.log("remark", Remark);
  const BMI_ARRAY = (data) => {
    // setTimeout(() => {
    setLAST_2_BMI(data);

    // if (LAST_2_BMI.slice(-2).length <= 1) {
    //   // data && console.log("yen", Remark);
    //   setReport_Remark(Remark);
    //   console.log("yen", Remark);
    // } else if (LAST_2_BMI.slice(-2)[1] > LAST_2_BMI.slice(-2)[0]) {
    //   setReport_Remark("Improvement from Previous Record");
    // } else if (LAST_2_BMI.slice(-2)[1] == LAST_2_BMI.slice(-2)[0]) {
    //   setReport_Remark("No such improvements");
    // } else {
    //   setReport_Remark("Deterioration from prior assessment");
    // }
    // }, 2500);
    //  data && Remarks()

    // console.log("BMI", data.slice(-2))
  };
  useEffect(() => {
    if (LAST_2_BMI.slice(-2).length <= 1) {
      // data && console.log("yen", Remark);
      setReport_Remark(Remark);
      console.log("yen", Remark);
    } else if (LAST_2_BMI.slice(-2)[1] > LAST_2_BMI.slice(-2)[0]) {
      setReport_Remark("Improvement from Previous Record");
    } else if (LAST_2_BMI.slice(-2)[1] == LAST_2_BMI.slice(-2)[0]) {
      setReport_Remark("No such improvements");
    } else {
      setReport_Remark("Deterioration from prior assessment");
    }
  }, [LAST_2_BMI]);

  console.log("LAST_2_BMI", LAST_2_BMI);

  let SystematicArray = [
    {
      disease: "CNS Abnormality Speech Gait",
      status: Report_Year_Data.CNS_Abnormality_Speech_Gait,
    },
    {
      disease: "Chest Congenital Deformity",
      status: Report_Year_Data.Chest_Congenital_Deformity,
    },
    { disease: "CVS Tachycardia", status: Report_Year_Data.CVS_Tachycardia },
    { disease: "CVS Murmurs", status: Report_Year_Data.CVS_Murmurs },
    { disease: "Abdomen Hernia", status: Report_Year_Data.Abdomen_Hernia },
    { disease: "Abdomen Viscer", status: Report_Year_Data.Abdomen_Viscer },
  ].filter((val) => val.status == true);

  let KnownDiseaseArray = [
    {
      disease: "Heart Disease",
      status: Report_Year_Data.Heart_Disease,
    },
    {
      disease: "Anamoly",
      status: Report_Year_Data.Anamoly,
    },
    {
      disease: "Blood Disorder",
      status: Report_Year_Data.Blood_Disorder,
    },
    {
      disease: "Allergy",
      status: Report_Year_Data.Allergy,
    },
    {
      disease: "Diabetes",
      status: Report_Year_Data.Diabetes,
    },
    {
      disease: "Asthama",
      status: Report_Year_Data.Asthama,
    },
    {
      disease: "Epilepsy",
      status: Report_Year_Data.Epilepsy,
    },
    {
      disease: "Epistaxes",
      status: Report_Year_Data.Epistaxes,
    },
    {
      disease: "Other_Disease",
      status: Report_Year_Data.Other_Disease,
    },
  ].filter((val) => val.status == true || val.status != "");

  let PhysicalDiseaseArray = [
    {
      disease: "Hair",
      status: Report_Year_Data.Hair,
    },
    {
      disease: "Teeth",
      status: Report_Year_Data.Teeth,
    },
    {
      disease: "Tongue",
      status: Report_Year_Data.Tongue,
    },
    {
      disease: "Nails",
      status: Report_Year_Data.Nails,
    },
    {
      disease: "Skin",
      status: Report_Year_Data.Skin,
    },
    {
      disease: "Nose Other Disease",
      status: Report_Year_Data.Nose_Other_Disease,
    },
    {
      disease: "Tonsil Status",
      status: Report_Year_Data.Tonsil_Status,
    },
    {
      disease: "Eye Other Disease",
      status: Report_Year_Data.Eye_Other_Disease,
    },
    {
      disease: "Ear Other Disease",
      status: Report_Year_Data.Ear_Other_Disease,
    },
    {
      disease: "Vision Right",
      status: Report_Year_Data.Vision_Right,
    },
    {
      disease: "Vision Left",
      status: Report_Year_Data.Vision_Left,
    },
    {
      disease: "Conjuctiva Status",
      status: Report_Year_Data.Conjuctiva_Status,
    },
    {
      disease: "Conjuctiva Other Disease",
      status: Report_Year_Data.Conjuctiva_Other_Disease,
    },
    {
      disease: "Gums Status",
      status: Report_Year_Data.Gums_Status,
    },
    {
      disease: "Gums Other Disease",
      status: Report_Year_Data.Gums_Other_Disease,
    },
    {
      disease: "Bones Other Disease",
      status: Report_Year_Data.Bones_Other_Disease,
    },
    {
      disease: "Nasal Septum Deviation Right",
      status: Report_Year_Data.Nasal_Septum_Deviation_Right,
    },
    {
      disease: "Nasal Septum Deviation Left",
      status: Report_Year_Data.Nasal_Septum_Deviation_Left,
    },
    {
      disease: "Nasal Septum Deviation DNS",
      status: Report_Year_Data.Nasal_Septum_Deviation_DNS,
    },
    {
      disease: "Turbinate Hypertrophy Right Nostril",
      status: Report_Year_Data.Turbinate_Hypertrophy_Right_Nostril,
    },
    {
      disease: "Turbinate Hypertrophy Left Nostril",
      status: Report_Year_Data.Turbinate_Hypertrophy_Left_Nostril,
    },
    {
      disease: "Turbinate Hypertrophy T/HYP",
      status: Report_Year_Data.Turbinate_Hypertrophy_T_HYP,
    },
    {
      disease: "Tonsil Enlargement Right",
      status: Report_Year_Data.Tonsil_Enlargement_Right,
    },
    {
      disease: "Tonsil Enlargement Left",
      status: Report_Year_Data.Tonsil_Enlargement_Left,
    },
    {
      disease: "Eye Left Squint",
      status: Report_Year_Data.Eye_Left_Squint,
    },
    {
      disease: "Eye Left Opacity",
      status: Report_Year_Data.Eye_Left_Opacity,
    },
    {
      disease: "Eye Right Squint",
      status: Report_Year_Data.Eye_Right_Squint,
    },
    {
      disease: "Eye Both Squint",
      status: Report_Year_Data.Eye_Both_Squint,
    },
    {
      disease: "Eye Right Opacity",
      status: Report_Year_Data.Eye_Right_Opacity,
    },
    {
      disease: "Eye Both Opacity",
      status: Report_Year_Data.Eye_Both_Opacity,
    },
    {
      disease: "Eye Right Ref Error",
      status: Report_Year_Data.Eye_Right_Ref_Error,
    },
    {
      disease: "Eye Left Ref Error",
      status: Report_Year_Data.Eye_Left_Ref_Error,
    },
    {
      disease: "Ref Error",
      status: Report_Year_Data.Eye_Both_Ref_Error,
    },
    {
      disease: "Eye Other Disease",
      status: Report_Year_Data.Eye_Other_Disease,
    },
    {
      disease: "Ear Right SOM",
      status: Report_Year_Data.Ear_Right_SOM,
    },
    {
      disease: "Ear Right Wax",
      status: Report_Year_Data.Ear_Right_Wax,
    },
    {
      disease: "Ear Left SOM",
      status: Report_Year_Data.Ear_Left_SOM,
    },
    {
      disease: "Ear Both SOM",
      status: Report_Year_Data.Ear_Both_SOM,
    },
    {
      disease: "Ear Left Wax",
      status: Report_Year_Data.Ear_Left_Wax,
    },
    {
      disease: "Ear Both Wax",
      status: Report_Year_Data.Ear_Both_Wax,
    },
    {
      disease: "Flat Foot Right",
      // disease: "Bones Flat Feet Right",
      status: Report_Year_Data.Bones_Flat_Feet_Right,
    },
    {
      disease: "Flat Foot Left",
      // disease: "Bones Flat Feet Left",
      status: Report_Year_Data.Bones_Flat_Feet_Left,
    },
    {
      disease: "Flat Feet",
      // disease: "Bones Flat Feet Both",
      status: Report_Year_Data.Bones_Flat_Feet_Both,
    },
    {
      disease: "Gross Flat Foot Right",
      // disease: "Bones Flat Feet Right",
      status: Report_Year_Data.Bones_Gross_Flat_Feet_Right,
    },
    {
      disease: "Gross Flat Foot Left",
      // disease: "Bones Flat Feet Left",
      status: Report_Year_Data.Bones_Gross_Flat_Feet_Left,
    },
    {
      disease: "Gross Flat Feet",
      // disease: "Bones Flat Feet Both",
      status: Report_Year_Data.Bones_Gross_Flat_Feet_Both,
    },
    {
      disease: "Gross Flat Feet B/L",
      // disease: "Bones Flat Feet Both",
      status: Report_Year_Data.Bones_Gross_Flat_Feet_B_L,
    },
    {
      disease: "Minimal Flat Foot Right",
      // disease: "Bones Flat Feet Right",
      status: Report_Year_Data.Bones_Minimal_Flat_Feet_Right,
    },
    {
      disease: "Minimal Flat Foot Left",
      // disease: "Bones Flat Feet Left",
      status: Report_Year_Data.Bones_Minimal_Flat_Feet_Left,
    },
    {
      disease: "Minimal Flat Feet",
      // disease: "Bones Flat Feet Both",
      status: Report_Year_Data.Bones_Minimal_Flat_Feet_Both,
    },
    {
      disease: "Borderline Foot Right",
      // disease: "Bones Flat Feet Right",
      status: Report_Year_Data.Bones_Border_Line_Feet_Right,
    },
    {
      disease: "Borderline Foot Left",
      // disease: "Bones Flat Feet Left",
      status: Report_Year_Data.Bones_Border_Line_Feet_Left,
    },
    {
      disease: "Knee Knocking",
      // disease: "Bones Knee Knocking",
      status: Report_Year_Data.Bones_Knee_Knocking,
    },
  ].filter((val) => val.status);

  // console.log(PhysicalDiseaseArray);
  return (
    <>
      <Box
        height={"100%"}
        width={"45%"}
        bgcolor={"white"}
        border={"1px solid black"}
        // textAlign={"center"}
        // display={"flex"}
        // flexDirection={"column"}
        // justifyContent={"space-between"}
        // alignItems={"center"}
        display={"grid"}
        gridTemplateColumns={"1fr 1fr"}
        gridTemplateRows={"0.40fr repeat(5, 1fr)"}

        // alignItems={"center"}
      >
        <Box gridColumn={"1/ span 2"} border={"1px solid black"} className="x-y-center">
          <Typography fontWeight={"bold"} textAlign={"center"} >
            Particulars
          </Typography>
        </Box>
        <Box border={"1px solid black"}>
          <List
            subheader={
              <ListSubheader sx={{ fontWeight: "600" }}>
                Measurements
              </ListSubheader>
            }
          >
            <Typography p={"0 15px"} fontSize={"14px"}>
              Weight : {Report_Year_Data.Weight_Kg} Kg
            </Typography>
            <Typography p={"0 15px"} fontSize={"14px"}>
              Height : {Report_Year_Data.Height_Centimeter} cm
            </Typography>
            <Typography p={"0 15px"} fontSize={"14px"}>
              BMI :{" "}
              {(
                Report_Year_Data.Weight_Kg /
                Math.pow(Report_Year_Data.Height_Centimeter / 100, 2)
              ).toFixed(2)}{" "}
              Kg/m<sup>2</sup>
            </Typography>
          </List>
        </Box>
        <Box border={"1px solid black"}>
          <List
            subheader={
              <ListSubheader sx={{ fontWeight: "600" }}>
                Patient Information
              </ListSubheader>
            }
          >
            <Typography p={"0 15px"} fontSize={"14px"}>Gender : {MasterData.Gender}</Typography>
            <Typography p={"0 15px"} fontSize={"14px"}>
              Blood Group : {MasterData.Blood_Group}
            </Typography>
            <Typography p={"0 15px"} fontSize={"14px"}>
              General Cleanliness : {Report_Year_Data.Cleanliness}
            </Typography>
          </List>
        </Box>
        <Box border={"1px solid black"}>
          <List
            subheader={
              <ListSubheader sx={{ fontWeight: "600" }}>
                Any Known Disease
              </ListSubheader>
            }
          >
            {KnownDiseaseArray.length == 0 ? (
              <Typography p={"0 15px"} fontSize={"14px"}>None</Typography>
            ) : (
              KnownDiseaseArray.map((val) => {
                return (
                  <Typography fontSize={"14px"} p={"0 15px"}>
                    {/* {val.disease} :{" "} */}
                    {/* {val.status == true ? "Diagnosed" : val.status} */}
                    {val.status == true ? val.disease : val.status}
                  </Typography>
                );
              })
            )}
          </List>
        </Box>
        <Box border={"1px solid black"}>
          <List
            subheader={
              <ListSubheader sx={{ fontWeight: "600" }}>
                Any Known Allergy
              </ListSubheader>
            }
          >
            <Typography p={"0 15px"} fontSize={"14px"}>
              {Report_Year_Data.Allergy ? Report_Year_Data.Allergy : "None"}
            </Typography>
          </List>
        </Box>
        <Box border={"1px solid black"}>
          <List
            subheader={
              <ListSubheader sx={{ fontWeight: "600" }}>
                Any Physical Problem
              </ListSubheader>
            }
          >
            {PhysicalDiseaseArray.length == 0 ? (
              <Typography p={"0 15px"} fontSize={"14px"}>None</Typography>
            ) : (
              PhysicalDiseaseArray.map((val) => {
                return (
                  <Typography fontSize={"14px"} p={"0 15px"}>
                  {/* <Typography fontSize={"13px"} p={"0 15px"}> */}
                    {/* {val.disease} :{" "} */}
                    {val.status == true ? val.disease : val.status}
                    {/* {val.disease} :{" "}
                    {val.status == true ? "Diagnosed" : val.status} */}
                  </Typography>
                );
              })
            )}
          </List>
        </Box>
        <Box border={"1px solid black"}>
          <List
            subheader={
              <ListSubheader sx={{ fontWeight: "600" }}>
                Any Systemic Problem
              </ListSubheader>
            }
          >
            {SystematicArray.length == 0 ? (
              <Typography p={"0 15px"} fontSize={"14px"}>None</Typography>
            ) : (
              SystematicArray.map((val) => {
                return (
                  <Typography fontSize={"14px"} p={"0 15px"}>
                    {/* {val.disease} : Diagnosis */}
                    {val.status == true ? val.disease : val.status}
                  </Typography>
                );
              })
            )}
          </List>
        </Box>
        <Box
          border={"1px solid black"}
          display={"grid"}
          gri
          gridTemplateColumns={"auto auto"}
          gridTemplateRows={"auto"}
        >
          <List
            subheader={
              <ListSubheader sx={{ fontWeight: "600" }}>Vaccines</ListSubheader>
            }
          >
            <Typography p={"0 15px"} fontSize={"14px"}>
              Immunization :{" "}
              {Report_Year_Data.Child_Missing_Dose
                ? Report_Year_Data.Child_Missing_Dose
                : Report_Year_Data.Child_Immunization
                ? Report_Year_Data.Child_Immunization
                : "N/A"}
            </Typography>
            <Typography p={"0 15px"} fontSize={"14px"}>
              Tetnus :{" "}
              {Report_Year_Data.Tetnes_Missing_Dose
                ? Report_Year_Data.Tetnes_Missing_Dose
                : Report_Year_Data.Tetnes_Vaccine
                ? Report_Year_Data.Tetnes_Vaccine
                : "N/A"}
            </Typography>
          </List>
        </Box>
        <Box
          border={"1px solid black"}
          display={"grid"}
          gri
          gridTemplateColumns={"auto auto"}
          gridTemplateRows={"auto"}
        >
          <List
            subheader={
              <ListSubheader sx={{ fontWeight: "600" }}>
                Virus Vaccines
              </ListSubheader>
            }
          >
            <Typography p={"0 15px"} fontSize={"14px"}>
              Hepatitis B :{" "}
              {Report_Year_Data.Hepatitis_Missing_Dose
                ? Report_Year_Data.Hepatitis_Missing_Dose
                : Report_Year_Data.Hepatitis_B_Vaccine
                ? Report_Year_Data.Hepatitis_B_Vaccine
               : "N/A"}
            </Typography>
            <Typography p={"0 15px"} fontSize={"14px"}>Covid-19 : </Typography>
          </List>
        </Box>
        <Box
          gridColumn={"1/ span 2"}
          border={"1px solid black"}
          display={"grid"}
          alignItems={"center"}
        >
          {LAST_2_BMI && (
            <Typography fontWeight={"bold"} textAlign={"center"}>
              {Report_Remark}
            </Typography>
          )}
        </Box>
      </Box>
      <Box
      // bgcolor
        height={"100%"}
        width={"45%"}
        bgcolor={"white"}
        // textAlign={"center"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box height={"65%"} width={"100%"}>
          <Typography textAlign={"center"} fontWeight={"600"}>BMI-Age Growth Chart</Typography>
          <Box height={"94%"}   >
            {MasterData.Gender == "male" ? (
              <Male_Graph
                height={1100}
                width={1400}
                legends={false}
                sentRemarks={Remarks}
                Report={true}
                ALL_BMI_ARRAY={BMI_ARRAY}
                Report_Year={Report_Year_Data.Report_Year}
              />
            ) : (
              <Female_Graph
              height={1100}
              width={1400}
              legends={false}
              sentRemarks={Remarks}
              Report={true}
              ALL_BMI_ARRAY={BMI_ARRAY}
              Report_Year={Report_Year_Data.Report_Year}
              />
            )}
          </Box>
        </Box>
        <Box height={"35%"} width={"100%"}>
          <List
            // sx={{bgcolor: "blue"}}
            subheader={
              <ListSubheader sx={{ fontWeight: "900" }}>Remarks</ListSubheader>
            }
          >
            <Typography p={"0 30px"}>{Remark}</Typography>
            <Box
              boxSizing={"border-box"}
              width={"100%"}
              height={"10px"}
              padding={"90px 0"}
              className="col y-center space-around"
            >
              <Typography>______________________</Typography>
              <Typography fontWeight={"bold"}>Medical Officer</Typography>
              <Typography fontWeight={"bold"}>
                {Report_Year_Data.Report_Year}
              </Typography>
            </Box>
          </List>
        </Box>
      </Box>
    </>
  );
};

export default Page_2;
