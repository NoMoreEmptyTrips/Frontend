import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import TruckRoutes from "../pages/TruckRoutes";
import Customers from "../pages/Customers";
import Deliveries from "../pages/Deliveries";
import Test from "../pages/Test";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
      <Route path="/routes" element={<TruckRoutes />}></Route>
      <Route path="/customers" element={<Customers />}></Route>
      <Route path="/deliveries" element={<Deliveries />}></Route>
      <Route path="/test" element={<Test />}></Route>
    </Routes>
  );
}

export default AppRoutes;
