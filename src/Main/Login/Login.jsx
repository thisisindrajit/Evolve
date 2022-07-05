import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Loading from "../../Utils/Loading";
import LogoHolder from "../LogoHolder/LogoHolder";

const Login = (props) => {
  //if already logged in, redirect directly to dashboard
  if (props.isAuthenticated) {
    let uid = localStorage.getItem("userID");
    return <Redirect to={`/dashboard/${uid}`} />;
  }

  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState({ isSet: false, errorDesc: "" });

  let errorSet = (desc) => {
    setError({ isSet: true, errorDesc: desc });
  };

  let changeData = (e, type) => {
    setData({
      email: type === 1 ? e.target.value : data.email,
      password: type === 2 ? e.target.value : data.password,
    });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    // TODO: Perform email validation using regex

    // const LOGIN_ENDPOINT = "http://localhost:80/evolve/login.php";
    const LOGIN_ENDPOINT = process.env.REACT_APP_API_URL + "/login.php";

    try {
      let response = await axios.post(LOGIN_ENDPOINT, data);
      //console.log(response);

      //there is an error
      if (response.data.error !== undefined) {
        console.log(response.data.error);
        document.getElementsByClassName("holder")[0].scrollTo(0, 0);

        //resetting the form
        setData({ email: "", password: "" });

        //setting the error
        errorSet(response.data.error);
        return;
      } else if (response.status === 200 && response.data.userData.token) {
        let jwt = response.data.userData.token;
        let uid = response.data.userData.uid;
        let username = response.data.userData.name;

        localStorage.setItem("access_token", jwt);
        localStorage.setItem("userID", uid);
        localStorage.setItem("username", username);

        //setting authenticated to true
        props.login();
      }
    } catch (e) {
      errorSet("Some error occured while logging in!");
      console.log(e);
    }
  };

  return props.loading === true ? (
    <Loading />
  ) : (
    <div className="flex flex-col min-h-screen">
      <LogoHolder type="login" />
      <div className="m-auto holder px-4 py-8 xsm:px-6 sm:px-10 w-11/12 sm:w-10/12 md:w-6/12 xl:w-5/12">
        <form
          className="flex flex-col items-center justify-center"
          onSubmit={(e) => handleSubmit(e)}
        >
          <span className="text-xl md:text-2xl">Login into Evolve</span>

          {/*Vertical line*/}

          <div className="my-6 bg-evolve-green h-px w-full"></div>

          {/*error box*/}
          {error.isSet && (
            <div className="border-2 border-red-500 text-white p-2 w-full sm:w-10/12 text-center my-2 md:text-base text-sm">
              {error.errorDesc}
            </div>
          )}

          <input
            type="text"
            title="Email"
            name="email"
            value={data.email}
            placeholder="Email (Required)"
            onChange={(e) => changeData(e, 1)}
            className="input-field"
            spellCheck="false"
            required
          />
          <input
            type="password"
            title="Password"
            name="password"
            value={data.password}
            placeholder="Password (Required)"
            onChange={(e) => changeData(e, 2)}
            className="input-field"
            required
          />
          <button type="submit" className="w-full sm:w-10/12">
            <div className="border-2 border-white p-4 font-bold my-2 hover:text-white hover:bg-evolve-green hover:border-evolve-green transition-all text-sm">
              LOGIN
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
