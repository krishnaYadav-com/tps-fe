import React from "react";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';

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
}

export default Sidebar;