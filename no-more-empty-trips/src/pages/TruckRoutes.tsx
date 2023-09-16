import React, { useEffect } from "react";
import Table from "../components/Table";
import { Box, Button, LinearProgress, TextField, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { THEME_COLOR } from "../constants";
import MapDrawer from "../components/MapDrawer";
import dayjs from "dayjs";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorDialog from "../components/ErrorDialog";

function TruckRoutes() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [selectedRoute, setSelectedRoute] = React.useState(null);
  const [startDateTime, setStartDateTime] = React.useState(dayjs(new Date()));
  const [endDateTime, setEndDateTime] = React.useState(dayjs(new Date()).add(2, 'day'));
  const [loading, setLoading] = React.useState(false);
  const [numberOfTrucks, setNumberOfTrucks] = React.useState('100');
  const [errorDialogOpen, setErrorDialogOpen] = React.useState(false);
  const [erorValue, setErrorValue] = React.useState({})

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
    number_of_buses: Number(numberOfTrucks),
    start_driving: dayjs(startDateTime).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
    end_driving: dayjs(endDateTime).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
  };

  const fetchData = async () => {
    if (!!startDateTime && !!endDateTime && !!numberOfTrucks) {
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
          let id = 1;
          jsonData.routes.forEach((x: any) => {
            x['id'] = id;
            id += 1;
          })
          setData(jsonData);
        } else {
          setLoading(false);
          if (response.status === 400) {
            setErrorValue('No deliveries were found for this starting date. Please select another starting date and try again!');
            setErrorDialogOpen(true);
          }
          console.error("Error fetching data:", response.statusText);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
        
      }
    }
  };

  return (
    <Box overflow="hidden">
      <Typography fontWeight="bold" color={"#4f4f4f"}>
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
        <div style={{marginLeft: '10px'}}>
          <TextField disabled={loading} id="outlined-basic" label="Number of trucks" variant="outlined" type="number" value={numberOfTrucks} onChange={(e) => setNumberOfTrucks(e.target.value)} />
        </div>
        <div style={{marginLeft: '10px'}}>
          <Button style={{height: '55px'}} variant="contained" disabled={loading} onClick={fetchData}>Calculate</Button>
        </div>
      </Box>
      {startDateTime && endDateTime && numberOfTrucks ? (
        <>
          <MapDrawer
            open={isDrawerOpen}
            onClose={closeDrawer}
            inputData={selectedRoute}
          />
          <Box pt={{ xs: 2, sm: 2 }}>
            <Typography fontWeight="bold" color={"#4f4f4f"}>
              Delivery Routes
            </Typography>
            {!!data && (
              <Table openDrawer={setNewRoute} data={data} />
            )}
            {loading && (<LinearProgress />)}
          </Box>
        </>
      ) : (
        "Please select date and time"
      )}
      <ErrorDialog
        error={erorValue}
        open={errorDialogOpen}
        setErrorDialogOpen={setErrorDialogOpen}
      />
    </Box>
  );
}

export default TruckRoutes;
