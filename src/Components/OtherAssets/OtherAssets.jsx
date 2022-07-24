import React, { useState, useEffect, useRef } from "react";
import "../table.css";
import OtherAssetDeleteOverlay from "./OtherAssetDeleteOverlay";
import axios from "axios";
import { connect } from "react-redux";
import { currency } from "../../Utils/constants";

const OtherAssets = (props) => {
  const isUnMounted = useRef(false);

  const [deleteOverlay, setDeleteOverlay] = useState(-1); //using the deleteOverlay value to store the transaction ID of the other asset to be deleted
  const [assetReturns, setAssetReturns] = useState([]);
  const [totalAssetReturns, setTotalAssetReturns] = useState(0);

  const findTotalPurchasePrice = (others) => {
    if (others.length === 0) {
      return 0;
    }

    //total purchase price variable
    let totalPurchasePrice = 0;

    others.forEach((otherAsset) => {
      totalPurchasePrice += parseFloat(otherAsset.purchase_price);
    });

    return totalPurchasePrice.toFixed(2);
  };

  const convertDateFormat = (date) => {
    date = date.split("-");

    return date[2] + "/" + date[1] + "/" + date[0];
  };

  const fetchotherAssetData = async () => {
    const data = {
      uid: localStorage.getItem("userID"),
      assettype: 4, //to denote other asset
    };

    //fetch other asset data
    const OTHER_ENDPOINT = process.env.REACT_APP_API_URL + "/selectAsset.php";

    try {
      let response = await axios.post(OTHER_ENDPOINT, data);

      if (response.status === 200 && !isUnMounted.current) {
        if (!response.data.msg) {
          //setotherAssetData(response.data);
          const othersData = {
            type: "setothersdetails",
            payload: {
              others: response.data,
              othersPurchasePrice: findTotalPurchasePrice(response.data),
              othersLoading: 0,
              overlay: 0,
            },
          };

          // Dispatcher for setting other asset data
          props.setothersdata(othersData);
        } else {
          const othersData = {
            type: "setothersdetails",
            payload: {
              others: [],
              othersPurchasePrice: 0,
              othersLoading: 0,
              overlay: 0,
            },
          };

          // Dispatcher for setting other asset data
          props.setothersdata(othersData);
        }

        setDeleteOverlay(-1); //for closing the delete overlay on deleting other asset
      } else {
        console.log("Some error occurred!");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getMonthDifference = (startDate, endDate) => {
    const exactMonthDifference =
      startDate.getDate() <= endDate.getDate()
        ? endDate.getMonth() - startDate.getMonth()
        : endDate.getMonth() - startDate.getMonth() - 1;

    return (
      exactMonthDifference +
      12 * (endDate.getFullYear() - startDate.getFullYear())
    );
  };

  const calculateAssetReturn = (purchaseDate, purchasePrice, annualReturn) => {
    const monthDifference = getMonthDifference(
      new Date(purchaseDate),
      new Date()
    );
    return purchasePrice * monthDifference * (annualReturn / 1200);
  };

  useEffect(() => {

    isUnMounted.current = false;
    
    if (props.othersLoading === 1) {
      fetchotherAssetData();
    } else {
      if (props.others.length > 0) {
        let returnsOfAssets = [];
        let totalReturnsFromAssets = 0;

        for (let asset of props.others) {
          if (asset.annual_return !== "0.00") {
            const currentAssetReturn = calculateAssetReturn(
              asset.purchase_date,
              asset.purchase_price,
              asset.annual_return
            );

            returnsOfAssets.push(currentAssetReturn.toFixed(2));
            totalReturnsFromAssets += currentAssetReturn;
          } else {
            returnsOfAssets.push("-");
          }
        }

        setAssetReturns(returnsOfAssets);
        setTotalAssetReturns(totalReturnsFromAssets.toFixed(2));

        // Dispatching the action to set avg return from other assets
        const avgOthersReturnData = {
          type: "setothersdetails",
          payload: {
            othersAvgReturn: totalReturnsFromAssets / props.others.length,
          },
        };

        // Dispatcher for setting data
        props.setothersdata(avgOthersReturnData);
      }
    }

    return () => {
      isUnMounted.current = true;
    };
  }, [props.othersLoading]);

  return (
    <>
      {deleteOverlay !== -1 && (
        <OtherAssetDeleteOverlay
          otherAssettid={deleteOverlay} //this variable stores the transaction id of the otherAsset to be deleted
          setOverlay={setDeleteOverlay}
        />
      )}
      {props.others.length > 0 ? (
        <>
          <table id="main-table">
            <thead>
              <tr className="header">
                <th>Asset type</th>
                <th>Description</th>
                <th>Purchase date</th>
                <th>Purchase price</th>
                <th>Expected annual return</th>
                <th>Approx returns till now</th>
                <th>Status</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {props.others.map((otherAsset, index) => {
                let otherAssetdata = {
                  otherAssetTransactionID:
                    otherAsset.other_assets_transaction_ID,
                  assetType: otherAsset.asset_type,
                  desc: otherAsset.asset_description,
                  annualReturn:
                    otherAsset.annual_return === "0.00"
                      ? ""
                      : otherAsset.annual_return,
                  purchasePrice: otherAsset.purchase_price,
                  purchaseDate: otherAsset.purchase_date,
                };

                return (
                  <tr
                    className="data"
                    key={index}
                    style={{ background: props.gradient }}
                  >
                    <td>{otherAsset.asset_type}</td>
                    <td title={otherAsset.asset_description}>
                      {otherAsset.asset_description}
                    </td>
                    <td>{convertDateFormat(otherAsset.purchase_date)}</td>
                    <td>{currency + otherAsset.purchase_price}</td>
                    <td>
                      {otherAsset.annual_return === "0.00"
                        ? "-"
                        : otherAsset.annual_return + "%"}
                    </td>
                    <td>
                      {assetReturns[index]
                        ? assetReturns[index] !== "-"
                          ? currency + assetReturns[index]
                          : "-"
                        : "..."}
                    </td>
                    <td>Not sold</td>
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
                                editFormData: otherAssetdata,
                                overlay: 8,
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
                            setDeleteOverlay(
                              otherAssetdata.otherAssetTransactionID
                            )
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
                <td>{currency + findTotalPurchasePrice(props.others)}</td>
                <td></td>
                <td>
                  {totalAssetReturns ? (
                    <span
                      className={
                        totalAssetReturns === "0.00"
                          ? "text-yellow-500"
                          : "text-green-500"
                      }
                    >
                      {currency + totalAssetReturns}
                    </span>
                  ) : (
                    "..."
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </>
      ) : props.othersLoading === 1 ? (
        <div className="m-auto mt-8 text-sm md:text-base w-full text-center">
          Loading your assets...
        </div>
      ) : (
        <div className="m--auto mt-8 text-sm md:text-base text-[#fd1c03] w-full text-center">
          No assets added yet!
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
  setothersdata: (othersdata) => dispatch(othersdata),
  openOverlay: (overlaytype) => dispatch(overlaytype),
});

export default connect(mapStateToProps, mapDispatchToProps)(OtherAssets);
