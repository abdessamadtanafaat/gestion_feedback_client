/* eslint-disable no-unused-vars */
"use client";
/* eslint-disable react/prop-types */

import { Label, TextInput } from "flowbite-react";
import { useContext } from "react";
import { FaFacebookF } from "react-icons/fa6";
import BusinessContext from "../../../../context/BusinessContext";

function FacebookInput() {
  const { businessData, setBusinessData } = useContext(BusinessContext);
  return (
    <div className="max-w-md">
      <div className="mb-2 block ">
      </div>
      <TextInput id="fblink" type="text" icon={FaFacebookF} placeholder="Facebook link" required
      value={businessData.facebookLink}
      onChange={(event) => {
        setBusinessData({
          ...businessData,
          facebookLink: event.target.value,
        });
      }}
      />
    </div>
  );
}
export default FacebookInput;
