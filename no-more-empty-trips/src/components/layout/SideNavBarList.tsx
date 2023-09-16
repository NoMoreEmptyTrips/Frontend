import { useState } from "react";
import { useLocation } from "react-router-dom";
import { List, Divider, Typography, Box } from "@mui/material";
import NavListitem from "./NavListItem";
import { NAV_ITEM_LIST } from "../../constants";

interface Item {
  path: string;
}

function SideNavBarList() {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const location = useLocation();

  const buttonProps = (item: Item, index: number) => ({
    selected: location.pathname === item.path,
    onClick: () => setSelectedIndex(index),
  });

  return (
    <List sx={{ height: "100%" }}>
      <Box sx={{ px: 1 }}>
        <Typography
          variant="subtitle2"
          fontWeight={300}
          color="white"
          sx={{ pl: "15px" }}
        >
          Route mapping
        </Typography>
        <List>
          {NAV_ITEM_LIST.slice(0, 2).map((item, index) => (
            <NavListitem
              key={item.page}
              to={item.path}
              primary={item.page}
              icon={item.icon}
              buttonProps={buttonProps(item, index)}
            />
          ))}
        </List>
        <Divider />
        <Typography
          variant="subtitle2"
          fontWeight={300}
          color="white"
          sx={{ pl: "15px", pt: 1 }}
        >
          Management
        </Typography>
        <List>
          {NAV_ITEM_LIST.slice(2, 5).map((item, index) => (
            <NavListitem
              key={item.page}
              to={item.path}
              primary={item.page}
              icon={item.icon}
              buttonProps={buttonProps(item, index)}
            />
          ))}
        </List>

      </Box>
    </List>
  );
}

export default SideNavBarList;
