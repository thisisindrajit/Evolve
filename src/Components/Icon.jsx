import React from "react";
import ReactTooltip from "react-tooltip";

const Icon = (props) => {
  const iconstyle = {
    animation:
      "icon-opacity-change 0.75s 0.1s cubic-bezier(.18,.87,.92,1) forwards",
  };

  return (
    <div className={props.className}>
      <svg
        className={`${!props.noIconCSS && "icon"} outline-none`}
        style={{ cursor: "pointer", ...iconstyle }}
        height={props.height}
        width={props.width}
        viewBox="0 0 40 40"
        fill={props.fill === "yes" ? "white" : "none"}
        stroke={props.fill === "no" ? "white" : "none"}
        strokeWidth="2"
        xmlns="http://www.w3.org/2000/svg"
        onClick={props.onClick ? props.onClick : null}
        data-tip={props.tooltipData}
        data-for="icon"
      >
        {props.children}
      </svg>
      {props.showTooltip && (
        <ReactTooltip id="icon" place="right" type="light" effect="float" />
      )}
    </div>
  );
};

export default Icon;
