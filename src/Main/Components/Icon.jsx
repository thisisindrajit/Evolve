import React from "react";

const Icon = (props) => {
  const iconstyle = {
    animation:
      "icon-opacity-change 0.75s 0.1s cubic-bezier(.18,.87,.92,1) forwards",
  };

  return (
    <div className="h-8 my-6 flex items-center">
      <svg
        className="icon"
        style={{ cursor: "pointer", ...iconstyle }}
        height={props.height}
        width={props.width}
        viewBox="0 0 40 40"
        fill={props.fill == "yes" ? "white" : "none"}
        stroke={props.fill == "no" ? "white" : "none"}
        strokeWidth="2"
        xmlns="http://www.w3.org/2000/svg"
        onClick={props.onClick}
      >
        {props.children}
      </svg>
    </div>
  );
};

export default Icon;
