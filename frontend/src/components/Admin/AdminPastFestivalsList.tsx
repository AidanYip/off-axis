import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Stack } from "react-bootstrap";
import AdminListItem from "./AdminListItem";
import SearchBar from "./SearchBar";
import AdminListCols from "./AdminListCols";

interface Festival {
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

const AdminUpcomingFestivalsList: React.FC = () => {
  const [festivals, setGigs] = useState<Festival[]>([]);
  const [filteredFestivals, setFilteredFestivals] = useState<Festival[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Get festival data
  useEffect(() => {
      const fetchFestivals = async () => {
        try {
          const response = await fetch("/api/admin/getAllPastFestivals");
          const data = await response.json();
          setGigs(data.result || []);
          setFilteredFestivals(data.result || []);
        } catch (error) {
          console.error("Error fetching festivals:", error);
          setGigs([]);
          setFilteredFestivals([]);
        } finally {
          setLoading(false);
        }
        
      }; 
  
      fetchFestivals();
    }, []);
  

  // Function to update the filtered list
  const handleSearchSubmit = (query: string) => {
    setFilteredFestivals(
      festivals.filter(
        (festival) =>
          festival.gig_name.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  return (
    <>
      <h4 className="p-2 text-start">Past Festivals</h4>
      <SearchBar onSearchSubmit={handleSearchSubmit} />
      <Stack className="admin-list">
        <AdminListCols data={["Title", "Date", "Tickets Sold"]} />
        {loading ? (
          <p className="text-center p-3">Loading festivals...</p>
        ) : filteredFestivals.length > 0 ? (
          filteredFestivals.map((festival) => (
            <AdminListItem
              key={festival.gig_id}
              title={festival.gig_name}
              data={[
                festival.date.slice(0, 10),
                festival.tickets_sold + "/" + festival.tickets_available + " Sold",
              ]}
              viewText="View/Edit"
              viewLink={"/admin/festival/" + festival.gig_id}
            />
          ))
        ) : (
          <p className="text-center p-3">No festivals found.</p>
        )}
      </Stack>
    </>
  );
};

export default AdminUpcomingFestivalsList;