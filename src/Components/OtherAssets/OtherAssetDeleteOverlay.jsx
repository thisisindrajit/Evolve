import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import DialogBox from "../DialogBox/DialogBox";

const OtherAssetDeleteOverlay = (props) => {
  let isunmounted = false;
  let [text, setText] = useState("Delete");

  let deleteOtherAsset = async () => {
    setText("Deleting...");

    const data = {
      otherAssetTransactionID: props.otherAssettid,
      type: "3",
    };

    const DELETE_ENDPOINT =
      process.env.REACT_APP_API_URL + "/addEditDelOtherAsset.php";

    try {
      let response = await axios.post(DELETE_ENDPOINT, data);

      if (response.status === 200 && !isunmounted) {
        console.log(response.data);
        props.setLoading({ type: "setLoading", payload: { othersLoading: 1 } });
      } else {
        console.log(response.data.error);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <DialogBox
      isOpen={props.cryptotid === -1 ? false : true}
      onClose={text === "Delete" ? () => props.setOverlay(-1) : () => {}}
      title="Delete Asset"
    >
      <div className="flex flex-col text-base gap-2 cursor-pointer">
        <div className="text-sm text-justify md:text-base mb-4">
          Do you really want to delete this asset?
        </div>
        <div
          className="bg-red-500 text-white p-3 w-full text-sm uppercase rounded-md text-center"
          onClick={text === "Delete" ? () => deleteOtherAsset() : null}
        >
          {text}
        </div>
        <div
          className="border border-white text-white p-3 w-full text-sm uppercase rounded-md text-center cursor-pointer"
          onClick={text === "Delete" ? () => props.setOverlay(-1) : null}
        >
          Cancel
        </div>
      </div>
    </DialogBox>
  );
};

// these are the functions which are required to map the state to the props and dispatch actions to store
const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  setLoading: (loadingData) => dispatch(loadingData),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OtherAssetDeleteOverlay);
