import React from 'react';
import axios from "axios";
import Sidebar from './Sidebar';
import { Link } from "react-router-dom";
import './Item.css'; // Import CSS at top instead of <link> inside JSX
import { DataGrid } from '@mui/x-data-grid';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemCode: "",
            itemName: "",
            unitOfMeasure: "",
            hsn: "",
            quantity: "",
            items: [],
            openUpdateDialog: false,
            openDeleteDialog: false,   // ADD THIS
            openAddDialog: false,
            selectedItem: {}
        }
        this.handleAddItem=this.handleAddItem.bind(this);
    }

    fetchAllItems() {
        axios.get('http://localhost:8080/item/getAllItems').then((response) => {
            this.setState({ items: response.data })
        })
            .catch((error) => {
                console.log("Something went wrong...")
            })
    }
    handleAddItem(event) {
        this.setState({
            openAddDialog: true
        });
    }
    render() {
        return (
            <div className='item-container'>


                {/* Main Content Wrapper side-by-side with Sidebar */}
                {/* <div className='main-content'> */}

                <div className='table-card'>

                    <h2 className='inventory-title'>Items</h2>
                    <div className='inventory-content'>
                        <DataGrid
                            rows={this.props.items}
                            columns={this.props.columns}
                            getRowId={(row) => row.itemCode}
                            pageSize={5}
                            onRowClick={(params) => {
                                this.setState({
                                    selectedItem: params.row,
                                    openUpdateDialog: true
                                });
                            }}
                            className='inventory-table'
                        />
                    </div>
                    {/* Update dialog */}
                    <Dialog
                        open={this.state.openUpdateDialog}
                        onClose={() =>
                            this.setState({ openUpdateDialog: false })
                        }
                    >
                        <DialogTitle>Update Item</DialogTitle>

                        <DialogContent>

                            <TextField
                                label="Item Name"
                                fullWidth
                                margin="normal"
                                value={this.state.selectedItem.itemName}
                                onChange={(e) =>
                                    this.setState({
                                        selectedItem: {
                                            ...this.state.selectedItem,
                                            itemName: e.target.value
                                        }
                                    })
                                }
                            />

                            <TextField
                                label="Unit Of Measure"
                                fullWidth
                                margin="normal"
                                value={this.state.selectedItem.unitOfMeasure}
                                onChange={(e) =>
                                    this.setState({
                                        selectedItem: {
                                            ...this.state.selectedItem,
                                            unitOfMeasure: e.target.value
                                        }
                                    })
                                }
                            />

                            <TextField
                                label="HSN"
                                fullWidth
                                margin="normal"
                                value={this.state.selectedItem.hsn}
                                onChange={(e) =>
                                    this.setState({
                                        selectedItem: {
                                            ...this.state.selectedItem,
                                            hsn: e.target.value
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
                                onClick={this.updateItem}
                            >
                                Update
                            </Button>


                        </DialogActions>

                    </Dialog>

                    {/* Add dialog */}
                    <Dialog
                        open={this.state.openAddDialog}
                        onClose={() =>
                            this.setState({ openAddDialog: false })
                        }
                    >
                        <DialogTitle>Add Item</DialogTitle>

                        <DialogContent>

                            <TextField
                                label="Item Name"
                                fullWidth
                                margin="normal"
                                value={this.state.selectedItem.itemName}
                                onChange={(e) =>
                                    this.setState({
                                        selectedItem: {
                                            ...this.state.selectedItem,
                                            itemName: e.target.value
                                        }
                                    })
                                }
                            />

                            <TextField
                                label="Unit Of Measure"
                                fullWidth
                                margin="normal"
                                value={this.state.selectedItem.unitOfMeasure}
                                onChange={(e) =>
                                    this.setState({
                                        selectedItem: {
                                            ...this.state.selectedItem,
                                            unitOfMeasure: e.target.value
                                        }
                                    })
                                }
                            />

                            <TextField
                                label="HSN"
                                fullWidth
                                margin="normal"
                                value={this.state.selectedItem.hsn}
                                onChange={(e) =>
                                    this.setState({
                                        selectedItem: {
                                            ...this.state.selectedItem,
                                            hsn: e.target.value
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
                                onClick={this.addItem}
                            >
                                Add
                            </Button>


                        </DialogActions>

                    </Dialog>

                    {/* Delete dialog */}
                    <div className="add-btn-container">
                        <Dialog
                            open={this.state.openDeleteDialog}
                            onClose={this.closeDeleteConfirmation}
                        >

                            <DialogTitle>
                                Confirm Delete
                            </DialogTitle>

                            <DialogContent>
                                Are you sure you want to delete this item?
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
                                    onClick={this.deleteItem}
                                >
                                    Yes, Delete
                                </Button>

                            </DialogActions>

                        </Dialog>
                    </div>
                    <div className="add-btn-container">
                        <Button
                            onClick={this.handleAddItem}
                        >
                            Add Item
                        </Button>
                        {/* <button className="add-item-btn" onClick={this.handleAddItem} >Add Item</button> */}
                    </div>
                </div>
                {/* </div> */}
            </div>
        );
    }
    openDeleteConfirmation = () => {
        this.setState({
            openDeleteDialog: true
        });
    }

    closeDeleteConfirmation = () => {
        this.setState({
            openDeleteDialog: false
        });
    }

    deleteItem = () => {

        axios.delete(
            `http://localhost:8080/item/deleteItem/${this.state.selectedItem.itemCode}`
        )
            .then(() => {

                alert("Item Deleted Successfully");

                this.setState({
                    openDeleteDialog: false,
                    openUpdateDialog: false
                });

                this.fetchAllItems();

            })
            .catch((error) => {
                console.log(error);
            });
    }
    updateItem = () => {
        const headers = {
            'Content-Type': 'application/json'
        }
        axios.post(
            `http://localhost:8080/item/updateItemById/${this.state.selectedItem.itemCode}`,
            this.state.selectedItem, { headers }
        )
            .then(() => {

                alert("Item Updated");

                this.setState({
                    openUpdateDialog: false
                });

                this.loadItems(); // refresh grid

            })
            .catch((error) => {
                console.log(error);
            });

    }

    addItem = () => {
        const headers = {
            'Content-Type': 'application/json'
        }
        axios.post(
            `http://localhost:8080/item/addItem`, this.state.selectedItem, { headers }
        )
            .then(() => {

                alert("New Item Added");

                this.setState({
                    openAddDialog: false
                });

                //this.loadItems(); // refresh grid
                this.props.loadItems();

            })
            .catch((error) => {
                console.log(error);
            });

    }
}

export default Item;