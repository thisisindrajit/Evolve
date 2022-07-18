import React, { useEffect } from "react";
import "./dashboard.css";
import defaultPageStyles from "../../Styles/defaultPageStyles";
import AssetBox from "../AssetBox/AssetBox";
import AssetGraph from "../AssetGraph/AssetGraph";
import Stocks from "../Stocks/Stocks";
import StockForm from "../Stocks/StockForm";
import StockEditForm from "../Stocks/StockEditForm";
import Crypto from "../Crypto/Crypto";
import CryptoForm from "../Crypto/CryptoForm";
import CryptoEditForm from "../Crypto/CryptoEditForm";
import Bonds from "../Bonds/Bonds";
import BondForm from "../Bonds/BondForm";
import BondEditForm from "../Bonds/BondEditForm";
import OtherAssets from "../OtherAssets/OtherAssets";
import OtherAssetForm from "../OtherAssets/OtherAssetForm";
import OtherAssetEditForm from "../OtherAssets/OtherAssetEditForm";
import { connect } from "react-redux";
import { useTitle } from "../../Services/useTitle";
import ReactTooltip from "react-tooltip";

const Dashboard = (props) => {
  useTitle(`${localStorage.getItem("username")}'s Dashboard - Evolve`);

  const stockMarketWidgetProps = {
    colorTheme: "dark",
    dateRange: "12M",
    exchange: "NASDAQ",
    showChart: true,
    locale: "en",
    largeChartUrl: "",
    showSymbolLogo: false,
    width: "100%",
    height: "600",
    isTransparent: "true",
    plotLineColorGrowing: "#fff",
    plotLineColorFalling: "#fff",
    gridLineColor: "#9F9BCA",
    scaleFontColor: "#9F9BCA",
    belowLineFillColorGrowing: "#302b63",
    belowLineFillColorFalling: "#302b63",
    symbolActiveColor: "#4B4591",
  };

  const marketOverviewWidgetProps = {
    colorTheme: "light",
    dateRange: "12M",
    showChart: true,
    locale: "en",
    largeChartUrl: "",
    isTransparent: true,
    showSymbolLogo: true,
    width: "100%",
    height: "600",
    plotLineColorGrowing: "#66A4B3",
    plotLineColorFalling: "#66A4B3",
    gridLineColor: "#428899",
    scaleFontColor: "#428899",
    belowLineFillColorGrowing: "#89C8D7",
    belowLineFillColorFalling: "#89C8D7",
    symbolActiveColor: "#CDE7EE",
    tabs: [
      {
        title: "Indices",
        symbols: [
          {
            s: "FOREXCOM:NSXUSD",
            d: "Nasdaq 100",
          },
          {
            s: "FOREXCOM:SPXUSD",
            d: "S&P 500",
          },
          {
            s: "FOREXCOM:DJI",
            d: "Dow 30",
          },
          {
            s: "BSE:SENSEX",
            d: "SENSEX",
          },
        ],
        originalTitle: "Indices",
      },
      {
        title: "Commodities",
        symbols: [
          {
            s: "CME_MINI:ES1!",
            d: "S&P 500",
          },
          {
            s: "CME:6E1!",
            d: "Euro",
          },
          {
            s: "COMEX:GC1!",
            d: "Gold",
          },
          {
            s: "NYMEX:CL1!",
            d: "Crude Oil",
          },
          {
            s: "NYMEX:NG1!",
            d: "Natural Gas",
          },
          {
            s: "CBOT:ZC1!",
            d: "Corn",
          },
        ],
        originalTitle: "Commodities",
      },
      {
        title: "Bonds",
        symbols: [
          {
            s: "CME:GE1!",
            d: "Eurodollar",
          },
          {
            s: "CBOT:ZB1!",
            d: "T-Bond",
          },
          {
            s: "CBOT:UB1!",
            d: "Ultra T-Bond",
          },
          {
            s: "EUREX:FGBL1!",
            d: "Euro Bund",
          },
          {
            s: "EUREX:FBTP1!",
            d: "Euro BTP",
          },
          {
            s: "EUREX:FGBM1!",
            d: "Euro BOBL",
          },
        ],
        originalTitle: "Bonds",
      },
      {
        title: "Forex",
        symbols: [
          {
            s: "FX:EURUSD",
          },
          {
            s: "FX:GBPUSD",
          },
          {
            s: "FX:USDJPY",
          },
          {
            s: "FX:USDCHF",
          },
          {
            s: "FX:AUDUSD",
          },
          {
            s: "FX:USDCAD",
          },
        ],
        originalTitle: "Forex",
      },
    ],
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-hotlists.js";
    script.async = true;
    script.innerHTML = JSON.stringify(stockMarketWidgetProps);
    document.getElementById("stock-market-overview").appendChild(script);

    const script2 = document.createElement("script");
    script2.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
    script2.async = true;
    script2.innerHTML = JSON.stringify(marketOverviewWidgetProps);
    document.getElementById("markets-overview").appendChild(script2);
  }, []);

  return (
    <>
      {/* Add stock form */}
      <StockForm isOpen={props.overlay === 1} />

      {/* Edit Stock form */}
      <StockEditForm isOpen={props.overlay === 2} />

      {/* Add Crypto form */}
      <CryptoForm isOpen={props.overlay === 3} />

      {/* Edit Crypto form */}
      <CryptoEditForm isOpen={props.overlay === 4} />

      {/* Add Bond form */}
      <BondForm isOpen={props.overlay === 5} />

      {/* Edit Bond form */}
      <BondEditForm isOpen={props.overlay === 6} />

      {/* Add Asset form */}
      <OtherAssetForm isOpen={props.overlay === 7} />

      {/* Edit Asset form */}
      <OtherAssetEditForm isOpen={props.overlay === 8} />

      <div id="dashboard" style={defaultPageStyles.pageStyle}>
        <div id="top">
          <div className="left-grid">
            <AssetBox
              gradient={{
                background: "linear-gradient(145deg, #F82C8E 0%, #A90C61 100%)",
              }}
            />
            <div>
              <div className="text-sm md:text-base text-transparent font-bold mb-2 bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                NASDAQ Overview
              </div>
              <div id="stock-market-overview">
                <div className="tradingview-widget-container">
                  <div className="tradingview-widget-container__widget"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="right-grid">
            <AssetGraph
              gradient={{
                background: "linear-gradient(145deg, #404D58 0%, #5D7489 100%)",
              }}
            />
            <div>
              <div className="text-sm md:text-base text-transparent font-bold mb-2 bg-clip-text bg-gradient-to-r from-cyan-500 via-green-300 to-blue-500">
                MARKETS Overview
              </div>
              <div id="markets-overview">
                <div className="tradingview-widget-container">
                  <div className="tradingview-widget-container__widget"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="m-auto mx-4 my-20 flex flex-col gap-20">
          {/* STOCKS */}
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-center gap-1">
                <div className="text-lg md:text-xl">
                  My <span className="font-bold">Stocks</span>
                </div>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  className="cursor-pointer mb-[0.25] md:mb-0 h-5 w-5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  data-tip="Only US stocks are supported as of now."
                  data-for="info"
                >
                  <path
                    d="M12 10.75C12.4142 10.75 12.75 11.0858 12.75 11.5V16.5C12.75 16.9142 12.4142 17.25 12 17.25C11.5858 17.25 11.25 16.9142 11.25 16.5V11.5C11.25 11.0858 11.5858 10.75 12 10.75Z"
                    fill="white"
                  />
                  <path
                    d="M12 9C12.5523 9 13 8.55228 13 8C13 7.44772 12.5523 7 12 7C11.4477 7 11 7.44772 11 8C11 8.55228 11.4477 9 12 9Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.25 12C3.25 7.16751 7.16751 3.25 12 3.25C16.8325 3.25 20.75 7.16751 20.75 12C20.75 16.8325 16.8325 20.75 12 20.75C7.16751 20.75 3.25 16.8325 3.25 12ZM12 4.75C7.99594 4.75 4.75 7.99594 4.75 12C4.75 16.0041 7.99594 19.25 12 19.25C16.0041 19.25 19.25 16.0041 19.25 12C19.25 7.99594 16.0041 4.75 12 4.75Z"
                    fill="white"
                  />
                </svg>
                <ReactTooltip
                  id="info"
                  place="right"
                  type="light"
                  effect="solid"
                />
              </div>
              <div
                className="flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer"
                onClick={() =>
                  props.openOverlay({
                    type: "setOverlay",
                    payload: { overlay: 1 },
                  })
                }
              >
                {props.stockLoading !== 1 && (
                  <>
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 50 50"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M25 17.3485V32.6118"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M32.6389 24.9802H17.3611"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M34.7619 4.16666H15.2381C8.4325 4.16666 4.16663 8.9835 4.16663 15.8024V34.1976C4.16663 41.0165 8.41266 45.8333 15.2381 45.8333H34.7619C41.5873 45.8333 45.8333 41.0165 45.8333 34.1976V15.8024C45.8333 8.9835 41.5873 4.16666 34.7619 4.16666Z"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="block sm:hidden text-xs uppercase">
                      Add
                    </span>
                    <span className="hidden sm:block text-sm md:text-base">
                      Add Stock
                    </span>
                  </>
                )}
              </div>
            </div>

            <div id="stocks">
              <Stocks gradient="linear-gradient(130deg, #da77d6 0%, #7526c5 75%)" />
            </div>
          </div>

          {/* CRYPTO */}

          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-center gap-1">
                <div className="text-lg md:text-xl">
                  My <span className="font-bold">Crypto</span>
                </div>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  className="cursor-pointer mb-[0.25] md:mb-0 h-5 w-5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  data-tip="Only cryptos trading in US dollars are supported as of now."
                  data-for="info"
                >
                  <path
                    d="M12 10.75C12.4142 10.75 12.75 11.0858 12.75 11.5V16.5C12.75 16.9142 12.4142 17.25 12 17.25C11.5858 17.25 11.25 16.9142 11.25 16.5V11.5C11.25 11.0858 11.5858 10.75 12 10.75Z"
                    fill="white"
                  />
                  <path
                    d="M12 9C12.5523 9 13 8.55228 13 8C13 7.44772 12.5523 7 12 7C11.4477 7 11 7.44772 11 8C11 8.55228 11.4477 9 12 9Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.25 12C3.25 7.16751 7.16751 3.25 12 3.25C16.8325 3.25 20.75 7.16751 20.75 12C20.75 16.8325 16.8325 20.75 12 20.75C7.16751 20.75 3.25 16.8325 3.25 12ZM12 4.75C7.99594 4.75 4.75 7.99594 4.75 12C4.75 16.0041 7.99594 19.25 12 19.25C16.0041 19.25 19.25 16.0041 19.25 12C19.25 7.99594 16.0041 4.75 12 4.75Z"
                    fill="white"
                  />
                </svg>
                <ReactTooltip
                  id="info"
                  place="right"
                  type="light"
                  effect="solid"
                />
              </div>
              <div
                className="flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer"
                onClick={() =>
                  props.openOverlay({
                    type: "setOverlay",
                    payload: { overlay: 3 },
                  })
                }
              >
                {props.cryptoLoading !== 1 && (
                  <>
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 50 50"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M25 17.3485V32.6118"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M32.6389 24.9802H17.3611"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M34.7619 4.16666H15.2381C8.4325 4.16666 4.16663 8.9835 4.16663 15.8024V34.1976C4.16663 41.0165 8.41266 45.8333 15.2381 45.8333H34.7619C41.5873 45.8333 45.8333 41.0165 45.8333 34.1976V15.8024C45.8333 8.9835 41.5873 4.16666 34.7619 4.16666Z"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="block sm:hidden text-xs uppercase">
                      Add
                    </span>
                    <span className="hidden sm:block text-sm md:text-base">
                      Add Crypto
                    </span>
                  </>
                )}
              </div>
            </div>

            <div id="crypto">
              <Crypto gradient="linear-gradient(130deg, #70A3E0 0%, #7924CD 75%)" />
            </div>
          </div>

          {/* BONDS */}

          <div>
            <div className="flex items-center justify-between">
              <div className="text-lg md:text-xl">
                My <span className="font-bold">Bonds</span>
              </div>
              <div
                className="flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer"
                onClick={() =>
                  props.openOverlay({
                    type: "setOverlay",
                    payload: { overlay: 5 },
                  })
                }
              >
                {props.bondLoading !== 1 && (
                  <>
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 50 50"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M25 17.3485V32.6118"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M32.6389 24.9802H17.3611"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M34.7619 4.16666H15.2381C8.4325 4.16666 4.16663 8.9835 4.16663 15.8024V34.1976C4.16663 41.0165 8.41266 45.8333 15.2381 45.8333H34.7619C41.5873 45.8333 45.8333 41.0165 45.8333 34.1976V15.8024C45.8333 8.9835 41.5873 4.16666 34.7619 4.16666Z"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="block sm:hidden text-xs uppercase">
                      Add
                    </span>
                    <span className="hidden sm:block text-sm md:text-base">
                      Add Bond
                    </span>
                  </>
                )}
              </div>
            </div>

            <div id="bonds">
              <Bonds gradient="linear-gradient(130deg, #D96587 0%, #DF275F 75%)" />
            </div>
          </div>

          {/* OTHER ASSETS */}

          <div>
            <div className="flex items-center justify-between">
              <div className="text-lg md:text-xl">
                Other <span className="font-bold">Assets</span>
              </div>
              <div
                className="flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer"
                onClick={() =>
                  props.openOverlay({
                    type: "setOverlay",
                    payload: { overlay: 7 },
                  })
                }
              >
                {props.bondLoading !== 1 && (
                  <>
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 50 50"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M25 17.3485V32.6118"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M32.6389 24.9802H17.3611"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M34.7619 4.16666H15.2381C8.4325 4.16666 4.16663 8.9835 4.16663 15.8024V34.1976C4.16663 41.0165 8.41266 45.8333 15.2381 45.8333H34.7619C41.5873 45.8333 45.8333 41.0165 45.8333 34.1976V15.8024C45.8333 8.9835 41.5873 4.16666 34.7619 4.16666Z"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="block sm:hidden text-xs uppercase">
                      Add
                    </span>
                    <span className="hidden sm:block text-sm md:text-base">
                      Add Asset
                    </span>
                  </>
                )}
              </div>
            </div>

            <div id="other-assets">
              <OtherAssets gradient="linear-gradient(to right, #2C5364, #203A43, #0F2027)" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// these are the functions which are required to map the state to the props and dispatch actions to store
const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  openOverlay: (overlaytype) => dispatch(overlaytype),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
