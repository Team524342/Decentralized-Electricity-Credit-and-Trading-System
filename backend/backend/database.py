import sqlite3

def get_db_connection():
    conn = sqlite3.connect("producers.db")
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    conn.execute("""
        CREATE TABLE IF NOT EXISTS producers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            wallet TEXT,
            energy_generated REAL,
            token_balance REAL,
            earnings REAL
        )
    """)
    conn.commit()
    conn.close()

# Run this once to create the table
if __name__ == "__main__":
    init_db()
