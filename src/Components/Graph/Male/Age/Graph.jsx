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
  Eighty_Five_Percentile,
  Fifth_Percentile,
  Fifty_Percentile,
  Ninty_Five_Percentile,
  Ninty_Percentile,
  Ninty_Seven_Percentile,
  Seventy_Five_Percentile,
  Tenth_Percentile,
  Third_Percentile,
  Twentfive_Percentile,
} from "../../../Data/Male_BMI_AGE";
Chart.register(CategoryScale);

const Graph = ({height, width, legends, sentRemarks, Report, ALL_BMI_ARRAY, Report_Year}) => {
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
  for (let i = 2; i <= 20; i++) {
    age.push(i);
  }

  const Years = [];
  AgeInMonths.map((age) => {
    let Age_In_Year = true;
    Years.push(Age_In_Year ? (age / 12).toFixed(1) : age);
  });

  const inputArray = Report_Year ? Reports_Data.filter(val => val.Report_Year <= Report_Year).map((val) => val.years) : Reports_Data.map((val) => val.years);
  
  const BMI_ARRAY = Report_Year ? Reports_Data.filter(val => val.Report_Year <= Report_Year).map(
    (val) => val.Weight_Kg / Math.pow(val.Height_Centimeter / 100, 2)
  ) : Reports_Data.map(
    (val) => val.Weight_Kg / Math.pow(val.Height_Centimeter / 100, 2)
  );

  
  // console.log("Reports_Data", Reports_Data.filter(val => val.Report_Year <= 2021).map(val => val.Report_Year))
  // console.log("Reports_Years", Reports_Data.map(val => val.Report_Year))
  // console.log("inputArray", inputArray)
  // console.log("BMI_ARRAY", BMI_ARRAY)

  let newArray = [];
  for (let i = 0; i < inputArray[inputArray.length - 1]; i++) {
    if (inputArray.includes(i)) {
      let index = inputArray.indexOf(i);

      newArray.push(BMI_ARRAY[index]);
    } else {
      newArray.push(null);
    }

    for (let j = 0; j < 11; j++) {
      newArray.push(null);
    }
  }

  newArray.push(BMI_ARRAY[BMI_ARRAY.length - 1]);
  let cuttedArray = newArray.splice(24); //bcz its from 0 years and we have to need from 2 years = 24 months..thats why we have cutout inital 24 values;
  let pointindexes = cuttedArray.filter((value) => {
    return value !== null;
  });
  let ageIndex = cuttedArray.indexOf(pointindexes[0]); //The index at which first weight value is present in cuttedArray
  const newgreenArray = [];
  for (let i = 1; i <= ageIndex; i++) {
    newgreenArray.push(null);
  }
  newgreenArray.push(BMI_ARRAY[0]);
  const EachyearDifferenceArray = [];
  // console.clear();

  let lastIndex = -1; // Initialize lastIndex to keep track of the last index found
  for (let i = 0; i < pointindexes.length - 1; i++) {
    let CrrYear = cuttedArray.indexOf(pointindexes[i], lastIndex + 1); // Start searching from lastIndex + 1
    let NextYear = cuttedArray.indexOf(pointindexes[i + 1], CrrYear + 1);
    let yearDifference = NextYear - CrrYear;

    let crrWeight = BMI_ARRAY[i];
    let NextWeight = BMI_ARRAY[i + 1];
    let BMIdifference = NextWeight - crrWeight;

    lastIndex = CrrYear; // Update lastIndex to the current index

    for (let i = 1; i < yearDifference; i++) {

      newgreenArray.push(
        Number(newgreenArray[newgreenArray.length - 1]) +
          BMIdifference / yearDifference
      );
    }

    let Obj = {
      CrrYear: CrrYear,
      NextYear: NextYear,
      yearDifference,
      BMIdifference,
    };
    EachyearDifferenceArray.push(Obj);
    newgreenArray.push(BMI_ARRAY[i + 1]);
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
      setRemarks("Underweight");
    } else if (lastPointIndexNumber >= P_5 && lastPointIndexNumber <= P_10) {
      setRemarks("B/L Underweigth");
    } else if (lastPointIndexNumber > P_10 && lastPointIndexNumber <= P_90) {
      setRemarks("Healthy Child");
    } else if (lastPointIndexNumber > P_90 && lastPointIndexNumber <= P_97) {
      setRemarks("Weight needs to be controlled");
    } else if (lastPointIndexNumber > P_97) {
      setRemarks("Obese");
    } else {
      setRemarks("Condition can't be determined");
    }
  }, 2000);
  console.log({cuttedArray})
  useEffect(() => {
    // console.log("graph",Remarks)
    Report && sentRemarks(Remarks) 
    Report && ALL_BMI_ARRAY(BMI_ARRAY) 
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
        data: cuttedArray.map((value) => {
          if(value == null){
            return "null"
          } else {
            return value.toFixed(2)
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
        label: "85 Percentile",
        backgroundColor: "rgba(0,128,0, 0.5)",
        borderColor: "green",
        data: Eighty_Five_Percentile,
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
      // title: {
      //   display: true,
      //   text: "Age",
      //   position: "bottom",
        
      //   // weight:"bold"
      // },
      filler: {
        propagate: false,
      },
      legend: {
        display:!legends ? legends : !legends,
        labels: {
          position: "left",
          font: {
            size: 14
          },
        },
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Body Mass Index (B M I)",
          font: {
            // size: 30,
            weight:"bold"
          }
        },
      },
      ///
      x: {
        title: {
          display: true,
          text: "Age",
          font: {
            // size: 30,
            weight:"bold" 
          }
        },
      },
    },
  };
  const valuePointPlugin = {
    afterDatasetsDraw: (chart) => {
      const ctx = chart.ctx;
      const datasetIndexToPrintValues = 1; // Index of the dataset to print values for
      // const dataStep = 10; // Print values for every 10th data point
  
      chart.data.datasets.forEach((dataset, datasetIndex) => {
        if (datasetIndex !== datasetIndexToPrintValues) return;
  
        const meta = chart.getDatasetMeta(datasetIndex);
        if (meta.hidden) return;
        // console.log({meta:meta.data})
        meta.data.forEach((element, index) => {
          // if (index % dataStep !== 0) return; // Skip printing for data points not matching the step
  
          const value = dataset.data[index] // && dataset.data[index].toFixed(2); // Round to two digits after the decimal point
          // console.log({dataset, data: data[index], value:value && value.toFixed(2)})
          const { x, y } = element.tooltipPosition();
          ctx.save();
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = 'black'; // Change color here if needed
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
              height: "90%",
              width: "100%",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              border:Report && "2px solid black",
              position:"relative"
            }}
            // style={{
            //   height: "80%",
            //   width: "90%",
            //   display: "flex",
            //   justifyContent: "space-around",
            //   alignItems: "center",
            //   border:"1px solid black"
            // }}
          >
            <Line data={data} options={options} plugins={[valuePointPlugin]} width={width} height={height}  />
            {/* {data.datasets.map((dataset, datasetIndex) => (
      datasetIndex === 1 && // Only render for the first dataset
      dataset.data.map((value, i) => {
        const leftPercentage = (i / (data.labels.length - 1)) * 100;
        const maxValue = Math.max(...data.datasets[0].data); // Maximum value from the first dataset
        const bottomPercentage = ((value / maxValue) * 100) - valuePointDistance; // Adjusted by valuePointDistance
  
        return (
          <span
            key={i}
            style={{
              position: 'absolute',
              left: `${leftPercentage}%`,
              bottom: `${bottomPercentage}%`,
              transform: 'translate(80%, 0)', // Adjust position
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              // padding: '5px',
              borderRadius: '5px',
              whiteSpace: 'nowrap',
              fontSize: '9px',
            }}
          >
            {value && value.toFixed(2)}
          </span>
        );
      })
    ))} */}
            {/* <Line data={data} options={options} width={480} /> */}
          </div>
          {Remarks && !Report && (
            <Typography margin={"10px"}> Remarks : {Remarks}</Typography>
          )}
        </div>
      </>
    </>
  );
};

export default Graph;
