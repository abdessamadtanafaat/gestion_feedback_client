/* eslint-disable no-unused-vars */
"use client";
/* eslint-disable react/prop-types */

import { Label, TextInput } from "flowbite-react";
import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import BusinessContext from "../../../../context/BusinessContext";

function GoogleInput() {
  const { businessData, setBusinessData } = useContext(BusinessContext);
  return (
    <div className="max-w-md">
      <div className="mb-2 block">
      </div>
      <TextInput id="googlelink" type="text" icon={FaGoogle} placeholder="Google link" required
      value={businessData.googleLink}
      onChange={(event) => {
        setBusinessData({
          ...businessData,
          googleLink: event.target.value,
        });
      }}
      />
    </div>
  );
}
export default GoogleInput;
