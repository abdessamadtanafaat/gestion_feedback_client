/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from "react";
import useAuthContext from "../../hooks/useAuthContext";
import { getBusinessByUser } from "../../services/business/BusinessService";

import { useNavigate } from "react-router-dom";
import CampaignFormContext from "../../context/CampaignFormContext";

function CampaignBusiness() {
  const { user } = useAuthContext();
  const { campaignData, setCampaignData, setSelectedOption } =
    useContext(CampaignFormContext);
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(null);

  // const [currentPage, setCurrentPage] = useState(1);
  // const businessesPerPage = 6;
  // const indexOfLastBusiness = currentPage * businessesPerPage;
  // const indexOfFirstBusiness = indexOfLastBusiness - businessesPerPage;
  // const currentBusinesses = searchResult.slice(
  //   indexOfFirstBusiness,
  //   indexOfLastBusiness
  // );
  // const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchBusinesses = async () => {
      setIsLoading(true);
      try {
        const businessData = await getBusinessByUser(user);
        setBusinesses(businessData);
        setSearchResult(businessData);
        if (campaignData.businessId != "") {
          setSelectedOption(true);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        // Ensure loading indicator is turned off whether login succeeds or fails
        setIsLoading(false);
      }
    };

    fetchBusinesses();
  }, [campaignData, setSelectedOption, user]);

  const handleSearchChange = (e) => {
    if (!e.target.value) return setSearchResult(businesses);

    const resultsArray = businesses.filter((business) =>
      business.businessName.includes(e.target.value)
    );
    setSearchResult(resultsArray);
  };

  const redirectToCreateBusinessPage = () => {
    navigate("/create-business");
  };

  return (
    <div>
      <div className="flex justify-between py-5">
        <p>Please select the business from the list</p>
        <input
          type="text"
          id="search"
          className="w-64 p-4 py-2 text-sm text-gray-900 border border-gray-300 rounded bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search for your business"
          onChange={handleSearchChange}
        />
      </div>
      
      <div className="flex flex-row gap-6 py-5  overflow-x-scroll pb-4 hide-scroll-bar relative ">
      {isLoading && campaignData.businessId === "" ? (
        <div>Loading...</div>
      ) : (
        !businesses.length ? (
          <div className=" w-3/4 mx-auto flex flex-col items-center justify-center">
            <p className="mb-4">No businesses found.</p>
            <p className="mb-4">Please create a business first to continue.</p>
            <button onClick={() => redirectToCreateBusinessPage()} 
              className="mt-4 mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Create Business
            </button>
          </div>
        ) : (
          searchResult.map((business) => (
            <div
              key={business.businessId}
              className="w-[384px] h-[244px] flex-shrink-0 sm:w-1/4 relative"
            >
              <img
                src={business.coverImageUrl}
                alt={business.typeName}
                className="border rounded-lg w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white py-2 px-4 h-16 flex justify-between rounded-b-lg">
                <label
                  htmlFor={`radio-${business.businessId}`}
                  className="text-base font-semibold"
                >
                  {business.businessName}
                </label>
                <input
                  type="radio"
                  id={`radio-${business.businessId}`}
                  name="businessType"
                  checked={campaignData.businessId === business.businessId}
                  onChange={() =>
                    setCampaignData({
                      ...campaignData,
                      businessId: business.businessId,
                    })
                  }
                  className="appearance-none w-5 h-5 border border-inherit rounded-full bg-opacity-50 checked:bg-amber-300 checked:border-2"
                />
              </div>
            </div>
          ))
        )
      )}
      </div>
      {/* <div className="flex justify-center ">
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
      </div> */}
    </div>
  );
}

export default CampaignBusiness;
