import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Loading from "../../Utils/Loading";
import LogoHolder from "../LogoHolder/LogoHolder";
import InputHolder from "../InputHolder";
import { useTitle } from "../../Services/useTitle";

const Login = (props) => {
  //if already logged in, redirect directly to dashboard
  if (props.isAuthenticated) {
    let uid = localStorage.getItem("userID");
    return <Redirect to={`/dashboard/${uid}`} />;
  }

  useTitle("Login - Evolve");

  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState({ isSet: false, errorDesc: "" });
  const [buttonText, setButtonText] = useState("LOGIN");

  const errorSet = (desc) => {
    setError({ isSet: true, errorDesc: desc });
  };

  const changeData = (e, type) => {
    setData({
      email: type === 1 ? e.target.value : data.email,
      password: type === 2 ? e.target.value : data.password,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("LOGGING YOU IN...");

    const LOGIN_ENDPOINT = process.env.REACT_APP_API_URL + "/login.php";

    try {
      let response = await axios.post(LOGIN_ENDPOINT, data);

      // there is an error
      if (response.data.error !== undefined) {
        console.log(response.data.error);
        document.getElementsByClassName("holder")[0].scrollIntoView();

        // changing button text
        setButtonText("LOGIN");

        // resetting the form
        setData({ email: "", password: "" });

        // setting the error
        errorSet(response.data.error);
        return;
      } else if (response.status === 200 && response.data.userData.token) {
        let jwt = response.data.userData.token;
        let uid = response.data.userData.uid;
        let username = response.data.userData.name;

        localStorage.setItem("access_token", jwt);
        localStorage.setItem("userID", uid);
        localStorage.setItem("username", username);

        // setting authenticated to true
        props.login();
      }
    } catch (e) {
      // changing button text
      setButtonText("LOGIN");
      errorSet("Some error occured while logging in!");
      console.error(e);
    }
  };

  return props.loading === true ? (
    <Loading />
  ) : (
    <div className="flex flex-col min-h-screen pb-4 md:pb-8">
      <LogoHolder type="login" />
      <div className="m-auto holder px-4 py-8 xsm:px-6 sm:px-10 w-11/12 sm:w-10/12 md:w-6/12 xl:w-5/12">
        <form
          className="flex flex-col items-center justify-center"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="text-xl md:text-2xl">Login into Evolve</div>

          {/*Vertical line*/}
          <div className="my-6 bg-evolve-green h-px w-full"></div>

          {/*error box*/}
          {error.isSet && (
            <div className="border-2 border-red-500 text-white p-2 w-full sm:w-10/12 text-center my-2 md:text-base text-sm">
              {error.errorDesc}
            </div>
          )}

          <InputHolder title="Email ID" isRequired>
            <input
              type="email"
              title="Email"
              name="email"
              value={data.email}
              placeholder="Enter your email ID"
              onChange={(e) => changeData(e, 1)}
              className="input-field"
              spellCheck="false"
              required
            />
          </InputHolder>
          <InputHolder title="Password" isRequired>
            <input
              type="password"
              title="Password"
              name="password"
              value={data.password}
              placeholder="Enter your password"
              onChange={(e) => changeData(e, 2)}
              className="input-field"
              required
            />
          </InputHolder>
          <button type="submit" className="w-full sm:w-10/12">
            <div className="border-2 border-white p-4 font-bold my-2 hover:text-white hover:bg-evolve-green hover:border-evolve-green transition-all text-sm">
              {buttonText}
            </div>
          </button>

          <span className="text-sm mt-6">
            New User?{" "}
            <Link to="/register" className="text-evolve-green hover:underline">
              Click Here
            </Link>{" "}
            to register!
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
