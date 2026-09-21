import React from "react";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";

import {
    Card,
    CardContent,
    Typography,
    Button
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

class SalesQueuePage extends React.Component {

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

        this.loadSalesTransactions();

    }

    loadSalesTransactions = () => {

        axios.get(
            "http://localhost:8080/sales/queue"
        )
            .then((response) => {

                console.log(
                    "Sales Queue:",
                    response.data
                );

                this.setState({
                    transactions: response.data,
                    loading: false
                });

            })
            .catch((error) => {

                console.log(
                    "Unable to load Sales transactions:",
                    error
                );

                this.setState({
                    error: "Unable to load Sales transactions.",
                    loading: false
                });

            });

    };

    handleNewSales = () => {

        axios.post(
            "http://localhost:8080/sales/start"
        )
            .then((response) => {

                console.log(
                    "New Sales transaction:",
                    response.data
                );

                /*
                 * Backend has already created the transaction.
                 * We only take the ID returned by backend.
                 */
                const transactionId =
                    response.data.transactionId;

                this.setState({
                    newTransactionId: transactionId
                });

            })
            .catch((error) => {

                console.log(
                    "Unable to create new Sales transaction:",
                    error
                );

                alert(
                    "Unable to create new Sales transaction."
                );

            });

    };

    render() {

        /*
         * After /start succeeds,
         * open the newly created transaction.
         */
        if (this.state.newTransactionId) {

            return (
                <Navigate
                    to={`/sales/${this.state.newTransactionId}`}
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
                width: 150
            },

            {
                field: "partyCode",
                headerName: "Party Code",
                width: 120
            },
            {
                field: "processStep",
                headerName: "Current Process Step",
                width: 170
            },
            {
                field: "currentStep",
                headerName: "Current Step",
                width: 90
            },

            {
                field: "activityStatus",
                headerName: "Status",
                width: 70
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
                            to={`/sales/${params.row.transactionId}`}
                            style={{
                                textDecoration: "none"
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
            <div className="sales-card">

                <Card>

                    <CardContent>

                        {/* Page Header */}
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "20px"
                            }}
                        >

                            <Typography
                                variant="h5"
                                fontWeight="bold"
                            >
                                Sales Transactions
                            </Typography>

                            <Button
                                variant="contained"
                                onClick={this.handleNewSales}
                            >
                                New Sales
                            </Button>

                        </div>


                        {/* Error */}
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


                        {/* Transaction Grid */}
                        <DataGrid
                            rows={this.state.transactions}
                            columns={columns}
                            getRowId={(row) =>
                                row.transactionId
                            }
                            loading={this.state.loading}
                            autoHeight
                            pageSizeOptions={[10, 25, 50]}
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

export default SalesQueuePage;