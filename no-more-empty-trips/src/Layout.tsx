import { useState } from "react";
import { IconButton, Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer, { DrawerProps } from "@mui/material/Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
/* import TopBar from "./TopBar"; */
import { styled } from "@mui/material/styles";
import { DRAWER_WIDTH, THEME_COLOR } from "./constants";
import TopBar from "./topbar";


const openedMixin = (theme: any) => ({
  width: DRAWER_WIDTH,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: any) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(8)} + 1px)`,
  [theme.breakpoints.down("sm")]: {
    width: 0,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })<DrawerProps>(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
      backgroundColor: THEME_COLOR,
      flexShrink: 0,
      whiteSpace: "nowrap",
      boxSizing: "border-box",
      ...(open ? openedMixin(theme) : closedMixin(theme)),
    },
  }));

function AppLayout() {
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <CssBaseline />
      <TopBar open={open} setOpen={setOpen} />
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "Test",
          },
        }}
      >
        <DrawerHeader>
          <IconButton onClick={() => setOpen(!open)}>
            <ChevronLeftIcon sx={{ color: "white" }} />
          </IconButton>
        </DrawerHeader>
        {/* <SideNavBarList open={open} /> */}
      </Drawer>
    </Box>
  );
}
export default AppLayout;