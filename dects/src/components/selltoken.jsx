import { sellElectricity } from "../utils/marketplaceUtils";

// Replace handleSell with:
const handleSell = async () => {
  try {
    await sellElectricity(amount, pricePerETK, userAccount);
    alert(`✅ Listed ${amount} ETK at ₹${pricePerETK} each`);
    setAmount("");
  } catch (error) {
    alert(`❌ Error: ${error.message}`);
  }
};