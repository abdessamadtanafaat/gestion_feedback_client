/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import {createContext, useEffect, useState} from 'react';
import { useTranslation } from "react-i18next";




const CampaignClientContext = createContext({});

export const CampaignClientContextProvider = ({children}) =>{
    const[t,i18n] = useTranslation("global");

    const[isSelected,setIsSelected] = useState(false);
    const [page, setPage] = useState(0); 
    const [campaign, setCampaign] = useState(null);
    const [serviceIndex, setServiceIndex] = useState(0);
    const [complete, setComplete] = useState(false);
    const [titles, setTitles] = useState([
        "first",
        "second",
        "", // Assuming this empty string is intentional
        "third",
        "fourth",
        "five",
        
    ]);
    const serviceQuestion = t("body.first_message");
    const [campaignAnswer, setCampaignAnswer] = useState({
        age: "",
        gender: "",
        rates: "",
        npsValue:10,
        name:"",
        email:"",
        tel:""
      });
    
     
   
    return (
        <CampaignClientContext.Provider value = {{
            page,
            setPage,
            complete,
            setComplete,
            serviceIndex, 
            setServiceIndex,
            campaign, setCampaign,
            titles,
            serviceQuestion,
            campaignAnswer,
            setCampaignAnswer,
            isSelected,
            setIsSelected,
            i18n,t
           
        }}>
            { children }
        </CampaignClientContext.Provider>
    )

}
export default CampaignClientContext;