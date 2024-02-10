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

const PhysicalExaminationSection = ({ handleMyClick, data }) => {
  const [Physical_Exam_Details, setPhysical_Exam_Details] = useState({
    Hair: "",
    Teeth: "",
    Tongue: "",
    Nails: "",
    Skin: "",
    Nasal_Septum_Deviation_Right: false,
    Nasal_Septum_Deviation_Left: false,
    Nasal_Septum_Deviation_DNS: false,
    Turbinate_Hypertrophy_Right_Nostril: false,
    Turbinate_Hypertrophy_Left_Nostril: false,
    Turbinate_Hypertrophy_T_HYP: false,
    Nose_Other_Disease: "",
    Tonsil_Status: "",
    Tonsil_Enlargement_Right: false,
    Tonsil_Enlargement_Left: false,
    Eye_Right_Squint: false,
    Eye_Left_Squint: false,
    Eye_Both_Squint: false,
    Eye_Right_Opacity: false,
    Eye_Left_Opacity: false,
    Eye_Both_Opacity: false,
    Eye_Right_Ref_Error: false,
    Eye_Left_Ref_Error: false,
    Eye_Both_Ref_Error: false,
    Eye_Other_Disease: "",
    Ear_Right_SOM: false,
    Ear_Left_SOM: false,
    Ear_Both_SOM: false,
    Ear_Right_Wax: false,
    Ear_Left_Wax: false,
    Ear_Both_Wax: false,
    Ear_Other_Disease: "",
    Vision_Right: "",
    Vision_Left: "",
    Conjuctiva_Status: "",
    Conjuctiva_Other_Disease: "",
    Gums_Status: "",
    Gums_Other_Disease: "",
    Bones_Flat_Feet_Right: false,
    Bones_Flat_Feet_Left: false,
    Bones_Flat_Feet_Both: false,
    Bones_Gross_Flat_Feet_Right: false,
    Bones_Gross_Flat_Feet_Left: false,
    Bones_Gross_Flat_Feet_Both: false,
    Bones_Gross_Flat_Feet_B_L: false,
    Bones_Minimal_Flat_Feet_Right: false,
    Bones_Minimal_Flat_Feet_Left: false,
    Bones_Minimal_Flat_Feet_Both: false,
    Bones_Border_Line_Feet_Right: false,
    Bones_Border_Line_Feet_Left: false,
    Bones_Knee_Knocking: false,
    Bones_Other_Disease: "",
  });

  useEffect(() => {
    data && setPhysical_Exam_Details(data[0] ? data[0] : Physical_Exam_Details);
  }, [data]);

  const onChangeValue = (e) => {
    setPhysical_Exam_Details({
      ...Physical_Exam_Details,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeCheck = (e) => {
    setPhysical_Exam_Details({
      ...Physical_Exam_Details,
      [e.target.name]: e.target.checked,
    });
  };

  useEffect(() => {
    console.log("PE", Physical_Exam_Details);
    handleMyClick(Physical_Exam_Details);
  }, [Physical_Exam_Details]);

  return (
    <>
      <Box display={"flex"} flexDirection={"column"}>
        <Typography
          variant="h3"
          fontSize={"2vw"}
          textAlign={"center"}
          margin={"10px 0"}
        >
          Physical Examination
        </Typography>
        <Box
          // bgcolor={"blue"}
          margin={"50px auto"}
          width={"89%"}
          display={"grid"}
          gridTemplateColumns={"repeat(3, 1fr)"}
          gridTemplateRows={"repeat(2, 1fr)"}
          gap={"30px"}
          alignItems={"center"}
          textAlign={"center"}
          sx={{ placeItems: "center" }}
        >
          <FormControl sx={{ width: 300 }}>
            <InputLabel id="demo-multiple-name-label">Hair</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              name="Hair"
              value={Physical_Exam_Details.Hair}
              onChange={(e) => {
                onChangeValue(e);
              }}
              input={<OutlinedInput label="Hair" />}
              fullWidth
            >
              {Hair.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: 300 }}>
            <InputLabel id="demo-multiple-name-label">Teeth</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              name="Teeth"
              value={Physical_Exam_Details.Teeth}
              onChange={(e) => {
                onChangeValue(e);
              }}
              input={<OutlinedInput label="Teeth" />}
              fullWidth
            >
              {Teeth.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: 300 }}>
            <InputLabel id="demo-multiple-name-label">Tongue</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              name="Tongue"
              value={Physical_Exam_Details.Tongue}
              onChange={(e) => {
                onChangeValue(e);
              }}
              input={<OutlinedInput label="Tongue" />}
              fullWidth
            >
              {Tongue.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: 300 }}>
            <InputLabel id="demo-multiple-name-label">Nails</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              name="Nails"
              value={Physical_Exam_Details.Nails}
              onChange={(e) => {
                onChangeValue(e);
              }}
              input={<OutlinedInput label="Nails" />}
            >
              {Nails.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: 300 }}>
            <InputLabel id="demo-multiple-name-label">Skin</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              name="Skin"
              value={Physical_Exam_Details.Skin}
              onChange={(e) => {
                onChangeValue(e);
              }}
              input={<OutlinedInput label="Skin" />}
            >
              {Skin.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box width={"80%"} margin={"auto"}>
          <Typography textAlign={"center"} variant="h5">
            Nose
          </Typography>
          <Box display={"flex"} justifyContent={"space-between"}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Nasal Septum Deviation
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
                  label={"Right"}
                  checked={Physical_Exam_Details.Nasal_Septum_Deviation_Right}
                  name={"Nasal_Septum_Deviation_Right"}
                  onChange={(e) => {
                    onChangeCheck(e);
                  }}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label={"Left"}
                  checked={Physical_Exam_Details.Nasal_Septum_Deviation_Left}
                  name={"Nasal_Septum_Deviation_Left"}
                  onChange={(e) => {
                    onChangeCheck(e);
                  }}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label={"DNS"}
                  checked={Physical_Exam_Details.Nasal_Septum_Deviation_DNS}
                  name={"Nasal_Septum_Deviation_DNS"}
                  onChange={(e) => {
                    onChangeCheck(e);
                  }}
                />
              </FormGroup>
            </FormControl>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Turbinate Hypertrophy
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
                  label={"Right Nostril"}
                  checked={
                    Physical_Exam_Details.Turbinate_Hypertrophy_Right_Nostril
                  }
                  name={"Turbinate_Hypertrophy_Right_Nostril"}
                  onChange={(e) => {
                    onChangeCheck(e);
                  }}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label={"Left Nostril"}
                  checked={
                    Physical_Exam_Details.Turbinate_Hypertrophy_Left_Nostril
                  }
                  name={"Turbinate_Hypertrophy_Left_Nostril"}
                  onChange={(e) => {
                    onChangeCheck(e);
                  }}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label={"T/HYP"}
                  checked={Physical_Exam_Details.Turbinate_Hypertrophy_T_HYP}
                  name={"Turbinate_Hypertrophy_T_HYP"}
                  onChange={(e) => {
                    onChangeCheck(e);
                  }}
                />
              </FormGroup>
            </FormControl>
          </Box>
          <Box>
            <TextField
              id="Year"
              sx={{ width: 250 }}
              value={Physical_Exam_Details.Nose_Other_Disease}
              name="Nose_Other_Disease"
              onChange={(e) => onChangeValue(e)}
              label="Any Other Nose Disease"
              variant="outlined"
            />
          </Box>
        </Box>
        <Box width={"80%"} margin={"auto"}>
          <Typography textAlign={"center"} variant="h5">
            Tonsils
          </Typography>
          <Box display={"flex"} justifyContent={"space-between"}>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="Tonsil_Status"
                value={Physical_Exam_Details.Tonsil_Status}
                onChange={(e) => {
                  onChangeValue(e);
                }}
              >
                <FormControlLabel
                  value="Exists"
                  control={<Radio />}
                  label="Exists"
                />
                <FormControlLabel
                  value="Removed"
                  control={<Radio />}
                  label="Removed"
                />
              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Turbinate Hypertrophy
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
                  checked={Physical_Exam_Details.Tonsil_Enlargement_Right}
                  label={"Enlarge Right"}
                  name="Tonsil_Enlargement_Right"
                  onChange={(e) => {
                    onChangeCheck(e);
                  }}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  checked={Physical_Exam_Details.Tonsil_Enlargement_Left}
                  label={"Enlarge Leftl"}
                  name={"Tonsil_Enlargement_Left"}
                  onChange={(e) => {
                    onChangeCheck(e);
                  }}
                />
              </FormGroup>
            </FormControl>
          </Box>
        </Box>
        <Box width={"80%"} margin={"auto"}>
          <Typography textAlign={"center"} variant="h5">
            Eyes
          </Typography>
          <Box display={"flex"} justifyContent={"space-between"}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Squint
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
                  checked={Physical_Exam_Details.Eye_Right_Squint}
                  label={"Right"}
                  name={"Eye_Right_Squint"}
                  onChange={(e) => {
                    onChangeCheck(e);
                  }}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  checked={Physical_Exam_Details.Eye_Left_Squint}
                  label={"Left"}
                  name={"Eye_Left_Squint"}
                  onChange={(e) => {
                    onChangeCheck(e);
                  }}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  checked={Physical_Exam_Details.Eye_Both_Squint}
                  label={"Both"}
                  name={"Eye_Both_Squint"}
                  onChange={(e) => {
                    onChangeCheck(e);
                  }}
                />
              </FormGroup>
            </FormControl>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Opacity
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
                  checked={Physical_Exam_Details.Eye_Right_Opacity}
                  label={"Right"}
                  name={"Eye_Right_Opacity"}
                  onChange={(e) => {
                    onChangeCheck(e);
                  }}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  checked={Physical_Exam_Details.Eye_Left_Opacity}
                  label={"Left"}
                  name={"Eye_Left_Opacity"}
                  onChange={(e) => {
                    onChangeCheck(e);
                  }}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  checked={Physical_Exam_Details.Eye_Both_Opacity}
                  label={"Both"}
                  name={"Eye_Both_Opacity"}
                  onChange={(e) => {
                    onChangeCheck(e);
                  }}
                />
              </FormGroup>
            </FormControl>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Ref Error
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
                  checked={Physical_Exam_Details.Eye_Right_Ref_Error}
                  label={"Right"}
                  name={"Eye_Right_Ref_Error"}
                  onChange={(e) => {
                    onChangeCheck(e);
                  }}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  checked={Physical_Exam_Details.Eye_Left_Ref_Error}
                  label={"Left"}
                  name={"Eye_Left_Ref_Error"}
                  onChange={(e) => {
                    onChangeCheck(e);
                  }}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  checked={Physical_Exam_Details.Eye_Both_Ref_Error}
                  label={"Both"}
                  name={"Eye_Both_Ref_Error"}
                  onChange={(e) => {
                    onChangeCheck(e);
                  }}
                />
              </FormGroup>
            </FormControl>
          </Box>
          <Box>
            <TextField
              id="Year"
              sx={{ width: 250 }}
              value={Physical_Exam_Details.Eye_Other_Disease}
              name="Eye_Other_Disease"
              onChange={(e) => onChangeValue(e)}
              label="Any Abnormality"
              variant="outlined"
            />
          </Box>
        </Box>
        {/* <Box width={"80%"} margin={"auto"}>
          <Typography textAlign={"center"} variant="h5">
            Eyes
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
                  checked={Physical_Exam_Details.Eye_Right_Squint}
                  label={"Squint"}
                  name={"Eye_Right_Squint"}
                  onChange={(e) => {
                    onChangeCheck(e);
                  }}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  checked={Physical_Exam_Details.Eye_Right_Opacity}
                  label={"Opacity"}
                  name={"Eye_Right_Opacity"}
                  onChange={(e) => {
                    onChangeCheck(e);
                  }}
                />
              </FormGroup>
            </FormControl>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Left
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
                  checked={Physical_Exam_Details.Eye_Left_Squint}
                  label={"Squint"}
                  name={"Eye_Left_Squint"}
                  onChange={(e) => {
                    onChangeCheck(e);
                  }}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  checked={Physical_Exam_Details.Eye_Left_Opacity}
                  label={"Opacity"}
                  name={"Eye_Left_Opacity"}
                  onChange={(e) => {
                    onChangeCheck(e);
                  }}
                />
              </FormGroup>
            </FormControl>
          </Box>
          <Box>
            <TextField
              id="Year"
              sx={{ width: 250 }}
              value={Physical_Exam_Details.Eye_Other_Disease}
              name="Eye_Other_Disease"
              onChange={(e) => onChangeValue(e)}
              label="Any Abnormality"
              variant="outlined"
            />
          </Box>
        </Box> */}
        <Box width={"80%"} margin={"auto"}>
          <Typography textAlign={"center"} variant="h5">
            Vision
          </Typography>
          <Box display={"flex"} justifyContent={"space-between"}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Right
              </FormLabel>
              <TextField
                id="Year"
                sx={{ width: 200 }}
                name="Vision_Right"
                value={Physical_Exam_Details.Vision_Right}
                onChange={(e) => onChangeValue(e)}
                label="Right"
                variant="outlined"
              />
            </FormControl>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Left
              </FormLabel>
              <TextField
                id="Year"
                sx={{ width: 200 }}
                name="Vision_Left"
                value={Physical_Exam_Details.Vision_Left}
                onChange={(e) => onChangeValue(e)}
                label="Left"
                variant="outlined"
              />
            </FormControl>
          </Box>
        </Box>
        <Box width={"80%"} margin={"auto"}>
          <Typography textAlign={"center"} variant="h5">
            Conjunctiva
          </Typography>
          <Box display={"flex"} justifyContent={"space-between"}>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="Conjuctiva_Status"
                value={Physical_Exam_Details.Conjuctiva_Status}
                onChange={(e) => onChangeValue(e)}
              >
                <FormControlLabel
                  value="Anemia"
                  control={<Radio />}
                  label="Anemia"
                />
                <FormControlLabel
                  value="Jaundice"
                  control={<Radio />}
                  label="Jaundice"
                />
              </RadioGroup>
            </FormControl>
            <Box>
              <TextField
                id="Year"
                sx={{ width: 200 }}
                name="Conjuctiva_Other_Disease"
                value={Physical_Exam_Details.Conjuctiva_Other_Disease}
                onChange={(e) => onChangeValue(e)}
                label="Other Disease"
                variant="outlined"
              />
            </Box>
          </Box>
        </Box>
        <Box width={"80%"} margin={"auto"}>
          <Typography textAlign={"center"} variant="h5">
            Gums
          </Typography>
          <Box display={"flex"} justifyContent={"space-between"}>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="Gums_Status"
                value={Physical_Exam_Details.Gums_Status}
                onChange={(e) => onChangeValue(e)}
              >
                <FormControlLabel
                  value="Bleeding"
                  control={<Radio />}
                  label="Bleeding"
                />
                <FormControlLabel
                  value="Spongy"
                  control={<Radio />}
                  label="Spongy"
                />
              </RadioGroup>
            </FormControl>
            <Box>
              <TextField
                id="Year"
                sx={{ width: 200 }}
                name="Gums_Other_Disease"
                value={Physical_Exam_Details.Gums_Other_Disease}
                onChange={(e) => onChangeValue(e)}
                label="Other Disease"
                variant="outlined"
              />
            </Box>
          </Box>
        </Box>
        <Box width={"80%"} margin={"auto"}>
          <Typography textAlign={"center"} variant="h5">
            Ears
          </Typography>
          <Box display={"flex"} justifyContent={"space-between"}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">SOM</FormLabel>
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
                  checked={Physical_Exam_Details.Ear_Right_SOM}
                  label={"Right"}
                  name={"Ear_Right_SOM"}
                  onChange={(e) => {
                    onChangeCheck(e);
                  }}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  checked={Physical_Exam_Details.Ear_Left_SOM}
                  label={"Left"}
                  name={"Ear_Left_SOM"}
                  onChange={(e) => {
                    onChangeCheck(e);
                  }}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  checked={Physical_Exam_Details.Ear_Both_SOM}
                  label={"Both"}
                  name={"Ear_Both_SOM"}
                  onChange={(e) => {
                    onChangeCheck(e);
                  }}
                />
              </FormGroup>
            </FormControl>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">Wax</FormLabel>
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
                  checked={Physical_Exam_Details.Ear_Right_Wax}
                  label={"Right"}
                  name={"Ear_Right_Wax"}
                  onChange={(e) => {
                    onChangeCheck(e);
                  }}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  checked={Physical_Exam_Details.Ear_Left_Wax}
                  label={"Left"}
                  name={"Ear_Left_Wax"}
                  onChange={(e) => {
                    onChangeCheck(e);
                  }}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  checked={Physical_Exam_Details.Ear_Both_Wax}
                  label={"Both"}
                  name={"Ear_Both_Wax"}
                  onChange={(e) => {
                    onChangeCheck(e);
                  }}
                />
              </FormGroup>
            </FormControl>
          </Box>
          <Box>
            <TextField
              id="Year"
              sx={{ width: 250 }}
              value={Physical_Exam_Details.Ear_Other_Disease}
              name="Ear_Other_Disease"
              onChange={(e) => onChangeValue(e)}
              label="Any Other Ear Disease"
              variant="outlined"
            />
          </Box>
        </Box>
        {/* <Box width={"80%"} margin={"auto"}>
          <Typography textAlign={"center"} variant="h5">
            Ears
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
                  checked={Physical_Exam_Details.Ear_Right_SOM}
                  label={"SOM"}
                  name={"Ear_Right_SOM"}
                  onChange={(e) => {
                    onChangeCheck(e);
                  }}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  checked={Physical_Exam_Details.Ear_Right_Wax}
                  label={"Wax"}
                  name={"Ear_Right_Wax"}
                  onChange={(e) => {
                    onChangeCheck(e);
                  }}
                />
              </FormGroup>
            </FormControl>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Left
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
                  checked={Physical_Exam_Details.Ear_Left_SOM}
                  label={"SOM"}
                  name={"Ear_Left_SOM"}
                  onChange={(e) => {
                    onChangeCheck(e);
                  }}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  checked={Physical_Exam_Details.Ear_Left_Wax}
                  label={"Wax"}
                  name={"Ear_Left_Wax"}
                  onChange={(e) => {
                    onChangeCheck(e);
                  }}
                />
              </FormGroup>
            </FormControl>
          </Box>
          <Box>
            <TextField
              id="Year"
              sx={{ width: 250 }}
              value={Physical_Exam_Details.Ear_Other_Disease}
              name="Ear_Other_Disease"
              onChange={(e) => onChangeValue(e)}
              label="Any Other Ear Disease"
              variant="outlined"
            />
          </Box>
        </Box> */}
        <Box width={"80%"} margin={"auto"}>
          <Typography textAlign={"center"} variant="h5">
            Bones
          </Typography>
          <Box display={"flex"} flexDirection={"column"}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Gross Flat
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
                    checked={Physical_Exam_Details.Bones_Gross_Flat_Feet_Right}
                    label={"Right"}
                    name={"Bones_Gross_Flat_Feet_Right"}
                    onChange={(e) => {
                      onChangeCheck(e);
                    }}
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    checked={Physical_Exam_Details.Bones_Gross_Flat_Feet_Left}
                    label={"Left"}
                    name={"Bones_Gross_Flat_Feet_Left"}
                    onChange={(e) => {
                      onChangeCheck(e);
                    }}
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    checked={Physical_Exam_Details.Bones_Gross_Flat_Feet_Both}
                    label={"Both"}
                    name={"Bones_Gross_Flat_Feet_Both"}
                    onChange={(e) => {
                      onChangeCheck(e);
                    }}
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    checked={Physical_Exam_Details.Bones_Gross_Flat_Feet_B_L}
                    label={"B/L"}
                    name={"Bones_Gross_Flat_Feet_B_L"}
                    onChange={(e) => {
                      onChangeCheck(e);
                    }}
                  />
                </FormGroup>
              </FormControl>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Flat feet
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
                    checked={Physical_Exam_Details.Bones_Flat_Feet_Right}
                    label={"Right"}
                    name={"Bones_Flat_Feet_Right"}
                    onChange={(e) => {
                      onChangeCheck(e);
                    }}
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    checked={Physical_Exam_Details.Bones_Flat_Feet_Left}
                    label={"Left"}
                    name={"Bones_Flat_Feet_Left"}
                    onChange={(e) => {
                      onChangeCheck(e);
                    }}
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    checked={Physical_Exam_Details.Bones_Flat_Feet_Both}
                    label={"Both"}
                    name={"Bones_Flat_Feet_Both"}
                    onChange={(e) => {
                      onChangeCheck(e);
                    }}
                  />
                </FormGroup>
              </FormControl>
            </Box>
            <Box display={"flex"} justifyContent={"space-between"}>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Border Line
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
                    checked={Physical_Exam_Details.Bones_Border_Line_Feet_Right}
                    label={"Right"}
                    name={"Bones_Border_Line_Feet_Right"}
                    onChange={(e) => {
                      onChangeCheck(e);
                    }}
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    checked={Physical_Exam_Details.Bones_Border_Line_Feet_Left}
                    label={"Left"}
                    name={"Bones_Border_Line_Feet_Left"}
                    onChange={(e) => {
                      onChangeCheck(e);
                    }}
                  />
                </FormGroup>
              </FormControl>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Minimal feet
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
                    checked={
                      Physical_Exam_Details.Bones_Minimal_Flat_Feet_Right
                    }
                    label={"Right"}
                    name={"Bones_Minimal_Flat_Feet_Right"}
                    onChange={(e) => {
                      onChangeCheck(e);
                    }}
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    checked={Physical_Exam_Details.Bones_Minimal_Flat_Feet_Left}
                    label={"Left"}
                    name={"Bones_Minimal_Flat_Feet_Left"}
                    onChange={(e) => {
                      onChangeCheck(e);
                    }}
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    checked={Physical_Exam_Details.Bones_Minimal_Flat_Feet_Both}
                    label={"Both"}
                    name={"Bones_Minimal_Flat_Feet_Both"}
                    onChange={(e) => {
                      onChangeCheck(e);
                    }}
                  />
                </FormGroup>
              </FormControl>
            </Box>
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
                  checked={Physical_Exam_Details.Bones_Knee_Knocking}
                  label={"Knee Knocking"}
                  name={"Bones_Knee_Knocking"}
                  onChange={(e) => {
                    onChangeCheck(e);
                  }}
                />
              </FormGroup>
            </FormControl>
          </Box>
          <Box>
            <TextField
              id="Year"
              sx={{ width: 250 }}
              value={Physical_Exam_Details.Bones_Other_Disease}
              name="Bones_Other_Disease"
              onChange={(e) => onChangeValue(e)}
              label="Any Other Bone Disease"
              variant="outlined"
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PhysicalExaminationSection;
