import { User } from '../../interface';
import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import "./SupportRequests.css";

interface SupportRequest {
    artist_id: number;
    gig_id: number;
    gig_name: string;
}

const SupportRequests: FC = () => {
    const [_user, setUser] = useState<User | null>(null); // eslint-disable-line @typescript-eslint/no-unused-vars
    const [supports, setSupports] = useState<SupportRequest[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
      const fetchUser = async () => {
          const token = localStorage.getItem('jwt_token');
          if (!token) {
              toast.warn('Please login to access profile', { autoClose: 5000 });
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
                  fetchSupportRequests(dataArtist.result[0].artist_id);
              } else {
                  navigate('/join');
              }
          } catch (err) {
              toast.warn('To access artist profile, please submit this form.', { autoClose: 8000 });
              console.error("Fetch Artist ID failed:", err);
              navigate('/join');
          }
      };
    
      const fetchSupportRequests = async (artist_id: number) => {
        const response = await fetch('/api/gig/getAllSupportRequests', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ artist_id }),
        });

        if (!response.ok) {
            throw new Error("Failed to fetch requests");
        }

        const data = await response.json();
        setSupports(data.result);
      };
      fetchUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleResponse = async (artist_id: number, gig_id: number, responded: number, accepted: number) => {
        try {
            const response = await fetch('/api/gig/updateSupport', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ artist_id, gig_id, responded, accepted }),
            });

            if (!response.ok) {
                throw new Error("Failed to send response");
            }

            const data = await response.json();
            if (data.success) {
                toast.success(`Request ${accepted ? 'accepted' : 'declined'} successfully!`);
                setSupports(prev => prev.filter(support => support.gig_id !== gig_id));
            } else {
                toast.error("Failed to process request");
            }
        } catch (err) {
            console.error("Error responding to request:", err);
            toast.error("An error occurred");
        }
    };

    return (
        <>
            <h1>Support Requests</h1>
            <a href="/profile">
                <button className="back-button">Return</button>
            </a>
            
            <div>
                {supports.length > 0 ? (
                    <div>
                        {supports.map((support) => (
                            <div key={support.gig_id}>
                                <h3>{support.gig_name}</h3>
                                <p>You received a request to support {support.gig_name}.</p>
                                <p>Do you accept?</p>
                                <button className="decline-button" onClick={() => handleResponse(support.artist_id, support.gig_id, 1, 0)}>Decline</button>
                                <button className="accept-button" onClick={() => handleResponse(support.artist_id, support.gig_id, 1, 1)}>Accept</button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>There are currently no support requests.</p>
                )}
            </div>
        </>
    );
};

export default SupportRequests;
