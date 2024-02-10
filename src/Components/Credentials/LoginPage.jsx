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
import CircularProgress from "@mui/material/CircularProgress";
import CircularIndeterminate from "../Animations/Loader";
import { toast } from "react-toastify";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { DB } from "../../firebase";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { contextData } from "../../Context/Context";

const Copyright = (props) => {
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
};

const LoginPage = () => {
  const [Password, setPassword] = useState("");
  const [Login, setLogin] = useState(false);
  const navigate = useNavigate();
  const [ShowPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const { Credentials, setCredentials, setLogedIn } = useContext(contextData);

  const fetchCredentials = async () => {
    try {
      const CollectionReference = collection(DB, "Credentials");
      const data = await getDocs(CollectionReference);
      let DB_Master_Password = data.docs[0].data().Master_Password;
      let DB_Password = data.docs[0].data().Password;
      setCredentials({
        ...Credentials,
        Master_Password: DB_Master_Password,
        Password: DB_Password,
      });
    } catch (error) {
      console.log("Error", error);
    }
  };
  useEffect(() => {
    fetchCredentials();
  }, []);
  console.log("Login", Credentials);
  const handleLogin = async (event) => {
    try {
      let DB_Password = Credentials.Password;
      if (Password == DB_Password) {
        setLogin(true);
        setLogedIn(true)
        toast.success("You have successfully logedin");
        setTimeout(() => {
          navigate("/dashboard");
        }, 4000);
      } else {
        toast.error("You have entered Incorret Password!");
      }
    } catch (error) {
      toast.error("Error in Handle Login", error);
    }
  };

  return (
    <Box
      bgcolor={"navy"}
      // bgcolor={"rgb(10,12,62)"}
      // bgcolor={"#C0DCF4"}
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
          <img src={College_logo} height={"100px"} style={{}} color="red" />
          <img src={PN_logo} height={"100%"} style={{}} color="red" />
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
            Login
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
              <InputLabel
                htmlFor="outlined-adornment-password"
                sx={{ color: "white" }}
              >
                Password
              </InputLabel>
              <OutlinedInput
                required
                fullWidth
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyUp={(e) =>
                  (e.code == "Enter" || e.code == "NumpadEnter") &&
                  handleLogin()
                }
                name="Password"
                label="Password"
                id="outlined-adornment-password"
                sx={{ color: "white" }}
                type={ShowPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
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
              onClick={handleLogin}
            >
              {Login ? <CircularIndeterminate color={"white"} /> : "Login"}
            </Button>
            <Grid container>
              <Grid item xs>
                <NavLink
                  to="/reset-password"
                  variant="body2"
                  style={{ color: "white" }}
                >
                  Reset password?
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

export default LoginPage;
