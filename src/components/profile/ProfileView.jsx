// src/components/profile/ProfileView.jsx
import { useState } from "react";
import { updateProfile } from "firebase/auth";
import Input from "../Input";
import Button from "../Button";

const ProfileView = ({ user, onLogout }) => {
  const [displayName, setDisplayName] = useState(user.displayName || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!displayName.trim()) {
      alert("Please enter a display name");
      return;
    }

    setLoading(true);
    try {
      await updateProfile(user, { displayName: displayName.trim() });
      alert("✅ Profile updated successfully!");
    } catch (error) {
      alert("Error updating profile: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      padding: "20px",
      paddingBottom: "80px",
    },
    header: {
      marginBottom: "20px",
    },
    title: {
      fontSize: "18px",
      fontWeight: 600,
      margin: 0,
    },
    section: {
      marginBottom: "20px",
    },
    label: {
      display: "block",
      fontSize: "13px",
      fontWeight: 500,
      marginBottom: "6px",
      color: "#64748b",
    },
    info: {
      fontSize: "14px",
      padding: "10px 12px",
      background: "#f8fafc",
      borderRadius: "6px",
      border: "1px solid #e2e8f0",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Profile</h2>
      </div>
      
      <div style={styles.section}>
        <label style={styles.label}>Email</label>
        <div style={styles.info}>{user.email}</div>
      </div>

      <div style={styles.section}>
        <Input
          label="Display Name"
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Enter your name"
        />
      </div>

      <Button onClick={handleSave} disabled={loading}>
        {loading ? "Saving..." : "Save Changes"}
      </Button>
      
      <Button variant="danger" onClick={onLogout} style={{ marginTop: "10px" }}>
        Logout
      </Button>
    </div>
  );
};

export default ProfileView;
