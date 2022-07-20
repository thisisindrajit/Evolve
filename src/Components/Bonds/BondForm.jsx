import React, { useEffect, useState } from "react";
import axios from "axios";
import "../form.css";
import { connect } from "react-redux";
import InputHolder from "../InputHolder";
import Modal from "../Modal/Modal";
import { currency } from "../../Utils/constants";

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
    purchaseDate: "",
  }); //type 1 is to denote to add bond to DB
  const [error, setError] = useState({ isSet: false, errorDesc: "" });
  const [text, setText] = useState("Add Bond");

  useEffect(() => {
    if (props.isOpen) {
      setData({
        uid: data.uid,
        type: "1",
        bondtype: "Corporate",
        desc: "",
        faceValue: "",
        couponRate: "",
        yearsToMaturity: "",
        paymentInterval: "Annual",
        purchaseDate: "",
      });

      setError({ isSet: false, errorDesc: "" });

      setText("Add Bond");
    }
  }, [props.isOpen, data.uid]);

  const errorSet = (desc) => {
    setError({ isSet: true, errorDesc: desc });
  };

  const setMaxDate = () => {
    let dtToday = new Date();

    let month = dtToday.getMonth() + 1;
    let day = dtToday.getDate();
    let year = dtToday.getFullYear();

    if (month < 10) month = "0" + month.toString();
    if (day < 10) day = "0" + day.toString();

    let maxDate = year + "-" + month + "-" + day;
    return maxDate;
  };

  const changeData = (e, type) => {
    setData({
      uid: data.uid,
      type: "1",
      bondtype: type === 1 ? e.target.value : data.bondtype,
      desc: type === 2 ? e.target.value : data.desc,
      faceValue: type === 3 ? e.target.value : data.faceValue,
      couponRate: type === 4 ? e.target.value : data.couponRate,
      yearsToMaturity: type === 5 ? e.target.value : data.yearsToMaturity,
      paymentInterval: type === 6 ? e.target.value : data.paymentInterval,
      purchaseDate: type === 7 ? e.target.value : data.purchaseDate,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let decreg = new RegExp("^[0-9]+([.][0-9]*)?$");
    let percentreg = /(^100(\.0{1,})?$)|(^([1-9]([0-9])?|1)(\.[0-9]{1,})?$)/;

    if (!decreg.test(data.faceValue)) {
      errorSet(
        "Please provide number input only for face value! Please remove any commas if you have used them."
      );
      document.getElementById("custom-modal").scrollIntoView();
      Object.assign(data, { faceValue: "" });
      return;
    }

    if (!percentreg.test(data.couponRate)) {
      errorSet(
        "Please provide a percentage value between 1 and 100 as input for coupon rate!"
      );
      document.getElementById("custom-modal").scrollIntoView();

      Object.assign(data, { couponRate: "" });
      return;
    }

    if (!percentreg.test(data.yearsToMaturity)) {
      errorSet(
        "Please provide a value between 1 and 100 as input for years to maturity!"
      );
      document.getElementById("custom-modal").scrollIntoView();

      Object.assign(data, { yearsToMaturity: "" });
      return;
    }

    setText("Adding Bond...");

    const ADD_ENDPOINT = process.env.REACT_APP_API_URL + "/addEditDelBond.php";

    try {
      let response = await axios.post(ADD_ENDPOINT, data);

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
          purchaseDate: "",
        });

        //setting the error
        errorSet(response.data.error);
      } else if (response.status === 200) {
        console.log(response.data);
        props.setLoading({ type: "setLoading", payload: { bondLoading: 1 } });
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal
      open={props.isOpen}
      onClose={
        text === "Add Bond"
          ? () =>
              props.closeOverlay({
                type: "setOverlay",
                payload: { overlay: 0 },
              })
          : () => {}
      }
    >
      <div className="flex gap-2 md:gap-4 items-center">
        <svg
          className="bg-red-500 p-2 rounded-lg cursor-pointer h-9 w-9 md:h-10 md:w-10"
          onClick={
            text === "Add Bond"
              ? () =>
                  props.closeOverlay({
                    type: "setOverlay",
                    payload: { overlay: 0 },
                  })
              : null
          }
          style={{
            background:
              text === "Add Bond"
                ? "linear-gradient(180deg, #d11e4b 0%, #ce2331 100%)"
                : "linear-gradient(180deg, #555 0%, #666 100%)",
          }}
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
        <div className="text-base md:text-xl">
          Add <span className="font-bold">Bond</span>
        </div>
      </div>
      {/*Vertical line*/}
      <div className="w-full h-px bg-evolve-green my-4 md:my-6"></div>
      <div className="flex flex-col w-full md:w-10/12 m-auto md:my-4">
        <div>
          <form
            className="flex flex-col items-center justify-center"
            onSubmit={(e) => handleSubmit(e)}
          >
            {/*error box*/}
            {error.isSet && (
              <div className="border-2 border-red-500 text-white p-2 w-full sm:w-10/12 text-center my-2 md:text-base text-sm">
                {error.errorDesc}
              </div>
            )}

            <InputHolder title="Bond type" isRequired>
              <select
                className="min-w-full sm:w-10/12 my-2 text-black p-4 text-sm md:text-base outline-none"
                name="bondtype"
                value={data.bondtype}
                onChange={(e) => changeData(e, 1)}
                required
              >
                <option value="Corporate">Corporate</option>
                <option value="Municipal">Municipal</option>
                <option value="Government">Government</option>
                <option value="Agency">Agency</option>
                <option value="Other">Other</option>
              </select>
            </InputHolder>

            <InputHolder
              title="Bond description"
              isRequired
              showInfo
              info="Enter a short description of the bond (e.g. Gold bond)"
            >
              <input
                type="text"
                title="Description"
                name="desc"
                value={data.desc}
                placeholder="Description of the bond"
                onChange={(e) => changeData(e, 2)}
                className="min-w-full sm:w-10/12 my-2 text-black p-4 text-sm md:text-base outline-none"
                required
              />
            </InputHolder>

            <InputHolder title={`Face value (in ${currency})`} isRequired>
              <input
                type="text"
                title="Face Value"
                name="faceValue"
                value={data.faceValue}
                placeholder={`Enter face value in ${currency}`}
                onChange={(e) => changeData(e, 3)}
                className="min-w-full sm:w-10/12 my-2 text-black p-4 text-sm md:text-base outline-none"
                required
              />
            </InputHolder>

            <InputHolder title="Coupon rate (in %)" isRequired>
              <input
                type="text"
                title="Coupon Rate"
                name="couponRate"
                value={data.couponRate}
                placeholder="Enter coupon rate in %"
                onChange={(e) => changeData(e, 4)}
                className="min-w-full sm:w-10/12 my-2 text-black p-4 text-sm md:text-base outline-none"
                required
              />
            </InputHolder>

            <InputHolder title="Years to Maturity" isRequired>
              <input
                type="text"
                title="Years to Maturity"
                name="yearsToMaturity"
                value={data.yearsToMaturity}
                placeholder="Enter the years to maturity"
                onChange={(e) => changeData(e, 5)}
                className="min-w-full sm:w-10/12 my-2 text-black p-4 text-sm md:text-base outline-none"
                required
              />
            </InputHolder>

            <InputHolder title="Payment Interval" isRequired>
              <select
                className="min-w-full sm:w-10/12 my-2 text-black p-4 text-sm md:text-base outline-none"
                name="paymentInterval"
                value={data.paymentInterval}
                onChange={(e) => changeData(e, 6)}
                required
              >
                <option value="Annual">Annual</option>
                <option value="Semi Annual">Semi Annual</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </InputHolder>

            <InputHolder title="Purchase Date" isRequired>
              <input
                type="date"
                title="Purchase Date"
                name="purchaseDate"
                max={setMaxDate()}
                value={data.purchaseDate}
                onChange={(e) => changeData(e, 7)}
                className="min-w-full sm:w-10/12 my-2 text-black p-4 text-sm md:text-base outline-none date-input"
                required
              />
            </InputHolder>

            {text === "Add Bond" ? (
              <button className="w-full sm:w-10/12">
                <div className="border-2 border-white p-4 font-bold my-2 hover:text-white hover:bg-evolve-green hover:border-evolve-green transition-all text-sm uppercase">
                  {text}
                </div>
              </button>
            ) : (
              <div className="w-full sm:w-10/12 text-center border-2 border-gray-300 p-4 font-bold my-2 text-gray-300 transition-all text-sm uppercase">
                {text}
              </div>
            )}
          </form>
        </div>
      </div>
    </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(BondForm);
