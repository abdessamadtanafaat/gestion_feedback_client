/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./css/Navbar.css";
import { NavLink } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
("use client");
import { Dropdown } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBusinessTime } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const { logout } = useLogout();
  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <aside
        id="default-sidebar"
        className="fixed top-15 left-0 z-40 h-screen md:w-1/6 w-2/12 "
        aria-label="Sidebar"
      >
        <div className="h-full px-2 py-10  overflow-y-auto custom-bg-color custom-text-size">
          <p className="font-light text-sm text-gray-500 ml-4 mt-10   whitespace-nowrap ">
            Menu
          </p>
          <ul className="space-y-2 font-medium">
            <li>
              <NavLink
                exact
                to="/Workspace"
                className={({ isActive }) =>
                  isActive
                    ? "mt-4 flex items-center p-2  rounded-lg  bg-gray-100  text-black  group"
                    : "mt-4 flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100   hover:text-black dark:hover:bg-gray-700 group"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="md:w-4 md:h-4 w-6 h-6 mx-auto"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
                  />
                </svg>

                <span className="flex-1 ms-3 whitespace-nowrap hidden sm:block">
                  Workspace
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/qr-codes"
                className={({ isActive }) =>
                  isActive
                    ? "mt-4 flex items-center p-2  rounded-lg  bg-gray-100  text-black  group"
                    : "mt-4 flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100   hover:text-black dark:hover:bg-gray-700 group"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="md:w-4 md:h-4 w-6 h-6 mx-auto"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z"
                  />
                </svg>

                <span className="flex-1 ms-3 whitespace-nowrap hidden sm:block">
                  Qr Code
                </span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/list-businesses"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center p-2  rounded-lg bg-gray-100  text-black  group"
                    : "flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100  hover:text-black dark:hover:bg-gray-700 group"
                }
              >
                <FontAwesomeIcon
                  icon={faBusinessTime}
                  className="md:w-4 md:h-4 w-6 h-6 mx-auto"
                />
                <span className="flex-1 ms-3 whitespace-nowrap hidden sm:block">
                  Businesses
                </span>
              </NavLink>
            </li>

            <div className="h-8" />
            <p className="font-light text-sm text-gray-500 ml-4 ms-3 whitespace-nowrap ">
              Others
            </p>

            {/* <li>
              <NavLink to="/settings"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center p-2  rounded-lg bg-gray-100  text-black  group"
                  : "flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100  hover:text-black dark:hover:bg-gray-700 group"
              }
              >
                <a
                  href="#"
                  className="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700 group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="md:w-4 md:h-4 w-6 h-6 mx-auto"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>

                  <span className="flex-1 ms-3 whitespace-nowrap hidden sm:block">
                    Settings
                  </span>
                </a>
              </NavLink>
            </li> */}
            <li>
              <a
                onClick={handleLogout}
                className="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700 group cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="md:w-4 md:h-4 w-6 h-6 mx-auto"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                  />
                </svg>

                <span className="flex-1 ms-3 whitespace-nowrap hidden sm:block">
                  Log out
                </span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
