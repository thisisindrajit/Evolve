import React, { useEffect, useState } from "react";
import axios from "axios";
import "../form.css";
import { connect } from "react-redux";
import { currency } from "../../Utils/constants";
import Modal from "../Modal/Modal";
import InputHolder from "../InputHolder";

const OtherAssetEditForm = (props) => {
  const [data, setData] = useState({});

  useEffect(() => {
    if (props.editFormData) {
      setData({
        type: "2", //edit bond
        ...props.editFormData,
      });
    }
  }, [props.editFormData]);

  const [error, setError] = useState({ isSet: false, errorDesc: "" });
  const [text, setText] = useState("Edit Asset");

  useEffect(() => {
    if (props.isOpen) {
      setError({ isSet: false, errorDesc: "" });
      setText("Edit Asset");
    }
  }, [props.isOpen]);

  let errorSet = (desc) => {
    setError({ isSet: true, errorDesc: desc });
  };

  let setMaxDate = () => {
    let dtToday = new Date();

    let month = dtToday.getMonth() + 1;
    let day = dtToday.getDate();
    let year = dtToday.getFullYear();

    if (month < 10) month = "0" + month.toString();
    if (day < 10) day = "0" + day.toString();

    let maxDate = year + "-" + month + "-" + day;
    return maxDate;
  };

  let changeData = (e, type) => {
    setData({
      otherAssetTransactionID: data.otherAssetTransactionID,
      type: "2", //edit other asset
      assetType: type === 1 ? e.target.value : data.assetType,
      desc: type === 2 ? e.target.value : data.desc,
      annualReturn: type === 3 ? e.target.value : data.annualReturn,
      purchasePrice: type === 4 ? e.target.value : data.purchasePrice,
      purchaseDate: type === 5 ? e.target.value : data.purchaseDate,
    });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    let decreg = new RegExp("^[0-9]+([.][0-9]*)?$");
    let percentreg = /(^100(\.0{1,})?$)|(^([1-9]([0-9])?|1)(\.[0-9]{1,})?$)/;

    if (data.annualReturn.length > 0 && !percentreg.test(data.annualReturn)) {
      errorSet(
        "Please provide a percentage between 1 and 100 for Expected Annual Return!"
      );
      document.getElementById("custom-modal").scrollIntoView();

      Object.assign(data, { annualReturn: "" });
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

    setText("Editing Asset...");

    const EDIT_ENDPOINT =
      process.env.REACT_APP_API_URL + "/addEditDelOtherAsset.php";

    try {
      let response = await axios.post(EDIT_ENDPOINT, data);

      //there is an error
      if (response.data.error !== undefined) {
        console.log(response.data.error);
        document.getElementById("holder").scrollTo(0, 0);

        // resetting the form
        setData({
          type: "2", //edit other asset
          ...props.editFormData,
        });

        // setting the error
        errorSet(response.data.error);
      } else if (response.status === 200) {
        console.log(response.data);
        props.setLoading({ type: "setLoading", payload: { othersLoading: 1 } });
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal
      open={props.isOpen}
      onClose={
        text === "Edit Asset"
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
            text === "Edit Asset"
              ? () =>
                  props.closeOverlay({
                    type: "setOverlay",
                    payload: { overlay: 0 },
                  })
              : null
          }
          style={{
            background:
              text === "Edit Asset"
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
          Edit <span className="font-bold">Asset</span>
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
              title="Asset type"
              isRequired
              showInfo
              info="Asset type can be something like Real Estate, FD etc."
            >
              <input
                type="text"
                title="Asset Type"
                name="assetType"
                value={data.assetType}
                placeholder="Enter the asset type"
                onChange={(e) => changeData(e, 1)}
                spellCheck="false"
                className="min-w-full sm:w-10/12 my-2 text-black p-4 text-sm md:text-base outline-none"
                required
              />
            </InputHolder>
            <InputHolder
              title="Asset description"
              isRequired
              showInfo
              info="Enter a short description of the asset (e.g. Rental property etc.)"
            >
              <input
                type="text"
                title="Description"
                name="desc"
                value={data.desc}
                placeholder="Enter the description of the asset"
                onChange={(e) => changeData(e, 2)}
                className="min-w-full sm:w-10/12 my-2 text-black p-4 text-sm md:text-base outline-none"
                required
              />
            </InputHolder>
            <InputHolder
              title="Expected annual return (in %)"
              showInfo
              info="If there is no annual return from the asset, you can leave this field blank."
            >
              <input
                type="text"
                title="Annual Return"
                name="annualReturn"
                value={data.annualReturn}
                placeholder="Enter the expected annual return in %"
                onChange={(e) => changeData(e, 3)}
                className="min-w-full sm:w-10/12 my-2 text-black p-4 text-sm md:text-base outline-none"
                spellCheck="false"
              />
            </InputHolder>
            <InputHolder
              title={`Purchase Price of asset (in ${currency})`}
              isRequired
            >
              <input
                type="text"
                title="Purchase Price"
                name="purchasePrice"
                value={data.purchasePrice}
                placeholder={`Enter the purchase price of asset (in ${currency})`}
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
                className="min-w-full sm:w-10/12 my-2 text-black p-4 text-sm md:text-base outline-none"
                required
              />
            </InputHolder>

            {text === "Edit Asset" ? (
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

export default connect(mapStateToProps, mapDispatchToProps)(OtherAssetEditForm);
