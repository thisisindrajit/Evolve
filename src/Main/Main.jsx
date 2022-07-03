import React, { useState, useEffect } from "react";
import "./main.css";
import Sidebar from "./Sidebar/Sidebar";
import Content from "./Content";
import { Redirect } from 'react-router-dom';

const Main = (props) => {
    
  if (props.match.params.id !== localStorage.getItem("userID")) {
    return <Redirect to="/" />;
  }

  let [curpage, setcurpage] = useState(1);

  //helper function to set new current page (page indicators -> 1 - dashboard, 2 - search, 3 - market, 4 - notes)
  const setnewcurpage = (page) => {
    setcurpage(page);
  };

  return (
    <div id="main">
      <Sidebar fillvalue={curpage} setpage={setnewcurpage} />
      <Content currentpage={curpage} logout={props.logout} />
    </div>
  );
};

export default Main;
