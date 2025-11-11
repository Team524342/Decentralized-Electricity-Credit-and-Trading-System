import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAccessToken } from "../utils/auth";
import "../assets/profile.css"; // optional for custom styling

const Profile = ({ email, role }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!email) {
        setError('No email provided');
        setLoading(false);
        return;
      }
      try {
        const token = getAccessToken();
        const url = `http://127.0.0.1:8000/api/profile/${encodeURIComponent(email)}/`;
        const response = await axios.get(url, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setProfile(response.data);
      } catch (err) {
        console.error('Profile fetch error', err.response || err.message || err);
        setError("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [email]);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img
          src={profile.photo || "/default-avatar.png"}
          alt="Profile"
          className="profile-img"
        />
        <h2>{profile.name}</h2>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Role:</strong> {role}</p>
        {profile.wallet_address && (
          <p><strong>Wallet:</strong> {profile.wallet_address}</p>
        )}
        {profile.location && (
          <p><strong>Location:</strong> {profile.location}</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
