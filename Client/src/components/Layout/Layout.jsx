/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import SidebarCampaign from "./SidebarCampaign";

const Layout = ({ content, sidebar, sidebarCampaign }) => {
  return (
    <>
      <React.Fragment >
        <section>
          <div className="fixed top-0 left-0 w-full z-50">
            <Navbar />
          </div>
        </section>
        {/* bg-[#2f424f] */}
        <section className="dark:bg-gradient-to-r from-[#273945] via-[#2a3d48] to-[#354951]">
        <div className="flex flex-row">
            <div className="md:w-1/6 w-2/12">
            {sidebar && <Sidebar />}
            {sidebarCampaign && <SidebarCampaign />}

            </div>

            <div className="md:w-5/6 w-10/12">
              {content}
            </div>
          </div>
        </section>
      </React.Fragment>
    </>
  );
};
export default Layout;
