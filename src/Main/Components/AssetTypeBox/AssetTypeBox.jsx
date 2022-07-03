import React, { useState, useEffect } from "react";
import "../box.css";
import "./assettypebox.css";

const AssetTypeBox = (props) => {
  
  return (
    <div className="box assettypebox" onClick={props.onClick}>
      <span>{props.title}</span>
    </div>
  );
};

export default AssetTypeBox;
