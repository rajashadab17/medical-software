import { Typography } from "@mui/material";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
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

const Specific_Male_Weight = ({ Age, Weight, Report, sentRemarks, forReportRemark }) => {
  const [Remarks, setRemarks] = useState();

  let age = [];
  for (let i = 2; i <= 22; i++) {
    age.push(i);
  }

  const Years = [];
  AgeInMonths.map((age) => {
    let Age_In_Year = true;
    Years.push(Age_In_Year ? (age / 12).toFixed(1) : age);
  });

  const inputArray = [Age];

  const Weight_Array = [Weight];

  const newArray = [];

  for (let i = 0; i < inputArray[inputArray.length - 1]; i++) {
    if (inputArray.includes(i)) {
      let index = inputArray.indexOf(i);

      newArray.push(Weight_Array[index]);
    } else {
      newArray.push(null);
    }

    for (let j = 0; j < 11; j++) {
      newArray.push(null);
    }
  }

  newArray.push(Weight_Array[Weight_Array.length - 1]);
  let cuttedArray = newArray.splice(24);

  let pointindexes = cuttedArray.filter((value) => {
    return value !== null;
  });

  let ageIndex = cuttedArray.indexOf(pointindexes[0]);
  const newgreenArray = [];
  for (let i = 1; i <= ageIndex; i++) {
    newgreenArray.push(null);
  }
  newgreenArray.push(Weight_Array[0]);

  for (let i = 0; i < pointindexes.length - 1; i++) {
    let yearDifference =
      cuttedArray.indexOf(pointindexes[i + 1]) -
      cuttedArray.indexOf(pointindexes[i]);
    let BMIDiiference = Weight_Array[i + 1] - Weight_Array[i];
    for (let i = 1; i < yearDifference; i++) {
      newgreenArray.push(
        Number(newgreenArray[newgreenArray.length - 1]) +
          BMIDiiference / yearDifference
      );
    }
    newgreenArray.push(Weight_Array[i + 1]);
  }

  setTimeout(() => {
    let P_5 =
      Number(Fifth_Percentile[
        cuttedArray.indexOf(pointindexes[pointindexes.length - 1])
      ]);
    let P_90 =
      Number(Ninty_Percentile[
        cuttedArray.indexOf(pointindexes[pointindexes.length - 1])
      ]);
    let P_95 =
      Number(Ninty_Five_Percentile[
        cuttedArray.indexOf(pointindexes[pointindexes.length - 1])
      ]);

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
  

  useEffect(() => {
    forReportRemark && sentRemarks(Remarks) 
    // Report && ALL_BMI_ARRAY(BMI_ARRAY) 
  }, [Remarks])

  const data = {
    labels: Years,
    datasets: [
      {
        label: "",
        backgroundColor: "transparent",
        border: false,
        borderColor: "black",
        data: newgreenArray,
        fill: false,
        pointRadius: 0,
        borderWidth:1
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
        borderWidth:1
      },
      {
        label: "5 Percentile",
        backgroundColor: "rgba(255, 0, 0, 0.5)",
        borderColor: "red",
        data: Fifth_Percentile,
        fill: false,
        pointRadius: 0,
        borderWidth:1
      },
      {
        label: "10 Percentile",
        backgroundColor: "rgba(255,234,0,0.5)",
        borderColor: "yellow",
        data: Tenth_Percentile,
        fill: false,
        pointRadius: 0,
        borderWidth:1
      },
      {
        label: "25 Percentile",
        backgroundColor: "rgba(0,128,0, 0.5)",
        borderColor: "green",
        data: Twentfive_Percentile,
        fill: false,
        pointRadius: 0,
        borderWidth:1
      },
      {
        label: "50 Percentile",
        backgroundColor: "rgba(0,128,0, 0.5)",
        borderColor: "green",
        data: Fifty_Percentile,
        fill: false,
        pointRadius: 0,
        borderWidth:1
      },
      {
        label: "75 Percentile",
        backgroundColor: "rgba(0,128,0,0.5)",
        borderColor: "green",
        data: Seventy_Five_Percentile,
        fill: false,
        pointRadius: 0,
        borderWidth:1
      },
      {
        label: "90 Percentile",
        backgroundColor: "rgba(0,128,0, 0.5)",
        borderColor: "green",
        data: Ninty_Percentile,
        fill: false,
        pointRadius: 0,
        borderWidth:1
      },
      {
        label: "95 Percentile",
        backgroundColor: "rgba(255,0,0, 0.5)",
        borderColor: "red",
        data: Ninty_Five_Percentile,
        fill: false,
        pointRadius: 0,
        borderWidth:1
      },
      {
        label: "97 Percentile",
        backgroundColor: "rgba(255,0,0, 0.5)",
        borderColor: "red",
        data: Ninty_Seven_Percentile,
        fill: false,
        pointRadius: 0,
        borderWidth:1
      },
    ],
  };

  let options = {
    spanGaps: false,
    plugins: {
      title: {
        display: true,
        text: "Age",
        position: "bottom",
      },
      filler: {
        propagate: false,
      },
      legend: {
        labels: {
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
              height: "80%",
              width: "90%",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Line data={data} options={options}/>
            {/* <Line data={data} options={options} width={480}/> */}
          </div>
          {Remarks && !Report && (
            <Typography margin={"10px"}> Remarks : {Remarks}</Typography>
          )}
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
        </div>
      </>
    </>
  );
};

export default Specific_Male_Weight;
