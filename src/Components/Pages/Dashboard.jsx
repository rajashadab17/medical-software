import { Man, Woman } from "@mui/icons-material";
import { Box, CircularProgress, Typography } from "@mui/material";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { Days, Months } from "../Data/Date";
import SideBar from "../Sidebar";
import { DB } from "../../firebase";

ChartJS.register(ArcElement, Tooltip, Legend);

let option = {
  responsive: true,
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

const Dashboard = () => {
  const [AllPatients, setAllPatients] = useState();
  const [Male, setMale] = useState();
  const [Female, setFemale] = useState();
  const [Loading, setLoading] = useState(true);
  const [Hour, setHour] = useState();
  const [Minutes, setMinutes] = useState();
  const [Seconds, setSeconds] = useState();
  const current_Year = new Date().getFullYear();
  const current_Month = new Date().getMonth();
  let All_Reports = [];
  const [All_Reports_Length, setAll_Reports_Length] = useState();
  const [Jan_Data, setJan_Data] = useState();
  const [Feb_Data, setFeb_Data] = useState();
  const [March_Data, setMarch_Data] = useState();
  const [April_Data, setApril_Data] = useState();
  const [May_Data, setMay_Data] = useState();
  const [June_Data, setJune_Data] = useState();
  const [July_Data, setJuly_Data] = useState();
  const [Aug_Data, setAug_Data] = useState();
  const [Sept_Data, setSept_Data] = useState();
  const [Oct_Data, setOct_Data] = useState();
  const [Nov_Data, setNov_Data] = useState();
  const [Dec_Data, setDec_Data] = useState();
  const [ar, setar] = useState();

  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  let CurrentMonthOption = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        position: "bottom",
        text: Months[current_Month],
      },
    },
  };

  let MonthsOption = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        position: "bottom",
        text: current_Year,
      },
    },
  };

  let DaysInMonth = new Date(current_Year, current_Month + 1, 0).getDate();
  let allDaysInMonth = [];
  for (let i = 1; i <= DaysInMonth; i++) {
    allDaysInMonth.push(i);
  }

  useEffect(() => {
    AllData();
  }, []);

  setInterval(() => {
    setHour(new Date().getHours());
    setMinutes(new Date().getMinutes());
    setSeconds(new Date().getSeconds());
  }, 1000);
  const AllData = async () => {
    try {
      let response = await getDocs(collection(DB, `Patients`));
      let data = response.docs.map((val) => val.data());
      setAllPatients(data);
      let a = AllPatients;
      setMale(data.filter((val) => val.Gender == "male").length);
      setFemale(data.filter((val) => val.Gender == "female").length);
      setJan_Data(
        data.filter((val) =>
          Months[val.Time.toDate().getMonth()].includes("Jan")
        ).length
      );
      setFeb_Data(
        data.filter((val) =>
          Months[val.Time.toDate().getMonth()].includes("Feb")
        ).length
      );
      setMarch_Data(
        data.filter((val) =>
          Months[val.Time.toDate().getMonth()].includes("March")
        ).length
      );
      setApril_Data(
        data.filter((val) =>
          Months[val.Time.toDate().getMonth()].includes("April")
        ).length
      );
      setMay_Data(
        data.filter((val) =>
          Months[val.Time.toDate().getMonth()].includes("May")
        ).length
      );
      setJune_Data(
        data.filter((val) =>
          Months[val.Time.toDate().getMonth()].includes("June")
        ).length
      );
      setJuly_Data(
        data.filter((val) =>
          Months[val.Time.toDate().getMonth()].includes("July")
        ).length
      );
      setAug_Data(
        data.filter((val) =>
          Months[val.Time.toDate().getMonth()].includes("Aug")
        ).length
      );
      setSept_Data(
        data.filter((val) =>
          Months[val.Time.toDate().getMonth()].includes("Sept")
        ).length
      );
      setOct_Data(
        data.filter((val) =>
          Months[val.Time.toDate().getMonth()].includes("Oct")
        ).length
      );
      setNov_Data(
        data.filter((val) =>
          Months[val.Time.toDate().getMonth()].includes("Nov")
        ).length
      );
      setDec_Data(
        data.filter((val) =>
          Months[val.Time.toDate().getMonth()].includes("Dec")
        ).length
      );

      let Current_Month_Data = data
        .filter((val) =>
          Months[val.Time.toDate().getMonth()].includes(
            Months[new Date().getMonth()]
          )
        )
        .sort((a, b) => a.Time.toDate().getDate() - b.Time.toDate().getDate());

      let Current_Month_Data_Date = Current_Month_Data.map((v) =>
        v.Time.toDate().getDate()
      );

      let arr = [];
      const countDuplicates = (numbers) => {
        const countMap = {};

        for (const number of numbers) {
          if (!countMap[number]) {
            countMap[number] = 1;
          } else {
            countMap[number]++;
          }
        }

        const duplicatesArray = [];

        for (const number in countMap) {
          if (countMap[number] > 1) {
            duplicatesArray.push({
              number: parseInt(number),
              count: countMap[number],
            });
          }
        }

        return duplicatesArray;
      };
      const duplicatesArray = countDuplicates(Current_Month_Data_Date);
      let DuplicateNumbers = [];

      for (const duplicateInfo of duplicatesArray) {
        DuplicateNumbers.push({
          Number: duplicateInfo.number,
          Times: duplicateInfo.count,
        });
      }

      let DuplicateNumbers_Number = DuplicateNumbers.map((val) => val.Number);
      let DuplicateNumbers_Times = DuplicateNumbers.map((val) => val.Times);

      allDaysInMonth.map((monthDay, monthDayIndex) => {
        if (Current_Month_Data_Date.includes(monthDay)) {
          if (DuplicateNumbers_Number.includes(monthDay)) {
            let indexofIncludedNumInDuplicateNumbers =
              DuplicateNumbers_Number.indexOf(monthDay);
            let timerepeatedofincludeNumber =
              DuplicateNumbers_Times[indexofIncludedNumInDuplicateNumbers];

            arr.push(timerepeatedofincludeNumber);
          } else {
            arr.push(1);
          }
        } else {
          arr.push(null);
        }
      });

      setar(arr);
      let all_Patients_GR = data.map((v) => v.GR_Number);
      all_Patients_GR.map(async (value, index) => {
        try {
          let response2 = await getDocs(
            collection(DB, `Patients/${value}/Report_Years`)
          );
          let data2 = response2.docs.map((val) => val.data());
          // All_Reports = [...All_Reports, data2];
          All_Reports.push(data2);
          // console.log(data2)
          let f1 = All_Reports.filter((v) => v != "");
          const areObjectsEqual = (obj1, obj2) => {
            return JSON.stringify(obj1) === JSON.stringify(obj2);
          };

          const uniqueArray = f1.filter((obj, index, self) => {
            return self.findIndex((o) => areObjectsEqual(o, obj)) === index;
          });
          console.log(
            "All_Reports",
            uniqueArray
              .map((v) => v.length)
              .reduce((a, b) => {
                return a + b;
              })
          );
          setAll_Reports_Length(
            uniqueArray
              .map((v) => v.length)
              .reduce((a, b) => {
                return a + b;
              })
          );
        } catch (error) {
          console.log("map err", error);
        }
      });

      // for (let i = 0; i <= all_Patients_GR.length -1; i++) {
      //   let response2 = await getDocs(
      //     collection(DB, `Patients/${all_Patients_GR[i]}/Report_Years`)
      //   );
      //   let data2 = response2.docs.map((val) => val.data());
      //   All_Reports.push(data2.length);
      // }
      // console.log(all_Patients_GR.length);
      // console.log("All_Reports.length", All_Reports.length);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log("All_Reports", All_Reports);

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

  const CurrentMonthData = {
    labels: allDaysInMonth,
    datasets: [
      {
        label: "Patients Registered",
        data: ar,
        backgroundColor: "rgba(255, 99, 132)",
      },
    ],
  };
  const MonthsData = {
    labels: Months.map((v) => v.slice(0, 3)),
    datasets: [
      {
        label: "Patients Registered",
        data: [
          Jan_Data,
          Feb_Data,
          March_Data,
          April_Data,
          May_Data,
          June_Data,
          July_Data,
          Aug_Data,
          Sept_Data,
          Oct_Data,
          Nov_Data,
          Dec_Data,
        ],
        backgroundColor: "rgb(75, 192, 192)",
      },
    ],
  };

  return (
    <>
      <Box display="flex" height={"100vh"} width={"100vw"} overflow={"hidden"}>
        <Box display={"flex"} height={"100vh"} width={"17%"}>
          <SideBar />
        </Box>
        <Box
          // bgcolor={"#aeaeff"}
          width={"83%"}
          height={"100%"}
          className="col y-center bg-color"
          overflow={"scroll"}
          padding={"0 0 1750px 0!important"}
          boxSizing={"border-box"}
        >
          <Typography
            margin={"20px 0"}
            fontSize={"48px"}
            textAlign={"left"}
            width={"90%"}
          >
            Dashboard
          </Typography>
          <Box className="parent" height={"90%"} width={"90%"}>
            <Box
              className="dashboard-grid-box x-y-center"
              sx={{ gridColumn: "1/ span 2" }}
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
                  {Loading && <CircularProgress size={"1rem"} />}
                  {!Loading && (
                    <Typography variant="h1" textAlign={"center"}>
                      {AllPatients.length}
                    </Typography>
                  )}
                </Box>
                <Box
                  className="col space-around x-center"
                  height={"100%"}
                  width={"50%"}
                  // bgcolor={"red"}
                >
                  <Box
                    className="col space-evenly y-center"
                    // bgcolor={"blue"}
                    width={"100%"}
                    height={"50%"}
                  >
                    <Typography textAlign={"center"}>Total Reports</Typography>
                    {Loading && <CircularProgress size={"1rem"} />}
                      {!Loading && (
                        <Typography variant="h1" fontSize={"42px"} textAlign={"center"}>
                          {All_Reports_Length}
                        </Typography>
                      )}
                  </Box>
                  <Box height={"50%"} width={"100%"}  className="col space-around">
                    <Box className="space-around y-center">
                      <Man
                        sx={{
                          color: "rgba(54, 162, 235)",
                          fontSize: "50px",
                        }}
                      />
                      {Loading && <CircularProgress size={"1rem"} />}
                      {!Loading && (
                        <Typography fontSize={"28px"}>{Male}</Typography>
                      )}
                    </Box>
                    <Box className="space-around y-center">
                      <Woman
                        sx={{
                          color: "rgba(255, 99, 132)",
                          fontSize: "50px",
                        }}
                      />
                      {Loading && <CircularProgress size={"1rem"} />}
                      {!Loading && (
                        <Typography fontSize={"28px"}>{Female}</Typography>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
              
            </Box>
            <Box className="dashboard-grid-box col x-y-center">
              <Box className="flex x-center" alignItems={"baseline"}>
                <Typography textAlign={"center"} fontSize={"52px"}>
                  {Hour > 12
                    ? Math.abs(Hour - 12) < 10
                      ? `0${Math.abs(Hour - 12)}`
                      : Math.abs(Hour - 12)
                    : Hour < 10
                    ? `0${Hour}`
                    : Hour}
                  :{Minutes < 10 ? `0${Minutes}` : Minutes}
                </Typography>
                <Typography fontSize={"18px"}>&nbsp;{Seconds}</Typography>
                <Typography textAlign={"center"} fontSize={"52px"}>
                  &nbsp;{Hour >= 12 ? "PM" : "AM"}
                </Typography>
              </Box>
              <Box className="flex x-center" alignItems={"baseline"}>
                <Typography textAlign={"center"} fontSize={"32px"}>
                  {`${Days[new Date().getDay()]}, ${
                    Months[new Date().getMonth()]
                  } ${new Date().getDate()}`}
                </Typography>
              </Box>
            </Box>
            <Box
              className="dashboard-grid-box sp-box"
              sx={{
                gridColumn: "1/ span 2",
                height: window.innerHeight <= 610 ? "355px" : "500px",
                // padding:"175px"
              }}
            >
              <Box>
                <Bar data={CurrentMonthData} options={CurrentMonthOption} />
              </Box>
            </Box>
            <Box
              className="dashboard-grid-box sp-box"
              sx={{
                height: window.innerHeight <= 610 ? "355px" : "500px",
                // padding:"175px"
              }}
            >
              <Box>
                <Bar data={MonthsData} options={MonthsOption} height={330} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
