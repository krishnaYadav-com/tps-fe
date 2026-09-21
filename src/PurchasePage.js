import React from "react";
import axios from "axios";

import {
    Card,
    CardContent,
    Typography
} from "@mui/material";

import PurchaseProgress from "./PurchaseProgress";
import PurchaseTransactionPage from "./PurchaseTransactionPage";
import PurchaseSupplierPage from "./PurchaseSupplierPage";
import PurchaseItemPage from "./PurchaseItemPage";
import PurchaseSummaryPage from "./PurchaseSummaryPage";

import "./Purchase.css";


class PurchasePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            loading: true,

            error: "",

            step: 1,

            purchaseData: {

                transactionId: null,

                transactionNo: "",

                transactionDate: "",

                transactionType: "PURCHASE",

                paymentTerms: "",

                paymentDueDate: null,

                deliveryMode: "",

                deliveryPaymentTerms: "",

                poDetails: "",

                poNumber: "",

                poDate: "",

                supplier: null,

                items: [],

                subtotal: 0,

                gstAmount: 0,

                totalAmount: 0

            }
        };
    }


    getTransactionIdFromUrl = () => {

        const parts =
            window.location.pathname
                .split("/")
                .filter(Boolean);

        return parts[parts.length - 1];
    };


    componentDidMount() {

        const transactionId =
            this.getTransactionIdFromUrl();

        if (!transactionId) {

            this.setState({
                loading: false,
                error:
                    "Transaction ID is missing."
            });

            return;
        }

        this.claimTransaction(transactionId);
    }


    claimTransaction = (transactionId) => {

        this.setState({
            loading: true,
            error: ""
        });


        axios.get(
            `http://localhost:8080/purchase/claim/${transactionId}`
        )
            .then((response) => {

                console.log(
                    "Claimed Purchase transaction:",
                    response.data
                );


                const data =
                    response.data;


                const transaction =
                    data.transaction || data;


                const details =
                    data.details ||
                    data.items ||
                    [];


                const supplier =
                    data.party ||
                    data.supplier ||
                    null;


                const items =
                    details.map((detail) => {

                        return {

                            itemCode:
                                detail.itemCode,

                            itemName:
                                detail.itemName,

                            unitOfMeasure:
                                detail.unitOfMeasure,

                            hsn:
                                detail.hsn,

                            quantity:
                                detail.quantity,

                            rate:
                                detail.rate,

                            gstPer:
                                detail.gstPer,

                            subAmount:
                                detail.subAmount,

                            taxAmount:
                                detail.taxAmount,

                            inclusiveAmount:
                                detail.inclusiveAmount

                        };
                    });


                this.setState({

                    loading: false,

                    error: "",

                    step:
                        transaction.currentStep || 1,

                    purchaseData: {

                        transactionId:
                            transaction.transactionId,

                        transactionNo:
                            transaction.transactionNo || "",

                        transactionDate:
                            transaction.transactionDate || "",

                        transactionType:
                            transaction.transactionType ||
                            "PURCHASE",

                        paymentTerms:
                            transaction.paymentTerms || "",

                        paymentDueDate:
                            transaction.paymentDueDate ||
                            null,

                        deliveryMode:
                            transaction.deliveryMode ||
                            "",

                        deliveryPaymentTerms:
                            transaction.deliveryPaymentTerms ||
                            "",

                        poDetails:
                            transaction.poDetails || "",

                        poNumber:
                            transaction.poNumber || "",

                        poDate:
                            transaction.poDate || "",

                        supplier:
                            supplier,

                        items:
                            items,

                        subtotal:
                            transaction.subtotal || 0,

                        gstAmount:
                            transaction.gstAmount || 0,

                        totalAmount:
                            transaction.totalAmount || 0

                    }

                });

            })
            .catch((error) => {

                console.log(
                    "Unable to claim Purchase transaction:",
                    error
                );


                let message =
                    "Unable to load Purchase transaction.";


                if (
                    error.response &&
                    error.response.data
                ) {

                    if (
                        typeof error.response.data ===
                        "string"
                    ) {

                        message =
                            error.response.data;

                    } else if (
                        error.response.data.message
                    ) {

                        message =
                            error.response.data.message;
                    }
                }


                this.setState({

                    loading: false,

                    error: message

                });

            });
    };


    saveStepAndNext = (
        apiData,
        localData = {}
    ) => {

        const currentStep =
            this.state.step;


        if (
            !this.state.purchaseData
                .transactionId
        ) {

            alert(
                "Transaction ID is missing."
            );

            return;
        }


        const request = {

            transactionId:
                this.state.purchaseData
                    .transactionId,

            step:
                currentStep,

            data:
                apiData
        };


        axios.post(

            "http://localhost:8080/purchase/next",

            request

        )
            .then((response) => {

                console.log(
                    "Purchase step response:",
                    response.data
                );


                const transaction =
                    response.data;


                this.setState({

                    step:
                        transaction.currentStep,

                    purchaseData: {

                        ...this.state.purchaseData,

                        ...localData,

                        transactionId:
                            transaction.transactionId,

                        transactionNo:
                            transaction.transactionNo ||
                            this.state.purchaseData
                                .transactionNo,

                        transactionDate:
                            transaction.transactionDate,

                        transactionType:
                            transaction.transactionType,

                        paymentTerms:
                            transaction.paymentTerms,

                        paymentDueDate:
                            transaction.paymentDueDate,

                        deliveryMode:
                            transaction.deliveryMode,

                        deliveryPaymentTerms:
                            transaction.deliveryPaymentTerms,

                        poDetails:
                            transaction.poDetails,

                        poNumber:
                            transaction.poNumber,

                        poDate:
                            transaction.poDate,

                        subtotal:
                            transaction.subtotal,

                        gstAmount:
                            transaction.gstAmount,

                        totalAmount:
                            transaction.totalAmount

                    }

                });

            })
            .catch((error) => {

                console.log(
                    "Error while processing Purchase step:",
                    error
                );


                let message =
                    "Unable to process transaction.";


                if (
                    error.response &&
                    error.response.data
                ) {

                    if (
                        typeof error.response.data ===
                        "string"
                    ) {

                        message =
                            error.response.data;

                    } else if (
                        error.response.data.message
                    ) {

                        message =
                            error.response.data.message;
                    }
                }


                alert(message);

            });
    };


    previousStep = () => {

        if (this.state.step > 1) {

            this.setState({

                step:
                    this.state.step - 1

            });
        }
    };


    render() {

        if (this.state.loading) {

            return (

                <div className="purchase-card">

                    <Card>

                        <CardContent>

                            <Typography variant="h6">

                                Loading Purchase Transaction...

                            </Typography>

                        </CardContent>

                    </Card>

                </div>
            );
        }


        if (this.state.error) {

            return (

                <div className="purchase-card">

                    <Card>

                        <CardContent>

                            <Typography
                                variant="h6"
                                color="error"
                            >
                                {this.state.error}
                            </Typography>

                        </CardContent>

                    </Card>

                </div>
            );
        }


        switch (this.state.step) {

            case 1:

                return (

                    <div>

                        <PurchaseProgress
                            step={1}
                        />

                        <PurchaseTransactionPage

                            purchaseData={
                                this.state.purchaseData
                            }

                            saveStepAndNext={
                                this.saveStepAndNext
                            }

                        />

                    </div>
                );


            case 2:

                return (

                    <div>

                        <PurchaseProgress
                            step={2}
                        />

                        <PurchaseSupplierPage

                            purchaseData={
                                this.state.purchaseData
                            }

                            saveStepAndNext={
                                this.saveStepAndNext
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

                        <PurchaseProgress
                            step={3}
                        />

                        <PurchaseItemPage

                            purchaseData={
                                this.state.purchaseData
                            }

                            saveStepAndNext={
                                this.saveStepAndNext
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

                        <PurchaseProgress
                            step={4}
                        />

                        <PurchaseSummaryPage

                            transactionId={
                                this.state.purchaseData
                                    .transactionId
                            }

                            purchaseData={
                                this.state.purchaseData
                            }

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

export default PurchasePage;