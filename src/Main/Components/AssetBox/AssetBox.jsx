import React from "react";
import "../box.css";
import "./assetbox.css";
import { connect } from "react-redux";
import { currency } from "../../../Utils/constants";

const AssetBox = (props) => {
  let isDataLoaded =
    props.stockLoading +
    props.cryptoLoading +
    props.bondLoading +
    props.othersLoading;
  let purprice =
    parseFloat(props.stockPurchasePrice) +
    parseFloat(props.cryptoPurchasePrice) +
    parseFloat(props.bondPurchasePrice) +
    parseFloat(props.othersPurchasePrice);

  return (
    <div className="flex assetbox rounded-lg p-4" style={props.gradient}>
      <div className="flex flex-col gap-2 w-6/12">
        <span className="text-sm sm:text-base xl:text-lg font-bold">Purchase Value</span>
        <span className="text-sm sm:text-base xl:text-lg truncate">
          {isDataLoaded === 0 ? currency + purprice.toFixed(2) : "Loading..."}
        </span>
      </div>
      {/* horizontal line */}
      <div className="h-full w-0.5 mx-4 hor-line"></div>
      <div className="flex flex-col gap-2 w-6/12">
        <span className="text-sm sm:text-base xl:text-lg font-bold">Average Return</span>
        <span className="text-sm sm:text-base xl:text-lg truncate"></span>
      </div>
    </div>
  );
};

// these are the functions which are required to map the state to the props and dispatch actions to store

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(AssetBox);
