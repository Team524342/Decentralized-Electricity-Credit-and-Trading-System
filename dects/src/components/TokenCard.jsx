import React from "react";
import '../assets/styles.css';

const TokenCard =({ title ,buyElectricity,web3}) =>{
    return(
        <div className="token-card">
           <p>ID:{item.id}</p>
           <p>Seller : {item.seller}</p>
           <p>Amount :{item.amount}</p>
           <p>Price : {web3.utils.fromWei(item.price,"ether")} ETH</p>
           <p>Status :{item.sold ?"Sold":"Availabe"}</p>
           {!item.sold &&(
            <button onClick={()=> buyElectricity(item.id,item.price)}>BUY</button>
           )}
        </div>
    );

}
export default TokenCard;