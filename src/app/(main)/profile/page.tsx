"use client";
import { GetMyProfile, UpdateProfile } from "@/services/profileService/profileService";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";


export default function ProfilePage() {
  const [viewMode, setViewMode] = useState(true); // true = view mode
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    gender: "male",
    email: "",
    mobile: "",
  });

  // Fetch profile data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await GetMyProfile();
        console.log(res,"user data ")
        setFormData({
          _id: res._id,
          firstName: res.firstName || "",
          lastName: res.lastName || "",
          gender: res.gender || "male",
          email: res.email || "",
          mobile: res.mobile || "",
        });
      } catch (error) {
        toast.error("Failed to load profile data");
        console.error("Profile fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await UpdateProfile(formData);
      toast.success("Profile updated successfully!");
      setViewMode(true);
      console.log("Updated profile:", res);
    } catch (error) {
      toast.error("Failed to update profile");
      console.error("Profile update error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData._id) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

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
              disabled={loading}
              className="bg-green-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
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
