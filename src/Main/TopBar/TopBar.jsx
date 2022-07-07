//https://www.techiediaries.com/react-formdata-file-upload-multipart-form-tutorial/

import React from "react";
import UserMenu from "../Components/UserMenu";
import "./topbar.css";

const TopBar = (props) => {
  return (
    <div className="p-4 md:px-4 md:py-6 flex justify-between items-center sticky z-10 top-bar transition-all mb-6">
      <div className="text-lg sm:text-xl md:text-2xl">
        Welcome{" "}
        <span className="font-bold">{localStorage.getItem("username")}</span>
      </div>
      <UserMenu
        logout={() => props.logout()}
        userName={localStorage.getItem("username")}
      />
    </div>
  );
};

export default TopBar;
