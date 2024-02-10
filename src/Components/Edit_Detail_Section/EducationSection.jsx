import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  OutlinedInput,
  MenuItem,
  InputLabel,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { Classes, Sections } from "../Data/DetailEntry";
import { Occupation } from "../Data/MasterEntry";
import { Add } from "@mui/icons-material";

const EducationSection = ({ handleMyClick, data, read, add, edit }) => {
  const [Open, setOpen] = useState(false);
  const [ReportDate, setReportDate] = useState(
    dayjs(new Date().toLocaleDateString())
  );
  const [NewFormat_Date_of_Report, setNewFormat_Date_of_Report] = useState();
  const [Change1, setChange1] = useState(false);
  const [Education_Details, setEducation_Details] = useState({
    Report_Year: "",
    Report_Date: "",
    Class: "",
    Section: "",
  });

  useEffect(() => {
    data && setEducation_Details(data[0] ? data[0] : Education_Details);

  }, [data]);


  const onChangeValue = (e) => {
    setEducation_Details({ ...Education_Details, [e.target.name]: e.target.value});
  };

  useEffect(() => {
    if (add) {
      console.log("rd",ReportDate.toDate().toLocaleDateString())
      setEducation_Details({
        ...Education_Details, Report_Date: Change1 ? NewFormat_Date_of_Report == undefined ? "" : NewFormat_Date_of_Report : (ReportDate).format("MM/DD/YYYY")});
      }
      setEducation_Details({...Education_Details, Report_Date: Change1 ? NewFormat_Date_of_Report == undefined ? "" : NewFormat_Date_of_Report : Education_Details.Report_Date});
  }, [Education_Details.Report_Year, Change1, ReportDate]);

  const handleClose = () => { 
    setOpen(false);
  };

  useEffect(() => {
    console.log(Education_Details)  
    handleMyClick(Education_Details);
  }, [Education_Details]);

  return (
    <>
      <Box>
        <Dialog open={Open} onClose={handleClose}>
          <DialogTitle>Add details to</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="Dialog_GR_Number"
              label="GR Number"
              type="text"
              fullWidth
              name="Check_GR_Number"
              variant="standard"
            />
            <Typography color={"red"}>{/* {jsonError} */}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}> Cancel </Button>
            <Button
            >
              <Add />
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Box
        margin={"auto"}
        width={"80%"}
        // bgcolor={"green"}
        // margin={"50px 0 20px 0"}
      >
        <Typography
          variant="h3"
          fontSize={"2vw"}
          textAlign={"center"}
          margin={"10px 0"}
        >
          Education Information
        </Typography>
        <Box
          display={"flex"}
          flexWrap={"wrap"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <FormControl sx={{ width: 200 }}>
            <InputLabel id="demo-multiple-name-label">Class</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              name="Class"
              value={Education_Details.Class}
              onChange={(e) => onChangeValue(e)}
              input={<OutlinedInput label="Class" />}
            >
              {Classes.map((classs) => (
                <MenuItem key={classs} value={classs}>
                  {classs}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* <Button variant="contained" onClick={() => setOpen(true)}>
            <Add />
          </Button> */}
          <FormControl sx={{ width: 200 }}>
            <InputLabel id="demo-multiple-name-label">Section</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              name="Section"
              value={Education_Details.Section}
              onChange={(e) => onChangeValue(e)}
              input={<OutlinedInput label="Section" />}
            >
              {Sections.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id="Year"
            name="Report_Year"
            sx={{ width: 200 }}
            value={Education_Details.Report_Year}
            onChange={(e) => {onChangeValue(e); setChange1(true)}}
            label="Year"
            variant="outlined"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]} sx={{ width: 200 }}>
              <DatePicker
                margin="normal"
                label="Report Date"
                name="Report_Date"
                // value={ReportDate}
                value={add ? ReportDate : dayjs(Education_Details.Report_Date)}
                // value={dayjs(Education_Details.Report_Date) ? dayjs(Education_Details.Report_Date): ReportDate}
                onChange={(newDate) => {
                  setReportDate(newDate);
                  setChange1(true);
                  setNewFormat_Date_of_Report(
                    `${newDate.$M + 1}/${newDate.$D}/${newDate.$y}`
                  );
                }}
                format="DD/MM/YYYY"
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>
      </Box>
    </>
  );
};

export default EducationSection;
