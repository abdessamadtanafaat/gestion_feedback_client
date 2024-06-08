/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import "./css/Navbar.css";
import { Link, NavLink } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
("use client");
import { Dropdown } from "flowbite-react";
import CampaignFormContext from "../../context/CampaignFormContext";
import{hasAmysteryBoxProgram, hasAcouponCodeProgram} from '../../services/loyaltyProgrammes/programmesService';
import useAuthContext from "../../hooks/useAuthContext";


const SidebarCampaign = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedCampaignId } = useContext(CampaignFormContext);
  const[hasMysteryBox, setHasMysteryBox] = useState(false);
  const[hasCouponCode, setHasCouponCode] = useState(false);
  const{user} = useAuthContext();

  const checkForMysteryBoxProgram = async()=>{
    try {
      const response = await hasAmysteryBoxProgram(user,selectedCampaignId);
      setHasMysteryBox(response);
    } catch (error) {
      console.log(error);
    }

  }

  const checkForCouponCodeProgram = async()=>{
    try {
      const response = await hasAcouponCodeProgram(user,selectedCampaignId);
      setHasCouponCode(response);
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    checkForMysteryBoxProgram();
    checkForCouponCodeProgram();
  }, [selectedCampaignId]);
  
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
        className="fixed top-15 left-0 z-40 h-screen md:w-2/12 w-1/6 "
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-10  overflow-y-auto custom-bg-color custom-text-size">
          <p className="font-light text-sm text-gray-500 ml-4 mt-10">Menu</p>
          <ul className="space-y-2 font-medium">
            <li>
              <NavLink
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
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="md:w-4 md:h-4 w-6 h-6 mx-auto"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
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
                to={`/campaign-detail/${selectedCampaignId}`}
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
                    d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
                  />
                </svg>

                <span className="flex-1 ms-3 whitespace-nowrap hidden sm:block">
                  Statistics
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/client-management/${selectedCampaignId}`}
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
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>

                <span className="flex-1 ms-3 whitespace-nowrap hidden sm:block">
                  Client management
                </span>
              </NavLink>
            </li>

            <li>
              <span
                onClick={toggleMenu}
                className="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700 group cursor-pointer"
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
                    d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
                  />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap hidden sm:block">
                  Loyalty programs
                </span>
              </span>
              {isOpen && (
                <div className=" bg-transparent ">
                  <ul className="py-2 text-sm text-white dark:text-gray-200">
                    <li>
                      <NavLink
                        to={`/promo-codes-list/${selectedCampaignId}`}
                        className={({ isActive }) =>
                          isActive
                            ? "mt-4 flex items-center p-2  rounded-lg  bg-gray-100  text-black  group"
                            : "mt-4 flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100   hover:text-black dark:hover:bg-gray-700 group"
                        }
                        onClick={(e) => !hasCouponCode && e.preventDefault()}
                      >
                        Promo Code
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={`/mistery-box/${selectedCampaignId}`}
                        
                        className={({ isActive }) =>
                          isActive
                            ? "mt-4 flex items-center p-2  rounded-lg  bg-gray-100  text-black  group"
                            : "mt-4 flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100   hover:text-black dark:hover:bg-gray-700 group"
                        }
                        onClick={(e) => !hasMysteryBox && e.preventDefault()}
                      >
                        Mystery Box
                      </NavLink>
                    </li>
                    {/* <li>
                      <NavLink
                        to="/client-ambassador"
                        className={({ isActive }) =>
                          isActive
                            ? "mt-4 flex items-center p-2  rounded-lg  bg-gray-100  text-black  group"
                            : "mt-4 flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100   hover:text-black dark:hover:bg-gray-700 group"
                        }
                      >
                        Client Ambassador
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/raffle"
                        className={({ isActive }) =>
                          isActive
                            ? "mt-4 flex items-center p-2  rounded-lg  bg-gray-100  text-black  group"
                            : "mt-4 flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100   hover:text-black dark:hover:bg-gray-700 group"
                        }
                      >
                        Raffle
                      </NavLink>
                    </li> */}
                  </ul>
                </div>
              )}
            </li>

            <div className="h-8" />
            <p className="font-light text-sm text-gray-500 ml-4">Others</p>

            <li>
              <Link to="/settings">
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
              </Link>
            </li>
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

export default SidebarCampaign;
