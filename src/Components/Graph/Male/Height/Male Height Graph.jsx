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
} from "../../../Data/Boy_Height_Age";
Chart.register(CategoryScale);

const Male_Height_Graph = ({height, width, legends, sentRemarks, Report, Report_Year}) => {
  const { Obj } = useContext(contextData);

  const [Reports_Data, setReports_Data] = useState([]);

  const [Remarks, setRemarks] = useState();
  let GR = Obj.PatientGR;

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

  const inputArray = Report_Year ? Reports_Data.filter(val => val.Report_Year <= Report_Year).map((val) => val.years) : Reports_Data.map((val) => val.years);
  // const inputArray = Reports_Data.map((val) => val.years);
  const Height_Array = Report_Year ? Reports_Data.filter(val => val.Report_Year <= Report_Year).map((val) => val.Height_Centimeter) : Reports_Data.map((val) => val.Height_Centimeter)
  // console.log("input Array", inputArray);
  // console.log("height Array", Height_Array);
  let newArray = [];
  for (let i = 0; i < inputArray[inputArray.length - 1]; i++) {
    if (inputArray.includes(i)) {
      let index = inputArray.indexOf(i);

      newArray.push(Height_Array[index]);
    } else {
      newArray.push(null);
    }

    for (let j = 0; j < 11; j++) {
      newArray.push(null);
    }
  }

  newArray.push(Height_Array[Height_Array.length - 1]);
  let cuttedArray = newArray.splice(24); //bcz its from 0 years and we have to need from 2 years = 24 months..thats why we have cutout inital 24 values;
  let pointindexes = cuttedArray.filter((value) => {
    return value !== null;
  });
  let ageIndex = cuttedArray.indexOf(pointindexes[0]); //The index at which first weight value is present in cuttedArray
  const newgreenArray = [];
  for (let i = 1; i <= ageIndex; i++) {
    newgreenArray.push(null);
  }
  newgreenArray.push(Height_Array[0]);
  const EachyearDifferenceArray = [];
  // console.clear();

  let lastIndex = -1; // Initialize lastIndex to keep track of the last index found
  for (let i = 0; i < pointindexes.length - 1; i++) {
    let CrrYear = cuttedArray.indexOf(pointindexes[i], lastIndex + 1); // Start searching from lastIndex + 1
    let NextYear = cuttedArray.indexOf(pointindexes[i + 1], CrrYear + 1);
    let yearDifference = NextYear - CrrYear;

    let crrWeight = Height_Array[i];
    let NextWeight = Height_Array[i + 1];
    let HeightDifference = NextWeight - crrWeight;

    lastIndex = CrrYear; // Update lastIndex to the current index

    for (let i = 1; i < yearDifference; i++) {

      newgreenArray.push(
        Number(newgreenArray[newgreenArray.length - 1]) +
          HeightDifference / yearDifference
      );
    }

    let Obj = {
      CrrYear: CrrYear,
      NextYear: NextYear,
      yearDifference,
      HeightDifference,
    };
    EachyearDifferenceArray.push(Obj);
    newgreenArray.push(Height_Array[i + 1]);
  }
  setTimeout(() => {
    let P_5 =
      Number(Fifth_Percentile[
        cuttedArray.indexOf(pointindexes[pointindexes.length - 1])
      ]);
    let P_10 =
      Number(Tenth_Percentile[
        cuttedArray.indexOf(pointindexes[pointindexes.length - 1])
      ]);
    let P_90 =
      Number(Ninty_Percentile[
        cuttedArray.indexOf(pointindexes[pointindexes.length - 1])
      ]);
    let P_97=
      Number(Ninty_Seven_Percentile[
        cuttedArray.indexOf(pointindexes[pointindexes.length - 1])
      ]);

    let lastPointIndexNumber = Number(pointindexes[pointindexes.length - 1]);

    if (lastPointIndexNumber < P_5) {
      setRemarks("Stunted");
    } else if (lastPointIndexNumber >= P_5 && lastPointIndexNumber <= P_10) {
      setRemarks("B/L Stunted");
    } else if (lastPointIndexNumber > P_10) {
      setRemarks("Healthy Child");
    }  else {
      setRemarks("Condition can't be determined");
    }
  }, 2000);

  useEffect(() => {
    Report && sentRemarks(Remarks)
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
        label: "Height",
        backgroundColor: "rgba(0,0,0)",
        borderColor: "black",
        data: cuttedArray.map((value) => {
          if(value == null){
            return "null"
          } else {
            return value
          }
        }),
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
        text: "Height-Age Growth Chart",
        position: "top",
      },
      filler: {
        propagate: false,
      },
      legend: {
        display:!legends ? legends : !legends,
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
          text: "Height (cm)",
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

  const valuePointPlugin = {
    afterDatasetsDraw: (chart) => {
      const ctx = chart.ctx;
      const datasetIndexToPrintValues = 1; // Index of the dataset to print values for
  
      chart.data.datasets.forEach((dataset, datasetIndex) => {
        if (datasetIndex !== datasetIndexToPrintValues) return;
  
        const meta = chart.getDatasetMeta(datasetIndex);
        if (meta.hidden) return;
  
        meta.data.forEach((element, index) => {
          const value = dataset.data[index];
          const { x, y } = element.tooltipPosition();
          ctx.save();
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = 'black';
          ctx.font = '10px Arial';
          ctx.fillText(value, x, y - 10); // Adjust vertical position as needed
          ctx.restore();
        });
      });
    },
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
              height: "100%",
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
            <Line data={data} options={options} plugins={[valuePointPlugin]} width={width} height={height}  />
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
            <Button variant="contained" onClick={navigatetoWeight}>
              Show for Weight
            </Button>
            <Button variant="contained" onClick={navigatetoBMI}>
              Show for BMI
            </Button>
          </div> */}
          {Remarks && !Report && (
            <Typography margin={"10px"}> Remarks : {Remarks}</Typography>
          )}
        </div>
      </>
    </>
  );
};

export default Male_Height_Graph;
