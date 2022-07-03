import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Loading from "../../Utils/Loading";
import.meta.hot; // FOR GETTING ENV VARIABLES FROM SNOWPACK

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
        document.getElementById("holder").scrollTo(0, 0);

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
    <div id="login">
      <div id="holder">
        <form onSubmit={(e) => handleSubmit(e)}>
          <span id="label">Login into Evolve</span>

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
            title="Email"
            name="email"
            value={data.email}
            placeholder="Email (Required)"
            onChange={(e) => changeData(e, 1)}
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
            required
          />
          <button type="submit">Login</button>

          <span id="new-user">
            New User? <Link to="/register">Click Here</Link> to register!
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
