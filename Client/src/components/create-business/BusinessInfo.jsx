/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { Component, useContext, useRef, useState } from "react";
import InputWithDropdown from "./tools/Inputs/InputWithDropdown";
import { Toast } from "primereact/toast";
import FacebookInput from "./tools/Inputs/FacebookInput";
import GoogleInput from "./tools/Inputs/GoogleInput";
import InstagramInput from "./tools/Inputs/InstagramInput";
import DragNDrop from "./tools/Inputs/DragNDrop";
import EmailInput from "./tools/Inputs/EmailInput";
import AdressInput from "./tools/Inputs/AdressInput";
import { createBusiness } from "../../services/business/BusinessService";
import BusinessContext from "../../context/BusinessContext";
import useAuthContext from "../../hooks/useAuthContext";
const BusinessInfo = () => {
  const { businessData, setBusinessData, selectedBusiness, file, resetForm } =
    useContext(BusinessContext);
  const { user } = useAuthContext();
  const toast = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleNewBusiness = async (e) => {
    e.preventDefault();
    try {
      console.log(selectedBusiness.businessTypeId);
      setIsLoading(true);
      const response = await createBusiness(
        user,
        businessData,
        selectedBusiness.businessTypeId,
        file
      );
      console.log(response);
      resetForm();
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'Your new business has been successfully registered.', life: 3000 });
    } catch (error) {
      console.error(error);
      
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="bg-create min-h-screen pb-3">
        <div className="p-2 flex justify-between">
          <p>
            Please provide all the necessary details about your business in the
            form below.
          </p>
        </div>
        <section className="bg-white dark:bg-gray-900 mt-5 mr-10 border border-gray-400 rounded-lg">
          <div className="pl-12 px-2 max-w-4xl lg:py-12">
          <Toast ref={toast} />
            <form onSubmit={handleNewBusiness}>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="sm:col-span-2">
                  <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    Business Name
                  </h2>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Your business name"
                    required
                    value={businessData.businessName}
                    onChange={(event) => {
                      setBusinessData({
                        ...businessData,
                        businessName: event.target.value,
                      });
                    }}
                  />
                </div>
                <div className="sm:col-span-2 mt-4">
                  <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    Contact info
                  </h2>
                  <label
                    htmlFor="adress"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Adress
                  </label>
                  <div className="w-full">
                    <AdressInput
                      setBusinessData={setBusinessData}
                      businessData={businessData}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone
                  </label>
                  <div className="w-full">
                    <InputWithDropdown
                      setBusinessData={setBusinessData}
                      businessData={businessData}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <div className="w-full">
                    <EmailInput
                      setBusinessData={setBusinessData}
                      businessData={businessData}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    Social networks
                  </h2>
                  <div className="mb-5 max-w-[24rem]">
                    <GoogleInput
                      setBusinessData={setBusinessData}
                      businessData={businessData}
                    />
                  </div>
                  <div className="mb-5 max-w-[24rem]">
                    <FacebookInput
                      setBusinessData={setBusinessData}
                      businessData={businessData}
                    />
                  </div>
                  <div className="mb-5 max-w-[24rem]">
                    <InstagramInput
                      setBusinessData={setBusinessData}
                      businessData={businessData}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    Business cover
                  </h2>
                  <DragNDrop
                    setBusinessData={setBusinessData}
                    businessData={businessData}
                  />
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    type="submit"
                  >
                    {isLoading ? (
                      <div className="h-5 w-5 border-t-2 border-b-2 border-blue-100 rounded-full animate-spin"></div>
                    ) : (
                      "Add new Business"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default BusinessInfo;
