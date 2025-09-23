"use client";
import { useState } from "react";

export default function ProfilePage() {
  const [viewMode, setViewMode] = useState(true); // true = view mode
  const [formData, setFormData] = useState({
    firstName: "Abeesh",
    lastName: "Kumar",
    gender: "male",
    email: "abeesh.kumar.com",
    mobile: "+919544121555",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSave = () => {
    // save API call here
    setViewMode(true);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Personal Information</h2>
        {viewMode ? (
          <button
            onClick={() => setViewMode(false)}
            className="bg-gray-900 text-white px-4 py-2 rounded-md"
          >
            Edit
          </button>
        ) : (
          <div className="space-x-2">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
            <button
              onClick={() => setViewMode(true)}
              className="bg-gray-400 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* View Mode */}
      {viewMode ? (
        <div className="space-y-4 text-gray-700">
          <p>
            <span className="font-medium">First Name:</span> {formData.firstName}
          </p>
          <p>
            <span className="font-medium">Last Name:</span> {formData.lastName}
          </p>
          <p>
            <span className="font-medium">Gender:</span> {formData.gender}
          </p>
          <p>
            <span className="font-medium">Email:</span> {formData.email}
          </p>
          <p>
            <span className="font-medium">Mobile:</span> {formData.mobile}
          </p>
        </div>
      ) : (
        // Edit Mode
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 w-full border rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 w-full border rounded-md p-2"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium">Gender</label>
            <div className="flex gap-4 mt-1">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                />
                Male
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                />
                Female
              </label>
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full border rounded-md p-2"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium">Mobile</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="mt-1 w-full border rounded-md p-2"
            />
          </div>
        </div>
      )}
    </div>
  );
}
