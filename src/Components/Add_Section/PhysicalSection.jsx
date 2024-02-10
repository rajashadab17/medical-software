import React, { useState, useEffect } from "react";
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
} from "@mui/material";

const PhysicalSection = ({ handleMyClick, data }) => {
  const [WeightValue, setWeightValue] = useState("");
  const [HeightValue, setHeightValue] = useState("");
  const [Physical_Details, setPhysical_Details] = useState({
    Cleanliness: "",
    Height_Foot_Inches: "",
    Height_Centimeter: "",
    Weight_Kg: "",
    Weight_Lb: "",
    Weight: "",
    Height: "",
    // BMI_Remark:"",
  });

  useEffect(() => {
    data && setPhysical_Details(data[0] ? data[0] : Physical_Details);
  }, [data]);

  // console.log("Edit", Physical_Details);

  useEffect(() => {
    if (Physical_Details.Weight == "Kg") {
      setPhysical_Details({
        ...Physical_Details,
        Weight_Kg: WeightValue,
        Weight_Lb: (WeightValue * 2.205).toFixed(3),
      });
    } else {
      setPhysical_Details({
        ...Physical_Details,
        Weight_Kg: (WeightValue / 2.205).toFixed(3),  
        Weight_Lb: WeightValue,
      });
    }
  }, [WeightValue]);

  useEffect(() => {
    if (Physical_Details.Height == "Foot - Inches") {
      if (HeightValue.includes(".")) {
        let Foot_Inches_Array = HeightValue.split(".");
        let Foot = Number(Foot_Inches_Array[0]);
        let Inches = Number(Foot_Inches_Array[1]);
        let Meter_Centimeter = (Foot * 30.48 + Inches * 2.54).toFixed(3);
        console.log(Foot);
        setPhysical_Details({
          ...Physical_Details,
          Height_Foot_Inches: `${Foot}' ${Inches}"`,
          Height_Centimeter: Meter_Centimeter,
        });
      } else if (HeightValue.includes(`'`)) {
        let Foot_Inches_Array = HeightValue.split("' ");
        let Foot = Foot_Inches_Array[0];
        let Inches = Foot_Inches_Array[1].split(`"`);
        let Previous_Inch = Inches[0];
        let Next_Inch = Inches[1];
        let Foot_Inch = Foot.concat(`.`).concat(Previous_Inch);
        setHeightValue(Foot_Inch);
        setPhysical_Details({
          ...Physical_Details,
          Height_Foot_Inches: Foot_Inch,
        });
      } else {
        let Meter_Centimeter = HeightValue * 30.48;
        setPhysical_Details({
          ...Physical_Details,
          Height_Foot_Inches: `${HeightValue}' 0"`,
          Height_Centimeter: `${Meter_Centimeter}`,
        });
      }
    } else {
      let valueInInches = HeightValue / 2.54;
      let requiredFeet = Math.floor(valueInInches / 12);
      let requiredInches = (valueInInches - 12 * requiredFeet).toFixed(3);
      let valueInFootInches = (requiredFeet + requiredInches / 10).toFixed(3);
      let arr = valueInFootInches.split(".");
      let foot = arr[0];
      let inch = arr[1];

      setPhysical_Details({
        ...Physical_Details,
        Height_Foot_Inches: `${foot}' ${inch}"`,
        Height_Centimeter: HeightValue,
      });     
    }
  }, [HeightValue]);

  const onChangeValue = (e) => {
    setPhysical_Details({
      ...Physical_Details,
      [e.target.name]: e.target.value, 
    });
    
  };

  useEffect(() => {
    console.log(Physical_Details)
    handleMyClick(Physical_Details);
  }, [Physical_Details]);

  return (
    <>
      <Box width={"80%"}  margin={"auto"}>
        <Typography variant="h3" fontSize={"2vw"} textAlign={"center"}>
          Physical Information
        </Typography>
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">
            General Cleanliness
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="Cleanliness"
            value={Physical_Details.Cleanliness}
            onChange={(e) => onChangeValue(e)}
          >
            <FormControlLabel value="Good" control={<Radio />} label="Good" />
            <FormControlLabel
              value="Average"
              control={<Radio />}
              label="Average"
            />
            <FormControlLabel value="Poor" control={<Radio />} label="Poor" />
          </RadioGroup>
        </FormControl>
      </Box>
      <Box padding={"10px 0"} className="space-between" width={"80%"} margin={"auto"}>
        <Box>
          <FormLabel>Weight</FormLabel>
          <br />
          <br />
          <FormControl sx={{ width: 200 }}>
            <InputLabel id="demo-multiple-name-label">Weight Unit</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              name="Weight"
              value={Physical_Details.Weight}
              onChange={(e) => {
                onChangeValue(e);
              }}
              input={<OutlinedInput label="Weight Unit" />}
            >
              {["Kg", "Pound"].map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />
          <br />
          <TextField
            id="Weight"
            sx={{ width: 200 }}
            label="Weight"
            variant="outlined"
            name={Physical_Details.Weight == "Kg" ? "Weight_Kg" : "Weight_Lb"}
            value={
              Physical_Details.Weight == "Kg"
                ? Physical_Details.Weight_Kg
                : Physical_Details.Weight_Lb
            }
            onChange={(e) => {
              setWeightValue(e.target.value);
              onChangeValue(e);
            }}
          />
          <br />
          <br />
          <FormLabel id="checkWeight">
            {Physical_Details.Weight == ""
              ? ""
              : Physical_Details.Weight == "Kg"
              ? "Weight in Pound"
              : "Weight in Kg"}{" "}
            {Physical_Details.Weight == ""
              ? ""
              : Physical_Details.Weight == "Kg"
              ? Physical_Details.Weight_Lb
              : Physical_Details.Weight_Kg}
          </FormLabel>
        </Box>
        <Box>
          <FormLabel>Height</FormLabel>
          <br />
          <br />
          <Box>
            <FormControl sx={{ width: 200 }}>
              <InputLabel id="demo-multiple-name-label">Height</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                name="Height"
                value={Physical_Details.Height}
                onChange={(e) => {
                  onChangeValue(e);
                }}
                input={<OutlinedInput label="Height" />}
              >
                {["Foot - Inches", "Meter - Centimeter"].map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <br />
            <br />
            <TextField
              id="Height"
              sx={{ width: 200 }}
              label="Height"
              variant="outlined"
              name={
                Physical_Details.Height == "Foot - Inches"
                  ? "Height_Foot_Inches"
                  : "Height_Centimeter"
              }
              value={
                Physical_Details.Height == "Foot - Inches"
                  ? Physical_Details.Height_Foot_Inches
                  : Physical_Details.Height_Centimeter
              }
              onChange={(e) => {
                setHeightValue(e.target.value);
                onChangeValue(e);
              }}
            />
            <br />
            <br />
            <FormLabel>
              {Physical_Details.Height == ""
                ? ""
                : Physical_Details.Height == "Foot - Inches"
                ? "Height in Meter - Centimeter"
                : "Height in Foot - Inches"}{" "}
              {Physical_Details.Height == ""
                ? ""
                : Physical_Details.Height == "Foot - Inches"
                ? Physical_Details.Height_Centimeter
                : Physical_Details.Height_Foot_Inches}
            </FormLabel>

            <br />
            <br />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PhysicalSection;
