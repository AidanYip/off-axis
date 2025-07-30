import { FC, useEffect, useState } from 'react';
import Circle from '../Circle'
import "./Gigs.css"

interface GigsProperties{
    gig_id: number;
    gig_name: string;
    venue_city: string;
    image_path: string;
}

const Gigs: FC =()=>{
    const [gigsList, setGigs] = useState<GigsProperties[]>([]);

    useEffect(() => {
        const fetchGigs = async () => {
            const response = await fetch('/api/gig/getAllGigs');
            const data = await response.json();
            setGigs(data.result);
        };
    fetchGigs();
    }, []);

    if (!gigsList || gigsList.length === 0) {
        return <div>Gigs data not found</div>;
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
            <h1>OFF AXIS GIGS</h1>
        </div>

        <div className="gigList">
            {gigsList.map(gig => (
                <>
                <div className="gigCircle">
                    <Circle 
                        image={gig.image_path}
                        bandName={gig.gig_name}
                        location={gig.venue_city}
                        link={`/gigs/${stringToSlug(gig.gig_name)}/${gig.gig_id}`}
                    />
                </div>
                </>
                ))}
        </div>
        </>
    )
}

export default Gigs;
