/* eslint-disable react-refresh/only-export-components */
import {createContext, useEffect, useState} from 'react';

const CampaignFormContext = createContext({});


export const CampaignFormContextProvider = ({children}) =>{
    
    const [page, setPage] = useState(0);
    const FormTitles = [
        "Select Business",
        "Service area",
        "Loyalty program",
        "Languages",
        "Survey template",
        "",
    ];
    const [complete, setComplete] = useState(false);
    const [selectedOption, setSelectedOption] = useState(false);

    const [campaignData, setCampaignData] = useState({
        businessId: "",
        serviceAreas: [],
        loyaltyProgrammes: [], 
        languages: [],
        template_id: "",
    });
    const [createdCampaignId, setCreatedCampaignId] = useState("");

    const [campaignCreated, setCampaignCreated] = useState(false);
    const [selectedImage, setSelectedImage] = useState(
        "src/assets/no-img.png"
      );
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [isStar, setIsStar] = useState(true);
    const [isLoading, setIsLoading] = useState(false);


    const resetAll = () => {
        setPage(0);
        setComplete(false);
        setSelectedOption(false);
        setCampaignData({
          businessId: "",
          serviceAreas: [],
          loyaltyProgrammes: [],
          languages: [],
          template_id: 1,
        });
        setCreatedCampaignId("");
        setCampaignCreated(false);
        setSelectedImage("src/assets/no-img.png");
        setIsLoading(false);
        setBackgroundImage(null);
      };

      const[selectedCampaignId, setSelectedCampaignId]= useState("");
      useEffect(() => {
        const savedSelectedCampaignId = localStorage.getItem('selectedCampaignId');
        if (savedSelectedCampaignId) {
          setSelectedCampaignId(savedSelectedCampaignId);
        }
      }, []);
    
      // Save selectedCampaignId to localStorage whenever it changes
      useEffect(() => {
        localStorage.setItem('selectedCampaignId', selectedCampaignId);
      }, [selectedCampaignId]);

    return (
        <CampaignFormContext.Provider value = {{
            page,
            setPage,
            FormTitles,
            complete,
            setComplete,
            selectedOption, 
            setSelectedOption,
            campaignData, 
            setCampaignData,
            createdCampaignId, 
            setCreatedCampaignId,
            campaignCreated, 
            setCampaignCreated,
            backgroundImage, setBackgroundImage,
            isStar, setIsStar,
            selectedImage, setSelectedImage,
            isLoading, setIsLoading,
            resetAll ,selectedCampaignId, setSelectedCampaignId


        }}>
            { children }
        </CampaignFormContext.Provider>
    )

}
export default CampaignFormContext;