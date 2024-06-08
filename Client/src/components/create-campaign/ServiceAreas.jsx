/* eslint-disable react/prop-types */
import { useState, useEffect, useRef, useCallback, useContext } from "react";
import {getAllServiceAreas, addNewServiceArea} from '../../services/campaign/createCampaignService'
import useAuthContext from "../../hooks/useAuthContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
// import sliderSettings from '../../config/sliderSettings'

import CampaignFormContext from "../../context/CampaignFormContext";
function ServiceAreas() {
  const {user} = useAuthContext();
  const { campaignData, setCampaignData, setSelectedOption } = useContext(CampaignFormContext);

  const [serviceCategories, setServiceCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const[serviceName, setServiceName] = useState("");
  const[error, setError] = useState("");



  const sliderSettings = {
    accessibility: true,
    dots: false,
    infinite: serviceCategories.length > 3,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: serviceCategories.length > 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  

 
    
  const errRef = useRef();
  useEffect(() => {
    setError("");
  }, [serviceName]);

  const fetchCategories = useCallback(async () => {
    try {
      const servicesData = await getAllServiceAreas(user);
      setServiceCategories(servicesData);
      console.log(servicesData);
      if (campaignData.serviceAreas.length >= 1) {
        setSelectedOption(true);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, [user, campaignData.serviceAreas.length,setSelectedOption]);
  
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);
  
  const handleAddServiceArea = async (e) => {
    e.preventDefault();
    try{
      const response = await addNewServiceArea({serviceName}, user);
      console.log(response);
      setServiceName("");
      fetchCategories();
      setShowModal(false)
    }catch(error)
    {
      setError(error?.response?.data);
      errRef.current.focus();
    }
    
  }


  const handleSelectedService = (event, selectedServiceArea) => {
    const checked = event.target.checked;
    setCampaignData((prevData) => {
      let updatedServiceAreas;
      if (checked) {
        // Add the serviceArea object to the serviceAreas array
        updatedServiceAreas = [...prevData.serviceAreas, selectedServiceArea];
      } else {
        // Remove the serviceArea object from the serviceAreas array
        updatedServiceAreas = prevData.serviceAreas.filter(
          (area) => area.id !== selectedServiceArea.id
        );
      }
      const hasNoServiceAreas = updatedServiceAreas.length === 0;
      setSelectedOption(!hasNoServiceAreas);
      return { ...prevData, serviceAreas: updatedServiceAreas };
    });
  };
  
  
  const isServiceAreaSelected = (serviceArea) => {
    return campaignData.serviceAreas.some((area) => area.id === serviceArea.id);
  };




  return (
    <div className="">
      <div className="flex justify-between items-center py-2">
        <div className="">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div>
          <button
            className="py-3 w-40 px-2 bg-cyan-950 rounded-md text-white  text-l"
            onClick={() => setShowModal(true)}
          >
            + Add New{" "}
          </button>
        </div>
      </div>

      <div className=""> 
      <Slider {...sliderSettings}>
        {serviceCategories.map((category) => (
          <div
            key={category.id}
            className="bg-white flex-shrink-0 border border-inherit rounded-b rounded-t"
          >
            <div className="p-4 boder border-b ">
              <span className="font-bold text-md">{category.name}</span>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
            </div>
            <ul className="overflow-y-auto h-64">
              {category.serviceAreas.map((serviceArea) => (
                <li
                  key={serviceArea.id}
                  className="border border-inherit px-3 py-2 mx-5 my-4 rounded-lg flex justify-between items-center hover:bg-gray-100"
                >
                  <div className="flex flex-row items-center">
                    <img
                      src={category.photoUrl}
                      alt="Service Icon"
                      className="w-5 h-5 mr-2"
                    />
                    <label htmlFor={`service${serviceArea.id}`}>
                      {serviceArea.name}
                    </label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id={`service${serviceArea.id}`}
                      className="appearance-none w-5 h-5 border border-inherit rounded-full bg-slate-100 checked:bg-blue-800 checked:border-2"
                      onChange={(event) =>
                        handleSelectedService(event, serviceArea)
                      }
                      checked={isServiceAreaSelected(serviceArea)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Slider>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">New service area</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {setShowModal(false);setError("");setServiceName("")}}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <form onSubmit={handleAddServiceArea}>
                {/*body*/}
                <div
              className={
                error
                  ? "error text-red-500 w-full  bg-red-100 mt-1  border-red-500 rounded-md p-3 mb-3"
                  : "offscreen"
              }
              aria-live="assertive"
              ref={errRef}
              
            >
              {error}
            </div>
                <div className="relative p-6 flex-auto">
                  <input
                    type="text"
                    className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
                    placeholder="Enter your service area"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                   
                  />
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {setShowModal(false);setError("");setServiceName("")}}
                  >
                    Close
                  </button>
                  <button
                    className="bg-cyan-950 text-white  font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Add service area
                  </button>
                </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}

export default ServiceAreas;
