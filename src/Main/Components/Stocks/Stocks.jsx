import React, { useState, useEffect } from "react";
import "../table.css";
import './stocks.css';
import StockDeleteOverlay from "./StockDeleteOverlay";
import axios from "axios";
import { connect } from 'react-redux';
import.meta.hot; // FOR GETTING ENV VARIABLES FROM SNOWPACK

const Stocks = (props) => {
  let isunmounted = false;

  // let [stockData, setStockData] = useState([]);
  let [deleteOverlay, setDeleteOverlay] = useState(-1); //using the deleteOverlay value to store the transaction ID of the stock to be deleted

  let findTotalPurchasePrice = (stocks) => {

    if(stocks.length === 0){
      return 0;
    }

    //total purchase price variable
    let totalPurchasePrice = 0;

    stocks.map((stock) => {
      totalPurchasePrice += parseFloat(stock.purchase_price) * stock.quantity;
    });

    return totalPurchasePrice.toFixed(2);
  };

  let convertDateFormat = (date) => {
    date = date.split("-");

    return date[2] + "/" + date[1] + "/" + date[0];
  };

  // let starttoLoad = () => {
  //   props.setloading(1, 1);
  //   fetchStockData();
  // }

  let fetchStockData = async () => {

    const data = {
      uid: localStorage.getItem("userID"),
      assettype: 1, //to denote stock
    };

    //fetch stock data
    // const STOCK_ENDPOINT = "http://localhost:80/evolve/selectAsset.php";
    const STOCK_ENDPOINT = process.env.REACT_APP_API_URL + "/selectAsset.php";

    try {
      let response = await axios.post(STOCK_ENDPOINT, data);

      //console.log(isunmounted);

      if (response.status === 200 && !isunmounted) {

        //! Set stocks, stock purchase price to store and stocks loading to 0

        if (!response.data.msg) {
          //setStockData(response.data);
          const stockData = {
            type: "setstockdetails",
            payload:  
            {
              stocks:response.data,
              stockPurchasePrice: findTotalPurchasePrice(response.data),
              stockLoading: 0,
              overlay:0
            }
          }

          //* Dispatcher for setting stock data
          props.setstockdata(stockData);

          
        } else {
          //setStockData([]) //resetting stocks to none

          const stockData = {
            type: "setstockdetails",
            payload:  
            {
              stocks:[],
              stockPurchasePrice: 0,
              stockLoading: 0,
              overlay:0
            }
          }

          //* Dispatcher for setting stock data
          props.setstockdata(stockData);
        }

        //props.setloading(1, 0);
        setDeleteOverlay(-1); //for closing the delete overlay on deleting stock

        // if (props.currentOpenOverlay === 1 || props.currentOpenOverlay === 2) {
        //   props.addeditoverlayhandle(0); //for closing the add/edit overlay on adding or editing stock
        // }
      } else {
        console.log("Some error occurred!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {

    if(props.stockLoading === 1){
      fetchStockData();
    }
    
    return () => {
      isunmounted = true;
    };

  }, [props.stockLoading]);

  // useEffect(() => {
  //   props.setPurchasePrice(1, findTotalPurchasePrice());
  // }, [props.isDataLoaded])


  // !Change this to original current price from API
  let currentdata = ["132.03", "732.23", "3333.00"];
  let totalcp = 0;

  return (
    <>
      {deleteOverlay !== -1 && (
        <StockDeleteOverlay
          stocktid={deleteOverlay} //this variable stores the transaction id of the stock to be deleted
          setOverlay={setDeleteOverlay}
          height={document.getElementById("stocks").clientHeight}
          //startLoadingAgain={starttoLoad}
        />
      )}
      {props.stocks.length > 0 ?
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
              </tr>
            </thead>
            <tbody>
              {
                props.stocks.map((stock, index) => {

                  const gainloss = (parseFloat(currentdata[index])*stock.quantity - parseFloat(stock.purchase_price)*stock.quantity).toFixed(2);
                  let glmain = null;

                  if(gainloss < 0){
                    glmain = "-₹" + (-1 * gainloss) 
                  }else{
                    glmain = "₹" + gainloss;
                  }

                  totalcp += parseFloat(currentdata[index])*stock.quantity;

                  return (
                    <tr
                      className="data"
                      key={index}
                      style={{ background: props.gradient }}
                    >
                      <td>{stock.symbol}</td>
                      <td title={stock.stock_description}>{stock.stock_description}</td>
                      <td>{convertDateFormat(stock.purchase_date)}</td>
                      <td>{stock.quantity}</td>
                      <td>{"₹" + stock.purchase_price}</td>
                      <td>{"₹" + currentdata[index]}</td>
                      <td>{glmain}</td>
                    </tr>
                  );
                })}


              <tr className="total">
                <td></td>
                <td>TOTAL</td>
                <td></td>
                <td></td>
                <td>{"₹" + findTotalPurchasePrice(props.stocks)}</td>
                <td>{"₹" + totalcp.toFixed(2)}</td>
                <td></td>
              </tr>

            </tbody>
          </table>
          <div id="edit-bar">
            <table id="edit-table">
              <thead>
                <tr className="header">
                  <th></th>
                </tr>
              </thead>
              <tbody>

                {props.stocks.map((stock, index) => {
                  {
                    /*Stock data*/
                  }
                  let stockdata = {
                    stockTransactionID: stock.stock_transaction_ID,
                    symbol: stock.symbol,
                    desc: stock.stock_description,
                    quantity: stock.quantity,
                    purchasePrice: stock.purchase_price,
                    purchaseDate: stock.purchase_date,
                  };
                  return (
                    <tr className="data" key={index}>
                      <td>
                        <div className="edit-icons">
                          {/*Edit icon*/}
                          <svg
                            onClick={() => props.openOverlay({type:"setOverlay", payload:{editFormData:stockdata, overlay:2}})}
                            width="30"
                            height="30"
                            viewBox="0 0 40 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M22.8328 33.1635H33.4611"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M21.4249 8.25949C22.6533 6.69449 24.6383 6.77616 26.2049 8.00449L28.5216 9.82116C30.0883 11.0495 30.6433 12.9545 29.4149 14.5228L15.5999 32.1478C15.1383 32.7378 14.4333 33.0862 13.6833 33.0945L8.35493 33.1628L7.14827 27.9712C6.97827 27.2428 7.14827 26.4762 7.60993 25.8845L21.4249 8.25949Z"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M18.8379 11.5602L26.8279 17.8235"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          {/*Delete icon*/}

                          <svg
                            width="28"
                            onClick={() => setDeleteOverlay(stockdata.stockTransactionID)}
                            height="28"
                            viewBox="0 0 38 38"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M28.1823 13.8078C28.1823 13.8078 27.3904 23.6297 26.931 27.767C26.7123 29.743 25.4916 30.9009 23.4923 30.9374C19.6875 31.0059 15.8783 31.0103 12.075 30.9301C10.1514 30.8907 8.95123 29.7182 8.73685 27.7772C8.27456 23.6034 7.48706 13.8078 7.48706 13.8078"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M30.1994 9.09957H5.46899"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M25.4341 9.09957C24.2893 9.09957 23.3035 8.29019 23.0789 7.16874L22.7245 5.3954C22.5058 4.57728 21.7649 4.01144 20.9206 4.01144H14.7474C13.9031 4.01144 13.1622 4.57728 12.9435 5.3954L12.5891 7.16874C12.3645 8.29019 11.3787 9.09957 10.2339 9.09957"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                <tr className="total edit-footer"></tr>
              </tbody>
            </table>
          </div>
        </> : props.stockLoading === 1 ? <div className="msg" style={{ color: "white" }}> Loading your stocks... </div> : <div className="msg"> No stocks added yet! </div>}
    </>
  );
};


// these are the functions which are required to map the state to the props and dispatch actions to store

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  setstockdata: (stockdata) => dispatch(stockdata),
  openOverlay: (overlaytype) => dispatch(overlaytype)
});

export default connect(mapStateToProps, mapDispatchToProps)(Stocks);
