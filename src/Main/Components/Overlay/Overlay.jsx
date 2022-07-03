import React from "react";
import "./overlay.css";

const Overlay = (props) => {
  return (
    <div id="overlay">
     {props.children}
    </div>
  );
};

export default Overlay;
