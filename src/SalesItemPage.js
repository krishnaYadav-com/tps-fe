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

import SearchItem from "./SearchItem";


class SalesItemPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            itemCode: "",

            searchResults: [],

            selectedItems:
                this.props.salesData.items || [],

            openSearchDialog: false

        };

    }


    /*
     * Search item by Item Code.
     *
     * Current backend contract only has
     * GET /item/getAllItems, so we use that
     * endpoint and find the requested code.
     */

    handleItemCodeBlur = () => {

        const itemCode =
            this.state.itemCode;


        if (!itemCode) {

            return;

        }


        axios.get(
            "http://localhost:8080/item/getAllItems"
        )

        .then((response) => {

            const item =
                response.data.find(
                    (currentItem) =>
                        Number(
                            currentItem.itemCode
                        ) ===
                        Number(itemCode)
                );


            if (!item) {

                alert(
                    "Item not found."
                );

                return;

            }


            this.selectItem(
                item
            );

        })

        .catch((error) => {

            console.log(
                "Item lookup error:",
                error
            );


            alert(
                "Unable to find item."
            );

        });

    };


    loadAllItems = () => {

        axios.get(
            "http://localhost:8080/item/getAllItems"
        )

        .then((response) => {

            this.setState({

                searchResults:
                    response.data

            });

        })

        .catch((error) => {

            console.log(
                "Error loading items:",
                error
            );

        });

    };


    openItemSearch = () => {

        this.loadAllItems();


        this.setState({

            openSearchDialog:
                true

        });

    };


    closeItemSearch = () => {

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


    renderSelectButton = (
        params
    ) => {

        return (

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

        );

    };


    selectItem = (item) => {

        const alreadySelected =
            this.state.selectedItems.some(
                (selectedItem) =>
                    Number(
                        selectedItem.itemCode
                    ) ===
                    Number(
                        item.itemCode
                    )
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
                Number(item.itemRate),

            gstPer:
                Number(item.gstPer),

            amount:
                Number(item.itemRate)

        };


        this.setState({

            selectedItems: [

                ...this.state.selectedItems,

                newItem

            ],

            itemCode:
                item.itemCode,

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
                        Number(
                            item.itemCode
                        ) ===
                        Number(itemCode)
                    ) {

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
                        Number(
                            item.itemCode
                        ) ===
                        Number(itemCode)
                    ) {

                        return {

                            ...item,

                            rate:
                                newRate,

                            amount:
                                Number(item.quantity) *
                                newRate

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
                    Number(
                        item.itemCode
                    ) !==
                    Number(itemCode)
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


    const inventoryRequest = {

        transactionId:
            this.props.salesData.transactionId,

        items:
            this.state.selectedItems.map(
                (item) => {

                    return {
                        itemCode:
                            item.itemCode,

                        quantity:
                            item.quantity
                    };

                }
            )
    };


    axios.post(
        "http://localhost:8080/inventory/validate",
        inventoryRequest
    )
        .then(() => {

            /*
             * Inventory is available.
             * Now proceed with the normal Step 3 save.
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

        })
        .catch((error) => {

            console.log(
                "Inventory validation failed:",
                error
            );


            let message =
                "Unable to validate inventory.";


            if (
                error.response &&
                error.response.data
            ) {

                message =
                    error.response.data;

            }


            alert(message);

        });

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
                width: 220
            },

            {
                field: "unitOfMeasure",
                headerName: "UOM",
                width: 100
            },

            {
                field: "hsn",
                headerName: "HSN",
                width: 140
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
                    Item Selection
                </Typography>

                <Typography
                    variant="body2"
                    style={{
                        color: "#64748b",
                        marginTop: "5px",
                        marginBottom: "25px"
                    }}
                >
                    Select items and enter the transaction
                    quantity and rate.
                </Typography>


                {/* ITEM SEARCH CARD */}

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
                            Item Selection
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
                                label="Item Code"
                                type="number"
                                size="small"
                                value={
                                    this.state.itemCode
                                }
                                onChange={(event) =>
                                    this.setState({

                                        itemCode:
                                            event.target.value

                                    })
                                }
                                onBlur={
                                    this.handleItemCodeBlur
                                }
                                style={{
                                    width: "200px"
                                }}
                            />


                            <Button
                                variant="contained"
                                onClick={
                                    this.openItemSearch
                                }
                            >
                                Search Item
                            </Button>

                        </div>

                    </CardContent>

                </Card>


                {/* SELECTED ITEMS */}

                <Card
                    elevation={0}
                    style={{
                        marginTop: "20px",
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
                            Selected Items
                        </Typography>


                        <Divider
                            style={{
                                marginTop: "15px",
                                marginBottom: "20px"
                            }}
                        />


                        {
                            this.state.selectedItems.length ===
                            0
                                ? (

                                    <Typography
                                        variant="body2"
                                        style={{
                                            color:
                                                "#64748b",
                                            padding:
                                                "20px 0"
                                        }}
                                    >
                                        No items selected yet.
                                    </Typography>

                                )
                                : (

                                    <div
                                        style={{
                                            overflowX:
                                                "auto"
                                        }}
                                    >

                                        <table
                                            style={{
                                                width:
                                                    "100%",
                                                borderCollapse:
                                                    "collapse",
                                                minWidth:
                                                    "950px"
                                            }}
                                        >

                                            <thead>

                                                <tr>

                                                    <th style={
                                                        this.headerStyle
                                                    }>
                                                        Item Code
                                                    </th>

                                                    <th style={
                                                        this.headerStyle
                                                    }>
                                                        Item Name
                                                    </th>

                                                    <th style={
                                                        this.headerStyle
                                                    }>
                                                        UOM
                                                    </th>

                                                    <th style={
                                                        this.headerStyle
                                                    }>
                                                        Qty
                                                    </th>

                                                    <th style={
                                                        this.headerStyle
                                                    }>
                                                        Rate
                                                    </th>

                                                    <th style={
                                                        this.headerStyle
                                                    }>
                                                        GST %
                                                    </th>

                                                    <th style={
                                                        this.headerStyle
                                                    }>
                                                        Sub Amount
                                                    </th>

                                                    <th style={
                                                        this.headerStyle
                                                    }>
                                                        Action
                                                    </th>

                                                </tr>

                                            </thead>


                                            <tbody>

                                                {
                                                    this.state
                                                        .selectedItems
                                                        .map(
                                                            (item) => (

                                                                <tr
                                                                    key={
                                                                        item.itemCode
                                                                    }
                                                                >

                                                                    <td style={
                                                                        this.cellStyle
                                                                    }>
                                                                        {
                                                                            item.itemCode
                                                                        }
                                                                    </td>


                                                                    <td style={
                                                                        this.cellStyle
                                                                    }>
                                                                        {
                                                                            item.itemName
                                                                        }
                                                                    </td>


                                                                    <td style={
                                                                        this.cellStyle
                                                                    }>
                                                                        {
                                                                            item.unitOfMeasure
                                                                        }
                                                                    </td>


                                                                    <td style={
                                                                        this.cellStyle
                                                                    }>

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
                                                                            style={{
                                                                                width:
                                                                                    "85px"
                                                                            }}
                                                                        />

                                                                    </td>


                                                                    <td style={
                                                                        this.cellStyle
                                                                    }>

                                                                        <TextField
                                                                            type="number"
                                                                            size="small"
                                                                            value={
                                                                                item.rate
                                                                            }
                                                                            inputProps={{
                                                                                min: 0,
                                                                                step:
                                                                                    "0.01"
                                                                            }}
                                                                            onChange={
                                                                                (event) =>
                                                                                    this.handleRateChange(

                                                                                        item.itemCode,

                                                                                        event.target.value

                                                                                    )
                                                                            }
                                                                            style={{
                                                                                width:
                                                                                    "110px"
                                                                            }}
                                                                        />

                                                                    </td>


                                                                    <td style={
                                                                        this.cellStyle
                                                                    }>
                                                                        {
                                                                            item.gstPer
                                                                        }%
                                                                    </td>


                                                                    <td
                                                                        style={{
                                                                            ...this.cellStyle,
                                                                            fontWeight:
                                                                                600
                                                                        }}
                                                                    >

                                                                        ₹{" "}

                                                                        {
                                                                            (
                                                                                Number(
                                                                                    item.quantity
                                                                                ) *
                                                                                Number(
                                                                                    item.rate
                                                                                )
                                                                            ).toFixed(
                                                                                2
                                                                            )
                                                                        }

                                                                    </td>


                                                                    <td style={
                                                                        this.cellStyle
                                                                    }>

                                                                        <Button
                                                                            color="error"
                                                                            size="small"
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

                                )
                        }


                        {
                            this.state.selectedItems.length >
                            0 && (

                                <div
                                    style={{
                                        marginTop: "20px",
                                        paddingTop: "15px",
                                        borderTop:
                                            "1px solid #e2e8f0",
                                        textAlign:
                                            "right"
                                    }}
                                >

                                    <Typography
                                        variant="h6"
                                        style={{
                                            fontWeight: 600
                                        }}
                                    >
                                        Subtotal: ₹{" "}
                                        {
                                            this
                                                .calculateSubtotal()
                                                .toFixed(2)
                                        }
                                    </Typography>

                                </div>

                            )
                        }

                    </CardContent>

                </Card>


                {/* ITEM SEARCH DIALOG */}

                <Dialog
                    open={
                        this.state.openSearchDialog
                    }
                    onClose={
                        this.closeItemSearch
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
                                Item List
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
                                            row.itemCode
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
                                this.closeItemSearch
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


    headerStyle = {

        textAlign: "left",

        padding:
            "12px 10px",

        backgroundColor:
            "#f8fafc",

        color:
            "#475569",

        fontSize:
            "13px",

        fontWeight:
            600,

        borderBottom:
            "1px solid #e2e8f0"

    };


    cellStyle = {

        padding:
            "12px 10px",

        color:
            "#334155",

        fontSize:
            "14px",

        borderBottom:
            "1px solid #f1f5f9"

    };

}

export default SalesItemPage;