import * as React from "react";
import { DataGrid, GridColDef, GridRenderCellParams, GridTreeNodeWithRender, GridValueGetterParams } from "@mui/x-data-grid";
import MapIcon from "@mui/icons-material/Map";
import { Box, Button } from "@mui/material";
import responseData from "../resources/response.json";
import dayjs from "dayjs";

function Table({ openDrawer }: any) {
  const columns: GridColDef[] = [
    {
      field: "vehicle",
      headerName: "Vehicle",
      width: 150,
      editable: true,
      valueGetter: (params: GridValueGetterParams) => params.row.vehicle,
    },
    {
      field: "start_time",
      headerName: "Start",
      width: 150,
      editable: true,
      valueGetter: (params: GridValueGetterParams) =>
        //check what is happening with time
        dayjs(params.row.stops[0].eta).format("ddd, MMM D  HH:mm"),
    },
    {
      field: "end_time",
      headerName: "End",
      width: 150,
      editable: true,
      valueGetter: (params: GridValueGetterParams) =>
        //check what is happening with time
        dayjs(params.row.stops[params.row.stops.length - 1].eta).format(
          "ddd, MMM D  HH:mm"
        ),
    },
    {
      field: "duration",
      headerName: "Duration",
      width: 150,
      editable: true,
      valueGetter: (params: GridValueGetterParams) => {
        const startTime = dayjs(params.row.stops[0].eta);
        const endTime = dayjs(
          params.row.stops[params.row.stops.length - 1].eta
        );

        const hoursDiff = endTime.diff(startTime, "hour"); // Get the difference in hours

        const hours = hoursDiff % 24; // Calculate remaining hours
        return hours;
      },
    },
    {
      field: "stops",
      headerName: "Stops",
      width: 150,
      editable: true,
      valueGetter: (params: GridValueGetterParams) => params.row.vehicle,
    },
    {
      field: "cancel",
      headerName: "",
      sortable: false,
      disableExport: true,
      width: 200,
      renderCell: (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
        return (
          <Button
            variant="contained"
            size="small"
            sx={{ textTransform: "none" }}
            endIcon={<MapIcon />}
            onClick={() => openDrawer(params.row)}
          >
            Open Map
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <Box sx={{ height: "100%", width: "100%", pt: 2 }}>
        <DataGrid
          getRowId={(row) => row.vehicle}
          rows={responseData.routes}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>
    </>
  );
}

export default Table;
