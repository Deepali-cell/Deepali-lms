import { FaTachometerAlt, FaBook, FaBars } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-black shadow">
        <h1 className="text-xl font-bold dark:text-white">Admin Panel</h1>
        <button
          onClick={() => setOpen(!open)}
          className="text-2xl dark:text-white"
        >
          <FaBars />
        </button>
      </div>

      <div className="min-h-screen flex">
        {/* SIDEBAR */}
        <div
          className={`
          fixed md:static top-0 left-0 h-full w-60 bg-white dark:bg-black dark:text-white
          border-r shadow-md px-6 py-6 transform transition-transform duration-300 z-50
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
        >
          <h2 className="text-xl font-bold mb-6 hidden md:block">
            Admin Panel
          </h2>

          <ul className="space-y-4">
            <Link to="/admin/dashboard" onClick={() => setOpen(false)}>
              <li className="flex items-center gap-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 p-2 rounded-md">
                <FaTachometerAlt />
                <span>Dashboard</span>
              </li>
            </Link>

            <Link to="/admin/cources" onClick={() => setOpen(false)}>
              <li className="flex items-center gap-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 p-2 rounded-md">
                <FaBook />
                <span>Course</span>
              </li>
            </Link>
          </ul>
        </div>

        {/* CONTENT AREA */}
        <div className="flex-1 p-4 md:ml-0 mt-16 md:mt-10">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
