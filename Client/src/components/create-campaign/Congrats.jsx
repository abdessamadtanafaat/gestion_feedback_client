/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import CampaignFormContext from "../../context/CampaignFormContext";
import { stars, faces } from "../../templates/template";

function Congrats() {

  const{page, setPage, selectedImage,isStar} = useContext(CampaignFormContext);
  const handlePrev = () => {
    setPage(page - 1);
  };
  const navigate = useNavigate();



 

  const navigateToQrCode = () => {
    navigate("/qr-codes");
  };

  

  return (
    <div className="flex flex-col items-center justify-center pt-20">
      <div className="">
        <div className="flex mx-auto border-gray-800 dark:border-gray-800 border-[8px] rounded-xl h-[270px] w-[470px]  mt-9">
          <div
            className="relative w-full md:w-1/2 flex bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url("${selectedImage}")`,
            }}
          >
            <div className="absolute w-full h-full bg-black opacity-70"></div>{" "}
            <ul className="w-1/5 py-14 pl-4 list-disc list-inside z-10">
              <li className="text-white"> </li>
              <li className="text-white"> </li>
              <li className="text-white"> </li>
              <li className=""> </li>
              <li className=""> </li>
            </ul>
            <div className="relative w-4/5 py-24 pr-2 text-sm text-white font-bold z-10">
              {" "}
              Comment trouvez-vous notre service ?
              <div className="absolute bottom-2 ">
                <button className="w-20 py-1 border-2 border-inherit rounded-lg">
                  Prev
                </button>
              </div>
            </div>
          </div>

          <div className=" relative flex flex-wrap justify-center w-1/2  md:py-24 bg-indigo-50">
            <div className="">
              <ul className=" absolute flex flex-wrap  left-1 right-1">
              {isStar
                  ? stars.map((star, index) => (
                    <li
                      key={index}
                      className="ml-1 mr-2 mb-2 text-sm bg-white p-2 border rounded-md"
                    >
                      <img src={star.url} alt="" className="w-6" />
                    </li>
                  )):faces.map((face, index) => (
                    <li
                    key={index}
                    className="ml-1 mr-2 mb-2 text-sm bg-white p-2 border rounded-md"
                  >
                    <img src={face.url} alt="" className="w-6" />
                  </li>
                  ))}
              </ul>
            </div>
            <div className=" absolute bottom-2">
              <button className="w-20 py-1 bg-indigo-600 text-white border rounded-lg">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="text-2xl font-bold p-4">
        <span>Congratulations</span>
      </div>
      <button onClick={handlePrev} className="w-64 bg-[#273945] text-white border font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">
        Edit campaign
      </button>
      <button
        className="w-64 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
        onClick={navigateToQrCode}
      >
        Download Qr Code
      </button>
    </div>
  );
}

export default Congrats;
