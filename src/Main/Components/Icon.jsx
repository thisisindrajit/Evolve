import React from "react";

const Icon = (props) => {

  let viewboxvalue = "0 0 " + (props.height+10) + " " + (props.width+10);

  const iconstyle = {
      margin:"30px auto",
      animation:"icon-opacity-change 0.75s 0.1s cubic-bezier(.18,.87,.92,1) forwards"
  }
  
  return (
    <svg
      className="icon"
      style={{cursor:"pointer", ...iconstyle}}
      width={props.width}
      height={props.height}
      viewBox={viewboxvalue}
      fill={props.fill == "yes" ? "white" : "none"}
      stroke={props.fill == "no" ? "white" : "none"}
      strokeWidth="2"
      xmlns="http://www.w3.org/2000/svg"
      onClick={props.onClick}
    >
        {props.children}
    </svg>
  );
};

export default Icon;
