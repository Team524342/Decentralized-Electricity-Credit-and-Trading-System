# Simulated Blockchain Smart Contract
class TokenContract:
    def __init__(self):
        self.token_supply = 0
        self.transactions = []

    def mint(self, producer_name, amount):
        self.token_supply += amount
        self.transactions.append({
            "type": "Mint",
            "producer": producer_name,
            "amount": amount
        })
        return f"{amount} ETK minted for {producer_name}"

    def burn(self, producer_name, amount):
        self.token_supply -= amount
        self.transactions.append({
            "type": "Burn",
            "producer": producer_name,
            "amount": amount
        })
        return f"{amount} ETK burned for {producer_name}"

    def sell(self, producer_name, amount, price):
        commission = 0.02 * (amount * price)
        net = (amount * price) - commission
        self.transactions.append({
            "type": "Sell",
            "producer": producer_name,
            "amount": amount,
            "price": price,
            "net": net,
            "commission": commission
        })
        return {"net": net, "commission": commission}


# Singleton instance
contract = TokenContract()
