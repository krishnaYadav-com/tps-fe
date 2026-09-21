import React from "react";

import {
    Stepper,
    Step,
    StepLabel
} from "@mui/material";


class SalesProgress extends React.Component {

    render() {

        const steps = [

            "Transaction Details",

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
                    borderRadius: "10px",
                    border:
                        "1px solid #e2e8f0"
                }}
            >

                <Stepper
                    activeStep={
                        this.props.step - 1
                    }
                >

                    {
                        steps.map(
                            (label) => (

                                <Step
                                    key={label}
                                >

                                    <StepLabel>
                                        {label}
                                    </StepLabel>

                                </Step>

                            )
                        )
                    }

                </Stepper>

            </div>

        );

    }

}

export default SalesProgress;