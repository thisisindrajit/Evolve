import React from "react";
import "../box.css";
import "./assetbox.css";
import { connect } from 'react-redux';

const AssetBox = (props) => {

  // let [purprice, setpurprice] = useState("");

  // useEffect(() => {
  //     let purprice = props.purchasePrice.reduce((a, b) => a + b);
  //     setpurprice(purprice.toFixed(2)); //returns a string with 2 numbers after decimal dot
  // }, [props.purchasePrice])

  let isDataLoaded = props.stockLoading + props.cryptoLoading + props.bondLoading + props.othersLoading;
  let purprice = parseFloat(props.stockPurchasePrice) + parseFloat(props.cryptoPurchasePrice) + parseFloat(props.bondPurchasePrice) + parseFloat(props.othersPurchasePrice);

  return (
    <div className="box assetbox" style={props.gradient}>
      <div id="left">
        <span className="label">Purchase Value</span>
        <span className="value">{isDataLoaded === 0 ? "₹" + purprice.toFixed(2) : "Loading..."}</span>
      </div>
      <div id="right" style={{ marginLeft:"25px", borderLeft: "1px solid white", paddingLeft: "25px" }}>
        <span className="label">Average Return</span>
        <span className="value"></span>
      </div>
    </div>
  );
};

// these are the functions which are required to map the state to the props and dispatch actions to store

const mapStateToProps = state => ({
  ...state
});

export default connect(mapStateToProps)(AssetBox);