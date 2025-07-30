import { FC, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

interface GigProperties {
  gig_id: number;
  gig_name: string;
  verified: number;
}

const AdminFestivalManagerForm: FC = () => {
  const { gig_id } = useParams<{ gig_id: string }>();
  const [formData, setFormData] = useState<GigProperties | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const deleteLink = "/admin/delete-gig/" + gig_id;

  // Fetch festival data when component mounts
  useEffect(() => {
    const fetchFestival = async () => {
      try {
        const response = await fetch("/api/admin/getFestivalByGigId", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ gig_id }),
        });

        if (!response.ok) throw new Error("Failed to fetch festival.");
        const data = await response.json();

        if (data.result?.[0]) {
          setFormData(data.result[0]);
        } else {
          throw new Error("Festival data not found.");
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (gig_id) {
      fetchFestival();
    }
  }, [gig_id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) =>
      prevData ? { ...prevData, [name]: value } : null
    );
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent full page reload

    try {
      const response = await fetch("/api/admin/updateFestival", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update festival.");
      const result = await response.json();

      alert(result.message || "Festival updated successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update festival.");
    }

    navigate("/admin");
  };

  return (
    <div className="form-container">
      <h2 id="h2gig">Edit Gig</h2>
      <form onSubmit={handleSubmit} className="gig-form">
        <div className="form-group">
          <label htmlFor="gig_name">Festival Name</label>
          <input
            type="text"
            id="gig_name"
            name="gig_name"
            value={formData?.gig_name || ""}
            onChange={handleChange}
            required
          />

          <label htmlFor="verified">Public</label>
          <input
            type="checkbox"
            id="verified"
            name="verified"
            checked={!!formData?.verified}
            onChange={(e) =>
              setFormData((prevData) =>
                prevData
                  ? { ...prevData, verified: e.target.checked ? 1 : 0 }
                  : null
              )
            }
          />
        </div>
        <Button className="btn-danger" href={deleteLink}>Delete Festival</Button>
        <br></br>
        <button type="submit" className="gradientButton">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default AdminFestivalManagerForm;
