import { FC, useEffect, useState } from 'react';
import Circle from '../Circle.tsx';
import "./NewGigs.css";

interface Gig {
  gig_id: number;
  gig_name: string;
  venue_city: string;
  image_path: string;
}

const NewGigs: FC = () => {
  const [gigs, setGigs] = useState<Gig[] | null>(null);

  useEffect(() => {
    const fetchGigs = async () => {
      const response = await fetch('/api/home/getUpcomingGigs');
      const data = await response.json();
      setGigs(data.result);
    };

    fetchGigs();
  }, []);

  if (gigs === null) {
    return <div>No upcoming gigs information found.</div>;
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
    <div id="newGigs">
      <h1>JUST ANNOUNCED OFF AXIS GIGS</h1>
      <div className="circles">
        {gigs.map((gig, index) => (
          <a key={index}>
            <div className="quarter">
              <Circle
                color={['#dd1167', '#f7ef3b', '#19892a', '#1892be'][index % 4]}
                image={gig.image_path}
                bandName={gig.gig_name}
                location={gig.venue_city}
                link={`/gigs/${stringToSlug(gig.gig_name)}/${gig.gig_id}`}
              />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default NewGigs;
