import React from "react";
import Table from "../components/Table";
import { Box, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import { THEME_COLOR } from "../constants";
import MapDrawer from "../components/MapDrawer";

function TruckRoutes() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <Box overflow="hidden">
      <Typography fontWeight="bold" color={THEME_COLOR}>
        Truck Routes
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="center">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker disablePast={true} />
        </LocalizationProvider>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          marginTop="20px"
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimeField label="From" />
          </LocalizationProvider>
          <div>-</div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimeField label="To" />
          </LocalizationProvider>
        </Box>
      </Box>
      <MapDrawer open={isDrawerOpen} onClose={closeDrawer} />
      <Box pt={{ xs: 2, sm: 2 }}>
        <Typography fontWeight="bold" color={THEME_COLOR}>
          Delivery Routes
        </Typography>
        <Table openDrawer={openDrawer} />
      </Box>
    </Box>
  );
}

export default TruckRoutes;
