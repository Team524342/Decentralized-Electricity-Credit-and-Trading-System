import React from "react";
import '../assets/styles.css';

const TokenCard =({ title ,value}) =>{
    return(
        <div className="token-card">
            <h4>{title}</h4>
            <p>{value}</p>

        </div>
    );

}
export default TokenCard;