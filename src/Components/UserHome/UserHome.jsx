import React, { useState } from "react";
import "./userhome.css";
import Sidebar from "../Sidebar/Sidebar";
import Content from "../Content/Content";
import { Redirect } from "react-router-dom";

const UserHome = (props) => {
  if (props.match.params.id !== localStorage.getItem("userID")) {
    return <Redirect to="/" />;
  }

  let [curpage, setcurpage] = useState(1);

  //helper function to set new current page (page indicators -> 1 - dashboard, 2 - search, 3 - market, 4 - notes)
  const setnewcurpage = (page) => {
    setcurpage(page);
  };

  return (
    <div id="user-home">
      <Sidebar fillvalue={curpage} setpage={setnewcurpage} />
      <Content
        currentpage={curpage}
        setpage={setnewcurpage}
        logout={props.logout}
      />
    </div>
  );
};

export default UserHome;
