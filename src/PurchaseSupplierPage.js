import React from "react";
import axios from "axios";

import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    TextField
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import SearchParty from "./SearchParty";

import "./Purchase.css";


class PurchaseSupplierPage extends React.Component {

    constructor(props) {
        super(props);

        const supplier =
            props.purchaseData &&
            props.purchaseData.supplier
                ? props.purchaseData.supplier
                : null;

        this.state = {

            supplierCode:
                supplier
                    ? supplier.partyCode
                    : "",

            supplier:
                supplier,

            searchResults: [],

            openSearchDialog:
                false,

            error: ""
        };
    }


    handleSupplierCodeChange = (
        event
    ) => {

        this.setState({
            supplierCode:
                event.target.value
        });
    };


    handleSupplierCodeBlur = () => {

        const code =
            this.state.supplierCode;


        if (!code) {
            return;
        }


        axios.get(
            `http://localhost:8080/party/getPartyById?id=${code}`
        )
            .then((response) => {

                this.setState({
                    supplier:
                        response.data,
                    error: ""
                });

            })
            .catch(() => {

                this.setState({

                    supplier:
                        null,

                    error:
                        "Supplier not found."

                });

            });
    };


    handleSearchResults = (
        results
    ) => {

        this.setState({
            searchResults:
                results || []
        });
    };


    selectSupplier = (
        supplier
    ) => {

        this.setState({

            supplier:
                supplier,

            supplierCode:
                supplier.partyCode,

            openSearchDialog:
                false,

            error:
                ""

        });
    };


    handleNext = () => {

        if (
            !this.state.supplier
        ) {

            alert(
                "Please select a Supplier."
            );

            return;
        }


        this.props.saveStepAndNext(

            {
                partyCode:
                    this.state
                        .supplier
                        .partyCode
            },

            {
                supplier:
                    this.state.supplier
            }

        );
    };


    render() {

        const columns = [

            {
                field: "partyCode",
                headerName: "Supplier Code",
                width: 130
            },

            {
                field: "partyName",
                headerName: "Supplier Name",
                width: 220
            },

            {
                field: "partyState",
                headerName: "State",
                width: 160
            },

            {
                field: "gstNo",
                headerName: "GST No",
                width: 190
            },

            {
                field: "select",
                headerName: "Action",
                width: 100,
                sortable: false,
                filterable: false,

                renderCell: (params) => (

                    <Button
                        size="small"
                        variant="contained"
                        onClick={() =>
                            this.selectSupplier(
                                params.row
                            )
                        }
                    >
                        Select
                    </Button>

                )
            }
        ];


        return (

            <div className="purchase-card">

                <h2>
                    Supplier Selection
                </h2>


                <div className="purchase-search-row">

                    <TextField
                        label="Supplier Code"
                        value={
                            this.state.supplierCode
                        }
                        onChange={
                            this.handleSupplierCodeChange
                        }
                        onBlur={
                            this.handleSupplierCodeBlur
                        }
                    />


                    <Button
                        variant="outlined"
                        onClick={() =>
                            this.setState({
                                openSearchDialog:
                                    true
                            })
                        }
                    >
                        Search Supplier
                    </Button>

                </div>


                {this.state.error && (

                    <Typography
                        color="error"
                        style={{
                            marginTop: "15px"
                        }}
                    >
                        {this.state.error}
                    </Typography>

                )}


                {this.state.supplier && (

                    <div className="purchase-inner-card">

                        <Typography
                            variant="h6"
                            gutterBottom
                        >
                            Supplier Details
                        </Typography>


                        <div className="purchase-info-grid">

                            <div>
                                <strong>
                                    Supplier Name
                                </strong>

                                <span>
                                    {
                                        this.state
                                            .supplier
                                            .partyName
                                    }
                                </span>
                            </div>


                            <div>
                                <strong>
                                    Contact
                                </strong>

                                <span>
                                    {
                                        this.state
                                            .supplier
                                            .contactNo
                                    }
                                </span>
                            </div>


                            <div>
                                <strong>
                                    GST No
                                </strong>

                                <span>
                                    {
                                        this.state
                                            .supplier
                                            .gstNo
                                    }
                                </span>
                            </div>


                            <div>
                                <strong>
                                    State
                                </strong>

                                <span>
                                    {
                                        this.state
                                            .supplier
                                            .partyState
                                    }
                                </span>
                            </div>

                        </div>

                    </div>

                )}


                <Dialog
                    open={
                        this.state
                            .openSearchDialog
                    }
                    onClose={() =>
                        this.setState({
                            openSearchDialog:
                                false
                        })
                    }
                    fullWidth
                    maxWidth="lg"
                >

                    <DialogTitle>
                        Search Supplier
                    </DialogTitle>

                    <DialogContent>

                        <SearchParty
                            onSearchResults={
                                this.handleSearchResults
                            }
                        />


                        <div
                            style={{
                                height: 400,
                                marginTop: "20px"
                            }}
                        >

                            <DataGrid

                                rows={
                                    this.state
                                        .searchResults
                                }

                                columns={
                                    columns
                                }

                                getRowId={
                                    (row) =>
                                        row.partyCode
                                }

                                pageSizeOptions={[
                                    5,
                                    10,
                                    20
                                ]}
                            />

                        </div>

                    </DialogContent>

                </Dialog>


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

export default PurchaseSupplierPage;