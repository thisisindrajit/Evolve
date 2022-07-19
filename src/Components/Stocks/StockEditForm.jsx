import React, { useEffect, useState } from "react";
import axios from "axios";
import "../form.css";
import { connect } from "react-redux";
import Modal from "../Modal/Modal";
import InputHolder from "../InputHolder";
import { currency } from "../../Utils/constants";

const StockEditForm = (props) => {
  const [data, setData] = useState({});

  useEffect(() => {
    if (props.editFormData) {
      setData({
        type: "2", //edit stock
        ...props.editFormData,
      });
    }
  }, [props.editFormData]);

  const [error, setError] = useState({ isSet: false, errorDesc: "" });
  const [text, setText] = useState("Edit Stock");

  useEffect(() => {
    if (props.isOpen) {
      setError({ isSet: false, errorDesc: "" });
      setText("Edit Stock");
    }
  }, [props.isOpen]);

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
      stockTransactionID: data.stockTransactionID,
      type: "2", //edit stock
      symbol: type === 1 ? e.target.value : data.symbol,
      desc: type === 2 ? e.target.value : data.desc,
      quantity: type === 3 ? e.target.value : data.quantity,
      purchasePrice: type === 4 ? e.target.value : data.purchasePrice,
      purchaseDate: type === 5 ? e.target.value : data.purchaseDate,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let numreg = new RegExp("^[0-9]+$");
    let decreg = new RegExp("^[0-9]+([.][0-9]*)?$");

    if (!numreg.test(data.quantity)) {
      errorSet(
        "Please provide number input only for quantity! Please remove any commas if you have used them."
      );
      document.getElementById("custom-modal").scrollIntoView();

      Object.assign(data, { quantity: "" });
      return;
    }

    if (!decreg.test(data.purchasePrice)) {
      errorSet(
        "Please provide number input only for purchase price! Please remove any commas if you have used them."
      );
      document.getElementById("custom-modal").scrollIntoView();

      Object.assign(data, { purchasePrice: "" });
      return;
    }

    setText("Checking stock symbol...");

    const CHECK_SYMBOL_ENDPOINT =
      process.env.REACT_APP_NODE_API_URL +
      "/checkIfSymbolExists/" +
      data.symbol.toUpperCase();

    const symbolResponse = await axios.get(CHECK_SYMBOL_ENDPOINT, {
      validateStatus: false,
    });

    if (symbolResponse.status !== 200) {
      errorSet("Stock symbol does not exist! Please try with another symbol!");
      setText("Edit Stock");
      document.getElementById("custom-modal").scrollIntoView();
      return;
    }

    setText("Editing Stock...");

    const EDIT_ENDPOINT =
      process.env.REACT_APP_API_URL + "/addEditDelStock.php";

    try {
      let response = await axios.post(
        EDIT_ENDPOINT,
        Object.assign(data, { symbol: data.symbol.toUpperCase() })
      );

      //there is an error
      if (response.data.error !== undefined) {
        console.log(response.data.error);
        document.getElementById("holder").scrollTo(0, 0);

        //resetting the form
        setData({
          type: "2", //edit stock
          ...props.editFormData,
        });

        //setting the error
        errorSet(response.data.error);
      } else if (response.status === 200) {
        console.log(response.data);
        props.setLoading({ type: "setLoading", payload: { stockLoading: 1 } });
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal
      open={props.isOpen}
      onClose={
        text === "Edit Stock"
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
            text === "Edit Stock"
              ? () =>
                  props.closeOverlay({
                    type: "setOverlay",
                    payload: { overlay: 0 },
                  })
              : null
          }
          style={{
            background:
              text === "Edit Stock"
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
          Edit <span className="font-bold">Stock</span>
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

            <InputHolder
              title="Stock Symbol"
              isRequired
              showInfo
              info="Enter the stock's ticker symbol exactly as present in Yahoo finance website."
            >
              <input
                type="text"
                title="Symbol"
                name="symbol"
                value={data.symbol}
                placeholder="Enter the stock's ticker symbol"
                onChange={(e) => changeData(e, 1)}
                spellCheck="false"
                className="min-w-full sm:w-10/12 my-2 text-black p-4 text-sm md:text-base outline-none"
                required
              />
            </InputHolder>

            <InputHolder
              title="Description"
              isRequired
              showInfo
              info="Enter a short description of the stock (e.g. Apple Inc.)"
            >
              <input
                type="text"
                title="Description"
                name="desc"
                value={data.desc}
                placeholder="Enter description of stock"
                onChange={(e) => changeData(e, 2)}
                className="min-w-full sm:w-10/12 my-2 text-black p-4 text-sm md:text-base outline-none"
                required
              />
            </InputHolder>

            <InputHolder title="Quantity" isRequired>
              <input
                type="text"
                title="Quantity"
                name="quantity"
                value={data.quantity}
                placeholder="Enter quantity of stocks bought"
                onChange={(e) => changeData(e, 3)}
                spellCheck="false"
                className="min-w-full sm:w-10/12 my-2 text-black p-4 text-sm md:text-base outline-none"
                required
              />
            </InputHolder>

            <InputHolder
              title={`Purchase Price of one unit (in ${currency})`}
              isRequired
            >
              <input
                type="text"
                title="Purchase Price"
                name="purchasePrice"
                value={data.purchasePrice}
                placeholder={`Enter purchase price of one unit`}
                onChange={(e) => changeData(e, 4)}
                className="min-w-full sm:w-10/12 my-2 text-black p-4 text-sm md:text-base outline-none"
                required
              />
            </InputHolder>
            <InputHolder title="Purchase Date" isRequired>
              <input
                type="date"
                title="Purchase Date"
                name="purchaseDate"
                max={setMaxDate()}
                value={data.purchaseDate}
                onChange={(e) => changeData(e, 5)}
                className="min-w-full sm:w-10/12 my-2 text-black p-4 text-sm md:text-base outline-none date-input"
                required
              />
            </InputHolder>

            {text === "Edit Stock" ? (
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

export default connect(mapStateToProps, mapDispatchToProps)(StockEditForm);
