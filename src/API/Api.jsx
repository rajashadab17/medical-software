const URL = "http://localhost:9000"

export const postDataAPI = async (data) => {
    try {
        try {
            await fetch(`${URL}/postData`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
        } catch (error) {
            console.log("Oops! Data isn't uploaded!", error)
        }

    } catch (error) {
        console.log("Error in PostData API", error)
    }
}
export const updatePasswordAPI = async (ResetData, Master_Password) => {
    try {
        try {
            return await fetch(`${URL}/update-password/${Master_Password}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ResetData)
            });
        } catch (error) {
            console.log("Oops! Data isn't uploaded!", error)
        }

    } catch (error) {
        console.log("Error in updatePassword API", error)
    }
}
export const checkLoginDataAPI = async (Password) => {
    try {
        try {
            return await fetch(`${URL}/auth-login-data/${Password}`);
        } catch (error) {
            console.log("Oops! Data has not fetched!", error)
        }

    } catch (error) {
        console.log("Error in Check Login Data API", error)
    }
}

export const checkMasterEntryDataAPI = async (GR_Number) => {
    try {
        try {
            return await fetch(`${URL}/checkMasterEntryData/${GR_Number}`);
        } catch (error) {
            console.log("Oops! Data has not fetched!", error)
        }

    } catch (error) {
        console.log("Error in Check Master Entry Data API", error)
    }
}

export const getAllPatientDataAPI = async () => {
    try {
        try {
            return await fetch(`${URL}/getAllPatientData`);
        } catch (error) {
            console.log("Oops! Data has not fetched!", error)
        }

    } catch (error) {
        console.log("Error in Check Master Entry Data API", error)
    }
}

export const editPatientDataAPI = async (Patient, GR_Number) => {
    // console.log("Started")
    try {
        return await fetch(`${URL}/update-entry/${GR_Number}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Patient)
        });

    } catch (error) {
        return console.log("Error while calling edit user api || ", error)
    }
}

export const deletePatientDataAPI = async (GR_Number) => {
    try {
        return await fetch(`${URL}/delete-entry/${GR_Number}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            }
        });
    } catch (error) {
        console.log("Error while deleting user || ",error)
    }
}