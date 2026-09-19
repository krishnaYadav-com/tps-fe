import React from "react";

import {
    Stepper,
    Step,
    StepLabel
} from "@mui/material";


class SalesProgress extends React.Component {

    render() {

        const steps = [
            "Transaction",
            "Party Selection",
            "Item Selection",
            "Summary"
        ];

        return (

            <div
                style={{
                    backgroundColor: "#ffffff",
                    padding: "20px",
                    marginBottom: "20px",
                    borderRadius: "10px"
                }}
            >

                <Stepper
                    activeStep={this.props.step - 1}
                >

                    {
                        steps.map((label) => (

                            <Step key={label}>

                                <StepLabel>
                                    {label}
                                </StepLabel>

                            </Step>

                        ))
                    }

                </Stepper>

            </div>

        );
    }
}

export default SalesProgress;