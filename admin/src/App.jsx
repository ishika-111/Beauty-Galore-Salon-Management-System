import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import DashboardLayout from "../layout/DashboardLayout";
import OrderList from "./components/Orderlist";
import AllAppointmentList from "./components/AllAppoinmentList";

export default function App() {
  return (
    <Routes>
      {/* Redirect to /login */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />

      {/* Dashboard Layout */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add/product" element={<AddProduct />} />
        <Route path="/product/list" element={<ProductList />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="/appointment" element={<AllAppointmentList />} />
      </Route>
    </Routes>
  );
}
