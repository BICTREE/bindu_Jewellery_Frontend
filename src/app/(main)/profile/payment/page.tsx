"use client";

import React, { useState } from "react";
import { CreditCard, Wallet, Plus, Edit, Trash, X } from "lucide-react";

export default function PaymentMethods() {
  const [cards, setCards] = useState([
    { id: 1, type: "Visa", number: "**** **** **** 1234", expiry: "12/26" },
    { id: 2, type: "MasterCard", number: "**** **** **** 5678", expiry: "09/25" },
  ]);

  const [upi, setUpi] = useState([
    { id: 1, name: "Paytm", idValue: "abc@paytm" },
  ]);

  const [showCardForm, setShowCardForm] = useState(false);
  const [showUpiForm, setShowUpiForm] = useState(false);

  const [newCard, setNewCard] = useState({ type: "", number: "", expiry: "" });
  const [newUpi, setNewUpi] = useState({ name: "", idValue: "" });

  const handleAddCard = () => {
    if (newCard.type && newCard.number && newCard.expiry) {
      setCards([...cards, { id: Date.now(), ...newCard }]);
      setNewCard({ type: "", number: "", expiry: "" });
      setShowCardForm(false);
    }
  };

  const handleAddUpi = () => {
    if (newUpi.name && newUpi.idValue) {
      setUpi([...upi, { id: Date.now(), ...newUpi }]);
      setNewUpi({ name: "", idValue: "" });
      setShowUpiForm(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 rounded-lg">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Payment Methods</h1>
        <p className="mb-6 text-gray-600">Manage your saved cards and UPI here.</p>

        {/* Cards Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <CreditCard /> Saved Cards
          </h2>

          <div className="space-y-3">
            {cards.map((card) => (
              <div
                key={card.id}
                className="flex justify-between items-center border p-4 rounded-lg shadow-sm bg-gray-50"
              >
                <div>
                  <p className="font-medium">{card.type}</p>
                  <p className="text-gray-500">{card.number} | Exp: {card.expiry}</p>
                </div>
                <div className="flex gap-3">
                  <button className="text-blue-500 hover:text-blue-700">
                    <Edit size={18} />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <Trash size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Card Button */}
          {!showCardForm && (
            <button
              className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-800"
              onClick={() => setShowCardForm(true)}
            >
              <Plus size={16} /> Add New Card
            </button>
          )}

          {/* Add Card Form */}
          {showCardForm && (
            <div className="mt-4 border p-4 rounded-lg shadow-sm bg-gray-50 space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-lg">New Card</h3>
                <button onClick={() => setShowCardForm(false)}>
                  <X size={20} />
                </button>
              </div>
              <input
                type="text"
                placeholder="Card Type (Visa, MasterCard)"
                className="w-full border p-2 rounded"
                value={newCard.type}
                onChange={(e) => setNewCard({ ...newCard, type: e.target.value })}
              />
              <input
                type="text"
                placeholder="Card Number"
                className="w-full border p-2 rounded"
                value={newCard.number}
                onChange={(e) => setNewCard({ ...newCard, number: e.target.value })}
              />
              <input
                type="text"
                placeholder="Expiry (MM/YY)"
                className="w-full border p-2 rounded"
                value={newCard.expiry}
                onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value })}
              />
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={handleAddCard}
              >
                Save Card
              </button>
            </div>
          )}
        </div>

        {/* UPI Section */}
        <div>
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Wallet /> UPI Accounts
          </h2>

          <div className="space-y-3">
            {upi.map((u) => (
              <div
                key={u.id}
                className="flex justify-between items-center border p-4 rounded-lg shadow-sm bg-gray-50"
              >
                <div>
                  <p className="font-medium">{u.name}</p>
                  <p className="text-gray-500">{u.idValue}</p>
                </div>
                <div className="flex gap-3">
                  <button className="text-blue-500 hover:text-blue-700">
                    <Edit size={18} />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <Trash size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add UPI Button */}
          {!showUpiForm && (
            <button
              className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-800"
              onClick={() => setShowUpiForm(true)}
            >
              <Plus size={16} /> Add UPI
            </button>
          )}

          {/* Add UPI Form */}
          {showUpiForm && (
            <div className="mt-4 border p-4 rounded-lg shadow-sm bg-gray-50 space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-lg">New UPI</h3>
                <button onClick={() => setShowUpiForm(false)}>
                  <X size={20} />
                </button>
              </div>
              <input
                type="text"
                placeholder="UPI Name (Paytm, PhonePe)"
                className="w-full border p-2 rounded"
                value={newUpi.name}
                onChange={(e) => setNewUpi({ ...newUpi, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="UPI ID"
                className="w-full border p-2 rounded"
                value={newUpi.idValue}
                onChange={(e) => setNewUpi({ ...newUpi, idValue: e.target.value })}
              />
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={handleAddUpi}
              >
                Save UPI
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
