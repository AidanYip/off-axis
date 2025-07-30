import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Stack } from "react-bootstrap";
import AdminListItem from "./AdminListItem";
import SearchBar from "./SearchBar";
import AdminListCols from "./AdminListCols";

interface Gig {
  gig_id: number;
  gig_name: string;
  venue_id: number;
  venue_name: string;
  artist_id: number;
  name: string;
  image_path: string;
  date: string;
  tickets_sold: string;
  tickets_available: string;
}

const AdminGigDraftsList: React.FC = () => {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [filteredGigs, setFilteredGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Get gig data
  useEffect(() => {
      const fetchGigs = async () => {
        try {
          const response = await fetch("/api/admin/getAllGigDraftsArtistInfo");
          const data = await response.json();
          setGigs(data.result || []);
          setFilteredGigs(data.result || []);
        } catch (error) {
          console.error("Error fetching gigs:", error);
          setGigs([]);
          setFilteredGigs([]);
        } finally {
          setLoading(false);
        }
        
      }; 
  
      fetchGigs();
    }, []);

  // Function to update the filtered list
  const handleSearchSubmit = (query: string) => {
    setFilteredGigs(
      gigs.filter(
        (gig) =>
          gig.gig_name.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  return (
    <>
      <h4 className="p-2 text-start">Gig Drafts</h4>
      <SearchBar onSearchSubmit={handleSearchSubmit} />
      <Stack className="admin-list">
        <AdminListCols data={["Title", "Artist", "Date", "Tickets Sold"]} />
        {loading ? (
          <p className="text-center p-3">Loading gigs...</p>
        ) : filteredGigs.length > 0 ? (
          filteredGigs.map((gig) => (
            <AdminListItem
              key={gig.gig_id}
              title={gig.gig_name}
              data={[
                gig.name,
                gig.date.slice(0, 10),
                gig.tickets_sold + "/" + gig.tickets_available + " Sold",
              ]}
              viewText="View/Edit"
              viewLink={"/admin/gig/" + gig.gig_id}
              approveText="Make Public"
              approveLink={"admin/approve-gig/" + gig.gig_id}
            />
          ))
        ) : (
          <p className="text-center p-3">No gigs found.</p>
        )}
      </Stack>
    </>
  );
};

export default AdminGigDraftsList;
