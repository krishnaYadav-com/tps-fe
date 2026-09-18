import "./Dashboard.css";
import React from "react";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, Outlet } from "react-router-dom";

class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            drawerOpen: false
        };
    }

    openDrawer = () => {
        this.setState({
            drawerOpen: true
        });
    };

    closeDrawer = () => {
        this.setState({
            drawerOpen: false
        });
    };

    render() {
        return (
            <div className="dashboard-wrapper">

                {/* Common Header */}
                <div className="dashboard-header">

                    <button
                        className="menu-btn"
                        onClick={this.openDrawer}
                    >
                        <MenuIcon />
                    </button>

                    <h1>
                        Advantage Industrial Suppliers
                    </h1>

                </div>


                {/* Common Drawer */}
                <Drawer
                    anchor="left"
                    open={this.state.drawerOpen}
                    onClose={this.closeDrawer}
                >

                    <div className="drawer-content">

                        <h2>AIS</h2>

                        <ul>

                            <li>
                                <Link
                                    to="/"
                                    className="drawer-link"
                                    onClick={this.closeDrawer}
                                >
                                    Dashboard
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/item"
                                    className="drawer-link"
                                    onClick={this.closeDrawer}
                                >
                                    Item
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/sales"
                                    className="drawer-link"
                                    onClick={this.closeDrawer}
                                >
                                    Sales
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/purchases"
                                    className="drawer-link"
                                    onClick={this.closeDrawer}
                                >
                                    Purchases
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/party"
                                    className="drawer-link"
                                    onClick={this.closeDrawer}
                                >
                                    Party
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/invoice"
                                    className="drawer-link"
                                    onClick={this.closeDrawer}
                                >
                                    Invoice
                                </Link>
                            </li>

                        </ul>

                    </div>

                </Drawer>


                {/* Current Page */}
                <div className="dashboard-content">
                    <Outlet />
                </div>

            </div>
        );
    }
}

export default Dashboard;
