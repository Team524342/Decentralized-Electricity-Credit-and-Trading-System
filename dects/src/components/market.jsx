import TokenCard from "./TokenCard";
import { buyElectricity } from "./utils/marketplaceUtils";

// Inside your component, add a listings section with buy buttons:
function Marketplace({listings,buyElectricity,web3}){
  return(
    <div>
      <h2>Electricity Marketplace</h2>
      {listings.map((item)=> (
        <TokenCard key={item.id}
        item={item}
        buyElectricity={buyElectricity}
        web3={web3}
        />
     
     ))}
    </div>
  );
}
// <button 
//   onClick={() => buyElectricity(1, web3.utils.toWei("0.01", "ether"), userAccount)}
//   style={{ padding: "10px 20px", backgroundColor: "#4CAF50", color: "white" }}
// >
//   Buy Listing #1
// </button>