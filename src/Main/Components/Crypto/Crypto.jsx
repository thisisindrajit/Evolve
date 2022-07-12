import React, { useState, useEffect } from "react";
import "../table.css";
import CryptoDeleteOverlay from "./CryptoDeleteOverlay";
import axios from "axios";
import { connect } from "react-redux";
import { currency } from "../../../Utils/constants";

const Crypto = (props) => {
  let isunmounted = false;

  let [deleteOverlay, setDeleteOverlay] = useState(-1); //using the deleteOverlay value to store the transaction ID of the crypto to be deleted

  let findTotalPurchasePrice = (cryptos) => {
    if (cryptos.length === 0) {
      return 0;
    }

    //total purchase price variable
    let totalPurchasePrice = 0;

    cryptos.map((crypto) => {
      totalPurchasePrice += parseFloat(crypto.purchase_price) * crypto.quantity;
    });

    return totalPurchasePrice.toFixed(2);
  };

  let convertDateFormat = (date) => {
    date = date.split("-");

    return date[2] + "/" + date[1] + "/" + date[0];
  };

  let fetchcryptoData = async () => {
    const data = {
      uid: localStorage.getItem("userID"),
      assettype: 2, //to denote crypto
    };

    //fetch crypto data
    const CRYPTO_ENDPOINT = process.env.REACT_APP_API_URL + "/selectAsset.php";

    try {
      let response = await axios.post(CRYPTO_ENDPOINT, data);

      if (response.status === 200 && !isunmounted) {
        if (!response.data.msg) {
          const cryptoData = {
            type: "setcryptodetails",
            payload: {
              crypto: response.data,
              cryptoPurchasePrice: findTotalPurchasePrice(response.data),
              cryptoLoading: 0,
              overlay: 0,
            },
          };

          // Dispatcher for setting crypto data
          props.setcryptodata(cryptoData);
        } else {
          const cryptoData = {
            type: "setcryptodetails",
            payload: {
              crypto: [],
              cryptoPurchasePrice: 0,
              cryptoLoading: 0,
              overlay: 0,
            },
          };

          // Dispatcher for setting crypto data
          props.setcryptodata(cryptoData);
        }

        setDeleteOverlay(-1); //for closing the delete overlay on deleting crypto
      } else {
        console.log("Some error occurred!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (props.cryptoLoading === 1) {
      fetchcryptoData();
    }

    return () => {
      isunmounted = true;
    };
  }, [props.cryptoLoading]);

  return (
    <>
      {deleteOverlay !== -1 && (
        <CryptoDeleteOverlay
          cryptotid={deleteOverlay} //this variable stores the transaction id of the crypto to be deleted
          setOverlay={setDeleteOverlay}
        />
      )}
      {props.crypto.length > 0 ? (
        <>
          <table id="main-table">
            <thead>
              <tr className="header">
                <th>Symbol</th>
                <th>Description</th>
                <th>Purchase Date</th>
                <th>Quantity</th>
                <th>Purchase Price</th>
                <th>Current Price</th>
                <th>Total Gain/Loss</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {props.crypto.map((crypto, index) => {
                let cryptoData = {
                  cryptoTransactionID: crypto.crypto_transaction_ID,
                  symbol: crypto.symbol,
                  desc: crypto.crypto_description,
                  quantity: crypto.quantity,
                  purchasePrice: crypto.purchase_price,
                  purchaseDate: crypto.purchase_date,
                };

                return (
                  <tr
                    className="data"
                    key={index}
                    style={{ background: props.gradient }}
                  >
                    <td>{crypto.symbol}</td>
                    <td title={crypto.crypto_description}>
                      {crypto.crypto_description}
                    </td>
                    <td>{convertDateFormat(crypto.purchase_date)}</td>
                    <td>{crypto.quantity}</td>
                    <td>{currency + crypto.purchase_price}</td>
                    <td></td>
                    <td></td>
                    <td>
                      <div className="flex items-center gap-4">
                        {/*Edit icon*/}
                        <svg
                          className="cursor-pointer"
                          width="24"
                          height="24"
                          onClick={() =>
                            props.openOverlay({
                              type: "setOverlay",
                              payload: {
                                editFormData: cryptoData,
                                overlay: 4,
                              },
                            })
                          }
                          viewBox="0 0 40 40"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M22.8328 33.1635H33.4611"
                            stroke="white"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M21.4249 8.25949C22.6533 6.69449 24.6383 6.77616 26.2049 8.00449L28.5216 9.82116C30.0883 11.0495 30.6433 12.9545 29.4149 14.5228L15.5999 32.1478C15.1383 32.7378 14.4333 33.0862 13.6833 33.0945L8.35493 33.1628L7.14827 27.9712C6.97827 27.2428 7.14827 26.4762 7.60993 25.8845L21.4249 8.25949Z"
                            stroke="white"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M18.8379 11.5602L26.8279 17.8235"
                            stroke="white"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>

                        {/*Delete icon*/}
                        <svg
                          className="cursor-pointer"
                          height="22"
                          width="22"
                          onClick={() =>
                            setDeleteOverlay(cryptoData.cryptoTransactionID)
                          }
                          viewBox="0 0 38 38"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M28.1823 13.8078C28.1823 13.8078 27.3904 23.6297 26.931 27.767C26.7123 29.743 25.4916 30.9009 23.4923 30.9374C19.6875 31.0059 15.8783 31.0103 12.075 30.9301C10.1514 30.8907 8.95123 29.7182 8.73685 27.7772C8.27456 23.6034 7.48706 13.8078 7.48706 13.8078"
                            stroke="white"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M30.1994 9.09957H5.46899"
                            stroke="white"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M25.4341 9.09957C24.2893 9.09957 23.3035 8.29019 23.0789 7.16874L22.7245 5.3954C22.5058 4.57728 21.7649 4.01144 20.9206 4.01144H14.7474C13.9031 4.01144 13.1622 4.57728 12.9435 5.3954L12.5891 7.16874C12.3645 8.29019 11.3787 9.09957 10.2339 9.09957"
                            stroke="white"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </td>
                  </tr>
                );
              })}

              <tr className="total">
                <td></td>
                <td>TOTAL</td>
                <td></td>
                <td></td>
                <td>{currency + findTotalPurchasePrice(props.crypto)}</td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </>
      ) : props.cryptoLoading === 1 ? (
        <div className="m-auto mt-8 text-sm md:text-base w-full text-center">
          Loading your crypto currencies...
        </div>
      ) : (
        <div className="m-auto mt-8 text-sm md:text-base text-[#fd1c03] w-full text-center">
          No crypto currencies added yet!
        </div>
      )}
    </>
  );
};

// these are the functions which are required to map the state to the props and dispatch actions to store

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  setcryptodata: (cryptodata) => dispatch(cryptodata),
  openOverlay: (overlaytype) => dispatch(overlaytype),
});

export default connect(mapStateToProps, mapDispatchToProps)(Crypto);
