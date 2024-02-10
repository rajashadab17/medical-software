import React, { useContext, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import PN_logo from "../../Images/PN.png";
import College_logo from "../../Images/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { checkLoginDataAPI, updatePasswordAPI } from "../../API/Api";
import CircularProgress from "@mui/material/CircularProgress";
import CircularIndeterminate from "../Animations/Loader";
import { toast } from "react-toastify";
import { contextData } from "../../Context/Context";
import { DB } from "../../firebase";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      Copyright &copy; Medical Management System {new Date().getFullYear()} -
      Developed By Raja Shadab
    </Typography>
  );
}

const Reset = () => {
  const { Credentials } = useContext(contextData);
  let DB_Master_Password = Credentials.Master_Password;
  let DB_Password = Credentials.Password;

  const [ShowMasterPassword, setShowMasterPassword] = useState(false);
  const [MasterPassword, setMasterPassword] = useState("");
  const [Password, setPassword] = useState("");
  const [PasswordUpdated, setPasswordUpdated] = useState(false);
  const [ShowPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowMasterPassword = () =>
    setShowMasterPassword((show) => !show);

  const UpdatePassword = async (event) => {
    event.preventDefault();
    if (MasterPassword == DB_Master_Password) {
      try {
        await updateDoc(
          doc(collection(DB, `Credentials`), "8dYxqiCaYknmwWHkUmJi"),
          { Password: Password }
        );
        
        toast.success("Your Password has updated!");
        setPasswordUpdated(true);
        setTimeout(() => {
          navigate("/");
        }, 3500);
      } catch (error) {
        toast.error(error);
      }
    } else {
      toast.error("You have entered incorrect Master Password!");
    }
  };

  return (
    <Box
      bgcolor={"navy"}
      height={"100vh"}
      width={"100%"}
      className="x-y-center"
    >
      <Box
        height={"90%"}
        width={"90%"}
        bgcolor={"#00000038"}
        display={"flex"}
        flexDirection={"column"}
        className="y-center space-around"
        borderRadius={"25px"}
      >
        <Box
          width={"100%"}
          height={"100px"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <img src={College_logo} height={"100px"} style={{}} />
          <img src={PN_logo} height={"100%"} style={{}} />
        </Box>
        <Box height={"20%"} flexWrap={"wrap"} className="col space-around">
          <Typography
            variant="h1"
            fontSize={"4vw"}
            color={"white"}
            textAlign={"center"}
          >
            Medical Management Software
          </Typography>
          <Typography
            variant="h1"
            fontSize={"2vw"}
            color={"white"}
            textAlign={"center"}
          >
            Bahria College Karsaz
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "80%",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5" color={"white"}>
            Reset Password
          </Typography>
          <Box
            id="login-box"
            color={"white"}
            noValidate
            sx={{ mt: 1 }}
            position={"relative"}
          >
            <FormControl
              sx={{ m: 1, color: "white" }}
              variant="outlined"
              fullWidth
            >
              <InputLabel htmlFor="Master Password" sx={{ color: "white" }}>
                Master Password
              </InputLabel>
              <OutlinedInput
                required
                fullWidth
                value={MasterPassword}
                onChange={(e) => setMasterPassword(e.target.value)}
                onKeyUp={(e) =>
                  (e.code == "Enter" || e.code == "NumpadEnter") &&
                  UpdatePassword()
                }
                name="Master_Password"
                label="Master Password"
                id="masterpassword"
                sx={{ color: "white" }}
                type={ShowMasterPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowMasterPassword}
                      edge="end"
                    >
                      {ShowMasterPassword ? (
                        <VisibilityOff sx={{ color: "white" }} />
                      ) : (
                        <Visibility sx={{ color: "white" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl
              sx={{ m: 1, color: "white" }}
              variant="outlined"
              fullWidth
            >
              <InputLabel htmlFor="Password" sx={{ color: "white" }}>
                Password
              </InputLabel>
              <OutlinedInput
                required
                fullWidth
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyUp={(e) =>
                  (e.code == "Enter" || e.code == "NumpadEnter") &&
                  UpdatePassword()
                }
                name="Password"
                label="Password"
                id="password"
                sx={{ color: "white" }}
                type={ShowPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {ShowPassword ? (
                        <VisibilityOff sx={{ color: "white" }} />
                      ) : (
                        <Visibility sx={{ color: "white" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Button
              fullWidth
              variant="contained"
              style={{ background: "navy", fontWeight: "bold" }}
              sx={{ mt: 3, mb: 2 }}
              onClick={UpdatePassword}
            >
              {PasswordUpdated ? (
                <CircularIndeterminate color={"white"} />
              ) : (
                "Reset"
              )}
            </Button>
            <Grid container>
              <Grid item xs>
                <NavLink to={"/"} variant="body2" style={{ color: "white" }}>
                  Want to Login
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 4, mb: 2, color: "white" }} />
      </Box>
    </Box>
  );
};

export default Reset;
