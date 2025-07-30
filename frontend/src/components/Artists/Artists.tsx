import { FC, useEffect, useState } from 'react';
import Circle from '../Circle';
import './Artists.css';

interface Artist {
  artist_id: number;
  name: string;
  image_path: string;
}

const Artists: FC = () => {
  const [artists, setArtists] = useState<Artist[] | null>(null);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch('/api/artists/getAllArtists');
        const data = await response.json();
        setArtists(data.result);
      } catch (err) {
        console.error("Error fetching artists:", err);
        setArtists([]);
      }
    };
    fetchArtists();
  }, []);

  if (!artists) {
    return <div>No information found in the database</div>;
  }

  return (
    <>
      <div className="header">
        <h1>OFF AXIS ARTISTS</h1>
      </div>

      <div className="artistList">
        {artists.map((artist) => (
          <div key={artist.artist_id} className="artistCircle">
            <Circle
              image={`${artist.image_path}`}
              bandName={artist.name}
              link={`/artist/${artist.artist_id}`}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Artists;
