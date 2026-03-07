import { buyElectricity } from "../utils/marketplaceUtils";

// Inside your component, add a listings section with buy buttons:
<button 
  onClick={() => buyElectricity(1, web3.utils.toWei("0.01", "ether"), userAccount)}
  style={{ padding: "10px 20px", backgroundColor: "#4CAF50", color: "white" }}
>
  Buy Listing #1
</button>