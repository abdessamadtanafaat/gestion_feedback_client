import { Sidebar } from "flowbite-react"
import Layout from "../Layout/Layout"
import useAuthContext from "../../hooks/useAuthContext";
import { useEffect, useState } from "react";
import {getBusinessByUser} from '../../services/business/BusinessService'
import { useNavigate } from "react-router-dom";

export const ListOfBusiness =()=> {
    const { user } = useAuthContext();
    const navigate = useNavigate();
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
    useEffect(() => {
        const fetchBusinesses = async () => {
          try {
            const businessData = await getBusinessByUser(user);
            setBusinesses(businessData);
            
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchBusinesses();
      }, [user]);

   
  return (
    <Layout
    sidebar={Sidebar}
    content={

        <div className="bg-gray-100 min-h-screen pt-20">
         <div className="w-11/12 py-6 ml-20 text-2xl font-semibold">
            <span>Businesses Overview </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative w-11/12 mx-auto">
            {currentBusinesses.map((business) => (
              <button
                key={business.businessId}
                onClick={() => navigate(`/business-detail/${business.businessId}`)}
                className="h-[180px] w-[280px] relative cursor-pointer focus:outline-none"
              >
                <img
                  src={business.coverImageUrl}
                  alt={business.typeName}
                  className="border rounded w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white py-5 px-4 h-16 flex justify-between rounded-b">
                  <span className="text-base font-semibold">
                    {business.businessName}
                  </span>
                </div>
              </button>
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
    
    }/>
  )
};




