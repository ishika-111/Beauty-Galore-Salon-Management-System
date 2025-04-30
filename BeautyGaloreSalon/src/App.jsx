import { Route, Routes } from "react-router-dom";
import ProductPage from "./pages/customer/ProductPage";
import HomePage from "./pages/customer/HomePage";
import ServicePage from "./pages/customer/ServicePage";
import CoursePage from "./pages/customer/CoursePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import CustomerLayout from "./layout/CustomerLayout";

import AboutUsPage from "./pages/customer/AboutUsPage";
import BookNowPage from "./pages/customer/BookNowPage";
import { Toaster } from "react-hot-toast";
import EmailVerifyPage from "./pages/EmailVerifyPage";
import CustomerRegisterForm from "./components/CustomerRegisterForm";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import Profile from "./pages/customer/Profile";
import CartPage from "./pages/cart/CartPage";
import MainLayout from "./layout/MainLayout";
import ServiceDetails from "./pages/customer/ServiceDetails";
import Payment from "./pages/payment/Payment";
import Failure from "./pages/payment/Failure";
import Success from "./pages/payment/Success";
import AppointmentList from "./components/AppointmentList";
import MyOrders from "./components/MyOrders";

export default function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/courses" element={<CoursePage />} />
          <Route path="/services" element={<ServicePage />} />
          <Route path="/aboutus" element={<AboutUsPage />} />
          <Route path="/book" element={<BookNowPage />} />
          <Route path="/customer/register" element={<CustomerRegisterForm />} />
          <Route path="/verify-email/:token" element={<EmailVerifyPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/services/:id" element={<ServiceDetails />} />
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordPage />}
          />
          <Route path="/forget" element={<ForgotPasswordPage />} />
        </Route>
        <Route path="/customer" element={<CustomerLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/customer/courses" element={<CoursePage />} />
          <Route path="/customer/profile" element={<Profile />} />
          <Route path="/customer/services" element={<ServicePage />} />
          <Route path="/customer/services/:id" element={<ServiceDetails />} />
          <Route path="/customer/aboutus" element={<AboutUsPage />} />
          <Route path="/customer/book" element={<BookNowPage />} />
          <Route
            path="/customer/book/my-appointments"
            element={<AppointmentList />}
          />
          <Route path="/customer/orders/mine" element={<MyOrders />} />

          <Route path="/customer/products" element={<ProductPage />} />
          <Route path="/customer/cart" element={<CartPage />} />
          <Route path="/customer/payment" element={<Payment />} />
          <Route path="/customer/payment/failure" element={<Failure />} />
          <Route path="/customer/payment/success" element={<Success />} />
        </Route>
      </Routes>
    </>
  );
}
