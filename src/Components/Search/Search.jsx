import React, { useState, useEffect } from 'react';
import './search.css';
import { AdvancedChart } from "react-tradingview-embed";
import defaultPageStyles from '../../Styles/defaultPageStyles';
import axios from 'axios';
import { connect } from 'react-redux';


const Search = (props) => {

    let isunmounted = false;

    //let [loading, setLoading] = useState(1);

    let symbolarray = []

    props.stocks.map((stock) => {
        symbolarray.push(stock.symbol)
    })

    // contains symbols of all of the user's stocks
    let [stockData, setStockData] = useState(symbolarray);

    let findTotalPurchasePrice = (stocks) => {

        if (stocks.length === 0) {
            return 0;
        }

        //total purchase price variable
        let totalPurchasePrice = 0;

        stocks.map((stock) => {
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
                    let symbolarray = []

                    response.data.map((stock) => {
                        symbolarray.push(stock.symbol)
                    });

                    setStockData(symbolarray);

                    // Dispatching the action to set stocks
                    const stockData = {
                        type: "setstockdetails",
                        payload:
                        {
                            stocks: response.data,
                            stockPurchasePrice: findTotalPurchasePrice(response.data),
                            stockLoading: 0
                        }
                    }

                    //* Dispatcher for setting stock data
                    props.setstockdata(stockData);
                } else {

                    setStockData([]) //resetting stocks to none
                    
                    const stockData = {
                        type: "setstockdetails",
                        payload:
                        {
                            stocks: [],
                            stockPurchasePrice: 0,
                            stockLoading: 0
                        }
                    }

                    //* Dispatcher for setting stock data
                    props.setstockdata(stockData);
                }

                setLoading(0);
            } else {
                console.log("Some error occurred!");
            }
        } catch (e) {
            console.log(e);
        }

    }

    useEffect(() => {
        if (props.stockLoading === 1) {
            fetchStockData();
        }

        return () => {
            isunmounted = true;
        };
    }, [props.stockLoading])


    return (
        <div id="search" style={defaultPageStyles.pageStyle}>
            {props.stockLoading === 0 ?
                <>
                    <div className="label-grid" style={{ marginTop: "0" }}>
                        <div className="label-dashboard">Advanced Chart</div>
                    </div>
                    <div id="chart-holder-search">

                        <AdvancedChart
                            widgetConfig={{
                                colorTheme: "dark",
                                symbol: stockData.length > 0 ? stockData[0] : "AAPL",
                                style: "2",
                                width: "100%",
                                autosize: "true",
                                hideSideToolbar: "false",
                                details: "true"
                            }}
                        />
                    </div>
                    <div className="label-grid">
                        <div className="label-dashboard">Your Recent Stocks Overview</div>
                    </div>
                    {stockData.length > 0 ? <div id="chart-holder-stock">
                        {stockData.slice(0, 10).map((stock, index) => {
                            return (
                                <div className="ticker-evolve" key={index}>
                                    <TradingViewEmbed
                                        widgetType={widgetType.MINI_CHART}
                                        widgetConfig={{
                                            symbol: stock,
                                            width: "100%",
                                            dateRange: "12M",
                                            colorTheme: "dark",
                                            autosize: "true"
                                        }}
                                    />
                                </div>
                            )
                        })}
                    </div> : <div className="msg" style={{ margin: "0" }}>No Stocks found!</div>}

                </> : <div style={{ width: "100%", textAlign: "center", margin: "auto" }}>Loading Data...</div>}

        </div>
    )
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    setstockdata: (stockdata) => dispatch(stockdata),
    showdet2: () => dispatch()
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
