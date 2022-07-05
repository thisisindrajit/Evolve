import React from "react";
import loading from "../Images/loading.svg";

const Loading = (props) => {
  return (
    <div className="min-h-screen flex items-center justify-center gap-2 text-base md:text-lg">
      <img src={loading} alt="loading icon" />
      <div>LOADING...</div>
    </div>
  );
};

export default Loading;
