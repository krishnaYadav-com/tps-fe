import React from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "./Sidebar";


function SidebarWithNavigation() {

    const navigate =
        useNavigate();


    return (

        <Sidebar
            navigate={
                navigate
            }
        />

    );

}

export default SidebarWithNavigation;