import React, { useEffect } from 'react';
import './market.css';
import defaultPageStyles from '../../Styles/defaultPageStyles';


const Market = (props) => {

    const overviewobj = {
        "width": "100%",
        "height": "100%",
        "symbolsGroups": [
            {
                "name": "Indices",
                "originalName": "Indices",
                "symbols": [
                    {
                        "name": "FOREXCOM:SPXUSD",
                        "displayName": "S&P 500"
                    },
                    {
                        "name": "FOREXCOM:NSXUSD",
                        "displayName": "Nasdaq 100"
                    },
                    {
                        "name": "FOREXCOM:DJI",
                        "displayName": "Dow 30"
                    },
                    {
                        "name": "INDEX:NKY",
                        "displayName": "Nikkei 225"
                    },
                    {
                        "name": "INDEX:DEU30",
                        "displayName": "DAX Index"
                    },
                    {
                        "name": "FOREXCOM:UKXGBP",
                        "displayName": "FTSE 100"
                    }
                ]
            },
            {
                "name": "Commodities",
                "originalName": "Commodities",
                "symbols": [
                    {
                        "name": "CME_MINI:ES1!",
                        "displayName": "S&P 500"
                    },
                    {
                        "name": "CME:6E1!",
                        "displayName": "Euro"
                    },
                    {
                        "name": "COMEX:GC1!",
                        "displayName": "Gold"
                    },
                    {
                        "name": "NYMEX:CL1!",
                        "displayName": "Crude Oil"
                    },
                    {
                        "name": "NYMEX:NG1!",
                        "displayName": "Natural Gas"
                    },
                    {
                        "name": "CBOT:ZC1!",
                        "displayName": "Corn"
                    }
                ]
            },
            {
                "name": "Bonds",
                "originalName": "Bonds",
                "symbols": [
                    {
                        "name": "CME:GE1!",
                        "displayName": "Eurodollar"
                    },
                    {
                        "name": "CBOT:ZB1!",
                        "displayName": "T-Bond"
                    },
                    {
                        "name": "CBOT:UB1!",
                        "displayName": "Ultra T-Bond"
                    },
                    {
                        "name": "EUREX:FGBL1!",
                        "displayName": "Euro Bund"
                    },
                    {
                        "name": "EUREX:FBTP1!",
                        "displayName": "Euro BTP"
                    },
                    {
                        "name": "EUREX:FGBM1!",
                        "displayName": "Euro BOBL"
                    }
                ]
            },
            {
                "name": "Forex",
                "originalName": "Forex",
                "symbols": [
                    {
                        "name": "FX:EURUSD"
                    },
                    {
                        "name": "FX:GBPUSD"
                    },
                    {
                        "name": "FX:USDJPY"
                    },
                    {
                        "name": "FX:USDCHF"
                    },
                    {
                        "name": "FX:AUDUSD"
                    },
                    {
                        "name": "FX:USDCAD"
                    }
                ]
            }
        ],
        "showSymbolLogo": true,
        "colorTheme": "dark",
        "isTransparent": false,
        "locale": "en"
    }

    const cryptoobj = {
        "width": "100%",
        "height": "100%",
        "defaultColumn": "overview",
        "screener_type": "crypto_mkt",
        "displayCurrency": "USD",
        "colorTheme": "dark",
        "locale": "en"
    }


    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js'
        script.async = true;
        script.innerHTML = JSON.stringify(overviewobj)
        document.getElementById("market-container").appendChild(script);

        const script2 = document.createElement('script');
        script2.src = 'https://s3.tradingview.com/external-embedding/embed-widget-screener.js'
        script2.async = true;
        script2.innerHTML = JSON.stringify(cryptoobj)
        document.getElementById("crypto-container").appendChild(script2);


    }, [])

    return (
        <div id="market" style={defaultPageStyles.pageStyle}>
            <>
                <div className="label-grid" style={{ marginTop: "0" }}>
                    <div className="label-dashboard">Market Overview</div>
                </div>
                {/*Vertical line*/}

                <div
                    style={{
                        height: "0.5px",
                        backgroundColor: "white",
                        width: "100%",
                        marginBottom: "30px",
                    }}
                ></div>
                <div id="market-container">
                    <div className="tradingview-widget-container">
                        <div className="tradingview-widget-container__widget"></div>
                    </div>
                </div>

                <div className="label-grid">
                    <div className="label-dashboard">Crypto Overview</div>
                </div>
                {/*Vertical line*/}

                <div
                    style={{
                        height: "0.5px",
                        backgroundColor: "white",
                        width: "100%",
                        marginBottom: "30px",
                    }}
                ></div>

                <div id="crypto-container">
                    <div class="tradingview-widget-container">
                        <div class="tradingview-widget-container__widget"></div>
                    </div>
                </div>
            </>

        </div>
    )
}

export default Market;