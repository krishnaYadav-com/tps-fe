import React from "react";

import {
    useParams
} from "react-router-dom";

import SalesPage from "./SalesPage";


function SalesPageWithNavigation() {

    const params =
        useParams();


    return (

        <SalesPage
            transactionNo={
                params.transactionNo
            }
        />

    );

}

export default SalesPageWithNavigation;