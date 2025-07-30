import { FC, useEffect, useState } from 'react';
import Circle from '../Circle'
import "./Featuring.css"
import { useParams } from 'react-router-dom';

interface Artist{
    artist_id?: number;
    name:string;
    image_path: string;
}

const Featuring: FC =()=>{
    const {gig_id} = useParams();
    const [artistDetails, setArtistDetails] = useState<Artist[]>([]);


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
                setArtistDetails(artistData);
            } catch (error){
                setArtistDetails([]);
                console.log(error)
            }
        };
        fetchSupports();

    }, [gig_id]);


    if (!artistDetails || artistDetails.length === 0) {
        return <div>Supporting Artists not found</div>;
    }

    return (
        <>
        <div className="header">
            <h3>Featuring</h3>
        </div>

        <div className="gigList">
            {artistDetails.map((artist: Artist) => (
                <>
                <div key={artist.artist_id} className="gigCircle">
                    <Circle
                        image={`${artist.image_path}`}
                        bandName={artist.name}
                        link={`/artist/${artist.artist_id}`}
                    />
                </div>
                </>
                ))}
                
                
        </div>
        </>
    )
}

export default Featuring