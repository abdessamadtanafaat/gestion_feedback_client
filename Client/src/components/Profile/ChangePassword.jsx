/* eslint-disable no-unused-vars */
import React from "react";
import Layout from "../Layout/Layout";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import "../Login/index.js";
import "../Login/login.css";
import usePasswordToggle from "../../hooks/usePasswordToggle.jsx";
import "../fontAwsomeIcons/index.js";
import "primeicons/primeicons.css";
import Sidebar from "../Layout/Sidebar.jsx";
import { updatePassword } from "../../services/user/UserService.jsx";
import useAuthContext from "../../hooks/useAuthContext.jsx";

const ChangePassword = () => {
  const { user } = useAuthContext();

  const [changePwdRequest, setChangePwdRequest] = useState({
    currentPass: "",
    newPass: "",
    confirmPass: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [PasswordInputType1, ToggleIcon] = usePasswordToggle();
  const [PasswordInputType2, ToggleIcon2] = usePasswordToggle();
  const [PasswordInputType3, ToggleIcon3] = usePasswordToggle();

  const toast = useRef(null);

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success!",
      detail: "Password changed Successfully.",
      life: 3000,
    });
  };

  const showError = (message) => {
    toast.current.show({
      severity: "error",
      summary: "Error occured!",
      detail: message,
      life: 3000,
    });
  };
  const currentPWRef = useRef();
  const newPWRef = useRef();
  const newPWConfirmRef = useRef();

  useEffect(() => {
    currentPWRef.current.focus();
  }, []);
  useEffect(() => {}, [currentPWRef, newPWRef, newPWConfirmRef]);

  const handleUpdatePassword = async () => {
    try {
      if (
        changePwdRequest.currentPass === "" &&
        changePwdRequest.newPass === "" &&
        changePwdRequest.confirmPass === ""
      ) {
        setErrorMessage("Fields are Empty!");
        showError(errorMessage);
      } else if (changePwdRequest.newPass !== changePwdRequest.confirmPass) {
        setErrorMessage("New password and confirm password do not match.");
        showError(errorMessage);
      } else {
        const response = await updatePassword(user, changePwdRequest);
        console.log(response);
        showSuccess();
        clearInputFields();
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error);
      showError(errorMessage);
    }
  };

  
  const clearInputFields = () => {
    setChangePwdRequest({
      currentPass: "",
      newPass: "",
      confirmPass: "",
    });
  };
  return (
    <Layout
      sidebar={Sidebar}
      content={
        <>
          <form className="bg-white dark:bg-[#273945] min-h-screen">
            <div className="pl-12 px-2 max-w-4xl py-20">
              <div>
                <h1 className="text-2xl font-bold mb-1 dark:text-[#fafaf9]">
                  Change Password
                </h1>
                <p className="text-gray-600 mb-2 dark:text-[#fafaf9] ">
                  Secure your account by updating your password regularly.
                </p>
                <hr className="border-t border-gray-300 mb-10" />
              </div>
              <div className="flex flex-col mt-3">
                <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
                  <div className="w-full relative z-0">
                    <input
                      type={PasswordInputType1}
                      id="currentPW"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=""
                      value={changePwdRequest.currentPass}
                      ref={currentPWRef}
                      onChange={(e) =>
                        setChangePwdRequest({
                          ...changePwdRequest,
                          currentPass: e.target.value,
                        })
                      }
                      required
                    />
                    <label
                      htmlFor="currentPW"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                    >
                      Current Password
                    </label>
                    <span className="password-toogle-icon">{ToggleIcon}</span>
                  </div>

                  <div className="relative z-0 w-full">
                    <input
                      type={PasswordInputType2}
                      id="newPW"
                      ref={newPWRef}
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      value={changePwdRequest.newPass}
                      onChange={(e) =>
                        setChangePwdRequest({
                          ...changePwdRequest,
                          newPass: e.target.value,
                        })
                      }
                      required
                    />
                    <label
                      htmlFor="newPW"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                    >
                      New Password
                    </label>
                    <span className="password-toogle-icon">{ToggleIcon2}</span>
                  </div>

                  <div className="relative z-0 w-full">
                    <input
                      type={PasswordInputType3}
                      id="newPWConfirm"
                      ref={newPWConfirmRef}
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      value={changePwdRequest.confirmPass}
                      onChange={(e) =>
                        setChangePwdRequest({
                          ...changePwdRequest,
                          confirmPass: e.target.value,
                        })
                      }
                      required
                    />
                    <label
                      htmlFor="newPWConfirm"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                    >
                      Confirm new Password
                    </label>
                    <span className="password-toogle-icon">{ToggleIcon3}</span>
                  </div>
                </div>
              </div>

              <div className="mt-14 flex flex-col md:flex-row items-center justify-between">
                <div>
                  <p className="mb-3 text-md font-semibold text-sky-800 md:text-xl dark:text-gray-400"></p>
                  <p className=" text-gray-500 dark:text-[#fafaf9]">
                    Please follow this guide for a strong password:
                    <ul className="list-disc ml-8">
                      <li>
                        One special characters ( ! @ # $ % ^ & * ( ) - _ = + )
                      </li>
                      <li>Min 6 characters</li>
                      <li>One number (2 are recommended)</li>
                      <li>Change it often</li>
                    </ul>
                  </p>
                </div>
                <div>
                  <Toast ref={toast} />
                  <button
                    type="button"
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    onClick={handleUpdatePassword}
                  >
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          </form>
        </>
      }
    />
  );
};

export default ChangePassword;
