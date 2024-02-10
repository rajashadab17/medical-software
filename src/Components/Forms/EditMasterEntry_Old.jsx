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

const CheckEntry = () => {
  const { LogedIn } = useContext(contextData);

  let navigate = useNavigate();

  useEffect(() => {
    document.title = "Edit Master Entry";
    if (LogedIn != true) {
      navigate("/");
    }
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
    let arr = data.docs.map((value, index) => {
      let allGr = value.data().GR_Number;
      let allYear = value.data().Year;

      if (allGr == CheckGR && allYear == CheckYear) {
        setPatient(value.data());
        return {
          status: true,
          data: value.data(),
        };
      }
    });

    let newArr = arr.filter((val) => val !== undefined);
    if (newArr.length != 0) {
      setJsonError("");
      setPatient(newArr[0].data);
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
      await updateDoc(doc(DB, "Patients", `${crrId}`), finalData);
      toast.success("Patient's Data has been updated");
    } catch (error) {}
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box display="flex" height={"100vh"} width={"100vw"} overflow={"hidden"}>
        <Box display={"flex"} height={"100vh"} width={"15%"}>
          <SideBar />
        </Box>
        <Box width={"85%"}>
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
                <TextField
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
                />

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
            height={"85vh"}
            width={"100%"}
            overflow={"scroll"}
            // bgcolor={"#33363D"}
          >
            <ThemeProvider theme={defaultTheme}>
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                  sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: "#0303aa" }}>
                    <MedicalServicesOutlined />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Edit 2 Student Personal Record
                  </Typography>
                  <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      value={Patient.GR_Number}
                      onChange={onChangeValue}
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
                      name="Student_Name"
                      label="Student Name"
                      type="text"
                      id="Student_Name"
                    />
                    <FormControl>
                      <FormLabel id="demo-row-radio-buttons-group-label">
                        Gender
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={Patient.Gender}
                        onChange={onChangeValue}
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
                      name="Name_of_Parent_Guardian"
                      label="Name of Parent / Guardian"
                      type="text"
                      id="parent-guardian"
                    />
                    <FormControl sx={{ width: 500 }}>
                      <InputLabel id="demo-multiple-name-label">
                        Occupation of Parent / Guardian
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        value={Patient.Occupation_of_Parent_Guardian}
                        name="Occupation_of_Parent_Guardian"
                        onChange={onChangeValue}
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
                      <DemoContainer components={["DatePicker"]}>
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
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
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
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
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
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                    <FormControl sx={{ marginTop: 1, width: 500 }}>
                      <InputLabel id="demo-multiple-name-label">
                        Blood Group
                      </InputLabel>
                      <Select
                        labelId="dem    o-multiple-name-label"
                        id="demo-multiple-name"
                        value={Patient.Blood_Group}
                        name="Blood_Group"
                        onChange={onChangeValue}
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
                      label="Remarks (If Any)"
                      type="text"
                      id="Remarks"
                    />
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2, bgcolor: "#0303aa" }}
                      onClick={EdithandleSubmit}
                    >
                      Update Record
                    </Button>
                    <Button
                      type="reset"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2, bgcolor: "#0383aa" }}
                    >
                      Reset
                    </Button>
                  </Box>
                </Box>
              </Container>
            </ThemeProvider>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CheckEntry;
