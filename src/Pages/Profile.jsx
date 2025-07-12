import React, { useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { use } from "react";
import { imageUpload } from "../api/utils"; // ✅ import image uploader
import useRole from "../Hooks/useRole";
import Loading from "./Loading";

const Profile = () => {
  const { user, updateUser } = use(AuthContext);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.displayName || "");
  const [photo, setPhoto] = useState(user.photoURL || "");
  const [showDetails, setShowDetails] = useState(false);
  const [uploading, setUploading] = useState(false); // For image upload status
  const [role, isRoleLoading] = useRole(); // ✅ use custom hook to get user role
  // 🖼 Handle image upload via ImgBB
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      try {
        const url = await imageUpload(file);
        setPhoto(url);
      } catch (err) {
        alert("Image upload failed!");
        console.error(err);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleUpdate = async () => {
    try {
      await updateUser({
        displayName: name,
        photoURL: photo,
      });

      window.alert("Profile updated successfully!");
      setEditing(false);
    } catch (error) {
      window.alert("Update failed: " + error.message);
    }
  };
  if(isRoleLoading) return <Loading/>

  return (
    <div className="mx-4 py-10">
      <h1 className="text-3xl font-bold text-center text-lime-700/70 mb-6">
        Welcome, <span className="text-lime-600/90">{user.displayName || "User"}</span>
      </h1>

      <div className="bg-base-200/20 rounded-xl p-6 flex flex-col md:flex-row gap-6 items-center shadow">
        <img
          src={photo || "https://i.ibb.co/8L7JtyF0/user.jpg"}
          alt="Profile"
          className="w-40 h-40 rounded-full object-cover border-4 border-green-500"
        />

        <div className="flex-1 space-y-3 text-center md:text-left">
          {editing ? (
            <>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
                className="input input-bordered w-full max-w-sm"
              />

              <div>
                <label className="block text-sm mb-1 font-medium">Upload New Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input file-input-bordered w-full max-w-sm"
                />
                {uploading && <p className="text-xs text-gray-500 mt-1">Uploading...</p>}
              </div>

              <div className="pt-4 space-x-2">
                <button onClick={handleUpdate} className="btn btn-success">
                  Save
                </button>
                <button
                  onClick={() => {
                    setName(user.displayName || "");
                    setPhoto(user.photoURL || "");
                    setEditing(false);
                  }}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <p>
                <span className="font-semibold">Email:</span> {user.email}
              </p>
              <p>
                <span className="font-semibold">Email Verified:</span>{" "}
                {user.emailVerified ? "Yes" : "No"}
              </p>
              <span>
                <span className="font-semibold">Role:</span> {role || "User"}
              </span>

              <div className="pt-4 flex flex-col md:flex-row space-y-5 space-x-2">
                <button
                  onClick={() => setEditing(true)}
                  className="btn btn-primary w-full md:w-auto"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="btn btn-outline"
                >
                  {showDetails ? "Hide Info" : "Show More Info"}
                </button>
              </div>

              {showDetails && (
                <div className="pt-4 space-y-2">
                  <p className="text-sm">
                    <span className="text-green-600 italic">User ID:</span> {user.uid}
                  </p>
                  <p className="text-sm">
                    <span className="text-green-600 italic">Created At:</span>{" "}
                    {new Date(user.metadata.creationTime).toLocaleString()}
                  </p>
                  <p className="text-sm">
                    <span className="text-green-600 italic">Last Login:</span>{" "}
                    {new Date(user.metadata.lastSignInTime).toLocaleString()}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
