import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./register.css";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Loading from "../../Utils/Loading";
import LogoHolder from "../LogoHolder/LogoHolder";
import InputHolder from "../Components/InputHolder";
import CountrySelector from "../Components/CountrySelector";
import { useTitle } from "../../Services/useTitle";

const Register = (props) => {

  //if already logged in, redirect directly to dashboard
  if (props.isAuthenticated) {
    let uid = localStorage.getItem("userID");
    return <Redirect to={`/dashboard/${uid}`} />;
  }

  useTitle("Register - Evolve")

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    location: "India",
    email: "",
    password: "",
  });

  const [error, setError] = useState({ isSet: false, errorDesc: "" });

  let errorSet = (desc) => {
    setError({ isSet: true, errorDesc: desc });
  };

  let changeData = (e, type) => {
    setData({
      firstName: type === 1 ? e.target.value : data.firstName,
      lastName: type === 2 ? e.target.value : data.lastName,
      location: type === 3 ? e.target.value : data.location,
      email: type === 4 ? e.target.value : data.email,
      password: type === 5 ? e.target.value : data.password,
    });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    //TO DO - Perform validation of email

    // const REGISTER_ENDPOINT = "http://localhost:80/evolve/register.php";
    const REGISTER_ENDPOINT = process.env.REACT_APP_API_URL + "/register.php";

    try {
      let response = await axios.post(REGISTER_ENDPOINT, data);
      //console.log(response);

      //there is an error
      if (response.data.error !== undefined) {
        //console.log(response.data.error);
        document.getElementsByClassName("holder")[0].scrollTo(0, 0);

        //resetting the form
        setData({
          firstName: "",
          lastName: "",
          location: "",
          email: "",
          password: "",
        });

        //setting the error
        errorSet(response.data.error);
        return;
      } else if (response.status === 200 && response.data.userData.token) {
        console.log("Token:" + response.data.userData.token);

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
      errorSet("Some error occured while registering!");
      console.log(e);
    }
  };

  return props.loading === true ? (
    <Loading />
  ) : (
    <div className="flex flex-col min-h-screen pb-4 md:pb-8">
      <LogoHolder type="register" />
      <div className="m-auto holder px-4 py-8 xsm:px-6 sm:px-10 w-11/12 sm:w-10/12 md:w-6/12 xl:w-5/12">
        <form
          className="flex flex-col items-center justify-center"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="text-lg sm:text-xl md:text-2xl">
            Become an Evolve member
          </div>

          {/*Vertical line*/}
          <div className="my-6 bg-evolve-green h-px w-full"></div>

          {/*error box*/}
          {error.isSet && (
            <div className="border-2 border-red-500 text-white p-2 w-full sm:w-10/12 text-center my-2 md:text-base text-sm">
              {error.errorDesc}
            </div>
          )}

          <InputHolder title="First name" isRequired>
            <input
              type="text"
              title="First Name"
              name="firstname"
              value={data.firstName}
              placeholder="Enter your first name"
              onChange={(e) => changeData(e, 1)}
              spellCheck="false"
              className="input-field"
              required
            />
          </InputHolder>
          <InputHolder title="Last name">
            <input
              type="text"
              title="Last Name"
              name="lastname"
              value={data.lastName}
              placeholder="Enter your last name"
              onChange={(e) => changeData(e, 2)}
              className="input-field"
              spellCheck="false"
            />
          </InputHolder>
          {/*Change location to set of options only */}
          <InputHolder
            title="Country"
            isRequired
            showInfo
            info="This data is used to select the apt currency for you."
          >
            {/* <input
              type="text"
              title="Location"
              name="location"
              value={data.location}
              placeholder="Enter your country"
              onChange={(e) => changeData(e, 3)}
              spellCheck="false"
              className="input-field"
              required
            /> */}
            <CountrySelector
              value={data.location}
              onChange={(e) => changeData(e, 3)}
            />
          </InputHolder>
          <InputHolder title="Email ID" isRequired>
            <input
              type="text"
              title="Email"
              name="email"
              value={data.email}
              placeholder="Enter your email ID"
              onChange={(e) => changeData(e, 4)}
              spellCheck="false"
              className="input-field"
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
              onChange={(e) => changeData(e, 5)}
              className="input-field"
              required
            />
          </InputHolder>
          <button type="submit" className="w-full sm:w-10/12">
            <div className="border-2 border-white p-4 font-bold my-2 hover:text-white hover:bg-evolve-green hover:border-evolve-green transition-all text-sm">
              REGISTER
            </div>
          </button>
          <span className="text-sm mt-6">
            Already registered?{" "}
            <Link to="/login" className="text-evolve-green hover:underline">
              Click Here
            </Link>{" "}
            to Login!
          </span>
        </form>
      </div>
    </div>
  );
};

export default Register;
