import React from "react";

import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import SearchItem from "./SearchItem";

import "./Purchase.css";


class PurchaseItemPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            searchResults: [],

            selectedItems:
                props.purchaseData &&
                props.purchaseData.items
                    ? props.purchaseData.items
                    : [],

            openSearchDialog:
                false
        };
    }


    handleSearchResults = (
        results
    ) => {

        this.setState({
            searchResults:
                results || []
        });
    };


    selectItem = (
        item
    ) => {

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

            itemCode:
                item.itemCode,

            itemName:
                item.itemName,

            unitOfMeasure:
                item.unitOfMeasure,

            hsn:
                item.hsn,

            quantity:
                1,

            rate:
                item.itemRate,

            gstPer:
                item.gstPer,

            subAmount:
                Number(item.itemRate),

            taxAmount:
                (
                    Number(item.itemRate) *
                    Number(item.gstPer)
                ) / 100,

            inclusiveAmount:
                Number(item.itemRate) +
                (
                    Number(item.itemRate) *
                    Number(item.gstPer)
                ) / 100
        };


        this.setState({

            selectedItems: [
                ...this.state.selectedItems,
                newItem
            ],

            openSearchDialog:
                false

        });
    };


    handleQuantityChange = (
        itemCode,
        quantity
    ) => {

        const newQuantity =
            Number(quantity);


        const updatedItems =
            this.state.selectedItems.map(
                (item) => {

                    if (
                        item.itemCode ===
                        itemCode
                    ) {

                        const subAmount =
                            newQuantity *
                            Number(item.rate);

                        const taxAmount =
                            (
                                subAmount *
                                Number(item.gstPer)
                            ) / 100;

                        return {

                            ...item,

                            quantity:
                                newQuantity,

                            subAmount:
                                subAmount,

                            taxAmount:
                                taxAmount,

                            inclusiveAmount:
                                subAmount +
                                taxAmount

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


    handleRateChange = (
        itemCode,
        rate
    ) => {

        const newRate =
            Number(rate);


        const updatedItems =
            this.state.selectedItems.map(
                (item) => {

                    if (
                        item.itemCode ===
                        itemCode
                    ) {

                        const subAmount =
                            Number(item.quantity) *
                            newRate;

                        const taxAmount =
                            (
                                subAmount *
                                Number(item.gstPer)
                            ) / 100;

                        return {

                            ...item,

                            rate:
                                newRate,

                            subAmount:
                                subAmount,

                            taxAmount:
                                taxAmount,

                            inclusiveAmount:
                                subAmount +
                                taxAmount

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


    removeItem = (
        itemCode
    ) => {

        const updatedItems =
            this.state.selectedItems.filter(
                (item) =>
                    item.itemCode !==
                    itemCode
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


        /*
         * No inventory validation here.
         *
         * Purchase quantity represents
         * quantity that will be received.
         */
        this.props.saveStepAndNext(

            {
                items:
                    this.state.selectedItems
            },

            {
                items:
                    this.state.selectedItems
            }

        );
    };


    render() {

        const columns = [

            {
                field: "itemCode",
                headerName: "Item Code",
                width: 120
            },

            {
                field: "itemName",
                headerName: "Item Name",
                width: 180
            },

            {
                field: "unitOfMeasure",
                headerName: "UOM",
                width: 100
            },

            {
                field: "hsn",
                headerName: "HSN",
                width: 120
            },

            {
                field: "select",
                headerName: "Action",
                width: 100,

                sortable: false,
                filterable: false,

                renderCell: (params) => (

                    <Button
                        variant="contained"
                        size="small"
                        onClick={() =>
                            this.selectItem(
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
                    Item Selection
                </h2>


                <div className="purchase-search-row">

                    <Button
                        variant="outlined"
                        onClick={() =>
                            this.setState({
                                openSearchDialog:
                                    true
                            })
                        }
                    >
                        Search Item
                    </Button>

                </div>


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
                        Search Item
                    </DialogTitle>

                    <DialogContent>

                        <SearchItem
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
                                        row.itemCode
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


                <div className="purchase-inner-card">

                    <h3>
                        Selected Items
                    </h3>


                    <table className="purchase-items-table">

                        <thead>

                            <tr>

                                <th>
                                    Item Code
                                </th>

                                <th>
                                    Item Name
                                </th>

                                <th>
                                    UOM
                                </th>

                                <th>
                                    Qty
                                </th>

                                <th>
                                    Purchase Rate
                                </th>

                                <th>
                                    GST %
                                </th>

                                <th>
                                    Amount
                                </th>

                                <th>
                                    Action
                                </th>

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
                                                {
                                                    item.unitOfMeasure
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
                                                        (event) =>
                                                            this.handleQuantityChange(
                                                                item.itemCode,
                                                                event.target.value
                                                            )
                                                    }
                                                />

                                            </td>

                                            <td>

                                                <TextField
                                                    type="number"
                                                    size="small"
                                                    value={
                                                        item.rate
                                                    }
                                                    inputProps={{
                                                        min: 0
                                                    }}
                                                    onChange={
                                                        (event) =>
                                                            this.handleRateChange(
                                                                item.itemCode,
                                                                event.target.value
                                                            )
                                                    }
                                                />

                                            </td>

                                            <td>
                                                {
                                                    item.gstPer
                                                }%
                                            </td>

                                            <td>
                                                ₹
                                                {" "}
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


                <div className="purchase-total">

                    <h3>

                        Subtotal:
                        {" "}
                        ₹
                        {
                            this
                                .calculateSubtotal()
                                .toFixed(2)
                        }

                    </h3>

                </div>


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

export default PurchaseItemPage;