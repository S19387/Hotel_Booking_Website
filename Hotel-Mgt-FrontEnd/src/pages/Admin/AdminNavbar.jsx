import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/Images/Logo.png";
import { MdOutlineShoppingCart } from "react-icons/md";

function AdminNavbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const handleLogout = () => {
    localStorage.clear();
  
    navigate("/");
  };

  return (
    <div className="sticky top-0 w-screen ">
      {/* navigation bar */}
      <div className="flex flex-row items-center justify-between w-screen h-24 px-10 bg-white shadow-lg -z-50">
        <div className="flex flex-row justify-center h-full bg-white">
          <Link className="flex flex-row px-5 py-2 bg-white" to="/yogaHomePage">
            <img src={logo} alt="logo icon" className="rounded-lg" />
          </Link>
        </div>
        <div className="flex flex-row items-center justify-start h-full gap-8 pr-5 text-xl font-semibold bg-white">
          <NavLink
            to="/admins"
            className={({ isActive }) =>
              `px-2 py-2 no-underline ${
                isActive ? "text-[#005F7E]" : "text-gray-800"
              } hover:text-[#005F7E]`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/yogaServiceAdd"
            className={({ isActive }) =>
              `px-2 py-2 no-underline ${
                isActive ? "text-[#005F7E]" : "text-gray-800"
              } hover:text-[#005F7E]`
            }
          >
            Add YogaService
          </NavLink>

          <NavLink
            to="/yogaServiceList"
            className={({ isActive }) =>
              `px-2 py-2 no-underline ${
                isActive ? "text-[#005F7E]" : "text-gray-800"
              } hover:text-[#005F7E]`
            }
          >
            Yoga Service List
          </NavLink>

          <NavLink
            to="/yogaBookings"
            className={({ isActive }) =>
              `px-2 py-2 no-underline ${
                isActive ? "text-[#005F7E]" : "text-gray-800"
              } hover:text-[#005F7E]`
            }
          >
            All Yoga Bookings
          </NavLink>

          <NavLink
            to="/addInstructor"
            className={({ isActive }) =>
              `px-2 py-2 no-underline ${
                isActive ? "text-[#005F7E]" : "text-gray-800"
              } hover:text-[#005F7E]`
            }
          >
            Add Instructor
          </NavLink>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-md text-gray-800 bg-slate-200 hover:bg-gray-400 hover:text-[#005F7E] transition-all"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminNavbar;
