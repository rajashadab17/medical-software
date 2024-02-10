import { Button, Typography } from "@mui/material";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { collection, getDocs } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import { contextData } from "../../../../Context/Context";
import { DB } from "../../../../firebase";
import {
  AgeInMonths,
  Fifth_Percentile,
  Fifty_Percentile,
  Ninty_Five_Percentile,
  Ninty_Percentile,
  Ninty_Seven_Percentile,
  Seventy_Five_Percentile,
  Tenth_Percentile,
  Third_Percentile,
  Twentfive_Percentile,
} from "../../../Data/Boy_Weight_Age";
Chart.register(CategoryScale);

const Male_Weight_Graph = ({
  height,
  width,
  legends,
  sentRemarks,
  Report,
  Report_Year,
}) => {
  const { Obj } = useContext(contextData);
  const [Reports_Data, setReports_Data] = useState([]);
  const [Remarks, setRemarks] = useState();
  let GR = Obj.PatientGR;

  // console.log(Obj);
  const Fetch = async () => {
    const docSnap = await getDocs(
      collection(DB, `Patients/${GR}/Report_Years`)
    );
    let sortedArrayYearWise = docSnap.docs
      .map((val) => val.data())
      .sort((a, b) => a.Report_Year - b.Report_Year);

    setReports_Data(sortedArrayYearWise);
  };

  useEffect(() => {
    Fetch();
  }, []);

  let age = [];
  for (let i = 2; i <= 22; i++) {
    age.push(i);
  }

  const Years = [];
  AgeInMonths.map((age) => {
    let Age_In_Year = true;
    Years.push(Age_In_Year ? (age / 12).toFixed(1) : age);
  });

  const inputArray = Report_Year
    ? Reports_Data.filter((val) => val.Report_Year <= Report_Year).map(
        (val) => val.years
      )
    : Reports_Data.map((val) => val.years);
  const Weight_Array = Report_Year
    ? Reports_Data.filter((val) => val.Report_Year <= Report_Year).map(
        (val) => val.Weight_Kg
      )
    : Reports_Data.map((val) => val.Weight_Kg);
  // const inputArray = Reports_Data.map((val) => val.years);
  // const Weight_Array = Reports_Data.map((val) => val.Weight_Kg);
  console.log(Weight_Array);
  // let newWeightArray = []
  //   for (let i = 0; i < Weight_Array.length; i++) {
  //     if (Weight_Array.length >= 1 && (Weight_Array[i]==Weight_Array[i-1])) {

  //       console.log("Brabar",{newgreenArrayAbhiWala: Weight_Array[i],newgreenArrayPechleWala: Weight_Array[i-1]})
  //     } else {
  //       newWeightArray.push(Weight_Array[i])
  //     }
  //   }

  //   console.log(newWeightArray)
  const newArray = [];

  for (let i = 0; i < inputArray[inputArray.length - 1]; i++) {
    if (inputArray.includes(i)) {
      let index = inputArray.indexOf(i);
      // if(inputArray.length >= 1 && inputArray[i] == inputArray[i-1]){
      //   console.log("Brabar",{newgreenArrayAbhiWala: inputArray[i],newgreenArrayPechleWala: inputArray[i-1]})
      // }
      // console.log(index)
      newArray.push(Weight_Array[index]);
    } else {
      newArray.push(null);
    }

    for (let j = 0; j < 11; j++) {
      newArray.push(null);
    }
  }

  newArray.push(Weight_Array[Weight_Array.length - 1]);
  console.log(newArray);
  let cuttedArray = newArray.splice(24);
  console.log(cuttedArray);

  let pointindexes = cuttedArray.filter((value) => {
    return value !== null;
  });
  console.log("Point Index", pointindexes);
  let ageIndex = cuttedArray.indexOf(pointindexes[0]);
  const newgreenArray = [];
  for (let i = 1; i <= ageIndex; i++) {
    newgreenArray.push(null);
  }
  newgreenArray.push(Weight_Array[0]);
  // console.log(pointindexes);
  //point index == weightarray
  for (let i = 0; i <= pointindexes.length - 1; i++) {
    // console.log(i);
    let PreVal = pointindexes[i - 1];
    let CrrVal = pointindexes[i];
    console.log({ PreVal, CrrVal });
    // if (pointindexes[i] == 32) {
    if (CrrVal == pointindexes[i + 1]) {
      // console.log("Mila true", CrrVal , PreVal)
      newgreenArray.push(Number(CrrVal));
      newgreenArray.push(Number(CrrVal));
      newgreenArray.push(Number(CrrVal));
      newgreenArray.push(Number(CrrVal));
      newgreenArray.push(Number(CrrVal));
      newgreenArray.push(Number(CrrVal));
      newgreenArray.push(Number(CrrVal));
      newgreenArray.push(Number(CrrVal));
      newgreenArray.push(Number(CrrVal));
      newgreenArray.push(Number(CrrVal));
      newgreenArray.push(Number(CrrVal));
    } else {
      let yearDifference =
        cuttedArray.indexOf(pointindexes[i + 1]) -
        cuttedArray.indexOf(pointindexes[i]);
      let BMIDiiference = Weight_Array[i + 1] - Weight_Array[i];
      console.log({
        cuttedArray,
        pointindexes,
        FirstDiffVal: cuttedArray.indexOf(pointindexes[i + 1]),
        FirstPointDiffVal: pointindexes[i + 1],
        SecondDiffVal: cuttedArray.indexOf(pointindexes[i]),
        SecondPointDiffVal: pointindexes[i],
        yearDifference,
        BMIFirstDiffVal: Weight_Array[i + 1],
        BMISecondDiffVal: Weight_Array[i],
        BMIDiiference,
      });
      for (let i = 1; i < yearDifference; i++) {
        // console.log("yearDifference",yearDifference);
        // console.log(cuttedArray.indexOf(pointindexes[i]))
        // console.log(cuttedArray, pointindexes)
        newgreenArray.push(
          Number(newgreenArray[newgreenArray.length - 1]) +
            BMIDiiference / yearDifference
        );
      }
      // newgreenArray.push(Weight_Array[i + 1]);
    }
    newgreenArray.push(pointindexes[i + 1]);
  }

  console.log("newgreenArray", newgreenArray);
  let greenArray = [];
  for (let i = 0; i < newgreenArray.length; i++) {
    if (newgreenArray[i] != null && newgreenArray[i] == newgreenArray[i - 1]) {
      greenArray.push(Number(newgreenArray[i]));
      greenArray.push(Number(newgreenArray[i]));
      greenArray.push(Number(newgreenArray[i]));
      greenArray.push(Number(newgreenArray[i]));
      greenArray.push(Number(newgreenArray[i]));
      greenArray.push(Number(newgreenArray[i]));
      greenArray.push(Number(newgreenArray[i]));
      greenArray.push(Number(newgreenArray[i]));
      greenArray.push(Number(newgreenArray[i]));
      greenArray.push(Number(newgreenArray[i]));
      greenArray.push(Number(newgreenArray[i]));
      greenArray.push(newgreenArray[i]);
      // console.log("brabar", i)
    } else {
      greenArray.push(newgreenArray[i]);
      // console.log(i)
    }
  }
  console.log("greenArray", greenArray);
  setTimeout(() => {
    let P_5 = Number(
      Fifth_Percentile[
        cuttedArray.indexOf(pointindexes[pointindexes.length - 1])
      ]
    );
    let P_90 = Number(
      Ninty_Percentile[
        cuttedArray.indexOf(pointindexes[pointindexes.length - 1])
      ]
    );
    let P_95 = Number(
      Ninty_Five_Percentile[
        cuttedArray.indexOf(pointindexes[pointindexes.length - 1])
      ]
    );

    let lastPointIndexNumber = Number(pointindexes[pointindexes.length - 1]);

    // console.log(lastPointIndexNumber);
    if (lastPointIndexNumber <= P_5) {
      setRemarks("Underweight");
    } else if (lastPointIndexNumber > P_5 && lastPointIndexNumber <= P_90) {
      setRemarks("Healthy Child");
    } else if (lastPointIndexNumber > P_90) {
      setRemarks("Over Weight");
    } else {
      setRemarks("Not Sure");
    }
  }, 2000);

  const data = {
    labels: Years,
    datasets: [
      {
        label: "",
        backgroundColor: "transparent",
        border: false,
        borderColor: "red",
        data: greenArray,
        fill: false,
        pointRadius: 0,
        borderWidth: 1,
      },
      {
        label: "",
        backgroundColor: "transparent",
        border: false,
        borderColor: "black",
        data: newgreenArray,
        fill: false,
        pointRadius: 0,
        borderWidth: 1,
      },
      {
        label: "BMI",
        backgroundColor: "rgba(0,0,0)",
        borderColor: "black",
        data: cuttedArray,
        fill: false,
        pointRadius: 2,
      },
      {
        label: "3 Percentile",
        backgroundColor: "rgba(255, 0, 0, 0.5)",
        borderColor: "red",
        data: Third_Percentile,
        fill: false,
        pointRadius: 0,
        borderWidth: 1,
      },
      {
        label: "5 Percentile",
        backgroundColor: "rgba(255, 0, 0, 0.5)",
        borderColor: "red",
        data: Fifth_Percentile,
        fill: false,
        pointRadius: 0,
        borderWidth: 1,
      },
      {
        label: "10 Percentile",
        backgroundColor: "rgba(255,234,0,0.5)",
        borderColor: "yellow",
        data: Tenth_Percentile,
        fill: false,
        pointRadius: 0,
        borderWidth: 1,
      },
      {
        label: "25 Percentile",
        backgroundColor: "rgba(0,128,0, 0.5)",
        borderColor: "green",
        data: Twentfive_Percentile,
        fill: false,
        pointRadius: 0,
        borderWidth: 1,
      },
      {
        label: "50 Percentile",
        backgroundColor: "rgba(0,128,0, 0.5)",
        borderColor: "green",
        data: Fifty_Percentile,
        fill: false,
        pointRadius: 0,
        borderWidth: 1,
      },
      {
        label: "75 Percentile",
        backgroundColor: "rgba(0,128,0,0.5)",
        borderColor: "green",
        data: Seventy_Five_Percentile,
        fill: false,
        pointRadius: 0,
        borderWidth: 1,
      },
      {
        label: "90 Percentile",
        backgroundColor: "rgba(0,128,0, 0.5)",
        borderColor: "green",
        data: Ninty_Percentile,
        fill: false,
        pointRadius: 0,
        borderWidth: 1,
      },
      {
        label: "95 Percentile",
        backgroundColor: "rgba(255,0,0, 0.5)",
        borderColor: "red",
        data: Ninty_Five_Percentile,
        fill: false,
        pointRadius: 0,
        borderWidth: 1,
      },
      {
        label: "97 Percentile",
        backgroundColor: "rgba(255,0,0, 0.5)",
        borderColor: "red",
        data: Ninty_Seven_Percentile,
        fill: false,
        pointRadius: 0,
        borderWidth: 1,
      },
    ],
  };

  let options = {
    spanGaps: false,
    plugins: {
      title: {
        display: true,
        text: "Weight-Age Growth Chart",
        position: "top",
      },
      filler: {
        propagate: false,
      },
      legend: {
        display: !legends ? legends : !legends,
        labels: {
          display: true,
          position: "left",
          font: {
            size: 14,
          },
        },
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Weight (Kg)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Age",
        },
      },
    },
  };
  const navigate = useNavigate();
  const navigatetoBMI = () => {
    navigate("/graph/bmi-for-age");
  };
  const navigatetoHeight = () => {
    navigate("/graph/height-for-age");
  };
  return (
    <>
      <>
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <div
            style={{
              height: "98%",
              width: "100%",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              border: Report && "2px solid black",
              // background:"pink"
            }}
            // style={{
            //   height: "80%",
            //   width: "90%",
            //   display: "flex",
            //   justifyContent: "space-around",
            //   alignItems: "center",
            // }}
          >
            <Line data={data} options={options} width={width} height={height} />
            {/* <Line data={data} options={options} width={500} height={500} /> */}
            {/* <Line data={data} options={options} width={480} /> */}
          </div>
          {/* <div
            style={{
              width: "50%",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Button variant="contained" onClick={navigatetoBMI}>
              Show for BMI
            </Button>
            <Button variant="contained" onClick={navigatetoHeight}>
              Show for Height
            </Button>
          </div> */}
          {/* {Remarks && (
            <Typography margin={"10px"}> Remarks : {Remarks}</Typography>
          )} */}
        </div>
      </>
    </>
  );
};

export default Male_Weight_Graph;
