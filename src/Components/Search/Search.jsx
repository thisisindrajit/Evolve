import React, { useState, useEffect } from "react";
import "./search.css";
import { AdvancedChart, MiniChart } from "react-tradingview-embed";
import defaultPageStyles from "../../Styles/defaultPageStyles";
import axios from "axios";
import { connect } from "react-redux";
import { useTitle } from "../../Services/useTitle";
import Footer from "../Footer/Footer";

const Search = (props) => {
  useTitle(`Search - Evolve`);

  let isunmounted = false;

  let symbolarray = [];

  props.stocks.forEach((stock) => {
    symbolarray.push(stock.symbol);
  });

  // contains symbols of all of the user's stocks
  let [stockData, setStockData] = useState(symbolarray);

  let findTotalPurchasePrice = (stocks) => {
    if (stocks.length === 0) {
      return 0;
    }

    //total purchase price variable
    let totalPurchasePrice = 0;

    stocks.forEach((stock) => {
      totalPurchasePrice += parseFloat(stock.purchase_price) * stock.quantity;
    });

    return totalPurchasePrice.toFixed(2);
  };

  let fetchStockData = async () => {
    const data = {
      uid: localStorage.getItem("userID"),
      assettype: 1, //to denote stock
    };

    //fetch stock data
    const STOCK_ENDPOINT = process.env.REACT_APP_API_URL + "/selectAsset.php";

    try {
      let response = await axios.post(STOCK_ENDPOINT, data);

      if (response.status === 200 && !isunmounted) {
        if (!response.data.msg) {
          //creating symbol array
          let symbolarray = [];

          response.data.forEach((stock) => {
            symbolarray.push(stock.symbol);
          });

          setStockData(symbolarray);

          // Dispatching the action to set stocks
          const stockData = {
            type: "setstockdetails",
            payload: {
              stocks: response.data,
              stockPurchasePrice: findTotalPurchasePrice(response.data),
              stockLoading: 0,
            },
          };

          // Dispatcher for setting stock data
          props.setstockdata(stockData);
        } else {
          setStockData([]); // resetting stocks to none

          const stockData = {
            type: "setstockdetails",
            payload: {
              stocks: [],
              stockPurchasePrice: 0,
              stockLoading: 0,
            },
          };

          // Dispatcher for setting stock data
          props.setstockdata(stockData);
        }
      } else {
        console.log("Some error occurred!");
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (props.stockLoading === 1) {
      fetchStockData();
    }

    return () => {
      isunmounted = true;
    };
  }, [props.stockLoading]);

  return (
    <div style={defaultPageStyles.pageStyle}>
      <div id="search">
        {props.stockLoading === 0 ? (
          <>
            <div>
              <div className="text-base md:text-lg">
                <span className="font-bold">Advanced </span>Chart
              </div>
              {/*Vertical line*/}
              <div className="w-full h-px bg-evolve-green mt-3 mb-2 md:my-4"></div>
              {/* Info */}
              <div className="text-xs md:text-sm leading-loose text-gray-300 text-justify mb-4">
                Search for other assets by clicking on the current asset symbol
                in the top left corner of the chart.
              </div>
              <div id="chart-holder-search">
                <AdvancedChart
                  widgetProps={{
                    colorTheme: "dark",
                    symbol: stockData.length > 0 ? stockData[0] : "AAPL",
                    height: 550,
                    style: "2",
                    timezone: "Etc/UTC",
                    hide_side_toolbar: true,
                    allow_symbol_change: true,
                    details: true,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="text-base md:text-lg">
                Your <span className="font-bold">Recent Stocks</span>
              </div>
              {/*Vertical line*/}
              <div className="w-full h-px bg-evolve-green mt-3 mb-2 md:my-4"></div>
              {stockData.length > 0 ? (
                <div id="chart-holder-stock">
                  {stockData.slice(0, 10).map((stock, index) => {
                    return (
                      <div className="ticker-evolve" key={index}>
                        <MiniChart
                          widgetProps={{
                            width: "100%",
                            symbol: stock,
                            autosize: true,
                            dateRange: "12M",
                            colorTheme: "dark",
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="w-full text-center text-red-500 mt-8">
                  No Stocks found!
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="m-auto h-[80vh] flex items-center justify-center w-full">
            Loading your data...
          </div>
        )}
      </div>
      {props.stockLoading === 0 && <Footer />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  setstockdata: (stockdata) => dispatch(stockdata),
  showdet2: () => dispatch(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
