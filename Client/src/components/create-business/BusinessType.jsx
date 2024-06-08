/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Layout from "../Layout/Layout";
import axios from "axios";
import { useState, useEffect } from "react";
import useAuthContext from "../../hooks/useAuthContext";
import {
  getBusinessByCatg,
  getBusinessCategories,
} from "../../services/business/BusinessService";
import BusinessContext from "../../context/BusinessContext";
import Slider from "react-slick";

function BusinessType() {
  const { user } = useAuthContext();
  const { selectedBusiness, setSelectedBusiness, setSelectedOption } =
    useContext(BusinessContext);

  const [categories, setCategories] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const businessesPerPage = 6;
  const indexOfLastBusiness = currentPage * businessesPerPage;
  const indexOfFirstBusiness = indexOfLastBusiness - businessesPerPage;
  const currentBusinesses = businesses.slice(
    indexOfFirstBusiness,
    indexOfLastBusiness
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const fetchCategories = async () => {
    try {
      const categoriesData = await getBusinessCategories(user);
      setCategories(categoriesData);
      
    } catch (error) {
      console.error(error);
    }
  };

  const handleCategoryClick = (categorie) => {
    paginate(1);
    setSelectedBusiness({
      ...selectedBusiness,
      businessCatgId: categorie.id,
    });
  };

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const businessTypesData = await getBusinessByCatg(
          user,
          (selectedBusiness.businessCatgId || 1)
        );
        setBusinesses(businessTypesData);
      } catch (error) {
        console.error(error);
        setBusinesses([]);
      }
    };
    fetchCategories();
    fetchBusinesses();
  }, [user, selectedBusiness]);

  const sliderSettings = {
    accessibility: true,
    dots: false,
    infinite: categories.length > 4,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: categories.length > 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div>
        <div className="pt-2 flex justify-between">
          <p>Select the type of your business.</p>
        </div>
        <div className="w-11/12 px-5 py-3 ">
          <Slider {...sliderSettings}>
          {categories.map((categorie) => (
        <div
          key={categorie.businessCategoryId}
          className="text-center"
        >
          <img
            src={categorie.photoUrl}
            alt={categorie.categoryName}
            className={`w-16 h-16 mx-auto bg-white py-2 border-2 ${
              selectedBusiness.businessCatgId === categorie.id
                ? 'border-yellow-500' // Change border color to yellow when selected
                : 'border-inherit'
            } px-2 rounded-full cursor-pointer`}
            onClick={() => handleCategoryClick(categorie)}
            loading="lazy"
          />
          <div className="pt-3">{categorie.categoryName}</div>
        </div>
      ))}
          </Slider>
        </div>
        <div className="grid grid-col-1 md:grid-cols-3 gap-4 relative">
          {currentBusinesses.map((business) => (
            <div key={business.id} className="h-[150px] w-[250px] relative">
              <img
                src={business.photoUrl}
                alt={business.typeName}
                className="border rounded w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-blue-gray-900 bg-opacity-80 text-white py-5 px-4 h-16 flex justify-between rounded-b">
                <label
                  htmlFor={`radio-${business.id}`}
                  className="text-base font-semibold"
                >
                  {business.typeName}
                </label>
                <input
                  type="radio"
                  id={`radio-${business.id}`}
                  name="businessType"
                  className="appearance-none w-5 h-5 border border-inherit rounded-full bg-opacity-50 checked:bg-cyan-600 checked:border-2"
                  onChange={() => {
                    setSelectedBusiness({
                      ...selectedBusiness,
                      businessTypeId: business.id,
                    });
                    setSelectedOption(true);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          {businesses.length > businessesPerPage && (
            <ul className="flex justify-center mt-4">
              {Array.from({
                length: Math.ceil(businesses.length / businessesPerPage),
              }).map((_, index) => (
                <li key={index} className="mx-1">
                  <button
                    className={`px-3 py-1 rounded-md ${
                      currentPage === index + 1
                        ? "bg-gray-800 text-white"
                        : "bg-gray-300 text-gray-700"
                    }`}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default BusinessType;
