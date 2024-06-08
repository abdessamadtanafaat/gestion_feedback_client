/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

"use client";

import { Label, TextInput } from "flowbite-react";
import { useContext } from "react";
import { FaAddressCard } from "react-icons/fa";
import BusinessContext from "../../../../context/BusinessContext";

function AdressInput() {
  const { businessData, setBusinessData } = useContext(BusinessContext);
  return (
    <div className="max-w-full">
      <div className="mb-2 block">
      </div>
      <TextInput id="address" 
      type="text" 
      icon={FaAddressCard} 
      placeholder="Your business address" 
      required
      value={businessData.address}
      onChange={(event) => {
        setBusinessData({
          ...businessData,
          address: event.target.value,
        });
      }}
      />
    </div>
  );
}
export default AdressInput;
