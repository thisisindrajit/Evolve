import React, { useEffect } from "react";
import TopBar from "./TopBar/TopBar";
import Dashboard from "./Dashboard/Dashboard";
import Search from "./Search/Search";
import Market from "./Market/Market";
import Notes from "./Notes/Notes";
import "./content.css";

const Content = (props) => {
  useEffect(() => {
    const updatePosition = () => {
      const scrollTopValue = document.getElementById("content").scrollTop;

      if (scrollTopValue > 25) {
        document.querySelector(".top-bar").classList.add("top-bar-active");
      } else {
        document.querySelector(".top-bar").classList.remove("top-bar-active");
      }
    };
    document
      .getElementById("content")
      .addEventListener("scroll", updatePosition);

    updatePosition();
  }, []);

  return (
    <div id="content">
      <TopBar logout={props.logout} currentpage={props.currentpage} setpage={props.setpage}/>
      <div id="page-render">
        {props.currentpage == 1 && <Dashboard />}
        {props.currentpage == 2 && <Search />}
        {props.currentpage == 3 && <Market />}
        {props.currentpage == 4 && <Notes />}
      </div>
    </div>
  );
};

export default Content;
