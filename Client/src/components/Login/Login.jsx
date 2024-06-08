/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import "./index.js";
import "./login.css";
import usePasswordToggle from "../../hooks/usePasswordToggle.jsx";
import "../fontAwsomeIcons/index.js";
import { Link, useLocation } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin.jsx";
export default function Login() {
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [PasswordInputType, ToggleIcon] = usePasswordToggle();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");

  const { login, isLoading,setError, error, errRef } = useLogin();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {setError("")}, [user, pwd]);

  const handelLoginUser = async (e) => {
    e.preventDefault();
    await login(user, pwd);
    // Clear the form fields after successful login
    // setUser("");
    // setPwd("");
  };

  return (
    <div className="flex w-full h-screen bg-white">
      <div
        className="hidden lg:flex h-full w-1/2 items-center justify-center border-r-2"
        style={{
          backgroundImage:"url(src/assets/cover.png)",//"url(src/assets/login.jfif)",
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
        loading="lazy"
      />

      <div className="w-full  flex items-center justify-center lg:w-1/2  h-full ">
        <div className="w-11/12 max-w-[700px] px-10 py-8 rounded-3xl  border-gray-100 ">
          <h1 className="text-4xl text-center font-semibold ">Welcome Back</h1>
          <p className=" text-center font-medium text-lg text-gray-500 mt-4">
            Sign in to continue
          </p>
          <form className="" onSubmit={handelLoginUser}>
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
              <label htmlFor="username" className="text-lg font-medium">
                Email
              </label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
                placeholder="Enter your email"
                id="username"
                ref={userRef}
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
            </div>

            <div className="flex flex-col mt-4">
              <label htmlFor="password" className="text-lg font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
                  placeholder="Enter your password"
                  type={PasswordInputType}
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                  onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
                />
                <span className="password-toogle-icon">{ToggleIcon}</span>
              </div>
            </div>
            <div className="mt-8 flex justify-between items-center">
              <div>
                <input type="checkbox" id="remember" className="rounded-sm" />
                <label
                  className="ml-2 font-medium text-base"
                  htmlFor="remember"
                >
                  Remember me
                </label>
              </div>
              <button className="	hover:underline underline-offset-4 font-medium text-base text-primary">
                <Link to={"/resetpassword"}>Forgot password?</Link>
              </button>
            </div>
            <div className="mt-8 flex flex-col gap-y-4">
              <button
                disabled={isLoading}
                type="submit"
                className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-primary rounded-xl text-white font-bold text-lg"
              >
                {isLoading ? (
                  <div className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                ) : (
                  <span>Sign in</span>
                )}
              </button>
              <div className="flex items-center">
                <hr className="flex-grow border-gray-300" />
                <span className="mx-2 text-gray-500">or</span>
                <hr className="flex-grow border-gray-300" />
              </div>
              {/* <button className="flex items-center justify-center gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4  rounded-xl text-gray-700 font-semibold text-lg border-2 border-gray-100 ">
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
                Sign in with Google
              </button> */}
            </div>
            <div className="mt-8 flex justify-center items-center">
              <p className="font-medium text-base">Dont have an account?</p>
              <button className="	hover:underline underline-offset-4 ml-2 font-medium text-base text-primary">
                <Link to={"/signup"}>Sign up for free</Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
