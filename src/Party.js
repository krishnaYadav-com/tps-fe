import React from 'react';
import axios from "axios";
import './Item.css';
import { DataGrid } from '@mui/x-data-grid';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';

class Party extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            partyCode: "",
            partyName: "",
            partyAddress: "",
            contactNo: "",
            emailId: "",
            partyState: "",
            gstNo: "",
            bankAccountNo: "",
            ifscCode: "",
            paymentTerms: "",
            freightTerms: "",

            parties: [],

            openUpdateDialog: false,
            openDeleteDialog: false,
            openAddDialog: false,
            openSnackbar: false,
            errorMessage: "",
            selectedParty: {}
        };

        // Same format as Item component
        this.handleAddParty = this.handleAddParty.bind(this);
    }


    fetchAllParty() {
        axios.get('http://localhost:8080/party/getAllParty')
            .then((response) => {
                this.setState({
                    parties: response.data
                });
            })
            .catch((error) => {
                console.log("Something went wrong...", error);
            });
    }


    handleAddParty(event) {
        this.setState({
            openAddDialog: true
        });
    }


    render() {
        return (
            <div className='item-container'>

                <div className='table-card'>

                    <h2 className='inventory-title'>Parties</h2>

                    <div className='inventory-content'>
                        <IconButton
                            onClick={this.refreshParty}
                            title="Refresh"
                        >
                            <RefreshIcon />
                        </IconButton>
                        <DataGrid
                            rows={this.props.parties}
                            columns={this.props.columns}
                            getRowId={(row) => row.partyCode}
                            pageSize={5}

                            onRowClick={(params) => {
                                this.setState({
                                    selectedParty: params.row,
                                    openUpdateDialog: true
                                });
                            }}

                            className='inventory-table'
                        />

                    </div>


                    {/* ================= UPDATE PARTY DIALOG ================= */}

                    <Dialog
                        open={this.state.openUpdateDialog}
                        onClose={() =>
                            this.setState({
                                openUpdateDialog: false
                            })
                        }
                    >

                        <DialogTitle>Update Party</DialogTitle>

                        <DialogContent>

                            <TextField
                                label="Party Name"
                                fullWidth
                                margin="normal"
                                value={this.state.selectedParty.partyName}
                                onChange={(e) =>
                                    this.setState({
                                        selectedParty: {
                                            ...this.state.selectedParty,
                                            partyName: e.target.value
                                        }
                                    })
                                }
                            />


                            <TextField
                                label="Party Address"
                                fullWidth
                                margin="normal"
                                value={this.state.selectedParty.partyAddress}
                                onChange={(e) =>
                                    this.setState({
                                        selectedParty: {
                                            ...this.state.selectedParty,
                                            partyAddress: e.target.value
                                        }
                                    })
                                }
                            />


                            <TextField
                                label="Contact No"
                                fullWidth
                                margin="normal"
                                value={this.state.selectedParty.contactNo}
                                onChange={(e) =>
                                    this.setState({
                                        selectedParty: {
                                            ...this.state.selectedParty,
                                            contactNo: e.target.value
                                        }
                                    })
                                }
                            />


                            <TextField
                                label="Email ID"
                                fullWidth
                                margin="normal"
                                value={this.state.selectedParty.emailId}
                                onChange={(e) =>
                                    this.setState({
                                        selectedParty: {
                                            ...this.state.selectedParty,
                                            emailId: e.target.value
                                        }
                                    })
                                }
                            />


                            <TextField
                                label="Party State"
                                fullWidth
                                margin="normal"
                                value={this.state.selectedParty.partyState}
                                onChange={(e) =>
                                    this.setState({
                                        selectedParty: {
                                            ...this.state.selectedParty,
                                            partyState: e.target.value
                                        }
                                    })
                                }
                            />


                            <TextField
                                label="GST NO"
                                fullWidth
                                margin="normal"
                                value={this.state.selectedParty.gstNo}
                                onChange={(e) =>
                                    this.setState({
                                        selectedParty: {
                                            ...this.state.selectedParty,
                                            gstNo: e.target.value
                                        }
                                    })
                                }
                            />


                            <TextField
                                label="Bank Account Number"
                                fullWidth
                                margin="normal"
                                value={this.state.selectedParty.bankAccountNo}
                                onChange={(e) =>
                                    this.setState({
                                        selectedParty: {
                                            ...this.state.selectedParty,
                                            bankAccountNo: e.target.value
                                        }
                                    })
                                }
                            />


                            <TextField
                                label="IFSC Code"
                                fullWidth
                                margin="normal"
                                value={this.state.selectedParty.ifscCode}
                                onChange={(e) =>
                                    this.setState({
                                        selectedParty: {
                                            ...this.state.selectedParty,
                                            ifscCode: e.target.value
                                        }
                                    })
                                }
                            />


                            <TextField
                                label="Payment Terms"
                                fullWidth
                                margin="normal"
                                value={this.state.selectedParty.paymentTerms}
                                onChange={(e) =>
                                    this.setState({
                                        selectedParty: {
                                            ...this.state.selectedParty,
                                            paymentTerms: e.target.value
                                        }
                                    })
                                }
                            />


                            <TextField
                                label="Freight Terms"
                                fullWidth
                                margin="normal"
                                value={this.state.selectedParty.freightTerms}
                                onChange={(e) =>
                                    this.setState({
                                        selectedParty: {
                                            ...this.state.selectedParty,
                                            freightTerms: e.target.value
                                        }
                                    })
                                }
                            />

                        </DialogContent>


                        <DialogActions>

                            <Button
                                color="error"
                                onClick={this.openDeleteConfirmation}
                            >
                                Delete
                            </Button>


                            <Button
                                onClick={() =>
                                    this.setState({
                                        openUpdateDialog: false
                                    })
                                }
                            >
                                Cancel
                            </Button>


                            <Button
                                variant="contained"
                                onClick={this.updateParty}
                            >
                                Update
                            </Button>

                        </DialogActions>

                    </Dialog>


                    {/* ================= ADD PARTY DIALOG ================= */}

                    <Dialog
                        open={this.state.openAddDialog}
                        onClose={() =>
                            this.setState({
                                openAddDialog: false
                            })
                        }
                    >

                        <DialogTitle>Add Party</DialogTitle>

                        <DialogContent>

                            <TextField
                                label="Party Name"
                                fullWidth
                                margin="normal"
                                value={this.state.selectedParty.partyName}
                                onChange={(e) =>
                                    this.setState({
                                        selectedParty: {
                                            ...this.state.selectedParty,
                                            partyName: e.target.value
                                        }
                                    })
                                }
                            />


                            <TextField
                                label="Party Address"
                                fullWidth
                                margin="normal"
                                value={this.state.selectedParty.partyAddress}
                                onChange={(e) =>
                                    this.setState({
                                        selectedParty: {
                                            ...this.state.selectedParty,
                                            partyAddress: e.target.value
                                        }
                                    })
                                }
                            />


                            <TextField
                                label="Contact No"
                                fullWidth
                                margin="normal"
                                value={this.state.selectedParty.contactNo}
                                onChange={(e) =>
                                    this.setState({
                                        selectedParty: {
                                            ...this.state.selectedParty,
                                            contactNo: e.target.value
                                        }
                                    })
                                }
                            />


                            <TextField
                                label="Email ID"
                                fullWidth
                                margin="normal"
                                value={this.state.selectedParty.emailId}
                                onChange={(e) =>
                                    this.setState({
                                        selectedParty: {
                                            ...this.state.selectedParty,
                                            emailId: e.target.value
                                        }
                                    })
                                }
                            />


                            <TextField
                                label="Party State"
                                fullWidth
                                margin="normal"
                                value={this.state.selectedParty.partyState}
                                onChange={(e) =>
                                    this.setState({
                                        selectedParty: {
                                            ...this.state.selectedParty,
                                            partyState: e.target.value
                                        }
                                    })
                                }
                            />


                            <TextField
                                label="GSTIN NO"
                                fullWidth
                                margin="normal"
                                value={this.state.selectedParty.gstNo}
                                onChange={(e) =>
                                    this.setState({
                                        selectedParty: {
                                            ...this.state.selectedParty,
                                            gstNo: e.target.value
                                        }
                                    })
                                }
                            />


                            <TextField
                                label="Bank Account No."
                                fullWidth
                                margin="normal"
                                value={this.state.selectedParty.bankAccountNo}
                                onChange={(e) =>
                                    this.setState({
                                        selectedParty: {
                                            ...this.state.selectedParty,
                                            bankAccountNo: e.target.value
                                        }
                                    })
                                }
                            />


                            <TextField
                                label="IFSC Code"
                                fullWidth
                                margin="normal"
                                value={this.state.selectedParty.ifscCode}
                                onChange={(e) =>
                                    this.setState({
                                        selectedParty: {
                                            ...this.state.selectedParty,
                                            ifscCode: e.target.value
                                        }
                                    })
                                }
                            />


                            <TextField
                                label="Payment Terms"
                                fullWidth
                                margin="normal"
                                value={this.state.selectedParty.paymentTerms}
                                onChange={(e) =>
                                    this.setState({
                                        selectedParty: {
                                            ...this.state.selectedParty,
                                            paymentTerms: e.target.value
                                        }
                                    })
                                }
                            />


                            <TextField
                                label="Freight Terms"
                                fullWidth
                                margin="normal"
                                value={this.state.selectedParty.freightTerms}
                                onChange={(e) =>
                                    this.setState({
                                        selectedParty: {
                                            ...this.state.selectedParty,
                                            freightTerms: e.target.value
                                        }
                                    })
                                }
                            />

                        </DialogContent>


                        <DialogActions>

                            <Button
                                onClick={() =>
                                    this.setState({
                                        openAddDialog: false
                                    })
                                }
                            >
                                Cancel
                            </Button>


                            <Button
                                variant="contained"
                                onClick={this.addParty}
                            >
                                Add
                            </Button>

                        </DialogActions>

                    </Dialog>


                    {/* ================= DELETE DIALOG ================= */}

                    <div className="add-btn-container">

                        <Dialog
                            open={this.state.openDeleteDialog}
                            onClose={this.closeDeleteConfirmation}
                        >

                            <DialogTitle>
                                Confirm Delete
                            </DialogTitle>

                            <DialogContent>
                                Are you sure you want to delete this party?
                            </DialogContent>

                            <DialogActions>

                                <Button
                                    onClick={this.closeDeleteConfirmation}
                                >
                                    Cancel
                                </Button>


                                <Button
                                    color="error"
                                    variant="contained"
                                    onClick={this.deleteParty}
                                >
                                    Yes, Delete
                                </Button>

                            </DialogActions>

                        </Dialog>

                    </div>


                    {/* ================= ADD BUTTON ================= */}

                    <div className='search-field'>

                        <button

                            className="search-button"
                            onClick={this.handleAddParty}
                        >
                            Add Party
                        </button>

                    </div>

                </div>

            </div>
        );
    }


    // ================= DELETE CONFIRMATION =================

    openDeleteConfirmation = () => {
        this.setState({
            openDeleteDialog: true
        });
    };


    closeDeleteConfirmation = () => {
        this.setState({
            openDeleteDialog: false
        });
    };


    // ================= DELETE PARTY =================

    deleteParty = () => {

        axios.post(
            `http://localhost:8080/party/deleteById/${this.state.selectedParty.partyCode}`
        )
            .then(() => {

                alert("Party Deleted Successfully");

                this.setState({
                    openDeleteDialog: false,
                    openUpdateDialog: false
                });

                this.props.fetchAllParty();

            })
            .catch((error) => {
                console.log(error);
            });
    };


    // ================= UPDATE PARTY =================

    updateParty = () => {

        const headers = {
            'Content-Type': 'application/json'
        };

        axios.post(
            `http://localhost:8080/party/updateParty/${this.state.selectedParty.partyCode}`,
            this.state.selectedParty,
            { headers }
        )
            .then(() => {

                alert("Party Updated");

                this.setState({
                    openUpdateDialog: false
                });

                // Refresh parent data
                this.props.fetchAllParty();

            })
            .catch((error) => {
                console.log(error);
            });

    };


    // ================= ADD PARTY =================

    addParty = () => {
        const party = this.state.selectedParty;


        if (!party.partyName || !party.partyName.trim()) {
            alert("Party Name is required");
            return;
        }

        if (!party.partyAddress || !party.partyAddress.trim()) {
            alert("Party Address is required");
            return;
        }

        if (!party.contactNo || !party.contactNo.trim()) {
            alert("Contact Number is required");
            return;
        }

        if (!party.emailId || !party.emailId.trim()) {
            alert("Email ID is required");
            return;
        }

        if (!party.partyState || !party.partyState.trim()) {
            alert("State is required");
            return;
        }

        if (!party.gstNo || !party.gstNo.trim()) {
            alert("GSTIN Number is required");
            return;
        }

        if (!party.bankAccountNo || !party.bankAccountNo.trim()) {
            alert("Bank Account Number is required");
            return;
        }

        if (!party.ifscCode || !party.ifscCode.trim()) {
            alert("IFSC Code is required");
            return;
        }

        if (!party.paymentTerms || !party.paymentTerms.trim()) {
            alert("Payment Terms is required");
            return;
        }

        if (!party.freightTerms || !party.freightTerms.trim()) {
            alert("Freight Terms is required");
            return;
        }
        const headers = {
            'Content-Type': 'application/json'
        };

        axios.post(
            `http://localhost:8080/party/addParty`,
            this.state.selectedParty,
            { headers }
        )
            .then(() => {

                alert("New Party Added");

                this.setState({
                    openAddDialog: false
                });

                this.props.fetchAllParty();

            })
            .catch((error) => {
                console.log(error);
            });

    };
    refreshParty = () => {

        axios.get("http://localhost:8080/party/getAllParty")
            .then((response) => {

                this.setState({
                    parties: response.data
                });

            })
            .catch((error) => {
                console.log(error);
            });
    }

}


export default Party;