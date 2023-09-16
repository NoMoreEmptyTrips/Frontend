import React, { useEffect } from "react";
import Table from "../components/Table";
import { Box, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { THEME_COLOR } from "../constants";
import MapDrawer from "../components/MapDrawer";
import dayjs from "dayjs";
import CircularProgress from "@mui/material/CircularProgress";

function TruckRoutes() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [selectedRoute, setSelectedRoute] = React.useState(null);
  const [startDateTime, setStartDateTime] = React.useState("");
  const [endDateTime, setEndDateTime] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const [data, setData] = React.useState(null);

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const setNewRoute = (data: any) => {
    setIsDrawerOpen(true);
    setSelectedRoute(data);
  };

  const body = {
    country: "MEX",
    number_of_buses: 200,
    start_driving: dayjs(startDateTime).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
    end_driving: dayjs(endDateTime).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
  };

  const fetchData = async () => {
    if (startDateTime && endDateTime) {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8000/calculate-route", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        if (response.ok) {
          setLoading(false);
          const jsonData = await response.json();
          setData(jsonData);
        } else {
          setLoading(false);
          console.error("Error fetching data:", response.statusText);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [startDateTime, endDateTime]);

  return (
    <Box overflow="hidden">
      <Typography fontWeight="bold" color={THEME_COLOR}>
        Truck Routes
      </Typography>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        marginTop="20px"
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="From"
            value={startDateTime}
            onChange={(newValue: any) => setStartDateTime(newValue)}
            disabled={loading}
          />
        </LocalizationProvider>
        <div> - </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="To"
            value={endDateTime}
            onChange={(newValue: any) => setEndDateTime(newValue)}
            disabled={loading}
          />
        </LocalizationProvider>
      </Box>
      {startDateTime && endDateTime ? (
        <>
          <MapDrawer
            open={isDrawerOpen}
            onClose={closeDrawer}
            inputData={selectedRoute}
          />
          <Box pt={{ xs: 2, sm: 2 }}>
            <Typography fontWeight="bold" color={THEME_COLOR}>
              Delivery Routes
            </Typography>
            {!loading && data ? (
              <Table openDrawer={setNewRoute} data={data} />
            ) : (
              <CircularProgress />
            )}
          </Box>
        </>
      ) : (
        "Please select date and time"
      )}
    </Box>
  );
}

export default TruckRoutes;
