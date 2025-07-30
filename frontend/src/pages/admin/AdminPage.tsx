import { FC, useState } from "react";
import Navbar from "../../components/Navbar";
import Border from "../../components/Border";
import AdminUpcomingGigsList from "../../components/Admin/AdminUpcomingGigsList";
import AdminArtistsList from "../../components/Admin/AdminArtistsList";
import AdminArtistApplicationsList from "../../components/Admin/AdminArtistApplicationsList";
import "bootstrap/dist/css/bootstrap.css";
import "./AdminPage.css";

import { Row, Col, Tab, Nav } from "react-bootstrap";
import AdminGigDraftsList from "../../components/Admin/AdminGigDraftsList";
import { useParams } from "react-router";
import AdminPastGigsList from "../../components/Admin/AdminPastGigsList";
import AdminUpcomingFestivalsList from "../../components/Admin/AdminUpcomingFestivalsList";
import AdminPastFestivalsList from "../../components/Admin/AdminPastFestivalsList";
import AdminAuth from "../../components/Admin/AdminAuth";


const AdminPage: FC = () => {
  const { tab } = useParams<{ tab: string }>();
  const [activeTab, setActiveTab] = useState<string>(tab || "upcoming-gigs");

  const handleSelect = (selectedTab: string | null) => {
    if (selectedTab) {
      setActiveTab(selectedTab);
    }
  };

  return (
    <>
      <AdminAuth>
        <Border />
        <Navbar />
        <div className="p-3 bg-white text-dark" id="admin-container">
          <h2 className="p-3 mb-2" style={{ textAlign: "left" }}>
            Off Axis Admin Page
          </h2>
          <hr />
          <Tab.Container
            id="left-tabs"
            activeKey={activeTab}
            onSelect={handleSelect}
          >
            <Row>
              <Col sm={2}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <h5 className="p-1 mt-2">Gigs</h5>

                    <Nav.Link eventKey="upcoming-gigs">Upcoming Gigs</Nav.Link>
                    <Nav.Link eventKey="past-gigs">Past Gigs</Nav.Link>
                    <Nav.Link eventKey="gig-drafts">Gig Drafts</Nav.Link>

                    <h5 className="p-1 mt-2">Artists</h5>

                    <Nav.Link eventKey="artists">Artists</Nav.Link>
                    <Nav.Link eventKey="artist-applications">
                      Artist Applications
                    </Nav.Link>

                    <h5 className="p-1 mt-2">Festivals</h5>

                    <Nav.Link eventKey="upcoming-festivals">
                      Upcoming Festivals
                    </Nav.Link>
                    <Nav.Link eventKey="past-festivals">Past Festivals</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={10}>
                <Tab.Content>
                  {/* Only load list component when tab active */}
                  <Tab.Pane eventKey="upcoming-gigs">
                    {activeTab === "upcoming-gigs" && <AdminUpcomingGigsList />}
                  </Tab.Pane>
                  <Tab.Pane eventKey="past-gigs">
                    {activeTab === "past-gigs" && <AdminPastGigsList />}
                  </Tab.Pane>
                  <Tab.Pane eventKey="artists">
                    {activeTab === "artists" && <AdminArtistsList />}
                  </Tab.Pane>
                  <Tab.Pane eventKey="artist-applications">
                    {activeTab === "artist-applications" && (
                      <AdminArtistApplicationsList />
                    )}
                  </Tab.Pane>
                  <Tab.Pane eventKey="gig-drafts">
                    {activeTab === "gig-drafts" && <AdminGigDraftsList />}
                  </Tab.Pane>
                  <Tab.Pane eventKey="upcoming-festivals">
                    {activeTab === "upcoming-festivals" && (
                      <AdminUpcomingFestivalsList />
                    )}
                  </Tab.Pane>
                  <Tab.Pane eventKey="past-festivals">
                    {activeTab === "past-festivals" && <AdminPastFestivalsList />}
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
        <div id="spacer"></div>
      </AdminAuth>
    </>
  );
};

export default AdminPage;