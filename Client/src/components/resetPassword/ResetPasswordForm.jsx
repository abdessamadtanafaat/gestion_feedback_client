/* eslint-disable no-unused-vars */
import { React, useState } from "react";
import "../fontAwsomeIcons/index.js";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { resetPassword } from "../../services/user/UserService.jsx";
import usePasswordToggle from "../../hooks/usePasswordToggle.jsx";

export default function ResetPasswordForm() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const [error, setError] = useState(null);
  const [changePwdRequest, setChangePwdRequest] = useState({
    newPass: "",
    confirmPass: "",
  });
  const [isLoading, setIsLoading] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const [PasswordInputType2, ToggleIcon2] = usePasswordToggle();
  const [PasswordInputType3, ToggleIcon3] = usePasswordToggle();

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (
        changePwdRequest.newPass === "" &&
        changePwdRequest.confirmPass === ""
      ) {
        setError("Fields are Empty!");
      } else {
        const response = await resetPassword(changePwdRequest, token);
        setSuccessMsg(response);
        setError(null);
      }
    } catch (error) {
      console.error("Axios Error:", error.response.data);
      setError(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center  w-full h-screen">
        <div className="my-10 w-3/4 max-w-[700px] px-10 py-5 rounded-3xl bg-white border-2 border-gray-100 ">
          {successMsg ? (
            <>
              <div className=" mt-4 text-green-600 bg-green-100 border border-green-600 rounded-md p-3 mb-4 w-3/4 mx-auto">
                {successMsg}
              </div>
              <div className="mt-8 flex justify-end w-3/4 mx-auto">
                <button className="	hover:underline underline-offset-4 ml-2 font-medium text-base text-primary">
                  <Link to={"/"}>Log in</Link>
                </button>
              </div>
            </>
          ) : (
            <>
              <h1 className="w-3/4 mx-auto text-xl">
                Please enter new password
              </h1>
              <form className="mt-8" onSubmit={handleUpdatePassword}>
                {error && (
                  <div className="text-red-500 bg-red-100 border border-red-500 rounded-md p-3 mb-4 w-3/4 mx-auto">
                    {error}
                  </div>
                )}
                <div className="mb-6 flex flex-col w-3/4 mx-auto gap-4 ">
                  <div className="relative z-0 w-full">
                    <input
                      type={PasswordInputType2}
                      id="newPW"
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
                      //   ref={newPWConfirmRef}
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
                <div className="mt-8 w-3/4 mx-auto flex flex-col gap-y-4">
                  <button
                    type="submit"
                    className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-primary rounded-xl text-white font-bold text-lg"
                  >
                    {isLoading ? (
                      <div className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                    ) : (
                      <span>update password</span>
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
