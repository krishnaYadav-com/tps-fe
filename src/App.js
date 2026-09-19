import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./Dashboard";
import ItemPage from "./ItemPage";
import AddItem from "./AddItem";
import PartyPage from "./PartyPage";
import SalesPage from "./SalesPage";
// import your other pages here

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>

                    {/* Common Layout */}
                    <Route path="/" element={<Dashboard />}>

                        {/* Dashboard page */}
                        <Route index element={<div>Dashboard</div>} />

                        {/* Item page */}
                        <Route
                            path="item"
                            element={<ItemPage />}
                        />

                        {/* Other pages */}
                        <Route
                            path="sales"
                            element={<div><SalesPage /></div>}
                        />

                        <Route
                            path="purchases"
                            element={<div>Purchases</div>}
                        />

                        <Route
                            path="party"
                            element={<PartyPage/>}
                        />

                        <Route
                            path="invoice"
                            element={<div>Invoice</div>}
                        />
                        <Route
                          path="addItem"
                          element={<AddItem/>}
                        />

                    </Route>

                </Routes>
            </BrowserRouter>
        );
    }
}

export default App;
