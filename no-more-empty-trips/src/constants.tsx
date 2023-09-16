import AssessmentIcon from "@mui/icons-material/Assessment";
import MapIcon from "@mui/icons-material/Map";
import PeopleIcon from "@mui/icons-material/People";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

export const DRAWER_WIDTH = 225;

export const THEME_COLOR = "#e3e3e3";

export const NAV_ITEM_LIST = [
  {
    page: "Dashboard",
    path: "/dashboard",
    icon: <AssessmentIcon  />,
  },
  {
    page: "Routes",
    path: "/routes",
    icon: <MapIcon />,
  },
  {
    page: "Customers",
    path: "/customers",
    icon: <PeopleIcon />,
  },
  {
    page: "Deliveries",
    path: "/deliveries",
    icon: <LocalShippingIcon />,
  },
];
