import React from "react";
import {
    FormLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
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
} from "../Data/Female_BMI_AGE";

const Female_Growth_Chart = () => {
  return (
    <>
    <FormLabel
        sx={{ textAlign: "center", width:"100%",margin: "20px 0"}}
      >
        Females, Ages 2-20 years
      </FormLabel>
      <TableContainer
        component={Paper}
        sx={{
          // padding:"100px 0",
          height: "100vh",
          width: "100%",
          overflowY: "scroll",
          margin: "10px auto 100px auto",
          background: "transparent",
        }}
      >
        <Table
          className="bg-table"
          sx={{
            minWidth: 1010,
          }}
          aria-label="simple table"
        >
          <TableHead sx={{ height: "10px !important"}}>
            <TableRow>
              <TableCell
                align="center"
                sx={{ fontSize: "11px", padding: "10px 0" , fontWeight:"bold"}}
              >
                Age (in months)
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: "11px", padding: "10px 0" , fontWeight:"bold"}}
              >
                3rd Percentile <br />
                BMI Value
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: "11px", padding: "10px 0" , fontWeight:"bold"}}
              >
                5th Percentile <br />
                BMI Value
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: "11px", padding: "10px 0" , fontWeight:"bold"}}
              >
                10th Percentile <br />
                BMI Value
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: "11px", padding: "10px 0" , fontWeight:"bold"}}
              >
                25th Percentile <br />
                BMI Value
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: "11px", padding: "10px 0" , fontWeight:"bold"}}
              >
                50th Percentile <br />
                BMI Value
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: "11px", padding: "10px 0" , fontWeight:"bold"}}
              >
                75th Percentile <br />
                BMI Value
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: "11px", padding: "10px 0" , fontWeight:"bold"}}
              >
                85th Percentile <br />
                BMI Value
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: "11px", padding: "10px 0" , fontWeight:"bold"}}
              >
                90th Percentile <br />
                BMI Value
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: "11px", padding: "10px 0" , fontWeight:"bold"}}
              >
                95th Percentile <br />
                BMI Value
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: "11px", padding: "10px 0" , fontWeight:"bold"}}
              >
                97th Percentile <br />
                BMI Value
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            style={{
              overflow: "scroll",
            }}
            className="col x-y-center"
          >
            {AgeInMonths.map((age, index) => (
              <TableRow
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                }}
              >
                <TableCell align="center" sx={{fontWeight:"bold"}}>{age}</TableCell>
                <TableCell align="center">
                  {Third_Percentile[index] &&
                    Third_Percentile[index].slice(0, -3)}
                </TableCell>
                <TableCell align="center">{Fifth_Percentile[index] && Fifth_Percentile[index].slice(0, -3)}</TableCell>
                <TableCell align="center">{Tenth_Percentile[index] && Tenth_Percentile[index].slice(0, -3)}</TableCell>
                <TableCell align="center">
                  {Twentfive_Percentile[index] && Twentfive_Percentile[index].slice(0, -3)}
                </TableCell>
                <TableCell align="center">{Fifty_Percentile[index] && Fifty_Percentile[index].slice(0, -3)}</TableCell>
                <TableCell align="center">
                  {Seventy_Five_Percentile[index] && Seventy_Five_Percentile[index].slice(0, -3)}
                </TableCell>
                <TableCell align="center">
                  {Eighty_Five_Percentile[index]}
                </TableCell>
                <TableCell align="center">{Ninty_Percentile[index] && Ninty_Percentile[index].slice(0, -3)}</TableCell>
                <TableCell align="center">
                  {Ninty_Five_Percentile[index] && Ninty_Five_Percentile[index].slice(0, -3)}
                </TableCell>
                <TableCell align="center">
                  {Ninty_Seven_Percentile[index] &&
                    Ninty_Seven_Percentile[index].slice(0, -3)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Female_Growth_Chart;
