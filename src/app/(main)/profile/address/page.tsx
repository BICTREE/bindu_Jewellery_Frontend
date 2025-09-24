"use client";
import { AddAddress, deleteAddress, GetMyAddress, UpdateAddress } from "@/services/profileService/addressSerice";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Address {
  _id?: string;
  fullName: string;
  phoneNumber: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export default function ManageAddresses() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [editing, setEditing] = useState<Address | null>(null);
  const [formData, setFormData] = useState<Address>({
    fullName: "",
    phoneNumber: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch addresses on mount
  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const res = await GetMyAddress();
      setAddresses(res || []);
    } catch (err) {
      toast.error("Failed to fetch addresses");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setActionLoading(true);
      if (editing?._id) {
        await UpdateAddress({ id: editing._id, body: formData });
        toast.success("Address updated successfully");
      } else {
        await AddAddress(formData);
        toast.success("Address added successfully");
      }
      fetchAddresses();
      setEditing(null);
      resetForm();
    } catch (err) {
      toast.error("Failed to save address");
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleEdit = (addr: Address) => {
    setEditing(addr);
    setFormData(addr);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    try {
      setActionLoading(true);
      await deleteAddress(id);
      toast.success("Address deleted successfully");
      fetchAddresses();
    } catch (err) {
      toast.error("Failed to delete address");
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      phoneNumber: "",
      street: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
    });
  };

  // Skeleton loader for address cards
  const SkeletonCard = () => (
    <div className="border p-4 rounded-md animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
    </div>
  );

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Manage Addresses</h2>
        {!editing && (
          <button
            onClick={() =>
              setEditing({
                fullName: "",
                phoneNumber: "",
                street: "",
                city: "",
                state: "",
                pincode: "",
                country: "",
              })
            }
            className="bg-gray-900 text-white px-4 py-2 rounded-md"
          >
            + Add New
          </button>
        )}
      </div>

      <p className="text-gray-500 mb-6">Add / edit your shipping addresses here.</p>

      {/* Address List */}
      {!editing && (
        <div className="space-y-4">
          {loading
            ? [1, 2, 3,4,5].map((i) => <SkeletonCard key={i} />)
            : addresses.map((addr) => (
                <div
                  key={addr._id}
                  className="border p-4 rounded-md flex justify-between items-start"
                >
                  <div>
                    <p className="font-medium">{addr.fullName}</p>
                    <p className="text-sm text-gray-600">{addr.phoneNumber}</p>
                    <p className="text-sm text-gray-600">
                      {addr.street}, {addr.city}, {addr.state} - {addr.pincode},{" "}
                      {addr.country}
                    </p>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleEdit(addr)}
                      disabled={actionLoading}
                      className={`${
                        actionLoading ? "opacity-50 cursor-not-allowed" : ""
                      } text-blue-600 hover:underline`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(addr._id)}
                      disabled={actionLoading}
                      className={`${
                        actionLoading ? "opacity-50 cursor-not-allowed" : ""
                      } text-red-600 hover:underline`}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}

          {!loading && addresses.length === 0 && (
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
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1 w-full border rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
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
              <label className="block text-sm font-medium">Pincode</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="mt-1 w-full border rounded-md p-2"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="mt-1 w-full border rounded-md p-2"
            />
          </div>

          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              disabled={actionLoading}
              className={`${
                actionLoading ? "opacity-50 cursor-not-allowed" : ""
              } bg-green-600 text-white px-4 py-2 rounded-md`}
            >
              {actionLoading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => setEditing(null)}
              disabled={actionLoading}
              className={`${
                actionLoading ? "opacity-50 cursor-not-allowed" : ""
              } bg-gray-400 text-white px-4 py-2 rounded-md`}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
