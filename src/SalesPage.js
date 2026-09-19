import React from "react";

import SalesProgress from "./SalesProgress";

import SalesTransactionPage from "./SalesTransactionPage";
import SalesPartyPage from "./SalesPartyPage";
import SalesItemPage from "./SalesItemPage";
import SalesSummaryPage from "./SalesSummaryPage";


class SalesPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            step: 1,

            salesData: {

                invoiceNo: "",

                transactionDate: "",

                transactionType: "SALES",

                paymentTerms: "",

                paymentDueDate: null,

                deliveryMode: "",

                deliveryPaymentTerms: "",

                poDetails: "",

                poNumber: "",
                poDate: "",

                party: null,

                items: [],

                subtotal: 0,
                gstAmount: 0,
                totalAmount: 0
            }
        };
    }


    updateSalesData = (data) => {

        this.setState({

            salesData: {

                ...this.state.salesData,

                ...data

            }

        });

    };


    nextStep = () => {

        this.setState({

            step: this.state.step + 1

        });

    };


    previousStep = () => {

        if (this.state.step > 1) {

            this.setState({

                step: this.state.step - 1

            });

        }

    };


    render() {

        switch (this.state.step) {

            case 1:

                return (

                    <div>

                        <SalesProgress
                            step={this.state.step}
                        />

                        <SalesTransactionPage
                            salesData={this.state.salesData}
                            updateSalesData={
                                this.updateSalesData
                            }
                            nextStep={
                                this.nextStep
                            }
                        />

                    </div>

                );


            case 2:

                return (

                    <div>

                        <SalesProgress
                            step={this.state.step}
                        />

                        <SalesPartyPage
                            salesData={this.state.salesData}
                            updateSalesData={
                                this.updateSalesData
                            }
                            nextStep={
                                this.nextStep
                            }
                            previousStep={
                                this.previousStep
                            }
                        />

                    </div>

                );


            case 3:

                return (

                    <div>

                        <SalesProgress
                            step={this.state.step}
                        />

                        <SalesItemPage
                            salesData={this.state.salesData}
                            updateSalesData={
                                this.updateSalesData
                            }
                            nextStep={
                                this.nextStep
                            }
                            previousStep={
                                this.previousStep
                            }
                        />

                    </div>

                );


            case 4:

                return (

                    <div>

                        <SalesProgress
                            step={this.state.step}
                        />

                        <SalesSummaryPage
                            salesData={this.state.salesData}
                            previousStep={
                                this.previousStep
                            }
                        />

                    </div>

                );


            default:
                return null;
        }
    }
}

export default SalesPage;