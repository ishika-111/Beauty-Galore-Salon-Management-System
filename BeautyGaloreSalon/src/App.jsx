import { Route, Routes } from "react-router-dom";
import ProductPage from "./pages/customer/ProductPage";
import HomePage from "./pages/customer/HomePage";
import ServicePage from "./pages/customer/ServicePage";
import CoursePage from "./pages/customer/CoursePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import CustomerLayout from "./layout/CustomerLayout";
import StaffLayout from "./layout/StaffLayout";
import StaffHomePage from "./pages/staff/StaffHomePage";
import AboutUsPage from "./pages/customer/AboutUsPage";
import BookNowPage from "./pages/customer/BookNowPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CustomerLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/courses" element={<CoursePage />} />
        <Route path="/services" element={<ServicePage />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/book" element={<BookNowPage />} />
      </Route>
      <Route path="/staff" element={<StaffLayout />}>
        <Route index element={<StaffHomePage />} />
      </Route>
      <Route path="/products" element={<ProductPage />} />
    </Routes>
  );
}
