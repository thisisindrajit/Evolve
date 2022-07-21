import React from "react";
import "../box.css";
import "./assetbox.css";
import { connect } from "react-redux";
import { currency } from "../../Utils/constants";

const AssetBox = (props) => {
  const isDataLoaded =
    props.stockLoading +
    props.cryptoLoading +
    props.bondLoading +
    props.othersLoading;
  const purprice =
    parseFloat(props.stockPurchasePrice) +
    parseFloat(props.cryptoPurchasePrice) +
    parseFloat(props.bondPurchasePrice) +
    parseFloat(props.othersPurchasePrice);
  const isAvgReturnAvailable =
    props.stockAvgReturn &&
    props.cryptoAvgReturn &&
    props.bondAvgReturn &&
    props.othersAvgReturn;
  const avgReturn =
    parseFloat(props.stockAvgReturn) +
    parseFloat(props.cryptoAvgReturn) +
    parseFloat(props.bondAvgReturn) +
    parseFloat(props.othersAvgReturn);
  const isAssetsAvailable =
    props.stocks.length +
      props.crypto.length +
      props.bonds.length +
      props.others.length >
    0;

  return (
    <div
      className="flex justify-between assetbox rounded-lg p-4"
      style={props.gradient}
    >
      <div className="flex flex-col gap-1.5 w-6/12">
        <span className="text-sm sm:text-base xl:text-lg font-bold">
          Purchase Value
        </span>
        <span className="text-sm sm:text-base truncate">
          {isDataLoaded === 0 ? currency + purprice.toFixed(2) : "Loading..."}
        </span>
      </div>
      {/* horizontal line */}
      <div className="h-full w-0.5 mx-4 hor-line"></div>
      <div className="flex flex-col gap-1.5 w-6/12">
        <span className="text-sm sm:text-base xl:text-lg font-bold">
          Average Return
        </span>
        <span className="text-sm sm:text-base truncate">
          {isDataLoaded === 0
            ? isAssetsAvailable
              ? isAvgReturnAvailable
                ? avgReturn >= 0
                  ? currency + avgReturn.toFixed(2)
                  : "-" + currency + (-1 * avgReturn).toFixed(2)
                : "Loading..."
              : "-"
            : "Loading..."}
        </span>
      </div>
    </div>
  );
};

// these are the functions which are required to map the state to the props and dispatch actions to store

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(AssetBox);
