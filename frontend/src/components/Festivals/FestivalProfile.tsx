import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./FestivalProfile.css";
import YTEmbed from '../YTEmbed';
import Featuring from './Featuring';

interface FestivalProfileProperties{
    gig_id: number;
    gig_name: string;
    date: Date;
    doors_time: string;
    disclaimer: string;
    description: string;
    venue_name: string;
    image_path: string;
}

const FestivalProfile: FC = () => {
    const { gig_id } = useParams(); // Extract gigId from the URL
    const [festivalProfile, setGigs] = useState<FestivalProfileProperties | null>(null);

    useEffect(() => {
        const fetchGig = async () => {
            const response = await fetch('/api/gig/getGigByGigId', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ gig_id }), // Send gig_id in the request body
            });
            if (!response.ok) {
                throw new Error('Failed to fetch Festival.');
            }
            const data = await response.json();
            setGigs(data.result[0]);
        };
    fetchGig();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (!festivalProfile){
        return <div>Loading...</div>;
    }

    return (
        <>
        <div id="gigProfile">
            <div className="gigImage">
                {/* <img src={festivalProfile.image_path} alt={festivalProfile.gig_name}></img> */}
                <YTEmbed link="https://www.youtube.com/embed/videoseries?si=r57KpiHZ_NY0l7xL&amp;list=PLxglfvhvUgPXDP1KipCboDxnPL4Lr1bqE" />
            </div>

            <div className="gigInfo">
                <h1 className="gigHeader">{festivalProfile.gig_name}</h1>

                <div className='gigDetails'>
                    <p>{new Date(festivalProfile.date).toLocaleDateString("en-GB")}</p>
                    <p>Venue: {festivalProfile.venue_name}</p>
                </div>
                
                <div className='gigDescription'>
                    <p>{festivalProfile.description}
                        <br /><br />
                        {festivalProfile.disclaimer}
                    </p>
                </div>
            </div>
        </div>
        <div>
            <Featuring/>
        </div>
    </>
    )
};

export default FestivalProfile;
