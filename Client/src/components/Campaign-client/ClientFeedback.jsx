
import { useContext} from "react";
import CampaignClientContext from "../../context/CampaignClientContext";
import { stars, faces } from "../../templates/template";

export const CampaignServices = () => {
  const { serviceIndex, campaign, campaignAnswer, setCampaignAnswer, setIsSelected } = useContext(CampaignClientContext);

  return (
    <>
      <ul className="w-11/12 flex flex-row mx-auto">
        {campaign?.template.star ? (
          stars.map((star, index) => (
            <li
              key={index}
              className={`mr-2 text-sm p-1 border rounded-md cursor-pointer ${
                campaignAnswer.rates[serviceIndex] === star.value ? 'bg-blue-500' : 'bg-white'
              }`}
              onClick={() => {
                const updatedRates = [...campaignAnswer.rates];
                updatedRates[serviceIndex] = star.value;
                setCampaignAnswer({ ...campaignAnswer, rates: updatedRates });
                setIsSelected(true);
              }}
            >
              <img src={star.url} alt="" className="" />
            </li>
          ))
        ) : (
          faces.map((face, index) => (
            <li
              key={index}
              className={`mr-2 text-sm p-3 border rounded-full cursor-pointer  ${
                campaignAnswer.rates[serviceIndex] === face.value ? 'bg-blue-500' : 'bg-white'
              }`}
              onClick={() => {
                const updatedRates = [...campaignAnswer.rates];
                updatedRates[serviceIndex] = face.value;
                setCampaignAnswer({ ...campaignAnswer, rates: updatedRates });
                setIsSelected(true);
              }}
            >
              <img src={face.url} alt="" className="" />
            </li>
          ))
        )}
      </ul>
    </>
  );
  
    
  };




  export const  CampaignNps =()=> {
    const{setCampaignAnswer, campaignAnswer,setIsSelected } = useContext(CampaignClientContext);
    
    return (
      <div className="relative  w-3/4 mx-auto">
          <input
              id="labels-range-input"
              step="1"
              type="range"
              value={campaignAnswer.npsValue} // Dynamically set value based on state
              min="0"
              max="10"
              className="w-full  h-2 bg-gradient-to-r from-red-600 to-green-400 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              onChange={(e) => {
                  setCampaignAnswer({ ...campaignAnswer, npsValue: e.target.value });
                  setIsSelected(true);
              }}
          />
          <div className="w-3/4">

          
          <span className="text-base  absolute start-0 -bottom-6">0</span>
          <span className="text-base  absolute start-1/2 transform -translate-x-1/2 -bottom-6">5</span>
          <span className="text-base  absolute end-0 -bottom-6">10</span>
          </div>
      </div>
  );
  
 }