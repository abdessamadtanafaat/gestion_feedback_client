/* eslint-disable no-unused-vars */
import { React, useState } from "react";
import "../fontAwsomeIcons/index.js";
import { Link } from "react-router-dom";
import {sendResetPassRequest} from '../../services/user/UserService.jsx'
export default function ResetPassword() {
  const[successMsg, setSuccessMsg] = useState(null);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(null);
    

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await sendResetPassRequest(username);
      setSuccessMsg(response);
      setError(null);
    } catch (error) {
      console.error("Axios Error:", error.response.data);
      setError(error.response.data);
    }
    finally {
      setIsLoading(false); 
  }
  };

  return (
    <>
      <div className="flex items-center justify-center  w-full h-screen">
        
          <div className="my-10 w-3/4 max-w-[700px] px-10 py-5 rounded-3xl bg-white border-2 border-gray-100 ">
            <h1 className="text-4xl text-center font-semibold mt-10">
              Reset Password
            </h1>
            {/* <div className="bg-green-300 py-2 px-2 rounded-sm mt-2">
              <p>we sent you an email to reset your password</p>
            </div> */}

            <form className="mt-8" onSubmit={handleResetPassword}>
            {successMsg && (
                <div className="text-green-600 bg-green-100 border border-green-600 rounded-md p-3 mb-3">
                  {successMsg}
                </div>
              )}
              {error && (
                <div className="text-red-500 bg-red-100 border border-red-500 rounded-md p-3 mb-3">
                  {error}
                </div>
              )}

              <div className="flex flex-col mt-4">
                <label className="text-lg font-medium">Email</label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
                  placeholder="Enter your email"
                  onChange={(e)=>setUsername(e.target.value)}
                  value={username}
                  name="username"
                />
              </div>
              <div className="mt-8 flex flex-col gap-y-4">
                <button
                  type="submit"
                  className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-primary rounded-xl text-white font-bold text-lg"
                >
                 {isLoading ? (
                <div className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                ) : (
                  <span>Reset password</span>
                )}
                </button>
              </div>
            </form>
            <div className="mt-8 flex flex-row justify-between">
                
                <button className='	hover:underline underline-offset-4 ml-2 font-medium text-base text-primary'>
                  <Link to={"/signup"}>create an account</Link>
                </button>
                <button className='	hover:underline underline-offset-4 ml-2 font-medium text-base text-primary'>
                  <Link to={"/"}>you have account ? Log in</Link>
                </button>
              </div>
          </div>
        
        
      </div>
    </>
  );
}
