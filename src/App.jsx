import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import "./Progress.css";
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import AddDetailEntry from "./Components/Forms/EditDetailEntry_Old";
import AddMasterEntry from "./Components/Forms/AddMasterEntry_2";
import EditMasterEntry from "./Components/Forms/EditMasterEntry";
import DeleteMasterEntry from "./Components/Forms/DeleteMasterEntry";
import AddDetailEntry from "./Components/Forms/AddDetailEntry";
import ResetPassword from "./Components/Credentials/ResetPassword";
import LoginPage from "./Components/Credentials/LoginPage";
import HealthRecord from "./Components/HealthRecord";
import Report from "./Components/Report";
import EditDetailEntry from "./Components/Forms/EditDetailEntry";
import DeleteDetailEntry from "./Components/Forms/DeleteDetailEntry";
import Dashboard from "./Components/Pages/Dashboard";
import Health_Report from "./Components/Pages/Health_Report";
import Footer from "./Components/Footer";
import About from "./Components/Pages/About";
import Contact from "./Components/Pages/Contact";
import Summary from "./Components/Pages/Summary";
import Status_Search from "./Components/Pages/Status_Search";
import GrowthTable from "./Components/Pages/GrowthTable";
import BMI_Calculator from "./Components/Pages/BMI_Calculator";
import Boys_Chart from "./Components/Pages/Boys_Chart";
import Girls_Chart from "./Components/Pages/Girls_Chart";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose={"2000"} />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/health-record" element={<HealthRecord />} />
          <Route path="/health-report" element={<Health_Report/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/status-search" element={<Status_Search/>} />
          <Route path="/summary" element={<Summary/>} />
          <Route path="/growth-table" element={<GrowthTable/>} />
          <Route path="/bmi-calculator" element={<BMI_Calculator/>} />
          <Route path="/boys-chart" element={<Boys_Chart/>} />
          <Route path="/girls-chart" element={<Girls_Chart/>} />
          <Route path="/add-master-entry" element={<AddMasterEntry />} />
          <Route path="/edit-master-entry" element={<EditMasterEntry />} />
          <Route path="/add-detail-entry" element={<AddDetailEntry />} />
          <Route path="/edit-detail-entry" element={<EditDetailEntry />} />
          <Route path="/delete-master-entry" element={<DeleteMasterEntry />} />
          <Route path="/delete-detail-entry" element={<DeleteDetailEntry />} />
          <Route path="/report-pdf/:id" element={<Report />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
};

export default App;
