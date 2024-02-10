import React, { useEffect, useState } from "react";
import {
  Allergies,
  BloodDisorders,
  Hair,
  Nails,
  Skin,
  Teeth,
  Tongue,
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

const PhysicalExaminationSection = ({ handleMyClick }) => {
  const [Diabetes, setDiabetes] = useState();
  const [Asthama, setAsthama] = useState();
  const [Epilepsy, setEpilepsy] = useState();
  const [Epistaxes, setEpistaxes] = useState();
  const [Other, setOther] = useState();
  const [Nasal_Septum_Deviation_Right, setNasal_Septum_Deviation_Right] =
    useState();
  const [Nasal_Septum_Deviation_Left, setNasal_Septum_Deviation_Left] =
    useState();
  const [Nasal_Septum_Deviation_DNS, setNasal_Septum_Deviation_DNS] =
    useState();
  const [
    Turbinate_Hypertrophy_Right_Nostril,
    setTurbinate_Hypertrophy_Right_Nostril,
  ] = useState();
  const [
    Turbinate_Hypertrophy_Left_Nostril,
    setTurbinate_Hypertrophy_Left_Nostril,
  ] = useState();
  const [Turbinate_Hypertrophy_T_HYP, setTurbinate_Hypertrophy_T_HYP] =
    useState();
  const [Tonsil_Status, setTonsil_Status] = useState("");
  const [Tonsil_Enlargement_Right, setTonsil_Enlargement_Right] = useState("");
  const [Tonsil_Enlargement_Left, setTonsil_Enlargement_Left] = useState("");
  const [Eye_Left_Squint, setEye_Left_Squint] = useState("");
  const [Eye_Left_Opacity, setEye_Left_Opacity] = useState("");
  const [Eye_Right_Squint, setEye_Right_Squint] = useState("");
  const [Eye_Right_Opacity, setEye_Right_Opacity] = useState("");
  const [Ear_Right_SOM, setEar_Right_SOM] = useState("");
  const [Ear_Right_Wax, setEar_Right_Wax] = useState("");
  const [Ear_Left_SOM, setEar_Left_SOM] = useState("");
  const [Ear_Left_Wax, setEar_Left_Wax] = useState("");
  const [Vision_Right, setVision_Right] = useState("");
  const [Vision_Left, setVision_Left] = useState("");
  const [Conjuctiva_Status, setConjuctiva_Status] = useState();
  const [Conjuctiva_Other_Disease, setConjuctiva_Other_Disease] = useState("");
  const [Gums_Status, setGums_Status] = useState();
  const [Gums_Other_Disease, setGums_Other_Disease] = useState("");
  const [Bones_Flat_Feet_Right, setBones_Flat_Feet_Right] = useState("");
  const [Bones_Flat_Feet_Left, setBones_Flat_Feet_Left] = useState("");
  const [Bones_Flat_Feet_Both, setBones_Flat_Feet_Both] = useState("");
  const [Bones_Knee_Knocking, setBones_Knee_Knocking] = useState("");
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
    Eye_Left_Squint: false,
    Eye_Left_Opacity: false,
    Eye_Right_Squint: false,
    Eye_Right_Opacity: false,
    Eye_Other_Disease: "",
    Ear_Right_SOM: false,
    Ear_Right_Wax: false,
    Ear_Left_SOM: false,
    Ear_Left_Wax: false,
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
    Bones_Knee_Knocking: false,
    Bones_Other_Disease: "",
  });
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
    console.log(Physical_Exam_Details);
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
          margin={"50px 0"}
          display={" grid"}
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
        <Box>
          <Typography textAlign={"center"} variant="h5">
            Nose
          </Typography>
          <Box display={"flex"} justifyContent={"space-around "}>
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
                  value={Nasal_Septum_Deviation_Right}
                  name={"Nasal_Septum_Deviation_Right"}
                  onChange={(e) => {
                    setNasal_Septum_Deviation_Right(e.target.checked);

                    onChangeCheck(e);
                  }}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label={"Left"}
                  value={Nasal_Septum_Deviation_Left}
                  name={"Nasal_Septum_Deviation_Left"}
                  onChange={(e) => {
                    setNasal_Septum_Deviation_Left(e.target.checked);

                    onChangeCheck(e);
                  }}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label={"DNS"}
                  value={Nasal_Septum_Deviation_DNS}
                  name={"Nasal_Septum_Deviation_DNS"}
                  onChange={(e) => {
                    setNasal_Septum_Deviation_DNS(e.target.checked);

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
                  value={Turbinate_Hypertrophy_Right_Nostril}
                  name={"Turbinate_Hypertrophy_Right_Nostril"}
                  onChange={(e) => {
                    setTurbinate_Hypertrophy_Right_Nostril(e.target.checked);

                    onChangeCheck(e);
                  }}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label={"Left Nostril"}
                  value={Turbinate_Hypertrophy_Left_Nostril}
                  name={"Turbinate_Hypertrophy_Left_Nostril"}
                  onChange={(e) => {
                    setTurbinate_Hypertrophy_Left_Nostril(e.target.checked);

                    onChangeCheck(e);
                  }}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label={"T/HYP"}
                  value={Turbinate_Hypertrophy_T_HYP}
                  name={"Turbinate_Hypertrophy_T_HYP"}
                  onChange={(e) => {
                    setTurbinate_Hypertrophy_T_HYP(e.target.checked);

                    onChangeCheck(e);
                  }}
                />
              </FormGroup>
            </FormControl>
          </Box>
          <Box>
            <TextField
              id="Year"
              sx={{ width: 200 }}
              value={Physical_Exam_Details.Nose_Other_Disease}
              name="Nose_Other_Disease"
              onChange={(e) => onChangeValue(e)}
              label="Other Disease"
              variant="outlined"
            />
          </Box>
        </Box>
        <Box>
          <Typography textAlign={"center"} variant="h5">
            Tonsils
          </Typography>
          <Box display={"flex"} justifyContent={"space-around"}>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="Tonsil_Status"
                value={Physical_Exam_Details.Tonsil_Status}
                onChange={(e) => onChangeValue(e)}
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
                  label={"Enlarge Right"}
                  value={Tonsil_Enlargement_Right}
                  name={"Tonsil_Enlargement_Right"}
                  onChange={(e) => {
                    setTonsil_Enlargement_Right(e.target.checked);

                    onChangeCheck(e);
                  }}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label={"Enlarge Left"}
                  value={Tonsil_Enlargement_Left}
                  name={"Tonsil_Enlargement_Left"}
                  onChange={(e) => {
                    setTonsil_Enlargement_Left(e.target.checked);

                    onChangeCheck(e);
                  }}
                />
              </FormGroup>
            </FormControl>
          </Box>
        </Box>
        <Box>
          <Typography textAlign={"center"} variant="h5">
            Eyes
          </Typography>
          <Box display={"flex"} justifyContent={"space-around"}>
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
                  label={"Squint"}
                  value={Physical_Exam_Details.Eye_Right_Squint}
                  name={"Eye_Right_Squint"}
                  onChange={(e) => {
                    setEye_Right_Squint(e.target.checked);

                    onChangeCheck(e);
                  }}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label={"Opacity"}
                  value={Physical_Exam_Details.Eye_Right_Opacity}
                  name={"Eye_Right_Opacity"}
                  onChange={(e) => {
                    setEye_Right_Opacity(e.target.checked);

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
                  label={"Squint"}
                  value={Physical_Exam_Details.Eye_Left_Squint}
                  name={"Eye_Left_Squint"}
                  onChange={(e) => {
                    setEye_Left_Squint(e.target.checked);

                    onChangeCheck(e);
                  }}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label={"Opacity"}
                  value={Physical_Exam_Details.Eye_Left_Opacity}
                  name={"Eye_Left_Opacity"}
                  onChange={(e) => {
                    setEye_Left_Opacity(e.target.checked);

                    onChangeCheck(e);
                  }}
                />
              </FormGroup>
            </FormControl>
          </Box>
          <Box>
            <TextField
              id="Year"
              sx={{ width: 200 }}
              value={Physical_Exam_Details.Eye_Other_Disease}
              name="Eye_Other_Disease"
              onChange={(e) => onChangeValue(e)}
              label="Any abnormality"
              variant="outlined"
            />
          </Box>
        </Box>
        <Box>
          <Typography textAlign={"center"} variant="h5">
            Vision
          </Typography>
          <Box display={"flex"} justifyContent={"space-around"}>
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
        <Box>
          <Typography textAlign={"center"} variant="h5">
            Conjunctiva
          </Typography>
          <Box display={"flex"} justifyContent={"space-around"}>
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
        <Box>
          <Typography textAlign={"center"} variant="h5">
            Gums
          </Typography>
          <Box display={"flex"} justifyContent={"space-around"}>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="Gums_Status"
                value={Gums_Status}
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
        <Box>
          <Typography textAlign={"center"} variant="h5">
            Ears
          </Typography>
          <Box display={"flex"} justifyContent={"space-around"}>
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
                  label={"SOM"}
                  value={Physical_Exam_Details.Ear_Right_SOM}
                  name={"Ear_Right_SOM"}
                  onChange={(e) => {
                    setEar_Right_SOM(e.target.checked);

                    onChangeCheck(e);
                  }}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label={"Wax"}
                  value={Physical_Exam_Details.Ear_Right_Wax}
                  name={"Ear_Right_Wax"}
                  onChange={(e) => {
                    setEar_Right_Wax(e.target.checked);

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
                  label={"SOM"}
                  value={Physical_Exam_Details.Ear_Left_SOM}
                  name={"Ear_Left_SOM"}
                  onChange={(e) => {
                    setEar_Left_SOM(e.target.checked);

                    onChangeCheck(e);
                  }}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label={"Wax"}
                  value={Physical_Exam_Details.Ear_Left_Wax}
                  name={"Ear_Left_Wax"}
                  onChange={(e) => {
                    setEar_Left_Wax(e.target.checked);

                    onChangeCheck(e);
                  }}
                />
              </FormGroup>
            </FormControl>
          </Box>
          <Box>
            <TextField
              id="Year"
              sx={{ width: 200 }}
              value={Physical_Exam_Details.Ear_Other_Disease}
              name="Ear_Other_Disease"
              onChange={(e) => onChangeValue(e)}
              label="Any abnormality"
              variant="outlined"
            />
          </Box>
        </Box>
        <Box>
          <Typography textAlign={"center"} variant="h5">
            Bones
          </Typography>
          <Box display={"flex"} justifyContent={"space-around"}>
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
                  value={Physical_Exam_Details.Bones_Flat_Feet_Right}
                  name={"Bones_Flat_Feet_Right"}
                  onChange={(e) => {
                    setBones_Flat_Feet_Right(e.target.checked);

                    onChangeCheck(e);
                  }}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  checked={Physical_Exam_Details.Bones_Flat_Feet_Left}
                  label={"Left"}
                  value={Physical_Exam_Details.Bones_Flat_Feet_Left}
                  name={"Bones_Flat_Feet_Left"}
                  onChange={(e) => {
                    setBones_Flat_Feet_Left(e.target.checked);

                    onChangeCheck(e);
                  }}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  checked={Physical_Exam_Details.Bones_Flat_Feet_Both}
                  label={"Both"}
                  value={Physical_Exam_Details.Bones_Flat_Feet_Both}
                  name={"Bones_Flat_Feet_Both"}
                  onChange={(e) => {
                    setBones_Flat_Feet_Both(e.target.checked);

                    onChangeCheck(e);
                  }}
                />
              </FormGroup>
            </FormControl>
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
                  value={Physical_Exam_Details.Bones_Knee_Knocking}
                  name={"Bones_Knee_Knocking"}
                  onChange={(e) => {
                    setBones_Knee_Knocking(e.target.checked);

                    onChangeCheck(e);
                  }}
                />
              </FormGroup>
            </FormControl>
          </Box>
          <Box>
            <TextField
              id="Year"
              sx={{ width: 200 }}
              value={Physical_Exam_Details.Bones_Other_Disease}
              name="Bones_Other_Disease"
              onChange={(e) => onChangeValue(e)}
              label="Any abnormality"
              variant="outlined"
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PhysicalExaminationSection;
