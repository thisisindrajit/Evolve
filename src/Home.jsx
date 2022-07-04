import React from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Loading from "./Utils/Loading";
import "./home.css";
import logo from "./Images/logo_vector.png";
import full_logo from "./Images/logo_vector_full.png";

const Home = (props) => {
  //if already logged in, redirect directly to dashboard
  if (props.isAuthenticated) {
    let uid = localStorage.getItem("userID");
    return <Redirect to={`/dashboard/${uid}`} />;
  }

  return props.loading === true ? (
    <Loading />
  ) : (
    // <div id="home">
    //   <div id="top-bar">
    //     <img
    //       src={logo}
    //       height="80"
    //       width="80"
    //       style={{
    //         opacity: "0",
    //         margin: "auto",
    //         marginLeft: "0",
    //         marginRight: "10px",
    //         animation:
    //           "icon-opacity-change 0.5s 0.25s cubic-bezier(.18,.87,.92,1) forwards",
    //       }}
    //     />
    //     <div id="evolve">EVOLVE</div>
    //     <Link to="/login" className="side">
    //       Login
    //     </Link>
    //     <Link to="/register" className="side">
    //       Register
    //     </Link>
    //   </div>
    //   <div id="home-content">
    //     <div id="c-box">
    //       <div id="inside-box">
    //         <p>
    //           Unable to afford a portfolio manager to maintain your investments?{" "}
    //           <br></br>Welcome to Evolve - the only online investment portfolio
    //           manager that you'll ever need.
    //         </p>
    //         <Link to="/register" id="reg-but">
    //           Become an Evolve member!
    //         </Link>
    //       </div>
    //     </div>
    //     <div id="right-img-holder">
    //       <img
    //         src={logo}
    //         id="right-img"
    //         style={{
    //           opacity: "0",
    //           margin: "auto",
    //           marginLeft: "0",
    //           animation:
    //             "icon-opacity-change 0.5s 0.25s cubic-bezier(.18,.87,.92,1) forwards",
    //         }}
    //       />
    //     </div>
    //   </div>
    //   <div id="home-footer">
    //     © Copyright {new Date().getFullYear()} - Evolve
    //   </div>
    // </div>
    <div className="flex flex-col justify-between min-h-screen">
      <div className="flex items-center justify-between px-6 md:px-8 h-24">
        {/* Logo holder */}
        <div className="flex items-center gap-6">
          <img
            src={logo}
            width="28"
            alt="Evolve logo"
            style={{
              opacity: "0",
              animation:
                "icon-opacity-change 0.5s 0.25s cubic-bezier(.18,.87,.92,1) forwards",
            }}
          />
          <div className="text-base logo-evolve hidden md:block">EVOLVE</div>
        </div>
        {/* Links holder */}
        <div className="flex items-center justify-evenly sm:gap-12">
          <Link to="/login">
            <div className="topbar-link transition-all">Login</div>
          </Link>
          <Link to="/register">
            <div className="topbar-link transition-all hidden sm:block">
              Register
            </div>
          </Link>
        </div>
      </div>
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
      <div className="p-6 md:p-8 text-right text-sm footer">
        © Copyright {new Date().getFullYear()} - Evolve
      </div>
    </div>
  );
};

export default Home;
