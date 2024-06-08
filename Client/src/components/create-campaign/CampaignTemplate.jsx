/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState, useEffect, useRef, useContext } from "react";
import CampaignFormContext from "../../context/CampaignFormContext";
import { stars, faces } from "../../templates/template";
function CampaignTemplate() {
  const {
    setSelectedOption,
    setBackgroundImage,
    isStar,
    setIsStar,
    selectedImage, setSelectedImage
  } = useContext(CampaignFormContext);
 

  useEffect(() => {
    setSelectedOption(true);
  }, [setSelectedOption]);

  const toggleEmojis = () => {
    setIsStar(!isStar); // Toggle between stars and faces
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    processSelectedFile(selectedFile);
  };
  const processSelectedFile = (selectedFile) => {
    setBackgroundImage(selectedFile);
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <div className="flex flex-row">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-40 h-10  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center py-5">
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">upload image</span>
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              name="file"
            />
          </label>
          <div className="ml-2  flex">
            <button
              className={`flex-1 px-2 py-1 rounded-md ${
                isStar ? "bg-blue-500" : "bg-gray-300"
              }`}
              onClick={toggleEmojis}
            >
              <img
                src="src/assets/star-emojis/star4.png"
                alt=""
                className="w-8"
              />
            </button>
            <button
              className={`flex-1 px-2 py-1 rounded-md ${
                !isStar ? "bg-blue-500" : "bg-gray-300"
              }`}
              onClick={toggleEmojis}
            >
              <img
                src="src/assets/face-emojis/smile1.png"
                alt=""
                className="w-8"
              />
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between px-24 py-4">
        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
          <div className="hidden md:flex sm:flex mx-auto border-gray-800 dark:border-gray-800 border-[8px] rounded-xl h-[270px] w-[470px]  mt-9">
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

          <div className="relative mx-auto border-gray-800 dark:border-gray-800 border-[14px] rounded-[2.5rem] h-[350px] w-48">
            <div
              className="relative bg-cover bg-no-repeat w-full h-1/2 border-t-0 border-l-0 border-r-0 border-gray-800 dark:border-gray-800 rounded-t-md"
              style={{
                backgroundImage: `url("${selectedImage}")`,
              }}
            >
              <div className="absolute w-full h-full bg-black opacity-70"></div>{" "}
              {/* This creates a transparent overlay */}
              <p className="relative z-10 text-white text-xl font-bold py-7 px-4">
                How satisfied are you with our service ?
              </p>
              <ul className="absolute z-10 w-11/12 mx-auto right-0 left-0 bottom-0 list-disc list-inside flex flex-row items-center justify-center">
                <li className="text-white"> </li>
                <li className="text-white"> </li>
                <li className="text-white"> </li>
                <li className=""> </li>
                <li className=""> </li>
              </ul>
            </div>

            <div className="bg-indigo-50 h-1/2 border border-gray-800 dark:border-gray-800 rounded-b-lg">
              <ul className="flex items-center justify-center pt-16">
                {isStar
                  ? stars.map((star, index) => (
                      <li
                        key={index}
                        className="mr-2 text-sm bg-white p-1 border rounded-md"
                      >
                        <img src={star.url} alt="" className="" />
                      </li>
                    ))
                  : faces.map((face, index) => (
                      <li
                        key={index}
                        className="mr-2 text-sm bg-white p-1 border rounded-md"
                      >
                        <img src={face.url} alt="" className="" />
                      </li>
                    ))}
              </ul>
              <div className="flex justify-center py-8">
                <button className="w-20 mr-4 border-2 text-gray-600 border-inherit rounded-lg">
                  Prev
                </button>
                <button className="w-20 bg-indigo-600 text-white border rounded-lg">
                  Next
                </button>
              </div>
            </div>
            <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
            <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
            <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
            <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CampaignTemplate;
