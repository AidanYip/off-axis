import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Stack } from "react-bootstrap";
import AdminListItem from "./AdminListItem";
import SearchBar from "./SearchBar";
import AdminListCols from "./AdminListCols";

interface Artist {
  artist_id: number;
  name: string;
  genre: string;
  bio: string;
}

const AdminArtistApplicationsList: React.FC = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [filteredArtists, setFilteredArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch("/api/admin/getAllArtistApplications");
        const data = await response.json();
        setArtists(data.result || []);
        setFilteredArtists(data.result || []);
      } catch (error) {
        console.error("Error fetching artists:", error);
        setArtists([]);
        setFilteredArtists([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  // Function to update the filtered list
  const handleSearchSubmit = (query: string) => {
    if (!artists || artists.length === 0) {
      return;
    }
    setFilteredArtists(
      artists.filter((artist) =>
        artist.name?.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  return (
    <>
      <h4 className="p-2 text-start">Pending Artist Applications</h4>
      <SearchBar onSearchSubmit={handleSearchSubmit} />
      <Stack className="admin-list">
        <AdminListCols data={["Name", "Genre", "Bio"]} />
        {loading ? (
          <p className="text-center p-3">Loading artists...</p>
        ) : filteredArtists.length > 0 ? (
          filteredArtists.map((artist) => (
            <AdminListItem
              key={artist.artist_id}
              title={artist.name}
              data={[artist.genre, artist.bio.length > 100 ? artist.bio.slice(0, 100) + "..." : artist.bio]}
              viewText="View/Edit"
              viewLink={"/admin/artist/" + artist.artist_id}
              approveText="Approve"
              approveLink={"admin/approve-artist/" + artist.artist_id}
            />
          ))
        ) : (
          <p className="text-center p-3">No artists found.</p>
        )}
      </Stack>
    </>
  );
};

export default AdminArtistApplicationsList;