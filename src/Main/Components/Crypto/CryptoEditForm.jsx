import React, { useState } from "react";
import axios from "axios";
import "../form.css";
import { connect } from "react-redux";


const CryptoEditForm = (props) => {
  const [data, setData] = useState({
    type: "2", //edit Crypto
    ...props.editFormData,
  });

  const [error, setError] = useState({ isSet: false, errorDesc: "" });
  const [text, setText] = useState("Edit Crypto");

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
      cryptoTransactionID: data.cryptoTransactionID,
      type: "2", //edit crypto
      symbol: type === 1 ? e.target.value : data.symbol,
      desc: type === 2 ? e.target.value : data.desc,
      quantity: type === 3 ? e.target.value : data.quantity,
      purchasePrice: type === 4 ? e.target.value : data.purchasePrice,
      purchaseDate: type === 5 ? e.target.value : data.purchaseDate,
    });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    //TO DO - Validate quantity, purchase Price is given as numbers, purchaseDate given in required format
    var numreg = new RegExp("^[0-9]+$");
    var decreg = new RegExp("^[0-9]+$|^[0-9]+.[0-9]+$");

    if (!numreg.test(data.quantity)) {
      errorSet("Please provide number input only for quantity!");
      document.getElementById("form-content").scrollTo(0, 0);
      Object.assign(data, { quantity: "" });
      return;
    }

    if (!decreg.test(data.purchasePrice)) {
      errorSet("Please provide number input only for purchase price!");
      document.getElementById("form-content").scrollTo(0, 0);
      Object.assign(data, { purchasePrice: "" });
      return;
    }

    setText("Editing...");

    // const EDIT_ENDPOINT = "http://localhost:80/evolve/addEditDelcrypto.php";
    const EDIT_ENDPOINT = process.env.REACT_APP_API_URL + "/addEditDelcrypto.php";
    //console.log(data);

    try {
      let response = await axios.post(
        EDIT_ENDPOINT,
        Object.assign(data, { symbol: data.symbol.toUpperCase() })
      );
      //console.log(response);

      //there is an error
      if (response.data.error !== undefined) {
        console.log(response.data.error);
        document.getElementById("holder").scrollTo(0, 0);

        //resetting the form
        setData({
          type: "2", //edit crypto
          ...props.editFormData,
        });

        //setting the error
        errorSet(response.data.error);
      } else if (response.status === 200) {
        console.log(response.data);
        props.setLoading({ type: "setLoading", payload: { cryptoLoading: 1 } });
        // props.overlayhandle(0);
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
            text === "Edit Crypto"
              ? () =>
                  props.closeOverlay({
                    type: "setOverlay",
                    payload: { overlay: 0 },
                  })
              : null
          }
          style={{
            background:
              text === "Edit Crypto"
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
          <span className="form-title">Edit Crypto</span>
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
                title="Symbol"
                name="symbol"
                value={data.symbol}
                placeholder="Ticker Symbol (Required in caps)"
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
                title="Quantity"
                name="quantity"
                value={data.quantity}
                placeholder="Quantity (Required)"
                onChange={(e) => changeData(e, 3)}
                spellCheck="false"
                required
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

              {text === "Edit Crypto" ? (
                <button type="submit">{text}</button>
              ) : (
                <span id="status">Editing...</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(CryptoEditForm);
