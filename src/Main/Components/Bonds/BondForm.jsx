import React, { useState } from "react";
import axios from "axios";
import "../form.css";
import { connect } from "react-redux";



const BondForm = (props) => {

  const [data, setData] = useState({
    uid: localStorage.getItem("userID"),
    type: "1",
    bondtype: "Corporate",
    desc: "",
    faceValue: "",
    couponRate: "",
    yearsToMaturity: "",
    paymentInterval: "Annual",
    purchaseDate: ""
  }); //type 1 is to denote to add bond to DB
  const [error, setError] = useState({ isSet: false, errorDesc: "" });
  const [text, setText] = useState("Add Bond");

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
      bondtype: type === 1 ? e.target.value : data.bondtype,
      desc: type === 2 ? e.target.value : data.desc,
      faceValue: type === 3 ? e.target.value : data.faceValue,
      couponRate: type === 4 ? e.target.value : data.couponRate,
      yearsToMaturity: type === 5 ? e.target.value : data.yearsToMaturity,
      paymentInterval: type === 6 ? e.target.value : data.paymentInterval,
      purchaseDate: type === 7 ? e.target.value : data.purchaseDate
    });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    //TO DO - Validation
    var decreg = new RegExp("^[0-9]+$|^[0-9]+.[0-9]+$");
    var percentreg = /(^100(\.0{1,})?$)|(^([1-9]([0-9])?|1)(\.[0-9]{1,})?$)/;

    if (!decreg.test(data.faceValue)) {
      errorSet("Please provide number input only for face value!");
      document.getElementById("custom-form").scrollTo(0, 0);
      Object.assign(data, { faceValue: "" });
      return;
    }

    if (!percentreg.test(data.couponRate)) {
      errorSet("Please provide a percentage value between 1 and 100 as input for coupon rate!");
      document.getElementById("custom-form").scrollTo(0, 0);
      Object.assign(data, { couponRate: "" });
      return;
    }


    if (!percentreg.test(data.yearsToMaturity)) {
      errorSet("Please provide a value between 1 and 100 as input for years to maturity!");
      document.getElementById("custom-form").scrollTo(0, 0);
      Object.assign(data, { yearsToMaturity: "" });
      return;
    }

    setText("Adding...");

    // const ADD_ENDPOINT = "http://localhost:80/evolve/addEditDelBond.php";
    const ADD_ENDPOINT = process.env.REACT_APP_API_URL + "/addEditDelBond.php";
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
          uid: localStorage.getItem("userID"),
          type: "1",
          bondtype: "Corporate",
          desc: "",
          faceValue: "",
          couponRate: "",
          yearsToMaturity: "",
          paymentInterval: "Annual",
          purchaseDate: ""
        });

        //setting the error
        errorSet(response.data.error);
      } else if (response.status === 200) {
        console.log(response.data);
        props.setLoading({type:"setLoading", payload:{bondLoading:1}})
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
          onClick={text === "Add Bond" ? () => props.closeOverlay({type:"setOverlay", payload:{overlay:0}}) : null}
          style={{ background: text === "Add Bond" ? "linear-gradient(180deg, #d11e4b 0%, #ce2331 100%)" : "linear-gradient(180deg, #555 0%, #666 100%)" }}
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
          <span className="form-title">Add Bond</span>
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

              <select className="selectbox" name="bondtype" value={data.bondtype} onChange={(e) => changeData(e, 1)} required>
                <option value="Corporate">Corporate</option>
                <option value="Municipal">Municipal</option>
                <option value="Government">Government</option>
                <option value="Agency">Agency</option>
                <option value="Other">Other</option>
              </select>

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
                title="Face Value"
                name="faceValue"
                value={data.faceValue}
                placeholder="Face Value in ₹ (Required)"
                onChange={(e) => changeData(e, 3)}
                required
              />

              <input
                type="text"
                title="Coupon Rate"
                name="couponRate"
                value={data.couponRate}
                placeholder="Coupon Rate in % (Required)"
                onChange={(e) => changeData(e, 4)}
                required
              />

              <input
                type="text"
                title="Years to Maturity"
                name="yearsToMaturity"
                value={data.yearsToMaturity}
                placeholder="Years to Maturity (Required)"
                onChange={(e) => changeData(e, 5)}
                required
              />

              <select className="selectbox" name="paymentInterval" value={data.paymentInterval} onChange={(e) => changeData(e, 6)} required>
                <option value="Annual">Annual</option>
                <option value="Semi Annual">Semi Annual</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Monthly">Monthly</option>
              </select>

              <input
                type="date"
                title="Purchase Date"
                name="purchaseDate"
                max={setMaxDate()}
                value={data.purchaseDate}
                placeholder="Purchase Date (Required in the form DD/MM/YYYY)"
                onChange={(e) => changeData(e, 7)}
                required
              />


              {text === "Add Bond" ? <button type="submit">{text}</button> : <span id="status">Adding...</span>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

// these are the functions which are required to map the state to the props and dispatch actions to store
const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  closeOverlay: (overlaytype) => dispatch(overlaytype),
  setLoading: (loadingData) => dispatch(loadingData)
});

export default connect(mapStateToProps, mapDispatchToProps)(BondForm);
