// MyBarChart.js
import React from "react";
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
    const color = this.props.color;
    const chartWidth = 650;
    const chartHeight = 450;
    const chartDomain = [0, 100];
    return (
      <XYPlot
        xType="ordinal"
        width={chartWidth}
        height={chartHeight}
        yDomain={chartDomain}
        color={color}
      >
                        <XAxis />
                        <YAxis />
                        <VerticalBarSeries data={data} />
                        <LabelSeries
          data={data.map((obj) => {
            return { ...obj, label: obj.y };
          })}
          labelAnchorX="middle"
          labelAnchorY="text-after-edge"
        />
                    
      </XYPlot>
    );
  }
}

export default MyBarChart;