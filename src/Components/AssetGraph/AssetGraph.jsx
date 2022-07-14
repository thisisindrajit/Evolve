import React from "react";
import Chart from "react-apexcharts";
import "../box.css";
import { connect } from "react-redux";
import { currency } from "../../Utils/constants";

const AssetGraph = (props) => {
  let isDataLoaded =
    props.stockLoading +
    props.cryptoLoading +
    props.bondLoading +
    props.othersLoading;
  let purpricearr = [
    parseFloat(props.stockPurchasePrice),
    parseFloat(props.cryptoPurchasePrice),
    parseFloat(props.bondPurchasePrice),
    parseFloat(props.othersPurchasePrice),
  ];

  const chartOptions = {
    plotOptions: {
      pie: {
        donut: {
          size: "60%",
        },
      },
    },
    stroke: {
      show: false,
    },

    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "gradient",
    },
    tooltip: {
      y: {
        formatter: function (value) {
          return currency + value;
        },
      },
    },
    legend: {
      show: true,
      showForSingleSeries: false,
      showForNullSeries: true,
      showForZeroSeries: true,
      position: "right",
      floating: false,
      fontSize: "15px",
      tooltipHoverFormatter: undefined,
      fontFamily: "Inter",
      fontWeight: "300",
      offsetX: 0,
      offsetY: 4,
      labels: {
        colors: ["#fff"],
        useSeriesColors: false,
      },
      itemMargin: {
        vertical: 5,
      },
    },
    labels: ["Stocks", "Crypto", "Bonds", "Other Assets"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 250,
            height: 600,
          },
          legend: {
            position: "bottom",
            offsetX: -18,
            fontSize: "14px",
          },
          labels: ["Stocks", "Crypto", "Bonds", "Other Assets"],
        },
      },
    ],
  };

  return (
    <div className="flex flex-col rounded-lg p-4" style={props.gradient}>
      <span className="text-sm sm:text-base xl:text-lg font-bold">
        Assets distribution
      </span>
      <div className="m-auto mt-6 mb-2">
        {isDataLoaded === 0 ? (
          purpricearr.reduce((a, b) => a + b) !== 0 ? (
            <Chart
              options={chartOptions}
              series={purpricearr}
              type="donut"
              width="375"
            />
          ) : (
            <div className="text-sm xl:text-base my-6">No assets!</div>
          )
        ) : (
          <div className="text-sm xl:text-base my-6">Loading chart...</div>
        )}
      </div>
    </div>
  );
};

// these are the functions which are required to map the state to the props and dispatch actions to store

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(AssetGraph);
