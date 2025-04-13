import { Outlet } from "react-router-dom";

import Footer from "../components/Footer";
import CustomerNavbar from "../components/CustomerNavbar";

export default function CustomerLayout() {
  return (
    <div data-theme="lemonade">
      <CustomerNavbar />
      <div className="border-t border-gray-300">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
