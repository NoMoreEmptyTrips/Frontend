import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import SideNavBarList from "./SideNavBarList";
import { DRAWER_WIDTH, THEME_COLOR } from "../../constants";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Divider from "@mui/material/Divider";

function AppLayout() {
  return (
    <Box>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${DRAWER_WIDTH}px)`,
          ml: `${DRAWER_WIDTH}px`,
        }}
      >
        <Toolbar sx={{ backgroundColor: THEME_COLOR }}>
          <Typography variant="h6" noWrap component="div">
            Holcim MAQER
          </Typography>
        </Toolbar>
      </AppBar>
      <MuiDrawer
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            whiteSpace: "nowrap",
            backgroundColor: THEME_COLOR,
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <SideNavBarList />
      </MuiDrawer>
    </Box>
  );
}
export default AppLayout;
