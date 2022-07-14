import React, { useEffect } from "react";
import "./market.css";
import defaultPageStyles from "../../Styles/defaultPageStyles";
import { CryptocurrencyMarket, MarketData } from "react-tradingview-embed";
import { useTitle } from "../../Services/useTitle";

const Market = (props) => {
  useTitle(`Markets - Evolve`);

  return (
    <div id="market" style={defaultPageStyles.pageStyle}>
      {/* MARKET OVERVIEW */}
      <div>
        <div className="text-base md:text-lg">
          <span className="font-bold">Market</span> Overview
        </div>

        {/*Vertical line*/}
        <div className="w-full h-px bg-evolve-green mt-3 mb-2 md:my-4"></div>

        <div id="market-container">
          <MarketData
            widgetProps={{
              width: "100%",
              symbolsGroups: [
                {
                  name: "Indices",
                  originalName: "Indices",
                  symbols: [
                    {
                      name: "FOREXCOM:SPXUSD",
                      displayName: "S&P 500",
                    },
                    {
                      name: "FOREXCOM:NSXUSD",
                      displayName: "Nasdaq 100",
                    },
                    {
                      name: "FOREXCOM:DJI",
                      displayName: "Dow 30",
                    },
                    {
                      name: "INDEX:NKY",
                      displayName: "Nikkei 225",
                    },
                    {
                      name: "INDEX:DEU30",
                      displayName: "DAX Index",
                    },
                    {
                      name: "FOREXCOM:UKXGBP",
                      displayName: "FTSE 100",
                    },
                  ],
                },
                {
                  name: "Commodities",
                  originalName: "Commodities",
                  symbols: [
                    {
                      name: "CME_MINI:ES1!",
                      displayName: "S&P 500",
                    },
                    {
                      name: "CME:6E1!",
                      displayName: "Euro",
                    },
                    {
                      name: "COMEX:GC1!",
                      displayName: "Gold",
                    },
                    {
                      name: "NYMEX:CL1!",
                      displayName: "Crude Oil",
                    },
                    {
                      name: "NYMEX:NG1!",
                      displayName: "Natural Gas",
                    },
                    {
                      name: "CBOT:ZC1!",
                      displayName: "Corn",
                    },
                  ],
                },
                {
                  name: "Bonds",
                  originalName: "Bonds",
                  symbols: [
                    {
                      name: "CME:GE1!",
                      displayName: "Eurodollar",
                    },
                    {
                      name: "CBOT:ZB1!",
                      displayName: "T-Bond",
                    },
                    {
                      name: "CBOT:UB1!",
                      displayName: "Ultra T-Bond",
                    },
                    {
                      name: "EUREX:FGBL1!",
                      displayName: "Euro Bund",
                    },
                    {
                      name: "EUREX:FBTP1!",
                      displayName: "Euro BTP",
                    },
                    {
                      name: "EUREX:FGBM1!",
                      displayName: "Euro BOBL",
                    },
                  ],
                },
                {
                  name: "Forex",
                  originalName: "Forex",
                  symbols: [
                    {
                      name: "FX:EURUSD",
                    },
                    {
                      name: "FX:GBPUSD",
                    },
                    {
                      name: "FX:USDJPY",
                    },
                    {
                      name: "FX:USDCHF",
                    },
                    {
                      name: "FX:AUDUSD",
                    },
                    {
                      name: "FX:USDCAD",
                    },
                  ],
                },
              ],
              showSymbolLogo: true,
              colorTheme: "dark",
              isTransparent: false,
              locale: "en",
            }}
          />
        </div>
      </div>

      {/* CRYPTO OVERVIEW */}
      <div>
        <div className="text-base md:text-lg">
          <span className="font-bold">Crypto</span> Overview
        </div>

        {/*Vertical line*/}
        <div className="w-full h-px bg-evolve-green mt-3 mb-2 md:my-4"></div>

        <div id="crypto-container">
          <CryptocurrencyMarket
            widgetProps={{
              width: "100%",
              defaultColumn: "moving_averages",
              screener_type: "crypto_mkt",
              displayCurrency: "USD",
              colorTheme: "dark",
              locale: "en",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Market;