/* eslint-disable react/prop-types */
import {useState,useEffect, useContext} from 'react'
import{getLoyaltyProgrammes} from '../../services/campaign/createCampaignService'
import useAuthContext from '../../hooks/useAuthContext';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import CampaignFormContext from '../../context/CampaignFormContext';
// import sliderSettings from '../../config/sliderSettings'
function CampaignLoyaltyProgrammes() {

    const [loyaltyProgrammes, setLoyaltyProgrammes] = useState([]);
    
    const {user} = useAuthContext();
    const{ campaignData, setCampaignData, setSelectedOption } = useContext(CampaignFormContext);


    const sliderSettings = {
      accessibility: true,
      dots: false,
      infinite: loyaltyProgrammes.length > 3,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: loyaltyProgrammes.length > 3,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    useEffect(() => {
        const fetchLoyaltyProgrammes = async () => {
            try {
              const programmesData = await getLoyaltyProgrammes(user);
              setLoyaltyProgrammes(programmesData);
              setSelectedOption(true);

            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchLoyaltyProgrammes(); 
    }, [setSelectedOption, user]); 


    const handleSelectedProgram = (event, selectedProgramme) => {
      const checked = event.target.checked;
      if (checked) {

        setCampaignData(prevData => ({
          ...prevData,
          loyaltyProgrammes: [...prevData.loyaltyProgrammes, selectedProgramme]
        }));
      } else {
        setCampaignData(prevData => ({
          ...prevData,
          loyaltyProgrammes: prevData.loyaltyProgrammes.filter((programme) => programme.id !== selectedProgramme.id)
        }));
      }
    };

    const isProgrammeSelected = (loyaltyProgramme) => {
      return campaignData.loyaltyProgrammes.some((programme) => programme.id === loyaltyProgramme.id);
    };
    return (
        <div className="">
          <div className="flex justify-between py-2">
            <div >
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
          </div>
      
          <div >
          <Slider {...sliderSettings}>
            {loyaltyProgrammes.map(programme => (
              <div key={programme.id} className=" flex-shrink-0 h-80 relative ">
                <img
                  src={programme.photoUrl}
                  alt={programme.typeName}
                  className="border rounded w-full h-full object-cover "
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white py-2 px-4 flex justify-between rounded-b">
                  <label htmlFor={`programme${programme.id}`}>{programme.typeName}</label>
                  <input
                    type="checkbox"
                    id={`programme${programme.id}`}
                    className="appearance-none w-5 h-5 border border-inherit rounded-full bg-opacity-50 checked:bg-amber-300 checked:border-2"
                    value={programme.id}
                    onChange={(event) => handleSelectedProgram(event, programme)}
                    checked={isProgrammeSelected(programme)}
                  />
                </div>
              </div>
            ))}
            </Slider>
          </div>
        </div>
      );
      
}

export default CampaignLoyaltyProgrammes;
