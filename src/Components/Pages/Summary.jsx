import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SideBar from "../Sidebar";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import RadialProgress from "../Animations/RadialProgress";
import CircularProgress from "../Animations/CircularProgress";
import { Man, Search, Woman } from "@mui/icons-material";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { DB } from "../../firebase";
import CircularIndeterminate from "../Animations/Loader";
// import Progress from "../Animations/Progress";
ChartJS.register(ArcElement, Tooltip, Legend);

let option = {
  plugins: {
    legend: {
      display: true,
      position: "bottom",
      rtl: true,
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        padding: 20,
      },
    },
  },
};

const Summary = () => {
  const [SearchValue, setSearchValue] = useState("");
  const [Male, setMale] = useState();
  const [Female, setFemale] = useState();
  const [Healthy_Male, setHealthy_Male] = useState();
  const [Stunted_Male, setStunted_Male] = useState();
  const [Underweight_Male, setUnderweight_Male] = useState();
  const [Obese_Male, setObese_Male] = useState();
  const [Healthy_Female, setHealthy_Female] = useState();
  const [Stunted_Female, setStunted_Female] = useState();
  const [Underweight_Female, setUnderweight_Female] = useState();
  const [Obese_Female, setObese_Female] = useState();
  const [Loading, setLoading] = useState(true);
  const [All_Master_Data, setAll_Master_Data] = useState("");
  const [Childs_Data, setChilds_Data] = useState();
  // const [Obese_Childs, setObese_Childs] = useS
  //  const [Stunted_Childs, setStunted_Childs] = useState()
  const [Underweight_Childs, setUnderweight_Childs] = useState();
  const [Gender, setGender] = useState("");

  useEffect(() => {
    fetchedData();
  }, []);

  let All_Report_Data = [];

  const fetchedData = async () => {
    setLoading(true);
    const data = (await getDocs(collection(DB, "Patients"))).docs.map((val) =>
      val.data()
    );

    let all_GR_Array = data.map((val) => val.GR_Number);
    // console.log(data);

    if (SearchValue) {
      for (let i = 0; i < all_GR_Array.length; i++) {
        try {
          let Report_Data = await getDocs(
            collection(DB, `Patients/${all_GR_Array[i]}/Report_Years`)
          );
          let masterfile = data[i];
          let arr = Report_Data.docs.map((val) => {
            return [masterfile, val.data()];
          });
          All_Report_Data.push(arr);

          // console.log(arr)
          // let Current_Report_Data = Report_Data[i]
        } catch (error) {
          console.log("Error", error);
        }
      }
      let uniqueArraysMap = new Map();

      All_Report_Data.forEach((array) => {
        let serializedArray = JSON.stringify(array);
        uniqueArraysMap.set(serializedArray, array);
      });
      let uniqueArrays = Array.from(uniqueArraysMap.values());

      let allData = uniqueArrays.filter((val) => val != "");
      let allfilteredYearData = allData.flatMap((value) =>
        value.filter((val) => val[1].Report_Year == SearchValue)
      );
      setAll_Master_Data(allfilteredYearData);
      setMale(
        allfilteredYearData.filter((val) => val[0].Gender == "male").length
      );
      setFemale(
        allfilteredYearData.filter((val) => val[0].Gender == "female").length
      );
      setHealthy_Male(
        allfilteredYearData
          .filter((val) => val[0].Gender == "male")
          .filter((val) => val[1].BMI_Remark == "Normal").length
      );
      setHealthy_Female(
        allfilteredYearData
          .filter((val) => val[0].Gender == "female")
          .filter((val) => val[1].BMI_Remark == "Normal").length
      );
      setStunted_Male(
        allfilteredYearData
          .filter((val) => val[0].Gender == "male")
          .filter((val) => val[1].BMI_Remark == "Stunted").length
      );
      setStunted_Female(
        allfilteredYearData
          .filter((val) => val[0].Gender == "female")
          .filter((val) => val[1].BMI_Remark == "Stunted").length
      );
      setUnderweight_Male(
        allfilteredYearData
          .filter((val) => val[0].Gender == "male")
          .filter((val) => val[1].BMI_Remark == "Underweight").length
      );
      setUnderweight_Female(
        allfilteredYearData
          .filter((val) => val[0].Gender == "female")
          .filter((val) => val[1].BMI_Remark == "Underweight").length
      );
      setObese_Male(
        allfilteredYearData
          .filter((val) => val[0].Gender == "male")
          .filter((val) => val[1].BMI_Remark == "Obese").length
      );
      setObese_Female(
        allfilteredYearData
          .filter((val) => val[0].Gender == "female")
          .filter((val) => val[1].BMI_Remark == "Obese").length
      );
      // console.log("allfilteredYearData", allfilteredYearData.filter(val => val[0].Gender == "male").filter(val => val[val.length -1][1].BMI_Remark == "Normal"));
      console.log("Year hai");
      // for (let i = 0; i < all_GR_Array.length; i++) {
      //   try {
      //     let Report_Data = (
      //       await getDoc(
      //         doc(DB, `Patients/${all_GR_Array[i]}/Report_Years`, SearchValue)
      //       )
      //     ).data();
      //     // console.log(Report_Data);
      //     setChilds_Data(Report_Data);
      //   } catch (error) {
      //     console.log("errot", error);
      //   }
      // }
    } else {
      console.log("Year nhi hai");
      for (let i = 0; i < all_GR_Array.length; i++) {
        try {
          let Report_Data = await getDocs(
            collection(DB, `Patients/${all_GR_Array[i]}/Report_Years`)
          );
          let masterfile = data[i];
          let arr = Report_Data.docs.map((val) => {
            return [masterfile, val.data()];
          });
          All_Report_Data.push(arr);

          // console.log(arr)
          // let Current_Report_Data = Report_Data[i]
        } catch (error) {
          console.log("Error", error);
        }
      }
      let uniqueArraysMap = new Map();

      All_Report_Data.forEach((array) => {
        let serializedArray = JSON.stringify(array);
        uniqueArraysMap.set(serializedArray, array);
      });
      let uniqueArrays = Array.from(uniqueArraysMap.values());

      let allData = uniqueArrays.filter((val) => val != "");
      setAll_Master_Data(allData);
      console.log("Year nhi hai");
      setMale(allData.filter((val) => val[0][0].Gender == "male").length);
      setFemale(allData.filter((val) => val[0][0].Gender == "female").length);
      setHealthy_Male(
        allData
          .filter((val) => val[0][0].Gender == "male")
          .filter((val) => val[val.length - 1][1].BMI_Remark == "Normal").length
      );
      setHealthy_Female(
        allData
          .filter((val) => val[0][0].Gender == "female")
          .filter((val) => val[val.length - 1][1].BMI_Remark == "Normal").length
      );
      setStunted_Male(
        allData
          .filter((val) => val[0][0].Gender == "male")
          .filter((val) => val[val.length - 1][1].BMI_Remark == "Stunted")
          .length
      );
      setStunted_Female(
        allData
          .filter((val) => val[0][0].Gender == "female")
          .filter((val) => val[val.length - 1][1].BMI_Remark == "Stunted")
          .length
      );
      setUnderweight_Male(
        allData
          .filter((val) => val[0][0].Gender == "male")
          .filter((val) => val[val.length - 1][1].BMI_Remark == "Underweight")
          .length
      );
      setUnderweight_Female(
        allData
          .filter((val) => val[0][0].Gender == "female")
          .filter((val) => val[val.length - 1][1].BMI_Remark == "Underweight")
          .length
      );
      setObese_Male(
        allData
          .filter((val) => val[0][0].Gender == "male")
          .filter((val) => val[val.length - 1][1].BMI_Remark == "Obese").length
      );
      setObese_Female(
        allData
          .filter((val) => val[0][0].Gender == "female")
          .filter((val) => val[val.length - 1][1].BMI_Remark == "Obese").length
      );
      console.log(allData);
    }

    // console.log(All_Master_Data)
    // if (SearchValue) {
    //   setAll_Master_Data(data.filter((val) => val.Year == SearchValue));
    //   setMale(
    //     data
    //       .filter((val) => val.Gender == "male")
    //       .filter((val) => val.Year == SearchValue).length
    //   );
    //   setFemale(
    //     data
    //       .filter((val) => val.Gender == "female")
    //       .filter((val) => val.Year == SearchValue).length
    //   );
    // } else {
    //   // setAll_Master_Data(data.map((val) => val));
    //   // setMale(data.filter((val) => val.Gender == "male").length);
    //   // setFemale(data.filter((val) => val.Gender == "female").length);
    // }
    // setAll_Master_Data(data.filter(val => val.Year == SearchValue));

    // console.log(data.length);
    setLoading(false);
  };

  const filterDetails = () => {};

  const data = {
    labels: ["Female", "Male"],
    datasets: [
      {
        label: "Total",
        data: [Female, Male],
        backgroundColor: ["rgba(255, 99, 132)", "rgba(54, 162, 235)"],
        borderWidth: 0,
      },
    ],
  };
  const Healthy_data = {
    labels: ["Female", "Male"],
    datasets: [
      {
        label: "Total",
        data: [Healthy_Female, Healthy_Male],
        backgroundColor: ["rgba(255, 99, 132)", "rgba(54, 162, 235)"],
        borderWidth: 0,
      },
    ],
  };
  const Stunted_data = {
    labels: ["Female", "Male"],
    datasets: [
      {
        label: "Total",
        data: [Stunted_Female, Stunted_Male],
        backgroundColor: ["rgba(255, 99, 132)", "rgba(54, 162, 235)"],
        borderWidth: 0,
      },
    ],
  };
  const Underweight_data = {
    labels: ["Female", "Male"],
    datasets: [
      {
        label: "Total",
        data: [Underweight_Female, Underweight_Male],
        backgroundColor: ["rgba(255, 99, 132)", "rgba(54, 162, 235)"],
        borderWidth: 0,
      },
    ],
  };
  const Obese_data = {
    labels: ["Female", "Male"],
    datasets: [
      {
        label: "Total",
        data: [Obese_Female, Obese_Male],
        backgroundColor: ["rgba(255, 99, 132)", "rgba(54, 162, 235)"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <>
      <Box display="flex" height={"100vh"} width={"100vw"} overflow={"hidden"}>
        <Box display={"flex"} height={"100vh"} width={"15%"}>
          <SideBar />
        </Box>
        <Box
          // bgcolor={"#aeaeff"}
          width={"85%"}
          height={"100%"}
          className="col y-center bg-color"
          overflow={"scroll"}
          paddingBottom={"175px"}
          // paddingBottom={"50vh"}
        >
          <Box
            className="space-between y-center"
            // bgcolor={"brown"}
            width={"90%"}
          >
            <Typography
              margin={"20px 0"}
              fontSize={"32px"}
              textAlign={"left"}
              width={"90%"}
            >
              Summary
            </Typography>
            <Box className="y-center space-between" width={"42%"}>
              <TextField
                // padding={"20px 0"}
                fontSize={"32px"}
                textAlign={"left"}
                size="small"
                width={"9px"}
                placeholder="Report Year"
                value={SearchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyUp={(e) =>
                  (e.code == "Enter" || e.code == "NumpadEnter") &&
                  fetchedData()
                }
              />
              <Button
                id="theme-btn"
                size="small"
                sx={{ padding: "7px 25px" }}
                variant="contained"
                fontSize="5px"
                onClick={fetchedData}
              >
                <Search />
              </Button>
            </Box>
          </Box>
          <Box
            className="space-between y-center"
            // bgcolor={"brown"}
            width={"90%"}
          >
            <Typography
              margin={"20px 0"}
              fontSize={"18px"}
              textAlign={"left"}
              width={"90%"}
            >
              Childern Assessment Summary for{" "}
              {(All_Master_Data && SearchValue) || "whole Data"}
            </Typography>
            <Button id="theme-btn" variant="contained" sx={{width:"250px"}}> Generate Summary</Button>
          </Box>
          <Box
            // bgcolor={"red"}
            width={"90%"}
            display={"grid"}
            gridTemplateColumns={"repeat(2, 1fr)"}
            columnGap={"100px"}
            rowGap={"100px"}
          >
            <Box
              // bgcolor={"green"}
              height={"350px"}
              className="x-y-center dashboard-grid-box"
              gridColumn={"1 / span 2"}
            >
              <Box width={"40%"} height={"100%"} className="y-center">
                <Doughnut data={data} options={option} />
              </Box>
              <Box
                className="space-around y-center"
                height={"100%"}
                width={"60%"}
              >
                <Box
                  className="col space-evenly y-center"
                  width={"50%"}
                  height={"100%"}
                >
                  <Typography variant="h6" textAlign={"center"}>
                    Total Patients
                  </Typography>
                  {Loading && <CircularIndeterminate size={"4rem"} />}
                  {!Loading && (
                    <Typography variant="h1" textAlign={"center"}>
                      {All_Master_Data && All_Master_Data.length}
                    </Typography>
                  )}
                </Box>
                <Box
                  className="col space-around x-center"
                  height={"70%"}
                  width={"50%"}
                >
                  <Box className="space-around y-center">
                    <Man
                      sx={{
                        // paddingRight: "8rem",
                        color: "rgba(54, 162, 235)",
                        fontSize: "50px",
                      }}
                    />
                    {Loading && <CircularIndeterminate size={"4rem"} />}
                    {!Loading && (
                      <Typography fontSize={"34px"}>{Male}</Typography>
                    )}
                  </Box>
                  <Box className="space-around y-center">
                    <Woman
                      sx={{
                        // paddingRight: "8rem",
                        color: "rgba(255, 99, 132)",
                        fontSize: "50px",
                      }}
                    />
                    {Loading && <CircularIndeterminate size={"4rem"} />}
                    {!Loading && (
                      <Typography fontSize={"34px"}>{Female}</Typography>
                    )}
                  </Box>
                  {/* <Box>
                    <Typography textAlign={"center"} fontSize={"32px"}>
                      Total Reports
                    </Typography>
                    <Typography textAlign={"center"} variant="h1">
                      {Loading && <CircularIndeterminate size={"4rem"} />}
                      {!Loading && (
                        <Typography variant="h1" textAlign={"center"}>
                          {All_Reports_Length}
                        </Typography>
                      )}
                    </Typography>
                  </Box> */}
                </Box>
              </Box>
            </Box>
            <Box
              height={"350px"}
              p={"10px 0 !important"}
              className="dashboard-grid-box col x-y-center"
            >
              <Typography>Healthy Childs</Typography>
              <Box height={"90%"} width={"100%"} className="x-y-center">
                <Box width={"50%"}>
                  <Doughnut
                    data={Healthy_data}
                    options={option}
                    height={"100px !important"}
                  />
                </Box>
                <Box
                  width={"50%"}
                  height={"100%"}
                  padding={"30px"}
                  className="col space-around"
                >
                  <Box height={"50%"} className="col x-y-center">
                    <Typography textAlign={"center"}>Total Patients</Typography>
                    <Typography textAlign={"center"} fontSize={"28px"}>
                      {Healthy_Male + Healthy_Female}
                    </Typography>
                  </Box>
                  <Box className="col space-around" height={"50%"}>
                    <Box className="space-around y-center">
                      <Man
                        sx={{
                          color: "rgba(54, 162, 235)",
                          fontSize: "50px",
                        }}
                      />
                      {Loading && <CircularIndeterminate size={"1rem"} />}
                      {!Loading && (
                        <Typography fontSize={"20px"}>
                          {Healthy_Male}
                        </Typography>
                      )}
                    </Box>
                    <Box className="space-around y-center">
                      <Woman
                        sx={{
                          color: "rgba(255, 99, 132)",
                          fontSize: "50px",
                        }}
                      />
                      {Loading && <CircularIndeterminate size={"2rem"} />}
                      {!Loading && (
                        <Typography fontSize={"20px"}>
                          {Healthy_Female}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              height={"350px"}
              p={"10px 0 !important"}
              className="dashboard-grid-box col x-y-center"
            >
              <Typography>Stunted Childs</Typography>
              <Box height={"90%"} width={"100%"} className="x-y-center">
                <Box width={"50%"}>
                  <Doughnut
                    data={Stunted_data}
                    options={option}
                    height={"100px !important"}
                  />
                </Box>
                <Box
                  width={"50%"}
                  height={"100%"}
                  padding={"30px"}
                  className="col space-around"
                >
                  <Box height={"50%"} className="col x-y-center">
                    <Typography textAlign={"center"}>Total Patients</Typography>
                    <Typography textAlign={"center"} fontSize={"28px"}>
                      {Stunted_Male + Stunted_Female}
                    </Typography>
                  </Box>
                  <Box className="col space-around" height={"50%"}>
                    <Box className="space-around y-center">
                      <Man
                        sx={{
                          color: "rgba(54, 162, 235)",
                          fontSize: "50px",
                        }}
                      />
                      {Loading && <CircularIndeterminate size={"1rem"} />}
                      {!Loading && (
                        <Typography fontSize={"20px"}>
                          {Stunted_Male}
                        </Typography>
                      )}
                    </Box>
                    <Box className="space-around y-center">
                      <Woman
                        sx={{
                          color: "rgba(255, 99, 132)",
                          fontSize: "50px",
                        }}
                      />
                      {Loading && <CircularIndeterminate size={"2rem"} />}
                      {!Loading && (
                        <Typography fontSize={"20px"}>
                          {Stunted_Female}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              height={"350px"}
              p={"10px 0 !important"}
              className="dashboard-grid-box col x-y-center"
            >
              <Typography>Underweight Childs</Typography>
              <Box height={"90%"} width={"100%"} className="x-y-center">
                <Box width={"50%"}>
                  <Doughnut
                    data={Underweight_data}
                    options={option}
                    height={"100px !important"}
                  />
                </Box>
                <Box
                  width={"50%"}
                  height={"100%"}
                  padding={"30px"}
                  className="col space-around"
                >
                  <Box height={"50%"} className="col x-y-center">
                    <Typography textAlign={"center"}>Total Patients</Typography>
                    <Typography textAlign={"center"} fontSize={"28px"}>
                      {Underweight_Male + Underweight_Female}
                    </Typography>
                  </Box>
                  <Box className="col space-around" height={"50%"}>
                    <Box className="space-around y-center">
                      <Man
                        sx={{
                          color: "rgba(54, 162, 235)",
                          fontSize: "50px",
                        }}
                      />
                      {Loading && <CircularIndeterminate size={"1rem"} />}
                      {!Loading && (
                        <Typography fontSize={"20px"}>
                          {Underweight_Male}
                        </Typography>
                      )}
                    </Box>
                    <Box className="space-around y-center">
                      <Woman
                        sx={{
                          color: "rgba(255, 99, 132)",
                          fontSize: "50px",
                        }}
                      />
                      {Loading && <CircularIndeterminate size={"2rem"} />}
                      {!Loading && (
                        <Typography fontSize={"20px"}>
                          {Underweight_Female}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              height={"350px"}
              p={"10px 0 !important"}
              className="dashboard-grid-box col x-y-center"
            >
              <Typography>Obese Childs</Typography>
              <Box height={"90%"} width={"100%"} className="x-y-center">
                <Box width={"50%"}>
                  <Doughnut
                    data={Obese_data}
                    options={option}
                    height={"100px !important"}
                  />
                </Box>
                <Box
                  width={"50%"}
                  height={"100%"}
                  padding={"30px"}
                  className="col space-around"
                >
                  <Box height={"50%"} className="col x-y-center">
                    <Typography textAlign={"center"}>Total Patients</Typography>
                    <Typography textAlign={"center"} fontSize={"28px"}>
                      {Obese_Male + Obese_Female}
                    </Typography>
                  </Box>
                  <Box className="col space-around" height={"50%"}>
                    <Box className="space-around y-center">
                      <Man
                        sx={{
                          color: "rgba(54, 162, 235)",
                          fontSize: "50px",
                        }}
                      />
                      {Loading && <CircularIndeterminate size={"1rem"} />}
                      {!Loading && (
                        <Typography fontSize={"20px"}>{Obese_Male}</Typography>
                      )}
                    </Box>
                    <Box className="space-around y-center">
                      <Woman
                        sx={{
                          color: "rgba(255, 99, 132)",
                          fontSize: "50px",
                        }}
                      />
                      {Loading && <CircularIndeterminate size={"2rem"} />}
                      {!Loading && (
                        <Typography fontSize={"20px"}>
                          {Obese_Female}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            {/* <CircularProgress value={9000}/> */}
            {/* <RadialProgress /> */}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Summary;
