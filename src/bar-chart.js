// MyBarChart.js
import React from "react";
import "./bar-chart.css";

import {
  XYPlot,
  XAxis, // Shows the values on x axis
  YAxis, // Shows the values on y axis
  VerticalBarSeries,
  LabelSeries,
} from "react-vis";

class MyBarChart extends React.Component {
  render() {
    const data = this.props.data;
    const chartWidth = 450;
    const chartHeight = 375;
    const chartDomain = [0, 100];
    return (
      <div className="bar-chart">
      <XYPlot
        xType="ordinal"
        width={chartWidth}
        height={chartHeight}
        yDomain={chartDomain}
      >
                        <XAxis />
                        <YAxis />
                        <VerticalBarSeries data={data} colorType="literal" />
                        <LabelSeries
          data={data.map((obj) => {
            return { ...obj, label: obj.y };
          })}
          labelAnchorX="middle"
          labelAnchorY="text-after-edge"
        />
                    
      </XYPlot>
      </div>
    );
  }
}

export default MyBarChart;