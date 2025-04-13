import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <div data-theme="lemonade">
      <NavBar />
      <div className="border-t border-gray-300">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
