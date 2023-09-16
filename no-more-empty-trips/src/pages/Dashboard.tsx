import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  XAxis,
  Tooltip,
  YAxis,
  Area,
} from "recharts";
import mockData from "../dashboard_mock.json";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Dashboard() {
  const values = [
    { key: "avg_stops", value: "Average Stops", unit: "" },
    { key: "dropoffs", value: "Deliveries", unit: "" },
    { key: "avg_wait_time", value: "Average Wait Time", unit: "s" },
  ];

  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        <Item>
          <Typography variant="h6">Overview</Typography>
          <div style={{ height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                width={150}
                height={40}
                data={Object.keys(mockData.avg_empty_km).map((r: any) => ({
                  name: r,
                  empty: Math.round(
                    (100 / (mockData.total_odometer as any)[r]) *
                      Number((mockData.avg_empty_km as any)[r])
                  ),
                  loaded: Math.round(
                    (100 / (mockData.total_odometer as any)[r]) *
                      Number(
                        (mockData.total_odometer as any)[r] -
                          (mockData.avg_empty_km as any)[r]
                      )
                  ),
                  deliveries: Number((mockData.dropoffs as any)[r]),
                }))}
              >
                <Legend />
                <Tooltip />
                <YAxis
                  unit="%"
                  yAxisId={"km"}
                  max={100}
                  min={100}
                  domain={[0, 100]}
                />
                <YAxis orientation="right" yAxisId={"deliveries"} />
                <XAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Area
                  dataKey="empty"
                  yAxisId={"km"}
                  stackId="a"
                  fill="#dc2626"
                  stroke="#dc2626"
                />
                <Area
                  dataKey="loaded"
                  yAxisId={"km"}
                  stackId="a"
                  fill="#65a30d"
                  stroke="#65a30d"
                />
                <Line
                  type="monotone"
                  yAxisId={"deliveries"}
                  dataKey="deliveries"
                  stroke="#0284c7"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </Item>
      </Grid>

      {values.map((k) => (
        <Grid xs={12} lg={4} key={k.key}>
          <Item>
            <Typography variant="h6">{k.value}</Typography>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={150}
                  height={40}
                  data={Object.keys((mockData as any)[k.key]).map((r: any) => ({
                    name: r,
                    value: Number(((mockData as any)[k.key] as any)[r]),
                  }))}
                >
                  <YAxis unit={k.unit} /> <Tooltip />
                  <XAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Bar dataKey="value" fill="#0284c7" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Item>
        </Grid>
      ))}
    </Grid>
  );
}

export default Dashboard;
