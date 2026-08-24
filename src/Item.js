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
    constructor(props){
        super(props);
        this.state={
            itemCode:"",
            itemName:"",
            unitOfMeasure:"",
            hsn:"",
            quantity:"",
            items:[],
            openUpdateDialog:"",
            selectedItem:""
        }
    }

    // componentDidMount(){
    //     this.fetchAllItems();
    // }

    fetchAllItems(){
        axios.get('http://localhost:8080/item/getAllItems').then((response)=> {
            this.setState({items:response.data})
        })
        .catch((error)=>{
            console.log("Something went wrong...")
        })
    }
    handleAddItem(event){
        window.location.href="/addItem"
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
                            {/* <table className='inventory-table'>
                                <thead>
                                    <tr>
                                        <th>Item Code</th>
                                        <th>Item Name/Item Description</th>
                                        <th>Unit</th>
                                        <th>HSN</th>
                                        <th>Stock</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.items.map((item,index)=>
                                        <tr key={index}>
                                            <td>{item.itemCode}</td>
                                            <td>{item.itemName}</td>
                                            <td>{item.unitOfMeasure}</td>
                                            <td>{item.hsn}</td>
                                            <td>{item.quantity}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table> */}
                        </div>
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
                        <div className="add-btn-container">
                            <button className="add-item-btn" onClick={this.handleAddItem} >+Add Item</button>
                        </div>
                    </div>
                {/* </div> */}
            </div>
        );
    }
    updateItem = () => {
        const headers={
            'Content-Type': 'application/json'
        }
        axios.post(
            `http://localhost:8080/updateEmployeeById/${this.state.selectedItem.itemCode}`,
            this.state.selectedItem,{headers}
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
}

export default Item;