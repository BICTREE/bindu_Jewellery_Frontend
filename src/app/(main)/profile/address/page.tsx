"use client";
import { useState } from "react";

interface Address {
  id: number;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
}

export default function ManageAddresses() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      name: "Abeesh Kumar",
      phone: "+91 95441 21555",
      street: "123 MG Road",
      city: "Kochi",
      state: "Kerala",
      zip: "682001",
    },
  ]);

  const [editing, setEditing] = useState<Address | null>(null);
  const [formData, setFormData] = useState<Address>({
    id: 0,
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (editing) {
      setAddresses(
        addresses.map((addr) =>
          addr.id === editing.id ? { ...formData, id: editing.id } : addr
        )
      );
    } else {
      setAddresses([...addresses, { ...formData, id: Date.now() }]);
    }
    setEditing(null);
    setFormData({ id: 0, name: "", phone: "", street: "", city: "", state: "", zip: "" });
  };

  const handleEdit = (addr: Address) => {
    setEditing(addr);
    setFormData(addr);
  };

  const handleDelete = (id: number) => {
    setAddresses(addresses.filter((a) => a.id !== id));
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Manage Addresses</h2>
        {!editing && (
          <button
            onClick={() =>
              setEditing({
                id: 0,
                name: "",
                phone: "",
                street: "",
                city: "",
                state: "",
                zip: "",
              })
            }
            className="bg-gray-900 text-white px-4 py-2 rounded-md"
          >
            + Add New
          </button>
        )}
      </div>

      <p className="text-gray-500 mb-6">
        Add / edit your shipping addresses here.
      </p>

      {/* Address List */}
      {!editing && (
        <div className="space-y-4">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className="border p-4 rounded-md flex justify-between items-start"
            >
              <div>
                <p className="font-medium">{addr.name}</p>
                <p className="text-sm text-gray-600">{addr.phone}</p>
                <p className="text-sm text-gray-600">
                  {addr.street}, {addr.city}, {addr.state} - {addr.zip}
                </p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(addr)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(addr.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {addresses.length === 0 && (
            <p className="text-gray-500">No addresses saved yet.</p>
          )}
        </div>
      )}

      {/* Form (Add/Edit) */}
      {editing && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full border rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 w-full border rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Street Address</label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              className="mt-1 w-full border rounded-md p-2"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="mt-1 w-full border rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="mt-1 w-full border rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Zip</label>
              <input
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                className="mt-1 w-full border rounded-md p-2"
              />
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(null)}
              className="bg-gray-400 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
