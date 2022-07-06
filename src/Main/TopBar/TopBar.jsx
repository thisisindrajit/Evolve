//https://www.techiediaries.com/react-formdata-file-upload-multipart-form-tutorial/

import React from "react";
// import "./topbar.css";

const TopBar = (props) => {
  return (
    <div className="px-4 py-6 xl:p-6 flex justify-between items-center">
      <div className="text-lg sm:text-xl md:text-2xl">
        Welcome{" "}
        <span className="font-bold">{localStorage.getItem("username")}</span>
      </div>
      {/* <img id="dp" onClick={() => props.logout()} src="https://pics.freeicons.io/uploads/icons/png/7947586491595453760-512.png" alt="Display Picture" /> */}
      <svg
        className="cursor-pointer h-6 md:h-8"
        viewBox="0 0 80 80"
        onClick={() => props.logout()}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="39.115" cy="39.115" r="39.115" fill="#007367" />
        <mask
          id="mask0_11_335"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="79"
          height="79"
        >
          <circle cx="39.115" cy="39.115" r="39.115" fill="#C4C4C4" />
        </mask>
        <g mask="url(#mask0_11_335)">
          <ellipse
            cx="39.1157"
            cy="68.8424"
            rx="29.7274"
            ry="17.2106"
            fill="#89FFDD"
          />
        </g>
        <ellipse
          cx="39.1154"
          cy="33.2478"
          rx="14.0814"
          ry="14.0814"
          fill="#89FFDD"
        />
      </svg>
    </div>
  );
};

export default TopBar;
