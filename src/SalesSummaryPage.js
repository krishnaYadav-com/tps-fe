import React from "react";

import {
    Button
} from "@mui/material";


class SalesSummaryPage extends React.Component {


    calculateSubtotal = () => {

        let subtotal = 0;


        this.props.salesData.items.forEach(
            (item) => {

                subtotal +=
                    Number(item.quantity) *
                    Number(item.rate);

            }
        );


        return subtotal;

    };


    calculateGST = () => {

        let gst = 0;


        this.props.salesData.items.forEach(
            (item) => {

                const amount =
                    Number(item.quantity) *
                    Number(item.rate);


                gst +=
                    amount *
                    Number(item.gstPer) /
                    100;

            }
        );


        return gst;

    };


    calculateTotal = () => {

        return (
            this.calculateSubtotal() +
            this.calculateGST()
        );

    };


    generateInvoice = () => {

        const payload = {

            invoiceNo:
                this.props.salesData.invoiceNo,

            transactionDate:
                this.props.salesData.transactionDate,

            transactionType:
                this.props.salesData.transactionType,

            paymentTerms:
                this.props.salesData.paymentTerms,

            paymentDueDate:
                this.props.salesData.paymentDueDate,

            deliveryMode:
                this.props.salesData.deliveryMode,

            deliveryPaymentTerms:
                this.props.salesData
                    .deliveryPaymentTerms,

            poDetails:
                this.props.salesData.poDetails,

            poNumber:
                this.props.salesData.poNumber,

            poDate:
                this.props.salesData.poDate,

            party:
                this.props.salesData.party,

            items:
                this.props.salesData.items,

            subtotal:
                this.calculateSubtotal(),

            gstAmount:
                this.calculateGST(),

            totalAmount:
                this.calculateTotal()

        };


        console.log(
            "Final Sales Payload:"
        );

        console.log(payload);


        /*
        Later:

        axios.post(
            "http://localhost:8080/sales/add",
            payload
        );
        */

    };


    render() {

        const salesData =
            this.props.salesData;

        const party =
            salesData.party;


        return (

            <div className="sales-card">

                <h2>
                    Sales Summary
                </h2>


                {/* TRANSACTION DETAILS */}

                <div
                    style={{
                        marginTop: "25px",
                        padding: "20px",
                        border: "1px solid #ddd",
                        borderRadius: "10px"
                    }}
                >

                    <h3>
                        Transaction Details
                    </h3>


                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "1fr 1fr",
                            gap: "10px 30px"
                        }}
                    >

                        <p>
                            <b>
                                Invoice Date:
                            </b>{" "}
                            {
                                salesData
                                    .transactionDate
                            }
                        </p>


                        <p>
                            <b>
                                Payment Terms:
                            </b>{" "}
                            {
                                salesData
                                    .paymentTerms
                            }
                        </p>


                        <p>
                            <b>
                                Payment Due Date:
                            </b>{" "}
                            {
                                salesData
                                    .paymentDueDate ||
                                "—"
                            }
                        </p>


                        <p>
                            <b>
                                Delivery Mode:
                            </b>{" "}
                            {
                                salesData
                                    .deliveryMode
                            }
                        </p>


                        <p>
                            <b>
                                Delivery Payment:
                            </b>{" "}
                            {
                                salesData
                                    .deliveryPaymentTerms
                            }
                        </p>


                        <p>
                            <b>
                                PO Details:
                            </b>{" "}
                            {
                                salesData
                                    .poDetails
                            }
                        </p>


                        {
                            salesData.poDetails ===
                                "PO Date" && (

                                <>

                                    <p>
                                        <b>
                                            PO Number:
                                        </b>{" "}
                                        {
                                            salesData
                                                .poNumber
                                        }
                                    </p>


                                    <p>
                                        <b>
                                            PO Date:
                                        </b>{" "}
                                        {
                                            salesData
                                                .poDate
                                        }
                                    </p>

                                </>

                            )
                        }

                    </div>

                </div>


                {/* PARTY DETAILS */}

                <div
                    style={{
                        marginTop: "20px",
                        padding: "20px",
                        border: "1px solid #ddd",
                        borderRadius: "10px"
                    }}
                >

                    <h3>
                        Party Details
                    </h3>


                    {
                        party && (

                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns:
                                        "1fr 1fr",
                                    gap: "10px 30px"
                                }}
                            >

                                <p>
                                    <b>
                                        Party Code:
                                    </b>{" "}
                                    {
                                        party.partyCode
                                    }
                                </p>


                                <p>
                                    <b>
                                        Party Name:
                                    </b>{" "}
                                    {
                                        party.partyName
                                    }
                                </p>


                                <p>
                                    <b>
                                        Contact:
                                    </b>{" "}
                                    {
                                        party.contactNo
                                    }
                                </p>


                                <p>
                                    <b>
                                        GST No:
                                    </b>{" "}
                                    {
                                        party.gstNo
                                    }
                                </p>


                                <p>
                                    <b>
                                        State:
                                    </b>{" "}
                                    {
                                        party.partyState
                                    }
                                </p>

                            </div>

                        )
                    }

                </div>


                {/* ITEMS */}

                <div
                    style={{
                        marginTop: "20px",
                        padding: "20px",
                        border: "1px solid #ddd",
                        borderRadius: "10px"
                    }}
                >

                    <h3>
                        Selected Items
                    </h3>


                    <table
                        style={{
                            width: "100%",
                            borderCollapse:
                                "collapse"
                        }}
                    >

                        <thead>

                            <tr>

                                <th>Item Code</th>

                                <th>Item Name</th>

                                <th>Qty</th>

                                <th>Rate</th>

                                <th>GST %</th>

                                <th>Amount</th>

                            </tr>

                        </thead>


                        <tbody>

                            {
                                salesData.items.map(
                                    (item) => (

                                        <tr
                                            key={
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
                                                    item.quantity
                                                }
                                            </td>

                                            <td>
                                                ₹{" "}
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
                                                ₹{" "}
                                                {
                                                    (
                                                        Number(
                                                            item.quantity
                                                        ) *
                                                        Number(
                                                            item.rate
                                                        )
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


                {/* TOTAL */}

                <div
                    style={{
                        marginTop: "20px",
                        padding: "20px",
                        textAlign: "right"
                    }}
                >

                    <p>
                        <b>
                            Subtotal:
                        </b>{" "}
                        ₹
                        {
                            this.calculateSubtotal()
                                .toFixed(2)
                        }
                    </p>


                    <p>
                        <b>
                            GST:
                        </b>{" "}
                        ₹
                        {
                            this.calculateGST()
                                .toFixed(2)
                        }
                    </p>


                    <h2>
                        Grand Total:
                        {" "}
                        ₹
                        {
                            this.calculateTotal()
                                .toFixed(2)
                        }
                    </h2>

                </div>


                {/* BUTTONS */}

                <div
                    style={{
                        marginTop: "20px",
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
                        onClick={
                            this.generateInvoice
                        }
                    >
                        Generate Invoice
                    </Button>

                </div>

            </div>

        );
    }
}

export default SalesSummaryPage;