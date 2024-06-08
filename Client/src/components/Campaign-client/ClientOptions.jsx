import { useContext } from "react";
import CampaignClientContext from "../../context/CampaignClientContext";







export const CampaingClientOptions =()=> {
    const{ page,setPage,t} = useContext(CampaignClientContext);
    
    const handleNext = () => {
        setPage(page+1)
    }
    return (
  
        <>
         
         <div className="w-2/3  absolute right-0 left-0 mx-auto">
          <input
              type="button"
              id=""
              className="cursor-pointer w-full border border-inherit px-3 py-2 mb-4 rounded-lg  text-white bg-indigo-500"
              value={t("inputs.save_feedback_and_continue")}
              onClick={handleNext}
              disabled
  
          />
           <input
              type="button"
              id=""
              className=" cursor-pointer w-full border border-inherit px-3 py-2  rounded-lg  text-white bg-blue-500"
              value={t("inputs.participate")}
              onClick={handleNext}
          />
          </div>
        </>
  
    );
  };

  export const LoyaltyContactInfo = ()=> {


    const{campaignAnswer, setCampaignAnswer} = useContext(CampaignClientContext);
    const {t} = useContext(CampaignClientContext);
   
  return (

    <>
        <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
            <div className="w-2/3 mx-auto">
            <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                {t("contactInfo.FullName")}
            </label>
            <input
                type="name"
                name="name"
                placeholder={t("inputs.your_name")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={campaignAnswer.name}
                onChange={(e) => {
                    setCampaignAnswer({ ...campaignAnswer, name: e.target.value });
                    
                  }}
            />
            </div>
        </div>
        <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
            <div className="w-2/3 mx-auto">
            <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                {t("contactInfo.email")}
            </label>
            <input
                type="email"
                name="email"
                placeholder={t("inputs.your_email")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={campaignAnswer.email}
                onChange={(e) => {
                    setCampaignAnswer({ ...campaignAnswer, email: e.target.value });
                    
                  }}
            />
            </div>
        </div>
        <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
            <div className="w-2/3 mx-auto">
            <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                {t("contactInfo.tel")}
            </label>
            <input
                type="phone"
                name="phone"
                placeholder={t("inputs.your_phone")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={campaignAnswer.tel}
                onChange={(e) => {
                    setCampaignAnswer({ ...campaignAnswer, tel: e.target.value });
                    
                  }}
            />
            </div>
        </div>
        <div className="w-2/3 absolute bottom-4 right-0 left-0 mx-auto">
        
        </div>
        
    </>


  )
}