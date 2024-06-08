/* eslint-disable no-unused-vars */
"use client";
/* eslint-disable react/prop-types */

import { Label, TextInput } from "flowbite-react";
import { useContext } from "react";
import { MdAlternateEmail } from "react-icons/md";
import BusinessContext from "../../../../context/BusinessContext";

function EmailInput() {
  const { businessData, setBusinessData } = useContext(BusinessContext);
  return (
    <div className="max-w-md">
      <div className="mb-2 block">
      </div>
      <TextInput id="email" type="text" icon={MdAlternateEmail} placeholder="Your email" 
      required
      value={businessData.email}
      onChange={(event) => {
        setBusinessData({
          ...businessData,
          email: event.target.value,
        });
      }}
      />
    </div>
  );
}
export default EmailInput;
