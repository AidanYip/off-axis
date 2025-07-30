import "./ArtistProfile.css";
import GradientButton from '../GradientButton';
import ShowlistItem from './ShowlistItem';
import { User } from '../../interface';
import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

interface Link {
    platform: string;
    link: string;
}

interface Gig {
    gig_id: number;
    artist_id: string;
    gig_name: string;
    supports: Array<{
        artist_id: number;
        name: string;
    }>;
    date: string;
}

interface ArtistProfileProperties {
    artist_id?: number;
    name: string;
    image_path: string;
    bio: string;
    links: Link[];
    upcoming_gigs: Gig[];
}

const ArtistManager: FC = () => {
    const [_user, setUser] = useState<User | null>(null); // eslint-disable-line @typescript-eslint/no-unused-vars
    const [artistProfile, setArtistProfile] = useState<ArtistProfileProperties | null>(null);
    const [gigs, setGigs] = useState<Gig[]>([]);
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
                  fetchArtist(dataArtist.result[0].artist_id);
              } else {
                  navigate('/join');
              }
          } catch (err) {
              toast.warn('To access artist profile, please submit this form.', { autoClose: 8000 });
              console.error("Fetch Artist ID failed:", err);
              navigate('/join');
          }
      };
    
      const fetchArtist = async (artist_id: number) => {
        const response = await fetch('/api/artists/getArtistById', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({artist_id}),
        });

        if (!response.ok) {
            throw new Error("Failed to fetch Artist");
        }

        const data = await response.json();
        const artist = data.result[0];
        const links = artist.links ? 
            (Array.isArray(artist.links) ?
                artist.links:
                    Object.entries(artist.links).map(([platform, link]) => ({
                        platform,
                        link: typeof link === "string" ? link: ''
                    }))    
            ):[];
        
        const gigResponse = await fetch('/api/gig/getGigByArtistId', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({artist_id}),
        });

        if (!gigResponse.ok){
            throw new Error("Failed to fetch gigs.");
        }
        const gigData = await gigResponse.json();
        setGigs(gigData.result || []);
        setArtistProfile({...artist, links});
      };
      fetchUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (!artistProfile) {
        return <div>Please join first. / Your artist application is being processed.</div>
    }

    const validLinks = artistProfile.links.filter(link => 
        link.platform && 
        link.link && 
        link.link.trim() !== ''
    );

    const offAxisRed = "rgba(221, 17, 103, 1)";
    const offAxisYellow = "rgba(247, 239, 59, 1)"
    const offAxisGreen = "rgba(25, 137, 42, 1)";
    const offAxisBlue = "rgba(24, 146, 190, 1)";
    const colors = [offAxisRed, offAxisYellow, offAxisGreen, offAxisBlue];
    const fillInColor = colors[Math.floor(Math.random() * colors.length)];

    return(
        <>
        <section id="artist-profile">
            <img src={artistProfile.image_path}/>
            <div className="artist-info">
                <a href="/profile/support-requests">
                    <button className="support-requests-button">Support Requests</button>
                </a>
                <a href="/create-gig">
                    <button className="create-gig-button">Create a Gig</button>
                </a>
                <a href="/edit-profile">
                    <button className="edit-profile-button">Edit Profile</button>
                </a>
                <h1>{artistProfile.name.toUpperCase()}</h1>
                <p> 
                    {artistProfile.bio}
                </p>
            </div>
        </section>
        
        <section id='links'>
            
            <div className='socials-links'>
            {validLinks.length > 0 && (
                <>
                <h3>ARTIST LINKS</h3>
                <div id='socials'>
                {artistProfile.links.map((link) => (
                    <GradientButton 
                        text={link.platform.toUpperCase()} 
                        link={link.link}
                    />
                ))}
                </div>
            </>
            )}
            </div>

            {gigs.length > 0 && (
                <div className='upcoming-gigs'>
                {gigs?.map?.((gig) => (
                    <ShowlistItem
                        colour={fillInColor}
                        artist={gig.gig_name.toUpperCase()}
                        supports={gig.supports?.map(support => support.name) || []}
                        date={gig.date}
                        link={`/edit-gig/${gig.gig_id}`}
                    />
                ))}
                </div>
            )}
        </section>
        </>
       
    )
}

export default ArtistManager;
