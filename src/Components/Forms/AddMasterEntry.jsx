import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";
import {
  Avatar,
  Box,
  Button,
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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DB } from "../../firebase";
import CircularIndeterminate from "../Animations/Loader";
import { BloodGroups, Occupation } from "../Data/MasterEntry";
import SideBar from "../Sidebar";
import { contextData } from "../../Context/Context";
import { useNavigate } from "react-router-dom";

const AddMasterEntry = () => {
  const patientData = {
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
    Year: "",
    Time:""
  };

  const [GR, setGR] = useState("");
  const [Student_Name, setStudent_Name] = useState("");
  const [Gender, setGender] = useState("");
  const [Name_Parent_Guardian, setName_Parent_Guardian] = useState("");
  const [Occupation_Parent_Guardian, setOccupation_Parent_Guardian] =
    useState("");
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
  const [Blood_Group, setBlood_Group] = useState("");
  const [Residential_Address, setResidential_Address] = useState("");
  const [Residential_Contact_Number, setResidential_Contact_Number] =
    useState("");
  const [Office_Contact_Number, setOffice_Contact_Number] = useState("");
  const [Email_Address, setEmail_Address] = useState("");
  const [Remarks, setRemarks] = useState("");
  const [AdmissionYear, setAdmissionYear] = useState("");
  const [Login, setLogin] = useState(false);
  const { LogedIn } = useContext(contextData);

  let navigate = useNavigate();

  useEffect(() => {
    document.title = "Add Master Entry";
    if (LogedIn != true) {
      // alert("Please provide credentials to LogedIn")
      navigate("/");
    }
  }, []);

  useEffect(() => {
    patientData.GR_Number = GR;
    patientData.Student_Name = Student_Name;
    patientData.Name_of_Parent_Guardian = Name_Parent_Guardian;
    patientData.Occupation_of_Parent_Guardian = Occupation_Parent_Guardian;
    patientData.Blood_Group = Blood_Group;
    patientData.Residential_Address = Residential_Address;
    patientData.Residential_Contact_Number = Residential_Contact_Number;
    patientData.Office_Contact_Number = Office_Contact_Number;
    patientData.Email_Address = Email_Address;
    patientData.Remarks = Remarks;
    patientData.Gender = Gender;
    patientData.Date_of_Admission =
      NewFormat_Date_of_Admission == undefined
        ? ""
        : NewFormat_Date_of_Admission;
    patientData.Date_of_Birth =
      NewFormat_Date_of_Birth == undefined ? "" : NewFormat_Date_of_Birth;
    patientData.Date_of_Leaving_College =
      NewFormat_Date_of_Leaving_College == undefined
        ? ""
        : NewFormat_Date_of_Leaving_College;
    patientData.Year = AdmissionYear;
    patientData.Time = new Date()
  }, [
    GR,
    Student_Name,
    Name_Parent_Guardian,
    Gender,
    Blood_Group,
    Occupation_Parent_Guardian,
    Date_of_Admission,
    Date_of_Birth,
    Date_of_Leaving_College,
    Residential_Address,
    Residential_Contact_Number,
    Office_Contact_Number,
    Email_Address,
    Remarks,
  ]);

  const checkGR = async (GR) => {
    let enterdGR = GR;
    const CollectionReference = collection(DB, "Patients");
    const data = await getDocs(CollectionReference);
    let DB_GRs = data.docs.map((val) => val.data().GR_Number);
    let newArr = DB_GRs.filter((GR) => {
      return GR == enterdGR;
    });
    return newArr;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(patientData)
      // let arr = await checkGR(GR);
      // if (
      //   !GR ||
      //   !Date_of_Birth ||
      //   !Date_of_Admission ||
      //   !Student_Name ||
      //   !Gender
      // ) {
      //   toast.error("Please Fill the required Fields");
      // } else {
      //   if (arr.length != 0) {
      //     toast.warning("This Patient is already regitered!");
      //   } else {
      //     if (Email_Address.length != 0) {
      //       if (Email_Address.includes("@") && Email_Address.includes(".com")) {
      //         setLogin(true);

      //         await setDoc(
      //           doc(DB, `Patients`, patientData.GR_Number),
      //           patientData
      //         );
      //         toast.success("Patient has been successfully registered!");
      //         setTimeout(() => {
      //           setLogin(false);
      //         }, 1000);
      //       } else {
      //         toast.error("Please Provide valid Email Address");
      //       }
      //     } else {
      //       setLogin(true);

      //       await setDoc(
      //         doc(DB, `Patients`, patientData.GR_Number),
      //         patientData
      //       );
      //       toast.success("Patient has been successfully registered!");

      //       setTimeout(() => {
      //         setLogin(false);
      //       }, 1500);
      //     }
      //   }
      // }
    } catch (error) {
      toast.error(error);
    }
  };

  const resetFields = () => {
    setGR("");
    setStudent_Name("");
    setName_Parent_Guardian("");
    setGender("");
    setBlood_Group("");
    setOccupation_Parent_Guardian("");
    setDate_of_Admission();
    setDate_of_Birth();
    setDate_of_Leaving_College();
    setResidential_Address("");
    setResidential_Contact_Number("");
    setOffice_Contact_Number("");
    setEmail_Address("");
    setRemarks("");
  };

  return (
    <>
      <Box display="flex" height={"100vh"} width={"100vw"} overflow={"hidden"}>
        <Box display={"flex"} height={"100vh"} width={"15%"}>
          <SideBar />
        </Box>
          <Box
            height={"100%"}
            width={"85%"}
            overflow={"scroll"}
            bgcolor={"var(--new-purple)"}
            // bgcolor={"#858993"}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100%",
                width: "100%",
              }}
            >
              <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Avatar sx={{ m: 1, bgcolor: "#0303aa" }}>
                  <MedicalServicesOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Enter Student Personal Record
                </Typography>
              </Box>
              <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"space-around"}
                alignItems={"center"}
              >
                <Box
                  component="form"
                  noValidate
                  sx={{ mt: 1, mb: 1 }}
                  display={"flex"}
                  justifyContent={"space-around"}
                  alignItems={"center"}
                  flexWrap={"wrap"}
                >
                  <Box width={"40%"}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      value={GR}
                      onChange={(e) => setGR(e.target.value)}
                      label="GR Number"
                      type="text"
                      sx={{ width: 400 }}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      value={Student_Name}
                      onChange={(e) => setStudent_Name(e.target.value)}
                      name="Student_Name"
                      label="Student Name"
                      type="text"
                      id="Student_Name"
                      sx={{ width: 400 }}
                    />
                    <FormControl>
                      <FormLabel id="demo-row-radio-buttons-group-label">
                        Gender *
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={Gender}
                        onChange={(e) => setGender(e.target.value)}
                        sx={{ width: 400 }}
                      >
                        <FormControlLabel
                          value="female"
                          control={<Radio />}
                          label="Female"
                        />
                        <FormControlLabel
                          value="male"
                          control={<Radio />}
                          label="Male"
                        />
                        <FormControlLabel
                          value="other"
                          control={<Radio />}
                          label="Other"
                        />
                      </RadioGroup>
                    </FormControl>
                    <TextField
                      margin="normal"
                      fullWidth
                      value={Name_Parent_Guardian}
                      onChange={(e) => setName_Parent_Guardian(e.target.value)}
                      name="parent-guardian"
                      label="Name of Parent / Guardian"
                      type="text"
                      id="parent-guardian"
                      sx={{ width: 400 }}
                    />
                    <FormControl sx={{ width: 400 }}>
                      <InputLabel id="demo-multiple-name-label">
                        Occupation of Parent / Guardian
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        value={Occupation_Parent_Guardian}
                        onChange={(e) =>
                          setOccupation_Parent_Guardian(e.target.value)
                        }
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
                          label="Date of Admission *"
                          value={Date_of_Admission}
                          onChange={(newDate) => {
                            setDate_of_Admission(newDate);
                            setNewFormat_Date_of_Admission(
                              `${newDate.$M + 1}/${newDate.$D}/${newDate.$y}`
                            );
                            setAdmissionYear(`${newDate.$y}`);
                          }}
                          format="DD/MM/YYYY"
                          sx={{ width: 400 }}
                        />
                      </DemoContainer>
                      <DemoContainer components={["DatePicker"]} required>
                        <DatePicker
                          margin="normal"
                          label="Date of Birth *"
                          value={Date_of_Birth}
                          onChange={(newDate) => {
                            setDate_of_Birth(newDate);
                            setNewFormat_Date_of_Birth(
                              `${newDate.$M + 1}/${newDate.$D}/${newDate.$y}`
                            );
                          }}
                          format="DD/MM/YYYY"
                          sx={{ width: 400 }}
                        />
                      </DemoContainer>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          margin="normal"
                          label="Date of Leaving College"
                          value={Date_of_Leaving_College}
                          onChange={(newDate) => {
                            setDate_of_Leaving_College(newDate);
                            setNewFormat_Date_of_Leaving_College(
                              `${newDate.$M + 1}/${newDate.$D}/${newDate.$y}`
                            );
                          }}
                          format="DD/MM/YYYY"
                          sx={{ width: 400 }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Box>
                  <Box width={"40%"}>
                    <FormControl sx={{ marginTop: 1, width: 400 }}>
                      <InputLabel id="demo-multiple-name-label">
                        Blood Group
                      </InputLabel>
                      <Select
                        labelId="dem    o-multiple-name-label"
                        id="demo-multiple-name"
                        value={Blood_Group}
                        onChange={(e) => setBlood_Group(e.target.value)}
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
                      fullWidth
                      value={Residential_Address}
                      onChange={(e) => setResidential_Address(e.target.value)}
                      name="ResidentialAddress"
                      label="Residential Address"
                      type="text"
                      id="ResidentialAddress"
                      sx={{ width: 400 }}
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      value={Residential_Contact_Number}
                      onChange={(e) =>
                        setResidential_Contact_Number(e.target.value)
                      }
                      name="ResidentialContactNumber"
                      label="Residential Contact Number"
                      type="text"
                      id="ResidentialContactNumber"
                      sx={{ width: 400 }}
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      value={Office_Contact_Number}
                      onChange={(e) => setOffice_Contact_Number(e.target.value)}
                      name="OfficeContactNumber"
                      label="Office Contact Number"
                      type="text"
                      id="OfficeContactNumber"
                      sx={{ width: 400 }}
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      value={Email_Address}
                      onChange={(e) => setEmail_Address(e.target.value)}
                      name="EmailAddress"
                      label="Email Address"
                      type="text"
                      id="EmailAddress"
                      sx={{ width: 400 }}
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      value={Remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                      name="Remarks"
                      label="Remarks (If Any)"
                      type="text"
                      id="Remarks"
                      sx={{ width: 400 }}
                    />
                  </Box>
                </Box>
                <Stack direction="row" spacing={2} margin={"30px 0"}>
                  <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="success"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    {Login ? (
                      <CircularIndeterminate color={"white"} />
                    ) : (
                      "Save Record"
                    )}
                  </Button>
                  <Button
                    type="reset"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={resetFields}
                  >
                    Reset
                  </Button>
                </Stack>
              </Box>
            </Box>
          </Box>
      </Box>
    </>
  );
};

export default AddMasterEntry;
