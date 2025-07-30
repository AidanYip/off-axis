import { ChangeEvent, FC } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./CreateVenueForm.css";

interface User {
  user_id: number;
  first_name: string;
  last_name: string;
  role: string;
  provider: string;
  email: string;
}

interface VenueProperties {
  artist_id: number;
  venue_name: string;
  venue_capacity: number;
  venue_address: string;
  venue_city: string;
  venue_link: string;
  description: string;
  image?: File | null;
}

const CreateVenueForm: FC = () => {
    const [_user, setUser] = useState<User | null>(null); // eslint-disable-line @typescript-eslint/no-unused-vars
    const [formData, setFormData] = useState<VenueProperties | null>(null);
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
                  setFormData(dataArtist.result[0]);
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
        const response = await fetch("/api/venue/createVenue", {
            method: "POST",
            body: requestBody,
        });
    
        const result = await response.json();
    
        if (response.ok) {
            alert("Venue created successfully!\nYou can now add this venue to your gig.");
            console.log("Response:", result); // Check form data in console
            navigate('/create-gig');
        } else {
            throw new Error(result.message || "Failed to create venue");
        }
        } catch (error) {
        console.error("Error:", error);
        alert("Error creating venue. Please try again.");
        }
    };  
  
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        <a href="/create-gig">
          <button className="back-button">Return</button>
        </a>
        <h2 id="h2gig">Add a Venue</h2>
        <p id="indicateField"> indicates a required field.</p>
        <form className="gig-form" onSubmit={handleSubmit}>
          <div className="form-group-parent">
            <div className="form-group-child">
              <div className="form-element">
                <label className="requiredField" htmlFor="venueName">Name</label>
                <input
                  type="text"
                  id="venueName"
                  name="venue_name"
                  placeholder="E.g. The Union Bar"
                  value={formData?.venue_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-element">
                <label className="requiredField" htmlFor="venueCity">City</label>
                <input
                  type="text"
                  id="venueCity"
                  name="venue_city"
                  placeholder="City"
                  value={formData?.venue_city}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
  
            <div className="form-group-child">
              <div className="form-element">
                <label className="requiredField" htmlFor="venueCapacity">Capacity</label>
                <input
                  type="text"
                  id="venueCapacity"
                  name="venue_capacity"
                  placeholder="E.g. 100"
                  value={formData?.venue_capacity}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-element">
                <label className="requiredField" htmlFor="venueAddress">Address</label>
                <input
                  type="text"
                  id="venueAddress"
                  name="venue_address"
                  placeholder="E.g. 123 Festival Avenue"
                  value={formData?.venue_address}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-element">
            <label htmlFor="image">Upload the venue image. (.png, .jpg, .jpeg)<span className="required">*</span></label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </div>
  
          <div className='form-element'>
            <label htmlFor="venue_link">Link to venue<span className="required">*</span></label>
            <input
            type="text"
            id="venue_link"
            name="venue_link"
            placeholder="E.g. http://rooftop.com"
            value={formData?.venue_link}
            onChange={handleChange}
            required
            />
          </div>
  
          <div className="form-element">
            <label htmlFor="description">Please add a description for the venue. (MAX 100 words)<span className="required">*</span></label>
            <textarea
              id="description"
              name="description"
              placeholder="E.g. The Union Bar"
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

export default CreateVenueForm;
