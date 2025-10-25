import React, { useState } from "react";
// import '../assets/styles.css';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TokenCard from "../components/TokenCard";
import { Link } from "react-router-dom";


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
            <Navbar />
            <Sidebar />
            <div className="main-content">
                <h3>Welcome ,Consumer !</h3>
                <p>
                    Here you can view your token blance,buy tokens,and track your Energy usage.
                </p>
                <Link to="/admin">Go to AdminPanal</Link>
                {/* Token Balance */}
                <TokenCard title={"Your Token Balance"} value={`${tokenBalance} ET`} />
                {/* Buy Token  Section  */}
                <div className="buy-tokens">
                    <h4>buy Energy Token</h4>
                    <input type="number" placeholder="Enter Amount" value={buyAmount}
                    onChange={(e)=>setBuyAmount(e.target.value)} />
                     <button onClick={handleBuyTokens}>Buy Tokens</button>
                </div>

            </div>
            
        </div>
    );
}
export default ConsumerDashboard;