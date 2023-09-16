import AssessmentIcon from "@mui/icons-material/Assessment";
import MapIcon from "@mui/icons-material/Map";
import PeopleIcon from "@mui/icons-material/People";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

export const DRAWER_WIDTH = 225;

export const THEME_COLOR = "#202124";

export const NAV_ITEM_LIST = [
  {
    page: "Dashboard",
    path: "/dashboard",
    icon: <AssessmentIcon style={{color: "white"}} />,
  },
  {
    page: "Routes",
    path: "/routes",
    icon: <MapIcon style={{color: "white"}}  />,
  },
  {
    page: "Customers",
    path: "/customers",
    icon: <PeopleIcon style={{color: "white"}}  />,
  },
  {
    page: "Deliveries",
    path: "/deliveries",
    icon: <LocalShippingIcon style={{color: "white"}}  />,
  },
];
