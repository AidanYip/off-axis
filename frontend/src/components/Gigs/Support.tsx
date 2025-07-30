import { FC, useEffect, useState } from 'react';
import "./Support.css"
import { useParams } from 'react-router-dom';
import GradientButton from '../GradientButton';

interface Artist{
    artist_id: number;
    name:string;
    image_path: string;
    bio: string;
}

const Support: FC =()=>{
    const {gig_id} = useParams();
    const [supportDetails, setSupportDetails] = useState<Artist[]>([]);
    
    
    useEffect(() => {
        const fetchSupports = async () => {
            try{
                const response = await fetch('/api/gig/getSupportsByGigId',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                       },
                    body: JSON.stringify({ gig_id }), // Send gig_id in the request body
                });
                if (!response.ok){
                    throw new Error("Failed to fetch supports");
                }
    
                const data = await response.json();
                const supports = data.result[0]?.supports || [];
    
                const artistData = await Promise.all(
                    supports.map(async (support: {artist_id: number}) => {
                        const artistResponse = await fetch('/api/artists/getArtistById', {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({artist_id: support.artist_id}),
                        });
                        
                        if (!artistResponse.ok){
                            throw new Error("Failed to fetch artist $(support.artist_id)");
                        }
                        const artistData = await artistResponse.json();
                        return artistData.result[0];
                    })
                );
                setSupportDetails(artistData);
            } catch (error){
                setSupportDetails([]);
                console.log(error)
            }
        };
        fetchSupports();
    
    }, [gig_id]);

    if (!supportDetails || supportDetails.length === 0){
        return <div>No supports found.</div>;
    }

    return (
        <>
        <h1 className='supportTitle'>With Support From</h1>
        <div className="supportList">
            {supportDetails.map((support: Artist) => (
                <div key={support.artist_id} id="supportProfile">
                    <div className="supportImage">
                        <img src={support.image_path} alt="Placeholder Image Alt"></img>
                    </div>

                    <div className="supportInfo">
                        <h1 className="header">{support.name}</h1>

                        <div className='supportDetails'>
                            <span className='supportItem'>
                               <p>{support.bio}</p>
                            </span>

                            <div className='venueButton'>
                            <a>
                                <GradientButton text="Explore" link={`/artist/${support.artist_id}`}/>
                            </a>
                        </div>

                        </div>
                
                    </div>
                </div>
            

            ))}
        </div>
    </>
    )
}

export default Support