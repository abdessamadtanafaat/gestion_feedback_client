/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from "react";

import{getAllLanguages} from '../../services/campaign/createCampaignService'
import useAuthContext from '../../hooks/useAuthContext';
import CampaignFormContext from '../../context/CampaignFormContext';
function CampaignLanguages() {
  const [languages, setLanguages] = useState([]);
  const {user} = useAuthContext();
  const { campaignData, setCampaignData, setSelectedOption } = useContext(CampaignFormContext)

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const languagesData = await getAllLanguages(user);
        setLanguages(languagesData);
        if (campaignData.languages.length >= 1) {
          setSelectedOption(true);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchLanguages();
  }, [campaignData, setSelectedOption, user]);

  const handleSelectedLanguage = (event, selectedLanguage) => {
    const checked = event.target.checked;
    setCampaignData((prevData) => {
      let updatedLanguages;
      if (checked) {
        // Add the language object to the languages array
        updatedLanguages = [...prevData.languages, selectedLanguage];
      } else {
        // Remove the language object from the languages array
        updatedLanguages = prevData.languages.filter(
          (language) => language.id !== selectedLanguage.id
        );
      }
      const hasNoLanguages = updatedLanguages.length === 0;
      setSelectedOption(!hasNoLanguages); // Set selectedOption to true if there are selected languages
      return { ...prevData, languages: updatedLanguages };
    });
  };
  

  const isLanguageSelected = (language) => {
    return campaignData.languages.some((lg) => lg.id === language.id);
  };


 

  return (
    <div className="">
      <div className="py-2">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
      <div className="flex flex-col md:flex-row ">
        <div className="w-1/1 md:w-2/3 border border-inherit rounded-md mr-8 pl-3  pt-5 font-bold">
          <span>Map</span>
          <img src="src/assets/map.png" alt="" className=" w-full object-cover"/>
        </div>

        <div className="w-1/1 md:w-1/3 flex flex-col">
          <span className="font-bold text-xl">Select your language</span>
          <ul className="overflow-y-auto max-h-80">
            {languages.map((language) => (
              <li
                key={language.id}
                className="border border-inherit px-3 py-2  my-4 rounded-lg flex justify-between items-center bg-white"
              >
                <div className="flex flex-row items-center">
                  <img
                    src={language.coverImageUrl}
                    alt="Language Icon"
                    className="w-5 h-5 mr-2"
                  />
                  <label htmlFor="">{language.name}</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id={language.id}
                    className="appearance-none w-5 h-5 border border-inherit rounded-full bg-slate-100 checked:bg-amber-300 checked:border-2"
                    value={language.id}
                    onChange={(event) =>handleSelectedLanguage(event, language)}
                    checked={isLanguageSelected(language)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CampaignLanguages;
