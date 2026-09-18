import React from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import "./SearchItem.css"
class SearchParty extends React.Component{
    constructor(props){
        super(props);
        this.state={
            partyName:"",
            state:"",
            paymentTerms:"",
            freightTerms:"",
            searchText: "",
            parties: []
        }
        this.handleSearch=this.handleSearch.bind(this);
        this.handlePartyNameChange=this.handlePartyNameChange.bind(this);
        this.handleStateChange=this.handleStateChange.bind(this);
        this.handlePaymentTermsChange=this.handlePaymentTermsChange.bind(this);
        this.handleFreightTermsChange=this.handleFreightTermsChange.bind(this);
    }
    render(){
        return(
            <div className="search-container">

                <div className="search-field">
                    <label>Party Name</label>
                    <input
                        type="text"
                        value={this.state.partyName}
                        onChange={this.handlePartyNameChange}
                    />
                </div>

                <div className="search-field">
                    <label>state</label>
                    <input
                        type="text"
                        value={this.state.state}
                        onChange={this.handleStateChange}
                    />
                </div>

                <div className="search-field">
                    <label>payment Terms</label>
                    <input
                        type="text"
                        value={this.state.paymentTerms}
                        onChange={this.handlePaymentTermsChange}
                    />
                </div>
                <div className="search-field">
                    <label>Frieght Terms</label>
                    <input
                        type="text"
                        value={this.state.freightTerms}
                        onChange={this.handleFreightTermsChange}
                    />
                </div>
                <button
                    className="search-button"
                    onClick={this.handleSearch}
                >
                    Search
                </button>

            </div>
        )
    }
    handleSearch = () => {
        const searchModel=this.state;
        axios.post(
            "http://localhost:8080/party/searchParty",
            searchModel
        )
            .then((response) => {
                console.log(response.data);
                this.props.onSearchResults(response.data);
            })
            .catch((error) => {
                console.log(error.response.data);
                alert(error.response.data);
            });
            
    }
    handlePartyNameChange(event){

        this.setState({
            partyName:event.target.value
        })
    }
    handleStateChange(event){

        this.setState({
            state:event.target.value
        })
    }
    handlePaymentTermsChange(event){

        this.setState({
            paymentTerms:event.target.value
        })
    }
    handleFreightTermsChange(event){

        this.setState({
            freightTerms:event.target.value
        })
    }
}
export default SearchParty