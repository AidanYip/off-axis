import { ChangeEvent, FC } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./CreateGigForm.css";

interface User {
  user_id: number;
  first_name: string;
  last_name: string;
  role: string;
  provider: string;
  email: string;
}

interface GigProperties {
  artist_id: number;
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
}

interface VenueProperties {
  venue_id: number;
  venue_name: string;
  venue_city: string;
}

const CreateGigForm: FC = () => {
    const [_user, setUser] = useState<User | null>(null); // eslint-disable-line @typescript-eslint/no-unused-vars
    const [formData, setFormData] = useState<GigProperties | null>(null);
    const [venueData, setVenueData] = useState<VenueProperties[]>([]);
    const navigate = useNavigate();
    
    useEffect(() => {
      const fetchUser = async () => {
          const token = localStorage.getItem('jwt_token');
          if (!token) {
              setUser(null);
              navigate('/login');
              return;
          }
  
          try {
              const response = await fetch('/api/auth/verify', {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`
                  }
              });
  
              const data = await response.json();
  
              if (data.success) {
                  setUser(data.result);
  
                  // Fetch artist ID after user state is updated
                  fetchArtistId(data.result.user_id);
              } else {
                  setUser(null);
                  navigate('/login');
              }
          } catch (err) {
              console.error("User verification failed:", err);
              setUser(null);
              navigate('/login');
          }
      };

      const fetchArtistId = async (user_id: number) => {
          try {
              const response = await fetch('/api/artists/getArtistIdByUserId', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ user_id }),
              });
  
              if (!response.ok) {
                  throw new Error('Failed to fetch artist ID.');
              }
  
              const dataArtist = await response.json();
  
              if (dataArtist.success) {
                  setFormData((prevFormData) => ({
                    ...prevFormData, // Preserve existing data if it exists
                    artist_id: dataArtist.result[0].artist_id, // Update artist_id
                  } as GigProperties)); // Explicitly assert type
                  fetchVenueNames();
              } else {
                  setUser(null);
                  navigate('/login');
              }
          } catch (err) {
              console.error("Fetch Artist ID failed:", err);
              setUser(null);
              navigate('/login');
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

      fetchUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload
  
    if (!formData) {
      console.error("Error: formData is null");
      alert("Form data is missing. Please fill out the form.");
      return;
    }
  
    const requestBody = new FormData();
  
    Object.keys(formData).forEach((key) => {
      if (formData[key as keyof typeof formData] !== null) {
        requestBody.append(key, formData[key as keyof typeof formData] as string | Blob);
      }
    });
  
    try {
      const response = await fetch("/api/gig/createGig", {
        method: "POST",
        body: requestBody,
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert("Gig submitted!");
        console.log("Response:", result); // Check form data in console
        navigate('/profile');
      } else {
        throw new Error(result.message || "Failed to submit gig");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting gig. Please try again.");
    }
  };  
  
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
    
      setFormData((prev) => {
        if (!prev) return null; // Ensure prev is not null before spreading
    
        if (type === 'file') {
          const { files } = e.target as HTMLInputElement;
          return { ...prev, image: files ? files[0] : null };
        }
    
        return { ...prev, [name]: value };
      });
    };
  
    return (
      <div className="form-container">
        <a href="/profile">
          <button className="back-button">Return</button>
        </a>
        <h2 id="h2gig">Create a Gig</h2>
        <p id="indicateField"> indicates a required field.</p>
        <form className="gig-form" onSubmit={handleSubmit}>
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
                <label className="requiredField" htmlFor="duration">Duration</label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  placeholder="3 hours"
                  value={formData?.duration}
                  onChange={handleChange}
                  required
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
            <label htmlFor="venue_id">Select the venue for your gig.<span className="required">*</span></label>
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
            <p>Don't see a venue?
              <a className="create-venue-link" href="/create-venue"> Click here to add a new venue.</a>
            </p>
          </div>

          <div className="form-element">
            <label htmlFor="image">Upload your gig image. (.png, .jpg, .jpeg)<span className="required">*</span></label>
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
            <label htmlFor="supports">Choose supports for your gig</label>
            <input
              type="text"
              id="supports"
              name="supports"
              placeholder="Crash Kids"
              value={formData?.supports}
              onChange={handleChange}
            />
          </div>
  
          <div className="form-element">
            <label htmlFor="description">Please add a description for the gig. (MAX 100 words)</label>
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
  
          <button type="submit" className="gradientButton">Submit</button>
        </form>
      </div>
    );
  }

export default CreateGigForm;
