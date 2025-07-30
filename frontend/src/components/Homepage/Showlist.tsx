import { FC, useEffect, useState } from 'react';
import ShowlistItem from "./ShowlistItem";
import './Showlist.css';

interface Gig {
    gig_id: number;
    gig_name: string;
    venue_name: string;
    date: string;
    supports: { name: string; artist_id: number }[] | null;
}

// SUPPORT JSON FORMAT
    // "supports": [
    // {
    //     "artist_id": 2,
    //     "name": "Support Artist 1"
    // },
    // {
    //     "artist_id": 3,
    //     "name": "Support Artist 2"
    // }
    // ]
    
const Showlist: FC = () => {
    const [gigs, setGigs] = useState<Gig[] | null>(null);

    const offAxisRed = "rgba(221, 17, 103, 1)";
    const offAxisYellow = "rgba(247, 239, 59, 1)"
    const offAxisGreen = "rgba(25, 137, 42, 1)";
    const offAxisBlue = "rgba(24, 146, 190, 1)";
    const colors = [offAxisRed, offAxisYellow, offAxisGreen, offAxisBlue];

    useEffect(() => {
        const fetchGigs = async () => {
            try {
                const response = await fetch('/api/home/getRecentGigs');
                const data = await response.json();
                setGigs(data.result);
            } catch (err) {
                console.error("Error fetching recent gigs:", err);
                setGigs([]);
            }
    };
        fetchGigs();
    }, []);

    if (!gigs || gigs.length === 0) {
        return (
            <div id="showlist">
                {colors.map((color) => (
                    <ShowlistItem
                        colour={color}
                    />
                ))}
            </div>
        );
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
        <div id="showlist">
          {gigs.map((gig, index) => (
            <ShowlistItem
                key={gig.gig_id}
                colour={colors[index % colors.length]}
                artist={gig.gig_name}
                supports={gig.supports ? gig.supports.map(support => support.name) : []}
                date={gig.date}
                link={`/gigs/${stringToSlug(gig.gig_name)}/${gig.gig_id}`}
            />
          ))}
        </div>
      );
};

export default Showlist;
