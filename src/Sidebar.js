import React from "react";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import axios from "axios";
import { useNavigate } from "react-router-dom";

class Sidebar extends React.Component {
  render() {
    return (
      <div className="sidebar">
        <p className="logged-in">Logged in as</p>
        <p className="username">Ananya Kulkarni</p>

        <ul>
          <li><Link to="/"className="sidebar-link">Dashboard</Link></li>
          <li><Link to="/item" className="sidebar-link">Item</Link></li>
          {/* <li><Link to="/party" className="sidebar-link">Party</Link></li> */}
          {/* <li><Link to="/sales" className="sidebar-link">Sales</Link></li>
          <li><Link to="/purchase" className="sidebar-link">Purchase</Link></li> */}
        </ul>
      </div>
    );
  }
  handleSalesClick = () => {

    axios.post(
        "http://localhost:8080/sales/start"
    )

    .then((response) => {

        const transactionId =
            response.data.transactionId;


        this.props.navigate(
            `/sales/${transactionId}`
        );

    })

    .catch((error) => {

        console.log(
            "Unable to start Sales transaction:",
            error
        );


        alert(
            "Unable to start Sales transaction."
        );

    });

};
}

export default Sidebar;