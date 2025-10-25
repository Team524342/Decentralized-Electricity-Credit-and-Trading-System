from flask import Blueprint, jsonify, request
from database import get_db_connection
from blockchain.token_contract import contract

producer_bp = Blueprint("producer_bp", __name__)

# 🔹 Get Producer Data
@producer_bp.route("/data/<int:producer_id>", methods=["GET"])
def get_producer(producer_id):
    conn = get_db_connection()
    producer = conn.execute("SELECT * FROM producers WHERE id=?", (producer_id,)).fetchone()
    conn.close()

    if producer:
        return jsonify(dict(producer))
    else:
        return jsonify({"error": "Producer not found"}), 404


# 🔹 Mint Tokens
@producer_bp.route("/mint", methods=["POST"])
def mint_tokens():
    data = request.json
    producer_id = data.get("id")
    energy = data.get("energy")

    conn = get_db_connection()
    producer = conn.execute("SELECT * FROM producers WHERE id=?", (producer_id,)).fetchone()

    if not producer:
        return jsonify({"error": "Producer not found"}), 404

    # Mint tokens equal to energy generated
    conn.execute("UPDATE producers SET token_balance = token_balance + ? WHERE id=?", (energy, producer_id))
    conn.commit()
    conn.close()

    blockchain_msg = contract.mint(producer["name"], energy)

    return jsonify({"message": blockchain_msg})


# 🔹 Sell Tokens
@producer_bp.route("/sell", methods=["POST"])
def sell_tokens():
    data = request.json
    producer_id = data.get("id")
    amount = data.get("amount")
    price = data.get("price")

    conn = get_db_connection()
    producer = conn.execute("SELECT * FROM producers WHERE id=?", (producer_id,)).fetchone()

    if not producer:
        return jsonify({"error": "Producer not found"}), 404

    if amount > producer["token_balance"]:
        return jsonify({"error": "Insufficient tokens"}), 400

    result = contract.sell(producer["name"], amount, price)

    # Update DB
    conn.execute("""
        UPDATE producers 
        SET token_balance = token_balance - ?, 
            earnings = earnings + ?
        WHERE id=?
    """, (amount, result["net"], producer_id))
    conn.commit()
    conn.close()

    return jsonify({
        "message": f"Sold {amount} ETK successfully",
        "commission": result["commission"],
        "earnings": result["net"]
    })


# 🔹 Burn Tokens
@producer_bp.route("/burn", methods=["POST"])
def burn_tokens():
    data = request.json
    producer_id = data.get("id")
    amount = data.get("amount")

    conn = get_db_connection()
    producer = conn.execute("SELECT * FROM producers WHERE id=?", (producer_id,)).fetchone()

    if not producer:
        return jsonify({"error": "Producer not found"}), 404

    if amount > producer["token_balance"]:
        return jsonify({"error": "Insufficient tokens"}), 400

    conn.execute("UPDATE producers SET token_balance = token_balance - ? WHERE id=?", (amount, producer_id))
    conn.commit()
    conn.close()

    blockchain_msg = contract.burn(producer["name"], amount)

    return jsonify({"message": blockchain_msg})
