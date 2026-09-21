import React from "react";
import axios from "axios";

import {
    DataGrid
} from "@mui/x-data-grid";

import {
    Button,
    TextField,
    Card,
    CardContent,
    Typography,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from "@mui/material";

import SearchParty from "./SearchParty";


class SalesPartyPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            partyCode:
                this.props.salesData.party
                    ? this.props.salesData.party.partyCode
                    : "",

            selectedParty:
                this.props.salesData.party || null,

            searchResults: [],

            openSearchDialog: false
        };

    }


    handlePartyCodeBlur = () => {

        const partyCode =
            this.state.partyCode;


        if (!partyCode) {

            return;

        }


        axios.get(
            `http://localhost:8080/party/getPartyById?id=${partyCode}`
        )

        .then((response) => {

            if (
                !response.data ||
                !response.data.partyCode
            ) {

                alert(
                    "Party not found."
                );

                this.setState({

                    selectedParty:
                        null

                });

                return;

            }


            this.setState({

                selectedParty:
                    response.data

            });

        })

        .catch((error) => {

            console.log(
                "Party lookup error:",
                error
            );


            this.setState({

                selectedParty:
                    null

            });


            alert(
                "Party not found."
            );

        });

    };


    loadAllParties = () => {

        axios.get(
            "http://localhost:8080/party/getAllParty"
        )

        .then((response) => {

            this.setState({

                searchResults:
                    response.data

            });

        })

        .catch((error) => {

            console.log(
                "Error loading parties:",
                error
            );

        });

    };


    openPartySearch = () => {

        this.loadAllParties();


        this.setState({

            openSearchDialog:
                true

        });

    };


    closePartySearch = () => {

        this.setState({

            openSearchDialog:
                false

        });

    };


    handleSearchResults = (
        results
    ) => {

        this.setState({

            searchResults:
                results

        });

    };


    selectParty = (party) => {

        this.setState({

            selectedParty:
                party,

            partyCode:
                party.partyCode,

            openSearchDialog:
                false

        });

    };


    renderSelectButton = (
        params
    ) => {

        return (

            <Button
                variant="contained"
                size="small"
                onClick={() =>
                    this.selectParty(
                        params.row
                    )
                }
            >
                Select
            </Button>

        );

    };


    handleNext = () => {

        if (!this.state.selectedParty) {

            alert(
                "Please select a party before continuing."
            );

            return;

        }


        const apiData = {

            partyCode:
                this.state.selectedParty.partyCode

        };


        const localData = {

            party:
                this.state.selectedParty

        };


        this.props.saveStepAndNext(

            apiData,

            localData

        );

    };


    render() {

        const party =
            this.state.selectedParty;


        const columns = [

            {
                field: "partyCode",
                headerName: "Party Code",
                width: 120
            },

            {
                field: "partyName",
                headerName: "Party Name",
                width: 220
            },

            {
                field: "partyState",
                headerName: "State",
                width: 150
            },

            {
                field: "gstNo",
                headerName: "GST No",
                width: 180
            },

            {
                field: "contactNo",
                headerName: "Contact No",
                width: 150
            },

            {
                field: "select",
                headerName: "Action",
                width: 120,
                sortable: false,
                filterable: false,
                renderCell:
                    this.renderSelectButton
            }

        ];


        return (

            <div className="sales-card">

                <Typography
                    variant="h5"
                    style={{
                        fontWeight: 600,
                        color: "#1e293b"
                    }}
                >
                    Party Selection
                </Typography>

                <Typography
                    variant="body2"
                    style={{
                        color: "#64748b",
                        marginTop: "5px",
                        marginBottom: "25px"
                    }}
                >
                    Select the party associated with this
                    sales transaction.
                </Typography>


                {/* PARTY SEARCH CARD */}

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
                            Party Selection
                        </Typography>


                        <Divider
                            style={{
                                marginTop: "15px",
                                marginBottom: "20px"
                            }}
                        />


                        <div
                            style={{
                                display: "flex",
                                gap: "15px",
                                alignItems: "center"
                            }}
                        >

                            <TextField
                                label="Party Code"
                                type="number"
                                size="small"
                                value={
                                    this.state.partyCode
                                }
                                onChange={(event) =>
                                    this.setState({

                                        partyCode:
                                            event.target.value

                                    })
                                }
                                onBlur={
                                    this.handlePartyCodeBlur
                                }
                                style={{
                                    width: "200px"
                                }}
                            />


                            <Button
                                variant="contained"
                                onClick={
                                    this.openPartySearch
                                }
                            >
                                Search Party
                            </Button>

                        </div>


                        {/* SELECTED PARTY */}

                        {
                            party && (

                                <div
                                    style={{
                                        marginTop: "25px",
                                        padding: "20px",
                                        backgroundColor:
                                            "#f8fafc",
                                        borderRadius: "8px"
                                    }}
                                >

                                    <Typography
                                        variant="subtitle1"
                                        style={{
                                            fontWeight: 600,
                                            marginBottom: "15px"
                                        }}
                                    >
                                        Selected Party
                                    </Typography>


                                    <div
                                        style={{
                                            display: "grid",
                                            gridTemplateColumns:
                                                "1fr 1fr",
                                            gap:
                                                "12px 30px"
                                        }}
                                    >

                                        <Typography>
                                            <b>
                                                Party Code:
                                            </b>{" "}
                                            {
                                                party.partyCode
                                            }
                                        </Typography>


                                        <Typography>
                                            <b>
                                                Party Name:
                                            </b>{" "}
                                            {
                                                party.partyName
                                            }
                                        </Typography>


                                        <Typography>
                                            <b>
                                                Contact:
                                            </b>{" "}
                                            {
                                                party.contactNo
                                            }
                                        </Typography>


                                        <Typography>
                                            <b>
                                                GST No:
                                            </b>{" "}
                                            {
                                                party.gstNo
                                            }
                                        </Typography>


                                        <Typography>
                                            <b>
                                                State:
                                            </b>{" "}
                                            {
                                                party.partyState
                                            }
                                        </Typography>


                                        <Typography>
                                            <b>
                                                Payment Terms:
                                            </b>{" "}
                                            {
                                                party.paymentTerms
                                            }
                                        </Typography>

                                    </div>

                                </div>

                            )
                        }

                    </CardContent>

                </Card>


                {/* SEARCH PARTY DIALOG */}

                <Dialog
                    open={
                        this.state.openSearchDialog
                    }
                    onClose={
                        this.closePartySearch
                    }
                    fullWidth
                    maxWidth="lg"
                >

                    <DialogTitle>
                        Search Party
                    </DialogTitle>


                    <DialogContent>

                        <SearchParty
                            onSearchResults={
                                this.handleSearchResults
                            }
                        />


                        <div
                            style={{
                                marginTop: "20px"
                            }}
                        >

                            <Typography
                                variant="subtitle1"
                                style={{
                                    fontWeight: 600,
                                    marginBottom:
                                        "10px"
                                }}
                            >
                                Party List
                            </Typography>


                            <div
                                style={{
                                    height: 400,
                                    width: "100%"
                                }}
                            >

                                <DataGrid

                                    rows={
                                        this.state.searchResults
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

                        </div>

                    </DialogContent>


                    <DialogActions>

                        <Button
                            onClick={
                                this.closePartySearch
                            }
                        >
                            Close
                        </Button>

                    </DialogActions>

                </Dialog>


                {/* NAVIGATION */}

                <div
                    style={{
                        marginTop: "25px",
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

export default SalesPartyPage;