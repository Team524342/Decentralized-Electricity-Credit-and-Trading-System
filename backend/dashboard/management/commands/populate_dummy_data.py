
from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import datetime, timedelta
from dashboard.models import (
    User, Order, TradeMatch, EnergyTokenTransaction,
    EnergyMeasurement, Wallet, DynamicPricing, MonthlyBilling
)
import random

class Command(BaseCommand):
    help = 'Populate database with dummy data for testing'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Starting to populate dummy data...'))

        # Clear existing data (optional - comment out if you want to keep existing data)
        # User.objects.all().delete()

        try:
            # Create Users
            users = self.create_users()
            self.stdout.write(self.style.SUCCESS(f'✓ Created {len(users)} users'))

            # Create Smart Meters / Energy Measurements
            measurements = self.create_energy_measurements(users)
            self.stdout.write(self.style.SUCCESS(f'✓ Created {len(measurements)} energy measurements'))

            # Create Orders
            orders = self.create_orders(users)
            self.stdout.write(self.style.SUCCESS(f'✓ Created {len(orders)} orders'))

            # Create Trade Matches
            trades = self.create_trade_matches(users, orders)
            self.stdout.write(self.style.SUCCESS(f'✓ Created {len(trades)} trade matches'))

            # Create Energy Token Transactions
            token_txs = self.create_token_transactions(users)
            self.stdout.write(self.style.SUCCESS(f'✓ Created {len(token_txs)} token transactions'))

            # Create Wallets
            wallets = self.create_wallets(users)
            self.stdout.write(self.style.SUCCESS(f'✓ Created {len(wallets)} wallets'))

            # Create Dynamic Pricing
            pricing = self.create_dynamic_pricing()
            self.stdout.write(self.style.SUCCESS(f'✓ Created {len(pricing)} pricing records'))

            # Create Monthly Billing
            bills = self.create_monthly_billing(users)
            self.stdout.write(self.style.SUCCESS(f'✓ Created {len(bills)} billing records'))

            self.stdout.write(self.style.SUCCESS('\n✓ All dummy data populated successfully!'))

        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Error: {str(e)}'))
            import traceback
            traceback.print_exc()

    def create_users(self):
        """Create dummy users"""
        users_data = [
            ('Rajesh Kumar', 'rajesh@energy.com', 'prosumer', 28.6139, 77.2090, 10.0, 5.0),
            ('Priya Singh', 'priya@energy.com', 'consumer', 28.5244, 77.1855, None, None),
            ('Amit Patel', 'amit@energy.com', 'prosumer', 28.6328, 77.2197, 8.5, 3.5),
            ('Sunita Sharma', 'sunita@energy.com', 'consumer', 28.4595, 77.0829, None, None),
            ('Rohan Desai', 'rohan@energy.com', 'prosumer', 28.5355, 77.1960, 12.0, 8.0),
            ('Neha Verma', 'neha@energy.com', 'consumer', 28.6139, 77.2090, None, None),
            ('Arun Nair', 'arun@energy.com', 'storage', 28.4595, 77.0829, None, 15.0),
            ('Meera Iyer', 'meera@energy.com', 'grid_operator', 28.5355, 77.1960, None, None),
            ('Vikram Singh', 'vikram@energy.com', 'prosumer', 28.6139, 77.2090, 15.0, 10.0),
            ('Anjali Gupta', 'anjali@energy.com', 'consumer', 28.5244, 77.1855, None, None),
        ]

        users = []
        for name, email, user_type, lat, lon, capacity, storage in users_data:
            try:
                user = User.objects.get(email=email)
                self.stdout.write(f'  User {email} already exists, skipping')
            except User.DoesNotExist:
                user = User.objects.create(
                    name=name,
                    email=email,
                    user_type=user_type,
                    latitude=lat,
                    longitude=lon,
                    grid_connection_point=f"GRID-{name.replace(' ', '-').upper()}",
                    installed_capacity_kw=capacity,
                    storage_capacity_kwh=storage,
                    kyc_status='verified',
                    wallet_address=f'0x{random.randint(10**39, 10**40-1):040x}'
                )
                user.set_password('password123')
                user.save()
            users.append(user)
        
        return users

    def create_energy_measurements(self, users):
        """Create dummy energy measurements"""
        measurements = []
        base_time = timezone.now() - timedelta(days=30)

        for user in users:
            for i in range(10):
                timestamp = base_time + timedelta(days=i*3)
                measurement = EnergyMeasurement.objects.create(
                    meter=user,
                    timestamp=timestamp,
                    energy_generated_kwh=random.uniform(10, 50) if user.installed_capacity_kw else 0,
                    energy_consumed_kwh=random.uniform(5, 30),
                    battery_charge_level=random.uniform(20, 100) if user.storage_capacity_kwh else None
                )
                measurements.append(measurement)

        return measurements

    def create_orders(self, users):
        """Create dummy orders"""
        orders = []
        base_time = timezone.now()

        # Filter prosumers and consumers
        prosumers = [u for u in users if u.user_type == 'prosumer']
        consumers = [u for u in users if u.user_type == 'consumer']

        # Create SELL orders from prosumers
        for prosumer in prosumers:
            for i in range(2):
                order = Order.objects.create(
                    user=prosumer,
                    order_type='SELL',
                    energy_amount_kwh=random.uniform(10, 30),
                    price_per_kwh=random.uniform(5, 10),
                    time_slot_start=base_time + timedelta(hours=i*6),
                    time_slot_end=base_time + timedelta(hours=i*6+4),
                    order_status='OPEN'
                )
                orders.append(order)

        # Create BUY orders from consumers
        for consumer in consumers:
            for i in range(2):
                order = Order.objects.create(
                    user=consumer,
                    order_type='BUY',
                    energy_amount_kwh=random.uniform(5, 20),
                    price_per_kwh=random.uniform(6, 12),
                    time_slot_start=base_time + timedelta(hours=i*6),
                    time_slot_end=base_time + timedelta(hours=i*6+4),
                    order_status='OPEN'
                )
                orders.append(order)

        return orders

    def create_trade_matches(self, users, orders):
        """Create dummy trade matches"""
        trades = []
        buy_orders = orders[:len(orders)//2]
        sell_orders = orders[len(orders)//2:]

        for i in range(min(len(buy_orders), len(sell_orders))):
            buy_order = buy_orders[i]
            sell_order = sell_orders[i]
            
            energy_amount = min(buy_order.energy_amount_kwh, sell_order.energy_amount_kwh)
            trade_price = (buy_order.price_per_kwh + sell_order.price_per_kwh) / 2

            trade = TradeMatch.objects.create(
                buy_order=buy_order,
                sell_order=sell_order,
                buyer=buy_order.user,
                seller=sell_order.user,
                energy_amount=energy_amount,
                trade_price=trade_price,
                blockchain_settlement_hash=f'0x{random.randint(10**63, 10**64-1):064x}',
                settlement_status='SUCCESS'
            )
            trades.append(trade)

        return trades

    def create_token_transactions(self, users):
        """Create dummy energy token transactions"""
        transactions = []
        
        for user in users:
            if user.user_type in ['prosumer', 'storage']:
                for i in range(5):
                    tx = EnergyTokenTransaction.objects.create(
                        user=user,
                        energy_amount_kwh=random.uniform(5, 30),
                        tokens_minted=random.uniform(10, 100),
                        tokens_burned=random.uniform(0, 50),
                        blockchain_tx_hash=f'0x{random.randint(10**63, 10**64-1):064x}'
                    )
                    transactions.append(tx)

        return transactions

    def create_wallets(self, users):
        """Create dummy wallets"""
        wallets = []
        
        for user in users:
            wallet, created = Wallet.objects.get_or_create(
                wallet_address=user.wallet_address,
                defaults={
                    'user': user,
                    'token_balance': random.uniform(100, 1000),
                    'last_synced_block': random.randint(1000000, 2000000)
                }
            )
            wallets.append(wallet)

        return wallets

    def create_dynamic_pricing(self):
        """Create dummy dynamic pricing records"""
        pricing = []
        zones = ['ZONE_A', 'ZONE_B', 'ZONE_C']
        base_time = timezone.now() - timedelta(days=10)

        for zone in zones:
            for i in range(24):
                dp = DynamicPricing.objects.create(
                    timestamp=base_time + timedelta(hours=i),
                    base_price=6.0,
                    demand_supply_factor=random.uniform(0.9, 1.2),
                    renewable_bonus=random.uniform(0, 2),
                    congestion_factor=random.uniform(0.8, 1.3),
                    time_of_use_multiplier=random.uniform(0.8, 1.5),
                    final_price=round(random.uniform(5, 15), 2),
                    grid_zone=zone
                )
                pricing.append(dp)

        return pricing

    def create_monthly_billing(self, users):
        """Create dummy monthly billing records"""
        bills = []
        
        for user in users:
            if user.user_type in ['consumer', 'prosumer']:
                for month in range(3):
                    bill = MonthlyBilling.objects.create(
                        user=user,
                        grid_energy_used_kwh=random.uniform(100, 500),
                        base_bill_amount=random.uniform(500, 2000),
                        tokens_redeemed=random.uniform(0, 200),
                        token_value_rs=random.uniform(0, 1000),
                        final_bill_amount=random.uniform(300, 1500),
                        payment_status=random.choice(['PENDING', 'PAID', 'FAILED'])
                    )
                    bills.append(bill)

        return bills
