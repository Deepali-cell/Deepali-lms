import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/Navbar";

function MainLayout() {
  return (
    <>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default MainLayout;
