import { FC, useEffect, useState } from 'react';
import "./ArtistOfTheWeek.css";
import GradientButton from "../GradientButton";

interface Artist {
  artist_id: number;
  name: string;
  bio: string | null;
  image_path: string;
}

const ArtistOfTheWeek: FC = () => {
  const [artist, setArtist] = useState<Artist | null>(null);

  useEffect(() => {
    const fetchArtist = async () => {
      const response = await fetch('/api/home/getArtistOfTheWeek');
      const data = await response.json();
      setArtist(data.result[0]);
    };

    fetchArtist();
  }, []);

  if (!artist) {
    return <div>No information found on database</div>;
  }

  const imageUrl = artist.image_path ? `${artist.image_path}` : "/images/placeholder.png";

  return (
    <div id="aotw">
      <img src={imageUrl} alt={artist.name}></img>
      <div className="textBlock">
        <h3>ARTIST OF THE WEEK</h3>
        <h2>{artist.name || "Untitled Artist"}</h2>
        <p>{artist.bio || "No Bio"}</p>
        <a>
          <GradientButton text="READ MORE" link={`/artist/${artist.artist_id}`}/>
        </a>
      </div>
    </div>
  );
};

export default ArtistOfTheWeek;