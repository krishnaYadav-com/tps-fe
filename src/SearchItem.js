import React from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import "./SearchItem.css"
class SearchItem extends React.Component{
    constructor(props){
        super(props);
        this.state={
            itemName:"",
            minAmount:0,
            maxAmount:0
        }
        this.handleSearch=this.handleSearch.bind(this);
        this.handleItemNameChange=this.handleItemNameChange.bind(this);
        this.handleMinAmountChange=this.handleMinAmountChange.bind(this);
        this.handleMaxAmountChange=this.handleMaxAmountChange.bind(this);
    }
    render(){
        return(
            <div className="search-container">

                <div className="search-field">
                    <label>Item Name</label>
                    <input
                        type="text"
                        value={this.state.itemName}
                        onChange={this.handleItemNameChange}
                    />
                </div>

                <div className="search-field">
                    <label>Min Amount</label>
                    <input
                        type="text"
                        value={this.state.minAmount}
                        onChange={this.handleMinAmountChange}
                    />
                </div>

                <div className="search-field">
                    <label>Max Amount</label>
                    <input
                        type="text"
                        value={this.state.maxAmount}
                        onChange={this.handleMaxAmountChange}
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
        axios.post(`http://localhost:8080/item/searchItem`,searchModel)
            .then((response) => {
                console.log(response.data);
                this.props.onSearchResults(response.data);
            })
            .catch((error) => {
                console.log(error.response.data);
                alert(error.response.data);
            });
    }
    handleItemNameChange(event){

        this.setState({
            itemName:event.target.value
        })
    }
    handleMinAmountChange(event){

        this.setState({
            minAmount:event.target.value
        })
    }
    handleMaxAmountChange(event){

        this.setState({
            maxAmount:event.target.value
        })
    }
}
export default SearchItem