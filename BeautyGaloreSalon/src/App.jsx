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
import { Toaster } from "react-hot-toast";
import EmailVerifyPage from "./pages/EmailVerifyPage";
import CustomerRegisterForm from "./components/CustomerRegisterForm";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import Profile from "./pages/customer/Profile";
import CartPage from "./pages/customer/CartPage.jsx";

export default function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/courses" element={<CoursePage />} />
          <Route path="/services" element={<ServicePage />} />
          <Route path="/aboutus" element={<AboutUsPage />} />
          <Route path="/book" element={<BookNowPage />} />
          <Route path="/customer/home" element={<HomePage />} />
          <Route path="/customer/register" element={<CustomerRegisterForm />} />
          <Route path="/verify-email/:token" element={<EmailVerifyPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordPage />}
          />
          <Route path="/forget" element={<ForgotPasswordPage />} />
        </Route>
        <Route path="/staff" element={<StaffLayout />}>
          <Route index element={<StaffHomePage />} />
          <Route path="/staff/home" element={<StaffHomePage />} />
        </Route>
      </Routes>
    </>
  );
}
