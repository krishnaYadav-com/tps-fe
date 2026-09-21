import React from "react";
import axios from "axios";

import {
    Button,
    Card,
    CardContent,
    Typography,
    Divider
} from "@mui/material";


class SalesSummaryPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            summary: null,

            loading: true,

            error: ""

        };
    }


    componentDidMount() {

        this.loadSummary();

    }


    /*
     * Fetch final summary from backend.
     * Backend is responsible for all calculations.
     */
    loadSummary = () => {

        const transactionId =
            this.props.salesData.transactionId;


        if (!transactionId) {

            this.setState({

                loading: false,

                error:
                    "Transaction ID is missing."

            });

            return;

        }


        axios.get(
            `http://localhost:8080/sales/summary/${transactionId}`
        )

            .then((response) => {

                console.log(
                    "Sales Summary From Backend:",
                    response.data
                );


                this.setState({

                    summary:
                        response.data,

                    loading: false,

                    error: ""

                });

            })

            .catch((error) => {

                console.log(
                    "Error loading sales summary:",
                    error
                );


                let message =
                    "Unable to load sales summary.";


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

                    }

                    else if (
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

    submitTransaction = () => {

        const transactionId =
            this.props.transactionId;


        axios.post(
            `http://localhost:8080/sales/submit/${transactionId}`
        )
            .then((response) => {

                console.log(
                    "Sales transaction submitted:",
                    response.data
                );


                alert(
                    "Sales transaction submitted successfully."
                );


                window.location.href =
                    "/sales";

            })
            .catch((error) => {

                console.log(
                    "Sales submission failed:",
                    error
                );


                let message =
                    "Unable to submit Sales transaction.";


                if (
                    error.response &&
                    error.response.data
                ) {

                    message =
                        error.response.data;
                }


                alert(message);

            });
    };

    /*
     * Generate invoice.
     *
     * At this point the backend summary is already
     * the authoritative transaction state.
     */
    generateInvoice = () => {

        console.log(
            "Generate Invoice For Transaction:",
            this.props.salesData.transactionId
        );


        /*
         * Your iText invoice API can be connected here.
         *
         * Example:
         *
         * axios.post(
         *     `http://localhost:8080/sales/generate-invoice/${this.props.salesData.transactionId}`
         * )
         */


        alert(
            "Invoice generation API will be connected here."
        );

    };


    renderInfo = (label, value) => {

        return (

            <div
                style={{
                    marginBottom: "14px"
                }}
            >

                <Typography
                    variant="caption"
                    style={{
                        color: "#64748b",
                        display: "block",
                        marginBottom: "4px"
                    }}
                >
                    {label}
                </Typography>


                <Typography
                    variant="body1"
                    style={{
                        color: "#1e293b",
                        fontWeight: 500
                    }}
                >

                    {
                        value !== null &&
                            value !== undefined &&
                            value !== ""
                            ? value
                            : "—"
                    }

                </Typography>

            </div>

        );

    };


    render() {

        if (this.state.loading) {

            return (

                <div className="sales-card">

                    <Typography
                        variant="h6"
                    >
                        Loading Sales Summary...
                    </Typography>

                </div>

            );

        }


        if (this.state.error) {

            return (

                <div className="sales-card">

                    <Typography
                        variant="h6"
                        style={{
                            color: "#dc2626",
                            marginBottom: "15px"
                        }}
                    >
                        Unable to Load Summary
                    </Typography>


                    <Typography
                        variant="body2"
                        style={{
                            color: "#64748b"
                        }}
                    >
                        {this.state.error}
                    </Typography>


                    <Button
                        variant="contained"
                        style={{
                            marginTop: "20px"
                        }}
                        onClick={
                            this.loadSummary
                        }
                    >
                        Retry
                    </Button>

                </div>

            );

        }


        const summary =
            this.state.summary;


        if (!summary) {

            return (

                <div className="sales-card">

                    <Typography>
                        No summary data available.
                    </Typography>

                </div>

            );

        }


        const party =
            summary.party;




        const transaction = summary.transaction;
        const transactionDetail = summary.transactionDetail;
        const items = transactionDetail;


        return (

            <div className="sales-card">

                {/* PAGE HEADER */}

                <div
                    style={{
                        marginBottom: "25px"
                    }}
                >

                    <Typography
                        variant="h5"
                        style={{
                            fontWeight: 600,
                            color: "#1e293b"
                        }}
                    >
                        Sales Summary
                    </Typography>


                    <Typography
                        variant="body2"
                        style={{
                            color: "#64748b",
                            marginTop: "5px"
                        }}
                    >
                        Review the transaction details
                        before generating the invoice.
                    </Typography>

                </div>


                {/* TRANSACTION DETAILS */}

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
                            Transaction Details
                        </Typography>


                        <Divider
                            style={{
                                marginTop: "15px",
                                marginBottom: "20px"
                            }}
                        />


                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "1fr 1fr",
                                gap: "10px 40px"
                            }}
                        >

                            {
                                this.renderInfo(
                                    "Transaction ID",
                                    transaction.transactionNo
                                )
                            }


                            {
                                this.renderInfo(
                                    "Invoice Date",
                                    transaction.transactionDate
                                )
                            }


                            {
                                this.renderInfo(
                                    "Payment Terms",
                                    transaction.paymentTerms
                                )
                            }


                            {
                                this.renderInfo(
                                    "Payment Due Date",
                                    transaction.paymentDueDate
                                )
                            }


                            {
                                this.renderInfo(
                                    "Delivery Mode",
                                    transaction.deliveryMode
                                )
                            }


                            {
                                this.renderInfo(
                                    "Delivery Payment",
                                    transaction.deliveryPaymentTerms
                                )
                            }


                            {
                                this.renderInfo(
                                    "PO Details",
                                    transaction.poDetails
                                )
                            }


                            {
                                transaction.poDetails ===
                                "PO Date" && (

                                    <>

                                        {
                                            this.renderInfo(
                                                "PO Number",
                                                transaction.poNumber
                                            )
                                        }


                                        {
                                            this.renderInfo(
                                                "PO Date",
                                                transaction.poDate
                                            )
                                        }

                                    </>

                                )
                            }

                        </div>

                    </CardContent>

                </Card>


                {/* PARTY DETAILS */}

                <Card
                    elevation={0}
                    style={{
                        marginTop: "20px",
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
                            Party Details
                        </Typography>


                        <Divider
                            style={{
                                marginTop: "15px",
                                marginBottom: "20px"
                            }}
                        />


                        {
                            party ? (

                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns:
                                            "1fr 1fr",
                                        gap: "10px 40px"
                                    }}
                                >

                                    {
                                        this.renderInfo(
                                            "Party Code",
                                            party.partyCode
                                        )
                                    }


                                    {
                                        this.renderInfo(
                                            "Party Name",
                                            party.partyName
                                        )
                                    }


                                    {
                                        this.renderInfo(
                                            "Contact No",
                                            party.contactNo
                                        )
                                    }


                                    {
                                        this.renderInfo(
                                            "GST No",
                                            party.gstNo
                                        )
                                    }


                                    {
                                        this.renderInfo(
                                            "State",
                                            party.partyState
                                        )
                                    }


                                    {
                                        this.renderInfo(
                                            "Email",
                                            party.emailId
                                        )
                                    }

                                </div>

                            ) : (

                                <Typography
                                    variant="body2"
                                    style={{
                                        color: "#64748b"
                                    }}
                                >
                                    Party details are not available.
                                </Typography>

                            )
                        }

                    </CardContent>

                </Card>


                {/* ITEMS */}

                <Card
                    elevation={0}
                    style={{
                        marginTop: "20px",
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
                            Item Details
                        </Typography>


                        <Divider
                            style={{
                                marginTop: "15px",
                                marginBottom: "20px"
                            }}
                        />


                        <div
                            style={{
                                overflowX: "auto"
                            }}
                        >

                            <table
                                style={{
                                    width: "100%",
                                    minWidth: "1050px",
                                    borderCollapse:
                                        "collapse"
                                }}
                            >

                                <thead>

                                    <tr>

                                        <th style={this.headerStyle}>
                                            Item Code
                                        </th>

                                        <th style={this.headerStyle}>
                                            Item Name
                                        </th>

                                        <th style={this.headerStyle}>
                                            UOM
                                        </th>

                                        <th style={this.headerStyle}>
                                            Qty
                                        </th>

                                        <th style={this.headerStyle}>
                                            Rate
                                        </th>

                                        <th style={this.headerStyle}>
                                            GST %
                                        </th>

                                        <th style={this.headerStyle}>
                                            Sub Amount
                                        </th>

                                        <th style={this.headerStyle}>
                                            Tax Amount
                                        </th>

                                        <th style={this.headerStyle}>
                                            Inclusive Amount
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {
                                        items.map(
                                            (item) => (

                                                <tr
                                                    key={
                                                        item.transactionDetailId ||
                                                        item.itemCode
                                                    }
                                                >

                                                    <td style={this.cellStyle}>
                                                        {
                                                            item.itemCode
                                                        }
                                                    </td>


                                                    <td style={this.cellStyle}>
                                                        {
                                                            item.itemName
                                                        }
                                                    </td>


                                                    <td style={this.cellStyle}>
                                                        {
                                                            item.unitOfMeasure
                                                        }
                                                    </td>


                                                    <td style={this.cellStyle}>
                                                        {
                                                            item.quantity
                                                        }
                                                    </td>


                                                    <td style={this.cellStyle}>
                                                        ₹{" "}
                                                        {
                                                            Number(
                                                                item.rate
                                                            ).toFixed(2)
                                                        }
                                                    </td>


                                                    <td style={this.cellStyle}>
                                                        {
                                                            item.gstPer
                                                        }%
                                                    </td>


                                                    <td style={this.cellStyle}>
                                                        ₹{" "}
                                                        {
                                                            Number(
                                                                item.subAmount
                                                            ).toFixed(2)
                                                        }
                                                    </td>


                                                    <td style={this.cellStyle}>
                                                        ₹{" "}
                                                        {
                                                            Number(
                                                                item.taxAmount
                                                            ).toFixed(2)
                                                        }
                                                    </td>


                                                    <td
                                                        style={{
                                                            ...this.cellStyle,
                                                            fontWeight: 600
                                                        }}
                                                    >
                                                        ₹{" "}
                                                        {
                                                            Number(
                                                                item.inclusiveAmount
                                                            ).toFixed(2)
                                                        }
                                                    </td>

                                                </tr>

                                            )
                                        )
                                    }

                                </tbody>

                            </table>

                        </div>

                    </CardContent>

                </Card>


                {/* TOTAL CARD */}

                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "20px"
                    }}
                >

                    <Card
                        elevation={0}
                        style={{
                            width: "380px",
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
                                    color: "#1e293b",
                                    marginBottom: "15px"
                                }}
                            >
                                Invoice Summary
                            </Typography>


                            <Divider
                                style={{
                                    marginBottom: "18px"
                                }}
                            />


                            <div
                                style={{
                                    display: "flex",
                                    justifyContent:
                                        "space-between",
                                    marginBottom: "12px"
                                }}
                            >

                                <Typography>
                                    Sub Amount
                                </Typography>


                                <Typography
                                    style={{
                                        fontWeight: 500
                                    }}
                                >
                                    ₹{" "}
                                    {
                                        Number(
                                            transaction.subtotal
                                        ).toFixed(2)
                                    }
                                </Typography>

                            </div>


                            <div
                                style={{
                                    display: "flex",
                                    justifyContent:
                                        "space-between",
                                    marginBottom: "15px"
                                }}
                            >

                                <Typography>
                                    Total Tax
                                </Typography>


                                <Typography
                                    style={{
                                        fontWeight: 500
                                    }}
                                >
                                    ₹{" "}
                                    {
                                        Number(
                                            transaction.gstAmount
                                        ).toFixed(2)
                                    }
                                </Typography>

                            </div>


                            <Divider
                                style={{
                                    marginBottom: "15px"
                                }}
                            />


                            <div
                                style={{
                                    display: "flex",
                                    justifyContent:
                                        "space-between"
                                }}
                            >

                                <Typography
                                    variant="h6"
                                    style={{
                                        fontWeight: 700,
                                        color: "#1e293b"
                                    }}
                                >
                                    Final Amount
                                </Typography>


                                <Typography
                                    variant="h6"
                                    style={{
                                        fontWeight: 700,
                                        color: "#1e293b"
                                    }}
                                >
                                    ₹{" "}
                                    {
                                        Number(
                                            transaction.totalAmount
                                        ).toFixed(2)
                                    }
                                </Typography>

                            </div>

                        </CardContent>

                    </Card>

                </div>


                {/* NAVIGATION */}

                <div
                    style={{
                        marginTop: "30px",
                        paddingTop: "20px",
                        borderTop:
                            "1px solid #e2e8f0",
                        display: "flex",
                        justifyContent:
                            "space-between"
                    }}
                >

                    <Button
                        variant="outlined"
                        onClick={
                            this.props.previousStep
                        }
                    >
                        Back
                    </Button>


                    <Button
                        variant="contained"
                        onClick={this.submitTransaction}
                    >
                        Submit Transaction
                    </Button>

                </div>

            </div>

        );
    }


    headerStyle = {

        textAlign: "left",

        padding:
            "12px 10px",

        backgroundColor:
            "#f8fafc",

        color:
            "#475569",

        fontSize:
            "13px",

        fontWeight:
            600,

        borderBottom:
            "1px solid #e2e8f0"

    };


    cellStyle = {

        padding:
            "12px 10px",

        color:
            "#334155",

        fontSize:
            "14px",

        borderBottom:
            "1px solid #f1f5f9"

    };

}

export default SalesSummaryPage;