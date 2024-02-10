import React, { useEffect, useState } from 'react'
import { Box, Typography, TextField, FormControl, OutlinedInput, MenuItem, InputLabel, Select, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material"
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs, } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs'
import { Classes, Sections } from '../Data/DetailEntry';
import { Occupation } from '../Data/MasterEntry';
import { Add } from '@mui/icons-material';

const EducationSection = ({ handleMyClick }) => {
    const [Open, setOpen] = useState(false)
    const [ReportDate, setReportDate] = useState(dayjs(new Date().toLocaleDateString()))
    const [Education_Details, setEducation_Details] = useState({
        Report_Year: "",
        Report_Date: "",
        Class: "",
        Section: ""
    })
    const onChangeValue = (e) => {
        setEducation_Details({ ...Education_Details, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        setEducation_Details({ ...Education_Details, Report_Date: `${ReportDate.$M + 1}/${ReportDate.$D}/${ReportDate.$y}` })
    }, [ReportDate])

    useEffect(() => {
        handleMyClick(Education_Details)
    }, [Education_Details])

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Box>
                <Dialog open={Open} onClose={handleClose} >
                    <DialogTitle>Add details to</DialogTitle>
                    <DialogContent>
                        <DialogContentText>

                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="Dialog_GR_Number"
                            label="GR Number"
                            type="text"
                            // value={CheckGR}e.code == "NumpadEnter") && loadPatientDetails()}
                            // onKeyUp={(e) => console.log(e.code)}
                            fullWidth
                            name="Check_GR_Number"
                            variant="standard"
                        />
                        <Typography color={"red"}>
                            {/* {jsonError} */}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleClose}
                        > Cancel </Button>
                        <Button
                        //   onClick={loadPatientDetails}
                        >
                            <Add />
                            {/* <Search /> */}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
            <Box
                margin={"50px 0 20px 0"}
            // bgcolor={"red"}
            >
                <Typography variant='h3' fontSize={"2vw"} textAlign={"center"} margin={"10px 0"}>Education Information</Typography>
                <Box display={"flex"} flexWrap={"wrap"} justifyContent={"space-evenly"} alignItems={"center"}>
                    <FormControl sx={{ width: 200 }}>
                        <InputLabel id="demo-multiple-name-label">Class</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            name='Class'
                            value={Education_Details.Class}
                            onChange={e => onChangeValue(e)}
                            input={<OutlinedInput label="Class" />}
                        >
                            {Classes.map((classs) => (
                                <MenuItem
                                    key={classs}
                                    value={classs}
                                >
                                    {classs}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button variant='contained' onClick={() => setOpen(true)}>
                        <Add />
                    </Button>
                    <FormControl sx={{ width: 200 }}>
                        <InputLabel id="demo-multiple-name-label">Section</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            name='Section'
                            value={Education_Details.Section}
                            onChange={e => onChangeValue(e)}
                            input={<OutlinedInput label="Section" />}
                        >
                            {Sections.map((name) => (
                                <MenuItem
                                    key={name}
                                    value={name}
                                >
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField id="Year"
                        name='Report_Year'
                        sx={{ width: 200 }}
                        value={Education_Details.Report_Year}
                        onChange={e => onChangeValue(e)}
                        label="Year" variant="outlined" />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']} sx={{ width: 200 }}>
                            <DatePicker
                                margin="normal"
                                label="Report Date"
                                name="Report_Date"
                                value={ReportDate}
                                onChange={(newDate) => {
                                    setReportDate(newDate);
                                }}
                                format='DD/MM/YYYY'
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </Box>
            </Box>
        </>
    )
}

export default EducationSection