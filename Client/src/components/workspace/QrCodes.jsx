import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuthContext from "../../hooks/useAuthContext";

import { getAllCampaignDisplays } from "../../services/workspace/workspaceService";
import { Outlet } from "react-router-dom";
import Layout from "../Layout/Layout";
import Sidebar from "../Layout/Sidebar";

const QRCodes = () => {
  const { user } = useAuthContext();
  const [qrCodes, setQRCodes] = useState([]);

  useEffect(() => {
    getAllCampaignDisplays(user)
      .then((data) => setQRCodes(data))
      .catch((error) => console.error("Error fetching QR codes:", error));
  }, [user]);

  return (
    <Layout
      sidebar={Sidebar}
      content={
        <div className="bg-gray-100 min-h-screen pt-20">
          <div className="pl-20 py-6 text-2xl font-semibold">
            <span>Campaigns QR Codes</span>
          </div>
          {qrCodes.map((qrCode) => (
            <div
              className="bg-white w-3/5 mx-auto mb-6 border border-gray-300 rounded-lg shadow-lg overflow-hidden transition-shadow hover:shadow-xl"
              key={qrCode.id}
            >
              <div className="flex flex-col md:flex-row items-center justify-between p-4 md:p-6 hover:bg-gray-50">
                <img
                  src={qrCode.qrCode}
                  alt="QR Code"
                  className="w-32 h-32 rounded-md shadow-sm"
                />

                <div className="flex flex-col text-base mt-4 md:mt-0">
                  <span className="font-semibold">{qrCode.businessName}</span>

                  <span>
                    Scans:{" "}
                    <span className="text-blue-600 font-bold">
                      {qrCode.numberOfScans}
                    </span>
                  </span>
                </div>

                <a
                  href={qrCode.qrCode}
                  download={`QR_Code_${qrCode.id}`}
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors duration-300 ease-in-out transform hover:scale-110"
                  title="Download QR Code"
                >
                  <FontAwesomeIcon
                    icon="fa-solid fa-download"
                    className="text-xl"
                  />
                </a>
              </div>
            </div>
          ))}
        </div>
      }
    >
      <Outlet />
    </Layout>
  );
};

export default QRCodes;
