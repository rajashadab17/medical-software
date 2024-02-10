import { MedicalServicesOutlined, Search } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import SideBar from "../Sidebar";

import { toast } from "react-toastify";
import { DB } from "../../firebase";
import { BloodGroups, Occupation } from "../Data/MasterEntry";
import { useNavigate } from "react-router-dom";
import { contextData } from "../../Context/Context";
import CircularIndeterminate from "../Animations/Loader";

const CheckEntry = () => {
  const { LogedIn } = useContext(contextData);

  let navigate = useNavigate();

  useEffect(() => {
    document.title = "Edit Master Entry";
    // if (LogedIn != true) {
    //   navigate("/");
    // }
  }, []);

  const defaultTheme = createTheme();

  const defaultValue = {
    GR_Number: "",
    Student_Name: "",
    Gender: "",
    Name_of_Parent_Guardian: "",
    Occupation_of_Parent_Guardian: "",
    Date_of_Admission: "",
    Date_of_Birth: "",
    Date_of_Leaving_College: "",
    Blood_Group: "",
    Residential_Address: "",
    Residential_Contact_Number: "",
    Office_Contact_Number: "",
    Email_Address: "",
    Remarks: "",
  };

  const [Patient, setPatient] = useState(defaultValue);
  const [CheckGR, setCheckGR] = useState("");
  const [CheckYear, setCheckYear] = useState("");
  const [jsonError, setJsonError] = useState("");
  const [open, setOpen] = useState(true);
  const [Date_of_Admission, setDate_of_Admission] = useState();
  const [Date_of_Birth, setDate_of_Birth] = useState();
  const [Date_of_Leaving_College, setDate_of_Leaving_College] = useState();
  const [Login, setLogin] = useState(false);
  const [NewFormat_Date_of_Admission, setNewFormat_Date_of_Admission] =
    useState();
  const [NewFormat_Date_of_Birth, setNewFormat_Date_of_Birth] = useState();
  const [
    NewFormat_Date_of_Leaving_College,
    setNewFormat_Date_of_Leaving_College,
  ] = useState();
  const [AdmissionYear, setAdmissionYear] = useState("");
  const [Change1, setChange1] = useState(false);
  const [Change2, setChange2] = useState(false);
  const [Change3, setChange3] = useState(false);

  const loadPatientDetails = async () => {
    const CollectionReference = collection(DB, "Patients");
    const data = await getDocs(CollectionReference);
    let all_GR_Array = data.docs.map(
      (val) => val._document.key.path.segments[6]
    );
    // const CollectionReference = collection(DB, "Patients");
    // const data = await getDocs(CollectionReference);
    // let arr = data.docs.map((value, index) => {
    //   let allGr = value.data().GR_Number;
    //   let allYear = value.data().Year;

    //   if (allGr == CheckGR && allYear == CheckYear) {
    //     setPatient(value.data());
    //     return {
    //       status: true,
    //       data: value.data(),
    //     };
    //   }
    // });

    // let newArr = arr.filter((val) => val !== undefined);
    if (all_GR_Array.includes(CheckGR)) {
      let requiredPatientData = data.docs
        .map((val) => val.data())
        .filter((val) => val.GR_Number == CheckGR)[0];
      setJsonError("");
      // console.log(requiredPatientData)
      setPatient(requiredPatientData);
      handleClose();
      return Patient;
    } else {
      setJsonError("Record not found!");
    }
  };

  const onChangeValue = (e) => {
    setPatient({ ...Patient, [e.target.name]: e.target.value });
  };

  const EdithandleSubmit = async (e) => {
    let finalData = {
      ...Patient,
      Date_of_Admission: Change1
        ? NewFormat_Date_of_Admission == undefined
          ? ""
          : NewFormat_Date_of_Admission
        : Patient.Date_of_Admission,
      Date_of_Birth: Change2
        ? NewFormat_Date_of_Birth == undefined
          ? ""
          : NewFormat_Date_of_Birth
        : Patient.Date_of_Birth,
      Date_of_Leaving_College: Change3
        ? NewFormat_Date_of_Leaving_College == undefined
          ? ""
          : NewFormat_Date_of_Leaving_College
        : Patient.Date_of_Leaving_College,
    };
    const CollectionReference = collection(DB, "Patients");
    let crrId;
    const data = await getDocs(CollectionReference);
    let arr = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    let newArr = arr.filter((value) => {
      if (value.GR_Number == Patient.GR_Number) {
        crrId = value.id;
        return value;
      }
    });

    try {
      setLogin(true);
      await updateDoc(doc(DB, "Patients", `${crrId}`), finalData);
      toast.success("Patient's Data has been updated");
      setTimeout(() => {
        setLogin(false);
      }, 1500);
    } catch (error) {}
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box display="flex" height={"100vh"} width={"100vw"} overflow={"hidden"}>
        <Box display={"flex"} height={"100vh"} width={"17%"}>
          <SideBar />
        </Box>
        <Box
          height={"100%"}
          width={"83%"}
          overflow={"scroll"}
          bgcolor={"var(--purple)"}
        >
          <Box>
            <Dialog open={open}>
              <DialogTitle>Edit Master Entry</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please enter GR Number of a student
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="Dialog_GR_Number"
                  label="GR Number"
                  type="text"
                  value={CheckGR}
                  onChange={(e) => setCheckGR(e.target.value)}
                  onKeyUp={(e) =>
                    (e.code == "Enter" || e.code == "NumpadEnter") &&
                    loadPatientDetails()
                  }
                  fullWidth
                  name="Check_GR_Number"
                  variant="standard"
                />
                {/* <TextField
                  autoFocus
                  margin="dense"
                  id="Dialog_GR_Year"
                  label="Year"
                  type="text"
                  value={CheckYear}
                  onChange={(e) => setCheckYear(e.target.value)}
                  onKeyUp={(e) =>
                    (e.code == "Enter" || e.code == "NumpadEnter") &&
                    loadPatientDetails()
                  }
                  fullWidth
                  variant="standard"
                /> */}

                <Typography color={"red"}>{jsonError}</Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}> Cancel </Button>
                <Button onClick={loadPatientDetails}>
                  Find
                  <Search />
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
          <Box
            height={"100vh"}
            width={"100%"}
            overflow={"scroll"}
            // bgcolor={"var(-purple)"}
            // bgcolor={"#33363D"}
          >
            <Box
              // className="master-box"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100%",
                width: "100%",
              }}
              //     sx={{
              // display :"flex",
              // flexDirection :"column",
              // justifyContent :"center",
              // alignItems :"center",
              //     }}
            >
              <Box
                className="master-box"
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Avatar sx={{ m: 1, bgcolor: "#0303aa" }}>
                  <MedicalServicesOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Edit Student Personal Record
                </Typography>
              </Box>
              <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"space-around"}
                alignItems={"center"}
              >
                <Box
                  className="master-form"
                  component="form"
                  noValidate
                  sx={{ mt: 1, mb: 1 }}
                >
                  <Box textAlign={"center"}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      value={Patient.GR_Number}
                      onChange={onChangeValue}
                      sx={{ width: 400 }}
                      name="GR_Number"
                      label="GR Number"
                      type="text"
                      id="GR_Number"
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      value={Patient.Student_Name}
                      onChange={onChangeValue}
                      sx={{ width: 400 }}
                      name="Student_Name"
                      label="Student Name"
                      type="text"
                      id="Student_Name"
                    />
                    <FormControl>
                      <FormLabel
                        id="demo-row-radio-buttons-group-label"
                        sx={{ textAlign: "left" }}
                      >
                        Gender
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={Patient.Gender}
                        onChange={onChangeValue}
                        sx={{ width: 400 }}
                      >
                        <FormControlLabel
                          value="female"
                          name="Gender"
                          control={<Radio />}
                          label="Female"
                        />
                        <FormControlLabel
                          value="male"
                          name="Gender"
                          control={<Radio />}
                          label="Male"
                        />
                        <FormControlLabel
                          value="other"
                          name="Gender"
                          control={<Radio />}
                          label="Other"
                        />
                      </RadioGroup>
                    </FormControl>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      value={Patient.Name_of_Parent_Guardian}
                      onChange={onChangeValue}
                      sx={{ width: 400 }}
                      name="Name_of_Parent_Guardian"
                      label="Name of Parent / Guardian"
                      type="text"
                      id="parent-guardian"
                    />
                    <FormControl sx={{ width: 400 }}>
                      <InputLabel id="demo-multiple-name-label">
                        Occupation of Parent / Guardian
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        value={Patient.Occupation_of_Parent_Guardian}
                        name="Occupation_of_Parent_Guardian"
                        onChange={onChangeValue}
                        sx={{ width: 400 }}
                        input={
                          <OutlinedInput label="Occupation of Parent / Guardian" />
                        }
                      >
                        {Occupation.map((name) => (
                          <MenuItem key={name} value={name}>
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer
                        components={["DatePicker"]}
                        sx={{ width: "400px", margin: "auto" }}
                      >
                        <DatePicker
                          margin="normal"
                          label="Date of Admission"
                          name="Date_of_Admission"
                          value={dayjs(Patient.Date_of_Admission)}
                          onChange={(newDate) => {
                            setDate_of_Admission(newDate);
                            setChange1(true);
                            setNewFormat_Date_of_Admission(
                              `${newDate.$M + 1}/${newDate.$D}/${newDate.$y}`
                            );
                            setAdmissionYear(`${newDate.$y}`);
                          }}
                          format="DD/MM/YYYY"
                          sx={{ width: 400 }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer
                        components={["DatePicker"]}
                        sx={{ width: "400px", margin: "auto" }}
                      >
                        <DatePicker
                          margin="normal"
                          label="Date of Birth"
                          value={dayjs(Patient.Date_of_Birth)}
                          onChange={(newDate) => {
                            setDate_of_Birth(newDate);
                            setChange2(true);
                            setNewFormat_Date_of_Birth(
                              `${newDate.$M + 1}/${newDate.$D}/${newDate.$y}`
                            );
                          }}
                          format="DD/MM/YYYY"
                          sx={{ width: 400 }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Box>
                  <Box textAlign={"center"}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]} sx={{width:"400px", margin:"auto"}}>
                        <DatePicker
                          margin="normal"
                          label="Date of Leaving College"
                          value={dayjs(Patient.Date_of_Leaving_College)}
                          onChange={(newDate) => {
                            setDate_of_Leaving_College(newDate);
                            setChange3(true);
                            setNewFormat_Date_of_Leaving_College(
                              `${newDate.$M + 1}/${newDate.$D}/${newDate.$y}`
                            );
                          }}
                          format="DD/MM/YYYY"
                          sx={{ width: 400 }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                    <FormControl sx={{ marginTop: 1, width: 400 }}>
                      <InputLabel id="demo-multiple-name-label">
                        Blood Group
                      </InputLabel>
                      <Select
                        labelId="dem    o-multiple-name-label"
                        id="demo-multiple-name"
                        value={Patient.Blood_Group}
                        name="Blood_Group"
                        onChange={onChangeValue}
                        sx={{ width: 400 }}
                        input={<OutlinedInput label="Blood Group" />}
                      >
                        {BloodGroups.map((name) => (
                          <MenuItem key={name} value={name}>
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      value={Patient.Residential_Address}
                      name="Residential_Address"
                      onChange={onChangeValue}
                      sx={{ width: 400 }}
                      label="Residential Address"
                      type="text"
                      id="ResidentialAddress"
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      value={Patient.Residential_Contact_Number}
                      name="Residential_Contact_Number"
                      onChange={onChangeValue}
                      sx={{ width: 400 }}
                      label="Residential Contact Number"
                      type="text"
                      id="ResidentialContactNumber"
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      value={Patient.Office_Contact_Number}
                      name="Office_Contact_Number"
                      onChange={onChangeValue}
                      sx={{ width: 400 }}
                      label="Office Contact Number"
                      type="text"
                      id="OfficeContactNumber"
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      value={Patient.Email_Address}
                      name="Email_Address"
                      onChange={onChangeValue}
                      sx={{ width: 400 }}
                      label="Email Address"
                      type="text"
                      id="EmailAddress"
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      value={Patient.Remarks}
                      name="Remarks"
                      onChange={onChangeValue}
                      sx={{ width: 400 }}
                      label="Remarks (If Any)"
                      type="text"
                      id="Remarks"
                    />
                  </Box>
                </Box>
                <Stack direction="row" spacing={2} margin={"30px 0"}>
                  <Button
                    onClick={EdithandleSubmit}
                    id="theme-btn"
                    variant="contained"
                    color="success"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    {Login ? (
                      <CircularIndeterminate color={"white"} />
                    ) : (
                      "Update Record"
                    )}
                  </Button>
                </Stack>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CheckEntry;
