import React, { useState, useEffect } from 'react'
import { Box, Typography, TextField, FormControl, OutlinedInput, MenuItem, InputLabel, Select, Radio, FormControlLabel, FormLabel, RadioGroup } from "@mui/material"

const PhysicalSection = ({handleMyClick}) => {
    const [Cleanliness, setCleanliness] = useState("")
    const [Weight, setWeight] = useState("")
    const [Height, setHeight] = useState("")
    const [WeightValue, setWeightValue] = useState("")
    const [OtherWeightValue, setOtherWeightValue] = useState("")
    const [HeightValue, setHeightValue] = useState("")
    const [OtherHeightValue, setOtherHeightValue] = useState("")
    const [Physical_Details, setPhysical_Details] = useState({
        Cleanliness: "",
        Height:"",
        Height_Foot_Inches: "",
        Height_Centimeter: "",
        Weight:"",
        Weight_Kg: "",
        Weight_Lb: "",
    })


    useEffect(() => {
        if (Weight == "Kg") {
            setOtherWeightValue((WeightValue * 2.205).toFixed(3))
            setPhysical_Details({...Physical_Details, Weight_Kg : WeightValue, Weight_Lb : (WeightValue * 2.205).toFixed(3)})
        } else {
            setOtherWeightValue((WeightValue / 2.205).toFixed(3))
            setPhysical_Details({...Physical_Details, Weight_Kg : (WeightValue / 2.205).toFixed(3), Weight_Lb : WeightValue})
        }
    }, [WeightValue])

    useEffect(() => {
        if (Height == "Foot - Inches") {
            if (HeightValue.includes(".")) {
                let Foot_Inches_Array = HeightValue.split(".")
                let Foot = Number(Foot_Inches_Array[0])
                let Inches = Number(Foot_Inches_Array[1])
                let Meter_Centimeter = (Foot * 30.48 + Inches * 2.54).toFixed(3)
                console.log(Foot)
                setOtherHeightValue(Meter_Centimeter ? Meter_Centimeter : 0)
                setPhysical_Details({...Physical_Details, Height_Foot_Inches : `${Foot}' ${Inches}"`, Height_Centimeter : Meter_Centimeter})
            } else {
                let Meter_Centimeter = HeightValue * 30.48
                setOtherHeightValue(Meter_Centimeter)
                setPhysical_Details({...Physical_Details, Height_Foot_Inches : `${HeightValue}' 0"`, Height_Centimeter : `${Meter_Centimeter}`})
            }
        } else {
            let valueInInches = HeightValue / 2.54
            let requiredFeet = Math.floor(valueInInches / 12)
            let requiredInches = (valueInInches - 12 * requiredFeet).toFixed(3)
            let valueInFootInches = (requiredFeet + requiredInches / 10).toFixed(3)
            let arr = valueInFootInches.split(".")
            let foot = arr[0]
            let inch = arr[1]
            // setOtherHeightValue(`${requiredFeet + requiredInches / 10}`)
            setOtherHeightValue(`${foot}' ${inch}''`)
            setPhysical_Details({...Physical_Details, Height_Foot_Inches : `${foot}' ${inch}"`, Height_Centimeter : HeightValue})
        }
    }, [HeightValue])

    const onChangeValue = (e) => {
        setPhysical_Details({ ...Physical_Details, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        

    }, [WeightValue])

    useEffect(() => {
        console.log(Physical_Details)
        handleMyClick(Physical_Details)
    }, [Physical_Details])

    return (
        <>
            <Box
                // bgcolor={"purple"}
            >
                <Typography variant='h3' fontSize={"2vw"} textAlign={"center"}>Physical Information</Typography>
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">General Cleanliness</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="Cleanliness"
                        // // name="row-radio-buttons-group"
                        value={Physical_Details.Cleanliness}
                        onChange={e => onChangeValue(e)}
                    // value={Cleanliness}
                    // onChange={e => { setCleanliness(e.target.value); onChangeValue(e) }}
                    >
                        <FormControlLabel value="Good" control={<Radio />} label="Good" />
                        <FormControlLabel value="Average" control={<Radio />} label="Average" />
                        <FormControlLabel value="Poor" control={<Radio />} label="Poor" />
                    </RadioGroup>
                </FormControl>
            </Box>
            <Box
                // bgcolor={"ButtonShadow"}
                padding={"10px 0"}
                className="space-between"
            >
                <Box>
                    {/* <Typography fontSize={"26px"}>Weight</Typography> */}
                    <FormLabel>Weight</FormLabel>
                    <br />
                    <br />
                    <FormControl sx={{ width: 200 }}>
                        <InputLabel id="demo-multiple-name-label">Weight Unit</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            name='Weight'
                            value={Weight}
                            onChange={(e) => { setWeight(e.target.value); onChangeValue(e) }}
                            input={<OutlinedInput label="Weight Unit" />}
                        >
                            {["Kg", "Pound"].map((name) => (
                                <MenuItem
                                    key={name}
                                    value={name}
                                >
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <br />
                    <br />
                    <TextField id="Weight" sx={{ width: 200 }} value={WeightValue} onChange={(e) => setWeightValue(e.target.value)} label="Weight" variant="outlined" />
                    <br />
                    <br />
                    {/* <Typography>Other unit weight: 424</Typography> */}
                    <FormLabel id='checkWeight'>{Weight == "" ? "" : Weight == "Kg" ? ("Weight in Pound") : "Weight in Kg"} {OtherWeightValue}</FormLabel>
                </Box>
                <Box>
                    {/* <Typography fontSize={"26px"}>Height</Typography> */}
                    <FormLabel>Height</FormLabel>
                    <br />
                    <br />
                    <Box
                    // display={"flex"} flexDirection={"column"} justifyContent={"space-evenly"} flexWrap={"wrap"}
                    >

                        <FormControl sx={{ width: 200 }}>
                            <InputLabel id="demo-multiple-name-label">Height</InputLabel>
                            <Select
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                name='Height'   
                                value={Height}
                                onChange={e => { setHeight(e.target.value); onChangeValue(e) }}
                                input={<OutlinedInput label="Height" />}
                            >
                                {["Foot - Inches", "Meter - Centimeter"].map((name) => (
                                    <MenuItem
                                        key={name}
                                        value={name}
                                    >
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <br />
                        <br />
                        <TextField id="Height" sx={{ width: 200 }} value={HeightValue} onChange={(e) => setHeightValue(e.target.value)} label="Height" variant="outlined" />
                        <br />
                        <br />
                        {/* <Typography>Other unit Height: 354344</Typography 354344</FormLabel>Typography> */}
                        <FormLabel>{Height == "" ? "" : Height == "Foot - Inches" ? ("Height in Meter - Centimeter") : "Height in Foot - Inches"} {OtherHeightValue}</FormLabel>

                        <br />
                        <br />
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default PhysicalSection