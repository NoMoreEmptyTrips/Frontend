import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { RouteMapDirections } from "./RouteMapDirections";
import { Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Route, Stop } from "./RouteMapDirections/RouteMapDirections";
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const accessToken =
  "pk.eyJ1IjoibWljaGFlbGJldXRsZXIiLCJhIjoiY2xrMmliYjZwMGN1djNxbXF6bGU5ejQ1aSJ9.HyTfjoA0G5o3m5_EM4qdVw";

function MapDrawer({ open, onClose, inputData }: any) {

  const [value, setValue] = React.useState('map');

/*   const [routes, setRoutes] = useState<Route[]>([]);

  useEffect(() => {
    if (inputData) {
      fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${inputData.stops
          .map((s: Stop) => s.location_metadata.snapped_coordinate.join(","))
          .join(
            ";"
          )}?overview=full&geometries=geojson&access_token=${accessToken}`
      )
        .then((res) => res.json())
        .then((data) => {
          setRoutes(data.routes);
          console.log(data.routes);
        });
    }
  }, [inputData]); */

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onClose={onClose}
      onOpen={() => { }}
    >
      <Box sx={{ width: 1250 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value="map" label="Map View" />
          <Tab value="details" label="Route details" />
        </Tabs>
        {value === 'map' && (
          <div>
            {!!inputData && (
              <RouteMapDirections stops={inputData.stops} />
            )}
          </div>
        )}
        {value === 'details' && (
          <div>
            <List>
              {!!inputData && inputData.stops.map((stop: Stop) => {
                console.log(stop);
                return <div key={stop.eta}>
                  {stop.type === 'pickup' && (
                    <Divider />
                  )}
                  <ListItem style={{ backgroundColor: 'transparent' }}>
                      <ListItemIcon>
                        {stop.type === 'pickup' && (
                          <DepartureBoardIcon />
                        )}
                        {
                          stop.type === 'dropoff' && (
                            <LocalShippingIcon />
                          )
                        }
                      </ListItemIcon>
                      <div>
                        {stop.type === 'pickup' && (
                          <>
                            <strong>{stop.location}</strong>
                            <br />
                            Departure ETA: {stop.eta}
                            <br />
                          </>
                        )}
                        {
                          stop.type === 'dropoff' && (
                            <>
                              <br />
                              Arrival ETA: {stop.eta}
                              <br />
                              <strong>{stop.location}</strong>
                            </>
                          )
                        }

                      </div>
                  </ListItem>
                  {stop.type === 'dropoff' && (
                    <Divider />
                  )}
                </div>
              })}
            </List>
          </div>
        )}

      </Box>
    </SwipeableDrawer>
  );
}

export default MapDrawer;
