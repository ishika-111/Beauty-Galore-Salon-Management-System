import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import CustomerNavbar from "../components/CustomerNavbar";

export default function CustomerLayout() {
  return (
    <>
      <CustomerNavbar />
      <Outlet />
      <Footer />
    </>
  );
}
