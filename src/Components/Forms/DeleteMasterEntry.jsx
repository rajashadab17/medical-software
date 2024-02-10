import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Delete, MedicalServicesOutlined, Search } from "@mui/icons-material";
import { deletePatientDataAPI } from "../../API/Api";
import Header from "../Header";
import SideBar from "../Sidebar";
import { toast } from "react-toastify";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { DB } from "../../firebase";

const DeleteMasterEntry = () => {
  useEffect(() => {
    document.title = "Delete Master Entry"
  }, [])
  const [open, setOpen] = useState(true);
  const [CheckGR, setCheckGR] = useState("");
  const [CheckYear, setCheckYear] = useState("");
  const [jsonError, setJsonError] = useState("");

  const DeleteMasterEntry = async () => {
    const CollectionReference = collection(DB, "Patients");
    const data = await getDocs(CollectionReference);
    let arr = data.docs.map((value, index) => {
      let allGr = value.data().GR_Number;
      let allYear = value.data().Year;
      if (allGr == CheckGR && allYear == CheckYear) {
        return {
          status: true,
          data: value.data(),
        };
      }
    });

    let newArr = arr.filter((val) => val !== undefined);
    if (newArr.length != 0) {
      setJsonError("");

      let deletedPatientData = newArr[0].data;
      await setDoc(
        doc(DB, "DeletedPatients", `${deletedPatientData.GR_Number}`),
        deletedPatientData
      );
      await deleteDoc(doc(DB, "Patients", `${deletedPatientData.GR_Number}`));

      toast.success("Patient's Master Data has been deleted successfully!");
    } else {
      setJsonError("Record not found!");
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
              <DialogTitle>Delete Master Entry</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please enter GR Number of a student and also his/her relevant
                  Year of Admission to remove a particular Student
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="Dialog_GR_Number"
                  label="GR Number"
                  type="text"
                  value={CheckGR}
                  onChange={(e) => setCheckGR(e.target.value)}
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
                  fullWidth
                  variant="standard"
                />

                <Typography color={"red"}>{jsonError}</Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel </Button>
                <Button
                  onClick={DeleteMasterEntry}
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

export default DeleteMasterEntry;
