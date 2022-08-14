import {
  faBed,
  faCar,
  faPlane,
  faTaxi,
  faBars,
  faAngleDown,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

function Navbar(props) {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [logoutBarOpen, setLogoutBarOpen] = React.useState(false);

  const handleLogOut = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav
      className={
        "top-0 absolute z-40 w-full flex flex-wrap items-center justify-between px-2 py-3"
      }
    >
      <div className="px-4 mx-auto flex flex-wrap items-center w-full justify-between lg:items-start">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <Link
            className={
              "text-white text-xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap"
            }
            to="/"
          >
            BestBooking.com
          </Link>

          <button
            className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <FontAwesomeIcon className="text-white" icon={faBars} />
          </button>
        </div>
        <div
          className={
            "lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none mt-2" +
            (navbarOpen ? " block rounded shadow-lg" : " hidden")
          }
          id="example-navbar-warning"
        >
          <div className="flex flex-col  list-none lg:ml-auto lg:flex-row">
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto lg:mr-4 lg:items-start">
              <li className="flex items-center">
                <a
                  className={
                    "lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-2 flex items-center text-xs uppercase font-bold lg:border rounded-md"
                  }
                  href="/"
                >
                  <FontAwesomeIcon icon={faBed} />
                  <span className="inline-block ml-2 ">Stays</span>
                </a>
              </li>

              <li className="flex items-center">
                <Link
                  className={
                    "lg:text-white lg:hover:text-gray-300 text-gray-800 group px-3 py-2 flex flex-col items-center justify-center text-xs uppercase font-bold"
                  }
                  to="/"
                >
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faPlane} />
                    <span className="inline-block ml-2">Flights</span>
                  </div>
                  <p className="hidden text-xs text-red-500 lg:text-black group-hover:block ">
                    Unavailable!
                  </p>
                </Link>
              </li>

              <li className="flex items-center">
                <Link
                  className={
                    "lg:text-white lg:hover:text-gray-300 text-gray-800 group px-3 py-2 flex flex-col items-center justify-center text-xs uppercase font-bold"
                  }
                  to="/"
                >
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faCar} />
                    <span className="lg:inline-block ml-2">Car rentals</span>
                  </div>
                  <p className="hidden text-xs text-red-500 lg:text-black group-hover:block ">
                    Unavailable!
                  </p>
                </Link>
              </li>

              <li className="flex items-center">
                <Link
                  className={
                    "lg:text-white lg:hover:text-gray-300 text-gray-800 group px-3 py-4 lg:py-2 flex flex-col items-center justify-center text-xs uppercase font-bold"
                  }
                  to="/"
                >
                  <div>
                    <FontAwesomeIcon icon={faTaxi} />
                    <span className="lg:inline-block ml-2">Airport taxis</span>
                  </div>
                  <p className="hidden text-xs text-red-500 lg:text-black group-hover:block ">
                    Unavailable!
                  </p>
                </Link>
              </li>
            </ul>
            {user ? (
              <div className="flex lg:flex-col items-center lg:space-y-2">
                <button
                  onClick={() => setLogoutBarOpen(!logoutBarOpen)}
                  className="flex items-center space-x-2 bg-gray-300 text-gray-800 text-center text-xs font-bold capitalize px-4 py-2 h-8 rounded shadow-md w-max lg:mr-1 lg:mb-0 ml-3 mb-3"
                >
                  <p>{user && user.username}</p>
                  <FontAwesomeIcon
                    icon={faAngleDown}
                    className="hidden lg:block"
                  />
                  <FontAwesomeIcon icon={faAngleRight} className="lg:hidden" />
                </button>
                {logoutBarOpen ? (
                  <div
                    
                    className={
                      "lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none" +
                      (logoutBarOpen ? " block rounded shadow-lg" : " hidden")
                    }
                    id="example-navbar-warning"
                  >
                    <button onClick={() => handleLogOut()} className="bg-gray-300 text-gray-800 text-center text-xs font-bold capitalize px-4 py-2 h-8 rounded shadow-md  ml-3 mb-3 w-max lg:mr-1 lg:mb-0 active:scale-95">
                      Log out
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <ul
                id="register-login-btns"
                className="flex flex-col lg:flex-row list-none lg:ml-auto"
              >
                <li className="flex items-center">
                  <button
                    onClick={() => {
                      navigate("/api/login");
                    }}
                    className="bg-white text-gray-800 active:bg-gray-100 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-in-out duration-150 hover:scale-105"
                    type="button"
                  >
                    Sing In
                  </button>
                </li>

                <li className="flex items-center">
                  <button
                    onClick={() => {
                      navigate("/api/register");
                    }}
                    className="bg-white text-gray-800 active:bg-gray-100 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-in-out duration-150 hover:scale-105"
                    type="button"
                  >
                    Register
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
