import { Print, Search } from "@mui/icons-material";
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
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useContext, useRef, useState } from "react";
import { DB } from "../../firebase";
import CircularIndeterminate from "../Animations/Loader";
import SideBar from "../Sidebar";
import { useReactToPrint } from "react-to-print";
import { contextData } from "../../Context/Context";
import Page_1 from "../PDF_Pages/Page_1";
import Page_2 from "../PDF_Pages/Page_2";
import Specific_Graph from "../Graph/Male/Age/Specific_Graph";
import Specific_Male_Height from "../Graph/Male/Height/Specific_Male_Height";
import Specific_Male_Weight from "../Graph/Male/Weight/Specific_Male_Weight";
import Specific_Female_Graph from "../Graph/Female/Age/Specific_Female_Graph";
import Specific_Female_Height from "../Graph/Female/Height/Specific_Female_Height";
import Specific_Female_Weight from "../Graph/Female/Weight/Specific_Female_Weight";
import Accordions from "./Accordian";
import { allMasterEntryKeys } from "../Data/MasterEntry";

const Health_Report = () => {
  const { setObj, Obj } = useContext(contextData);
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
  const [filtered_Year_Data, setfiltered_Year_Data] = useState([]);
  const [CheckGR, setCheckGR] = useState("");
  const [CheckYear, setCheckYear] = useState("");
  const [jsonError, setJsonError] = useState("");
  const [ShowPreview, setShowPreview] = useState(false);
  const [open, setOpen] = useState(true);
  const [open2, setOpen2] = useState(true);
  const [DetailedDate, setDetailedDate] = useState("");
  const [Login, setLogin] = useState(false);

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

    if (all_Report_Years.includes(CheckYear)) {
      setJsonError("");
      setPatient(data);
      handleClose();
      let a = Patient;
      let filterYear = Reports_Data.filter((v) => v.Report_Year == CheckYear);
      setfiltered_Year_Data(filterYear);
      setObj({ ...Obj, PatientYear: CheckYear, PatientGR: CheckGR });
      // let b= filtered_Year_Data
      return filtered_Year_Data;
    } else {
      setJsonError("Record not found!");
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClose2 = () => {
    setOpen2(false);
    setShowPreview(false);
  };

  const onChangeValue = (e) => {
    setPatient({
      ...Patient,
      [e.target.name]: e.target.value,
      Detailed_Date: dayjs(DetailedDate),
    });
  };
  console.log(filtered_Year_Data);

  const dialogStyleShowReport = {
    padding: "20px 10px",
    height: "90vh",
    width: "90vw",
    maxWidth: "95vw",
    // padding: "30px",
    borderRadius: "15px",
    // background: "#9494d9",
    // background: "red",
    // background: "var(--purple)",
    background: "#aeaeff",
    // overflow: "hidden",
    // background: "rgba(148, 148, 217)",
    // background: "rgba(255, 255, 255, 0.3)",
    // boxShadow: "5px 5px 10px #9494d9, -5px -5px 10px #9494d9",
  };
  filtered_Year_Data[0];
  const Page1PDF = useRef();
  const generatePDF1 = useReactToPrint({
    content: () => Page1PDF.current,
    documentTitle: `Report_${Patient && Patient.GR_Number}_${
      filtered_Year_Data[0] && filtered_Year_Data[0].Report_Year
    }_Page_1.pdf`,
    onAfterPrint: "PDF Saved",
  });

  const Page2PDF = useRef();
  const generatePDF2 = useReactToPrint({
    content: () => Page2PDF.current,
    documentTitle: `Report_${Patient && Patient.GR_Number}_${
      filtered_Year_Data[0] && filtered_Year_Data[0].Report_Year
    }_Page_2.pdf`,
    onAfterPrint: "PDF Saved",
  });

  return (
    <>
      <Box display="flex" height={"100vh"} width={"100vw"} overflow={"hidden"}>
        <Box display={"flex"} height={"100vh"} width={"17%"}>
          <SideBar />
        </Box>
        <Box
          width={"83%"}
          height={"100%"}
          overflow={"scroll"}
          bgcolor={"var(--purple)"}
          // bgcolor={"#b6e7ff"}
        >
          <Box>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Patient Report</DialogTitle>
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
              {filtered_Year_Data[0] && (
                <>Patient Report for {filtered_Year_Data[0].Report_Year}</>
              )}
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
            {filtered_Year_Data[0] && (
              <Box padding={"15px 35px"}>
                <Typography
                  fontStyle={"italic"}
                  fontWeight={"bold"}
                  textAlign={"right"}
                >
                  Reported on :{" "}
                  {new Date(filtered_Year_Data[0].Report_Date).toDateString()}
                </Typography>
                <Box m={"25px 0"}>
                  <Box>
                    <Typography textAlign={"center"} variant="h5" m={"15px 0"}>
                      Educational Details
                    </Typography>
                  </Box>
                  <Box>
                    <Typography>
                      Class :{" "}
                      {filtered_Year_Data[0].Class
                        ? filtered_Year_Data[0].Class
                        : "N/A"}
                    </Typography>
                    <Typography>
                      Section :{" "}
                      {filtered_Year_Data[0].Section
                        ? filtered_Year_Data[0].Section
                        : "N/A"}
                    </Typography>
                  </Box>
                </Box>
                <Box m={"25px 0"}>
                  <Box>
                    <Typography textAlign={"center"} variant="h5" m={"15px 0"}>
                      Physical and Mesurement Details
                    </Typography>
                  </Box>
                  <Box>
                    <Typography>
                      Cleanliness :{" "}
                      {filtered_Year_Data[0].Cleanliness
                        ? filtered_Year_Data[0].Cleanliness
                        : "N/A"}
                    </Typography>
                    <Typography>
                      Weight : {filtered_Year_Data[0].Weight_Kg} Kg (
                      {filtered_Year_Data[0].Weight_Lb} lbs)
                    </Typography>
                    <Typography>
                      Height : {filtered_Year_Data[0].Height_Centimeter} cm (
                      {filtered_Year_Data[0].Height_Foot_Inches} ft)
                    </Typography>
                  </Box>
                </Box>
                <Box m={"25px 0"}>
                  <Box>
                    <Typography textAlign={"center"} variant="h5" m={"15px 0"}>
                      Disease Details
                    </Typography>
                  </Box>
                  <Box>
                    <Typography>
                      Heart Disease :{" "}
                      {filtered_Year_Data[0].Heart_Disease
                        ? filtered_Year_Data[0].Heart_Disease
                        : "N/A"}
                    </Typography>
                    <Typography>
                      Anamoly :{" "}
                      {filtered_Year_Data[0].Anamoly
                        ? filtered_Year_Data[0].Anamoly
                        : "N/A"}
                    </Typography>
                    <Typography>
                      Blood Disorder :{" "}
                      {filtered_Year_Data[0].Blood_Disorder
                        ? filtered_Year_Data[0].Blood_Disorder
                        : "N/A"}
                    </Typography>
                    <Typography>
                      Allergy :{" "}
                      {filtered_Year_Data[0].Allergy
                        ? filtered_Year_Data[0].Allergy
                        : "N/A"}
                    </Typography>
                  </Box>
                </Box>
                <Box m={"25px 0"}>
                  {" "}
                  <Box>
                    <Typography textAlign={"center"} variant="h6">
                      Other Common Details
                    </Typography>
                  </Box>
                  <Box>
                    <Typography>
                      Diabetes :{" "}
                      {filtered_Year_Data[0].Diabetes
                        ? "Diagnosis"
                        : "Normal Findings"}
                    </Typography>
                    <Typography>
                      Asthama :{" "}
                      {filtered_Year_Data[0].Asthama
                        ? "Diagnosis"
                        : "Normal Findings"}
                    </Typography>
                    <Typography>
                      Epilepsy :{" "}
                      {filtered_Year_Data[0].Epilepsy
                        ? "Diagnosis"
                        : "Normal Findings"}
                    </Typography>
                    <Typography>
                      Epistaxes :{" "}
                      {filtered_Year_Data[0].Epistaxes
                        ? "Diagnosis"
                        : "Normal Findings"}
                    </Typography>
                    <Typography>
                      Other Disease :{" "}
                      {filtered_Year_Data[0].Other_Disease
                        ? "Diagnosis"
                        : "Normal Findings"}
                    </Typography>
                  </Box>
                </Box>
                {/* ----Physical Exam Details------ */}
                <Box m={"25px 0"}>
                  <Box>
                    <Typography textAlign={"center"} variant="h5" m={"15px 0"}>
                      Physical Examination Details
                    </Typography>
                  </Box>
                  <Box>
                    <Typography>
                      Hair :{" "}
                      {filtered_Year_Data[0].Hair
                        ? filtered_Year_Data[0].Hair
                        : "N/A"}
                    </Typography>
                    <Typography>
                      Teeth :{" "}
                      {filtered_Year_Data[0].Teeth
                        ? filtered_Year_Data[0].Teeth
                        : "N/A"}
                    </Typography>
                    <Typography>
                      Tongue :{" "}
                      {filtered_Year_Data[0].Tongue
                        ? filtered_Year_Data[0].Tongue
                        : "N/A"}
                    </Typography>
                    <Typography>
                      Nails :{" "}
                      {filtered_Year_Data[0].Nails
                        ? filtered_Year_Data[0].Nails
                        : "N/A"}
                    </Typography>
                    <Typography>
                      Skin :{" "}
                      {filtered_Year_Data[0].Skin
                        ? filtered_Year_Data[0].Skin
                        : "N/A"}
                    </Typography>
                  </Box>
                </Box>
                <Box m={"25px 0"}>
                  <Box>
                    <Typography textAlign={"center"} variant="h6">
                      Nose
                    </Typography>
                  </Box>
                  <Box>
                    <Box className="space-between">
                      <Typography>
                        Nasal Septum Deviation Right :{" "}
                        {filtered_Year_Data[0].Nasal_Septum_Deviation_Right
                          ? "Diagnosis"
                          : "N/A"}
                        <br />
                        Nasal Septum Deviation Left :{" "}
                        {filtered_Year_Data[0].Nasal_Septum_Deviation_Left
                          ? "Diagnosis"
                          : "N/A"}
                        <br />
                        Nasal Septum Deviation DNS :{" "}
                        {filtered_Year_Data[0].Nasal_Septum_Deviation_DNS
                          ? "Diagnosis"
                          : "N/A"}
                        <br />
                      </Typography>
                      <Typography>
                        Turbinate Hypertrophy Right Nostril :{" "}
                        {filtered_Year_Data[0]
                          .Turbinate_Hypertrophy_Right_Nostril
                          ? "Diagnosis"
                          : "N/A"}
                        <br />
                        Turbinate Hypertrophy Left Nostril :{" "}
                        {filtered_Year_Data[0]
                          .Turbinate_Hypertrophy_Left_Nostril
                          ? "Diagnosis"
                          : "N/A"}
                        <br />
                        Turbinate Hypertrophy T/HYP :{" "}
                        {filtered_Year_Data[0].Turbinate_Hypertrophy_T_HYP
                          ? "Diagnosis"
                          : "N/A"}
                        <br />
                      </Typography>
                    </Box>
                    <Typography>
                      Other :{" "}
                      {filtered_Year_Data[0].Nose_Other_Disease
                        ? filtered_Year_Data[0].Nose_Other_Disease
                        : "N/A "}
                    </Typography>
                  </Box>
                </Box>
                <Box m={"25px 0"}>
                  <Box>
                    <Typography textAlign={"center"} variant="h6">
                      Tonsil
                    </Typography>
                  </Box>
                  <Box>
                    <Box className="space-between">
                      <Typography>
                        Tonsil Status :{" "}
                        {filtered_Year_Data[0].Tonsil_Status
                          ? filtered_Year_Data[0].Tonsil_Status
                          : "N/A "}
                      </Typography>
                      <Typography>
                        Tonsil Enlargement Right :{" "}
                        {filtered_Year_Data[0].Tonsil_Enlargement_Right
                          ? "Diagnosis"
                          : "N/A"}{" "}
                        <br />
                        Tonsil Enlargement Left :{" "}
                        {filtered_Year_Data[0].Tonsil_Enlargement_Left
                          ? "Diagnosis"
                          : "N/A"}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box m={"25px 0"}>
                  <Box>
                    <Typography textAlign={"center"} variant="h6">
                      Eyes
                    </Typography>
                  </Box>
                  <Box>
                    <Box className="space-between">
                      <Typography>
                        Eye Left Squint :{" "}
                        {filtered_Year_Data[0].Eye_Left_Squint
                          ? "Diagnosis"
                          : "N/A"}{" "}
                        <br />
                        Eye Left Opacity :{" "}
                        {filtered_Year_Data[0].Eye_Left_Opacity
                          ? "Diagnosis"
                          : "N/A"}{" "}
                        <br />
                        Eye Left Ref Error :{" "}
                        {filtered_Year_Data[0].Eye_Left_Ref_Error
                          ? "Diagnosis"
                          : "N/A"}{" "}
                        <br />
                        <br />
                      </Typography>
                      <Typography>
                        Eye Right Squint :{" "}
                        {filtered_Year_Data[0].Eye_Right_Squint
                          ? "Diagnosis"
                          : "N/A"}{" "}
                        <br />
                        Eye Right Opacity :{" "}
                        {filtered_Year_Data[0].Eye_Right_Opacity
                          ? "Diagnosis"
                          : "N/A"}{" "}
                        <br />
                        Eye Right Ref Error :{" "}
                        {filtered_Year_Data[0].Eye_Right_Ref_Error
                          ? "Diagnosis"
                          : "N/A"}{" "}
                        <br />
                        <br />
                      </Typography>
                    </Box>
                    <Typography>
                      Eye Both Squint :{" "}
                      {filtered_Year_Data[0].Eye_Both_Squint
                        ? "Diagnosis"
                        : "N/A"}{" "}
                      <br />
                      Eye Both Opacity :{" "}
                      {filtered_Year_Data[0].Eye_Both_Opacity
                        ? "Diagnosis"
                        : "N/A"}{" "}
                      <br />
                      Eye Both Ref Error :{" "}
                      {filtered_Year_Data[0].Eye_Both_Ref_Error
                        ? "Diagnosis"
                        : "N/A"}{" "}
                      <br />
                      <br />
                    </Typography>
                    <Typography>
                      Other :{" "}
                      {filtered_Year_Data[0].Eye_Other_Disease
                        ? filtered_Year_Data[0].Eye_Other_Disease
                        : "N/A "}
                    </Typography>
                  </Box>
                </Box>
                <Box m={"25px 0"}>
                  <Box>
                    <Typography textAlign={"center"} variant="h6">
                      Vision
                    </Typography>
                  </Box>
                  <Box>
                    <Box className="space-between">
                      <Typography>
                        Vision Right :{" "}
                        {filtered_Year_Data[0].Vision_Right
                          ? filtered_Year_Data[0].Vision_Right
                          : "N/A "}
                      </Typography>
                      <Typography>
                        Vision Left :{" "}
                        {filtered_Year_Data[0].Vision_Left
                          ? filtered_Year_Data[0].Vision_Left
                          : "N/A "}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box m={"25px 0"}>
                  <Box>
                    <Typography textAlign={"center"} variant="h6">
                      Conjuctiva
                    </Typography>
                  </Box>
                  <Box>
                    <Box className="space-between">
                      <Typography>
                        Conjuctiva Status :{" "}
                        {filtered_Year_Data[0].Conjuctiva_Status
                          ? filtered_Year_Data[0].Conjuctiva_Status
                          : "N/A "}
                      </Typography>
                      <Typography>
                        Other :{" "}
                        {filtered_Year_Data[0].Conjuctiva_Other_Disease
                          ? filtered_Year_Data[0].Conjuctiva_Other_Disease
                          : "N/A "}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box m={"25px 0"}>
                  <Box>
                    <Typography textAlign={"center"} variant="h6">
                      Gums
                    </Typography>
                  </Box>
                  <Box>
                    <Box className="space-between">
                      <Typography>
                        Gums Status :{" "}
                        {filtered_Year_Data[0].Gums_Status
                          ? filtered_Year_Data[0].Gums_Status
                          : "N/A "}
                      </Typography>
                      <Typography>
                        Other :{" "}
                        {filtered_Year_Data[0].Gums_Other_Disease
                          ? filtered_Year_Data[0].Gums_Other_Disease
                          : "N/A "}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box m={"25px 0"}>
                  <Box>
                    <Typography textAlign={"center"} variant="h6">
                      Ears
                    </Typography>
                  </Box>
                  <Box>
                    <Box className="space-between">
                      <Typography>
                        Ear Left SOM :{" "}
                        {filtered_Year_Data[0].Ear_Left_SOM
                          ? "Diagnosis"
                          : "N/A"}{" "}
                        <br />
                        Ear Left Wax :{" "}
                        {filtered_Year_Data[0].Ear_Left_Wax
                          ? "Diagnosis"
                          : "N/A"}{" "}
                        <br />
                      </Typography>
                      <Typography>
                        Ear Right SOM :{" "}
                        {filtered_Year_Data[0].Ear_Right_SOM
                          ? "Diagnosis"
                          : "N/A"}{" "}
                        <br />
                        Ear Right Wax :{" "}
                        {filtered_Year_Data[0].Ear_Right_Wax
                          ? "Diagnosis"
                          : "N/A"}{" "}
                        <br />
                        <br />
                      </Typography>
                    </Box>
                    <Typography>
                      Ear Both SOM :{" "}
                      {filtered_Year_Data[0].Ear_Both_SOM ? "Diagnosis" : "N/A"}{" "}
                      <br />
                      Ear Both Wax :{" "}
                      {filtered_Year_Data[0].Ear_Both_Wax
                        ? "Diagnosis"
                        : "N/A"}{" "}
                      <br />
                      <br />
                    </Typography>
                    <Typography>
                      Other :{" "}
                      {filtered_Year_Data[0].Ear_Other_Disease
                        ? filtered_Year_Data[0].Ear_Other_Disease
                        : "N/A "}
                    </Typography>
                  </Box>
                </Box>{" "}
                <Box m={"25px 0"}>
                  <Box>
                    <Typography textAlign={"center"} variant="h6">
                      Bones
                    </Typography>
                  </Box>
                  <Box>
                    <Box className="col">
                      <Box className="space-between">
                        <Typography>
                          Bones Flat Feet Right :{" "}
                          {filtered_Year_Data[0].Bones_Flat_Feet_Right
                            ? "Diagnosis"
                            : "N/A"}{" "}
                          <br />
                          Bones Flat Feet Left :{" "}
                          {filtered_Year_Data[0].Bones_Flat_Feet_Left
                            ? "Diagnosis"
                            : "N/A"}{" "}
                          <br />
                          Bones Flat Feet Both :{" "}
                          {filtered_Year_Data[0].Bones_Flat_Feet_Both
                            ? "Diagnosis"
                            : "N/A"}{" "}
                          <br />
                          <br />
                        </Typography>
                        <Typography>
                          Bones Minimal Flat Right :{" "}
                          {filtered_Year_Data[0].Bones_Minimal_Flat_Feet_Right
                            ? "Diagnosis"
                            : "N/A"}{" "}
                          <br />
                          Bones Minimal Flat Left :{" "}
                          {filtered_Year_Data[0].Bones_Minimal_Flat_Feet_Left
                            ? "Diagnosis"
                            : "N/A"}{" "}
                          <br />
                          Bones Minimal Flat Both :{" "}
                          {filtered_Year_Data[0].Bones_Minimal_Flat_Feet_Both
                            ? "Diagnosis"
                            : "N/A"}{" "}
                          <br />
                          <br />
                        </Typography>
                      </Box>
                      <Box className="space-between">
                        <Typography>
                          Bones Gross Flat Right :{" "}
                          {filtered_Year_Data[0].Bones_Gross_Flat_Feet_Right
                            ? "Diagnosis"
                            : "N/A"}{" "}
                          <br />
                          Bones Gross Flat Left :{" "}
                          {filtered_Year_Data[0].Bones_Gross_Flat_Feet_Left
                            ? "Diagnosis"
                            : "N/A"}{" "}
                          <br />
                          Bones Gross Flat Both :{" "}
                          {filtered_Year_Data[0].Bones_Gross_Flat_Feet_Both
                            ? "Diagnosis"
                            : "N/A"}{" "}
                          <br />
                          Bones Gross Flat B/L :{" "}
                          {filtered_Year_Data[0].Bones_Gross_Flat_Feet_B_L
                            ? "Diagnosis"
                            : "N/A"}{" "}
                          <br />
                          <br />
                        </Typography>
                        <Typography>
                          Bones Borderline Right :{" "}
                          {filtered_Year_Data[0].Bones_Border_Line_Feet_Right
                            ? "Diagnosis"
                            : "N/A"}{" "}
                          <br />
                          Bones Borderline Left :{" "}
                          {filtered_Year_Data[0].Bones_Border_Line_Feet_Left
                            ? "Diagnosis"
                            : "N/A"}{" "}
                          <br />
                          <br />
                        </Typography>
                      </Box>
                      <Typography>
                        Bones Knee Knocking :{" "}
                        {filtered_Year_Data[0].Bones_Knee_Knocking
                          ? "Diagnosis"
                          : "N/A"}{" "}
                        <br />
                      </Typography>
                    </Box>
                    <Typography>
                      Other :{" "}
                      {filtered_Year_Data[0].Bones_Other_Disease
                        ? filtered_Year_Data[0].Bones_Other_Disease
                        : "N/A "}
                    </Typography>
                  </Box>
                </Box>
                {/* ----Systematic Exam Details------ */}
                <Typography textAlign={"center"} variant="h5" m={"15px 0"}>
                  Systematic Disease
                </Typography>
                <Box m={"25px 0"}>
                  <Box>
                    <Typography textAlign={"center"} variant="h6">
                      CNS
                    </Typography>
                  </Box>
                  <Box>
                    <Box className="space-between">
                      <Typography>
                        Abnormality Speech Gait :{" "}
                        {filtered_Year_Data[0].CNS_Abnormality_Speech_Gait
                          ? filtered_Year_Data[0].CNS_Abnormality_Speech_Gait
                          : "N/A "}
                      </Typography>
                      <Typography>
                        Other :{" "}
                        {filtered_Year_Data[0].CNS_Other
                          ? filtered_Year_Data[0].CNS_Other
                          : "N/A "}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box m={"25px 0"}>
                  {" "}
                  <Box>
                    <Typography textAlign={"center"} variant="h6">
                      Chest
                    </Typography>
                  </Box>
                  <Box>
                    <Box className="space-between">
                      <Typography>
                        Congenital Deformity :{" "}
                        {filtered_Year_Data[0].Chest_Congenital_Deformity
                          ? "Diagnosis"
                          : "N/A "}
                      </Typography>
                      <Typography>
                        Other :{" "}
                        {filtered_Year_Data[0].Chest_Other
                          ? filtered_Year_Data[0].Chest_Other
                          : "N/A "}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box m={"25px 0"}>
                  {" "}
                  <Box>
                    <Typography textAlign={"center"} variant="h6">
                      CVS
                    </Typography>
                  </Box>
                  <Box>
                    <Box className="space-between">
                      <Typography>
                        Tachycardia :{" "}
                        {filtered_Year_Data[0].CVS_Tachycardia
                          ? "Diagnosis"
                          : "N/A "}
                        <br />
                        Murmurs :{" "}
                        {filtered_Year_Data[0].CVS_Murmurs
                          ? "Diagnosis"
                          : "N/A "}
                      </Typography>
                      <Typography>
                        Other :{" "}
                        {filtered_Year_Data[0].CVS_Other
                          ? filtered_Year_Data[0].CVS_Other
                          : "N/A "}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box m={"25px 0"}>
                  <Box>
                    <Typography textAlign={"center"} variant="h6">
                      Abdomen
                    </Typography>
                  </Box>
                  <Box>
                    <Box className="space-between">
                      <Typography>
                        Hernia :{" "}
                        {filtered_Year_Data[0].Abdomen_Hernia
                          ? "Diagnosis"
                          : "N/A "}
                        <br />
                        Viscer :{" "}
                        {filtered_Year_Data[0].Abdomen_Viscer
                          ? "Diagnosis"
                          : "N/A "}
                      </Typography>
                      <Typography>
                        Other :{" "}
                        {filtered_Year_Data[0].Abdomen_Other
                          ? filtered_Year_Data[0].Abdomen_Other
                          : "N/A "}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                {/* ----Vaccine  Details------ */}
                <Typography textAlign={"center"} variant="h5" m={"15px 0"}>
                  Vaccination and Immunization Record
                </Typography>
                <Box m={"25px 0"}>
                  <Box>
                    <Typography textAlign={"center"} variant="h6">
                      Immunization Record
                    </Typography>
                  </Box>
                  <Box>
                    <Box className="space-between">
                      <Typography>
                        Immunization Status :{" "}
                        {filtered_Year_Data[0].Child_Immunization
                          ? filtered_Year_Data[0].Child_Immunization
                          : "N/A "}
                      </Typography>
                      <Typography>
                        Missing Dose (If Incomplete) :{" "}
                        {filtered_Year_Data[0].Child_Missing_Dose
                          ? filtered_Year_Data[0].Child_Missing_Dose
                          : "N/A "}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box m={"25px 0"}>
                  <Box>
                    <Typography textAlign={"center"} variant="h6">
                      Hepatitis B Vaccine
                    </Typography>
                  </Box>
                  <Box>
                    <Box className="space-between">
                      <Typography>
                        Status :{" "}
                        {filtered_Year_Data[0].Hepatitis_B_Vaccine
                          ? filtered_Year_Data[0].Hepatitis_B_Vaccine
                          : "N/A "}
                      </Typography>
                      <Typography>
                        Missing Dose (If Incomplete) :{" "}
                        {filtered_Year_Data[0].Hepatitis_Missing_Dose
                          ? filtered_Year_Data[0].Hepatitis_Missing_Dose
                          : "N/A "}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box m={"25px 0"}>
                  <Box>
                    <Typography textAlign={"center"} variant="h6">
                      Tetnes Vaccine
                    </Typography>
                  </Box>
                  <Box>
                    <Box className="space-between">
                      <Typography>
                        Status :{" "}
                        {filtered_Year_Data[0].Tetnes_Vaccine
                          ? filtered_Year_Data[0].Tetnes_Vaccine
                          : "N/A "}
                      </Typography>
                      <Typography>
                        Missing Dose (If Incomplete) :{" "}
                        {filtered_Year_Data[0].Tetnes_Missing_Dose
                          ? filtered_Year_Data[0].Tetnes_Missing_Dose
                          : "N/A "}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                {/* <Box m={"25px 0"}>
                  <Typography textAlign={"center"} m={"25px 0"} variant="h5">
                    BMI-Age Growth Chart
                  </Typography>
                  {Patient.Gender == "male" ? (
                    <>
                      <Specific_Graph
                        Report={true}
                        Age={filtered_Year_Data[0].years}
                        Height={filtered_Year_Data[0].Height_Centimeter}
                        Weight={filtered_Year_Data[0].Weight_Kg}
                      />
                    </>
                  ) : (
                    <>
                      <Specific_Female_Graph
                        Report={true}
                        Age={filtered_Year_Data[0].years}
                        Height={filtered_Year_Data[0].Height_Centimeter}
                        Weight={filtered_Year_Data[0].Weight_Kg}
                      />
                    </>
                  )}
                </Box>
                <Box m={"25px 0"}>
                  <Typography textAlign={"center"} m={"25px 0"} variant="h5">
                    Weight-Age Growth Chart
                  </Typography>
                  {Patient.Gender == "male" ? (
                    <>
                      <Specific_Male_Weight
                        Report={true}
                        Age={filtered_Year_Data[0].years}
                        Weight={filtered_Year_Data[0].Weight_Kg}
                      />
                    </>
                  ) : (
                    <>
                      {" "}
                      Report={true}
                      <Specific_Female_Weight
                        Report={true}
                        Age={filtered_Year_Data[0].years}
                        Weight={filtered_Year_Data[0].Weight_Kg}
                      />
                    </>
                  )}
                </Box>
                <Box m={"25px 0"}>
                  <Typography textAlign={"center"} m={"25px 0"} variant="h5">
                    Height-Age Growth Chart
                  </Typography>
                  {Patient.Gender == "male" ? (
                    <>
                      <Specific_Male_Height
                        Report={true}
                        Age={filtered_Year_Data[0].years}
                        Height={filtered_Year_Data[0].Height_Centimeter}
                      />
                    </>
                  ) : (
                    <>
                      <Specific_Female_Height
                        Report={true}
                        Age={filtered_Year_Data[0].years}
                        Height={filtered_Year_Data[0].Height_Centimeter}
                      />
                    </>
                  )}
                </Box> */}
                <Accordions
                  MasterData={Patient}
                  Report_Year_Data={filtered_Year_Data[0]}
                />
              </Box>
            )}
            <Box sx={{ marginTop: "10px", textAlign: "center" }}>
              <Button
                // variant="contained"
                sx={{ color: "white" }}
                id="theme-btn"
                onClick={() => {
                  setShowPreview(true);
                }}
              >
                {Login ? (
                  <CircularIndeterminate color={"white"} />
                ) : (
                  "Generate Report"
                )}
              </Button>
            </Box>
          </Box>
        </Box>
        {ShowPreview && (
          <Dialog
            open={true}
            onClose={handleClose2}
            // className="bg-color"
            PaperProps={{ sx: dialogStyleShowReport }}
          >
            {/* <DialogTitle textAlign={"center"}>Report Preview</DialogTitle> */}
            {/* <DialogContent>
              <Typography variant="h5" marginBottom={"10px"}>
                Patinet Information
              </Typography>
              <DialogContentText display={"flex"} flexDirection={"column"}>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  width={"100%"}
                >
                  <Typography width={"250px"}>
                    Name : {Patient.Student_Name}
                  </Typography>
                  <Typography width={"250px"}>
                    GR Number : {Patient.GR_Number}
                  </Typography>
                </Box>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  width={"100%"}
                >
                  <Typography width={"250px"}>
                    Admission Year : {Patient.Year}
                  </Typography>
                  <Typography width={"250px"}>
                    Father Name: {Patient.Name_of_Parent_Guardian}
                  </Typography>
                </Box>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  width={"100%"}
                >
                  <Typography width={"250px"}>
                    Date of Birth : {Patient.Date_of_Birth}
                  </Typography>
                  <Typography width={"250px"}>
                    Report Year : {filtered_Year_Data[0].current_Report_Year}
                  </Typography>
                </Box>
              </DialogContentText>
            </DialogContent> */}
            <DialogContent
              sx={{
                height: "100%",
                width: "100%",
                bgcolor: "var(--purple)",
                overflow: "scroll",
                display: "grid",
                placeItems: "center",
              }}
            >
              <Box
                boxSizing={"border-box"}
                bgcolor={"white"}
                height={"21cm"}
                width={"29.7cm"}
                ref={Page1PDF}
                display={"flex"}
                justifyContent={"space-around"}
                alignItems={"center"}
                padding={"30px 0px"}
              >
                <Page_1
                  MasterData={Patient}
                  Report_Year_Data={filtered_Year_Data[0]}
                />
              </Box>
              <Button
                margin="45px 0"
                id="theme-btn"
                sx={{ color: "white" }}
                variant="contained"
                onClick={generatePDF1}
              >
                <Print /> &nbsp; Preview
              </Button>
              <Box
                boxSizing={"border-box"}
                bgcolor={"white"}
                height={"21cm"}
                width={"29.7cm"}
                ref={Page2PDF}
                display={"flex"}
                justifyContent={"space-around"}
                alignItems={"center"}
                padding={"30px 0px"}
              >
                <Page_2
                  MasterData={Patient}
                  Report_Year_Data={filtered_Year_Data[0]}
                />
              </Box>
              <Button
                margin="45px 0"
                id="theme-btn"
                sx={{ color: "white" }}
                variant="contained"
                onClick={generatePDF2}
              >
                <Print /> &nbsp; Preview
              </Button>
            </DialogContent>
            {/* <Box bgcolor={"blue"} height={"100vh"}>

            </Box> */}
            <DialogActions>
              <Button
                onClick={handleClose2}
                sx={{
                  // "&:hover": { bgcolor: "rgb(117,117,225)" },
                  "&:hover": { bgcolor: "rgb(82, 82, 253)" },
                  // bgcolor: "rgb(117,117,225,0.8)",
                  bgcolor: "rgb(82, 82, 253,0.8)",
                  // m: 1,
                }}
                variant="contained"
              >
                {" "}
                Close{" "}
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Box>
    </>
  );
};

export default Health_Report;
