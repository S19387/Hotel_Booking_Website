import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/Images/Logo.png";
import { MdOutlineShoppingCart } from "react-icons/md";

function YogaNavBar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const handleLogout = () => {
    localStorage.clear();
  
    navigate("/");
  };

  return (
    <div className="sticky top-0 w-screen">
      {/* Navigation Bar */}
      <div className="flex flex-row items-center justify-between w-full h-24 px-6 bg-white shadow-lg">
        {/* Logo */}
        <div className="flex items-center h-full">
          <Link to="/yogaHomePage" className="flex items-center h-full">
            <img src={logo} alt="logo icon" className="h-full rounded-lg pl-4 py-1" />
          </Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="block md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-800 hover:text-[#005F7E] focus:outline-none pr-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12" // Close icon
                    : "M4 6h16M4 12h16M4 18h16" // Hamburger icon
                }
              />
            </svg>
          </button>
        </div>

        {/* Links - Desktop */}
        <div className="hidden md:flex items-center gap-8 pr-20 text-xl font-semibold">
          <NavLink
            to="/yogaHomePage"
            className={({ isActive }) =>
              `px-2 py-2 no-underline ${
                isActive ? "text-[#005F7E]" : "text-gray-800"
              } hover:text-[#005F7E]`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/yogaAppointment"
            className={({ isActive }) =>
              `px-2 py-2 no-underline ${
                isActive ? "text-[#005F7E]" : "text-gray-800"
              } hover:text-[#005F7E]`
            }
          >
            Available Schedules
          </NavLink>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-md text-gray-800 bg-slate-200 hover:bg-gray-400 hover:text-[#005F7E] transition-all"
          >
            Logout
          </button>
        </div>

        {/* Links - Mobile */}
        {isMenuOpen && (
          <div className="absolute top-24 left-0 w-full bg-white shadow-lg md:hidden">
            <div className="flex flex-col items-center gap-4 py-4 text-xl font-semibold">
              <NavLink
                to="/yogaHomePage"
                className={({ isActive }) =>
                  `px-4 py-2 w-full text-center no-underline ${
                    isActive ? "text-[#005F7E]" : "text-gray-800"
                  } hover:text-[#005F7E]`
                }
                onClick={() => setIsMenuOpen(false)} // Close menu on click
              >
                Home
              </NavLink>
              <NavLink
                to="/yogaAppointment"
                className={({ isActive }) =>
                  `px-4 py-2 w-full text-center no-underline ${
                    isActive ? "text-[#005F7E]" : "text-gray-800"
                  } hover:text-[#005F7E]`
                }
                onClick={() => setIsMenuOpen(false)} // Close menu on click
              >
                Available Schedules
              </NavLink>
              <NavLink
                as="div"
                className={({ isActive }) =>
                  `px-4 py-2 w-full text-center no-underline ${
                    isActive ? "text-[#005F7E]" : "text-gray-800"
                  } hover:text-[#005F7E] hover:bg-gray-400 bg-slate-200 transition-all`
                }
                onClick={() =>{ setIsMenuOpen(false); handleLogout();}} // Close menu on click
              >
                Logout
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default YogaNavBar;
