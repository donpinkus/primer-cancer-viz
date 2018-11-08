import React from "react";
import PropTypes from "prop-types";

const Tooltip = ({ x, y, point }) => {
  return (
    <div
      className="Tooltip"
      style={{
        top: y,
        left: x
      }}
    >
      <div className="Tooltip-Title">{point.Name}</div>
      <div className="Tooltip-Row">
        New cases in 2008 <span>{Number(point.Cases).toLocaleString()}</span>
      </div>
      <div className="Tooltip-Row">
        Cases per 100k <span>{Math.round(point.Incidence)}</span>
      </div>
      <div className="Tooltip-Row">
        Deaths per 100 cases <span>{Math.round(point.Mortality)}</span>
      </div>
      <div className="Tooltip-Arrow" />
    </div>
  );
};

Tooltip.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  point: PropTypes.object.isRequired
};

export default Tooltip;
