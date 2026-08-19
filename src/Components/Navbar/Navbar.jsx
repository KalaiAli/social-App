import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { AuthContext } from "../../Context/AuthContext";

export default function Navbar() {
  const { userToken, setuserToken, userData } = useContext(AuthContext);

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark",
  );

  // Apply theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  function toggleMenu() {
    setIsOpen((prev) => !prev);
  }

  function closeMenu() {
    setIsOpen(false);
  }

  function toggleDarkMode() {
    setDarkMode((prev) => {
      const newMode = !prev;

      localStorage.setItem("theme", newMode ? "dark" : "light");

      return newMode;
    });
  }

  function logOut() {
    localStorage.removeItem("token");
    setuserToken(null);
    setIsOpen(false);
    navigate("/");
  }

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm dark:border-blue-300 dark:bg-blue-200">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between p-4">
        {/* Logo */}
        <NavLink
          to={userToken ? "/home" : "/"}
          onClick={closeMenu}
          className="flex items-center gap-3"
        >
          {/* Tunisian Flag */}
          <div className="flag-wrapper">
            <svg
              className="tunisian-flag"
              viewBox="0 0 900 600"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="900" height="600" fill="#E70013" />

              <circle cx="450" cy="300" r="150" fill="white" />

              <circle cx="430" cy="300" r="75" fill="#E70013" />

              <circle cx="455" cy="285" r="60" fill="white" />

              <polygon
                points="
                  500,300
                  516,346
                  564,346
                  526,374
                  540,420
                  500,392
                  460,420
                  474,374
                  436,346
                  484,346
                "
                fill="#E70013"
              />
            </svg>
          </div>

          <span className="whitespace-nowrap text-xl font-semibold text-gray-900 dark:text-blue-950">
            SOCIAL APP
          </span>
        </NavLink>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={toggleMenu}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-gray-700 hover:bg-gray-100 dark:text-blue-950 dark:hover:bg-blue-300 md:hidden"
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 7h14M5 12h14M5 17h14"
            />
          </svg>
        </button>

        {/* Menu */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } w-full md:flex md:w-auto md:flex-1 md:items-center`}
        >
          {/* Left Menu */}
          {userToken && (
            <ul className="mt-4 flex flex-col gap-4 border-t border-gray-200 pt-4 dark:border-blue-300 md:ml-8 md:mt-0 md:flex-row md:gap-8 md:border-0 md:pt-0">
              <li>
                <NavLink
                  to="/home"
                  onClick={closeMenu}
                  className="font-medium text-gray-700 hover:text-blue-600 dark:text-blue-950 dark:hover:text-blue-700"
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/profile"
                  onClick={closeMenu}
                  className="font-medium text-gray-700 hover:text-blue-600 dark:text-blue-950 dark:hover:text-blue-700"
                >
                  Profile
                </NavLink>
              </li>
            </ul>
          )}

          {/* Right Menu */}
          <ul className="mt-4 flex flex-col gap-4 md:ml-auto md:mt-0 md:flex-row md:items-center md:gap-6">
            {/* Dark Mode */}
            <li>
              <button
                type="button"
                onClick={toggleDarkMode}
                className="flex h-9 w-9 items-center justify-center rounded-full text-blue-700 hover:bg-blue-100 dark:text-blue-900 dark:hover:bg-blue-300"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            </li>

            {userToken ? (
              <>
                {/* User */}
                <li className="flex items-center gap-2">
                  {userData?.photo && (
                    <img
                      src={userData.photo}
                      alt={userData?.name || "Profile"}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  )}

                  <span className="font-semibold text-green-600 dark:text-green-700">
                    Welcome {userData?.name}
                  </span>
                </li>

                {/* Logout */}
                <li>
                  <button
                    type="button"
                    onClick={logOut}
                    className="font-medium text-gray-700 hover:text-red-500 dark:text-blue-950 dark:hover:text-red-600"
                  >
                    Logout
                  </button>
                </li>

                {/* Change Password */}
                <li>
                  <NavLink
                    to="/change-password"
                    onClick={closeMenu}
                    className="font-medium text-gray-700 hover:text-blue-600 dark:text-blue-950 dark:hover:text-blue-700"
                  >
                    Change Password
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                {/* Login */}
                <li>
                  <NavLink
                    to="/"
                    onClick={closeMenu}
                    className="font-medium text-gray-700 hover:text-blue-600 dark:text-blue-950 dark:hover:text-blue-700"
                  >
                    Login
                  </NavLink>
                </li>

                {/* Register */}
                <li>
                  <NavLink
                    to="/register"
                    onClick={closeMenu}
                    className="font-medium text-gray-700 hover:text-blue-600 dark:text-blue-950 dark:hover:text-blue-700"
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
