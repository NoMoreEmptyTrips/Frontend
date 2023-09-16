import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridTreeNodeWithRender,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import MapIcon from "@mui/icons-material/Map";
import { Box, Button } from "@mui/material";
import dayjs from "dayjs";

function Table({ openDrawer, data }: any) {
  const columns: GridColDef[] = [
    {
      field: "vehicle",
      headerName: "Vehicle",
      flex: 1,
      editable: false,
      valueGetter: (params: GridValueGetterParams) => `Truck ${params.row.id}`,
    },
    {
      field: "start_time",
      headerName: "Start",
      flex: 1,
      editable: false,
      valueGetter: (params: GridValueGetterParams) =>
        //check what is happening with time
        dayjs(params.row.stops[0].eta).format("ddd, MMM D  HH:mm"),
    },
    {
      field: "end_time",
      headerName: "End",
      flex: 1,
      editable: false,
      valueGetter: (params: GridValueGetterParams) =>
        //check what is happening with time

        dayjs(params.row.stops[params.row.stops?.length - 1].eta).format(
          "ddd, MMM D  HH:mm"
        ),
    },
    {
      field: "duration",
      headerName: "Duration",
      flex: 1,
      editable: false,
      valueGetter: (params: GridValueGetterParams) => {
        const startTime = dayjs(params.row.stops[0].eta);
        const endTime = dayjs(
          params.row.stops[params.row.stops?.length - 1].eta
        );
        return `${(Math.abs(endTime.toDate().getTime() - startTime.toDate().getTime()) / 36e5).toFixed(1)} hour(s)`;
      },
    },
    {
      field: "stops",
      headerName: "Stops",
      flex: 1,
      editable: false,
      valueGetter: (params: GridValueGetterParams) => params.row.stops.length,
    },
    {
      field: "cancel",
      headerName: "",
      sortable: false,
      flex: 1,
      disableExport: true,
      renderCell: (
        params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
      ) => {
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
          getRowId={(row) => row.id}
          rows={data.routes}
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
