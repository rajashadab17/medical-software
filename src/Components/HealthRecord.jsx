import {
  Boy,
  Delete,
  Female,
  Girl,
  Male,
  PersonRemove,
  Print,
  Search,
  Visibility,
} from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
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
  InputBase,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { alpha, styled } from "@mui/material/styles";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import React, { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { contextData } from "../Context/Context";
import { DB } from "../firebase";
import Female_Graph from "./Graph/Female/Age/Female_Graph";
import Specific_Female_Graph from "./Graph/Female/Age/Specific_Female_Graph";
import Female_Height_Graph from "./Graph/Female/Height/Female_Height_Graph";
import Specific_Female_Height from "./Graph/Female/Height/Specific_Female_Height";
import Female_Weight_Graph from "./Graph/Female/Weight/Female_Weight_Graph";
import Specific_Female_Weight from "./Graph/Female/Weight/Specific_Female_Weight";
import Graph from "./Graph/Male/Age/Graph";
import Specific_Graph from "./Graph/Male/Age/Specific_Graph";
import Male_Height_Graph from "./Graph/Male/Height/Male Height Graph";
import Specific_Male_Height from "./Graph/Male/Height/Specific_Male_Height";
import Male_Weight_Graph from "./Graph/Male/Weight/Male Weight Graph";
import Specific_Male_Weight from "./Graph/Male/Weight/Specific_Male_Weight";
import Header from "./Header";
import SideBar from "./Sidebar";
import { Classes, Sections } from "./Data/DetailEntry";
import { allMasterEntryKeys } from "./Data/MasterEntry";
import dayjs from "dayjs";
import Accordions from "./Pages/Accordian";
import { useReactToPrint } from "react-to-print";
import Page_1 from "./PDF_Pages/Page_1";
import Page_2 from "./PDF_Pages/Page_2";
import { TruckDroplet } from "styled-icons/fa-solid";

const HealthRecord = () => {
  const { setObj, Obj } = useContext(contextData);
  const [SearchValue, setSearchValue] = useState("");
  const [AllPatientsData, setAllPatientsData] = useState([]);
  const [Reports_Data, setReports_Data] = useState();
  const [open, setOpen] = useState(true);
  const [open1, setOpen1] = useState(true);
  const [open2, setOpen2] = useState(false);
  const [ShowReports, setShowReports] = useState(false);
  const [ReportYear, setReportYear] = useState("");
  const [PatientInfo, setPatientInfo] = useState({
    GR: "",
    Year: "",
  });
  const [PatientsData, setPatientsData] = useState();
  const [ShowGraph, setShowGraph] = useState(false);
  const [ShowGraphforAllYears, setShowGraphforAllYears] = useState(false);
  const [Age, setAge] = useState("");
  const [Height, setHeight] = useState("");
  const [Weight, setWeight] = useState("");
  const [ShowWeight, setShowWeight] = useState(true);
  const [ShowHeight, setShowHeight] = useState(true);
  const [ShowBMI, setShowBMI] = useState(true);
  const [Gender, setGender] = useState();
  const [Education_Section, setEducation_Section] = useState();
  const [Education_Class, setEducation_Class] = useState();
  const [All_Reports_Data, setAll_Reports_Data] = useState();
  const [Current_Report_Data, setCurrent_Report_Data] = useState();
  const [Loading, setLoading] = useState(false);
  const [male, setmale] = useState(undefined);
  const [female, setfemale] = useState(undefined);
  const [OpenPreview, setOpenPreview] = useState(false);
  const [ShowPreview, setShowPreview] = useState(false);

  useEffect(() => {
    document.title = "Health Record";
  }, []);

  useEffect(() => {
    // console.log("func start")

    AllData();
  }, [SearchValue, Gender, Education_Class, Education_Section]);

  const AllData = async () => {
    setLoading(true);
    let All_Report_Data = [];
    try {
      let response = await getDocs(collection(DB, `Patients`));
      let data = response.docs.map((val) => val.data());
      let all_GR_Array = response.docs.map(
        (val) => val._document.key.path.segments[6]
      );

      for (let i = 0; i < all_GR_Array.length; i++) {
        const all_Report_Years_Data = await getDocs(
          collection(DB, `Patients/${all_GR_Array[i]}/Report_Years`)
        );
        let current_Master_Data = data[i];
        let arr = all_Report_Years_Data.docs.map((val) => val.data());
        let arr2 = [current_Master_Data, arr];
        All_Report_Data.push(arr2);
        // console.log(arr2)
      }

      let arr3 = All_Report_Data.map((value) => {
        let master = value[0];
        let lastReportYear = value[1][value[1].length - 1];
        return (value[1][value[1].length - 1] = {
          ...master,
          ...lastReportYear,
        });
      }).flatMap((val) => val);

      setLoading(false);
      setAll_Reports_Data(arr3);
      console.log("arr3", arr3);
      // setAllPatientsData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const clearFilter = () => {
    setGender("");
    setEducation_Class("");
    setEducation_Section("");
  };

  const filteredPatients =
    All_Reports_Data &&
    All_Reports_Data.filter((value) => {
      // return value.Gender == Gender
      // console.log("fds", value.Gender.toLowerCase().includes(Gender))
      // return (
      // if (true) {
      if (
        (Gender == "" || Gender == undefined) &&
        (Education_Class == "" || Education_Class == undefined) &&
        (Education_Section == "" || Education_Section == undefined)
      ) {
        console.log("Kuch nhi Hai", {
          Gender,
          Education_Class,
          Education_Section,
        });
        return (
          value.GR_Number.includes(SearchValue) ||
          value.Student_Name.toLowerCase().includes(
            SearchValue.toLowerCase()
          ) ||
          value.Name_of_Parent_Guardian.includes(SearchValue) ||
          value.Occupation_of_Parent_Guardian.includes(SearchValue) ||
          value.Year.includes(SearchValue) ||
          (value.Class && value.Class.includes(SearchValue)) ||
          (value.Section && value.Section.includes(SearchValue)) ||
          value.Blood_Group.includes(SearchValue) ||
          (value.BMI_Remark && value.BMI_Remark.includes(SearchValue))
        );
      } else if (Gender && Gender) {
        console.log("Gender Hai", Gender);
        return (
          value.Gender == Gender &&
          (value.GR_Number.includes(SearchValue) ||
            value.Student_Name.toLowerCase().includes(
              SearchValue.toLowerCase()
            ) ||
            value.Name_of_Parent_Guardian.includes(SearchValue) ||
            value.Occupation_of_Parent_Guardian.includes(SearchValue) ||
            (value.Class && value.Class.includes(SearchValue)) ||
            (value.Section && value.Section.includes(SearchValue)) ||
            value.Year.includes(SearchValue) ||
            value.Blood_Group.includes(SearchValue) ||
            (value.BMI_Remark && value.BMI_Remark.includes(SearchValue)))
        );
      } else if (Education_Class && !Education_Section) {
        console.log("Class Hai", Education_Class);
        return (
          value.Class &&
          value.Class == Education_Class &&
          (value.GR_Number.includes(SearchValue) ||
            value.Student_Name.toLowerCase().includes(
              SearchValue.toLowerCase()
            ) ||
            value.Name_of_Parent_Guardian.includes(SearchValue) ||
            value.Occupation_of_Parent_Guardian.includes(SearchValue) ||
            (value.Class && value.Class.includes(SearchValue)) ||
            (value.Section && value.Section.includes(SearchValue)) ||
            value.Year.includes(SearchValue) ||
            value.Blood_Group.includes(SearchValue) ||
            (value.BMI_Remark && value.BMI_Remark.includes(SearchValue)))
        );
      } else if (Education_Section && Education_Class) {
        console.log("section Hai", Education_Section);
        return (
          (Education_Class || Education_Class == "") &&
          value.Section &&
          value.Section == Education_Section &&
          (value.GR_Number.includes(SearchValue) ||
            value.Student_Name.toLowerCase().includes(
              SearchValue.toLowerCase()
            ) ||
            value.Name_of_Parent_Guardian.includes(SearchValue) ||
            value.Occupation_of_Parent_Guardian.includes(SearchValue) ||
            (value.Class && value.Class.includes(SearchValue)) ||
            (value.Section && value.Section.includes(SearchValue)) ||
            value.Year.includes(SearchValue) ||
            value.Blood_Group.includes(SearchValue) ||
            (value.BMI_Remark && value.BMI_Remark.includes(SearchValue)))
        );
      } else {
        console.log("Else Case");
        return (
          value.Gender == Gender &&
          (value.GR_Number.includes(SearchValue) ||
            value.Student_Name.toLowerCase().includes(
              SearchValue.toLowerCase()
            ) ||
            value.Name_of_Parent_Guardian.includes(SearchValue) ||
            value.Occupation_of_Parent_Guardian.includes(SearchValue) ||
            value.Year.includes(SearchValue) ||
            value.Blood_Group.includes(SearchValue) ||
            (value.Class && value.Class.includes(SearchValue)) ||
            (value.Section && value.Section.includes(SearchValue)) ||
            (value.BMI_Remark && value.BMI_Remark.includes(SearchValue)))
        );
      }
    });

  // console.log(filteredPatients)

  const defaultTheme = createTheme();

  const SearchDiv = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),

      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      maxWidth: "15vw",
      [theme.breakpoints.up("sm")]: {
        maxWidth: "20ch",
        "&:focus": {
          maxWidth: "20ch",
        },
      },
    },
  }));

  const Navigation = (GR_Number, Admission_Year) => {
    setObj({ ...Obj, PatientYear: Admission_Year, PatientGR: GR_Number });
    setPatientInfo({ ...PatientInfo, Year: Admission_Year, GR: GR_Number });

    individualData(Admission_Year, GR_Number);
  };
  const individualData = async (a, g) => {
    const querySnapshot = await getDoc(doc(DB, `Patients`, g));
    setPatientsData(querySnapshot.data());
    setOpen(true);
    await fetchReports(g);
    setShowReports(true);
  };

  const fetchReports = async (GR) => {
    try {
      let response = await getDocs(
        collection(DB, `Patients/${GR}/Report_Years`)
      );
      setReports_Data(
        response.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          GR_Number: GR,
        }))
      );
      let a = Reports_Data;
      console.log("Reports_Data", Reports_Data);
      return Reports_Data;
    } catch (error) {
      console.log("Error Fetch Reports", error);
    }
  };
  const dialogStyle = {
    height: "80%",
    width: "100vw",
  };

  const dialogStyleShowReport = {
    padding: "20px 10px",
    height: "90%",
    width: "90%",
    maxWidth: "95%",
    // padding: "30px",
    borderRadius: "15px",
    // background: "#9494d9",
    background: "#aeaeff",
    // background: "rgba(148, 148, 217)",
    // background: "rgba(255, 255, 255, 0.3)",
    // boxShadow: "5px 5px 10px #9494d9, -5px -5px 10px #9494d9",
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleClosePreview = () => {
    setOpenPreview(false);
    setShowPreview(false);
  };

  const Page1PDF = useRef();
  const generatePDF1 = useReactToPrint({
    content: () => Page1PDF.current,
    documentTitle: `Report_${PatientsData && PatientsData.GR_Number}_${
      Current_Report_Data && Current_Report_Data.Report_Year
    }_Page_1.pdf`,
    onAfterPrint: "PDF Saved",
  });

  const Page2PDF = useRef();
  const generatePDF2 = useReactToPrint({
    content: () => Page2PDF.current,
    documentTitle: `Report_${PatientsData && PatientsData.GR_Number}_${
      Current_Report_Data && Current_Report_Data.Report_Year
    }_Page_2.pdf`,
    onAfterPrint: "PDF Saved",
  });

  return (
    <>
      <Box display="flex" height={"100vh"} width={"100vw"}>
        <Box
          display={"flex"}
          height={"100vh"}
          width={"17%"}
          // bgcolor={"red"}
        >
          <SideBar />
        </Box>
        <Box width={"83%"}>
          <Box height={"100%"} width={"100%"} overflow={"hidden"}>
            <ThemeProvider theme={defaultTheme}>
              <Container
                component="main"
                maxWidth="lg"
                className="bg-color"
                sx={{
                  minHeight: "100%",
                  minWidth: "100%",
                  display: "flex",
                  flexWrap: "wrap",
                  flexDirection: "column",
                  justifyContent: "space-around",
                }}
              >
                <CssBaseline />
                <Box
                  className="space-around"
                  alignItems={"end"}
                  height={"95vh"}
                  width={"100%"}
                  // bgcolor={"green"}
                  // justifyContent={"start"}
                >
                  <Box
                    height={"100%"}
                    padding={"30px"}
                    borderRadius={"15px"}
                    className="bg-next-color bg-box-shadow"
                    // boxShadow={"5px 5px 10px #9494d9, -5px -5px 10px #9494d9"}
                    width={"20%"}
                  >
                    <Typography textAlign={"center"} margin={"15px"}>
                      Showing results{" "}
                      {filteredPatients && filteredPatients.length} out of{" "}
                      {filteredPatients && All_Reports_Data.length}
                    </Typography>
                    <Box
                      padding={"15px"}
                      // bgcolor={"rgba(255, 255, 255, 0.3)"}
                      className="bg-next-color"
                      height={"60%"}
                      width={"100%"}
                      borderRadius={"9px"}
                      margin={"18px 0"}
                    >
                      <FormControl size="small" sx={{ margin: "10px 0" }}>
                        <FormLabel id="demo-row-radio-buttons-group-label">
                          Gender
                        </FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          value={Gender}
                          onChange={(e) => setGender(e.target.value)}
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
                        </RadioGroup>
                      </FormControl>
                      <FormControl
                        sx={{ width: 100, margin: "10px 0" }}
                        size="small"
                      >
                        <FormLabel id="demo-row-radio-buttons-group-label">
                          Class
                        </FormLabel>
                        <Select
                          labelId="demo-multiple-name-label"
                          id="demo-multiple-name"
                          name="Class"
                          size="small"
                          value={Education_Class}
                          onChange={(e) => setEducation_Class(e.target.value)}
                          // input={<OutlinedInput label="Class" />}
                        >
                          {Classes.map((classs) => (
                            <MenuItem key={classs} value={classs}>
                              {classs}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <br />
                      <FormControl
                        sx={{ width: 100, margin: "10px 0" }}
                        size="small"
                      >
                        <FormLabel id="demo-row-radio-buttons-group-label">
                          Section
                        </FormLabel>
                        <Select
                          labelId="demo-multiple-name-label"
                          id="demo-multiple-name"
                          name="Section"
                          value={Education_Section}
                          onChange={(e) => setEducation_Section(e.target.value)}
                        >
                          {Sections.map((name) => (
                            <MenuItem key={name} value={name}>
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                    <Button
                      variant="contained"
                      id="theme-btn"
                      // id="yyuu"
                      // sx={{
                      //   // "&:hover": { bgcolor: "rgb(117,117,225)" },
                      //   "&:hover": { bgcolor: "rgb(82, 82, 253)" },
                      //   // bgcolor: "rgb(117,117,225,0.8)",
                      //   bgcolor: "rgb(82, 82, 253,0.8)",
                      //   // m: 1,
                      // }}
                      onClick={clearFilter}
                    >
                      Clear Filter
                    </Button>
                  </Box>
                  {Loading && (
                    <Box
                      // bgcolor={"red"}
                      className="col x-y-center"
                      position={"absolute"}
                      top={"50%"}
                      left={"50%"}
                      sx={{ transform: "translate(-50%, -50%)" }}
                      height={"35%"}
                      width={"40%"}
                      marginLeft="20%"
                    >
                      <CircularProgress size={"2rem"} />
                      {/* <Typography m={"10px 0"}>Loading...</Typography> */}
                    </Box>
                  )}
                  <Box
                    className="col space-around bg-next-color bg-box-shadow"
                    height={"100%"}
                    width={"70%"}
                    padding={"30px"}
                    borderRadius={"15px"}
                    boxSizing={"border-box"}
                    // bgcolor={"rgba(255, 255, 255, 0.3)"}
                    // boxShadow={"5px 5px 10px #9494d9, -5px -5px 10px #9494d9"}
                  >
                    <SearchDiv>
                      <SearchIconWrapper>
                        <Search />
                      </SearchIconWrapper>
                      <StyledInputBase
                        placeholder="Search…"
                        value={SearchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        inputProps={{ "aria-label": "search" }}
                        autoFocus
                      />
                    </SearchDiv>

                    <TableContainer
                      component={Paper}
                      // bgcolor={"blue"}
                      // bgcolor={"rgba(255, 255, 255, 0.3)"}
                      // className="bg-color bg-box-shadow"
                      sx={{
                        height: "75vh",
                        width: "97%",
                        overflowY: "scroll",
                        margin: "auto",
                        background: "transparent",
                        // overflowX:"scroll"
                        // background: "rgba(255, 255, 255, 0.3)",
                        // borderRadius: "9px",
                      }}
                    >
                      <Table
                        className="bg-table"
                        sx={{
                          minWidth: 1010,
                          // height:"auto"
                          // width:"100%",
                          // overflow:"scroll"
                          // background: "rgba(190, 146, 255, 0.3)",
                        }}
                        aria-label="simple table"
                      >
                        {/* <Table sx={{ minWidth: 650,background:"rgba(255, 255, 255, 0.3)"}}  aria-label="simple table"> */}
                        <TableHead>
                          <TableRow>
                            <TableCell>GR Number</TableCell>
                            <TableCell align="center">Student Name</TableCell>
                            <TableCell align="center">Father Name</TableCell>
                            <TableCell align="center">Gender</TableCell>
                            <TableCell align="center">Blood Group</TableCell>
                            <TableCell align="center">Year</TableCell>
                            <TableCell align="center">Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody
                          style={{
                            overflow: "scroll",
                            // display:"grid", placeItems:"center",
                            // width:"100%"
                          }}
                          className="col x-y-center"
                        >
                          {filteredPatients &&
                            filteredPatients.map((row) => (
                              <TableRow
                                key={row.GR_Number}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell component="th" scope="row">
                                  {row.GR_Number}
                                </TableCell>
                                <TableCell align="center">
                                  {row.Student_Name ? row.Student_Name : "N/A"}
                                </TableCell>
                                <TableCell align="center">
                                  {row.Name_of_Parent_Guardian
                                    ? row.Name_of_Parent_Guardian
                                    : "N/A"}
                                </TableCell>
                                <TableCell align="center">
                                  {row.Gender ? (
                                    row.Gender == "male" ? (
                                      <Male
                                      // sx={{bgcolor:"red", borderRadius:"50%"}}
                                      />
                                    ) : (
                                      <Female
                                      // sx={{bgcolor:"pink", borderRadius:"50%"}}
                                      />
                                    )
                                  ) : (
                                    // ? row.Gender == "male"? <Boy/> : <Girl/>
                                    "N/A"
                                  )}
                                </TableCell>
                                <TableCell align="center">
                                  {row.Blood_Group ? row.Blood_Group : "N/A"}
                                </TableCell>
                                <TableCell align="center">
                                  {row.Year ? row.Year : "N/A"}
                                </TableCell>
                                <TableCell align="center">
                                  <>
                                    <Button
                                      // variant="contained"
                                      size="small"
                                      id="theme-btn"
                                      sx={{
                                        bgcolor: "transparent !important",
                                        color: "var(--purple-button)",
                                      }}
                                      // sx={{ margin: "0 3px", bgcolor: "transparent !important" }}
                                      onClick={() => {
                                        Navigation(row.GR_Number, row.Year);
                                      }}
                                    >
                                      <Visibility />
                                      {/* View Reports */}
                                    </Button>
                                    <Button
                                      // variant="outlined"
                                      size="small"
                                      sx={{
                                        bgcolor: "transparent !important",
                                        color: "red",
                                      }}
                                      // sx={{ margin: "0 3px", bgcolor: "red" }}
                                      onClick={async () => {
                                        try {
                                          await deleteDoc(
                                            doc(
                                              collection(DB, `Patients`),
                                              row.GR_Number
                                            )
                                          );
                                          toast.success(
                                            `${row.GR_Number} has been deleted`
                                          );
                                          AllData();
                                        } catch (error) {}
                                      }}
                                    >
                                      <PersonRemove />
                                      {/* Delete Patient */}
                                    </Button>
                                  </>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                </Box>
              </Container>
            </ThemeProvider>
          </Box>
        </Box>
        {/* --------------------------------------------------------------------------  */}
        {ShowReports && (
          <Box>
            <Dialog
              open={open}
              onClose={handleClose}
              // className="bg-color"
              PaperProps={{ sx: dialogStyleShowReport }}
            >
              <DialogTitle textAlign={"center"}>All Year Reports</DialogTitle>
              <DialogContent>
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
                      Name : {PatientsData.Student_Name}
                    </Typography>
                    <Typography width={"250px"}>
                      GR Number : {PatientsData.GR_Number}
                    </Typography>
                  </Box>
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    width={"100%"}
                  >
                    <Typography width={"250px"}>
                      Admission Year : {PatientInfo.Year}
                    </Typography>
                    <Typography width={"250px"}>
                      Father Name: {PatientsData.Name_of_Parent_Guardian}
                    </Typography>
                  </Box>
                  <Typography width={"250px"}>
                    Date of Birth : {PatientsData.Date_of_Birth}
                  </Typography>
                </DialogContentText>

                <TableContainer
                  component={Paper}
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.3)",
                    margin: "20px 0",
                    padding: "30px",
                    borderRadius: "15px",
                    boxShadow: "5px 5px 10px #9494d9, -5px -5px 10px #9494d9",
                  }}
                >
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Age</TableCell>
                        <TableCell align="center">Height (cm)</TableCell>
                        <TableCell align="center">Weight (Kg)</TableCell>
                        <TableCell align="center">Class</TableCell>
                        <TableCell align="center">Years of Report</TableCell>
                        <TableCell align="center">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Reports_Data.map((value) => (
                        <TableRow
                          key={PatientsData.GR_Number}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="center">
                            {value.years ? value.years : "N/A"}
                          </TableCell>
                          <TableCell align="center">
                            {value.Height_Centimeter
                              ? value.Height_Centimeter
                              : "N/A"}
                          </TableCell>
                          <TableCell align="center">
                            {value.Weight_Kg ? value.Weight_Kg : "N/A"}
                          </TableCell>
                          <TableCell align="center">
                            {value.Class ? value.Class : "N/A"}
                          </TableCell>
                          <TableCell align="center">
                            {value.Report_Year ? value.Report_Year : "N/A"}
                          </TableCell>
                          <TableCell align="center">
                            <Button
                              variant="contained"
                              id="theme-btn"
                              // sx={{
                              //   // "&:hover": { bgcolor: "rgb(117,117,225)" },
                              //   "&:hover": { bgcolor: "rgb(82, 82, 253)" },
                              //   // bgcolor: "rgb(117,117,225,0.8)",
                              //   bgcolor: "rgb(82, 82, 253,0.8)",
                              //   m: 1,
                              // }}
                              size="xxl"
                              onClick={() => {
                                setShowGraph(true);
                                setAge(value.years);
                                setReportYear(value.Report_Year);
                                setWeight(value.Weight_Kg);
                                setHeight(value.Height_Centimeter);
                                setCurrent_Report_Data(value);
                                setOpen1(true);
                                setShowBMI(true);
                                setShowGraphforAllYears(false);
                                console.log("crr_Report", Current_Report_Data);
                              }}
                            >
                              <Visibility />
                              {/* Show Graph */}
                            </Button>
                            <Button
                              variant="contained"
                              sx={{
                                "&:hover": { bgcolor: "rgb(183,28,28)" },
                                bgcolor: "rgb(183,28,28,0.8)",
                                // bgcolor: "#b71c1c",
                                m: 1,
                              }}
                              size="xxl"
                              onClick={async () => {
                                try {
                                  await deleteDoc(
                                    doc(
                                      collection(
                                        DB,
                                        `Patients/${value.GR_Number}/Report_Years`
                                      ),
                                      value.Report_Year
                                    )
                                  );
                                  toast.success(
                                    `The Report of Year ${value.Report_Year} has been deleted`
                                  );
                                } catch (error) {
                                  console.log("Delete Report Error", error);
                                }
                              }}
                            >
                              <Delete />
                              {/* Delete Report */}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Button
                  variant="contained"
                  id="theme-btn"
                  // sx={{ margin: "30px 0" }}
                  // sx={{
                  //   // "&:hover": { bgcolor: "rgb(117,117,225)" },
                  //   "&:hover": { bgcolor: "rgb(82, 82, 253)" },
                  //   // bgcolor: "rgb(117,117,225,0.8)",
                  //   bgcolor: "rgb(82, 82, 253,0.8)",
                  //   m: 1,
                  // }}
                  onClick={() => {
                    // setShowGraph(false)
                    setShowGraphforAllYears(true);
                    setOpen2(true);
                  }}
                >
                  Show Graph for All Years
                </Button>
              </DialogContent>

              <DialogActions>
                <Button
                  onClick={handleClose}
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
          </Box>
        )}
        {ShowGraph && (
          <Box>
            <Dialog
              open={open1}
              onClose={handleClose1}
              PaperProps={{ sx: dialogStyleShowReport }}
            >
              <DialogTitle textAlign={"center"}>
                A Yearly Report for {Current_Report_Data.Report_Year}
              </DialogTitle>
              <DialogContent>
                <DialogContentText
                  className="col space-around"
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.3)",
                    margin: "20px 0",
                    padding: "30px",
                    borderRadius: "15px",
                    width: "100%",
                    boxShadow: "5px 5px 10px #9494d9, -5px -5px 10px #9494d9",
                  }}
                >
                  <Typography
                    variant="h5"
                    style={{ zIndex: "5", marginBottom: "10px" }}
                  >
                    Patinet Information
                  </Typography>
                  {/* <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    width={"100%"}
                  >
                    <Typography width={"250px"}>
                      Name : {PatientsData.Student_Name}
                    </Typography>
                    <Typography width={"250px"}>
                      GR Number : {PatientsData.GR_Number}
                    </Typography>
                  </Box>
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    width={"100%"}
                  >
                    <Typography width={"250px"}>
                      Admission Year : {PatientInfo.Year}
                    </Typography>
                    <Typography width={"250px"}>
                      Father Name: {PatientsData.Name_of_Parent_Guardian}
                    </Typography>
                  </Box>
                  <Typography width={"250px"}>
                    Date of Birth : {PatientsData.Date_of_Birth}
                  </Typography> */}
                  <Box
                    className="y-center space-between"
                    // display={"grid"} gridTemplateColumns={"auto auto"}
                    width={"100%"}
                  >
                    <Box>
                      <Box width={"350px"} className="y-center space-between">
                        <Typography>
                          {allMasterEntryKeys[0]} : {PatientsData.GR_Number}
                        </Typography>
                      </Box>
                      <Box width={"350px"} className="y-center space-between">
                        <Typography>
                          {allMasterEntryKeys[1]} : {PatientsData.Student_Name}
                        </Typography>
                      </Box>
                      <Box width={"350px"} className="y-center space-between">
                        <Typography>
                          {allMasterEntryKeys[2]} : {PatientsData.Gender}
                        </Typography>
                      </Box>
                      <Box width={"350px"} className="y-center space-between">
                        <Typography>
                          {allMasterEntryKeys[3]} :{" "}
                          {PatientsData.Name_of_Parent_Guardian}
                        </Typography>
                      </Box>
                      <Box width={"350px"} className="y-center space-between">
                        <Typography>
                          {allMasterEntryKeys[4]} :{" "}
                          {PatientsData.Occupation_of_Parent_Guardian}
                        </Typography>
                      </Box>
                      <Box width={"350px"} className="y-center space-between">
                        <Typography>
                          {allMasterEntryKeys[5]} :{" "}
                          {PatientsData.Date_of_Admission
                            ? dayjs(PatientsData.Date_of_Admission).format(
                                "DD/MM/YYYY"
                              )
                            : ""}
                        </Typography>
                      </Box>
                      <Box width={"350px"} className="y-center space-between">
                        <Typography>
                          {allMasterEntryKeys[6]} :{" "}
                          {PatientsData.Date_of_Birth
                            ? dayjs(PatientsData.Date_of_Birth).format(
                                "DD/MM/YYYY"
                              )
                            : ""}
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Box width={"350px"} className="y-center space-between">
                        <Typography>
                          {allMasterEntryKeys[7]} :{" "}
                          {PatientsData.Date_of_Leaving_College
                            ? dayjs(
                                PatientsData.Date_of_Leaving_College
                              ).format("DD/MM/YYYY")
                            : ""}
                        </Typography>
                      </Box>
                      <Box width={"350px"} className="y-center space-between">
                        <Typography>
                          {allMasterEntryKeys[8]} : {PatientsData.Blood_Group}
                        </Typography>
                      </Box>
                      <Box width={"350px"} className="y-center space-between">
                        <Typography>
                          {allMasterEntryKeys[9]} :{" "}
                          {PatientsData.Residential_Address}
                        </Typography>
                      </Box>
                      <Box width={"350px"} className="y-center space-between">
                        <Typography>
                          {allMasterEntryKeys[10]} :{" "}
                          {PatientsData.Residential_Contact_Number}
                        </Typography>
                      </Box>
                      <Box width={"350px"} className="y-center space-between">
                        <Typography>
                          {allMasterEntryKeys[11]} :{" "}
                          {PatientsData.Office_Contact_Number}
                        </Typography>
                      </Box>
                      <Box width={"350px"} className="y-center space-between">
                        <Typography>
                          {allMasterEntryKeys[12]} :{" "}
                          {PatientsData.Email_Address}
                        </Typography>
                      </Box>
                      <Box width={"350px"} className="y-center space-between">
                        <Typography>
                          {allMasterEntryKeys[13]} : {PatientsData.Remarks}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </DialogContentText>
                <Box padding={"50px"}>
                  {Current_Report_Data && (
                    <Box padding={"15px 35px"}>
                      <Typography
                        fontStyle={"italic"}
                        fontWeight={"bold"}
                        textAlign={"right"}
                      >
                        Reported on :{" "}
                        {new Date(
                          Current_Report_Data.Report_Date
                        ).toDateString()}
                      </Typography>
                      <Box m={"25px 0"}>
                        <Box>
                          <Typography
                            textAlign={"center"}
                            variant="h5"
                            m={"15px 0"}
                          >
                            Educational Details
                          </Typography>
                        </Box>
                        <Box>
                          <Typography>
                            Class :{" "}
                            {Current_Report_Data.Class
                              ? Current_Report_Data.Class
                              : "N/A"}
                          </Typography>
                          <Typography>
                            Section :{" "}
                            {Current_Report_Data.Section
                              ? Current_Report_Data.Section
                              : "N/A"}
                          </Typography>
                        </Box>
                      </Box>
                      <Box m={"25px 0"}>
                        <Box>
                          <Typography
                            textAlign={"center"}
                            variant="h5"
                            m={"15px 0"}
                          >
                            Physical and Mesurement Details
                          </Typography>
                        </Box>
                        <Box>
                          <Typography>
                            Cleanliness :{" "}
                            {Current_Report_Data.Cleanliness
                              ? Current_Report_Data.Cleanliness
                              : "N/A"}
                          </Typography>
                          <Typography>
                            Weight : {Current_Report_Data.Weight_Kg} Kg (
                            {Current_Report_Data.Weight_Lb} lbs)
                          </Typography>
                          <Typography>
                            Height : {Current_Report_Data.Height_Centimeter} cm
                            ({Current_Report_Data.Height_Foot_Inches} ft)
                          </Typography>
                        </Box>
                      </Box>
                      <Box m={"25px 0"}>
                        <Box>
                          <Typography
                            textAlign={"center"}
                            variant="h5"
                            m={"15px 0"}
                          >
                            Disease Details
                          </Typography>
                        </Box>
                        <Box>
                          <Typography>
                            Heart Disease :{" "}
                            {Current_Report_Data.Heart_Disease
                              ? Current_Report_Data.Heart_Disease
                              : "N/A"}
                          </Typography>
                          <Typography>
                            Anamoly :{" "}
                            {Current_Report_Data.Anamoly
                              ? Current_Report_Data.Anamoly
                              : "N/A"}
                          </Typography>
                          <Typography>
                            Blood Disorder :{" "}
                            {Current_Report_Data.Blood_Disorder
                              ? Current_Report_Data.Blood_Disorder
                              : "N/A"}
                          </Typography>
                          <Typography>
                            Allergy :{" "}
                            {Current_Report_Data.Allergy
                              ? Current_Report_Data.Allergy
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
                            {Current_Report_Data.Diabetes
                              ? "Diagnosis"
                              : "Normal Findings"}
                          </Typography>
                          <Typography>
                            Asthama :{" "}
                            {Current_Report_Data.Asthama
                              ? "Diagnosis"
                              : "Normal Findings"}
                          </Typography>
                          <Typography>
                            Epilepsy :{" "}
                            {Current_Report_Data.Epilepsy
                              ? "Diagnosis"
                              : "Normal Findings"}
                          </Typography>
                          <Typography>
                            Epistaxes :{" "}
                            {Current_Report_Data.Epistaxes
                              ? "Diagnosis"
                              : "Normal Findings"}
                          </Typography>
                          <Typography>
                            Other Disease :{" "}
                            {Current_Report_Data.Other_Disease
                              ? "Diagnosis"
                              : "Normal Findings"}
                          </Typography>
                        </Box>
                      </Box>
                      {/* ----Physical Exam Details------ */}
                      <Box m={"25px 0"}>
                        <Box>
                          <Typography
                            textAlign={"center"}
                            variant="h5"
                            m={"15px 0"}
                          >
                            Physical Examination Details
                          </Typography>
                        </Box>
                        <Box>
                          <Typography>
                            Hair :{" "}
                            {Current_Report_Data.Hair
                              ? Current_Report_Data.Hair
                              : "N/A"}
                          </Typography>
                          <Typography>
                            Teeth :{" "}
                            {Current_Report_Data.Teeth
                              ? Current_Report_Data.Teeth
                              : "N/A"}
                          </Typography>
                          <Typography>
                            Tongue :{" "}
                            {Current_Report_Data.Tongue
                              ? Current_Report_Data.Tongue
                              : "N/A"}
                          </Typography>
                          <Typography>
                            Nails :{" "}
                            {Current_Report_Data.Nails
                              ? Current_Report_Data.Nails
                              : "N/A"}
                          </Typography>
                          <Typography>
                            Skin :{" "}
                            {Current_Report_Data.Skin
                              ? Current_Report_Data.Skin
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
                              {Current_Report_Data.Nasal_Septum_Deviation_Right
                                ? "Diagnosis"
                                : "N/A"}
                              <br />
                              Nasal Septum Deviation Left :{" "}
                              {Current_Report_Data.Nasal_Septum_Deviation_Left
                                ? "Diagnosis"
                                : "N/A"}
                              <br />
                              Nasal Septum Deviation DNS :{" "}
                              {Current_Report_Data.Nasal_Septum_Deviation_DNS
                                ? "Diagnosis"
                                : "N/A"}
                              <br />
                            </Typography>
                            <Typography>
                              Turbinate Hypertrophy Right Nostril :{" "}
                              {Current_Report_Data.Turbinate_Hypertrophy_Right_Nostril
                                ? "Diagnosis"
                                : "N/A"}
                              <br />
                              Turbinate Hypertrophy Left Nostril :{" "}
                              {Current_Report_Data.Turbinate_Hypertrophy_Left_Nostril
                                ? "Diagnosis"
                                : "N/A"}
                              <br />
                              Turbinate Hypertrophy T/HYP :{" "}
                              {Current_Report_Data.Turbinate_Hypertrophy_T_HYP
                                ? "Diagnosis"
                                : "N/A"}
                              <br />
                            </Typography>
                          </Box>
                          <Typography>
                            Other :{" "}
                            {Current_Report_Data.Nose_Other_Disease
                              ? Current_Report_Data.Nose_Other_Disease
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
                              {Current_Report_Data.Tonsil_Status
                                ? Current_Report_Data.Tonsil_Status
                                : "N/A "}
                            </Typography>
                            <Typography>
                              Tonsil Enlargement Right :{" "}
                              {Current_Report_Data.Tonsil_Enlargement_Right
                                ? "Diagnosis"
                                : "N/A"}{" "}
                              <br />
                              Tonsil Enlargement Left :{" "}
                              {Current_Report_Data.Tonsil_Enlargement_Left
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
                              {Current_Report_Data.Eye_Left_Squint
                                ? "Diagnosis"
                                : "N/A"}{" "}
                              <br />
                              Eye Left Opacity :{" "}
                              {Current_Report_Data.Eye_Left_Opacity
                                ? "Diagnosis"
                                : "N/A"}{" "}
                              <br />
                              Eye Left Ref Error :{" "}
                              {Current_Report_Data.Eye_Left_Ref_Error
                                ? "Diagnosis"
                                : "N/A"}{" "}
                              <br />
                              <br />
                            </Typography>
                            <Typography>
                              Eye Right Squint :{" "}
                              {Current_Report_Data.Eye_Right_Squint
                                ? "Diagnosis"
                                : "N/A"}{" "}
                              <br />
                              Eye Right Opacity :{" "}
                              {Current_Report_Data.Eye_Right_Opacity
                                ? "Diagnosis"
                                : "N/A"}{" "}
                              <br />
                              Eye Right Ref Error :{" "}
                              {Current_Report_Data.Eye_Right_Ref_Error
                                ? "Diagnosis"
                                : "N/A"}{" "}
                              <br />
                              <br />
                            </Typography>
                          </Box>
                          <Typography>
                            Eye Both Squint :{" "}
                            {Current_Report_Data.Eye_Both_Squint
                              ? "Diagnosis"
                              : "N/A"}{" "}
                            <br />
                            Eye Both Opacity :{" "}
                            {Current_Report_Data.Eye_Both_Opacity
                              ? "Diagnosis"
                              : "N/A"}{" "}
                            <br />
                            Eye Both Ref Error :{" "}
                            {Current_Report_Data.Eye_Both_Ref_Error
                              ? "Diagnosis"
                              : "N/A"}{" "}
                            <br />
                            <br />
                          </Typography>
                          <Typography>
                            Other :{" "}
                            {Current_Report_Data.Eye_Other_Disease
                              ? Current_Report_Data.Eye_Other_Disease
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
                              {Current_Report_Data.Vision_Right
                                ? Current_Report_Data.Vision_Right
                                : "N/A "}
                            </Typography>
                            <Typography>
                              Vision Left :{" "}
                              {Current_Report_Data.Vision_Left
                                ? Current_Report_Data.Vision_Left
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
                              {Current_Report_Data.Conjuctiva_Status
                                ? Current_Report_Data.Conjuctiva_Status
                                : "N/A "}
                            </Typography>
                            <Typography>
                              Other :{" "}
                              {Current_Report_Data.Conjuctiva_Other_Disease
                                ? Current_Report_Data.Conjuctiva_Other_Disease
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
                              {Current_Report_Data.Gums_Status
                                ? Current_Report_Data.Gums_Status
                                : "N/A "}
                            </Typography>
                            <Typography>
                              Other :{" "}
                              {Current_Report_Data.Gums_Other_Disease
                                ? Current_Report_Data.Gums_Other_Disease
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
                              {Current_Report_Data.Ear_Left_SOM
                                ? "Diagnosis"
                                : "N/A"}{" "}
                              <br />
                              Ear Left Wax :{" "}
                              {Current_Report_Data.Ear_Left_Wax
                                ? "Diagnosis"
                                : "N/A"}{" "}
                              <br />
                            </Typography>
                            <Typography>
                              Ear Right SOM :{" "}
                              {Current_Report_Data.Ear_Right_SOM
                                ? "Diagnosis"
                                : "N/A"}{" "}
                              <br />
                              Ear Right Wax :{" "}
                              {Current_Report_Data.Ear_Right_Wax
                                ? "Diagnosis"
                                : "N/A"}{" "}
                              <br />
                              <br />
                            </Typography>
                          </Box>
                          <Typography>
                            Ear Both SOM :{" "}
                            {Current_Report_Data.Ear_Both_SOM
                              ? "Diagnosis"
                              : "N/A"}{" "}
                            <br />
                            Ear Both Wax :{" "}
                            {Current_Report_Data.Ear_Both_Wax
                              ? "Diagnosis"
                              : "N/A"}{" "}
                            <br />
                            <br />
                          </Typography>
                          <Typography>
                            Other :{" "}
                            {Current_Report_Data.Ear_Other_Disease
                              ? Current_Report_Data.Ear_Other_Disease
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
                                {Current_Report_Data.Bones_Flat_Feet_Right
                                  ? "Diagnosis"
                                  : "N/A"}{" "}
                                <br />
                                Bones Flat Feet Left :{" "}
                                {Current_Report_Data.Bones_Flat_Feet_Left
                                  ? "Diagnosis"
                                  : "N/A"}{" "}
                                <br />
                                Bones Flat Feet Both :{" "}
                                {Current_Report_Data.Bones_Flat_Feet_Both
                                  ? "Diagnosis"
                                  : "N/A"}{" "}
                                <br />
                                <br />
                              </Typography>
                              <Typography>
                                Bones Minimal Flat Right :{" "}
                                {Current_Report_Data.Bones_Minimal_Flat_Feet_Right
                                  ? "Diagnosis"
                                  : "N/A"}{" "}
                                <br />
                                Bones Minimal Flat Left :{" "}
                                {Current_Report_Data.Bones_Minimal_Flat_Feet_Left
                                  ? "Diagnosis"
                                  : "N/A"}{" "}
                                <br />
                                Bones Minimal Flat Both :{" "}
                                {Current_Report_Data.Bones_Minimal_Flat_Feet_Both
                                  ? "Diagnosis"
                                  : "N/A"}{" "}
                                <br />
                                <br />
                              </Typography>
                            </Box>
                            <Box className="space-between">
                              <Typography>
                                Bones Gross Flat Right :{" "}
                                {Current_Report_Data.Bones_Gross_Flat_Feet_Right
                                  ? "Diagnosis"
                                  : "N/A"}{" "}
                                <br />
                                Bones Gross Flat Left :{" "}
                                {Current_Report_Data.Bones_Gross_Flat_Feet_Left
                                  ? "Diagnosis"
                                  : "N/A"}{" "}
                                <br />
                                Bones Gross Flat Both :{" "}
                                {Current_Report_Data.Bones_Gross_Flat_Feet_Both
                                  ? "Diagnosis"
                                  : "N/A"}{" "}
                                <br />
                                Bones Gross Flat B/L :{" "}
                                {Current_Report_Data.Bones_Gross_Flat_Feet_B_L
                                  ? "Diagnosis"
                                  : "N/A"}{" "}
                                <br />
                                <br />
                              </Typography>
                              <Typography>
                                Bones Borderline Right :{" "}
                                {Current_Report_Data.Bones_Border_Line_Feet_Right
                                  ? "Diagnosis"
                                  : "N/A"}{" "}
                                <br />
                                Bones Borderline Left :{" "}
                                {Current_Report_Data.Bones_Border_Line_Feet_Left
                                  ? "Diagnosis"
                                  : "N/A"}{" "}
                                <br />
                                <br />
                              </Typography>
                            </Box>
                            <Typography>
                              Bones Knee Knocking :{" "}
                              {Current_Report_Data.Bones_Knee_Knocking
                                ? "Diagnosis"
                                : "N/A"}{" "}
                              <br />
                            </Typography>
                          </Box>
                          <Typography>
                            Other :{" "}
                            {Current_Report_Data.Bones_Other_Disease
                              ? Current_Report_Data.Bones_Other_Disease
                              : "N/A "}
                          </Typography>
                        </Box>
                      </Box>
                      {/* ----Systematic Exam Details------ */}
                      <Typography
                        textAlign={"center"}
                        variant="h5"
                        m={"15px 0"}
                      >
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
                              {Current_Report_Data.CNS_Abnormality_Speech_Gait
                                ? Current_Report_Data.CNS_Abnormality_Speech_Gait
                                : "N/A "}
                            </Typography>
                            <Typography>
                              Other :{" "}
                              {Current_Report_Data.CNS_Other
                                ? Current_Report_Data.CNS_Other
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
                              {Current_Report_Data.Chest_Congenital_Deformity
                                ? "Diagnosis"
                                : "N/A "}
                            </Typography>
                            <Typography>
                              Other :{" "}
                              {Current_Report_Data.Chest_Other
                                ? Current_Report_Data.Chest_Other
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
                              {Current_Report_Data.CVS_Tachycardia
                                ? "Diagnosis"
                                : "N/A "}
                              <br />
                              Murmurs :{" "}
                              {Current_Report_Data.CVS_Murmurs
                                ? "Diagnosis"
                                : "N/A "}
                            </Typography>
                            <Typography>
                              Other :{" "}
                              {Current_Report_Data.CVS_Other
                                ? Current_Report_Data.CVS_Other
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
                              {Current_Report_Data.Abdomen_Hernia
                                ? "Diagnosis"
                                : "N/A "}
                              <br />
                              Viscer :{" "}
                              {Current_Report_Data.Abdomen_Viscer
                                ? "Diagnosis"
                                : "N/A "}
                            </Typography>
                            <Typography>
                              Other :{" "}
                              {Current_Report_Data.Abdomen_Other
                                ? Current_Report_Data.Abdomen_Other
                                : "N/A "}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      {/* ----Vaccine  Details------ */}
                      <Typography
                        textAlign={"center"}
                        variant="h5"
                        m={"15px 0"}
                      >
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
                              {Current_Report_Data.Child_Immunization
                                ? Current_Report_Data.Child_Immunization
                                : "N/A "}
                            </Typography>
                            <Typography>
                              Missing Dose (If Incomplete) :{" "}
                              {Current_Report_Data.Child_Missing_Dose
                                ? Current_Report_Data.Child_Missing_Dose
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
                              {Current_Report_Data.Hepatitis_B_Vaccine
                                ? Current_Report_Data.Hepatitis_B_Vaccine
                                : "N/A "}
                            </Typography>
                            <Typography>
                              Missing Dose (If Incomplete) :{" "}
                              {Current_Report_Data.Hepatitis_Missing_Dose
                                ? Current_Report_Data.Hepatitis_Missing_Dose
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
                              {Current_Report_Data.Tetnes_Vaccine
                                ? Current_Report_Data.Tetnes_Vaccine
                                : "N/A "}
                            </Typography>
                            <Typography>
                              Missing Dose (If Incomplete) :{" "}
                              {Current_Report_Data.Tetnes_Missing_Dose
                                ? Current_Report_Data.Tetnes_Missing_Dose
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
                        Age={Current_Report_Data.years}
                        Height={Current_Report_Data.Height_Centimeter}
                        Weight={Current_Report_Data.Weight_Kg}
                      />
                    </>
                  ) : (
                    <>
                      <Specific_Female_Graph
                        Report={true}
                        Age={Current_Report_Data.years}
                        Height={Current_Report_Data.Height_Centimeter}
                        Weight={Current_Report_Data.Weight_Kg}
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
                        Age={Current_Report_Data.years}
                        Weight={Current_Report_Data.Weight_Kg}
                      />
                    </>
                  ) : (
                    <>
                      {" "}
                      Report={true}
                      <Specific_Female_Weight
                        Report={true}
                        Age={Current_Report_Data.years}
                        Weight={Current_Report_Data.Weight_Kg}
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
                        Age={Current_Report_Data.years}
                        Height={Current_Report_Data.Height_Centimeter}
                      />
                    </>
                  ) : (
                    <>
                      <Specific_Female_Height
                        Report={true}
                        Age={Current_Report_Data.years}
                        Height={Current_Report_Data.Height_Centimeter}
                      />
                    </>
                  )}
                </Box> */}
                      <Accordions
                        MasterData={PatientsData}
                        Report_Year_Data={Current_Report_Data}
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
                        setOpenPreview(TruckDroplet);
                      }}
                    >
                      {false ? (
                        <CircularIndeterminate color={"white"} />
                      ) : (
                        "Generate Report"
                      )}
                    </Button>
                  </Box>
                </Box>
                {ShowPreview && (
                  <Dialog
                    open={OpenPreview}
                    onClose={handleClosePreview}
                    // className="bg-color"
                    PaperProps={{ sx: dialogStyleShowReport }}
                  >
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
                          MasterData={PatientsData}
                          Report_Year_Data={Current_Report_Data}
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
                          MasterData={PatientsData}
                          Report_Year_Data={Current_Report_Data}
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
                        onClick={handleClosePreview}
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
                {/* <Typography textAlign={"center"} variant="h5">
                  BMI for Age
                </Typography>
                {ShowBMI &&
                  (PatientsData.Gender == "male" ? (
                    <Specific_Graph Age={Age} Height={Height} Weight={Weight} />
                  ) : (
                    <Specific_Female_Graph
                      Age={Age}
                      Height={Height}
                      Weight={Weight}
                    />
                  ))}
                <Typography textAlign={"center"} variant="h5">
                  Weight for Age
                </Typography>
                {ShowWeight &&
                  (PatientsData.Gender == "male" ? (
                    <Specific_Male_Weight Age={Age} Weight={Weight} />
                  ) : (
                    <Specific_Female_Weight Age={Age} Weight={Weight} />
                  ))}
                <Typography textAlign={"center"} variant="h5">
                  Height for Age
                </Typography>
                {ShowHeight &&
                  (PatientsData.Gender == "male" ? (
                    <Specific_Male_Height Age={Age} Height={Height} />
                  ) : (
                    <Specific_Female_Height Age={Age} Height={Height} />
                  ))} */}
              </DialogContent>

              <DialogActions>
                <Button
                  onClick={handleClose1}
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
          </Box>
        )}
        {ShowGraphforAllYears && (
          <Box>
            <Dialog
              open={open2}
              onClose={handleClose2}
              PaperProps={{ sx: dialogStyleShowReport }}
            >
              <DialogTitle textAlign={"center"}>
                Graph for All Years
              </DialogTitle>
              <DialogContent>
                <Typography variant="h5">Patinet Information</Typography>
                <DialogContentText display={"flex"} flexDirection={"column"}>
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    width={"100%"}
                  >
                    <Typography width={"250px"}>
                      Name : {PatientsData.Student_Name}
                    </Typography>
                    <Typography width={"250px"}>
                      GR Number : {PatientsData.GR_Number}
                    </Typography>
                  </Box>
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    width={"100%"}
                  >
                    <Typography width={"250px"}>
                      Admission Year : {PatientInfo.Year}
                    </Typography>
                    <Typography width={"250px"}>
                      Father Name: {PatientsData.Name_of_Parent_Guardian}
                    </Typography>
                  </Box>
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    width={"100%"}
                  >
                    <Typography width={"250px"}>
                      Gender : {PatientsData.Gender}
                    </Typography>
                    <Typography width={"250px"}>
                      Date of Birth : {PatientsData.Date_of_Birth}
                    </Typography>
                  </Box>
                </DialogContentText>
                <Typography textAlign={"center"} variant="h5">
                  BMI for Age
                </Typography>
                <Box height={"100vh"}>
                  {PatientsData.Gender == "male" ? <Graph /> : <Female_Graph />}
                </Box>
                <Typography textAlign={"center"} variant="h5">
                  Weight for Age
                </Typography>
                <Box height={"100vh"}>
                  {PatientsData.Gender == "male" ? (
                    <Male_Weight_Graph />
                  ) : (
                    <Female_Weight_Graph />
                  )}
                </Box>
                <Typography textAlign={"center"} variant="h5">
                  Height for Age
                </Typography>
                <Box height={"100vh"}>
                  {true &&
                    (PatientsData.Gender == "male" ? (
                      <Male_Height_Graph />
                    ) : (
                      <Female_Height_Graph />
                    ))}
                </Box>
              </DialogContent>

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
          </Box>
        )}
      </Box>
    </>
  );
};

export default HealthRecord;
