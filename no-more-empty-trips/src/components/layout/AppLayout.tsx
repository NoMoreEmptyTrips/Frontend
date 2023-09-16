import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import SideNavBarList from "./SideNavBarList";
import { DRAWER_WIDTH, THEME_COLOR } from "../../constants";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Divider from "@mui/material/Divider";
/* import Logo from "../../hackzurich.png";
import mainLogo from'../../hackzurich.png';
import mainLogo from'./holicm.png'; */
const photo = require('./holicm.png');


function AppLayout() {
  return (
    <Box>
      <CssBaseline />
      <p>Test</p>
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${DRAWER_WIDTH}px)`,
          ml: `${DRAWER_WIDTH}px`,
        }}
      >
        <Toolbar sx={{ backgroundColor: THEME_COLOR }} style={{ borderBottom: "1.5px #8a8a8a solid" }}>
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
        <img style={{ position: 'absolute', top: 0, left: 20, height: '60px' }} src={photo} alt="holcim logo" />
        <Divider />
        <SideNavBarList />
      </MuiDrawer>
    </Box>
  );
}
export default AppLayout;
