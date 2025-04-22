import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";

const Profile = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  // ✅ Fetch Profile Data
  const fetchProfile = async () => {
    try {
      const token = Cookies.get("token");
      console.log("Fetched token:", token); // Debugging: Check if token is being retrieved
      if (!token) throw new Error("Unauthorized: Please log in first.");

      const response = await axios.get(
        "http://localhost:5000/api/customer/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      console.log("Profile fetched:", response.data); // Debugging: Check response from API
      setProfile(response.data);
      setLoading(false);
      setEditing(false); // Exit edit mode after fetching data

      // Set default values in form
      setValue("name", response.data.name);
      setValue("address", response.data.address);
      setValue("phone", response.data.phone);
      setValue("dob", response.data.dob);
      setValue("gender", response.data.gender);
    } catch (err) {
      console.error("Error fetching profile:", err); // Debugging: Log error
      setProfile(null);
      setLoading(false);
    }
  };

  // ✅ Create or Update Profile
  const onSubmit = async (data) => {
    console.log("Form data on submit:", data); // Debugging: Check form data being submitted
    try {
      const token = Cookies.get("token");
      console.log("Token in submit:", token); // Debugging: Check token in submit
      if (!token) throw new Error("Unauthorized: Please log in first.");

      if (profile) {
        console.log("Updating profile..."); // Debugging: Profile exists, so updating
        await axios.put("http://localhost:5000/api/customer/profile", data, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        toast.success("Profile updated successfully!");
      } else {
        console.log("Creating new profile..."); // Debugging: Profile does not exist, so creating
        await axios.post("http://localhost:5000/api/customer/profile", data, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        toast.success("Profile created successfully!");
      }

      fetchProfile(); // Fetch updated profile after submission
    } catch (err) {
      console.error("Error in submit:", err); // Debugging: Log error during submission
      toast.error(err.response?.data?.message || "Failed to save profile");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 px-6 py-8 bg-white shadow-lg rounded-2xl border border-gray-100 mb-2">
      <Toaster position="top-center" reverseOrder={false} />

      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        My Profile
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : profile && !editing ? (
        <div className="space-y-4 text-gray-700">
          <p>
            <span className="font-semibold">Name:</span> {profile.name}
          </p>
          <p>
            <span className="font-semibold">Address:</span> {profile.address}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {profile.phone}
          </p>
          <p>
            <span className="font-semibold">Date of Birth:</span> {profile.dob}
          </p>
          <p>
            <span className="font-semibold">Gender:</span> {profile.gender}
          </p>

          <button
            onClick={() => setEditing(true)}
            className="w-full mt-6 bg-lime-700 text-white py-2 rounded-xl hover:bg-lime-600 transition duration-200"
          >
            Edit Profile
          </button>
        </div>
      ) : profile === null && !editing ? (
        <div className="text-center text-gray-600">
          <p>No profile found.</p>
          <button
            onClick={() => setEditing(true)}
            className="mt-6 bg-lime-700 text-white px-5 py-2 rounded-xl hover:bg-lime-600 transition duration-200"
          >
            Create Profile
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
            {profile ? "Edit Profile" : "Create Profile"}
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              {...register("name")}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              {...register("address")}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              {...register("phone")}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              {...register("dob")}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              {...register("gender")}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-600"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-lime-700 text-white py-2 rounded-xl hover:bg-lime-600 transition duration-200"
          >
            {profile ? "Update Profile" : "Create Profile"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Profile;
