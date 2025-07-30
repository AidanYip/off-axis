import { FC } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {toast} from "react-toastify";

const AdminGigDeletion: FC = () => {
  const { gig_id } = useParams<{ gig_id: string }>();
  const navigate = useNavigate();

  // Handle deletion
  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/admin/deleteGig", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({gig_id}),
      });

      if (!response.ok) throw new Error("Failed to delete gig.");

      toast("Gig deleted successfully!");;
    } catch (err) {
      console.error("Update failed:", err);
      toast("Failed to delete gig.");
    }

    navigate("/admin");
  };

  const abort = async () => {
    toast("Cancelled gig deletion.");
    navigate("/admin");
  }

  return (
    <div className="form-container">
      <h2 id="h2gig">Delete gig?</h2>
      <Button onClick={handleSubmit} className="btn-danger mx-2">Delete</Button>
      <Button onClick={abort} className="btn-secondary mx-2">Cancel</Button>
    </div>
  );
};

export default AdminGigDeletion;
