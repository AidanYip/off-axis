import { FC, useEffect, useState } from 'react';
import FestivalSquare from "./FestivalSquare.tsx"
import "./Festivals.css"

interface FestivalProperties{
    gig_id: number;
    gig_name: string;
    venue_city: string;
    image_path: string;
}

const Festivals: FC = () =>{
    const[festivalList, setFestivals] = useState<FestivalProperties[]>([]);

    useEffect(() => {
            const fetchGigs = async () => {
                const response = await fetch('/api/gig/getAllFestivals');
                const data = await response.json();
                setFestivals(data.result);
            };
    fetchGigs();
    }, []);

    if (!festivalList || festivalList.length === 0) {
        return <div>Festival data not found</div>;
    }
    
    function stringToSlug(slug: string) {
        return slug
          .toLowerCase()
          .replace(/[^a-z0-9 -]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-+|-+$/g, '');
    }

    return (
        <>
        <div className="header">
            <h1>OFF AXIS X FESTIVALS</h1>
        </div>

        <div className="festivalList">
            {festivalList.map(festival => (
                <>
                <div className="festivalSquare">
                    <FestivalSquare 
                        image={festival.image_path}
                        bandName={festival.gig_name}
                        link = {`/festivals/${stringToSlug(festival.gig_name)}/${festival.gig_id}`}
                    />
                </div>
                </>
                ))}
        </div>
        </>
    )
}

export default Festivals