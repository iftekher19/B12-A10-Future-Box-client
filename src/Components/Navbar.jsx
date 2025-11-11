import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import Button from "../Design/Button";
import logo from "../assets/TT.png"



export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    logout()
      .then(() => toast.success("Logged out successfully"))
      .catch((err) => toast.error(err.message));
  };

  // Common nav links 
  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-primary font-semibold" : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/Available-Foods"
          className={({ isActive }) =>
            isActive ? "text-primary font-semibold" : ""
          }
        >
          Available Foods
        </NavLink>
      </li>
    </>
  );

  // Private links only visible when logged in
  const privateLinks = (
    <>
      <li>
        <NavLink
          to="/AddFood"
          className={({ isActive }) =>
            isActive ? "text-primary font-semibold" : ""
          }
        >
          Add Food
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/ManageFoods"
          className={({ isActive }) =>
            isActive ? "text-primary font-semibold" : ""
          }
        >
          Manage My Foods
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/MyRequests"
          className={({ isActive }) =>
            isActive ? "text-primary font-semibold" : ""
          }
        >
          My Food Requests
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-gradient-to-r from-cyan-50 via-teal-50 to-blue-100 shadow-md sticky top-0 z-50 text-gray-800">
      <div className="navbar-start">
        {/* Mobile dropdown */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
            {user && privateLinks}
          </ul>
        </div>

        {/* Logo and name */}
        <Link to="/" className="flex items-center space-x-1">
          <img
            src={logo}
            alt="PlateShare Logo"
            className="w-8 h-8 object-contain"
          />
          <span className="font-bold text-xl text-[#00a1b7]">
            Table<span className="text-black">Together</span>
          </span>
        </Link>
      </div>

      {/* Main menu (desktop) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-3">{navLinks}</ul>
      </div>

      {/* User/Login */}
      <div className="navbar-end">
        {!user ? (
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        ) : (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full border">
                <img
                  src={user.photoURL}
                  alt="Profile"
                  referrerPolicy="no-referrer"
                />
              </div>
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <span className="font-semibold text-center block py-1 border-b border-gray-200">
                  {user.displayName || "User"}
                </span>
              </li>

              <li>
                <NavLink
                  to="/AddFood"
                  className={({ isActive }) =>
                    isActive ? "text-primary font-semibold" : ""
                  }
                >
                  Add Food
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/ManageFoods"
                  className={({ isActive }) =>
                    isActive ? "text-primary font-semibold" : ""
                  }
                >
                  Manage My Foods
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/MyRequests"
                  className={({ isActive }) =>
                    isActive ? "text-primary font-semibold" : ""
                  }
                >
                  My Food Requests
                </NavLink>
              </li>

              <li>
                <button
                  onClick={handleLogout}
                  className="text-red-500 font-semibold"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
