import React from "react";
import '../assets/styles.css';
const Sidebar =()=>{
    return(
        <div className="sidebar">
            <a href="#" >Dashboard</a>
            <a href="#">Buy Tokens</a>
            <a href="#">View Bills</a>
            <a href="#">Energy Usage</a>
            <a href="#">Profile</a>
        </div>
    );
}
export default Sidebar;