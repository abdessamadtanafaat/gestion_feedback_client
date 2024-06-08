/* eslint-disable no-unused-vars */
"use client";
/* eslint-disable react/prop-types */

import { Label, TextInput } from "flowbite-react";
import { useContext } from "react";
import { FaInstagram } from "react-icons/fa";
import BusinessContext from "../../../../context/BusinessContext";

function InstagramInput() {
  const { businessData, setBusinessData } = useContext(BusinessContext);
  return (
    <div className="max-w-md">
      <div className="mb-2 block">
      </div>
      <TextInput id="instalink" type="text" icon={FaInstagram} placeholder="Instagram link" required
      value={businessData.instagramLink}
      onChange={(event) => {
        setBusinessData({
          ...businessData,
          instagramLink: event.target.value,
        });
      }}
      />
    </div>
  );
}
export default InstagramInput;
