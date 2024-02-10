import { Delete } from "@mui/icons-material";
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
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { DB } from "../../firebase";
import SideBar from "../Sidebar";

const DeleteDetailEntry = () => {
  useEffect(() => {
    document.title = "Delete Detail Entry"
  }, [])
  const [open, setOpen] = useState(true);
  const [CheckGR, setCheckGR] = useState("");
  const [CheckYear, setCheckYear] = useState("");
  const [jsonError, setJsonError] = useState("");

  const DeleteDetailEntryFun = async () => {
    try {
      const fetchAllReportYears = await getDocs(
        collection(DB, `Patients/${CheckGR}/Report_Years`)
      );
      const fetchAllPatientData = await getDocs(collection(DB, "Patients"));

      let All_Report_Years = fetchAllReportYears.docs.map((val) => {
        let current_Report_Year = val._document.key.path.segments[8];
        return current_Report_Year;
      });

      let All_Patient_GR = fetchAllPatientData.docs.map((val) => {
        let current_GR = val._document.key.path.segments[6];
        return current_GR;
      });

      if (All_Patient_GR.includes(CheckGR)) {
        if (All_Report_Years.includes(CheckYear)) {
          await deleteDoc(
            doc(DB, `Patients/${CheckGR}/Report_Years`, CheckYear)
          );
          setJsonError("");
          toast.success("Detail Record of the relevant GR Number has deleted");
        } else {
          setJsonError(
            "Record of Report Year of the relevant GR Number isn't found!"
          );
        }
      } else {
        setJsonError("Record of the relevant GR Number isn't found!");
      }
    } catch (error) {
      toast.error("Data not Deleted | ", error);
    }
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
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Delete Detail Entry</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please enter GR Number of a student and respective Report Year
                  of that Student
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
                    DeleteDetailEntryFun()
                  }
                  fullWidth
                  name="Check_GR_Number"
                  variant="standard"
                />
                <TextField
                  autoFocus
                  margin="dense"
                  setJ
                  label="Year"
                  type="text"
                  value={CheckYear}
                  onChange={(e) => setCheckYear(e.target.value)}
                  onKeyUp={(e) =>
                    (e.code == "Enter" || e.code == "NumpadEnter") &&
                    DeleteDetailEntryFun()
                  }
                  fullWidth
                  variant="standard"
                />

                <Typography color={"red"}>{jsonError}</Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel </Button>
                <Button
                  onClick={DeleteDetailEntryFun}
                  variant="contained"
                  sx={{ bgcolor: "red" }}
                >
                  Remove
                  <Delete />
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DeleteDetailEntry;
