import { Toolbar, Typography, Box } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";

function TopBar() {
  return (
    <>
      <MuiAppBar
        position="fixed"
        sx={{
          backgroundColor: "#303E4D",
        }}
      >
        {/* AppBar content */}
        <Toolbar variant="dense">
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "right" }}>
              <Typography variant="h6">Holcim MAQER</Typography>
            </Box>
          </Box>
        </Toolbar>
      </MuiAppBar>
    </>
  );
}

export default TopBar;
