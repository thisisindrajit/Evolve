import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./register.css";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Loading from "../../Utils/Loading";
import.meta.hot; // FOR GETTING ENV VARIABLES FROM SNOWPACK

const Register = (props) => {
  //if already logged in, redirect directly to dashboard
  if (props.isAuthenticated) {
    let uid = localStorage.getItem("userID");
    return <Redirect to={`/dashboard/${uid}`} />;
  }

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    location: "",
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
        document.getElementById("holder").scrollTo(0, 0);

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
    <div id="register">
      <div id="holder">
        <form onSubmit={(e) => handleSubmit(e)}>
          <span id="label">Become an Evolve member</span>
          {/*Vertical line*/}
          <div
            style={{
              height: "0.5px",
              backgroundColor: "#14CCCC",
              width: "40vw",
              margin: "25px",
            }}
          ></div>
          {/*error box*/}
          {error.isSet && <div id="error">{error.errorDesc}</div>}
          <input
            type="text"
            title="First Name"
            name="firstname"
            value={data.firstName}
            placeholder="First Name (Required)"
            onChange={(e) => changeData(e, 1)}
            spellCheck="false"
            required
          />
          <input
            type="text"
            title="Last Name"
            name="lastname"
            value={data.lastName}
            placeholder="Last Name"
            onChange={(e) => changeData(e, 2)}
            spellCheck="false"
          />
          {/*Change location to set of options only */}
          <input
            type="text"
            title="Location"
            name="location"
            value={data.location}
            placeholder="Location (Required)"
            onChange={(e) => changeData(e, 3)}
            spellCheck="false"
            required
          />
          <input
            type="text"
            title="Email"
            name="email"
            value={data.email}
            placeholder="Email (Required)"
            onChange={(e) => changeData(e, 4)}
            spellCheck="false"
            required
          />
          <input
            type="password"
            title="Password"
            name="password"
            value={data.password}
            placeholder="Password (Required)"
            onChange={(e) => changeData(e, 5)}
            required
          />
          <button type="submit">Register</button>
          <span id="old-user">
            Already registered? <Link to="/login">Click Here</Link> to Login!
          </span>
        </form>
      </div>
    </div>
  );
};

export default Register;
