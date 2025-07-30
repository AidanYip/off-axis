import { FC } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AdminGigApproval: FC = () => {
  const { gig_id } = useParams<{ gig_id: string }>();
  const navigate = useNavigate();

  // Handle approval
  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/admin/approveGig", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({gig_id}),
      });

      if (!response.ok) throw new Error("Failed to update gig.");

      toast("Gig made public successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      toast("Failed to update gig.");
    }

    navigate("/admin");
  };

  const abort = async () => {
    toast("Cancelled gig publication.");
    navigate("/admin");
  }

  return (
    <div className="form-container">
      <h2 id="h2gig">Make gig public?</h2>
      <Button onClick={handleSubmit} className="btn-success mx-2">Confirm</Button>
      <Button onClick={abort} className="btn-secondary mx-2">Cancel</Button>
    </div>
  );
};

export default AdminGigApproval;
