//https://www.techiediaries.com/react-formdata-file-upload-multipart-form-tutorial/

import React from "react";
import UserMenu from "../Components/UserMenu";
import logo from "../../Images/logo_vector.png";
import "./topbar.css";

const TopBar = (props) => {
  return (
    <div className="p-4 md:px-4 md:py-6 flex justify-between items-center sticky z-10 top-bar transition-all mb-6">
      {/* Welcome in case of desktop mode */}
      <div className="text-lg sm:text-xl md:text-2xl hidden md:block">
        Welcome{" "}
        <span className="font-bold">{localStorage.getItem("username")}</span>
      </div>
      {/* hamburger menu in case of mobile mode */}
      <div className="flex flex-col h-5 w-5 items-center justify-center md:hidden">
        <span className="hamburger__top-bun"></span>
        <span className="hamburger__bottom-bun"></span>
      </div>
      <div className="block md:hidden">
        <img
          src={logo}
          height="20"
          width="20"
          alt="Evolve logo"
          className=""
          style={{
            opacity: "0",
            paddingTop: "0.5px",
            animation:
              "icon-opacity-change 0.75s 0.1s cubic-bezier(.18,.87,.92,1) forwards",
          }}
        />
      </div>
      <UserMenu
        logout={() => props.logout()}
        userName={localStorage.getItem("username")}
      />
    </div>
  );
};

export default TopBar;
