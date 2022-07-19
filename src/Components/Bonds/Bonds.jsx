import React, { useState, useEffect } from "react";
import "../table.css";
import BondDeleteOverlay from "./BondDeleteOverlay";
import axios from "axios";
import { connect } from "react-redux";
import { currency } from "../../Utils/constants";

const Bonds = (props) => {
  let isunmounted = false;

  const [deleteOverlay, setDeleteOverlay] = useState(-1); //using the deleteOverlay value to store the transaction ID of the bond to be deleted

  const findTotalFaceValue = (bonds) => {
    if (bonds.length === 0) {
      return 0;
    }

    //total purchase price variable
    let totalPurchasePrice = 0;

    bonds.map((bond) => {
      totalPurchasePrice += parseFloat(bond.face_value);
    });

    return totalPurchasePrice.toFixed(2);
  };

  const convertDateFormat = (date) => {
    date = date.split("-");

    return date[2] + "/" + date[1] + "/" + date[0];
  };

  const getMonthDifference = (startDate, endDate) => {
    return (
      endDate.getMonth() -
      startDate.getMonth() +
      12 * (endDate.getFullYear() - startDate.getFullYear())
    );
  };

  const getYearDifference = (startDate, endDate) => {
    return endDate.getFullYear() - startDate.getFullYear();
  };

  const checkIfBondIsMatured = (bondPurchaseDate, yearsToMaturity) => {
    const pDate = new Date(bondPurchaseDate);
    const today = new Date();

    const condition1 = getYearDifference(pDate, today) >= yearsToMaturity;

    const condition2 =
      pDate.getMonth() <= today.getMonth() &&
      pDate.getDate() <= today.getDate();

    return condition1 && condition2;
  };

  const calculateTotalInterestPaid = (
    bondPurchaseDate,
    faceValue,
    couponRate,
    interval
  ) => {
    const monthDiff = getMonthDifference(
      new Date(bondPurchaseDate),
      new Date()
    );
    const interestAmt = faceValue * (couponRate / 100);

    switch (interval) {
      case "Annual":
        return Math.floor(monthDiff / 12) > 0
          ? interestAmt * Math.floor(monthDiff / 12)
          : 0;

      case "Semi Annual":
        return Math.floor(monthDiff / 6) > 0
          ? interestAmt * Math.floor(monthDiff / 6)
          : 0;

      case "Quarterly":
        return Math.floor(monthDiff / 4) > 0
          ? interestAmt * Math.floor(monthDiff / 4)
          : 0;

      case "Monthly":
        return monthDiff > 0 ? interestAmt * monthDiff : 0;

      default:
        return 0;
    }
  };

  const fetchBondData = async () => {
    const data = {
      uid: localStorage.getItem("userID"),
      assettype: 3, //to denote bond
    };

    //fetch bond data
    const BOND_ENDPOINT = process.env.REACT_APP_API_URL + "/selectAsset.php";

    try {
      let response = await axios.post(BOND_ENDPOINT, data);

      if (response.status === 200 && !isunmounted) {
        if (!response.data.msg) {
          //setBondData(response.data);
          const bondData = {
            type: "setbonddetails",
            payload: {
              bonds: response.data,
              bondPurchasePrice: findTotalFaceValue(response.data),
              bondLoading: 0,
              overlay: 0,
            },
          };

          // Dispatcher for setting bond data
          props.setbonddata(bondData);
        } else {
          const bondData = {
            type: "setbonddetails",
            payload: {
              bonds: [],
              bondPurchasePrice: 0,
              bondLoading: 0,
              overlay: 0,
            },
          };

          // Dispatcher for setting bond data
          props.setbonddata(bondData);
        }

        // props.setloading(3, 0);

        setDeleteOverlay(-1); // for closing the delete overlay on deleting bond
      } else {
        console.log("Some error occurred!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (props.bondLoading === 1) {
      fetchBondData();
    }

    return () => {
      isunmounted = true;
    };
  }, [props.bondLoading]);

  return (
    <>
      {deleteOverlay !== -1 && (
        <BondDeleteOverlay
          bondtid={deleteOverlay} //this variable stores the transaction id of the bond to be deleted
          setOverlay={setDeleteOverlay}
        />
      )}
      {props.bonds.length > 0 ? (
        <>
          <table id="main-table">
            <thead>
              <tr className="header">
                <th>Type</th>
                <th>Description</th>
                <th>Purchase date</th>
                <th>Face value</th>
                <th>Coupon rate</th>
                <th>Years to maturity</th>
                <th>Payment interval</th>
                <th>Total interest paid until now</th>
                <th>Options</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {props.bonds.map((bond, index) => {
                const isMatured = checkIfBondIsMatured(
                  bond.purchase_date,
                  bond.years_to_maturity
                );

                const totalInterestPaid = calculateTotalInterestPaid(
                  bond.purchase_date,
                  bond.face_value,
                  bond.coupon_rate,
                  bond.payment_interval
                );

                let bondData = {
                  bondTransactionID: bond.bond_transaction_ID,
                  bondtype: bond.bond_type,
                  desc: bond.bond_description,
                  faceValue: bond.face_value,
                  couponRate: bond.coupon_rate,
                  yearsToMaturity: bond.years_to_maturity,
                  paymentInterval: bond.payment_interval,
                  purchaseDate: bond.purchase_date,
                };

                return (
                  <tr
                    className="data"
                    key={index}
                    style={{
                      background: isMatured
                        ? "linear-gradient(130deg, #7b9c9a 0%, #5e5c5c 75%)"
                        : props.gradient
                    }}
                  >
                    <td>{bond.bond_type}</td>
                    <td title={bond.bond_description}>
                      {bond.bond_description}
                    </td>
                    <td>{convertDateFormat(bond.purchase_date)}</td>
                    <td>{currency + bond.face_value}</td>
                    <td>{bond.coupon_rate + "%"}</td>
                    <td>{bond.years_to_maturity}</td>
                    <td>{bond.payment_interval}</td>
                    <td>{currency + totalInterestPaid.toFixed(2)}</td>
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
                                editFormData: bondData,
                                overlay: 6,
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
                            setDeleteOverlay(bondData.bondTransactionID)
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
                    <td>{isMatured ? "Matured" : "Not matured"}</td>
                  </tr>
                );
              })}

              <tr className="total">
                <td></td>
                <td>TOTAL</td>
                <td></td>
                <td>{currency + findTotalFaceValue(props.bonds)}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </>
      ) : props.bondLoading === 1 ? (
        <div className="m-auto mt-8 text-sm md:text-base w-full text-center">
          Loading your bonds...
        </div>
      ) : (
        <div className="m-auto mt-8 text-sm md:text-base text-[#fd1c03] w-full text-center">
          No bonds added yet!
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
  setbonddata: (bonddata) => dispatch(bonddata),
  openOverlay: (overlaytype) => dispatch(overlaytype),
});

export default connect(mapStateToProps, mapDispatchToProps)(Bonds);
