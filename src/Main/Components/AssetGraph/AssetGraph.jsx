import React, { Component } from 'react';
import Chart from 'react-apexcharts'
import "../box.css";
import "./assetgraph.css";
import { connect } from 'react-redux';
class AssetGraph extends Component {

  constructor(props) {
    super(props);

    this.state = {
      options: {
        plotOptions: {
          pie: {
            donut: {
              size: '55%',
            },
          }
        },
        stroke: {
          show: false
        },

        dataLabels: {
          enabled: false
        },
        fill: {
          type: 'gradient',
        },
        tooltip:{
          y: {
            formatter: function(value) {
              return "₹" + value;
            }
          }
        },
        legend: {
          show: true,
          showForSingleSeries: false,
          showForNullSeries: true,
          showForZeroSeries: true,
          position: 'right',
          floating: false,
          fontSize: '16px',
          fontFamily: "HelveticaNeueCyr, HelveticaNeue-Light, 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', 'sans-serif'",
          fontWeight: 400,
          tooltipHoverFormatter: undefined,
          offsetX: 0,
          offsetY: 0,
          labels: {
            colors: ["#fff"],
            useSeriesColors: false
          },
          itemMargin: {
            vertical: 5
        },
        },
        labels: ['Stocks', 'Crypto', 'Bonds', 'Other Assets']
      }
    }
  }

  render() {

    let isDataLoaded = this.props.stockLoading + this.props.cryptoLoading + this.props.bondLoading + this.props.othersLoading;
    let purpricearr = [parseFloat(this.props.stockPurchasePrice),parseFloat(this.props.cryptoPurchasePrice),parseFloat(this.props.bondPurchasePrice),parseFloat(this.props.othersPurchasePrice)];

    // console.log(this.props.isDataLoaded);
    // console.log(this.props.purchasePrice);
    return (
      <div className="box assetgraph" style={this.props.gradient}>
        <span className="title">Purchase Price Distribution</span>
        <div id="chart-holder">
        {isDataLoaded === 0 ? purpricearr.reduce((a,b) => a + b) !== 0 ? <Chart options={this.state.options} series={purpricearr} type="donut" width="400" /> : <span id="chart-status">No assets!</span> : <span id="chart-status">Loading chart...</span>}
        </div>
      </div>
    );
  }
}

// these are the functions which are required to map the state to the props and dispatch actions to store

const mapStateToProps = state => ({
  ...state
});

export default connect(mapStateToProps)(AssetGraph);