import React, { useEffect } from "react";
import "./dashboard.css";
import defaultPageStyles from "../../Styles/defaultPageStyles";
import AssetBox from "../Components/AssetBox/AssetBox";
import AssetGraph from "../Components/AssetGraph/AssetGraph";
import AssetTypeBox from "../Components/AssetTypeBox/AssetTypeBox";
import Stocks from "../Components/Stocks/Stocks";
import StockForm from "../Components/Stocks/StockForm";
import StockEditForm from "../Components/Stocks/StockEditForm";
import Crypto from "../Components/Crypto/Crypto";
import CryptoForm from "../Components/Crypto/CryptoForm";
import CryptoEditForm from "../Components/Crypto/CryptoEditForm";
import Bonds from "../Components/Bonds/Bonds";
import BondForm from "../Components/Bonds/BondForm";
import BondEditForm from "../Components/Bonds/BondEditForm";
import OtherAssets from "../Components/OtherAssets/OtherAssets";
import OtherAssetForm from "../Components/OtherAssets/OtherAssetForm";
import OtherAssetEditForm from "../Components/OtherAssets/OtherAssetEditForm";
import Overlay from "../Components/Overlay/Overlay";
import { connect } from "react-redux";
import { useTitle } from "../../Services/useTitle";

const Dashboard = (props) => {
  useTitle(`${localStorage.getItem("username")}'s Dashboard - Evolve`);
  // let assetTypes = ["Stocks", "Crypto", "Bonds", "Others"];

  // let assettypeboxhandler = (type) => {
  //   console.log("Clicked " + type);
  // };

  const marketobj = {
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

  const marketoverviewobj = {
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
    script.innerHTML = JSON.stringify(marketobj);
    document.getElementById("stock-market-overview").appendChild(script);

    const script2 = document.createElement("script");
    script2.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
    script2.async = true;
    script2.innerHTML = JSON.stringify(marketoverviewobj);
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

        {/* <div className="label-grid">
          <div className="label-dashboard">Asset Types</div>
        </div>

        
        <div
          style={{
            height: "0.5px",
            backgroundColor: "white",
            width: "100%",
            marginBottom: "30px",
          }}
        ></div>

        <div id="asset-type">
          {assetTypes.map((asset, index) => {
            return (
              <AssetTypeBox
                key={index}
                title={asset}
                onClick={() => assettypeboxhandler(asset)}
              />
            );
          })}
        </div> */}

        <div className="m-auto mx-4 my-16 flex flex-col gap-24">
          {/* STOCKS */}
          <div>
            <div className="flex items-center justify-between">
              <div className="text-lg md:text-xl">
                My <span className="font-bold">Stocks</span>
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
                <span className="block sm:hidden text-xs uppercase">Add</span>
                <span className="hidden sm:block text-sm md:text-base">
                  Add Stock
                </span>
              </div>
            </div>

            <div id="stocks">
              <Stocks gradient="linear-gradient(130deg, #da77d6 0%, #7526c5 75%)" />
            </div>
          </div>

          {/* CRYPTO */}

          <div>
            <div className="flex items-center justify-between">
              <div className="text-lg md:text-xl">
                My <span className="font-bold">Crypto</span>
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
                <span className="block sm:hidden text-xs uppercase">Add</span>
                <span className="hidden sm:block text-sm md:text-base">
                  Add Crypto
                </span>
              </div>
            </div>

            <div id="crypto">
              <Crypto gradient="linear-gradient(130deg, #70A3E0 0%, #7924CD 75%)" />
            </div>
          </div>

          {/* ------ */}

          <div className="label-grid">
            <div className="label-dashboard">My Bonds</div>
            {
              <div
                className="label-icon"
                onClick={() =>
                  props.openOverlay({
                    type: "setOverlay",
                    payload: { overlay: 5 },
                  })
                }
              >
                <svg
                  width="40"
                  height="40"
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
                <span style={{ marginLeft: "10px" }}>Add Bond</span>
              </div>
            }
          </div>

          <div id="bonds">
            <Bonds
              gradient="linear-gradient(145deg, #D96587 0%, #DF275F 100%)"
              // loading={loadingData[2]}
              // setloading={setloadingDataByType}
              // isDataLoaded={loadingData.reduce((a, b) => a + b)}
              // setPurchasePrice={setassetPurchasePriceByType}
              // openOverlay={openEditOverlay}
              // addeditoverlayhandle={openOverlay}
              // currentOpenOverlay={overlay}
            />
          </div>

          <div className="label-grid">
            <div className="label-dashboard">Other Assets</div>
            {
              <div
                className="label-icon"
                onClick={() =>
                  props.openOverlay({
                    type: "setOverlay",
                    payload: { overlay: 7 },
                  })
                }
              >
                <svg
                  width="40"
                  height="40"
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
                <span style={{ marginLeft: "10px" }}>Add Asset</span>
              </div>
            }
          </div>

          <div id="other-assets">
            <OtherAssets
              gradient="linear-gradient(to right, #2C5364, #203A43, #0F2027)"
              // loading={loadingData[3]}
              // setloading={setloadingDataByType}
              // isDataLoaded={loadingData.reduce((a, b) => a + b)}
              // setPurchasePrice={setassetPurchasePriceByType}
              // openOverlay={openEditOverlay}
              // addeditoverlayhandle={openOverlay}
              // currentOpenOverlay={overlay}
            />
          </div>
        </div>

        <div id="footer"></div>
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
