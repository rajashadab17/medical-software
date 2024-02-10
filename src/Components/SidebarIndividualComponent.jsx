import React from "react";
import {
  ListSubheader,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
  Typography,
} from "@mui/material";
import {
  Drafts,
  ExpandLess,
  ExpandMore,
  Login,
  PersonAddAlt1,
  PersonRemove,
  Edit,
  RemoveCircle,
  StarBorder,
} from "@mui/icons-material";

import { NavLink } from "react-router-dom";

const SidebarIndividualComponent = ({
  SectionHeading,
  Sections,
  iconsArray,
  headingArray,
  linksArray,
}) => {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  let sectionsArray = [];
  for (let i = 0; i <= Sections; i++) {
    let Obj = {
      link: linksArray[i],
      icon: iconsArray[i],
      heading: headingArray[i],
    };
    sectionsArray.push(Obj);
  }

  return (
    <>
      <List
        sx={{ width: '100%', height: "auto", maxWidth: 360}}
        component="nav"
        aria-labelledby="nested-list-subheader"
        
        subheader={
          <Typography
          className="sidebar-heading"
            component="div"
            id="nested-list-subheader"
            sx={{ textAlign: "center",bgcolor:"transparent"}}
            // color={"#7366ff"}
            color={"var(--purple-button-hover)"}
            fontWeight={"bold"}
          >
            {SectionHeading}
          </Typography>
        }
      >
        {sectionsArray.map((value) => {
          return (
            <NavLink
              to={value.link}
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItemButton className="sidebar-btn ">
                <ListItemIcon className="sidebar-btn-icon">
                  {value.icon}
                </ListItemIcon>
                <Typography className="sidebar-btn-text">
                  {value.heading}
                </Typography>
              </ListItemButton>
            </NavLink>
          );
        })}
      </List>
    </>
  );
};

export default SidebarIndividualComponent;
