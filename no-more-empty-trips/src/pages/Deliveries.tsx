import { Box, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { useFetch } from "usehooks-ts";
import { THEME_COLOR } from "../constants";

export type Client = {
  _id: string;
  client_code: string;
  client_latitude: number;
  client_longitude: number;
  country: string;
  date: number;
  distance: string;
  emission_factor: number;
  emission_factor_backhauling: number;
  emission_factor_loading_unloading: number;
  freight_cost_per_ton: string;
  material: null;
  material_code: null;
  plant_code: string;
  plant_latitude: number;
  plant_longitude: number;
  plant_name: string;
  product_type: string;
  vehicle_capacity: number;
  vehicle_number: string;
  vehicle_type: string;
  volume_transported: number;
};

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", type: "string", width: 130 },
  { field: "client_code", headerName: "Client Code", width: 130 },
  {
    field: "client_latitude",
    headerName: "Client Latitude",
    type: "number",
    width: 130,
  },
  {
    field: "client_longitude",
    headerName: "Client Longitude",
    type: "number",
    width: 130,
  },
  { field: "country", headerName: "Country", width: 130 },
  { field: "date", headerName: "Date", width: 130 },
  { field: "distance", headerName: "Distance", width: 130 },
  {
    field: "emission_factor",
    headerName: "Emission Factor",
    type: "number",
    width: 130,
  },
  {
    field: "emission_factor_backhauling",
    headerName: "Emission Factor Backhauling",
    type: "number",
    width: 130,
  },
  {
    field: "emission_factor_loading_unloading",
    headerName: "Emission Factor Loading Unloading",
    type: "number",
    width: 130,
  },
  {
    field: "freight_cost_per_ton",
    headerName: "Freight Cost Per Ton",
    width: 130,
  },
  { field: "material", headerName: "Material", width: 130 },
  { field: "material_code", headerName: "Material Code", width: 130 },
  { field: "plant_code", headerName: "Plant Code", width: 130 },
  {
    field: "plant_latitude",
    headerName: "Plant Latitude",
    type: "number",
    width: 130,
  },
  {
    field: "plant_longitude",
    headerName: "Plant Longitude",
    type: "number",
    width: 130,
  },
  { field: "plant_name", headerName: "Plant Name", width: 130 },
  { field: "product_type", headerName: "Product Type", width: 130 },
  {
    field: "vehicle_capacity",
    headerName: "Vehicle Capacity",
    type: "number",
    width: 130,
  },
  { field: "vehicle_number", headerName: "Vehicle Number", width: 130 },
  { field: "vehicle_type", headerName: "Vehicle Type", width: 130 },
  {
    field: "volume_transported",
    headerName: "Volume Transported",
    type: "number",
    width: 130,
  },
];

function Deliveries() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const { data, error } = useFetch<{ data: Client[] }>(
    `http://localhost:8000/trips?limit=${limit}0&page=${page}`
  );

  if (error) return <p>There is an error.</p>;
  return (
    <Box overflow="hidden">
      <Box pt={{ xs: 2, sm: 2 }}>
        <Typography fontWeight="bold" color={THEME_COLOR}>
          Deliveries
        </Typography>
        <DataGrid
          loading={data === undefined}
          rows={data?.data || []}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: page, pageSize: limit },
            },
          }}
          pageSizeOptions={[5, 10, 20]}
          onStateChange={(state) => {
            setPage(state.pagination.paginationModel.page);
            setLimit(state.pagination.paginationModel.pageSize);
            // console.log(state)
          }}
          getRowId={(row) => row._id}
        />
      </Box>
    </Box>
  );
}

export default Deliveries;
