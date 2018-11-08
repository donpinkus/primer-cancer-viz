import React from "react";
import PropTypes from "prop-types";
import { TransitionMotion, spring } from "react-motion";
import * as d3 from "d3";
import _ from "lodash";

// Linear interpolate a value. t takes values between 0.0 & 0.1.
const lerp = (start, end, t) => {
  return start * (1 - t) + end * t;
};

const AvgPointAndLinks = ({
  xScale,
  yScale,
  xAccessor,
  yAccessor,
  data,
  activeHDI,
  hdiColor
}) => {
  // Filter by HDI
  const fData = _.filter(data.countries, d => d.HDI === activeHDI);
  const avgX = xScale(d3.mean(fData, xAccessor));
  const avgY = yScale(d3.mean(fData, yAccessor));

  const renderLinks = animationStep => {
    const links = fData.map(d => {
      const x1 = xScale(xAccessor(d));
      const y1 = yScale(yAccessor(d));

      return (
        <line
          key={d.Name}
          className="Chart-Link"
          stroke={hdiColor}
          strokeWidth="1"
          opacity={0.2}
          x1={x1}
          x2={lerp(x1, avgX, animationStep)}
          y1={y1}
          y2={lerp(y1, avgY, animationStep)}
        />
      );
    });

    return <g>{links}></g>;
  };

  return (
    <g key={activeHDI}>
      <TransitionMotion
        defaultStyles={[{ key: activeHDI, style: { animationStep: 0 } }]}
        styles={[
          {
            key: activeHDI,
            style: {
              animationStep: spring(1, {
                stiffness: 140,
                damping: 25,
                precision: 0.1
              })
            }
          }
        ]}
      >
        {value => {
          const animationStep = value[0].style.animationStep;

          return (
            <g>
              {renderLinks(animationStep)}
              <circle
                className={`Chart-Point Chart-AvgPoint ${animationStep > 0.9 &&
                  "Chart-AvgPoint-Visible"}`}
                cx={avgX}
                cy={avgY}
                r={4}
                fill="white"
                stroke={hdiColor}
                strokeWidth={2}
              />
            </g>
          );
        }}
      </TransitionMotion>
    </g>
  );
};

AvgPointAndLinks.propTypes = {
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  xAccessor: PropTypes.func.isRequired,
  yAccessor: PropTypes.func.isRequired,
  hdiColor: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  activeHDI: PropTypes.string.isRequired
};

export default AvgPointAndLinks;
