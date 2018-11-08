import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Stepper = ({ steps, value, onChange }) => {
  return (
    <ol className="Stepper">
      {_.times(steps, i => {
        // _.times is 0-indexed, our steps are 1-indexed.
        const step = i + 1;

        return (
          <li
            key={i}
            className={`Stepper-Step ${value === step &&
              "Stepper-Step--Active"}`}
            onClick={() => onChange(step)}
          >
            {step}
          </li>
        );
      })}
      <li
        className="Stepper-Step Stepper-Step-Next"
        onClick={() => onChange(value < steps ? value + 1 : 1)}
      >
        next &nbsp; &nbsp;
        <img src="next-arrow.png" width={8} height={10} alt="Next Step" />
      </li>
    </ol>
  );
};

Stepper.propTypes = {
  steps: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Stepper;
