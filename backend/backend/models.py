class Producer:
    def __init__(self, id, name, wallet, energy_generated, token_balance, earnings):
        self.id = id
        self.name = name
        self.wallet = wallet
        self.energy_generated = energy_generated
        self.token_balance = token_balance
        self.earnings = earnings

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "wallet": self.wallet,
            "energy_generated": self.energy_generated,
            "token_balance": self.token_balance,
            "earnings": self.earnings
        }
