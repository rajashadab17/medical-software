import { Box } from '@mui/material'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './Header'
import AddMasterEntry from './Forms/AddMasterEntry'
import EditMasterEntry from './Forms/EditMasterEntry'
import DeleteMasterEntry from './Forms/DeleteMasterEntry'
import AddDetailEntry from './Forms/AddDetailEntry'
import ResetPassword from './Credentials/ResetPassword'
import SideBar from './Sidebar'
import LoginPage from './Credentials/LoginPage'
LoginPage

const Home = () => {
    return (
        <>
            <Box>
                <Box>
                    <Header />
                </Box>
                <Box>
                    <SideBar/>
                    <Box>
                        
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default Home