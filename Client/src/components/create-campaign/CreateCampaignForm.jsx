/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { useContext, useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import ServiceAreas from "./ServiceAreas";
import CampaignLanguages from "./CampaignLanguages";
import CampaignLoyaltyProgrammes from "./CampaignLoyaltyProgrammes";
import CampaignBusiness from "./CampaignBusiness";
import CampaignTemplate from "./CampaignTemplate";
import Congrats from "./Congrats";
import useAuthContext from "../../hooks/useAuthContext";

import {
  createCampaign,
  updateCampaign,
  createTemplate,
} from "../../services/campaign/createCampaignService";

import { Outlet } from "react-router-dom";
import Layout from "../Layout/Layout";
import CampaignFormContext from "../../context/CampaignFormContext";
import Sidebar from "../Layout/Sidebar";

function CreateCampaignForm() {
  const { user } = useAuthContext();
  const toast = useRef(null);
  const {
    page,
    setPage,
    FormTitles,
    campaignCreated,
    complete,
    setComplete,
    campaignData,
    setCreatedCampaignId,
    setCampaignCreated,
    createdCampaignId,
    selectedOption,
    setSelectedOption,
    backgroundImage,
    isStar,
    isLoading,
    setIsLoading,
    resetAll,
  } = useContext(CampaignFormContext);

  const handleNext = async () => {
    if (page === FormTitles.length - 2) {
      if (!campaignCreated) {
        if (!backgroundImage) {
          // Set an error state and return to prevent further execution
          toast.current.show({ severity: 'error', summary: 'Error', detail: 'Background image is required.', life: 3000 });
          return;
        }
        setComplete(true);
        setIsLoading(true);
        console.log(isStar, backgroundImage);
        try {
          const templateResponse = await createTemplate(user, isStar, backgroundImage);
          console.log(templateResponse);
          campaignData.template_id = templateResponse.id;
          const response = await createCampaign(campaignData, user);
          setCreatedCampaignId(response);
          console.log(response);
          setCampaignCreated(true);
        } catch (error) {
          // Handle the error, possibly setting an error state to display the message
          toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to create template or campaign.', life: 3000 });
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      } else {
        try {
          await updateCampaign(campaignData, createdCampaignId, user);
        } catch (error) {
          // Handle the error, possibly setting an error state to display the message
          toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to update campaign.', life: 3000 });
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
      setPage(page + 1);
    } else {
      setPage(page + 1);
      setSelectedOption(false);
    }
  };

  const handlePrev = () => {
    setPage(page - 1);
  };

  const PageDisplay = () => {
    if (page === 0) {
      return <CampaignBusiness />;
    } else if (page === 1) {
      return <ServiceAreas />;
    } else if (page === 2) {
      return <CampaignLoyaltyProgrammes />;
    } else if (page == 3) {
      return <CampaignLanguages />;
    } else if (page == 4) {
      return <CampaignTemplate />;
    } else {
      return <Congrats />;
    }
  };

  useEffect(() => {
    resetAll();
    return () => {
      // This function will be called when the component is unmounted
      resetAll();
    };
  }, []);
  return (
    <Layout
    sidebar={Sidebar}
      content={
        <>
          <div className="bg-[#F9F9F4] min-h-screen relative">
            {page !== FormTitles.length - 1 && (
              <>
              <div className="pt-10 w-11/12 mx-auto">
                <h1 className="text-2xl font-bold text">{FormTitles[page]}</h1>
              </div>
              <Toast ref={toast} />
              </>
            )}
            <div className="w-11/12 mx-auto">{PageDisplay()}</div>
            {page !== FormTitles.length - 1 && (
              <div className="flex justify-between items-center py-2  absolute bottom-0 right-0 left-0 w-11/12 mx-auto">
                <button
                  disabled={page === 0}
                  onClick={handlePrev}
                  className="w-40 h-11 border-2 border-inherit rounded-lg"
                >
                  Prev
                </button>
                {/*stepper*/}
                <div className="flex flex-row gap-4">
                  {[...Array(FormTitles.length - 1)].map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 md:w-14 md:h-1 sm:rounded-full  border rounded-xl text-xs text-white ${
                        index < page || complete
                          ? "bg-yellow-300"
                          : "bg-slate-500"
                      }`}
                      aria-valuenow="20"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  ))}
                </div>
                <button
                  disabled={!selectedOption}
                  onClick={handleNext}
                  className="w-40 h-11 bg-cyan-950 text-white border rounded-lg"
                >
                  {page === FormTitles.length - 2 && isLoading ? (
                   
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                    
                  ) : page === FormTitles.length - 2 ? (
                    "Submit"
                  ) : (
                    "Next"
                  )}
                </button>
              </div>
            )}
          </div>
        </>
      }
    >
      <Outlet />
    </Layout>
  );
}

export default CreateCampaignForm;
