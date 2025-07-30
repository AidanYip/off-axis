import { FC, useEffect, useState } from 'react';
import GradientButton from '../GradientButton';
import {FaCity, FaMapMarked} from 'react-icons/fa';
import "./Venue.css";

interface VenueProperties {
    venue_id?: number;
    venue_name: string;
    venue_address: string;
    venue_link: string;
    venue_description: string;
    image_path: string;
}

interface VenueProps {
    venue_id: number;
}

const Venue: FC<VenueProps> =({venue_id})=>{
    const [venue, setVenue] = useState<VenueProperties | null>(null);

    useEffect(() => {
        const fetchVenue = async () => {
            const response = await fetch('/api/venue/getVenueById', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ venue_id }), // Send venue_id in the request body
            });
            if (!response.ok) {
                throw new Error('Failed to fetch venue.');
            }
            const data = await response.json();
            setVenue(data.result[0]);
        };
    fetchVenue();
    }, [venue_id]);

    if (!venue){
        return <div>Venue not found.</div>;
    }

    return (
        <>
        <h1 className='venueTitle'>Venue</h1>
        <div id="venueProfile">
            <div className="venueImage">
                <img src={venue.image_path} alt={venue.venue_name}></img>
            </div>

            <div className="venueInfo">
                <h1 className="header">{venue.venue_name}</h1>

                <div className='venueDetails'>
                    <span className='venueItem'>
                        <p className='venue'>{venue.venue_description}</p>
                    </span>
                    <span className='venueItem'>
                        <FaCity />
                        <p className='venue'>Venue - {venue.venue_name}</p>
                    </span>
                    <span className='venueItem'>
                        <FaMapMarked />
                        <p className='address'>Address - {venue.venue_address}</p>
                    </span>
                </div>
                
                <div className='venueButton'>
                    <a>
                        <GradientButton text="More Info" link={venue.venue_link}/>
                    </a>
                </div>
            </div>
        </div>
    </>
    )
}

export default Venue
