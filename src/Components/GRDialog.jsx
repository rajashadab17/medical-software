import React, { useState } from 'react'
import { Box, Typography, TextField, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material"
import { checkMasterEntryDataAPI } from '../API/Api'


const GRDialog = ({ functionTitle, iconForFunction }) => {

    const [CheckGR, setCheckGR] = useState("")
    const [CheckYear, setCheckYear] = useState("")
    const [open, setOpen] = useState(true);
    const [jsonError, setJsonError] = useState("")

    const loadPatientDetails = async () => {
        console.log("Function called")
        //     const response = await checkMasterEntryDataAPI(CheckGR)
        //     let jsonResponse = await response.json()
        //     if (jsonResponse == "Patient doesn't Exist") {
        //         setJsonError(jsonResponse)
        //     } else {
        //         setJsonError("")
        //         setPatient(jsonResponse)
        //         handleClose()
        //         return Patient
        //     }
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Box>
                <Dialog open={open} onClose={handleClose} >
                    <DialogTitle>Edit Master Entry</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please enter GR Number of a student and also his/her relevant Year of Admission
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="Dialog_GR_Number"
                            label="GR Number"
                            type="text"
                            value={CheckGR}
                            onChange={e => setCheckGR(e.target.value)}
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
                            onChange={e => setCheckYear(e.target.value)}
                            fullWidth
                            variant="standard"
                        />

                        <Typography color={"red"}>
                            {jsonError}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}> Cancel </Button>
                        <Button onClick={loadPatientDetails}>
                            {functionTitle}
                            {iconForFunction}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </>
    )
}

export default GRDialog