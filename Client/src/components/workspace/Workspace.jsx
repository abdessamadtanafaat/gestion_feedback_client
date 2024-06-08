/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import useAuthContext from "../../hooks/useAuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useLogout } from "../../hooks/useLogout";
// import sliderSettings from '../../config/sliderSettings'
import { getCampaignsOverView } from "../../services/workspace/workspaceService";
import { getBusinessByUser } from "../../services/business/BusinessService";
import { Outlet } from "react-router-dom";
import Layout from "../Layout/Layout";
import Sidebar from "../Layout/Sidebar";
import CampaignFormContext from "../../context/CampaignFormContext";
export default function Workspace() {
  const { user } = useAuthContext();
  // const [campaignId, setCampaignId] = useState(null);
  const { selectedCampaignId, setSelectedCampaignId } =
    useContext(CampaignFormContext);
  const navigate = useNavigate();
  const handleNewCampaign = () => navigate("/create-campaign");
  const handleNewBusiness = () => navigate("/create-business");
  const handleCampaignDetail = (campaignId) => {
    setSelectedCampaignId(campaignId);
    navigate(`/campaign-detail/${campaignId}`);
  };

  const [campaignsData, setCampaignsData] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const campaignData = await getCampaignsOverView(user);
        setCampaignsData(campaignData);
        console.log(campaignData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCampaigns();
  }, [user]);
  //test

  const sliderSettings = {
    accessibility: true,
    dots: false,
    infinite: campaignsData.length > 3,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: campaignsData.length > 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
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
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const [count, setCount] = useState(1);

  return (
    <Layout
      sidebar={Sidebar}
      content={
        <div className="bg-gray-100 min-h-screen">
          <div className="flex justify-between items-center pt-20 w-4/5 mx-auto flex-col sm:flex-row">
            <div className="py-5 text-2xl font-semibold">
              <span>Campaigns Overview</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center">
              <button
                className="text-gray-700 rounded-lg border-2 border-gray-400 px-3 py-2 mr-3 w-44 transform transition duration-500 hover:scale-105 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 shadow-lg"
                onClick={handleNewBusiness}
              >
                <FontAwesomeIcon icon="fa-solid fa-plus" className="mr-3" />
                New Business
              </button>
              <button
                className="bg-indigo-800 bg-opacity-75 text-white px-3 py-2 border rounded-lg w-44 mt-4 sm:mt-0 transform transition duration-500 hover:scale-105 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:ring-opacity-50 shadow-lg"
                onClick={handleNewCampaign}
              >
                <FontAwesomeIcon icon="fa-solid fa-plus" className="mr-3" />
                New Campaign
              </button>
            </div>
          </div>

          <div className="mt-9 relative w-4/5 mx-auto">
            <Slider {...sliderSettings}>
              {campaignsData.map((campaign, index) => (
                <div
                  key={campaign.campaignId}
                  className="bg-white  px-4 rounded-md cursor-pointer hover:bg-gray-50"
                  onClick={() => handleCampaignDetail(campaign.campaignId)}
                >
                  <div className="py-3 flex justify-between">
                    <span className="font-bold">{campaign.businessName}</span>
                    <span>{count + index}</span>
                  </div>

                  <img
                    src={campaign.backgroundImageUrl}
                    alt={campaign.businessName}
                    className="rounded w-[279px] h-[160px]"
                    loading="lazy"
                  />
                  <div className="py-3 grid grid-cols-2 gap-3 ">
                    <div className="flex flex-col items-center justify-center">
                      <span className="">
                        <FontAwesomeIcon icon="fa-solid fa-qrcode" />
                      </span>
                      <div className="flex justify-between  items-center">
                        <span className=" ">{campaign.numberOfScans}</span>
                        <span className="ml-2"> Scans</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <span className="">
                        <FontAwesomeIcon icon="fa-solid fa-message" />
                      </span>
                      <div className="flex justify-between  items-center">
                        <span className=" ">{campaign.numberOfAnswers}</span>
                        <span className="ml-2"> Answer</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <span className="">
                        <FontAwesomeIcon icon="fa-face-grin-stars" />
                      </span>
                      <span className="text-center">
                        {campaign.averageNPS}/10 Nps
                      </span>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <span className="">
                        <FontAwesomeIcon icon="fa-thumbs-up" />
                      </span>
                      <div className="flex justify-between  items-center">
                        <span className=" ">{campaign.csat}%</span>
                        <span className="ml-2">Csat</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      }
    >
      <Outlet />
    </Layout>
  );
}
