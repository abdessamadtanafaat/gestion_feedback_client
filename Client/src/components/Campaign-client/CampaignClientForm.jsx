/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useRef, useState } from "react";
import CampaignClientContext from "../../context/CampaignClientContext";
import {CampaignLanguages,CampaignCustomerInfo} from "./ClientInfo";
import {CampaignServices,CampaignNps} from "./ClientFeedback";
import {CampaignBusinessInfo, CouponCode, Loser, MysteryBox} from "./LoyaltyProgram";
import { useParams } from "react-router-dom";
import { getCampaign, saveAnswer, updateAnswer } from "../../services/campaign/displayCampaign";
import {CampaingClientOptions, LoyaltyContactInfo} from "./ClientOptions";
function CampaignClientForm() {
  const { campaignId } = useParams();
  const {
    page,
    setPage,
    complete,
    serviceIndex,
    setServiceIndex,
    campaign,
    setCampaign,
    titles,
    serviceQuestion,
    campaignAnswer,
    isSelected,
    setIsSelected,
    t
  } = useContext(CampaignClientContext);

  const [customerId, setCustomerId]=useState("");
  const [winnersResponse, setWinnersResponse] = useState([]);

  const fetchCampaign = async () => {
    try {
      const response = await getCampaign(campaignId);
      setCampaign(response);
      
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  const effectRan = useRef(false);// i am using it to stop the double render

  useEffect(() => {
    if(effectRan.current==false)
    {
      if (campaignId) {
        fetchCampaign();
        
      }
    }
    
    return () => {
      setCampaign(null);
      effectRan.current= true;
    };
  }, [campaignId]);

  const PageDisplay = () => {
    if (page === 0) {
      return <CampaignLanguages />;
    } else if (page === 1) {
      return <CampaignCustomerInfo />;
    } else if (page === 2) {
      return <CampaignServices />;
    } else if (page === 3) {
      return <CampaignNps />;
    } else if (page === 4) {
      return <CampaingClientOptions />;
    } else if (page === 5) {
      return <LoyaltyContactInfo />;
    } 
    else if (page === 6) {
      return  handleDisplayWinningPage();
    }
    else if (page === 7) {
      return <CampaignBusinessInfo />;
    }
  };

  const handleAnswer = async () => {
    const formData = {
      customer: {
        age: campaignAnswer.age,
        gender: campaignAnswer.gender,
      },
      customerServicesRatings: campaign.serviceAreas.map((service, index) => ({
        serviceArea: { id: service.id },
        customerRating: campaignAnswer.rates[index],
      })),
      npsValue: campaignAnswer.npsValue,
    };
    try {
      console.log(campaignAnswer.rates)
      const response = await saveAnswer(campaignId, formData);
      setCustomerId(response);
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateCustomerAnswer = async ()=>{
    
    const customer= {
        name: campaignAnswer.name,
        email: campaignAnswer.email,
        tel: campaignAnswer.tel
      }
      try {
        console.log(customer)
        const response = await updateAnswer(customerId, customer, campaignId);
        setWinnersResponse(response);
        console.log(response);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    const handleDisplayWinningPage = () => {
      if (winnersResponse.length === 0) {
        return <Loser/>;
      }
      return winnersResponse.map((winnResp) => {
        if (winnResp.programmeTypeId === 2) {
          return <MysteryBox winnResp={winnResp} key={winnResp.id} />;
        }
        if (winnResp.programmeTypeId === 3) {
          return <CouponCode winnResp={winnResp} key={winnResp.id} />;
        }
        
      });
    };

  const handlePrev = () => {
    if(page ===2)
    {
      if (serviceIndex == 0) {
        setPage(1);
      } else {
        setServiceIndex((prev) => prev - 1);
      }
    }
    else{
      setPage(page-1);
    }
    
  };
  const handleNext = () => {
    if(page != 2 && page!=3)
    {
      if(page===5)
      {
        updateCustomerAnswer();
        setPage(page+1)
      }
      else{
        setPage(page+1);
        setIsSelected(false)
      }
      

    }
    else if (serviceIndex < campaign.serviceAreas.length - 1) {
      setServiceIndex((prev) => prev + 1);
      setIsSelected(false);
      console.log(campaignAnswer.rates)
    }
    else if (page===3){
      handleAnswer();
      setPage(page+1);
      setIsSelected(false);

    }
    
    else{
      setPage(page+1);
      setIsSelected(false);
    }

  };



  return (
   
    <div className="flex flex-col md:flex-row h-screen">
      <div
        className="relative h-1/2 lg:h-full md:h-screen w-full md:w-1/2 lg:w-1/2 "
        style={{
          backgroundImage: `url("${campaign?.template?.backgroundImageUrl}")`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // backgroundPosition:"center",
          // backgroundAttachment:"fixed",
          backgroundSize:"100% 100%",
          backgroundRepeat:"no-repeat",

          }}
      >
        <div className="absolute h-full w-full bg-black opacity-80"></div>{" "}
        <div>
        <p className="relative text-white text-center text-xl font-bold ">
        {page === 2  ? `${serviceQuestion}\n${t('services.' + campaign.serviceAreas[serviceIndex].name)}` :((page!=6 && page!=7) &&( t('questions.' + titles[page])))}

        </p>
        </div>
      </div>

      <div className="relative flex flex-col justify-center h-1/2 md:h-screen w-full md:w-1/2   bg-indigo-50">
      {PageDisplay()}
      {(page === 0 || page === 5 || page ==6) && (
        <div className="w-2/3 absolute bottom-4 right-0 left-0 mx-auto">
        
          
        <input
        type="button"
        id=""
        className="cursor-pointer w-full border border-inherit px-3 py-2  rounded-lg  text-white bg-blue-500"
        value="Next"
        onClick={handleNext}
        // disabled={!isSelected}
      />
      </div>
          
        )}
        
        {(page ==2) &&(
          <div className="flex justify-between items-center py-2  absolute bottom-0 right-0 left-0 w-11/12 mx-auto ">
            <button
              onClick={handlePrev}
              className="py-1 px-6 border-2 text-white border-inherit rounded-lg bg-violet-500"
            >
              Previous
            </button>
            {/*stepper*/}
            <div className="flex flex-row gap-4">
              {[...Array(campaign.serviceAreas.length)].map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full   text-xs text-white ${
                    index < serviceIndex || complete
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
              disabled={!isSelected}
              onClick={handleNext}
              className="py-1 px-6 bg-blue-500 text-white border rounded-lg"
            >
              {/* {page === campaign.serviceAreas.length - 2 ? "Submit" : "Next"} */}
              Next
            </button>
          </div>
        )}
        {(page ===1 || page===3) &&(
          <div className="flex justify-between items-center py-2   absolute bottom-0 right-0 left-0 w-11/12 mx-auto ">
            <button
              onClick={handlePrev}
              className="py-1 px-6 border-2  text-white border-inherit rounded-lg bg-violet-500"
            >
              Prev
            </button>
            
            <button
              disabled={!isSelected}
              onClick={handleNext}
              className="py-1 px-6 bg-blue-500 text-white border rounded-lg"
            >
              {/* {page === campaign.serviceAreas.length - 2 ? "Submit" : "Next"} */}
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CampaignClientForm;
