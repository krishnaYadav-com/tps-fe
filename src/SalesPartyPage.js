import React from "react";

import {
    DataGrid
} from "@mui/x-data-grid";

import {
    Button
} from "@mui/material";

import axios from "axios";

import SearchParty from "./SearchParty";


class SalesPartyPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            searchResults: [],

            selectedParty:
                this.props.salesData.party || null,

            columns: [

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
                    renderCell: this.renderSelectButton
                }
            ]
        };
    }


    /*
     * This function makes sure every party
     * has an id property before going to DataGrid
     */
    formatParties = (parties) => {

        return parties.map((party) => {

            return {

                ...party,

                id: party.partyCode

            };

        });

    };


    /*
     * Called by SearchParty
     */
    handleSearchResults = (results) => {

        const formattedParties =
            this.formatParties(results);

        console.log(
            "Search Results:",
            formattedParties
        );

        this.setState({

            searchResults:
                formattedParties

        });

    };


    /*
     * Select button inside DataGrid
     */
    renderSelectButton = (params) => {

        return (

            <Button
                variant="contained"
                size="small"
                onClick={() => {

                    this.selectParty(params.row);

                }}
            >
                Select
            </Button>

        );

    };


    /*
     * Store selected party
     */
    selectParty = (party) => {

        this.setState({

            selectedParty:
                party

        });

    };


    /*
     * Validate and move to next page
     */
    handleNext = () => {

        if (!this.state.selectedParty) {

            alert(
                "Please select a party before continuing."
            );

            return;

        }


        this.props.updateSalesData({

            party:
                this.state.selectedParty

        });


        this.props.nextStep();

    };


    /*
     * Initial loading of all parties
     */
    loadParties = () => {

        axios.get(
            "http://localhost:8080/party/getAllParty"
        )

        .then((response) => {

            const formattedParties =
                this.formatParties(response.data);

            console.log(
                "Initial Party Load:",
                formattedParties
            );

            this.setState({

                searchResults:
                    formattedParties

            });

        })

        .catch((error) => {

            console.log(
                "Error loading parties:",
                error
            );

        });

    };


    componentDidMount() {

        this.loadParties();

    }


    render() {

        return (

            <div className="sales-card">

                <h2>
                    Party Selection
                </h2>


                {/* SELECTED PARTY */}

                {
                    this.state.selectedParty && (

                        <div
                            style={{
                                marginTop: "20px",
                                padding: "15px",
                                border: "1px solid #ddd",
                                borderRadius: "8px"
                            }}
                        >

                            <h3>
                                Selected Party
                            </h3>

                            <p>
                                <b>Party Code:</b>{" "}
                                {
                                    this.state.selectedParty
                                        .partyCode
                                }
                            </p>

                            <p>
                                <b>Party Name:</b>{" "}
                                {
                                    this.state.selectedParty
                                        .partyName
                                }
                            </p>

                            <p>
                                <b>GST No:</b>{" "}
                                {
                                    this.state.selectedParty
                                        .gstNo
                                }
                            </p>

                        </div>

                    )
                }


                {/* SEARCH PARTY */}

                <div
                    className="search-section"
                    style={{
                        marginTop: "20px"
                    }}
                >

                    <SearchParty

                        onSearchResults={
                            this.handleSearchResults
                        }

                    />

                </div>


                {/* RESULTS */}

                <div
                    style={{
                        marginTop: "25px"
                    }}
                >

                    <h3>
                        Available Parties
                    </h3>


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
                                this.state.columns
                            }

                            getRowId={
                                (row) => row.id
                            }

                            pageSizeOptions={[
                                5,
                                10,
                                20
                            ]}

                        />

                    </div>

                </div>


                {/* NAVIGATION */}

                <div
                    style={{
                        marginTop: "25px",
                        display: "flex",
                        justifyContent: "space-between"
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