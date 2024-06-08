/* eslint-disable no-unused-vars */

import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Layout from "../Layout/Layout";
import BusinessInfo from "./BusinessInfo";
import BusinessType from "./BusinessType";
import { useState } from "react";
import "./create.css";
import BusinessContext from "../../context/BusinessContext";
import Sidebar from "../Layout/Sidebar";

function CreateBusinessForm() {
  const [page, setPage] = useState(0);
  const FormTitles = [
    "Select Business Type",
    "Business Infos",
  ];
  const [complete, setComplete] = useState(false);
  const{selectedOption,setSelectedOption} = useContext(BusinessContext);  

  const handleNext = () => {
    if (page === FormTitles.length - 1) {
      setComplete(true);
    } else {
      setPage(page + 1);
      setSelectedOption(false);
    }
  };
  const handlePrev = () => {
    setPage(page - 1);
  };
  const PageDisplay = () => {
    if (page === 0) {
      return <BusinessType />;
    } else if (page === 1) {
      return <BusinessInfo/>;
    }
  };


  return (
    <Layout
    sidebar={Sidebar}
      content={
        <>
          <div className="bg-[#F9F9F4] min-h-screen relative">
            <div className="pt-14 w-11/12 mx-auto">
              <h1 className="text-2xl font-bold text">{FormTitles[page]}</h1>
            </div>

            <div className="w-11/12 mx-auto">{PageDisplay()}</div>

           
            <div className=" py-2  w-11/12 mx-auto">
            {page ==1 && (
              <button
                disabled={page <= 0}
                onClick={handlePrev}
                className="navBtn w-40 h-11 border-2 border-inherit rounded-lg "
              >
                Previous
              </button>
              )}
            </div>
              {/*stepper*/}
              {/* <div className="flex flex-row gap-4">
                {[...Array(2)].map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 md:w-14 md:h-1 sm:rounded-full  border rounded-xl text-xs text-white ${
                      index < page || complete
                        ? "bg-yellow-300"
                        : "bg-slate-500"
                    }`}
                    aria-valuenow="20"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                ))}
              </div> */}
              <div className="flex justify-end py-2  w-11/12 mx-auto">
              {page==0 &&(<button
              disabled={!selectedOption}
                onClick={handleNext}
                className={`navBtn w-40 h-11 border rounded-lg ${
                  page === 1
                    ? "bg-sky-950 text-white"
                    : "bg-cyan-950 text-white border"
                }`}
              >
                {"Next"}
              </button>
              )}
              {/* {page==1 &&(<button
              disabled={!selectedOption}
                onClick={handleNext}
                className={`navBtn w-40 h-11 border rounded-lg ${
                  page === 1
                    ? "bg-sky-950 text-white"
                    : "bg-cyan-950 text-white border"
                }`}
              >
                {"Sumbit"}
              </button>
              )} */}
            </div>
             
          </div>
        </>
      }
    >
      <Outlet />
    </Layout>
  );
}

export default CreateBusinessForm;
