import { ChangeEvent, FC } from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from "react-bootstrap";
import { toast } from 'react-toastify';
import "./AdminForm.css";

interface GigProperties {
  gig_id: number;
  venue_id: number;
  gig_name: string;
  date: string;
  doors_time: string;
  duration: number;
  original_price: number;
  tickets_available: number;
  image?: File | null;
  coupon_codes: string;
  supports: string;
  description: string;
  verified: boolean;
}

interface VenueProperties {
  venue_id: number;
  venue_name: string;
  venue_city: string;
}

type Support = { name: string; artist_id: number };

const EditGigForm: FC = () => {
    const { gig_id } = useParams(); // Extract gig_id from the URL
    const [formData, setFormData] = useState<GigProperties | null>(null);
    const [venueData, setVenueData] = useState<VenueProperties[]>([]);
    const navigate = useNavigate();
    const deleteLink = "/admin/delete-gig/" + gig_id;
    
    useEffect(() => {
      const fetchGig = async () => {
          try {
              const response = await fetch('/api/admin/getGigByGigId', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ gig_id }),
              });
  
              if (!response.ok) {
                  throw new Error('Failed to fetch gig.');
              }
  
              const gigData = await response.json();
              gigData.result[0].date = gigData.result[0].date.split('T')[0];
              gigData.result[0].doors_time = gigData.result[0].doors_time.slice(0, -3);
              const supportsObj = gigData.result[0].supports;
              gigData.result[0].supports = supportsObj.map((item: Support) => item.name).join(", ");
              setFormData(gigData.result[0]);
              fetchVenueNames();
          } catch (err) {
              console.error("Fetch gig data failed:", err);
          }
      };

      const fetchVenueNames = async () => {
          try {
              const response = await fetch('/api/venue/getAllVenueNames');
  
              if (!response.ok) {
                  throw new Error('Failed to fetch artist ID.');
              }
  
              const data = await response.json();
              setVenueData(data.result);
          } catch (err) {
              console.error("Fetch venue data failed:", err);
          }
      };

      fetchGig();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload
  
    if (!formData) {
      console.error("Error: formData is null");
      toast.warn("Form data is missing. Please fill out the form.");
      return;
    }
  
    const requestBody = new FormData();
  
    Object.keys(formData).forEach((key) => {
      if (formData[key as keyof typeof formData] !== null) {
        requestBody.append(key, formData[key as keyof typeof formData] as string | Blob);
      }
    });
  
    try {
      const response = await fetch("/api/admin/updateGig", {
        method: "POST",
        body: requestBody,
      });
  
      const result = await response.json();
  
      if (response.ok) {
        toast.success("Gig updated!");
        console.log("Response:", result); // Check form data in console
        navigate('/admin');
      } else {
        throw new Error(result.message || "Failed to update gig");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.warn("Error updating gig. Please try again.");
    }
  };  
  
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
    
      setFormData((prev) => {
        if (!prev) return null; // Ensure prev is not null before spreading

        if (type === 'checkbox') {
          const { checked } = e.target as HTMLInputElement;
          return({ ...prev, [name]: checked ? 1 : 0});
        };
    
        if (type === 'file') {
          const { files } = e.target as HTMLInputElement;
          return { ...prev, image: files ? files[0] : null };
        }
    
        return { ...prev, [name]: value };
      });
    };
  
    return (
      <div className="form-container">
        <h2 id="h2gig">Edit: {formData?.gig_name}</h2>
        <p id="indicateField"> indicates a required field.</p>
        <form className="gig-form" onSubmit={handleSubmit}>
          <div className="form-element">
              <label htmlFor="verified">Public</label>
              <input
                  type="checkbox"
                  id="verified"
                  name="verified"
                  checked={formData?.verified}
                  onChange={handleChange}
                />
          </div>
          <br></br>

          <div className="form-group-parent">
            <div className="form-group-child">
              <div className="form-element">
                <label className="requiredField" htmlFor="gigName">Gig Name</label>
                <input
                  type="text"
                  id="gigName"
                  name="gig_name"
                  placeholder="Gig Name"
                  value={formData?.gig_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-element">
                <label className="requiredField" htmlFor="startTime">Start Time</label>
                <input
                  type="text"
                  id="startTime"
                  name="doors_time"
                  placeholder="19:00"
                  value={formData?.doors_time}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-element">
                <label className="requiredField" htmlFor="price">Price per ticket (in £)</label>
                <input
                  type="text"
                  id="price"
                  name="original_price"
                  placeholder="10.00"
                  value={formData?.original_price}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
  
            <div className="form-group-child">
              <div className="form-element">
                <label className="requiredField" htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  placeholder="01/01/2025"
                  value={formData?.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-element">
                <label htmlFor="duration">Duration</label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  placeholder="3 hours"
                  value={formData?.duration}
                  onChange={handleChange}
                />
              </div>
              <div className="form-element">
                <label className="requiredField" htmlFor="numberOfTickets">Number of Tickets for Sale</label>
                <input
                  type="text"
                  id="numberOfTickets"
                  name="tickets_available"
                  placeholder="50"
                  value={formData?.tickets_available}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-element">
            <label htmlFor="venue_id">Change the venue for your gig.<span className="required">*</span></label>
            <select
              id="venue_id"
              name="venue_id"
              value={formData?.venue_id}
              onChange={handleChange}
              required
            >
              <option value="">Select a venue</option>
              {[...venueData]
                .sort((a, b) => a.venue_name.localeCompare(b.venue_name))
                .map((venue) => (
                  <option key={venue.venue_id} value={venue.venue_id}>
                    {venue.venue_name}, {venue.venue_city}
                  </option>
                ))}
            </select>
            <p>Don't see a venue? <a className="create-venue-link" href="/create-venue">Click here to add a new venue.</a></p>
          </div>

          <div className="form-element">
            <label htmlFor="image">Change your gig image. (.png, .jpg, .jpeg)<span className="required">*</span></label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </div>
  
          <div className="form-element">
            <label htmlFor="couponCodes">Coupon Codes</label>
            <input
              type="text"
              id="couponCodes"
              name="coupon_codes"
              placeholder="E.g. HALF:50%, NEWYEAR:25%, SUMMERSALE2024:30%"
              value={formData?.coupon_codes}
              onChange={handleChange}
            />
          </div>
  
          <div className="form-element">
            <label htmlFor="supports">Choose supports for your gig (artist names, comma separated)</label>
            <input
              type="text"
              id="supports"
              name="supports"
              placeholder="E.g. Queen, Coldplay"
              value={formData?.supports}
              onChange={handleChange}
            />
          </div>
  
          <div className="form-element">
            <label htmlFor="description">Change description for the gig. (MAX 100 words)</label>
            <textarea
              id="description"
              name="description"
              placeholder="Description Here"
              rows={5}
              value={formData?.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="spacer"/>
          <Row>
            <Col></Col>
            <Col>
              <Button className="btn-danger" href={deleteLink}>
                Delete Gig
              </Button>
            </Col>
            <Col>
              <Button className="btn-secondary" href="/admin">Cancel</Button>
            </Col>
            <Col>
              <Button className="btn-success" type="submit">
                Save Changes
              </Button>
            </Col>
            <Col></Col>
          </Row>
        </form>
      </div>
    );
  }

export default EditGigForm;
