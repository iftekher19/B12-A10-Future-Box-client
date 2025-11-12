import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import Button from "../Design/Button";
import logo from "../assets/TT.png"



export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Handle logout
  const handleLogout = () => {
    logout()
      .then(() => toast.success("Logged out successfully"))
      .catch((err) => toast.error(err.message));
  };
  // Shared function to close the dropdown after clicking a link
  const handleNavClick = (path) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  const navLinks = (
    <>
      <li>
        <button
          onClick={() => handleNavClick("/")}
          className="text-left w-full"
        >
          Home
        </button>
      </li>
      <li>
        <button
          onClick={() => handleNavClick("/Available-Foods")}
          className="text-left w-full"
        >
          Available Foods
        </button>
      </li>
    </>
  );

  const privateLinks = (
    <>
      <li>
        <button
          onClick={() => handleNavClick("/AddFood")}
          className="text-left w-full"
        >
          Add Food
        </button>
      </li>
      <li>
        <button
          onClick={() => handleNavClick("/ManageFoods")}
          className="text-left w-full"
        >
          Manage My Foods
        </button>
      </li>
      <li>
        <button
          onClick={() => handleNavClick("/MyRequests")}
          className="text-left w-full"
        >
          My Food Requests
        </button>
      </li>
    </>
  );

  return (
    <div className="navbar bg-gradient-to-r from-cyan-50 via-teal-50 to-blue-100 shadow-md sticky top-0 z-50 text-gray-800">

      <div className="navbar-start">
        {/* Mobile dropdown */}
        <div className="dropdown">
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="btn btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {isMenuOpen && (
            <ul
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              onClick={() => setIsMenuOpen(false)}
            >
              {navLinks}
              {user && privateLinks}
            </ul>
          )}
        </div>

        {/* Logo */}
        <Link to="/" className="flex items-center space-x-1">
          <img src={logo} alt="Logo" className="w-8 h-8 object-contain" />
          <span className="font-bold text-xl text-[#00a1b7]">
            Table<span className="text-black">Together</span>
          </span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-3">{navLinks}</ul>
      </div>

      <div className="navbar-end">
        {!user ? (
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        ) : (
          <div className="dropdown dropdown-end relative">
          {/* avatar button */}
          <button
            onClick={() => setIsProfileOpen((prev) => !prev)}
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full border">
              <img
                src={user.photoURL}
                alt="Profile"
                referrerPolicy="no-referrer"
              />
            </div>
          </button>

          {/* profile menu */}
          {isProfileOpen && (
            <ul
              className="menu menu-sm absolute right-0 mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50"
              onClick={() => setIsProfileOpen(false)} 
            >
              <li>
                <span className="font-semibold text-center block py-1 border-b border-gray-200">
                  {user.displayName || "User"}
                </span>
              </li>

              <li>
                <NavLink to="/AddFood">Add Food</NavLink>
              </li>
              <li>
                <NavLink to="/ManageFoods">Manage My Foods</NavLink>
              </li>
              <li>
                <NavLink to="/MyRequests">My Food Requests</NavLink>
              </li>

              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsProfileOpen(false);
                  }}
                  className="text-red-500 font-semibold"
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
        )}
      </div>
    </div>
  );
}
