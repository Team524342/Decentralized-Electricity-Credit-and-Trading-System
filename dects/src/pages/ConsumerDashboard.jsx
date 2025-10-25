import React, { useEffect, useState } from "react";
// import '../assets/styles.css';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TokenCard from "../components/TokenCard";


const ConsumerDashboard = () =>{


  const [usageData, setUsageData]=useState([]);
  const [loading,setLoading]=useState(true);
//   useEffect(()=>{
//     axios.get('http://127.0.0.1.8000/api/energy/consumer_1/').then((res)=>{
//         console.log(res.data);
//         const formattedData=res.data.map((item)=>({
//             date:item.date,value:item.energy_consumed,
//         }));
//     setUsageData(formattedData);
//     setLoading(false);
//     })
//     .catch((err )=> console.error(err);
//     setLoading(false);
// });
  
// },[]);  

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
            <div>
                {loading ?(<p>Loading ...</p>) :usageData.length ===0 ?
                (<p>no data available</p>):(
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Energy</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usageData.map((item,index)=>(
                            <tr key={index}>
                                <td>{item.date}</td>
                                <td>{item.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                )
                }
            </div>
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