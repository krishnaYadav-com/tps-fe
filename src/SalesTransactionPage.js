import React from "react";

import {
    Button,
    TextField,
    MenuItem,
    Card,
    CardContent,
    Typography,
    Divider
} from "@mui/material";


class SalesTransactionPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            transactionDate:
                this.props.salesData.transactionDate || "",

            paymentTerms:
                this.props.salesData.paymentTerms || "",

            paymentDueDate:
                this.props.salesData.paymentDueDate || null,

            deliveryMode:
                this.props.salesData.deliveryMode || "",

            deliveryPaymentTerms:
                this.props.salesData.deliveryPaymentTerms || "",

            poDetails:
                this.props.salesData.poDetails || "",

            poNumber:
                this.props.salesData.poNumber || "",

            poDate:
                this.props.salesData.poDate || ""

        };

    }


    getTodayDate = () => {

        const today =
            new Date();

        const year =
            today.getFullYear();

        const month =
            String(
                today.getMonth() + 1
            ).padStart(2, "0");

        const day =
            String(
                today.getDate()
            ).padStart(2, "0");

        return (
            `${year}-${month}-${day}`
        );

    };


    addDays = (
        dateString,
        days
    ) => {

        const parts =
            dateString.split("-");

        const date =
            new Date(

                Number(parts[0]),

                Number(parts[1]) - 1,

                Number(parts[2])

            );


        date.setDate(
            date.getDate() + days
        );


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


        return (
            `${year}-${month}-${day}`
        );

    };


    calculateDueDate = (
        paymentTerms
    ) => {

        const invoiceDate =
            this.state.transactionDate;


        if (!invoiceDate) {

            return null;

        }


        switch (paymentTerms) {

            case "Advance":

                return null;


            case "Against Delivery":

                return invoiceDate;


            case "30 Days":

                return this.addDays(
                    invoiceDate,
                    30
                );


            case "45 Days":

                return this.addDays(
                    invoiceDate,
                    45
                );


            default:

                return null;

        }

    };


    handlePaymentTermsChange = (
        event
    ) => {

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
            this.state.poDetails ===
            "PO Date"
        ) {

            if (!this.state.poNumber) {

                alert(
                    "Please enter PO Number."
                );

                return;

            }


            if (!this.state.poDate) {

                alert(
                    "Please select PO Date."
                );

                return;

            }


            if (
                this.state.poDate >
                this.state.transactionDate
            ) {

                alert(
                    "PO Date cannot be after Invoice Date."
                );

                return;

            }

        }


        /*
         * Backend receives these values.
         *
         * Do not depend on paymentDueDate
         * sent from FE for final calculation.
         */

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
                this.state.poNumber,

            poDate:
                this.state.poDate

        };


        const localData = {

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

        };


        this.props.saveStepAndNext(

            apiData,

            localData

        );

    };


    handlePODetailsChange = (
        event
    ) => {

        const poDetails =
            event.target.value;


        this.setState({

            poDetails:
                poDetails,

            poNumber:
                poDetails === "Verbal"
                    ? ""
                    : this.state.poNumber,

            poDate:
                poDetails === "Verbal"
                    ? ""
                    : this.state.poDate

        });

    };


    render() {

        const isPODateSelected =
            this.state.poDetails ===
            "PO Date";


        return (

            <div className="sales-card">

                <Typography
                    variant="h5"
                    style={{
                        fontWeight: 600,
                        color: "#1e293b"
                    }}
                >
                    Transaction Details
                </Typography>

                <Typography
                    variant="body2"
                    style={{
                        color: "#64748b",
                        marginTop: "5px",
                        marginBottom: "25px"
                    }}
                >
                    Enter the basic information for this sales
                    transaction.
                </Typography>


                <Card
                    elevation={0}
                    style={{
                        border:
                            "1px solid #e2e8f0",
                        borderRadius: "10px"
                    }}
                >

                    <CardContent>

                        <Typography
                            variant="h6"
                            style={{
                                fontWeight: 600,
                                color: "#1e293b"
                            }}
                        >
                            Transaction Information
                        </Typography>


                        <Divider
                            style={{
                                marginTop: "15px",
                                marginBottom: "25px"
                            }}
                        />


                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "1fr 1fr",
                                gap: "20px"
                            }}
                        >

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


                            <TextField
                                select
                                label="Delivery Mode"
                                value={
                                    this.state.deliveryMode
                                }
                                onChange={(event) =>
                                    this.setState({

                                        deliveryMode:
                                            event.target.value

                                    })
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


                            <TextField
                                select
                                label="Delivery Payment Terms"
                                value={
                                    this.state.deliveryPaymentTerms
                                }
                                onChange={(event) =>
                                    this.setState({

                                        deliveryPaymentTerms:
                                            event.target.value

                                    })
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
                                disabled={
                                    !isPODateSelected
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
                                InputLabelProps={{
                                    shrink: true
                                }}
                                inputProps={{
                                    max:
                                        this.state.transactionDate ||
                                        this.getTodayDate()
                                }}
                                disabled={
                                    !isPODateSelected
                                }
                                fullWidth
                            />

                        </div>

                    </CardContent>

                </Card>


                <div
                    style={{
                        marginTop: "25px",
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