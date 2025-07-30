import { FC } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AdminArtistApproval: FC = () => {
  const { artist_id } = useParams<{ artist_id: string }>();
  const navigate = useNavigate();

  // Handle approval
  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/admin/approveArtist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({artist_id}),
      });

      if (!response.ok) throw new Error("Failed to update artist.");

      toast("Artist made public successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      toast("Failed to update artist.");
    }

    navigate("/admin");
  };

  const abort = async () => {
    toast("Cancelled artist approval.");
    navigate("/admin");
  }

  return (
    <div className="form-container">
      <h2 id="h2gig">Approve artist?</h2>
      <Button onClick={handleSubmit} className="btn-success mx-2">Approve</Button>
      <Button onClick={abort} className="btn-secondary mx-2">Cancel</Button>
    </div>
  );
};

export default AdminArtistApproval;
