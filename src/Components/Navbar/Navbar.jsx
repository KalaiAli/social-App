import { AuthContext } from "../../Context/AuthContext";
import { CounterContext } from "../../Context/CounterContext";
import { useContext, useState } from "react";
import { useNavigate,  NavLink } from "react-router-dom";
export default function Navbar() {
  let { userToken, setuserToken } = useContext(AuthContext);

  let navigate = useNavigate();
  useContext(CounterContext);

  const [isOpen, setisOpen] = useState(false);
  function toggleCheck() {
    setisOpen(!isOpen);
  }

  function logout() {
    localStorage.remove("tekoen");
    setuserToken(null);
    navigate("/");
  }

  return (
    <nav className="bg-neutral-primary fixed w-full  inset-s-0 border-b border-default">
      <div className="max-w-7xl flex flex-wrap md:flex-nowrap md:gap-10  items-center justify-between mx-auto p-4">
        <a
          href="#"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-7"
            alt="Flowbite Logo"
          />
          <span className="self-center text-xl text-heading font-semibold whitespace-nowrap">
            SOCIAl APP
          </span>
        </a>
        <button
          onClick={toggleCheck}
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-width="2"
              d="M5 7h14M5 12h14M5 17h14"
            />
          </svg>
        </button>
        <div
          className={`${!isOpen && "hidden"}  "hidden w-full md:flex  md:justify-between md:items-center"`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
            {userToken !== null ? (
              <>
                <li>
                  <NavLink
                    to="/home"
                    className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/Profile"
                    className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0"
                  >
                    Profile
                  </NavLink>
                </li>
              </>
            ) : (
              ""
            )}
          </ul>

          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
            {userToken == null ? (
              <>
                <li>
                  <NavLink
                    to="/"
                    className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0"
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/register"
                    className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0"
                  >
                    Register
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    onClick={logout}
                    to="/register"
                    className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0"
                  >
                    Logout
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
