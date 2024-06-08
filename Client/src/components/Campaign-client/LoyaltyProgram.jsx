/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useContext } from "react";
import CampaignClientContext from "../../context/CampaignClientContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGoogle,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

export const ClientAmbassador = () => {
  const isWinner = true;
  return (
    <div className="flex flex-col justify-center items-center">
      {!isWinner ? (
        <div>
          <img
            src="src/assets/client Ambassador.jpeg"
            alt=""
            className="w-32 h-w-32 rounded-lg"
          />
          <p className="font-semibold mt-6">
            Congratulations on becoming a Client Ambassador for our business!
            We're thrilled to have you on board. We'll be in touch soon with
            more details on how you can get started in your new role.
          </p>
        </div>
      ) : (
        <p className="font-semibold mt-6">
          Thank you for your participation! While you weren't selected as a
          winner this time, we truly appreciate your support and enthusiasm.
          Your continued engagement means a lot to us, and we look forward to
          keeping you updated on future opportunities and promotions.
        </p>
      )}
    </div>
  );
};

export const MysteryBox = ({winnResp}) => {
  const {t} = useContext(CampaignClientContext);
  return (
    <div className="flex flex-col justify-center items-center">
        <>
          <img
            src="/src/assets/mysterybox.jpeg"
            alt=""
            className="w-32 h-w-32 rounded-lg"
          />
          <div>
          you win<span className="text-light-blue-600">{winnResp.mysteryBoxPrize}</span>
          </div>
          

          <p className="font-semibold mt-6 text-center">
          {t("notifications.MysteryBox")}
          </p>
        </>
      
    </div>
  );
};

export const CouponCode = ({ winnResp }) => {
  const {t} = useContext(CampaignClientContext);
  return (
    <div className="flex flex-col justify-center items-center">
        <>
          <img
            src="/src/assets/discount.jpeg"
            alt=""
            className="w-32 h-w-32 rounded-lg"
          />

          <p className="font-semibold mt-6 text-center ">
            Congratulations! You've won a discount code <br />{" "}
            <span className="text-blue-600 font-bold">{winnResp.discountCodeReference}</span><br /> 
           {t("notifications.CouponCode")}
          </p>
        </>
      
    </div>
  );
};


export const Raffle = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <img
        src="src/assets/raffle.jpeg"
        alt=""
        className="w-32 h-w-32 rounded-lg"
      />

      <p className="font-semibold mt-6 ">
        We wanted to let you know that we've saved your contact information, and
        you're now eligible to participate in our upcoming raffle event. Keep an
        eye on your inbox for more details on how you can join in the fun and
        have a chance to win some exciting prizes!
      </p>
      <div className="w-11/12  absolute bottom-4 right-0 left-0 mx-auto">
        <input
          type="button"
          id=""
          className="w-full border border-inherit px-3 py-2  rounded-lg  text-white bg-blue-500"
          value="Next"
        />
      </div>
    </div>
  );
};


export const Loser = () => {
  const {t} = useContext(CampaignClientContext);
  return (
    <div className="flex flex-col justify-center items-center">
     <p className="font-semibold mt-6 text-center">
         {t("notifications.Loser")}
      </p>
    </div>
  );
};

export const CampaignBusinessInfo = () => {
  const { campaign } = useContext(CampaignClientContext);
  
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <img
          src={campaign.business.coverImageUrl}
          alt=""
          className="w-36 h-w-36 rounded-lg"
        />
        <span className="font-semibold text-2xl">
          {campaign.business.businessName}
        </span>
        <span className="font-semibold mt-6 ">Contact info</span>
        <p className="text-center">{campaign.business.address} </p>
        <p className="text-center">{campaign.business.email}</p>
        <p className="text-center">{campaign.business.phone}</p>
        <span className="font-semibold mt-6">Social Networks</span>
        <div className="flex flex-row ">
          <button className="mr-4 text-xl text-orange-500">
            <FontAwesomeIcon icon={faGoogle} />
          </button>
          <button className="mr-4 text-xl text-blue-500">
            <FontAwesomeIcon icon={faFacebook} />
          </button>
          <button className=" text-xl text-violet-600">
            <FontAwesomeIcon icon={faInstagram} />
          </button>
        </div>
      </div>
    </>
  );
};
