/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { React, useState, useRef, useEffect } from "react";
import "./index.js";
import "./signUp.css";
import "../fontAwsomeIcons/index.js";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
export default function AcoountVerified() {
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    const [verificationMessage, setVerificationMessage] = useState(null);
    const [error, setError] = useState(null);
    const effectRan = useRef(false);// i am using it to stop the double render
    const verifiedAccount = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/auth?token=${token}`);
            setVerificationMessage(response.data);
          } catch (error) {
            console.error(error);
            setError(error.response.data);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
      if(effectRan.current==false){
        verifiedAccount();
      }
      return () => {
        effectRan.current= true;
      };
    }, [token]);
  
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
          <div className="rounded-md border-2 bg-white border-inherit w-1/2  mx-auto">
            <div className="border-b-2 h-36">
            <p className="text-center text-xl ">
            {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        <p>{verificationMessage}</p>
                    )}
            </p>
            </div>

            <div className="flex flex-row justify-between  h-14 ">
            <button className="hover:underline underline-offset-4 ml-2 font-medium text-base text-primary">
              <Link to={"/"}>Account login</Link>
            </button>
            <button className="hover:underline underline-offset-4 mr-2 font-medium text-base text-primary" >
              Create another account
            </button>
            </div>
            
          </div>
      </div>
    </>
  );
}
