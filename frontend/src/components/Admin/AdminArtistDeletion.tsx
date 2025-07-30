import { FC } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AdminArtistDeletion: FC = () => {
  const { artist_id } = useParams<{ artist_id: string }>();
  const navigate = useNavigate();

  // Handle deletion
  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/admin/deleteArtist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({artist_id}),
      });

      if (!response.ok) throw new Error("Failed to delete artist.");

      toast("Artist deleted successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      toast("Failed to delete artist.");
    }

    navigate("/admin");
  };

  const abort = async () => {
    toast("Cancelled artist deletion.");
    navigate("/admin");
  }

  return (
    <div className="form-container">
      <h2 id="h2gig">Delete artist?</h2>
      <Button onClick={handleSubmit} className="btn-danger mx-2">Delete</Button>
      <Button onClick={abort} className="btn-secondary mx-2">Cancel</Button>
    </div>
  );
};

export default AdminArtistDeletion;
