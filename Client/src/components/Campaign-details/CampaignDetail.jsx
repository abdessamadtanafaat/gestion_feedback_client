/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import useAuthContext from "../../hooks/useAuthContext";
import Layout from "../Layout/Layout";
import SidebarCampaign from "../Layout/SidebarCampaign";
import { useParams } from "react-router-dom";
import {
  getCampaignDetails,
  getCustomersByGender,
  getCustomersByAge,
  getAllCustomers,
  getAvgRateService,
} from "../../services/workspace/workspaceService";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";

// import {pieChartData} from "./data.js";

ChartJS.register(
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

function CampaignDetail() {
  const { campaignId } = useParams();
  const { user } = useAuthContext();

  const [campaignDetails, setCampaignDetails] = useState(null);
  const [pieChartData, setPieChartData] = useState(null);
  const [pieChartData1, setPieChartData1] = useState(null);
  const [barChartData, setBarChartData] = useState(null);
  const [barChartData1, setBarChartData1] = useState(null);

  const fetchCampaignData = async () => {
    try {
      const response = await getCampaignDetails(user, campaignId);
      setCampaignDetails(response);
    } catch (error) {
      console.error(error);
    }
  };

  const getTotalCustomersByAge = async () => {
    try {
      const response = await getCustomersByAge(user, campaignId);
      const data = response.map((item) => ({
        label: item[0], // Age range
        value: item[1], // Count
      }));
      const barChartData = {
        labels: data.map((item) => item.label),
        datasets: [
          {
            label: "Total",
            data: data.map((item) => item.value),
            backgroundColor: "rgb(16 185 129 )", // You can set a custom color here
          },
        ],
      };
      setBarChartData(barChartData);
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalCustomersByGender = async () => {
    try {
      const response = await getCustomersByGender(user, campaignId);
      const data = response.map((item) => ({
        label: item[0], // Gender
        value: item[1], // Count
      }));
      const chartData = {
        labels: data.map((item) => item.label),
        datasets: [
          {
            data: data.map((item) => item.value),
            backgroundColor: ["pink","#65C7F7"], // You can set custom colors here
          },
        ],
      };
      setPieChartData(chartData);
    } catch (error) {
      console.log(error);
    }
  };

  const getAvgRateForEveryService = async () => {
    try {
      const response = await getAvgRateService(user, campaignId);
      const data = response.map((item) => ({
        label: item[1], // Age range
        value: item[2], // Count
      }));

      const barChartData = {
        labels: data.map((item) => item.label),
        datasets: [
          {
            label: "Avg rate",
            data: data.map((item) => item.value),
            backgroundColor: "#636FA4", // You can set a custom color here
          },
        ],
      };

      setBarChartData1(barChartData);
      
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalCustomersByInfo = async () => {
    try {
      const response = await getAllCustomers(user, campaignId);

      // Assuming response is an array with one object
      const data = response[0];

      // Extracting data from the response
      const defined = data.defined;
      const anonymous = data.anonymous;

      // Pie chart data
      const pieData = {
        labels: ["identified", "Anonymous"],
        datasets: [
          {
            data: [defined, anonymous],
            backgroundColor: ["#36a2eb", "gray"], // You can change colors as per your preference
          },
        ],
      };

      // Update state with the pie chart data
      setPieChartData1(pieData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (campaignId) {
      fetchCampaignData();
      getTotalCustomersByGender();
      getTotalCustomersByAge();
      getTotalCustomersByInfo();
      getAvgRateForEveryService();
    }
    return () => {
      setCampaignDetails(null);
    };
  }, [user, campaignId]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "top", // Adjust legend position as needed
      },
    },
    layout: {
      padding: {
        right: 25, // Adjust padding to accommodate legend and title
        left: 25,
        top: 50,
        bottom: 50,
      },
    },
    aspectRatio: 1,

    // Add more options as needed
  };
  const options2 = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "top", // Adjust legend position as needed
      },
    },
    layout: {
      padding: {
        right: 70, // Adjust padding to accommodate legend and title
        left: 70,
        top: 25,
        bottom: 25,
      },
    },
    aspectRatio: 1,

    // Add more options as needed
  };

  return (
    <Layout
      sidebarCampaign={SidebarCampaign}
      content={
        <div className="bg-[#F9F9F4] pt-20 px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
              <div className="flex justify-between mb-6">
                <div>
                  <div className="flex items-center mb-1">
                    <div className="text-2xl font-semibold">
                      {campaignDetails?.numberOfAnswers}
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-400">
                    Answers
                  </div>
                </div>
                <div className="w-10 h-10">
                  <img src="/src/assets/answer.png" loading="lazy" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
              <div className="flex justify-between mb-4">
                <div>
                  <div className="flex items-center mb-1">
                    <div className="text-2xl font-semibold">
                      {campaignDetails?.numberOfScans}
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-400">Scans</div>
                </div>
                <div className="w-10 h-10">
                  <img src="/src/assets/scan.png" loading="lazy" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
              <div className="flex justify-between mb-6">
                <div>
                  <div className="text-2xl font-semibold mb-1">
                    {campaignDetails?.averageNPS}/10
                  </div>
                  <div className="text-sm font-medium text-gray-400">Nps</div>
                </div>
                <div className="w-10 h-10">
                  <img src="/src/assets/nps.png" loading="lazy" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
              <div className="flex justify-between mb-6">
                <div>
                  <div className="flex items-center mb-1">
                    <div className="text-2xl font-semibold">
                      {campaignDetails?.csat} %
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-400">CSAT</div>
                </div>
                <div className="w-10 h-10">
                  <img src="/src/assets/csat.png" loading="lazy" />
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-2 bg-white py-3 px-3 max-h-80 ">
            <span className="font-bold">Average Customer Ratings for Each Service</span>
            {barChartData1 ? (
              <Bar options={options2} data={barChartData1} />
            ) : (
              <p>Loading...</p>
            )}
             
            </div>

            <div className="bg-white rounded-md py-3 px-3 max-h-80">
              <span className="font-bold">Total Clients</span>
              {pieChartData ? (
                <Pie options={options} data={pieChartData} />
              ) : (
                <p>Loading...</p>
              )}
            </div>
            <div className="col-span-2 bg-white py-3 px-3 max-h-80">
            <span className="font-bold">Total Answers</span>
              {pieChartData1 ? (
                <Pie options={options} data={pieChartData1} />
              ) : (
                <p>Loading...</p>
              )}
            </div>

            <div className="bg-white rounded-md py-3 px-3 max-h-80">
              <span className="font-bold">Clients Age</span>
              {barChartData ? (
                <Bar options={options} data={barChartData} />
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
      }
    />
  );
}

export default CampaignDetail;
