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
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DB } from "../../firebase";
import CircularIndeterminate from "../Animations/Loader";
import DiseaseSection from "../Edit_Detail_Section/DiseaseSection";
import EducationSection from "../Edit_Detail_Section/EducationSection";
import PhysicalExaminationSection from "../Edit_Detail_Section/PhysicalExaminationSection_2";
import PhysicalSection from "../Edit_Detail_Section/PhysicalSection";
import SideBar from "../Sidebar";
import SystematicDiseaseSection from "../Edit_Detail_Section/SystematicDiseaseSection";
import VaccineSection from "../Edit_Detail_Section/Vaccines";
import Specific_Graph from "../Graph/Male/Age/Specific_Graph";

const EditDetailEntry = () => {
  useEffect(() => {
    document.title = "Edit Detail Entry"
  }, [])
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
  const [filtered_Year_Data, setfiltered_Year_Data] = useState();
  const [CheckGR, setCheckGR] = useState("");
  const [CheckYear, setCheckYear] = useState("");
  const [jsonError, setJsonError] = useState("");
  const [open, setOpen] = useState(true);
  const [DetailedDate, setDetailedDate] = useState("");
  const [Change, setChange] = useState(false);
  const [Login, setLogin] = useState(false);
  let Report_Data = {};
  const [EducationData, setEducationData] = useState();
  const [PhysicalData, setPhysicalData] = useState();
  const [DiseaseData, setDiseaseData] = useState();
  const [PhysicalExamData, setPhysicalExamData] = useState();
  const [SystematicExamData, setSystematicExamData] = useState();
  const [VaccineData, setVaccineData] = useState();
  const [BMI_Remark, setBMI_Remark] = useState("")

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
    const data = (await getDoc(doc(CollectionReference, CheckGR))).data();
    const all_Report_Years_Data = await getDocs(
      collection(DB, `Patients/${CheckGR}/Report_Years`)
    );
    let Reports_Data = all_Report_Years_Data.docs.map((val) => {
      let GR_Number = data.GR_Number;
      let current_Report_Year = val._document.key.path.segments[8];
      let current_Report_Year_Data = val.data();

      let Obj = { GR_Number, current_Report_Year, ...current_Report_Year_Data };
      return Obj;
    });

    let all_Report_Years = Reports_Data.map((val) => val.Report_Year);
    
    console.log(all_Report_Years)
    if (all_Report_Years.includes(CheckYear)) {
      setJsonError("");
      setPatient(data);
      handleClose();
      let a = Patient;
      let filterYear = Reports_Data.filter(
        (v) => v.Report_Year == CheckYear
      );
      setfiltered_Year_Data(filterYear);
    } else {
      setJsonError("Record not found!");
    }
  };

  const Remarks = (data) => {
    Report_Data && setBMI_Remark(data)
  }

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
    const { Class, Section, Report_Year, Report_Date } = data;
    setEducationData({ Class, Section, Report_Year, Report_Date });
  };

  const PhysicalInfo = (data) => {
    const {
      Cleanliness,
      Height_Foot_Inches,
      Height_Centimeter,
      Weight_Kg,
      Weight_Lb,
      Weight,
      Height,
    } = data;
    setPhysicalData({
      Cleanliness,
      Height_Foot_Inches,
      Height_Centimeter,
      Weight_Kg,
      Weight_Lb,
      Weight,
      Height,
    });
  };

  const DiseaseInfo = (data) => {
    const {
      Heart_Disease,
      Anamoly,
      Blood_Disorder,
      Allergy,
      Diabetes,
      Asthama,
      Epilepsy,
      Epistaxes,
      Other_Disease,
    } = data;
    setDiseaseData({
      Heart_Disease,
      Anamoly,
      Blood_Disorder,
      Allergy,
      Diabetes,
      Asthama,
      Epilepsy,
      Epistaxes,
      Other_Disease,
    });
  };

  const PhysicalExamInfo = (data) => {
    const {
      Class,
      Section,
      Report_Year,
      Report_Date,
      Cleanliness,
      Height_Foot_Inches,
      Height_Centimeter,
      Weight_Kg,
      Weight_Lb,
      Weight,
      Height,
      Heart_Disease,
      Anamoly,
      Blood_Disorder,
      Allergy,
      Diabetes,
      Asthama,
      Epilepsy,
      Epistaxes,
      Other_Disease,
      CNS_Abnormality_Speech_Gait,
      CNS_Other,
      Chest_Congenital_Deformity,
      Chest_Other,
      CVS_Tachycardia,
      CVS_Murmurs,
      CVS_Other,
      Abdomen_Hernia,
      Abdomen_Viscer,
      Abdomen_Other,
      Child_Immunization,
      Child_Missing_Dose,
      Hepatitis_B_Vaccine,
      Hepatitis_Missing_Dose,
      Tetnes_Vaccine,
      Tetnes_Missing_Dose,
      ...selectedPair
    } = data;
    setPhysicalExamData(selectedPair);
  };

  const SystematicExamInfo = (data) => {
    const {
      CNS_Abnormality_Speech_Gait,
      CNS_Other,
      Chest_Congenital_Deformity,
      Chest_Other,
      CVS_Tachycardia,
      CVS_Murmurs,
      CVS_Other,
      Abdomen_Hernia,
      Abdomen_Viscer,
      Abdomen_Other
    } = data;
    setSystematicExamData({
      CNS_Abnormality_Speech_Gait,
      CNS_Other,
      Chest_Congenital_Deformity,
      Chest_Other,
      CVS_Tachycardia,
      CVS_Murmurs,
      CVS_Other,
      Abdomen_Hernia,
      Abdomen_Viscer,
      Abdomen_Other
    });
  };
  const VaccineInfo = (data) => {
    const {
      Child_Immunization,
    Child_Missing_Dose,
    Hepatitis_B_Vaccine,
    Hepatitis_Missing_Dose,
    Tetnes_Vaccine,
    Tetnes_Missing_Dose
    } = data;
    setVaccineData({
      Child_Immunization,
    Child_Missing_Dose,
    Hepatitis_B_Vaccine,
    Hepatitis_Missing_Dose,
    Tetnes_Vaccine,
    Tetnes_Missing_Dose
    });
  };

  Report_Data = {
    ...VaccineData,
    ...SystematicExamData,
    ...PhysicalExamData,
    ...PhysicalData,
    ...DiseaseData,
    ...EducationData,
    GR_Number:CheckGR
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

  // useEffect(() => {
  //   const newAge = EducationData && calculateAge(EducationData.Report_Year)
  //   return newAge
  // }, [EducationData])
  const newAge = EducationData && calculateAge(EducationData.Report_Year)

  const updateDetails = async () => {

    let Age = calculateAge(Report_Data.Report_Year);

    Report_Data = {
      ...VaccineData,
      ...SystematicExamData,
      ...PhysicalExamData,
      ...PhysicalData,
      ...DiseaseData,
      ...EducationData,
      ...Age,
      GR_Number:CheckGR,
      BMI_Remark : BMI_Remark
    };
    console.log("RD", Report_Data)
    try {
      if (Report_Data.Report_Year == CheckYear) {
        setLogin(true);
        await updateDoc(
          doc(
            collection(DB, `Patients/${CheckGR}/Report_Years`),
            Report_Data.Report_Year
          ),
          Report_Data
        );
        console.log(Report_Data)
        toast.success("Data has been updated!");
        setTimeout(() => {
          setLogin(false);
        }, 2500);
      } else if (Report_Data.Report_Year != CheckYear) {
        console.log("Year Edit")
        setLogin(true)
        console.log(Report_Data)
        setDoc(doc(DB, `Patients/${CheckGR}/Report_Years`, Report_Data.Report_Year), Report_Data)
        deleteDoc(doc(DB, `Patients/${CheckGR}/Report_Years`, CheckYear))
        toast.success("Data has been updated!");
        setTimeout(() => {
          setLogin(false);
        }, 2500);
      }
      else {
        toast.warning(
          "Your Report Year Field doesn't match with Reporting Year"
        );
      }
    } catch (error) {
      console.error("Error adding array field:", error);
    }
  };

  return (
    <>
      <Box display="flex" height={"100vh"} width={"100vw"} overflow={"hidden"}>
        <Box display={"flex"} height={"100vh"} width={"15%"}>
          <SideBar />
        </Box>
        <Box
          width={"85%"}
          height={"100"}
          overflow={"scroll"}
          // bgcolor={"#b6e7ff"}
          bgcolor={"var(--new-purple)"}
        >
          <Box>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Edit Detail Record</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please enter GR Number of a student and also his/her relevant
                  Report Year
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
                  label="Report Year"
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
              Edit Details
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
            <EducationSection add={false} edit={true}
              handleMyClick={EducationalInfo}
              data={filtered_Year_Data}
            />
            <PhysicalSection
              handleMyClick={PhysicalInfo}
              data={filtered_Year_Data}
            />
            <DiseaseSection
              handleMyClick={DiseaseInfo}
              data={filtered_Year_Data}
            />
            <PhysicalExaminationSection
              handleMyClick={PhysicalExamInfo}
              data={filtered_Year_Data}
            />
            <SystematicDiseaseSection
              handleMyClick={SystematicExamInfo}
              data={filtered_Year_Data}
            />
            <VaccineSection
              handleMyClick={VaccineInfo}
              data={filtered_Year_Data}
            />
            <Box display={"none"}>
              {
                // console.log("ADEUP",Report_Data && {year: newAge.years,height : Report_Data.Height_Centimeter, Weight:Report_Data.Weight_Kg})
                // (Report_Data) && <Specific_Graph Age={Report_Data.years} Height={Report_Data.Height_Centimeter} Weight={Report_Data.Weight_Kg} forReportRemark={true} sentRemarks={Remarks}/>
                (Report_Data && newAge) && <Specific_Graph Age={newAge.years} Height={Report_Data.Height_Centimeter} Weight={Report_Data.Weight_Kg} forReportRemark={true} sentRemarks={Remarks}/>
                // filtered_Year_Data && <Specific_Graph Age={filtered_Year_Data[0].years} Height={filtered_Year_Data[0].Height_Centimeter} Weight={filtered_Year_Data[0].Weight_Kg} Report={true} sentRemarks={Remarks}/>
              
              }
              
            </Box>
            <Box sx={{ marginTop: "10px", textAlign: "center" }}>
              <Button variant="contained" onClick={updateDetails} id="theme-btn">
                {Login ? (
                  <CircularIndeterminate color={"white"} />
                ) : (
                  "Update Detail Record"
                )}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default EditDetailEntry;
