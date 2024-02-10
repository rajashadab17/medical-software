import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const CircularIndeterminate = ({ color, size }) => {
  return (
    <>
      {/* // <Box sx={{ display: 'flex' }}> */}
      {color ? (
        <CircularProgress style={{ color: "white" }} size={size} />
      ) : (
        <CircularProgress />
      )}

      {/* // </Box> */}
    </>
  );
};

export default CircularIndeterminate;
