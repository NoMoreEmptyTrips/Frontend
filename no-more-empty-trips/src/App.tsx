import { Box } from "@mui/material";
import AppLayout from "./components/layout/AppLayout";

import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <Box sx={{ display: "flex" }}>
      <AppLayout />
      <Box
        component="main"
        px={{ xs: 0, sm: 9, md: 9, lg: 9 }}
        sx={{ flexGrow: 1, pt: 10 }}
      >
        <AppRoutes />
      </Box>
    </Box>
  );
}

export default App;
