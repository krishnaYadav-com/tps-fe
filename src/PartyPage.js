import React from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import SearchItem from "./SearchParty";
import Item from "./Item";
import { DataGrid } from '@mui/x-data-grid';
import SearchParty from "./SearchParty";
import Party from "./Party";
class PartyPage extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            searchResults: [],
            columns: [
                { header: "Party Code", field: "partyCode" },
                { header: "Party Name", field: "partyName" },
                { header: "Party Address", field: "partyAddress" },
                { header: "contact No", field: "contactNo" },
                { header: "Email ID", field: "emailId" },
                { header: "Party State", field: "partyState" },
                { header: "gst No", field: "gstNo" },
                { header: "Bank Account Number", field: "bankAccountNo" },
                { header: "IFSC Code", field: "ifscCode" },
                { header: "Payment Terms", field: "paymentTerms" },
                { header: "Frieght Terms", field: "freightTerms" },
                
            ]
        };
    }

    handleSearchResults = (results) => {
        this.setState({
            searchResults: results
        });
    };

        loadItems = () => {
        axios.get("http://localhost:8080/party/getAllParty")
            .then((response) => {
                this.setState({
                    searchResults: response.data
                });
            });
    }
    
    componentDidMount() {
        this.loadItems();
    }

    render() {
        
        return (
            <div className="item-page">
                

                <div className="item-search-card">
                    <div className="search-section">
                        <SearchParty
                            onSearchResults={this.handleSearchResults}
                        />
                    </div>

                    <div className="result-section">
                        <Party
                            parties={this.state.searchResults}
                            columns={this.state.columns}
                            loadItems={this.loadItems}
                        />
                    </div>

                </div>

            </div>
        );
    }
}
export default PartyPage