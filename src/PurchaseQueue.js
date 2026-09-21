import React from "react";
import axios from "axios";

import {
    Button,
    Card,
    CardContent,
    Typography
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import { Link, Navigate } from "react-router-dom";

import "./Purchase.css";


class PurchaseQueuePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            transactions: [],

            loading: true,

            error: "",

            newTransactionId: null
        };
    }


    componentDidMount() {

        this.loadPurchaseTransactions();
    }


    loadPurchaseTransactions = () => {

        axios.get(
            "http://localhost:8080/purchase/queue"
        )
            .then((response) => {

                console.log(
                    "Purchase Queue:",
                    response.data
                );

                this.setState({
                    transactions: response.data,
                    loading: false
                });

            })
            .catch((error) => {

                console.log(
                    "Unable to load Purchase transactions:",
                    error
                );

                this.setState({
                    loading: false,
                    error:
                        "Unable to load Purchase transactions."
                });

            });
    };


    handleNewPurchase = () => {

        axios.post(
            "http://localhost:8080/purchase/start"
        )
            .then((response) => {

                console.log(
                    "New Purchase transaction:",
                    response.data
                );

                const transactionId =
                    response.data.transactionId;

                this.setState({
                    newTransactionId:
                        transactionId
                });

            })
            .catch((error) => {

                console.log(
                    "Unable to create new Purchase:",
                    error
                );

                alert(
                    "Unable to create new Purchase transaction."
                );

            });
    };


    render() {

        if (this.state.newTransactionId) {

            return (
                <Navigate
                    to={`/purchases/${this.state.newTransactionId}`}
                    replace
                />
            );
        }


        const columns = [

            {
                field: "transactionId",
                headerName: "Transaction ID",
                width: 130
            },

            {
                field: "transactionNo",
                headerName: "Transaction No",
                width: 190
            },

            {
                field: "transactionDate",
                headerName: "Transaction Date",
                width: 160
            },

            {
                field: "partyCode",
                headerName: "Supplier Code",
                width: 130
            },

            {
                field: "currentStep",
                headerName: "Current Step",
                width: 130
            },

            {
                field: "activityStatus",
                headerName: "Status",
                width: 120
            },

            {
                field: "totalAmount",
                headerName: "Total Amount",
                width: 150
            },

            {
                field: "open",
                headerName: "Action",
                width: 110,
                sortable: false,
                filterable: false,

                renderCell: (params) => {

                    return (

                        <Link
                            to={
                                `/purchases/${params.row.transactionId}`
                            }
                            style={{
                                textDecoration:
                                    "none"
                            }}
                        >

                            <Button
                                variant="outlined"
                                size="small"
                            >
                                Open
                            </Button>

                        </Link>
                    );
                }
            }
        ];


        return (

            <div className="purchase-card">

                <Card>

                    <CardContent>

                        <div className="purchase-page-header">

                            <Typography
                                variant="h5"
                                fontWeight="bold"
                            >
                                Purchase Transactions
                            </Typography>

                            <Button
                                variant="contained"
                                onClick={
                                    this.handleNewPurchase
                                }
                            >
                                New Purchase
                            </Button>

                        </div>


                        {this.state.error && (

                            <Typography
                                color="error"
                                style={{
                                    marginBottom: "15px"
                                }}
                            >
                                {this.state.error}
                            </Typography>

                        )}


                        <DataGrid
                            rows={
                                this.state.transactions
                            }

                            columns={columns}

                            getRowId={(row) =>
                                row.transactionId
                            }

                            loading={
                                this.state.loading
                            }

                            autoHeight

                            pageSizeOptions={[
                                10,
                                25,
                                50
                            ]}

                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 10,
                                        page: 0
                                    }
                                }
                            }}

                        />

                    </CardContent>

                </Card>

            </div>
        );
    }
}

export default PurchaseQueuePage;