import React from "react";

import "./Purchase.css";

class PurchaseProgress extends React.Component {

    renderStep = (number, label) => {

        const active =
            this.props.step >= number;

        return (
            <div
                className={
                    active
                        ? "purchase-step active"
                        : "purchase-step"
                }
            >

                <div className="purchase-step-number">
                    {number}
                </div>

                <div className="purchase-step-label">
                    {label}
                </div>

            </div>
        );
    };

    render() {

        return (

            <div className="purchase-progress">

                {this.renderStep(
                    1,
                    "Transaction"
                )}

                <div className="purchase-progress-line" />

                {this.renderStep(
                    2,
                    "Supplier"
                )}

                <div className="purchase-progress-line" />

                {this.renderStep(
                    3,
                    "Items"
                )}

                <div className="purchase-progress-line" />

                {this.renderStep(
                    4,
                    "Summary"
                )}

            </div>
        );
    }
}

export default PurchaseProgress;