import React from "react";
import Sidebar from "./Sidebar";
import "./AddItem.css";
import { Link } from "react-router-dom";
import axios from "axios";
class AddItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemName:"",
            unitOfMeasure:"",
            hsn:"",
        };
        this.handleSave=this.handleSave.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
        this.handleItemName=this.handleItemName.bind(this);
        this.handleUnitOfMeasure=this.handleUnitOfMeasure.bind(this);
        this.handleHsn=this.handleHsn.bind(this);
    }

    render() {
        return (
            <div className="page-container">

    <div className="main-content">
        <div className="add-item-card">

        

        <Link to="/item" className="back-btn">
            ← Back to Items
        </Link>

        <h2 className="card-title">Add Item</h2>

        <div className="form-group">
            <label>Item Name</label>
            <input
                type="text"
                placeholder="Enter Item Name"
                value={this.state.itemName}
                onChange={this.handleItemName}
            />
        </div>

        <div className="form-group">
            <label>Unit Of Measure</label>
            <input
                type="text"
                placeholder="Enter Unit Of Measure"
                value={this.state.unitOfMeasure}
                onChange={this.handleUnitOfMeasure}
            />
        </div>

        <div className="form-group">
            <label>HSN</label>
            <input
                type="text"
                placeholder="Enter HSN"
                value={this.state.hsn}
                onChange={this.handleHsn}
            />
        </div>

        <div className="button-container">
            <button className="save-btn" onClick={this.handleSave}>
                Save Item
            </button>

            <Link to="/item">
                <button className="cancel-btn" onClick={this.handleCancel}>
                    Cancel
                </button>
            </Link>
        </div>
        </div>

    </div>
</div>
        );
    }
    handleSave(event){
        const item={
            itemName: this.state.itemName,
            unitOfMeasure: this.state.unitOfMeasure,
            hsn: this.state.hsn,
        }
        
        const headers={
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
        axios.post('http://localhost:8080/item/addItem',item).then((response)=>
            {
                alert("Submitted successfully!!!")
            }).catch((error)=>{
                alert("Error occured while saving the data!!!")
                console.log(error)
            });
    }
    handleCancel(event){
        alert("Changes you made may not be saved")
    }
    
    handleItemName(event){
        this.setState({
            itemName:event.target.value
        })
    }
    handleUnitOfMeasure(event){
        this.setState({
            unitOfMeasure:event.target.value
        })
    }
    handleHsn(event){
        this.setState({
            hsn:event.target.value
        })
    }
}

export default AddItem;