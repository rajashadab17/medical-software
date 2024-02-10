import React, { useEffect, useState } from "react";
import {
  Allergies,
  BloodDisorders,
  congenitalAnomaly,
  congenitalHeartDisease,
} from "../Data/DetailEntry";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  OutlinedInput,
  MenuItem,
  InputLabel,
  Select,
  FormControlLabel,
  FormLabel,
  Checkbox,
  FormGroup,
} from "@mui/material";

const DiseaseSection = ({ handleMyClick, data }) => {
  const [Disease_Details, setDisease_Details] = useState({
    Heart_Disease: "",
    Anamoly: "",
    Blood_Disorder: "",
    Allergy: "",
    Diabetes: "",
    Asthama: "",
    Epilepsy: "",
    Epistaxes: "",
    Other_Disease: "",
  });

  useEffect(() => {
    data && setDisease_Details(data[0] ? data[0] : Disease_Details);
  }, [data]);

  const onChangeValue = (e) => {
    setDisease_Details({ ...Disease_Details, [e.target.name]: e.target.value });
  };
  
  const onChangeCheck = (e) => {
    setDisease_Details({ ...Disease_Details, [e.target.name]: e.target.checked});
  };

  useEffect(() => {
    handleMyClick(Disease_Details);
  }, [Disease_Details]);
  return (
    <>
      <Box display={"flex"} flexDirection={"column"} >
        <Typography
          variant="h3"
          fontSize={"2vw"}
          textAlign={"center"}
          margin={"10px 0"}
        >
          Any Other Disease
        </Typography>
        <Box
        width={"80%"} 
        // bgcolor={"purple"}
          margin={"50px auto"}
          display={" grid"}
          gridTemplateColumns={"1fr 1fr"}
          gridTemplateRows={"1fr 1fr"}
          gap={"30px"}
          // alignItems={"center"}
          // textAlign={"center"}
          sx={{ placeItems: "center" }}
        >
          <FormControl sx={{ width: 300 }}>
            <InputLabel id="demo-multiple-name-label">
              Any congenital Heart Disease
            </InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              name="Heart_Disease"
              value={Disease_Details.Heart_Disease}
              onChange={(e) => {
                onChangeValue(e);
              }}
              input={<OutlinedInput label="Any congenital Heart Disease" />}
              fullWidth
            >
              {congenitalHeartDisease.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: 300 }}>
            <InputLabel id="demo-multiple-name-label">
              Any Congenital Anomaly
            </InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              name="Anamoly"
              value={Disease_Details.Anamoly}
              onChange={(e) => {
                onChangeValue(e);
              }}
              input={<OutlinedInput label="Any Congenital Anomaly" />}
              fullWidth
            >
              {congenitalAnomaly.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: 300 }}>
            <InputLabel id="demo-multiple-name-label">
              Any Blood Disorder
            </InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              name="Blood_Disorder"
              value={Disease_Details.Blood_Disorder}
              onChange={(e) => {
                onChangeValue(e);
              }}
              input={<OutlinedInput label="Any Blood Disorder" />}
              fullWidth
            >
              {BloodDisorders.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: 300 }}>
            <InputLabel id="demo-multiple-name-label">
              Any Known Allergy
            </InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              name="Allergy"
              value={Disease_Details.Allergy}
              onChange={(e) => {
                onChangeValue(e);
              }}
              input={<OutlinedInput label="Allergy" />}
            >
              {Allergies.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box textAlign={"center"} width={"80%"} margin={"auto"} >
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Other Common Disease
            </FormLabel>
            <FormGroup
              sx={{
                display: "flex",
                flexDirection: "row !important",
                width: "auto",
                marginTop: "5px",
              }}
            >
              <FormControlLabel
                control={<Checkbox />}
                label={"Diabetes"}
                checked={Disease_Details.Diabetes}
                name="Diabetes"
                onChange={(e) => {
                  onChangeCheck(e);
                }}
              />
              <FormControlLabel
                control={<Checkbox />}
                label={"Asthama"}
                checked={Disease_Details.Asthama}
                name="Asthama"
                onChange={(e) => {
                  onChangeCheck(e);
                }}
              />
              <FormControlLabel
                control={<Checkbox />}
                label={"Epilepsy"}
                checked={Disease_Details.Epilepsy}
                name="Epilepsy"
                onChange={(e) => {
                  onChangeCheck(e);
                }}
              />
              <FormControlLabel
                control={<Checkbox />}
                label={"Epistaxes"}
                checked={Disease_Details.Epistaxes}
                name="Epistaxes"
                onChange={(e) => {
                  onChangeCheck(e);
                }}
              />
            </FormGroup>
          </FormControl>
          <Box display={"flex"} alignItems={"center"}>
            {/* <Typography m={"0 10px 0"}>Other Disease</Typography> */}
            <TextField
              id="Year"
              sx={{ width: 200 }}
              value={Disease_Details.Other_Disease}
              name="Other_Disease"
              onChange={(e) => onChangeValue(e)}
              label="Other Disease"
              variant="outlined"
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DiseaseSection;
