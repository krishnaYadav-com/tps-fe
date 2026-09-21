import React from "react";
import axios from "axios";

import {
    Card,
    CardContent,
    Typography,
    Divider,
    Button
} from "@mui/material";

import "./Purchase.css";


class PurchaseSummaryPage extends React.Component {

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


    loadSummary = () => {

        const transactionId =
            this.props.transactionId;


        if (!transactionId) {

            this.setState({

                loading: false,

                error:
                    "Transaction ID is missing."

            });

            return;
        }


        axios.get(
            `http://localhost:8080/purchase/summary/${transactionId}`
        )
            .then((response) => {

                console.log(
                    "Purchase Summary:",
                    response.data
                );

                this.setState({

                    summary:
                        response.data,

                    loading:
                        false

                });

            })
            .catch((error) => {

                console.log(
                    "Unable to load Purchase Summary:",
                    error
                );

                this.setState({

                    loading:
                        false,

                    error:
                        "Unable to load Purchase Summary."

                });

            });
    };


    renderInfo = (
        label,
        value
    ) => {

        return (

            <div className="purchase-summary-info">

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    {label}
                </Typography>

                <Typography
                    variant="body1"
                    fontWeight="600"
                >
                    {value || "-"}
                </Typography>

            </div>
        );
    };


    render() {

        if (this.state.loading) {

            return (

                <div className="purchase-card">

                    <Card>

                        <CardContent>

                            <Typography variant="h6">
                                Loading Purchase Summary...
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
                                color="error"
                                variant="h6"
                            >
                                {this.state.error}
                            </Typography>

                        </CardContent>

                    </Card>

                </div>
            );
        }


        const summary =
            this.state.summary;


        const transaction =
            summary.transaction ||
            summary;


        const supplier =
            summary.party ||
            summary.supplier ||
            null;


        const details =
            summary.details ||
            summary.items ||
            [];


        return (

            <div className="purchase-card">

                <Card>

                    <CardContent>

                        <div className="purchase-summary-header">

                            <div>

                                <Typography
                                    variant="h5"
                                    fontWeight="bold"
                                >
                                    Purchase Summary
                                </Typography>

                                <Typography
                                    color="text.secondary"
                                >
                                    Review transaction details
                                    before generating invoice.
                                </Typography>

                            </div>

                        </div>


                        <div className="purchase-summary-inner">

                            <Typography
                                variant="h6"
                            >
                                Transaction Details
                            </Typography>


                            <div className="purchase-summary-grid">

                                {this.renderInfo(
                                    "Transaction ID",
                                    transaction.transactionId
                                )}

                                {this.renderInfo(
                                    "Transaction No",
                                    transaction.transactionNo
                                )}

                                {this.renderInfo(
                                    "Transaction Date",
                                    transaction.transactionDate
                                )}

                                {this.renderInfo(
                                    "Payment Terms",
                                    transaction.paymentTerms
                                )}

                                {this.renderInfo(
                                    "Payment Due Date",
                                    transaction.paymentDueDate
                                )}

                                {this.renderInfo(
                                    "Delivery Mode",
                                    transaction.deliveryMode
                                )}

                            </div>

                        </div>


                        <Divider
                            style={{
                                margin:
                                    "25px 0"
                            }}
                        />


                        <div className="purchase-summary-inner">

                            <Typography
                                variant="h6"
                            >
                                Supplier Details
                            </Typography>


                            {supplier && (

                                <div className="purchase-summary-grid">

                                    {this.renderInfo(
                                        "Supplier Code",
                                        supplier.partyCode
                                    )}

                                    {this.renderInfo(
                                        "Supplier Name",
                                        supplier.partyName
                                    )}

                                    {this.renderInfo(
                                        "Contact",
                                        supplier.contactNo
                                    )}

                                    {this.renderInfo(
                                        "GST No",
                                        supplier.gstNo
                                    )}

                                    {this.renderInfo(
                                        "State",
                                        supplier.partyState
                                    )}

                                </div>

                            )}

                        </div>


                        <Divider
                            style={{
                                margin:
                                    "25px 0"
                            }}
                        />


                        <div className="purchase-summary-inner">

                            <Typography
                                variant="h6"
                            >
                                Item Details
                            </Typography>


                            <div className="purchase-summary-table-wrapper">

                                <table className="purchase-items-table">

                                    <thead>

                                        <tr>

                                            <th>
                                                Item Code
                                            </th>

                                            <th>
                                                Item Name
                                            </th>

                                            <th>
                                                UOM
                                            </th>

                                            <th>
                                                Qty
                                            </th>

                                            <th>
                                                Rate
                                            </th>

                                            <th>
                                                GST %
                                            </th>

                                            <th>
                                                Sub Amount
                                            </th>

                                            <th>
                                                Tax Amount
                                            </th>

                                            <th>
                                                Total
                                            </th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {
                                            details.map(
                                                (item) => (

                                                    <tr
                                                        key={
                                                            item.transactionDetailId ||
                                                            item.itemCode
                                                        }
                                                    >

                                                        <td>
                                                            {
                                                                item.itemCode
                                                            }
                                                        </td>

                                                        <td>
                                                            {
                                                                item.itemName
                                                            }
                                                        </td>

                                                        <td>
                                                            {
                                                                item.unitOfMeasure
                                                            }
                                                        </td>

                                                        <td>
                                                            {
                                                                item.quantity
                                                            }
                                                        </td>

                                                        <td>
                                                            ₹
                                                            {
                                                                Number(
                                                                    item.rate
                                                                ).toFixed(2)
                                                            }
                                                        </td>

                                                        <td>
                                                            {
                                                                item.gstPer
                                                            }%
                                                        </td>

                                                        <td>
                                                            ₹
                                                            {
                                                                Number(
                                                                    item.subAmount
                                                                ).toFixed(2)
                                                            }
                                                        </td>

                                                        <td>
                                                            ₹
                                                            {
                                                                Number(
                                                                    item.taxAmount
                                                                ).toFixed(2)
                                                            }
                                                        </td>

                                                        <td>
                                                            ₹
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

                        </div>


                        <Divider
                            style={{
                                margin:
                                    "25px 0"
                            }}
                        />


                        <div className="purchase-invoice-summary">

                            <div>
                                Subtotal
                            </div>

                            <div>
                                ₹
                                {
                                    Number(
                                        transaction.subtotal ||
                                        0
                                    ).toFixed(2)
                                }
                            </div>


                            <div>
                                GST
                            </div>

                            <div>
                                ₹
                                {
                                    Number(
                                        transaction.gstAmount ||
                                        0
                                    ).toFixed(2)
                                }
                            </div>


                            <div className="purchase-grand-total">

                                <strong>
                                    Total
                                </strong>

                                <strong>
                                    ₹
                                    {
                                        Number(
                                            transaction.totalAmount ||
                                            0
                                        ).toFixed(2)
                                    }
                                </strong>

                            </div>

                        </div>


                        <div className="purchase-button-row">

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
                            >
                                Generate Invoice
                            </Button>

                        </div>

                    </CardContent>

                </Card>

            </div>
        );
    }
}

export default PurchaseSummaryPage;