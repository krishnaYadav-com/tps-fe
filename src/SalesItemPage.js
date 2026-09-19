import React from "react";
import axios from "axios";


import {
    DataGrid
} from "@mui/x-data-grid";

import {
    Button,
    TextField
} from "@mui/material";

import SearchItem from "./SearchItem";


class SalesItemPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            searchResults: [],

            selectedItems:
                this.props.salesData.items || [],

            columns: [

                {
                    field: "itemCode",
                    headerName: "Item Code",
                    width: 120
                },

                {
                    field: "itemName",
                    headerName: "Item Name",
                    width: 200
                },

                {
                    field: "unitOfMeasure",
                    headerName: "UOM",
                    width: 120
                },

                {
                    field: "hsn",
                    headerName: "HSN",
                    width: 130
                },

                {
                    field: "itemRate",
                    headerName: "Rate",
                    width: 120
                },

                {
                    field: "gstPer",
                    headerName: "GST %",
                    width: 100
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

    loadItems = () => {
        axios.get("http://localhost:8080/item/getAllItems")
            .then((response) => {
                this.setState({
                    searchResults: response.data
                });
            });
    }
    
    componentDidMount() {
        this.loadItems();
    }
    handleSearchResults = (results) => {

        const formattedResults = results.map(
            (item) => {

                return {

                    ...item,

                    id: item.itemCode

                };

            }
        );


        this.setState({

            searchResults:
                formattedResults

        });

    };


    renderSelectButton = (params) => {

        return (

            <Button
                variant="contained"
                size="small"
                onClick={() => {

                    this.selectItem(params.row);

                }}
            >
                Select
            </Button>

        );

    };


    selectItem = (item) => {

        const alreadySelected =
            this.state.selectedItems.some(
                (selectedItem) =>
                    selectedItem.itemCode ===
                    item.itemCode
            );


        if (alreadySelected) {

            alert(
                "This item has already been selected."
            );

            return;
        }


        const newItem = {

            itemCode: item.itemCode,

            itemName: item.itemName,

            unitOfMeasure:
                item.unitOfMeasure,

            hsn: item.hsn,

            quantity: 1,

            rate: item.itemRate,

            gstPer: item.gstPer,

            amount: item.itemRate

        };


        this.setState({

            selectedItems: [

                ...this.state.selectedItems,

                newItem

            ]

        });

    };


    handleQuantityChange = (
        itemCode,
        quantity
    ) => {

        const updatedItems =
            this.state.selectedItems.map(
                (item) => {

                    if (
                        item.itemCode ===
                        itemCode
                    ) {

                        const newQuantity =
                            Number(quantity);

                        return {

                            ...item,

                            quantity:
                                newQuantity,

                            amount:
                                newQuantity *
                                Number(item.rate)

                        };

                    }

                    return item;

                }
            );


        this.setState({

            selectedItems:
                updatedItems

        });

    };


    removeItem = (itemCode) => {

        const updatedItems =
            this.state.selectedItems.filter(
                (item) =>
                    item.itemCode !== itemCode
            );


        this.setState({

            selectedItems:
                updatedItems

        });

    };


    calculateSubtotal = () => {

        let subtotal = 0;


        this.state.selectedItems.forEach(
            (item) => {

                subtotal +=
                    Number(item.quantity) *
                    Number(item.rate);

            }
        );


        return subtotal;

    };


    handleNext = () => {

        if (
            this.state.selectedItems.length === 0
        ) {

            alert(
                "Please select at least one item."
            );

            return;

        }


        this.props.updateSalesData({

            items:
                this.state.selectedItems

        });


        this.props.nextStep();

    };


    render() {

        return (

            <div className="sales-card">

                <h2>Item Selection</h2>


                <div className="search-section">

                    <SearchItem

                        onSearchResults={
                            this.handleSearchResults
                        }

                    />

                </div>


                <div
                    style={{
                        marginTop: "25px"
                    }}
                >

                    <h3>Search Results</h3>


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

                            pageSizeOptions={[
                                5,
                                10,
                                20
                            ]}

                        />

                    </div>

                </div>


                <div
                    style={{
                        marginTop: "30px"
                    }}
                >

                    <h3>Selected Items</h3>


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

                                <th>Action</th>

                            </tr>

                        </thead>


                        <tbody>

                            {
                                this.state.selectedItems.map(
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

                                                <TextField
                                                    type="number"
                                                    size="small"
                                                    value={
                                                        item.quantity
                                                    }
                                                    inputProps={{
                                                        min: 1
                                                    }}
                                                    onChange={
                                                        (event) => {

                                                            this.handleQuantityChange(

                                                                item.itemCode,

                                                                event.target.value

                                                            );

                                                        }
                                                    }
                                                />

                                            </td>

                                            <td>
                                                ₹{" "}
                                                {
                                                    item.rate
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

                                            <td>

                                                <Button
                                                    color="error"
                                                    onClick={() =>
                                                        this.removeItem(
                                                            item.itemCode
                                                        )
                                                    }
                                                >
                                                    Remove
                                                </Button>

                                            </td>

                                        </tr>

                                    )
                                )
                            }

                        </tbody>

                    </table>

                </div>


                <div
                    style={{
                        marginTop: "20px",
                        textAlign: "right"
                    }}
                >

                    <h3>

                        Subtotal:
                        {" "}
                        ₹
                        {
                            this.calculateSubtotal()
                                .toFixed(2)
                        }

                    </h3>

                </div>


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

export default SalesItemPage;