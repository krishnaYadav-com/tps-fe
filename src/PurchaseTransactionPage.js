import React from "react";

import {
    Button,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl
} from "@mui/material";

import "./Purchase.css";


class PurchaseTransactionPage extends React.Component {

    constructor(props) {
        super(props);

        const data =
            props.purchaseData || {};

        this.state = {

            transactionDate:
                data.transactionDate ||
                this.getTodayDate(),

            paymentTerms:
                data.paymentTerms || "",

            deliveryMode:
                data.deliveryMode || "",

            deliveryPaymentTerms:
                data.deliveryPaymentTerms || "",

            poDetails:
                data.poDetails || "",

            poNumber:
                data.poNumber || "",

            poDate:
                data.poDate || ""
        };
    }


    getTodayDate = () => {

        const date =
            new Date();

        const year =
            date.getFullYear();

        const month =
            String(
                date.getMonth() + 1
            ).padStart(2, "0");

        const day =
            String(
                date.getDate()
            ).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };


    calculateDueDate = (
        paymentTerms
    ) => {

        if (
            paymentTerms ===
            "Advance"
        ) {
            return null;
        }


        if (
            paymentTerms ===
            "Against Delivery"
        ) {

            return this.state
                .transactionDate;
        }


        const date =
            new Date(
                this.state
                    .transactionDate
            );


        if (
            paymentTerms ===
            "30 Days"
        ) {

            date.setDate(
                date.getDate() + 30
            );

        } else if (
            paymentTerms ===
            "45 Days"
        ) {

            date.setDate(
                date.getDate() + 45
            );
        }


        return date
            .toISOString()
            .split("T")[0];
    };


    handlePaymentTermsChange = (
        event
    ) => {

        this.setState({
            paymentTerms:
                event.target.value
        });
    };


    handleNext = () => {

        if (
            !this.state.paymentTerms
        ) {

            alert(
                "Please select Payment Terms."
            );

            return;
        }


        if (
            !this.state.deliveryMode
        ) {

            alert(
                "Please select Delivery Mode."
            );

            return;
        }


        if (
            !this.state.deliveryPaymentTerms
        ) {

            alert(
                "Please select Delivery Payment Terms."
            );

            return;
        }


        if (
            !this.state.poDetails
        ) {

            alert(
                "Please select PO Details."
            );

            return;
        }


        if (
            this.state.poDetails ===
            "PO Date"
        ) {

            if (
                !this.state.poNumber.trim()
            ) {

                alert(
                    "PO Number is required."
                );

                return;
            }


            if (
                !this.state.poDate
            ) {

                alert(
                    "PO Date is required."
                );

                return;
            }


            if (
                this.state.poDate >
                this.state.transactionDate
            ) {

                alert(
                    "PO Date cannot be a future date."
                );

                return;
            }
        }


        const apiData = {

            paymentTerms:
                this.state.paymentTerms,

            deliveryMode:
                this.state.deliveryMode,

            deliveryPaymentTerms:
                this.state.deliveryPaymentTerms,

            poDetails:
                this.state.poDetails,

            poNumber:
                this.state.poDetails ===
                "PO Date"
                    ? this.state.poNumber
                    : null,

            poDate:
                this.state.poDetails ===
                "PO Date"
                    ? this.state.poDate
                    : null
        };


        this.props.saveStepAndNext(
            apiData,

            {
                transactionDate:
                    this.state.transactionDate,

                paymentTerms:
                    this.state.paymentTerms,

                paymentDueDate:
                    this.calculateDueDate(
                        this.state.paymentTerms
                    ),

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
            }
        );
    };


    render() {

        const dueDate =
            this.calculateDueDate(
                this.state.paymentTerms
            );


        return (

            <div className="purchase-card">

                <h2>
                    Transaction Details
                </h2>


                <div className="purchase-form-grid">

                    <TextField
                        label="Transaction Date"
                        type="date"
                        value={
                            this.state.transactionDate
                        }
                        disabled
                        InputLabelProps={{
                            shrink: true
                        }}
                    />


                    <FormControl fullWidth>

                        <InputLabel>
                            Payment Terms
                        </InputLabel>

                        <Select
                            value={
                                this.state.paymentTerms
                            }
                            label="Payment Terms"
                            onChange={
                                this.handlePaymentTermsChange
                            }
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

                        </Select>

                    </FormControl>


                    <TextField
                        label="Payment Due Date"
                        type="date"
                        value={
                            dueDate || ""
                        }
                        disabled
                        InputLabelProps={{
                            shrink: true
                        }}
                    />


                    <FormControl fullWidth>

                        <InputLabel>
                            Delivery Mode
                        </InputLabel>

                        <Select
                            value={
                                this.state.deliveryMode
                            }
                            label="Delivery Mode"
                            onChange={(event) =>

                                this.setState({
                                    deliveryMode:
                                        event.target.value
                                })

                            }
                        >

                            <MenuItem value="Door Delivery">
                                Door Delivery
                            </MenuItem>

                            <MenuItem value="Through Transport">
                                Through Transport
                            </MenuItem>

                        </Select>

                    </FormControl>


                    <FormControl fullWidth>

                        <InputLabel>
                            Delivery Payment Terms
                        </InputLabel>

                        <Select
                            value={
                                this.state.deliveryPaymentTerms
                            }
                            label="Delivery Payment Terms"
                            onChange={(event) =>

                                this.setState({
                                    deliveryPaymentTerms:
                                        event.target.value
                                })

                            }
                        >

                            <MenuItem value="To Pay">
                                To Pay
                            </MenuItem>

                            <MenuItem value="Paid">
                                Paid
                            </MenuItem>

                        </Select>

                    </FormControl>


                    <FormControl fullWidth>

                        <InputLabel>
                            PO Details
                        </InputLabel>

                        <Select
                            value={
                                this.state.poDetails
                            }
                            label="PO Details"
                            onChange={(event) => {

                                const value =
                                    event.target.value;

                                this.setState({

                                    poDetails:
                                        value,

                                    poNumber:
                                        value === "PO Date"
                                            ? this.state.poNumber
                                            : "",

                                    poDate:
                                        value === "PO Date"
                                            ? this.state.poDate
                                            : ""

                                });

                            }}
                        >

                            <MenuItem value="PO Date">
                                PO Date
                            </MenuItem>

                            <MenuItem value="Verbal">
                                Verbal
                            </MenuItem>

                        </Select>

                    </FormControl>

                </div>


                {this.state.poDetails ===
                    "PO Date" && (

                    <div className="purchase-po-section">

                        <TextField
                            label="PO Number"
                            value={
                                this.state.poNumber
                            }
                            onChange={(event) =>

                                this.setState({
                                    poNumber:
                                        event.target.value
                                })

                            }
                            fullWidth
                        />


                        <TextField
                            label="PO Date"
                            type="date"
                            value={
                                this.state.poDate
                            }
                            onChange={(event) =>

                                this.setState({
                                    poDate:
                                        event.target.value
                                })

                            }
                            inputProps={{
                                max:
                                    this.state
                                        .transactionDate
                            }}
                            InputLabelProps={{
                                shrink: true
                            }}
                            fullWidth
                        />

                    </div>

                )}


                <div className="purchase-button-row">

                    <div />

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

export default PurchaseTransactionPage;