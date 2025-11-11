import React from "react";
import '../assets/styles.css';
import { Zap } from "lucide-react";

const Navbar=() => {
    const links=[
        'Dashboard','Trading Market','Transaction History','Analytics/Reports','Settings','Support/Help'
    ];



    return(
        <div className="navbars">
       {/* <h1><Zap/>Consumer Dashboard</h1> */}
       <nav>
        <div>D-Grid</div>
        <ul className="navList">
            {links.map(link =>(
                <li key={link} className="navItem">
                <a href={`/$ {link.toLowerCase().replace('/',' ')}`} className="navLink">{link}</a></li>
            ))}
        </ul>
       </nav>
        </div>
        
    );
}
export default Navbar;