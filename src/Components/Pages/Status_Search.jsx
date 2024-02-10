import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { alpha, styled } from "@mui/material/styles";
import React, { useContext, useEffect, useRef, useState } from "react";
import SideBar from "../Sidebar";
import {
  Delete,
  Female,
  Male,
  PersonRemove,
  Print,
  Search,
  Visibility,
} from "@mui/icons-material";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { DB } from "../../firebase";
import { toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";
import { contextData } from "../../Context/Context";
import { allMasterEntryKeys } from "../Data/MasterEntry";
import dayjs from "dayjs";
import Accordions from "./Accordian";
import Page_1 from "../PDF_Pages/Page_1";
import Page_2 from "../PDF_Pages/Page_2";
import { Graph } from "styled-icons/octicons";
import Female_Graph from "../Graph/Female/Age/Female_Graph";
import Male_Weight_Graph from "../Graph/Male/Weight/Male Weight Graph";
import Female_Weight_Graph from "../Graph/Female/Weight/Female_Weight_Graph";
import Male_Height_Graph from "../Graph/Male/Height/Male Height Graph";
import Female_Height_Graph from "../Graph/Female/Height/Female_Height_Graph";
import { TruckDroplet } from "styled-icons/fa-solid";

const Status_Search = () => {
  const [Criteria, setCriteria] = useState("");
  const [StudentName, setStudentName] = useState("");
  const [StudentProfile, setStudentProfile] = useState("");
  const [Father_Occupation, setFather_Occupation] = useState("");
  const [Disease, setDisease] = useState("");
  const [Remarks, setRemarks] = useState("");
  const [Year, setYear] = useState("");
  const [Loading, setLoading] = useState(true);
  const [All_Master_Data, setAll_Master_Data] = useState("");
  const [Master_Data, setMaster_Data] = useState("");
  const [filteredPatients, setfilteredPatients] = useState("");
  //
  const { setObj, Obj } = useContext(contextData);
  const [PatientInfo, setPatientInfo] = useState({
    GR: "",
    Year: "",
  });
  const [Reports_Data, setReports_Data] = useState();
  const [open, setOpen] = useState(true);
  const [open1, setOpen1] = useState(true);
  const [open2, setOpen2] = useState(false);
  const [ShowReports, setShowReports] = useState(false);
  const [ReportYear, setReportYear] = useState("");
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
  // const [Loading, setLoading] = useState(false);
  const [male, setmale] = useState(undefined);
  const [female, setfemale] = useState(undefined);
  const [OpenPreview, setOpenPreview] = useState(false);
  const [ShowPreview, setShowPreview] = useState(false);

  const handleCriteriaChange = (e) => {
    setCriteria(e.target.value);
  };

  useEffect(() => {
    fetchedData();
  }, []);
  const fetchedData = async () => {
    setLoading(true);
    // const Master_data = (await getDocs(collection(DB, "Patients"))).docs.map((val) =>
    //   val.data()
    // );
    // const Report_data = (await getDocs(collection(DB, "Patients"))).docs.map((val) =>
    //   val.data()
    // );
    let All_Report_Data = [];
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
    // console.log(All_Report_Data);

    setAll_Master_Data(All_Report_Data);
    let arr = All_Report_Data.map((value) => {
      let master = value[0];
      let lastReportYear = value[1][value[1].length - 1];
      return { ...master, ...lastReportYear };
    });
    setMaster_Data(arr);
    console.log(arr);
    setfilteredPatients(arr);
    setLoading(false);
  };

  const filterDetails = () => {
    if (Criteria == "Father's Occupation") {
      switch (Father_Occupation) {
        case "Pakistan Navy":
          setfilteredPatients(
            Master_Data.filter(
              (val) => val.Occupation_of_Parent_Guardian == "Pakistan Navy"
            )
          );
          break;
        case "Pakistan Air Force":
          setfilteredPatients(
            Master_Data.filter(
              (val) => val.Occupation_of_Parent_Guardian == "Pakistan Air Force"
            )
          );
          break;
        case "Pakistan Army":
          setfilteredPatients(
            Master_Data.filter(
              (val) => val.Occupation_of_Parent_Guardian == "Pakistan Army"
            )
          );
          break;
        case "Civilian":
          setfilteredPatients(
            Master_Data.filter(
              (val) => val.Occupation_of_Parent_Guardian == "Civilian"
            )
          );
          break;
        default:
          console.log("No Case Matched");
          break;
      }
    } else if (Criteria == "Disease") {
      switch (Disease) {
        case "Any Congential Heart Disease":
          {
            let current_filtered_Report = All_Master_Data.flatMap((value) => {
              let masterfile = value[0];
              let all_Report_Years = value[1];
              let Reports = all_Report_Years
                .map((val) => {
                  return [masterfile, val];
                })
                .filter((val) => val[1].Heart_Disease != "")
                .filter((val) => {
                  if (Year) {
                    return val[1].Report_Year == Year;
                  } else {
                    return true;
                  }
                });
              return Reports;
            });
            // Given array of arrays

            // Map to store unique master objects
            let masterMap = new Map();
            current_filtered_Report.forEach((innerArray) => {
              let masterObject = innerArray[0];
              let detailObject = innerArray[1];
              let masterKey = JSON.stringify(masterObject);

              // If master object is not in the map or the current detail object's report year is greater, update the map
              if (
                !masterMap.has(masterKey) ||
                detailObject.Report_Year > masterMap.get(masterKey).Report_Year
              ) {
                masterMap.set(masterKey, detailObject);
              }
            });

            // Array to store arrays with unique master objects
            let uniqueArrays = [];

            // Iterate through master map and reconstruct arrays with unique master objects
            masterMap.forEach((detailObject, masterKey) => {
              let masterObject = JSON.parse(masterKey);
              uniqueArrays.push([masterObject, detailObject]);
            });
            let concatDataArrays = uniqueArrays.map((val) => {
              let master = val[0];
              let Obj = val[1];
              return { ...master, ...Obj };
            });
            setfilteredPatients(concatDataArrays);
          }
          break;

        case "Any Congential Anomaly":
          {
            let current_filtered_Report = All_Master_Data.flatMap((value) => {
              let masterfile = value[0];
              let all_Report_Years = value[1];
              let Reports = all_Report_Years
                .map((val) => {
                  return [masterfile, val];
                })
                .filter((val) => val[1].Anamoly != "")
                .filter((val) => {
                  if (Year) {
                    return val[1].Report_Year == Year;
                  } else {
                    return true;
                  }
                });
              return Reports;
            });
            // Given array of arrays

            // Map to store unique master objects
            let masterMap = new Map();
            current_filtered_Report.forEach((innerArray) => {
              let masterObject = innerArray[0];
              let detailObject = innerArray[1];
              let masterKey = JSON.stringify(masterObject);

              // If master object is not in the map or the current detail object's report year is greater, update the map
              if (
                !masterMap.has(masterKey) ||
                detailObject.Report_Year > masterMap.get(masterKey).Report_Year
              ) {
                masterMap.set(masterKey, detailObject);
              }
            });

            // Array to store arrays with unique master objects
            let uniqueArrays = [];

            // Iterate through master map and reconstruct arrays with unique master objects
            masterMap.forEach((detailObject, masterKey) => {
              let masterObject = JSON.parse(masterKey);
              uniqueArrays.push([masterObject, detailObject]);
            });
            let concatDataArrays = uniqueArrays.map((val) => {
              let master = val[0];
              let Obj = val[1];
              return { ...master, ...Obj };
            });
            setfilteredPatients(concatDataArrays);
          }
          break;
        case "Any Blood Disorder":
          {
            let current_filtered_Report = All_Master_Data.flatMap((value) => {
              let masterfile = value[0];
              let all_Report_Years = value[1];
              let Reports = all_Report_Years
                .map((val) => {
                  return [masterfile, val];
                })
                .filter((val) => val[1].Blood_Disorder != "")
                .filter((val) => {
                  if (Year) {
                    return val[1].Report_Year == Year;
                  } else {
                    return true;
                  }
                });
              return Reports;
            });
            // Given array of arrays

            // Map to store unique master objects
            let masterMap = new Map();
            current_filtered_Report.forEach((innerArray) => {
              let masterObject = innerArray[0];
              let detailObject = innerArray[1];
              let masterKey = JSON.stringify(masterObject);

              // If master object is not in the map or the current detail object's report year is greater, update the map
              if (
                !masterMap.has(masterKey) ||
                detailObject.Report_Year > masterMap.get(masterKey).Report_Year
              ) {
                masterMap.set(masterKey, detailObject);
              }
            });

            // Array to store arrays with unique master objects
            let uniqueArrays = [];

            // Iterate through master map and reconstruct arrays with unique master objects
            masterMap.forEach((detailObject, masterKey) => {
              let masterObject = JSON.parse(masterKey);
              uniqueArrays.push([masterObject, detailObject]);
            });
            let concatDataArrays = uniqueArrays.map((val) => {
              let master = val[0];
              let Obj = val[1];
              return { ...master, ...Obj };
            });
            setfilteredPatients(concatDataArrays);
          }
          break;
        case "Asthama":
          {
            let current_filtered_Report = All_Master_Data.flatMap((value) => {
              let masterfile = value[0];
              let all_Report_Years = value[1];
              let Reports = all_Report_Years
                .map((val) => {
                  return [masterfile, val];
                })
                .filter((val) => val[1].Asthama == true)
                .filter((val) => {
                  if (Year) {
                    return val[1].Report_Year == Year;
                  } else {
                    return true;
                  }
                });
              return Reports;
            });
            // Given array of arrays

            // Map to store unique master objects
            let masterMap = new Map();
            current_filtered_Report.forEach((innerArray) => {
              let masterObject = innerArray[0];
              let detailObject = innerArray[1];
              let masterKey = JSON.stringify(masterObject);

              // If master object is not in the map or the current detail object's report year is greater, update the map
              if (
                !masterMap.has(masterKey) ||
                detailObject.Report_Year > masterMap.get(masterKey).Report_Year
              ) {
                masterMap.set(masterKey, detailObject);
              }
            });

            // Array to store arrays with unique master objects
            let uniqueArrays = [];

            // Iterate through master map and reconstruct arrays with unique master objects
            masterMap.forEach((detailObject, masterKey) => {
              let masterObject = JSON.parse(masterKey);
              uniqueArrays.push([masterObject, detailObject]);
            });
            let concatDataArrays = uniqueArrays.map((val) => {
              let master = val[0];
              let Obj = val[1];
              return { ...master, ...Obj };
            });
            setfilteredPatients(concatDataArrays);
          }
          break;
        case "Diabetes":
          {
            let current_filtered_Report = All_Master_Data.flatMap((value) => {
              let masterfile = value[0];
              let all_Report_Years = value[1];
              let Reports = all_Report_Years
                .map((val) => {
                  return [masterfile, val];
                })
                .filter((val) => val[1].Diabetes == true)
                .filter((val) => {
                  if (Year) {
                    return val[1].Report_Year == Year;
                  } else {
                    return true;
                  }
                });
              return Reports;
            });
            // Given array of arrays

            // Map to store unique master objects
            let masterMap = new Map();
            current_filtered_Report.forEach((innerArray) => {
              let masterObject = innerArray[0];
              let detailObject = innerArray[1];
              let masterKey = JSON.stringify(masterObject);

              // If master object is not in the map or the current detail object's report year is greater, update the map
              if (
                !masterMap.has(masterKey) ||
                detailObject.Report_Year > masterMap.get(masterKey).Report_Year
              ) {
                masterMap.set(masterKey, detailObject);
              }
            });

            // Array to store arrays with unique master objects
            let uniqueArrays = [];

            // Iterate through master map and reconstruct arrays with unique master objects
            masterMap.forEach((detailObject, masterKey) => {
              let masterObject = JSON.parse(masterKey);
              uniqueArrays.push([masterObject, detailObject]);
            });
            let concatDataArrays = uniqueArrays.map((val) => {
              let master = val[0];
              let Obj = val[1];
              return { ...master, ...Obj };
            });
            setfilteredPatients(concatDataArrays);
          }
          break;
        case "Epistaxes":
          {
            let current_filtered_Report = All_Master_Data.flatMap((value) => {
              let masterfile = value[0];
              let all_Report_Years = value[1];
              let Reports = all_Report_Years
                .map((val) => {
                  return [masterfile, val];
                })
                .filter((val) => val[1].Epistaxes == true)
                .filter((val) => {
                  if (Year) {
                    return val[1].Report_Year == Year;
                  } else {
                    return true;
                  }
                });
              return Reports;
            });
            // Given array of arrays

            // Map to store unique master objects
            let masterMap = new Map();
            current_filtered_Report.forEach((innerArray) => {
              let masterObject = innerArray[0];
              let detailObject = innerArray[1];
              let masterKey = JSON.stringify(masterObject);

              // If master object is not in the map or the current detail object's report year is greater, update the map
              if (
                !masterMap.has(masterKey) ||
                detailObject.Report_Year > masterMap.get(masterKey).Report_Year
              ) {
                masterMap.set(masterKey, detailObject);
              }
            });

            // Array to store arrays with unique master objects
            let uniqueArrays = [];

            // Iterate through master map and reconstruct arrays with unique master objects
            masterMap.forEach((detailObject, masterKey) => {
              let masterObject = JSON.parse(masterKey);
              uniqueArrays.push([masterObject, detailObject]);
            });
            let concatDataArrays = uniqueArrays.map((val) => {
              let master = val[0];
              let Obj = val[1];
              return { ...master, ...Obj };
            });
            setfilteredPatients(concatDataArrays);
          }
          break;
        case "Epilepsy":
          {
            {
              let current_filtered_Report = All_Master_Data.flatMap((value) => {
                let masterfile = value[0];
                let all_Report_Years = value[1];
                let Reports = all_Report_Years
                  .map((val) => {
                    return [masterfile, val];
                  })
                  .filter((val) => val[1].Epilepsy == true)
                  .filter((val) => {
                    if (Year) {
                      return val[1].Report_Year == Year;
                    } else {
                      return true;
                    }
                  });
                return Reports;
              });
              // Given array of arrays

              // Map to store unique master objects
              let masterMap = new Map();
              current_filtered_Report.forEach((innerArray) => {
                let masterObject = innerArray[0];
                let detailObject = innerArray[1];
                let masterKey = JSON.stringify(masterObject);

                // If master object is not in the map or the current detail object's report year is greater, update the map
                if (
                  !masterMap.has(masterKey) ||
                  detailObject.Report_Year >
                    masterMap.get(masterKey).Report_Year
                ) {
                  masterMap.set(masterKey, detailObject);
                }
              });

              // Array to store arrays with unique master objects
              let uniqueArrays = [];

              // Iterate through master map and reconstruct arrays with unique master objects
              masterMap.forEach((detailObject, masterKey) => {
                let masterObject = JSON.parse(masterKey);
                uniqueArrays.push([masterObject, detailObject]);
              });
              let concatDataArrays = uniqueArrays.map((val) => {
                let master = val[0];
                let Obj = val[1];
                return { ...master, ...Obj };
              });
              setfilteredPatients(concatDataArrays);
            }
          }
          break;
        default:
          console.log("No Disease Matched");
          break;
      }
    } else if (Criteria == "Remarks") {
      switch (Remarks) {
        case "Healthy Child":
          {
            let current_filtered_Report = All_Master_Data.flatMap((value) => {
              let masterfile = value[0];
              let all_Report_Years = value[1];
              let Reports = all_Report_Years
                .map((val) => {
                  return [masterfile, val];
                })
                .filter((val) => val[1].BMI_Remark == "Normal")
                .filter((val) => {
                  if (Year) {
                    return val[1].Report_Year == Year;
                  } else {
                    return true;
                  }
                });
              return Reports;
            });
            // Given array of arrays

            // Map to store unique master objects
            let masterMap = new Map();
            current_filtered_Report.forEach((innerArray) => {
              let masterObject = innerArray[0];
              let detailObject = innerArray[1];
              let masterKey = JSON.stringify(masterObject);

              // If master object is not in the map or the current detail object's report year is greater, update the map
              if (
                !masterMap.has(masterKey) ||
                detailObject.Report_Year > masterMap.get(masterKey).Report_Year
              ) {
                masterMap.set(masterKey, detailObject);
              }
            });

            // Array to store arrays with unique master objects
            let uniqueArrays = [];

            // Iterate through master map and reconstruct arrays with unique master objects
            masterMap.forEach((detailObject, masterKey) => {
              let masterObject = JSON.parse(masterKey);
              uniqueArrays.push([masterObject, detailObject]);
            });
            let concatDataArrays = uniqueArrays.map((val) => {
              let master = val[0];
              let Obj = val[1];
              return { ...master, ...Obj };
            });
            setfilteredPatients(concatDataArrays);
          }
          break;
        case "Stunted":
          {
            let current_filtered_Report = All_Master_Data.flatMap((value) => {
              let masterfile = value[0];
              let all_Report_Years = value[1];
              let Reports = all_Report_Years
                .map((val) => {
                  return [masterfile, val];
                })
                .filter((val) => val[1].BMI_Remark == "Stunted")
                .filter((val) => {
                  if (Year) {
                    return val[1].Report_Year == Year;
                  } else {
                    return true;
                  }
                });
              return Reports;
            });
            // Given array of arrays

            // Map to store unique master objects
            let masterMap = new Map();
            current_filtered_Report.forEach((innerArray) => {
              let masterObject = innerArray[0];
              let detailObject = innerArray[1];
              let masterKey = JSON.stringify(masterObject);

              // If master object is not in the map or the current detail object's report year is greater, update the map
              if (
                !masterMap.has(masterKey) ||
                detailObject.Report_Year > masterMap.get(masterKey).Report_Year
              ) {
                masterMap.set(masterKey, detailObject);
              }
            });

            // Array to store arrays with unique master objects
            let uniqueArrays = [];

            // Iterate through master map and reconstruct arrays with unique master objects
            masterMap.forEach((detailObject, masterKey) => {
              let masterObject = JSON.parse(masterKey);
              uniqueArrays.push([masterObject, detailObject]);
            });
            let concatDataArrays = uniqueArrays.map((val) => {
              let master = val[0];
              let Obj = val[1];
              return { ...master, ...Obj };
            });
            setfilteredPatients(concatDataArrays);
          }
          break;
        case "Under Weight":
          {
            let current_filtered_Report = All_Master_Data.flatMap((value) => {
              let masterfile = value[0];
              let all_Report_Years = value[1];
              let Reports = all_Report_Years
                .map((val) => {
                  return [masterfile, val];
                })
                .filter((val) => val[1].BMI_Remark == "Underweight")
                .filter((val) => {
                  if (Year) {
                    return val[1].Report_Year == Year;
                  } else {
                    return true;
                  }
                });
              return Reports;
            });
            // Given array of arrays

            // Map to store unique master objects
            let masterMap = new Map();
            current_filtered_Report.forEach((innerArray) => {
              let masterObject = innerArray[0];
              let detailObject = innerArray[1];
              let masterKey = JSON.stringify(masterObject);

              // If master object is not in the map or the current detail object's report year is greater, update the map
              if (
                !masterMap.has(masterKey) ||
                detailObject.Report_Year > masterMap.get(masterKey).Report_Year
              ) {
                masterMap.set(masterKey, detailObject);
              }
            });

            // Array to store arrays with unique master objects
            let uniqueArrays = [];

            // Iterate through master map and reconstruct arrays with unique master objects
            masterMap.forEach((detailObject, masterKey) => {
              let masterObject = JSON.parse(masterKey);
              uniqueArrays.push([masterObject, detailObject]);
            });
            let concatDataArrays = uniqueArrays.map((val) => {
              let master = val[0];
              let Obj = val[1];
              return { ...master, ...Obj };
            });
            setfilteredPatients(concatDataArrays);
          }
          break;
        case "Obese":
          {
            let current_filtered_Report = All_Master_Data.flatMap((value) => {
              let masterfile = value[0];
              let all_Report_Years = value[1];
              let Reports = all_Report_Years
                .map((val) => {
                  return [masterfile, val];
                })
                .filter((val) => val[1].BMI_Remark == "Obese")
                .filter((val) => {
                  if (Year) {
                    return val[1].Report_Year == Year;
                  } else {
                    return true;
                  }
                });
              return Reports;
            });
            // Given array of arrays

            // Map to store unique master objects
            let masterMap = new Map();
            current_filtered_Report.forEach((innerArray) => {
              let masterObject = innerArray[0];
              let detailObject = innerArray[1];
              let masterKey = JSON.stringify(masterObject);

              // If master object is not in the map or the current detail object's report year is greater, update the map
              if (
                !masterMap.has(masterKey) ||
                detailObject.Report_Year > masterMap.get(masterKey).Report_Year
              ) {
                masterMap.set(masterKey, detailObject);
              }
            });

            // Array to store arrays with unique master objects
            let uniqueArrays = [];

            // Iterate through master map and reconstruct arrays with unique master objects
            masterMap.forEach((detailObject, masterKey) => {
              let masterObject = JSON.parse(masterKey);
              uniqueArrays.push([masterObject, detailObject]);
            });
            let concatDataArrays = uniqueArrays.map((val) => {
              let master = val[0];
              let Obj = val[1];
              return { ...master, ...Obj };
            });
            setfilteredPatients(concatDataArrays);
          }
          break;
        default:
          console.log("No Disease Matched");
          break;
      }
    } else if (Criteria == "Student Name") {
      StudentName &&
        setfilteredPatients(
          Master_Data.filter((val) =>
            val.Student_Name.toLowerCase().includes(StudentName.toLowerCase())
          )
        );
    } else {
      toast.warn("Nothing found!");
      // setfilteredPatients(All_Master_Data);
    }
  };

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
    documentTitle: `Report_${PatientsData && PatientsData.GR_Number}_${Current_Report_Data && Current_Report_Data.Report_Year}_Page_1.pdf`,
    onAfterPrint: "PDF Saved",
  });

  const Page2PDF = useRef();
  const generatePDF2 = useReactToPrint({
    content: () => Page2PDF.current,
    documentTitle: `Report_${PatientsData && PatientsData.GR_Number}_${Current_Report_Data && Current_Report_Data.Report_Year}_Page_2.pdf`,
    onAfterPrint: "PDF Saved"
  });

  return (
    <>
      <Box display="flex" height={"100vh"} width={"100vw"} overflow={"hidden"}>
        <Box display={"flex"} height={"100vh"} width={"15%"}>
          <SideBar />
        </Box>
        <Box
          width={"85%"}
          height={"100%"}
          className="col y-center bg-color"
          overflow={"scroll"}
          padding={"30px 0"}
        >
          <Box
            bgcolor={"var(--purple-alpha)"}
            width={"90%"}
            className="y-center space-between"
            padding={"10px 5px"}
            marginBottom={"20px"}
            borderRadius={"9px"}
          >
            <Box className="y-center">
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">
                  Select Criteria
                </InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={Criteria}
                  label="Select Criteria"
                  onChange={handleCriteriaChange}
                  sx={{ width: 200 }}
                >
                  {[
                    "Student Name",
                    "Father's Occupation",
                    "Student Profile",
                    "Disease",
                    "Remarks",
                  ].map((value) => (
                    <MenuItem value={value}>{value}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              {Criteria == "Student Name" && (
                <TextField
                  fontSize={"32px"}
                  textAlign={"left"}
                  size="small"
                  width={"9px"}
                  placeholder="Student Name"
                  value={StudentName}
                  onChange={(e) => setStudentName(e.target.value)}
                />
              )}
              {Criteria == "Student Profile" && (
                <TextField
                  fontSize={"32px"}
                  textAlign={"left"}
                  size="small"
                  width={"9px"}
                  placeholder="Student Profile"
                  value={StudentProfile}
                  onChange={(e) => setStudentProfile(e.target.value)}
                />
              )}
              {Criteria == "Father's Occupation" && (
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small-label">
                    Father's Occupation
                  </InputLabel>
                  <Select
                    sx={{ width: 200 }}
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={Father_Occupation}
                    label="Father's Occupation"
                    onChange={(e) => setFather_Occupation(e.target.value)}
                  >
                    {[
                      "Pakistan Navy",
                      "Pakistan Air Force",
                      "Pakistan Army",
                      "Civilian",
                    ].map((value) => (
                      <MenuItem value={value}>{value}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              {Criteria == "Disease" && (
                <>
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small-label">
                      Disease
                    </InputLabel>
                    <Select
                      sx={{ width: 200 }}
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={Disease}
                      label="Disease"
                      onChange={(e) => setDisease(e.target.value)}
                    >
                      {[
                        "Any Congential Heart Disease",
                        "Any Congential Anomaly",
                        "Any Blood Disorder",
                        "Asthama",
                        "Diabetes",
                        "Epistaxes",
                        "Epilepsy",
                      ].map((value) => (
                        <MenuItem value={value}>{value}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </>
              )}
              {Criteria == "Remarks" && (
                <>
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small-label">
                      Remarks
                    </InputLabel>
                    <Select
                      sx={{ width: 200 }}
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={Remarks}
                      label="Remarks"
                      onChange={(e) => setRemarks(e.target.value)}
                    >
                      {[
                        "Healthy Child",
                        "Stunted",
                        "Under Weight",
                        "Obese",
                      ].map((value) => (
                        <MenuItem value={value}>{value}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </>
              )}
              {(Criteria == "Disease" || Criteria == "Remarks") && (
                <TextField
                  fontSize={"32px"}
                  textAlign={"left"}
                  size="small"
                  width={"9px"}
                  placeholder="Year"
                  value={Year}
                  onChange={(e) => setYear(e.target.value)}
                />
              )}
            </Box>
            <Box className="y-center" justifyContent={"flex-end"} width={"35%"} >
              <Typography marginRight={"20px"}>Showing result {filteredPatients.length} out of {Master_Data.length}</Typography>
              <Button
                id="theme-btn"
                size="small"
                sx={{ padding: "7px 25px" }}
                variant="contained"
                fontSize="5px"
                onClick={filterDetails}
              >
                <Search />
              </Button>
            </Box>
          </Box>
          <Box
            width={"90%"}
            bgcolor={"transparent"}
            borderRadius={"9px"}
            padding={"10px 0 0 0"}
          >
            <TableContainer
              component={Paper}
              sx={{
                height: "75vh",
                width: "100%",
                overflowY: "scroll",
                margin: "auto",
                background: "transparent",
              }}
            >
              <Table
                className="bg-table"
                sx={{
                  minWidth: 1010,
                }}
                aria-label="simple table"
              >
                {/* <Table sx={{ minWidth: 650,background:"rgba(255, 255, 255, 0.3)"}}  aria-label="simple table"> */}
                <TableHead>
                  <TableRow>
                    <TableCell size="small">GR Number</TableCell>
                    <TableCell size="small" align="center">
                      Student Name
                    </TableCell>
                    <TableCell size="small" align="center">
                      Father Name
                    </TableCell>
                    <TableCell size="small" align="center">
                      Gender
                    </TableCell>
                    <TableCell size="small" align="center">
                      Blood Group
                    </TableCell>
                    <TableCell size="small" align="center">
                      Year
                    </TableCell>
                    <TableCell size="small" align="center">
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody
                  style={{
                    overflow: "scroll",
                    position:"relative"
                  }}
                  className="col x-y-center"
                >
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
                      marginTop="20%"
                    >
                      <CircularProgress size={"2rem"} />
                      {/* <Typography m={"10px 0"}>Loading...</Typography> */}
                    </Box>
                  )}
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
                        <TableCell align="center" size="small">
                          {row.Student_Name ? row.Student_Name : "N/A"}
                        </TableCell>
                        <TableCell align="center" size="small">
                          {row.Name_of_Parent_Guardian
                            ? row.Name_of_Parent_Guardian
                            : "N/A"}
                        </TableCell>
                        <TableCell align="center" size="small">
                          {row.Gender ? (
                            row.Gender == "male" ? (
                              <Male />
                            ) : (
                              <Female />
                            )
                          ) : (
                            "N/A"
                          )}
                        </TableCell>
                        <TableCell align="center" size="small">
                          {row.Blood_Group ? row.Blood_Group : "N/A"}
                        </TableCell>
                        <TableCell align="center" size="small">
                          {row.Year ? row.Year : "N/A"}
                        </TableCell>
                        <TableCell align="center" size="small">
                          <>
                            <Button
                              size="small"
                              id="theme-btn"
                              sx={{
                                bgcolor: "transparent !important",
                                color: "var(--purple-button)",
                              }}
                              onClick={() => {
                                Navigation(row.GR_Number, row.Year);
                              }}
                            >
                              <Visibility />
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
                                  fetchedData();
                                } catch (error) {
                                  console.log(error);
                                }
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
                  {PatientsData.Gender == "male" ? (
                    <Male_Height_Graph />
                  ) : (
                    <Female_Height_Graph />
                  )}
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

export default Status_Search;
