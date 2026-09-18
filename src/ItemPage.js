import React from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import SearchItem from "./SearchItem";
import Item from "./Item";
import { DataGrid } from '@mui/x-data-grid';
class ItemPage extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            searchResults: [],
            columns: [
                { header: "Item Code", field: "itemCode" },
                { header: "Item Name", field: "itemName" },
                { header: "UOM", field: "unitOfMeasure" },
                { header: "HSN", field: "hsn" },
                { header: 'Item Rate', field: 'itemRate'},
                { header: 'GST %', field: 'gstPer'}
            ]
        };
    }

    handleSearchResults = (results) => {
        this.setState({
            searchResults: results
        });
    };

    render() {
        
        return (
            <div className="item-page">
                

                <div className="item-search-card">
                    <div className="search-section">
                        <SearchItem
                            onSearchResults={this.handleSearchResults}
                        />
                    </div>


                    <div className="result-section">
                        <Item
                            items={this.state.searchResults}
                            columns={this.state.columns}
                            loadItems={this.loadItems}
                        />
                    </div>

                </div>

            </div>
        );
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
}
export default ItemPage