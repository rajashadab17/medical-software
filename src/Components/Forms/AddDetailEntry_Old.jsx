import { Search } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { DB } from "../../firebase";
import DiseaseSection from "../Add_Detail_Section/DiseaseSection";
import EducationSection from "../Add_Detail_Section/EducationSection";
import PhysicalExaminationSection from "../Add_Detail_Section/PhysicalExaminationSection_2";
import PhysicalSection from "../Add_Detail_Section/PhysicalSection";
import CircularIndeterminate from "../Animations/Loader";
import SideBar from "../Sidebar";

const AddDetailEntry = () => {
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
  const [DetailedDate, setDetailedDate] = useState("");
  const [Add_Details, setAdd_Details] = useState(false);
  let Report_Data = {};
  const [EducationData, setEducationData] = useState();
  const [PhysicalData, setPhysicalData] = useState();
  const [DiseaseData, setDiseaseData] = useState();
  const [PhysicalExamData, setPhysicalExamData] = useState();

  const allMasterEntryKeys = [
    "GR Number",
    "Student Name",
    "Gender",
    "Name of Parent Guardian",
    "Occupation of Parent Guardian",
    "Date of Admission",
    "Date of Birth",
    "Date of Leaving College",
    "Blood Group",
    "Residential Address",
    "Residential Contact Number",
    "Office Contact Number",
    "Email Address",
    "Remarks",
  ];

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

  const handleClose = () => {
    setOpen(false);
  };

  const onChangeValue = (e) => {
    setPatient({
      ...Patient,
      [e.target.name]: e.target.value,
      Detailed_Date: dayjs(DetailedDate),
    });
  };

  const EducationalInfo = (data) => {
    setEducationData(data);
  };

  const PhysicalInfo = (data) => {
    setPhysicalData(data);
  };

  const PhysicalExamInfo = (data) => {
    setPhysicalExamData(data);
  };

  const DiseaseInfo = (data) => {
    setDiseaseData(data);
  };

  let age = {
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
  const calculateAge = (Year) => {
    const birthDate = new Date(Patient.Date_of_Birth);
    const currentDate = new Date(
      Year,
      new Date().getMonth(),
      new Date().getDate()
    );

    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();
    let days = currentDate.getDate() - birthDate.getDate();

    // Adjust for negative months or days
    if (days < 0) {
      months--;
      days += new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0
      ).getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Calculate hours, minutes, and seconds starting from the birthdate time
    const diffMilliseconds = currentDate - birthDate;
    const diffSeconds = Math.floor(diffMilliseconds / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);

    const hours = diffHours % 24;
    const minutes = diffMinutes % 60;
    const seconds = diffSeconds % 60;

    age = { years, months, days, hours, minutes, seconds };
    return age;
  };

  const AddDetail = async () => {
    let Age = calculateAge(EducationData.Report_Year);
    console.log(Age);

    Report_Data = {
      ...age,
      ...EducationData,
      ...PhysicalData,
      ...DiseaseData,
      ...PhysicalExamData,
    };

    try {
      console.log("Rd", Report_Data);
      setAdd_Details(true);
      await setDoc(
        doc(
          DB,
          `Patients/${Patient.GR_Number}/Report_Years`,
          `${Report_Data.Report_Year}`
        ),
        Report_Data
      );
      toast.success("Detail record has been saved successfully");
      setAdd_Details(false);
    } catch (error) {
      toast.error("Error", error);
      console.error(error);
    }
  };

  return (
    <>
      <Box
        height={"100vh"}
        width={"100vw"}
        display={"flex"}
        overflow={"hidden"}
      >
        <Box display={"flex"} height={"100vh"} width={"15%"} bgcolor={"red"}>
          <SideBar />
        </Box>
        <Box
          width={"85%"}
          height={"100"}
          overflow={"scroll"}
          bgcolor={"#b6e7ff"}
        >
          <Box>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Add details to Master Entry</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please enter GR Number of a student and also his/her relevant
                  Year of Admission
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="Dialog_GR_Number"
                  label="GR Number"
                  type="text"
                  value={CheckGR}
                  onChange={(e) => {
                    setCheckGR(e.target.value);
                    onChangeValue(e);
                  }}
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
                  onChange={(e) => {
                    setCheckYear(e.target.value);
                    onChangeValue(e);
                  }}
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
          <Box height={"10%"}>
            <Typography variant="h3" fontWeight={"bold"} textAlign={"center"}>
              Add New Details
            </Typography>
          </Box>
          <Box
            height={"6 0%"}
            border={"3px solid black"}
            margin={"0 50px"}
            padding={"40px 50px"}
          >
            <Box
              height={"70%"}
              width={"100%"}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Box
                height={"100%"}
                width={"50%"}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"space-around"}
              >
                <Box width={"80%"} className="y-center space-between">
                  <Typography>{allMasterEntryKeys[0]}</Typography>
                  <Typography width={"30%"}>{Patient.GR_Number}</Typography>
                </Box>
                <Box width={"80%"} className="y-center space-between">
                  <Typography>{allMasterEntryKeys[1]}</Typography>
                  <Typography width={"30%"}>{Patient.Student_Name}</Typography>
                </Box>
                <Box width={"80%"} className="y-center space-between">
                  <Typography>{allMasterEntryKeys[2]}</Typography>
                  <Typography width={"30%"}>{Patient.Gender}</Typography>
                </Box>
                <Box width={"80%"} className="y-center space-between">
                  <Typography>{allMasterEntryKeys[3]}</Typography>
                  <Typography width={"30%"}>
                    {Patient.Name_of_Parent_Guardian}
                  </Typography>
                </Box>
                <Box width={"80%"} className="y-center space-between">
                  <Typography>{allMasterEntryKeys[4]}</Typography>
                  <Typography width={"30%"}>
                    {Patient.Occupation_of_Parent_Guardian}
                  </Typography>
                </Box>
                <Box width={"80%"} className="y-center space-between">
                  <Typography>{allMasterEntryKeys[5]}</Typography>
                  <Typography width={"30%"}>
                    {Patient.Date_of_Admission
                      ? dayjs(Patient.Date_of_Admission).format("DD/MM/YYYY")
                      : ""}
                    {/* {Patient.Date_of_Admission} */}
                  </Typography>
                </Box>
                <Box width={"80%"} className="y-center space-between">
                  <Typography>{allMasterEntryKeys[6]}</Typography>
                  <Typography width={"30%"}>
                    {Patient.Date_of_Birth
                      ? dayjs(Patient.Date_of_Birth).format("DD/MM/YYYY")
                      : ""}
                  </Typography>
                </Box>
              </Box>
              <Box
                height={"100%"}
                width={"50%"}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"space-around"}
              >
                <Box width={"80%"} className="y-center space-between">
                  <Typography>{allMasterEntryKeys[7]}</Typography>
                  <Typography width={"30%"}>
                    {Patient.Date_of_Leaving_College
                      ? dayjs(Patient.Date_of_Leaving_College).format(
                          "DD/MM/YYYY"
                        )
                      : ""}
                  </Typography>
                </Box>
                <Box width={"80%"} className="y-center space-between">
                  <Typography>{allMasterEntryKeys[8]}</Typography>
                  <Typography width={"30%"}>{Patient.Blood_Group}</Typography>
                </Box>
                <Box width={"80%"} className="y-center space-between">
                  <Typography>{allMasterEntryKeys[9]}</Typography>
                  <Typography width={"30%"}>
                    {Patient.Residential_Address}
                  </Typography>
                </Box>
                <Box width={"80%"} className="y-center space-between">
                  <Typography>{allMasterEntryKeys[10]}</Typography>
                  <Typography width={"30%"}>
                    {Patient.Residential_Contact_Number}
                  </Typography>
                </Box>
                <Box width={"80%"} className="y-center space-between">
                  <Typography>{allMasterEntryKeys[11]}</Typography>
                  <Typography width={"30%"}>
                    {Patient.Office_Contact_Number}
                  </Typography>
                </Box>
                <Box width={"80%"} className="y-center space-between">
                  <Typography>{allMasterEntryKeys[12]}</Typography>
                  <Typography width={"30%"}>{Patient.Email_Address}</Typography>
                </Box>
                <Box width={"80%"} className="y-center space-between">
                  <Typography>{allMasterEntryKeys[13]}</Typography>
                  <Typography width={"30%"}>{Patient.Remarks}</Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box padding={"50px"}>
            <EducationSection handleMyClick={EducationalInfo} />
            <PhysicalSection handleMyClick={PhysicalInfo} />
            <DiseaseSection handleMyClick={DiseaseInfo} />
            <PhysicalExaminationSection handleMyClick={PhysicalExamInfo} />
            <Box sx={{ marginTop: "10px", textAlign: "center" }}>
              <Button variant="contained" onClick={AddDetail}>
                {Add_Details ? (
                  <CircularIndeterminate color={"white"} />
                ) : (
                  "Add Details"
                )}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AddDetailEntry;
