/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { React, useState, useRef, useEffect } from "react";
import "./index.js";
import "./signUp.css";
import usePasswordToggle from "../../hooks/usePasswordToggle.jsx";
import "../fontAwsomeIcons/index.js";
import { Link } from "react-router-dom";
import { saveUser } from "../../services/user/UserService.jsx";

export default function Signup() {
  const nameRef = useRef();
  const userRef = useRef();
  const errRef = useRef();
  const sucessRef = useRef();

  const [firstName, setFirstName] = useState("");
  const [firstNameFocus, setFirstNameFocus] = useState(false);

  const [lastName, setLastName] = useState("");

  const [user, setUser] = useState("");
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [pwdFocus, setPwdFocus] = useState(false);

  const [PasswordInputType, ToggleIcon] = usePasswordToggle();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  useEffect(() => {
    setError("");
  }, [firstName, lastName, user, pwd]);

  const handleNewUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await saveUser({
        firstName: firstName,
        lastName: lastName,
        username: user,
        password: pwd,
      });
      console.log(response);
      setSuccess(true);
      console.log(response?.data);
      //clear state and controlled inputs
      setFirstName("");
      setLastName("");
      setUser("");
      setPwd("");
      setError(null);
      sucessRef.current.focus();
    } catch (error) {
      console.error("Axios Error:", error.response.data);
      setError(error.response.data);
      errRef.current.focus();
    } finally {
      // Ensure loading indicator is turned off whether login succeeds or fails
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex w-full h-screen">
        <div
          className="hidden lg:flex h-full w-1/2 items-center justify-center"
          style={{
            backgroundImage: "url(src/assets/signUp.jpg)",
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
          loading="lazy"
        />
        {!success ? (
          <div className="w-full  flex items-center justify-center lg:w-1/2">
            <div className="my-10 w-11/12 max-w-[700px] px-10 rounded-3xl bg-white border-2 border-gray-100 pt-20 pb-4 ">
              <h1 className="text-4xl text-center font-semibold ">
                Get started !
              </h1>
              <div className="mt-5 flex justify-center items-center">
                <p className="font-medium text-base">
                  You already have an account?
                </p>
                <button className="hover:underline underline-offset-4 ml-2 font-medium text-base text-primary">
                  <Link to={"/"}>Log in</Link>
                </button>
              </div>
              <form className="" onSubmit={handleNewUser}>
                <div
                  className={
                    error
                      ? "error text-red-500 bg-red-100 border border-red-500 rounded-md p-3 mb-3"
                      : "offscreen"
                  }
                  aria-live="assertive"
                  ref={errRef}
                >
                  {error}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="firstName" className="text-lg font-medium">
                    First name
                  </label>
                  <input
                    className="w-full border-2 border-gray-100 rounded-xl py-2 px-3 mt-1 bg-transparent"
                    placeholder="Enter your First name
                    "
                    id="firstName"
                    ref={nameRef}
                    autoComplete="off"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    required
                    onFocus={() => setFirstNameFocus(true)}
                    onBlur={() => setFirstNameFocus(false)}
                  />
                </div>
                <div className="flex flex-col mt-4">
                  <label htmlFor="lastName" className="text-lg font-medium">
                    Last Name
                  </label>
                  <input
                    className="w-full border-2 border-gray-100 rounded-xl  py-2 px-3 mt-1 bg-transparent"
                    placeholder="Enter your Last name"
                    id="lastName"
                    autoComplete="off"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    required
                  />
                </div>
                <div className="flex flex-col mt-4">
                  <label htmlFor="username" className="text-lg font-medium">
                    Email
                  </label>
                  <input
                    className="w-full border-2 border-gray-100 rounded-xl  py-2 px-3 mt-1 bg-transparent"
                    placeholder="Enter your email"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                  />
                </div>
                <div className="flex flex-col mt-4">
                  <label htmlFor="password" className="text-lg font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      className="w-full border-2 border-gray-100 rounded-xl  py-2 px-3 mt-1 bg-transparent"
                      placeholder="Enter your password"
                      id="password"
                      type={PasswordInputType}
                      onChange={(e) => setPwd(e.target.value)}
                      value={pwd}
                      required
                      onFocus={() => setPwdFocus(true)}
                      onBlur={() => setPwdFocus(false)}
                    />
                    <span className="password-toogle-icon">{ToggleIcon}</span>
                  </div>
                </div>
                <div className="mt-8 flex flex-col gap-y-4">
                  <button
                    type="submit"
                    className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-3 bg-primary rounded-xl text-white font-bold text-lg"
                  >
                    {isLoading ? (
                      <div className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                    ) : (
                      <span>Sign up</span>
                    )}
                  </button>
                  {/* <div className="flex items-center">
                    <hr className="flex-grow border-gray-300" />
                    <span className="mx-2 text-gray-500">or</span>
                    <hr className="flex-grow border-gray-300" />
                  </div>
                  <button className="flex items-center justify-center gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4  rounded-xl text-gray-700 font-semibold text-lg border-2 border-gray-100 ">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.26644 9.76453C6.19903 6.93863 8.85469 4.90909 12.0002 4.90909C13.6912 4.90909 15.2184 5.50909 16.4184 6.49091L19.9093 3C17.7821 1.14545 15.0548 0 12.0002 0C7.27031 0 3.19799 2.6983 1.24023 6.65002L5.26644 9.76453Z"
                        fill="#EA4335"
                      />
                      <path
                        d="M16.0406 18.0142C14.9508 18.718 13.5659 19.0926 11.9998 19.0926C8.86633 19.0926 6.21896 17.0785 5.27682 14.2695L1.2373 17.3366C3.19263 21.2953 7.26484 24.0017 11.9998 24.0017C14.9327 24.0017 17.7352 22.959 19.834 21.0012L16.0406 18.0142Z"
                        fill="#34A853"
                      />
                      <path
                        d="M19.8342 20.9978C22.0292 18.9503 23.4545 15.9019 23.4545 11.9982C23.4545 11.2891 23.3455 10.5255 23.1818 9.81641H12V14.4528H18.4364C18.1188 16.0119 17.2663 17.2194 16.0407 18.0108L19.8342 20.9978Z"
                        fill="#4A90E2"
                      />
                      <path
                        d="M5.27698 14.2663C5.03833 13.5547 4.90909 12.7922 4.90909 11.9984C4.90909 11.2167 5.03444 10.4652 5.2662 9.76294L1.23999 6.64844C0.436587 8.25884 0 10.0738 0 11.9984C0 13.918 0.444781 15.7286 1.23746 17.3334L5.27698 14.2663Z"
                        fill="#FBBC05"
                      />
                    </svg>
                    Sign up with Google
                  </button> */}
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="w-full bg-white border-l-2 flex flex-col justify-center items-center lg:w-1/2">
            <div className="border border-inherit rounded-sm py-5 px-5 bg-gray-100 ">
              <h2 className="text-lg font-bold mb-4 text-green-600 text-center">
                {" "}
                Account created
              </h2>
              <p className="text-center mb-4">
                Please access your email to confirm your account. Simply click
                on the link we have sent. <br />
                If you can't find it, kindly check your spam folder.
              </p>
              <div className="flex justify-between mt-12">
                <button className="hover:underline underline-offset-4 ml-2 font-medium text-base text-primary">
                  <Link to={"/"}>Account login</Link>
                </button>
                <button
                  className="hover:underline underline-offset-4 ml-2 font-medium text-base text-primary"
                  onClick={() => setSuccess(false)}
                >
                  Create another account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
