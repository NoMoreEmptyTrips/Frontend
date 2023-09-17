import { Box, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { useFetch } from "usehooks-ts";
import { THEME_COLOR } from "../constants";

const apiUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL;

export type Client = {
  _id: string;
  code: string;
  latitude: number;
  longitude: number;
};

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", type: "string", width: 130 },
  { field: "code", headerName: "Code", width: 130 },
  { field: "latitude", headerName: "Latitude", type: "number", width: 130 },
  {
    field: "longitude",
    headerName: "Longitude",
    type: "number",
    width: 130,
  },
];

function Customers() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const { data, error } = useFetch<{ data: Client[] }>(
    `${apiUrl}/clients?limit=${limit}0&page=${page}`
  );

  if (error) return <p>There is an error.</p>;
  return (
    <Box overflow="hidden">
      <Box pt={{ xs: 2, sm: 2 }}>
        <Typography fontWeight="bold" color={THEME_COLOR}>
          Customers
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

export default Customers;
