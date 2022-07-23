import React from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Loading from "./Utils/Loading";
import "./landingPage.css";
import full_logo from "./Images/logo_vector.png";
import LogoHolder from "./Components/LogoHolder/LogoHolder";
import { useTitle } from "./Services/useTitle";

const LandingPage = (props) => {
  useTitle("Evolve - Your online portfolio manager");

  //if already logged in, redirect directly to dashboard
  if (props.isAuthenticated) {
    let uid = localStorage.getItem("userID");
    return <Redirect to={`/dashboard/${uid}`} />;
  }

  return props.loading === true ? (
    <Loading />
  ) : (
    <div className="flex flex-col justify-between min-h-screen">
      {/* Logo holder */}
      <LogoHolder type="lp" />
      <div className="flex mb-12">
        <div className="flex items-center justify-center w-full md:w-3/5 p-4 md:p-0">
          <div className="content-holder rounded-lg w-full md:w-11/12 p-6 md:p-8 flex flex-col gap-4">
            <div className="text-base md:text-lg content leading-8">
              Unable to afford a portfolio manager to maintain your investments?
              <div className="mt-4 mb-2 leading-8">
                Welcome to EVOLVE - the only online investment portfolio manager
                that you'll ever need.
              </div>
            </div>
            <Link to="/register">
              <div className="text-sm md:text-base text-white content border-2 border-white p-3 w-fit reg-button transition-all">
                Become an Evolve member!
              </div>
            </Link>
          </div>
        </div>
        <div className="right-img-holder hidden md:block">
          <img
            src={full_logo}
            className="right-img"
            alt="Evolve-icon"
            style={{
              opacity: "0",
              margin: "auto",
              marginLeft: "0",
              animation:
                "icon-opacity-change 0.5s 0.25s cubic-bezier(.18,.87,.92,1) forwards",
            }}
          />
        </div>
      </div>
      {/* <div className="px-4 py-6 md:p-8 text-right text-sm footer">
        
        © Copyright {new Date().getFullYear()} - Evolve
      </div> */}
      <div className="px-4 py-6 md:p-8 text-xs leading-loose footer">
        {/* Attribution */}
        Created for the{" "}
        <span className="text-evolve-green font-bold">
          PlanetScale X Hashnode{" "}
          <img
            src="https://seeklogo.com/images/H/hashnode-logo-B114767E70-seeklogo.com.png"
            alt="Hashnode icon"
            className="h-5 rounded-md p-0.5 bg-white inline-block mx-0.5"
          />{" "}
          hackathon
        </span>
      </div>
    </div>
  );
};

export default LandingPage;
