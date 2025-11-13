// src/components/dashboard/QuickActions.jsx
import Button from "../Button";

const QuickActions = ({ onMockPurchase, onViewCampaigns, onVote }) => {
  const styles = {
    section: {
      marginBottom: "20px",
    },
    title: {
      fontSize: "14px",
      marginBottom: "12px",
      color: "#64748b",
      fontWeight: 600,
    },
  };

  return (
    <div style={styles.section}>
      <h3 style={styles.title}>Quick Actions</h3>
      <Button onClick={onMockPurchase} style={{ marginBottom: "10px" }}>
        🛒 Mock Purchase & Donate
      </Button>
      <Button variant="secondary" onClick={onViewCampaigns} style={{ marginBottom: "10px" }}>
        📢 Browse Campaigns
      </Button>
      <Button variant="secondary" onClick={onVote}>
        🗳️ Weekly Voting
      </Button>
    </div>
  );
};

export default QuickActions;
