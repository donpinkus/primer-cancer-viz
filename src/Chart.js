import React from "react";
import * as d3 from "d3";
import PropTypes from "prop-types";

import data from "./data";

import Tooltip from "./Tooltip";
import AvgPointAndLinks from "./AvgPointAndLinks";

const hdiColors = {
  Low: "#B2434B",
  Medium: "#CF764D",
  High: "#469162",
  "Very High": "#49A1C9"
};

class Chart extends React.Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    activeHDI: PropTypes.string
  };

  state = {
    hoveredPoint: null
  };

  constructor(props) {
    super(props);

    this.containerWidth = this.props.width;
    this.containerHeight = 625;

    // Could have used more standard left, right, top, bottom. But didn't need to vary here.
    this.margin = {
      horizontal: 25,
      vertical: 20
    };

    this.width = this.containerWidth - this.margin.horizontal * 2;
    this.height = this.containerHeight - this.margin.vertical * 2;

    this.xAccessor = d => d.Incidence;
    this.yAccessor = d => d["MI Ratio"];

    this.xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data.countries, this.xAccessor)])
      .range([0, this.width]);

    this.yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data.countries, this.yAccessor)])
      .range([this.height, 0]);

    // TODO: UX Improvement - update the voronoi when particular points are active.
    this.voronoi = d3
      .voronoi()
      .x(d => this.xScale(this.xAccessor(d)))
      .y(d => this.yScale(this.yAccessor(d)))
      .extent([[0, 0], [this.width, this.height]])(data.countries);
  }

  handleMouseMove = e => {
    // Our scatter plot points are translated by the margin,
    // but our mouseMove handler is on the untranslated SVG element.
    // So account for the translation when looking up the hovered point.
    const hoveredPoint = this.voronoi.find(
      e.nativeEvent.offsetX - this.margin.horizontal,
      e.nativeEvent.offsetY - this.margin.vertical,
      25
    );

    this.setState({ hoveredPoint });
  };

  handleMouseLeave = () => {
    this.setState({ hoveredPoint: null });
  };

  render() {
    // Show tooltip if a point is hovered.
    // If there is an activeHDI, only show tooltip it matches the HDI.
    const showTooltip =
      this.state.hoveredPoint &&
      (!this.props.activeHDI ||
        this.props.activeHDI === this.state.hoveredPoint.data.HDI);

    return (
      <div className="Chart">
        {showTooltip && (
          <Tooltip
            x={this.state.hoveredPoint[0] + this.margin.horizontal}
            y={this.state.hoveredPoint[1] + this.margin.vertical}
            point={this.state.hoveredPoint.data}
            margin={this.margin}
          />
        )}

        <svg
          width={this.containerWidth}
          height={this.containerHeight}
          onMouseMove={this.handleMouseMove}
          onMouseLeave={this.handleMouseLeave}
        >
          <g
            transform={`translate(${this.margin.horizontal}, ${
              this.margin.vertical
            })`}
          >
            {this.props.activeHDI && (
              <AvgPointAndLinks
                xScale={this.xScale}
                yScale={this.yScale}
                xAccessor={this.xAccessor}
                yAccessor={this.yAccessor}
                data={data}
                activeHDI={this.props.activeHDI}
                hdiColor={hdiColors[this.props.activeHDI]}
              />
            )}
            {data.countries.map(d => (
              <circle
                key={d.Name}
                className={`Chart-Point
                  ${
                    this.props.activeHDI && d.HDI !== this.props.activeHDI
                      ? "Chart-Point-Inactive "
                      : ""
                  }
                  ${
                    this.state.hoveredPoint &&
                    this.state.hoveredPoint.data.Name === d.Name
                      ? "Chart-Point-Hovered"
                      : ""
                  }
                `}
                cx={this.xScale(this.xAccessor(d))}
                cy={this.yScale(this.yAccessor(d))}
                r={5}
                fill={hdiColors[d.HDI]}
                stroke="white"
                strokeWidth={1}
              />
            ))}
          </g>
        </svg>
      </div>
    );
  }
}

export default Chart;
