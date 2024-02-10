import React, { createContext, useState } from 'react'

export const contextData = createContext()

const Context = ({ childern }) => {
    const [currentPatientData, setCurrentPatientData] = useState({});
    const [Credentials, setCredentials] = useState({
        Master_Password:"",
        Password:""
    })
    const [Obj, setObj] = useState({
        PatientYear:"",
        PatientGR:""
    })

    const [LogedIn, setLogedIn] = useState(false)



    return (
        <contextData.Provider value={{
            currentPatientData,
            setCurrentPatientData,
            Credentials,
            setCredentials,
            Obj,
            setObj,
            LogedIn, 
            setLogedIn
        }}>
            {childern}
        </contextData.Provider>
    )
}

export default Context