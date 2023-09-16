import EventIcon from "@mui/icons-material/Event";
import AssessmentIcon from "@mui/icons-material/Assessment";

export const DRAWER_WIDTH = 225;

export const THEME_COLOR = "#303E4D";

export const NAV_ITEM_LIST = [
  {
    page: "Dashboard",
    path: "/dashboard",
    icon: <AssessmentIcon sx={{ color: "white" }} />,
  },
  {
    page: "Routes",
    path: "/routes",
    icon: <EventIcon sx={{ color: "white" }} />,
  },
];