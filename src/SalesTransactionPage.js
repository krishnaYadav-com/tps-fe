import React from "react";

import {
    Button,
    TextField,
    MenuItem
} from "@mui/material";


class SalesTransactionPage extends React.Component {

    constructor(props) {
        super(props);

        const today = this.getTodayDate();

        this.state = {

            transactionDate:
                this.props.salesData.transactionDate ||
                today,

            paymentTerms:
                this.props.salesData.paymentTerms || "",

            paymentDueDate:
                this.props.salesData.paymentDueDate ||
                null,

            deliveryMode:
                this.props.salesData.deliveryMode || "",

            deliveryPaymentTerms:
                this.props.salesData.deliveryPaymentTerms || "",

            poDetails:
                this.props.salesData.poDetails || "",

            poNumber:
                this.props.salesData.poNumber || "",

            poDate:
                this.props.salesData.poDate ||
                today
        };
    }


    getTodayDate = () => {

        const today = new Date();

        const year = today.getFullYear();

        const month =
            String(today.getMonth() + 1)
                .padStart(2, "0");

        const day =
            String(today.getDate())
                .padStart(2, "0");

        return `${year}-${month}-${day}`;
    };


    calculateDueDate = (paymentTerms) => {

        const invoiceDate =
            this.state.transactionDate;


        if (paymentTerms === "Advance") {

            return null;

        }


        if (paymentTerms === "Against Delivery") {

            return invoiceDate;

        }


        if (paymentTerms === "30 Days") {

            return this.addDays(invoiceDate, 30);

        }


        if (paymentTerms === "45 Days") {

            return this.addDays(invoiceDate, 45);

        }


        return null;
    };


    addDays = (dateString, days) => {

        const dateParts =
            dateString.split("-");

        const date = new Date(

            Number(dateParts[0]),
            Number(dateParts[1]) - 1,
            Number(dateParts[2])

        );


        date.setDate(
            date.getDate() + days
        );


        const year =
            date.getFullYear();

        const month =
            String(date.getMonth() + 1)
                .padStart(2, "0");

        const day =
            String(date.getDate())
                .padStart(2, "0");


        return `${year}-${month}-${day}`;
    };


    handlePaymentTermsChange = (event) => {

        const paymentTerms =
            event.target.value;


        const paymentDueDate =
            this.calculateDueDate(
                paymentTerms
            );


        this.setState({

            paymentTerms:
                paymentTerms,

            paymentDueDate:
                paymentDueDate

        });

    };


    handleDeliveryModeChange = (event) => {

        this.setState({

            deliveryMode:
                event.target.value

        });

    };


    handleDeliveryPaymentTermsChange =
        (event) => {

            this.setState({

                deliveryPaymentTerms:
                    event.target.value

            });

        };


    handlePODetailsChange = (event) => {

        const poDetails =
            event.target.value;


        this.setState({

            poDetails: poDetails,

            poNumber:
                poDetails === "Verbal"
                    ? ""
                    : this.state.poNumber,

            poDate:
                poDetails === "Verbal"
                    ? ""
                    : (
                        this.state.poDate ||
                        this.state.transactionDate
                    )

        });

    };


    handlePODateChange = (event) => {

        this.setState({

            poDate:
                event.target.value

        });

    };


    handlePONumberChange = (event) => {

        this.setState({

            poNumber:
                event.target.value

        });

    };


    handleNext = () => {

        if (!this.state.paymentTerms) {

            alert(
                "Please select Payment Terms."
            );

            return;
        }


        if (!this.state.deliveryMode) {

            alert(
                "Please select Delivery Mode."
            );

            return;
        }


        if (!this.state.deliveryPaymentTerms) {

            alert(
                "Please select Delivery Payment Terms."
            );

            return;
        }


        if (!this.state.poDetails) {

            alert(
                "Please select PO Details."
            );

            return;
        }


        if (
            this.state.poDetails === "PO Date" &&
            !this.state.poNumber
        ) {

            alert(
                "Please enter PO Number."
            );

            return;
        }


        if (
            this.state.poDetails === "PO Date" &&
            !this.state.poDate
        ) {

            alert(
                "Please select PO Date."
            );

            return;
        }


        this.props.updateSalesData({

            transactionDate:
                this.state.transactionDate,

            paymentTerms:
                this.state.paymentTerms,

            paymentDueDate:
                this.state.paymentDueDate,

            deliveryMode:
                this.state.deliveryMode,

            deliveryPaymentTerms:
                this.state.deliveryPaymentTerms,

            poDetails:
                this.state.poDetails,

            poNumber:
                this.state.poNumber,

            poDate:
                this.state.poDate

        });


        this.props.nextStep();

    };


    render() {

        const isPODateSelected =
            this.state.poDetails === "PO Date";


        return (

            <div className="sales-card">

                <h2>
                    Transaction Details
                </h2>


                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "1fr 1fr",
                        gap: "20px",
                        marginTop: "25px"
                    }}
                >

                    {/* Invoice Date */}

                    <TextField
                        label="Invoice Date"
                        type="date"
                        value={
                            this.state.transactionDate
                        }
                        InputLabelProps={{
                            shrink: true
                        }}
                        disabled
                        fullWidth
                    />


                    {/* Payment Terms */}

                    <TextField
                        select
                        label="Payment Terms"
                        value={
                            this.state.paymentTerms
                        }
                        onChange={
                            this.handlePaymentTermsChange
                        }
                        fullWidth
                    >

                        <MenuItem value="Advance">
                            Advance
                        </MenuItem>

                        <MenuItem value="Against Delivery">
                            Against Delivery
                        </MenuItem>

                        <MenuItem value="30 Days">
                            30 Days
                        </MenuItem>

                        <MenuItem value="45 Days">
                            45 Days
                        </MenuItem>

                    </TextField>


                    {/* Payment Due Date */}

                    <TextField
                        label="Payment Due Date"
                        type="date"
                        value={
                            this.state.paymentDueDate || ""
                        }
                        InputLabelProps={{
                            shrink: true
                        }}
                        disabled
                        fullWidth
                    />


                    {/* Delivery Mode */}

                    <TextField
                        select
                        label="Delivery Mode"
                        value={
                            this.state.deliveryMode
                        }
                        onChange={
                            this.handleDeliveryModeChange
                        }
                        fullWidth
                    >

                        <MenuItem value="Door Delivery">
                            Door Delivery
                        </MenuItem>

                        <MenuItem value="Through Transport">
                            Through Transport
                        </MenuItem>

                    </TextField>


                    {/* Delivery Payment Terms */}

                    <TextField
                        select
                        label="Delivery Payment Terms"
                        value={
                            this.state.deliveryPaymentTerms
                        }
                        onChange={
                            this
                                .handleDeliveryPaymentTermsChange
                        }
                        fullWidth
                    >

                        <MenuItem value="To Pay">
                            To Pay
                        </MenuItem>

                        <MenuItem value="Paid">
                            Paid
                        </MenuItem>

                    </TextField>


                    {/* PO Details */}

                    <TextField
                        select
                        label="PO Details"
                        value={
                            this.state.poDetails
                        }
                        onChange={
                            this.handlePODetailsChange
                        }
                        fullWidth
                    >

                        <MenuItem value="PO Date">
                            PO Date
                        </MenuItem>

                        <MenuItem value="Verbal">
                            Verbal
                        </MenuItem>

                    </TextField>


                    {/* PO Number */}

                    <TextField
                        label="PO Number"
                        value={
                            this.state.poNumber
                        }
                        onChange={
                            this.handlePONumberChange
                        }
                        disabled={
                            !isPODateSelected
                        }
                        fullWidth
                    />


                    {/* PO Date */}

                    <TextField
                        label="PO Date"
                        type="date"
                        value={
                            this.state.poDate
                        }
                        onChange={
                            this.handlePODateChange
                        }
                        InputLabelProps={{
                            shrink: true
                        }}
                        disabled={
                            !isPODateSelected
                        }
                        fullWidth
                    />

                </div>


                <div
                    style={{
                        marginTop: "30px",
                        display: "flex",
                        justifyContent: "flex-end"
                    }}
                >

                    <Button
                        variant="contained"
                        onClick={
                            this.handleNext
                        }
                    >
                        Next
                    </Button>

                </div>

            </div>

        );
    }
}

export default SalesTransactionPage;