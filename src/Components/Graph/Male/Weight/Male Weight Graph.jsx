import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { collection, getDocs } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
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

  // console.log({
  //   inputArray,
  //   Weight_Array,
  //   inputArray_length: inputArray.length,
  //   Weight_Array_length: Weight_Array.length,
  // });

  let newArray = [];
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
  let cuttedArray = newArray.splice(24); //bcz its from 0 years and we have to need from 2 years = 24 months..thats why we have cutout inital 24 values;
  let pointindexes = cuttedArray.filter((value) => {
    return value !== null;
  });
  let ageIndex = cuttedArray.indexOf(pointindexes[0]); //The index at which first weight value is present in cuttedArray
  const newgreenArray = [];
  for (let i = 1; i <= ageIndex; i++) {
    newgreenArray.push(null);
  }
  newgreenArray.push(Weight_Array[0]);
  const EachyearDifferenceArray = [];
  // console.clear();

  let lastIndex = -1; // Initialize lastIndex to keep track of the last index found
  for (let i = 0; i < pointindexes.length - 1; i++) {
    let CrrYear = cuttedArray.indexOf(pointindexes[i], lastIndex + 1); // Start searching from lastIndex + 1
    let NextYear = cuttedArray.indexOf(pointindexes[i + 1], CrrYear + 1);
    let yearDifference = NextYear - CrrYear;

    let crrWeight = Weight_Array[i];
    let NextWeight = Weight_Array[i + 1];
    let WeightDifference = NextWeight - crrWeight;

    lastIndex = CrrYear; // Update lastIndex to the current index

    for (let i = 1; i < yearDifference; i++) {
      newgreenArray.push(
        Number(newgreenArray[newgreenArray.length - 1]) +
          WeightDifference / yearDifference
      );
    }

    let Obj = {
      CrrYear: CrrYear,
      NextYear: NextYear,
      yearDifference,
      WeightDifference,
    };
    EachyearDifferenceArray.push(Obj);
    newgreenArray.push(Weight_Array[i + 1]);
  }

  console.log({
    Weight_Array,
    inputArray,
    newArray,
    cuttedArray,
    pointindexes,
    ageIndex,
    newgreenArray,
    EachyearDifferenceArray,
  });

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
        borderWidth: 1,
      },
      {
        label: "Weight",
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
        borderWidth:0
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
  // const valuePointDistance = 20;
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
              // position: "relative",
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
            <Line data={data} plugins={[valuePointPlugin]} options={options} width={width} height={height} />
            {/* {data.datasets.map(
              (dataset, datasetIndex) =>
                datasetIndex === 1 && // Only render for the first dataset
                dataset.data.map((value, i) => {
                  const leftPercentage = (i / (data.labels.length - 1)) * 100;
                  const maxValue = Math.max(...data.datasets[0].data); // Maximum value from the first dataset
                  const bottomPercentage =
                    (value / maxValue) * 100 - valuePointDistance; // Adjusted by valuePointDistance

                  return (
                    <span
                      key={i}
                      style={{
                        position: "absolute",
                        left: `${leftPercentage}%`,
                        bottom: `${bottomPercentage}%`,
                        transform: "translate(80%, 0)", // Adjust position
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        // padding: '5px',
                        borderRadius: "5px",
                        whiteSpace: "nowrap",
                        fontSize: "9px",
                      }}
                    >
                      {value && Number(value).toFixed(2)}
                    </span>
                  );
                })
            )} */}
            {/* <Line data={data} options={options} width={500} height={500} /> */}
            {/* <Line data={data} options={options} width={480} /> */}
          </div>
          {/* {Remarks && (
            <Typography margin={"10px"}> Remarks : {Remarks}</Typography>
          )} */}
        </div>
      </>
    </>
  );
};

export default Male_Weight_Graph;
