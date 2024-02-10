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
  Radio,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Checkbox,
  FormGroup,
} from "@mui/material";
import { E } from "styled-icons/fa-solid";

const DiseaseSection = ({ handleMyClick }) => {
  const [Diabetes, setDiabetes] = useState();
  const [Asthama, setAsthama] = useState();
  const [Epilepsy, setEpilepsy] = useState();
  const [Epistaxes, setEpistaxes] = useState();
  const [Other, setOther] = useState();
  const [Disease_Details, setDisease_Details] = useState({
    Heart_Disease: "",
    Anamoly: "",
    Blood_Disorder: "",
    Allergy: "",
    Other_Disease: "",
  });
  const onChangeValue = (e) => {
    setDisease_Details({ ...Disease_Details, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setDisease_Details({
      ...Disease_Details,
      Diabetes: Diabetes == undefined ? "" : Diabetes,
      Asthama: Asthama == undefined ? "" : Asthama,
      Epilepsy: Epilepsy == undefined ? "" : Epilepsy,
      Epistaxes: Epistaxes == undefined ? "" : Epistaxes,
    });
  }, [Diabetes, Asthama, Epilepsy, Epistaxes]);

  useEffect(() => {
    console.log("Disd", Disease_Details);
    handleMyClick(Disease_Details);
  }, [Disease_Details]);
  return (
    <>
      <Box display={"flex"} flexDirection={"column"}>
        <Typography
          variant="h3"
          fontSize={"2vw"}
          textAlign={"center"}
          margin={"10px 0"}
        >
          Any Other Disease
        </Typography>
        <Box
          margin={"50px 0"}
          display={" grid"}
          gridTemplateColumns={"1fr 1fr"}
          gridTemplateRows={"1fr 1fr"}
          gap={"30px"}
          alignItems={"center"}
          textAlign={"center"}
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
            {/* {
                        HeartDisease == "Other" ? <TextField placeholder='Any Other Congenital Heart Disease:'></TextField> : ""
                    } */}
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
            {/* {
                        Anamoly == "Other" ? <TextField placeholder='Any Other Congenital Anamoly:'></TextField> : ""
                    } */}
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
            {/* {
                        BloodDisorder == "Other" ? <TextField placeholder='Any Other Blood Disorder'></TextField> : ""
                    } */}
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
            {/* {
                        Allergy == "Other" ? <TextField placeholder='Any Other Allergy'></TextField> : ""
                    } */}
          </FormControl>
        </Box>
        <Box textAlign={"center"}>
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
                value={Diabetes}
                name={"Diabetes"}
                onChange={(e) => {
                  setDiabetes(e.target.checked);
                  onChangeValue(e);
                }}
              />
              <FormControlLabel
                control={<Checkbox />}
                label={"Asthama"}
                value={Asthama}
                name={"Asthama"}
                onChange={(e) => {
                  setAsthama(e.target.checked);
                  onChangeValue(e);
                }}
              />
              <FormControlLabel
                control={<Checkbox />}
                label={"Epilepsy"}
                value={Epilepsy}
                name={"Epilepsy"}
                onChange={(e) => {
                  setEpilepsy(e.target.checked);
                  onChangeValue(e);
                }}
              />
              <FormControlLabel
                control={<Checkbox />}
                label={"Epistaxes"}
                value={Epistaxes}
                name={"Epistaxes"}
                onChange={(e) => {
                  setEpistaxes(e.target.checked);
                  onChangeValue(e);
                }}
              />
              {/* <FormControlLabel control={<Checkbox />} label={"Other"} value={Other} name={"Other"} onChange={(e) => {
                            setOther(e.target.checked)
                            onChangeValue(e)
                        }} /> */}
            </FormGroup>
            {/* <TextField name='Other_Disease' value={Other} onChange={e => onChangeValue(e)} /> */}
          </FormControl>
          <Box display={"flex"} alignItems={"center"}>
            {/* <FormLabel id="demo-row-radio-buttons-group-label">Other Disease</FormLabel> */}
            <Typography m={"0 10px 0"}>Other Disease</Typography>
            <TextField
              id="Year"
              sx={{ width: 200 }}
              value={Disease_Details.Other_Disease}
              onChange={(e) => onChangeValue(e)}
              name="Other_Disease"
              label="Other Disease"
              variant="outlined"
            />
          </Box>
        </Box>
        {/* <Box
    // margin={"50px 0"}
    display={"flex"}
    // justifyContent={"space-evenly"}
    // alignItems={"center"}
    >

      {
          HeartDisease == "Other" ? <TextField placeholder='Any Other Congenital Heart Disease:'></TextField> : ""
        }
        {
          Anamoly == "Other" ? <TextField placeholder='Any Other Congenital Anamoly:'></TextField> : ""
        }
        {
          BloodDisorder == "Other" ? <TextField placeholder='Any Other Blood Disorder'></TextField> : ""
        }
        {
          Allergy == "Other" ? <TextField placeholder='Any Other Blood Disorder'></TextField> : ""
        }
    </Box> */}
      </Box>
    </>
  );
};

export default DiseaseSection;
