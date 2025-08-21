import { FaTachometerAlt, FaBook } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className="min-h-screen flex gap-x-10">
        <div className=" w-64 bg-white dark:bg-black dark:text-white text-gray-800 flex flex-col border-r border-gray-300 shadow-md px-10">
          <ul className="flex flex-col mt-6 space-y-4 p-4">
            <Link to="/admin/dashboard">
              <li className="flex items-center gap-3 cursor-pointer hover:bg-gray-300 p-2 rounded-md">
                <FaTachometerAlt />
                <span>Dashboard</span>
              </li>
            </Link>
            <Link to="/admin/cources">
              <li className="flex items-center gap-3 cursor-pointer hover:bg-gray-300 p-2 rounded-md">
                <FaBook />
                <span>Course</span>
              </li>
            </Link>
          </ul>
        </div>
        <div className="mt-10">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
