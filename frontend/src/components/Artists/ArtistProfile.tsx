import "./ArtistProfile.css";
import GradientButton from '../GradientButton';
import ShowlistItem from '../Homepage/ShowlistItem';
import { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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

const ArtistProfile: FC = () => {
    const {artist_id} = useParams();
    const [artistProfile, setArtistProfile] = useState<ArtistProfileProperties | null>(null);
    const [gigs, setGigs] = useState<Gig[]>([]);

    useEffect(()=> {
        const fetchArtist = async () => {
            const response = await fetch('/api/artists/getArtistById', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({artist_id}),
            });

            if (!response.ok){
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
        fetchArtist();
    }, [artist_id]);

    if(!artistProfile){
        return <div>Artist not found.</div>
    }

    function stringToSlug(slug: string) {
        return slug
          .toLowerCase()
          .replace(/[^a-z0-9 -]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-+|-+$/g, '');
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
                {gigs.map((gig) => (
                    <ShowlistItem
                        colour = {fillInColor}
                        artist={gig.gig_name.toUpperCase()}
                        supports={gig.supports.map(support => support.name)}
                        date={gig.date}
                        link={`/gigs/${stringToSlug(gig.gig_name)}/${gig.gig_id}`}
                    />
                ))}
                </div>
            )}
        </section>
        </>
       
    )
}

export default ArtistProfile;
