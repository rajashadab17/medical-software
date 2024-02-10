import { Box, Button, Typography } from '@mui/material'
// import { jsPDF } from "jspdf"
// import "jspdf-autotable"
import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { checkMasterEntryDataAPI } from '../API/Api'
// import { useReactToPrint } from "react-to-print"
// import { Line } from "react-chartjs-2";
// import Chart from "chart.js/auto";
// import { CategoryScale } from "chart.js";

const Report = () => {

    const [Report, setReport] = useState({})

    const componentPDF = useRef()
    // const exportPdf = async () => {
    //     const doc = new jsPDF("portrait", "pt", "A4");
    //     doc.html(document.querySelector("#my-report")).then(() => {
    //         doc.save("Report.pdf")
    //     })
    //     // doc.addPage("A4", "portrait")
    //     // doc.save("Report.pdf")
    // };

    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "Report.pdf",
        onAfterPrint: "PDF Saved"
    })

    const { id } = useParams()
    console.log(id)

    useEffect(() => {
        getPatientReport()
    }, [])

    const getPatientReport = async () => {
        try {
            let response = await checkMasterEntryDataAPI(id)
            let jsonReponse = await response.json()
            setReport(jsonReponse)
            // console.log(Report)
        } catch (error) {
            console.log("Patient's report doesnot fetched!")
        }
    }

    const data = {
        labels: [1, 2, 3, 4, 5, 6, 8, 9],
        datasets: [
            {
                label: "Total Distance Covered",
                backgroundColor: "rgba(24, 161, 205,0.2)",
                borderColor: "rgb(29,129,162)",
                data: [10, 20, 50],
                fill: true
            }
        ],
    };

    let options = {
        plugins: {
            title: {
                display: true,
                text: "Name",
                position: "bottom"
            }
        }
    }
    return (
        <>
            <Box padding={"10%"}>

                <Box textAlign={"right"} margin={"15px 0"}>

                    <Button onClick={generatePDF} variant='contained' >Export Report</Button>
                </Box>
                <div ref={componentPDF}>
                    <div id="my-report">
                        <Box width={"100%"} bgcolor={"red"} textAlign={"right"}>
                            <Typography textAlign={"right"} margin={"10px 0"}>{new Date().getDate()} </Typography>
                        </Box>
                        <Typography textAlign={"center"} margin={"10px 0"}>Medical Report</Typography>
                        {/* <Line data={data} options={options} /> */}
                        <Box >
                            <Box>
                                <div className="y-center gr-detail">
                                    <h3>Student GR Number</h3>
                                    <p id='medical-report-GR_Number'>{Report.GR_Number == undefined || Report.GR_Number == "" ? "N/A" : Report.GR_Number}</p>
                                </div>
                                <div className='y-center'>
                                    <h3>Name</h3>
                                    <p id='medical-report-Student_Name'>{Report.Student_Name == undefined || Report.Student_Name == "" ? "N/A" : Report.Student_Name}</p>
                                </div>
                                <div className='y-center'>
                                    <h3>Gender</h3>
                                    <p id='medical-report-Gender'>{Report.Gender == undefined || Report.Gender == "" ? "N/A" : Report.Gender}</p>
                                </div>
                                <div className='y-center'>
                                    <h3>Name of Father / Gaurdian</h3>
                                    <p id='medical-report-Name_of_Parent_Guardian'>{Report.Name_of_Parent_Guardian == undefined || Report.Name_of_Parent_Guardian == "" ? "N/A" : Report.Name_of_Parent_Guardian}</p>
                                </div>
                                <div className='y-center'>
                                    <h3>Occupation of Parent / Gaurdian</h3>
                                    <p id='medical-report-Occupation_of_Parent_Guardian'>{Report.Occupation_of_Parent_Guardian == undefined || Report.Occupation_of_Parent_Guardian == "" ? "N/A" : Report.Occupation_of_Parent_Guardian}</p>
                                </div>
                                <div className='y-center'>
                                    <h3>Year</h3>
                                    <p id='medical-report-Year'>{Report.Year == undefined || Report.Year == "" ? "N/A" : Report.Year}</p>
                                </div>
                                <div className='y-center'>
                                    <h3>Date of Admission</h3>
                                    <p id='medical-report-Date_of_Admission'>{Report.Date_of_Admission == undefined || Report.Date_of_Admission == "" ? "N/A" : Report.Date_of_Admission}</p>
                                </div>
                                <div className='y-center'>
                                    <h3>Date of Birth</h3>
                                    <p id='medical-report-Date_of_Birth'>{Report.Date_of_Birth == undefined || Report.Date_of_Birth == "" ? "N/A" : Report.Date_of_Birth}</p>
                                </div>
                                <div className='y-center'>
                                    <h3>Date of Leaving College</h3>
                                    <p id='medical-report-Date_of_Leaving_College'>{Report.Date_of_Leaving_College == undefined || Report.Date_of_Leaving_College == "" ? "N/A" : Report.Date_of_Leaving_College}</p>
                                </div>
                                <div className='y-center'>
                                    <h3>Blood Group</h3>
                                    <p id='medical-report-Blood_Group'>{Report.Blood_Group == undefined || Report.Blood_Group == "" ? "N/A" : Report.Blood_Group}</p>
                                </div>
                                <div className='y-center'>
                                    <h3>Residential Address</h3>
                                    <p id='medical-report-Residential_Address'>{Report.Residential_Address == undefined || Report.Residential_Address == "" ? "N/A" : Report.Residential_Address}</p>
                                </div>
                            </Box>
                            <Box>
                                <div className='y-center'>
                                    <h3>Residential Contact Number</h3>
                                    <p id='medical-report-Residential_Contact_Number'>{Report.Residential_Contact_Number == undefined || Report.Residential_Contact_Number == "" ? "N/A" : Report.Residential_Contact_Number}</p>
                                </div>
                                <div className='y-center'>
                                    <h3>Office Contact Number</h3>
                                    <p id='medical-report-Office_Contact_Number'>{Report.Office_Contact_Number == undefined || Report.Office_Contact_Number == "" ? "N/A" : Report.Office_Contact_Number}</p>
                                </div>
                                <div className='y-center'>
                                    <h3>Email Address</h3>
                                    <p id='medical-report-Email_Address'>{Report.Email_Address == undefined || Report.Email_Address == "" ? "N/A" : Report.Email_Address}</p>
                                </div>
                                <div className='y-center'>
                                    <h3>Remarks</h3>
                                    <p id='medical-report-Remarks'>{Report.Remarks == undefined || Report.Remarks == "" ? "N/A" : Report.Remarks}</p>
                                </div>
                                <div className='y-center'>
                                    <h3>Class Standard</h3>
                                    <p id='medical-report-Class_Standard'>{Report.Class_Standard == undefined || Report.Class_Standard == "" ? "N/A" : Report.Class_Standard}</p>
                                </div>
                                <div className='y-center'>
                                    <h3>Section</h3>
                                    <p id='medical-report-Section'>{Report.Section == undefined || Report.Section == "" ? "N/A" : Report.Section}</p>
                                </div>
                                <div className='y-center'>
                                    <h3>Detailed Date</h3>
                                    <p id='medical-report-Detailed_Date'>{Report.Detailed_Date == undefined || Report.Detailed_Date == "" ? "N/A" : Report.Detailed_Date}</p>
                                </div>
                                <div className='y-center'>
                                    <h3>Detailed Year</h3>
                                    <p id='medical-report-Detailed_Year'>{Report.Detailed_Year == undefined || Report.Detailed_Year == "" ? "N/A" : Report.Detailed_Year}</p>
                                </div>
                                <div className='y-center'>
                                    <h3>Cleanliness</h3>
                                    <p id='medical-report-Cleanliness'>{Report.Cleanliness == undefined || Report.Cleanliness == "" ? "N/A" : Report.Cleanliness}</p>
                                </div>
                                <div className='y-center'>
                                    <h3>Weight</h3>
                                    <p id='medical-report-Weight'>{Report.Weight == undefined || Report.Weight == "" ? "N/A" : Report.Weight}</p>
                                </div>
                                <div className='y-center'>
                                    <h3>Height</h3>
                                    <p id='medical-report-Height'>{Report.Height == undefined || Report.Height == "" ? "N/A" : Report.Height}</p>
                                </div>
                            </Box>
                        </Box>
                    </div>
                </div>
            </Box>
        </>
    )
}

export default Report
