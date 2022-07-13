import React, { useState } from "react";
import axios from "axios";
import "../form.css";
import { connect } from "react-redux";


const OtherAssetForm = (props) => {
  const [data, setData] = useState({
    uid: localStorage.getItem("userID"),
    type: "1",
    assetType: "",
    desc: "",
    annualReturn: "",
    purchasePrice: "",
    purchaseDate: "",
  }); //type 1 is to denote to add other asset to DB
  const [error, setError] = useState({ isSet: false, errorDesc: "" });
  const [text, setText] = useState("Add Asset");

  let errorSet = (desc) => {
    setError({ isSet: true, errorDesc: desc });
  };

  let setMaxDate = () => {
    var dtToday = new Date();

    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();

    if (month < 10) month = "0" + month.toString();
    if (day < 10) day = "0" + day.toString();

    var maxDate = year + "-" + month + "-" + day;
    return maxDate;
  };

  let changeData = (e, type) => {
    setData({
      uid: data.uid,
      type: "1",
      assetType: type === 1 ? e.target.value : data.assetType,
      desc: type === 2 ? e.target.value : data.desc,
      annualReturn: type === 3 ? e.target.value : data.annualReturn,
      purchasePrice: type === 4 ? e.target.value : data.purchasePrice,
      purchaseDate: type === 5 ? e.target.value : data.purchaseDate,
    });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    //TO DO - Validation

    var decreg = new RegExp("^[0-9]+$|^[0-9]+.[0-9]+$");
    var percentreg = /(^100(\.0{1,})?$)|(^([1-9]([0-9])?|1)(\.[0-9]{1,})?$)/;

    if (data.annualReturn.length > 0 && !percentreg.test(data.annualReturn)) {
      errorSet(
        "Please provide a percentage between 1 and 100 for Expected Annual Return!"
      );
            document.getElementById("custom-modal").scrollIntoView();

      Object.assign(data, { annualReturn: "" });
      return;
    }

    if (!decreg.test(data.purchasePrice)) {
      errorSet("Please provide number input only for purchase price!");
            document.getElementById("custom-modal").scrollIntoView();

      Object.assign(data, { purchasePrice: "" });
      return;
    }

    setText("Adding...");

    const ADD_ENDPOINT = process.env.REACT_APP_API_URL + "/addEditDelOtherAsset.php";
    //console.log(data);

    try {
      let response = await axios.post(ADD_ENDPOINT, data);
      //console.log(response);

      //there is an error
      if (response.data.error !== undefined) {
        console.log(response.data.error);
        document.getElementById("holder").scrollTo(0, 0);

        //resetting the form
        setData({
          uid: data.uid,
          type: "1",
          assetType: "",
          desc: "",
          annualReturn: "",
          purchasePrice: "",
          purchaseDate: "",
        });

        //setting the error
        errorSet(response.data.error);
      } else if (response.status === 200) {
        console.log(response.data);
        props.setLoading({ type: "setLoading", payload: { othersLoading: 1 } });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div id="box">
        <svg
          id="close"
          onClick={
            text === "Add Asset"
              ? () =>
                  props.closeOverlay({
                    type: "setOverlay",
                    payload: { overlay: 0 },
                  })
              : null
          }
          style={{
            background:
              text === "Add Asset"
                ? "linear-gradient(180deg, #d11e4b 0%, #ce2331 100%)"
                : "linear-gradient(180deg, #555 0%, #666 100%)",
          }}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.25 12.2743L19.25 12.2743"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.2998 18.2987L4.2498 12.2747L10.2998 6.24969"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div id="form-holder">
          <span className="form-title">Add Asset</span>
          {/*Vertical line*/}

          <div
            style={{
              height: "0.5px",
              backgroundColor: "#14CCCC",
              width: "85%",
              margin: "25px",
            }}
          ></div>

          <div id="form-content" style={{ borderLeft: props.border }}>
            <form onSubmit={(e) => handleSubmit(e)}>
              {/*error box*/}
              {error.isSet && <div id="error">{error.errorDesc}</div>}

              <input
                type="text"
                title="Asset Type"
                name="assetType"
                value={data.assetType}
                placeholder="Asset Type (Required)"
                onChange={(e) => changeData(e, 1)}
                spellCheck="false"
                required
              />
              <input
                type="text"
                title="Description"
                name="desc"
                value={data.desc}
                placeholder="Description (Required)"
                onChange={(e) => changeData(e, 2)}
                required
              />

              <input
                type="text"
                title="Annual Return"
                name="annualReturn"
                value={data.annualReturn}
                placeholder="Expected Annual Return"
                onChange={(e) => changeData(e, 3)}
                spellCheck="false"
              />

              <input
                type="text"
                title="Purchase Price"
                name="purchasePrice"
                value={data.purchasePrice}
                placeholder="Purchase Price in ₹ (Required)"
                onChange={(e) => changeData(e, 4)}
                required
              />
              <input
                type="date"
                title="Purchase Date"
                name="purchaseDate"
                max={setMaxDate()}
                value={data.purchaseDate}
                placeholder="Purchase Date (Required in the form DD/MM/YYYY)"
                onChange={(e) => changeData(e, 5)}
                required
              />

              {text === "Add Asset" ? (
                <button type="submit">{text}</button>
              ) : (
                <span id="status">Adding...</span>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

// these are the functions which are required to map the state to the props and dispatch actions to store
const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  closeOverlay: (overlaytype) => dispatch(overlaytype),
  setLoading: (loadingData) => dispatch(loadingData),
});

export default connect(mapStateToProps, mapDispatchToProps)(OtherAssetForm);
