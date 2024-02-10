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

const VaccineSection = ({ handleMyClick, data }) => {
  const [Vaccine_Details, setVaccine_Details] = useState({
    Child_Immunization:"",
    Child_Missing_Dose:"",
    Hepatitis_B_Vaccine:"",
    Hepatitis_Missing_Dose:"",
    Tetnes_Vaccine:"",
    Tetnes_Missing_Dose:"",
  });

  useEffect(() => {
    data && setVaccine_Details(data[0] ? data[0] : Vaccine_Details);
  }, [data]);

  const onChangeValue = (e) => {
    setVaccine_Details({
      ...Vaccine_Details,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeCheck = (e) => {
    setVaccine_Details({
      ...Vaccine_Details,
      [e.target.name]: e.target.checked,
    });
  };

  useEffect(() => {
    handleMyClick(Vaccine_Details);
  }, [Vaccine_Details]);

  return (
    <>
      <Box display={"flex"} flexDirection={"column"}>
        <Typography
          variant="h3"
          fontSize={"2vw"}
          textAlign={"center"}
          margin={"10px 0"}
        >
          Immunization and Vaccines
        </Typography>
        <Box width={"80%"} margin={"auto"}>
          <Typography textAlign={"center"} variant="h5">
            Immunization Record
          </Typography>
          <Box display={"flex"} justifyContent={"space-between"}>
          <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="Child_Immunization"
                value={Vaccine_Details.Child_Immunization}
                onChange={(e) => onChangeValue(e)}
              >
                <FormControlLabel
                  value="Complete"
                  control={<Radio />}
                  label="Complete"
                />
                <FormControlLabel
                  value="Incomplete"
                  control={<Radio />}
                  label="Incomplete"
                />
                <FormControlLabel
                  value="No"
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
            </FormControl>
            <TextField
              id="Year"
              sx={{ width: 250 }}
              value={Vaccine_Details.Child_Missing_Dose}
              name="Child_Missing_Dose"
              onChange={(e) => onChangeValue(e)}
              label="If Incomplete, Missing dose"
              variant="outlined"
            />
          </Box>
        </Box>
        <Box width={"80%"} margin={"auto"}>
          <Typography textAlign={"center"} variant="h5">
            Hepatitis B Vaccine
          </Typography>
          <Box display={"flex"} justifyContent={"space-between"}>
          <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="Hepatitis_B_Vaccine"
                value={Vaccine_Details.Hepatitis_B_Vaccine}
                onChange={(e) => onChangeValue(e)}
              >
                <FormControlLabel
                  value="Complete"
                  control={<Radio />}
                  label="Complete"
                />
                <FormControlLabel
                  value="Incomplete"
                  control={<Radio />}
                  label="Incomplete"
                />
                <FormControlLabel
                  value="No"
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
            </FormControl>
            <TextField
              id="Year"
              sx={{ width: 250 }}
              value={Vaccine_Details.Hepatitis_Missing_Dose}
              name="Hepatitis_Missing_Dose"
              onChange={(e) => onChangeValue(e)}
              label="If Incomplete, Missing dose"
              variant="outlined"
            />
          </Box>
        </Box>
        <Box width={"80%"} margin={"auto"}>
          <Typography textAlign={"center"} variant="h5">
            Tetnes Vaccine
          </Typography>
          <Box display={"flex"} justifyContent={"space-between"}>
          <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="Tetnes_Vaccine"
                value={Vaccine_Details.Tetnes_Vaccine}
                onChange={(e) => onChangeValue(e)}
              >
                <FormControlLabel
                  value="5 Doses Given"
                  control={<Radio />}
                  label="5 Doses Given"
                />
                <FormControlLabel
                  value="4 Doses Given"
                  control={<Radio />}
                  label="4 Doses Given"
                />
                <FormControlLabel
                  value="3 Doses Given"
                  control={<Radio />}
                  label="3 Doses Given"
                />
              </RadioGroup>
            </FormControl>
            <TextField
              id="Year"
              sx={{ width: 250 }}
              value={Vaccine_Details.Tetnes_Missing_Dose}
              name="Tetnes_Missing_Dose"
              onChange={(e) => onChangeValue(e)}
              label="If Incomplete, Missing dose"
              variant="outlined"
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default VaccineSection;
