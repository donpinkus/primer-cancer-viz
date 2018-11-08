import React from "react";
import stepTextContent from "./StepTextContent";
import Stepper from "./Stepper";
import Chart from "./Chart";

class CancerGraphic extends React.Component {
  state = {
    step: 1
  };

  setStep = step => {
    this.setState({ step });
  };

  width = 945;

  render() {
    const { step } = this.state;
    const content = stepTextContent[step - 1];

    return (
      <div className="CancerGraphic" style={{ width: this.width }}>
        <Chart activeHDI={content.activeHDI} width={this.width} />
        <Stepper steps={6} value={step} onChange={this.setStep} />
        <h1 className="Title">{content.title}</h1>
        <p className="Blurb">{content.blurb}</p>
      </div>
    );
  }
}

export default CancerGraphic;
