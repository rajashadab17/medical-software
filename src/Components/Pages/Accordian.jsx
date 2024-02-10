import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { E } from "styled-icons/fa-solid";
import { Box } from "@mui/material";
import Specific_Graph from "../Graph/Male/Age/Specific_Graph";
import Specific_Female_Graph from "../Graph/Female/Age/Specific_Female_Graph";
import Specific_Male_Height from "../Graph/Male/Height/Specific_Male_Height";
import Specific_Female_Height from "../Graph/Female/Height/Specific_Female_Height";
import Specific_Female_Weight from "../Graph/Female/Weight/Specific_Female_Weight";
import Specific_Male_Weight from "../Graph/Male/Weight/Specific_Male_Weight";

const Accordions = ({ MasterData, Report_Year_Data }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ color: "text.secondary" }}>
            BMI-Age Growth Chart for Year {Report_Year_Data.Report_Year}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box m={"25px 0"}>
            <Typography textAlign={"center"} m={"25px 0"} variant="h5">
              BMI-Age Growth Chart
            </Typography>
            <Box height={"100vh"}>
              {MasterData.Gender == "male" ? (
                <>
                  <Specific_Graph
                    Report={true}
                    Age={Report_Year_Data.years}
                    Height={Report_Year_Data.Height_Centimeter}
                    Weight={Report_Year_Data.Weight_Kg}
                  />
                </>
              ) : (
                <>
                  <Specific_Female_Graph
                    Report={true}
                    Age={Report_Year_Data.years}
                    Height={Report_Year_Data.Height_Centimeter}
                    Weight={Report_Year_Data.Weight_Kg}
                  />
                </>
              )}
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ color: "text.secondary" }}>
            Weight-Age Growth Chart for Year {Report_Year_Data.Report_Year}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box m={"25px 0"}>
            <Typography textAlign={"center"} m={"25px 0"} variant="h5">
              Weight-Age Growth Chart
            </Typography>
            <Box height={"100vh"}>
              {MasterData.Gender == "male" ? (
                <>
                  <Specific_Male_Weight
                    Report={true}
                    Age={Report_Year_Data.years}
                    Weight={Report_Year_Data.Weight_Kg}
                  />
                </>
              ) : (
                <>
                  <Specific_Female_Weight
                    Report={true}
                    Age={Report_Year_Data.years}
                    Weight={Report_Year_Data.Weight_Kg}
                  />
                </>
              )}
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          {/* <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Advanced settings
                  </Typography>*/}
          <Typography sx={{ color: "text.secondary" }}>
            Height-Age Growth Chart for Year {Report_Year_Data.Report_Year}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box m={"25px 0"}>
            <Typography textAlign={"center"} m={"25px 0"} variant="h5">
              Height-Age Growth Chart
            </Typography>
            <Box height={"100vh"}>
              {MasterData.Gender == "male" ? (
                <>
                  <Specific_Male_Height
                    Report={true}
                    Age={Report_Year_Data.years}
                    Height={Report_Year_Data.Height_Centimeter}
                  />
                </>
              ) : (
                <>
                  <Specific_Female_Height
                    Report={true}
                    Age={Report_Year_Data.years}
                    Height={Report_Year_Data.Height_Centimeter}
                  />
                </>
              )}
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Accordions;
