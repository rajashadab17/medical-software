import {
  Assessment,
    Call,
  Dashboard,
  Edit,
  Help,
  Info,
  ManageSearch,
  PersonAddAlt1,
  PersonRemove,
  RemoveCircle,
  ShowChart,
  TableChart,
} from "@mui/icons-material";
import { Box } from "@mui/material";
import React from "react";

import SidebarIndividualComponent from "./SidebarIndividualComponent";

const SideBar = () => {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box className="sidebar"
      >
        <SidebarIndividualComponent
          Sections={0}
          SectionHeading={"Medical"}
          linksArray={["/dashboard"]}
          iconsArray={[<Dashboard />]}
          headingArray={["Dashboard"]}
        />
        <SidebarIndividualComponent
          SectionHeading={"Record"}
          Sections={"5"}
          linksArray={[
            "/add-master-entry",
            "/add-detail-entry",
            "/edit-master-entry",
            "/edit-detail-entry",
            "/delete-master-entry",
            "/delete-detail-entry",
          ]}
          iconsArray={[
            <PersonAddAlt1 />,
            <PersonAddAlt1 />,
            <Edit />,
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              height="2em"
              width="2em"
            >
              <path d="M8 12h8v2H8v-2m2 8H6V4h7v5h5v3.1l2-2V8l-6-6H6a2 2 0 00-2 2v16a2 2 0 002 2h4v-2m-2-2h4.1l.9-.9V16H8v2m12.2-5c.1 0 .3.1.4.2l1.3 1.3c.2.2.2.6 0 .8l-1 1-2.1-2.1 1-1c.1-.1.2-.2.4-.2m0 3.9L14.1 23H12v-2.1l6.1-6.1 2.1 2.1z" />
            </svg>,
            <PersonRemove />,
            <RemoveCircle />,
          ]}
          headingArray={[
            "Add Master Entry",
            "Add Detail Entry",
            "Edit Master Entry",
            "Edit Detail Entry",
            "Delete Master Entry",
            "Delete Detail Entry",
          ]}
        />
        <SidebarIndividualComponent
          SectionHeading={"Reports"}
          Sections={"3"}
          linksArray={[
            "/health-record",
            "/health-report",
            "/status-search",
            "/summary"
          ]}
          iconsArray={[
            <PersonAddAlt1 />,
            <PersonAddAlt1 />,
            <ManageSearch/>,
            <Assessment/>
          ]}
          headingArray={[
            "Health Record",
            "Health Report",
            "Status Search",
            "Summary"
          ]}
        />
        <SidebarIndividualComponent
          SectionHeading={"BMI References"}
          Sections={"3"}
          linksArray={[
            "/growth-table",
            "/boys-chart",
            "/girls-chart",
            "/bmi-calculator"
          ]}
          iconsArray={[
            <TableChart/>,
            <ShowChart/>,
            <ShowChart/>,
            "BMI"
          ]}
          headingArray={[
            "Growth Table",
            "Boys Chart",
            "Girls Chart",
            "BMI Calculator"
          ]}
        />
        <SidebarIndividualComponent
          Sections={2}
          SectionHeading={"Customer Support"}
          linksArray={["/about","/dashboard","/contact"]}
          iconsArray={[<Info/>, <Help/>, <Call/>]}
          headingArray={["About", "Support", "Contact Us"]}
        />
      </Box>
      {/* <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                        <MoveToInbox />
                    </ListItemIcon>
                    <ListItemText primary="Inbox" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="Starred" />
                        </ListItemButton>
                    </List>
                </Collapse> */}
      {/* </List>/ */}
    </>
  );
};

export default SideBar;
