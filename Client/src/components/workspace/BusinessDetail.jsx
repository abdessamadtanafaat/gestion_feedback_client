import { Sidebar } from "flowbite-react";
import Layout from "../Layout/Layout";
import { useParams } from "react-router-dom";
import { Toast } from "primereact/toast";

import useAuthContext from "../../hooks/useAuthContext";
import {
  getBusinessDetails,
  updateBusiness,
} from "../../services/business/BusinessService";
import { useEffect, useRef, useState } from "react";
export const BusinessDetail = () => {
  const { user } = useAuthContext();
  const toast = useRef(null);

  const { businessId } = useParams();
  const [businessDetails, setBusinessDetails] = useState({});
  const [isLoading, setIsLoading] = useState(null);

  const updateBusinessInfo = async () => {
    setIsLoading(true);
    try {
      await updateBusiness(user, businessId, businessDetails);
      setIsLoading(false);
      toast.current.show({ severity: 'success', summary: 'Update Successful',
      detail: 'The business information has been updated successfully.', life: 3000 });

    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchBusinessesDetail = async () => {
      try {
        const response = await getBusinessDetails(user, businessId);
        setBusinessDetails(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBusinessesDetail();
  }, [user, businessId]);

  return (
    <Layout
      sidebar={Sidebar}
      content={
        <div className="bg-gray-100 min-h-screen pt-24 ">
          <div className="container px-5 mx-auto ">
          <Toast ref={toast} />
            <div className="w-4/5 py-6 ml-20 text-2xl font-semibold">
              <span>Business Details </span>
            </div>
            <div className="lg:w-4/5 mx-auto flex flex-wrap border-2 border-inherit rounded-md">
              <img
                alt="ecommerce"
                className="lg:w-1/2 w-full h-1/4 my-auto object-cover object-center rounded border border-gray-200"
                src={businessDetails.coverImageUrl}
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 flex-shrink-0 overflow-y-auto max-h-96 px-5">
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
                  value={businessDetails.businessName}
                  onChange={(event) => {
                    setBusinessDetails({
                      ...businessDetails,
                      businessName: event.target.value,
                    });
                  }}
                />
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Your business name"
                  required
                  value={businessDetails.email}
                  onChange={(event) => {
                    setBusinessDetails({
                      ...businessDetails,
                      email: event.target.value,
                    });
                  }}
                />
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  phone
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Your business name"
                  required
                  value={businessDetails.phone}
                  onChange={(event) => {
                    setBusinessDetails({
                      ...businessDetails,
                      phone: event.target.value,
                    });
                  }}
                />
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Your business address"
                  required
                  value={businessDetails.address}
                  onChange={(event) => {
                    setBusinessDetails({
                      ...businessDetails,
                      address: event.target.value,
                    });
                  }}
                />
                <label
                  htmlFor="facebookLink"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  facebookLink
                </label>
                <input
                  type="text"
                  name="facebookLink"
                  id="facebookLink"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Your business facebookLink"
                  required
                  value={businessDetails.facebookLink}
                  onChange={(event) => {
                    setBusinessDetails({
                      ...businessDetails,
                      facebookLink: event.target.value,
                    });
                  }}
                />
                <label
                  htmlFor="instagramLink"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  instagramLink
                </label>
                <input
                  type="text"
                  name="instagramLink"
                  id="instagramLink"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Your business instagramLink"
                  required
                  value={businessDetails.instagramLink}
                  onChange={(event) => {
                    setBusinessDetails({
                      ...businessDetails,
                      instagramLink: event.target.value,
                    });
                  }}
                />
                <label
                  htmlFor="googleLink"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  googleLink
                </label>
                <input
                  type="text"
                  name="googleLink"
                  id="googleLink"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Your business name"
                  required
                  value={businessDetails.googleLink}
                  onChange={(event) => {
                    setBusinessDetails({
                      ...businessDetails,
                      googleLink: event.target.value,
                    });
                  }}
                />

                <div className="flex justify-end mt-3">
                  <button
                    className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    disabled={isLoading}
                    onClick={updateBusinessInfo}
                  >
                    {isLoading ? (
                      <div className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                    ) : (
                      <span>Update</span>
                    )}
                  </button>
                  {/* <button 
                  className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                    delete
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
};
