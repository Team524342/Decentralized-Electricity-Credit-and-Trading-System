import React, { useState } from "react";
// import '../assets/styles.css';
import Navbar2 from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TokenCard from "../components/TokenCard";


const ConsumerDashboard = () =>{

 const[tokenBalance,setTokenBalance]=useState(100);
 const[buyAmount,setBuyAmount]=useState('');
 const handleBuyTokens = () =>{
    if(buyAmount <=0 )
        return alert('Enter a valid amount');
    setTokenBalance(tokenBalance + parseInt(buyAmount));
    setBuyAmount('');
    alert('Tokens purchased successfully !');
 } 

    return (
        <div>
            <Navbar2 />
            <Sidebar />
            <div className="main-content">
                <h3>Welcome ,Producer !</h3>
                <p>
                    Here you can view your token blance,Sale tokens,and track your Token Energy sales.
                </p>
                {/* Token Balance */}
                <TokenCard title={"Your Token Balance"} value={`${tokenBalance} ET`} />
                {/* Sale Token  Section  */}
                <div className="buy-tokens">
                    <h4>Sale Energy Token</h4>
                    <input type="number" placeholder="Enter Amount" value={buyAmount}
                    onChange={(e)=>setBuyAmount(e.target.value)} />
                     <button onClick={handleBuyTokens}>Sale Tokens</button>
                </div>

            </div>
            
        </div>
    );
}
export default ConsumerDashboard;