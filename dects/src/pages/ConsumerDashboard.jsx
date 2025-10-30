import React from "react";
import Sidebar from "../components/adminSidebar";
import { useState } from "react";
import "../assets/adminPanal.css";

function Overview(){ return <div><h2>Overview</h2><p>Overview stats...</p></div>; }
function FileComplaint(){ return <div><h2>File Complaint</h2><p>Form goes here</p></div>; }
function History(){ return <div><h2>Complaint History</h2><p>List of complaints</p></div>; }
function Track(){ return <div><h2>Track Status</h2><p>Track active tickets</p></div>; }
function Technician(){ return <div><h2>Technician Board</h2></div>; }
function Reports(){ return <div><h2>Reports</h2></div>; }
function Profile(){ return <div><h2>Profile</h2></div>; }
function Settings(){ return <div><h2>Settings</h2></div>; }
function Help(){ return <div><h2>Help</h2></div>; }

const pageMap = {
  Overview: <Overview/>,
  file: <FileComplaint/>,
  history: <History/>,
  track: <Track/>,
  technician: <Technician/>,
  reports: <Reports/>,
  profile: <Profile/>,
  settings: <Settings/>,
  help: <Help/>
};

function ConsumerDashboard() {
  const [active, setActive] = useState("Overview");
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <Sidebar
            active={active}
             setActive={setActive}
             collapsed={collapsed}
             setCollapsed={setCollapsed}
             role="consumer" // change to "admin" to show all tabs 
      />
      <h1>Welcome, Consumer ⚡</h1>
       <section style={{ background:"#fff", padding:20, borderRadius:8, boxShadow:"0 6px 18px rgba(2,6,23,0.06)" }}>
                        {pageMap[active] || <div>Not found</div>}
                        <div style={{ height: "1200px" }}>
                            Scroll to test sidebar – it stays fixed 🎯
                        </div>
       </section>
    </div>
  );
}

export default ConsumerDashboard;

// import React, { useEffect, useState } from "react";
// // import '../assets/styles.css';
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import TokenCard from "../components/TokenCard";
// import { Link } from "react-router-dom";


// const ConsumerDashboard = () =>{


//   const [usageData, setUsageData]=useState([]);
//   const [loading,setLoading]=useState(true);
// //   useEffect(()=>{
// //     axios.get('http://127.0.0.1.8000/api/energy/consumer_1/').then((res)=>{
// //         console.log(res.data);
// //         const formattedData=res.data.map((item)=>({
// //             date:item.date,value:item.energy_consumed,
// //         }));
// //     setUsageData(formattedData);
// //     setLoading(false);
// //     })
// //     .catch((err )=> console.error(err);
// //     setLoading(false);
// // });
  
// // },[]);  

//  const[tokenBalance,setTokenBalance]=useState(100);
//  const[buyAmount,setBuyAmount]=useState('');
//  const handleBuyTokens = () =>{
//     if(buyAmount <=0 )
//         return alert('Enter a valid amount');
//     setTokenBalance(tokenBalance + parseInt(buyAmount));
//     setBuyAmount('');
//     alert('Tokens purchased successfully !');
//  } 

//     return (
//         <div>
//             <Navbar />
//             <Sidebar />
//             <div>
//                 {loading ?(<p>Loading ...</p>) :usageData.length ===0 ?
//                 (<p>no data available</p>):(
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Date</th>
//                             <th>Energy</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {usageData.map((item,index)=>(
//                             <tr key={index}>
//                                 <td>{item.date}</td>
//                                 <td>{item.value}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//                 )
//                 }
//             </div>
//             <div className="main-content">
//                 <h3>Welcome ,Consumer !</h3>
//                 <p>
//                     Here you can view your token blance,buy tokens,and track your Energy usage.
//                 </p>
//                 <Link to="/admin">Go to AdminPanal</Link>
//                 {/* Token Balance */}
//                 <TokenCard title={"Your Token Balance"} value={`${tokenBalance} ET`} />
//                 {/* Buy Token  Section  */}
//                 <div className="buy-tokens">
//                     <h4>buy Energy Token</h4>
//                     <input type="number" placeholder="Enter Amount" value={buyAmount}
//                     onChange={(e)=>setBuyAmount(e.target.value)} />
//                      <button onClick={handleBuyTokens}>Buy Tokens</button>
//                 </div>

//             </div>
            
//         </div>
//     );
// }
// export default ConsumerDashboard;