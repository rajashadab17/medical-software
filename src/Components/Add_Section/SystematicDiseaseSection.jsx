import React, { useEffect, useState } from "react";
import { Hair, Nails, Skin, Teeth, Tongue } from "../Data/DetailEntry";
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

const SystematicDiseaseSection = ({ handleMyClick, data }) => {
  const [Systematic_Details, setSystematic_Details] = useState({
    CNS_Abnormality_Speech_Gait: false,
    CNS_Other: "",
    Chest_Congenital_Deformity: false,
    Chest_Other: "",
    CVS_Tachycardia: false,
    CVS_Murmurs: false,
    CVS_Other: "",
    Abdomen_Hernia: false,
    Abdomen_Viscer: false,
    Abdomen_Other: "",
  });

  useEffect(() => {
    // data && setSystematic_Details(Systematic_Details);
    data && setSystematic_Details(data[0] ? data[0] : Systematic_Details);
  }, [data]);

  const onChangeValue = (e) => {
    setSystematic_Details({
      ...Systematic_Details,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeCheck = (e) => {
    setSystematic_Details({
      ...Systematic_Details,
      [e.target.name]: e.target.checked,
    });
  };

  useEffect(() => {
    console.log("SD", Systematic_Details)
    handleMyClick(Systematic_Details);
  }, [Systematic_Details]);

  return (
    <>
      <Box display={"flex"} flexDirection={"column"}>
        <Typography
          variant="h3"
          fontSize={"2vw"}
          textAlign={"center"}
          margin={"10px 0"}
        >
          Systematic Examination
        </Typography>
        <Box width={"80%"} margin={"auto"}>
          <Typography textAlign={"center"} variant="h5">
            CNS
          </Typography>
          <Box display={"flex"} justifyContent={"space-between"}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Right
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
                  checked={Systematic_Details.CNS_Abnormality_Speech_Gait}
                  label={"Abnormality of Speech Gait"}
                  name={"CNS_Abnormality_Speech_Gait"}
                  onChange={(e) => {
                    onChangeCheck(e);
                  }}
                />
              </FormGroup>
            </FormControl>
            <TextField
              id="Year"
              sx={{ width: 250 }}
              value={Systematic_Details.CNS_Other}
              name="CNS_Other"
              onChange={(e) => onChangeValue(e)}
              label="Any Other"
              variant="outlined"
            />
          </Box>
        </Box>
        <Box width={"80%"} margin={"auto"}>
          <Typography textAlign={"center"} variant="h5">
            Chest
          </Typography>
          <Box display={"flex"} justifyContent={"space-between"}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Right
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
                  checked={Systematic_Details.Chest_Congenital_Deformity}
                  label={"Congenital Deformity"}
                  name={"Chest_Congenital_Deformity"}
                  onChange={(e) => {
                    onChangeCheck(e);
                  }}
                />
              </FormGroup>
            </FormControl>
            <TextField
              id="Year"
              sx={{ width: 250 }}
              value={Systematic_Details.Chest_Other}
              name="Chest_Other"
              onChange={(e) => onChangeValue(e)}
              label="Any Other"
              variant="outlined"
            />
          </Box>
        </Box>
        <Box width={"80%"} margin={"auto"}>
          <Typography textAlign={"center"} variant="h5">
            CVS
          </Typography>
          <Box display={"flex"} justifyContent={"space-between"}>
            <FormControl>
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
                  checked={Systematic_Details.CVS_Tachycardia}
                  label={"Tachycardia"}
                  name={"CVS_Tachycardia"}
                  onChange={(e) => {
                    onChangeCheck(e);
                  }}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  checked={Systematic_Details.CVS_Murmurs}
                  label={"Murmurs"}
                  name={"CVS_Murmurs"}
                  onChange={(e) => {
                    onChangeCheck(e);
                  }}
                />
              </FormGroup>
            </FormControl>
            <TextField
              id="Year"
              sx={{ width: 250 }}
              value={Systematic_Details.CVS_Other}
              name="CVS_Other"
              onChange={(e) => onChangeValue(e)}
              label="Any Other"
              variant="outlined"
            />
          </Box>
        </Box>
        <Box width={"80%"} margin={"auto"}>
          <Typography textAlign={"center"} variant="h5">
            Abdomen
          </Typography>
          <Box display={"flex"} justifyContent={"space-between"}>
            <FormControl>
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
                  checked={Systematic_Details.Abdomen_Hernia}
                  label={"Hernia"}
                  name={"Abdomen_Hernia"}
                  onChange={(e) => {
                    onChangeCheck(e);
                  }}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  checked={Systematic_Details.Abdomen_Viscer}
                  label={"Visceromegaly"}
                  name={"Abdomen_Viscer"}
                  onChange={(e) => {
                    onChangeCheck(e);
                  }}
                />
              </FormGroup>
            </FormControl>
            <TextField
              id="Year"
              sx={{ width: 250 }}
              value={Systematic_Details.Abdomen_Other}
              name="Abdomen_Other"
              onChange={(e) => onChangeValue(e)}
              label="Any Other"
              variant="outlined"
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SystematicDiseaseSection;
