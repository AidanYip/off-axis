import "./Home.css"
import { FC } from "react";
import Border from "../components/Border.tsx";
import Navbar from "../components/Navbar.tsx";
import NewGigs from "../components/Homepage/NewGigs.tsx";
import YTEmbed from "../components/YTEmbed.tsx";
import ArtistOfTheWeek from "../components/Homepage/ArtistOfTheWeek.tsx";
import IGEmbed from "../components/IGEmbed.tsx";
import Footer from "../components/Footer.tsx";
import Showlist from "../components/Homepage/Showlist.tsx";
import GradientButton from "../components/GradientButton.tsx";

const Home: FC = () => {
  return (
    <>
      <Border />
      <Navbar />
      <NewGigs />
      <div id="mid_section">
        <YTEmbed link="https://www.youtube.com/embed/videoseries?si=r57KpiHZ_NY0l7xL&amp;list=PLxglfvhvUgPXDP1KipCboDxnPL4Lr1bqE"/>
        <Showlist/>
      </div>
      <div id="gig_button">
        <GradientButton text="VIEW ALL GIGS" link="/gigs"/>
      </div>
      <ArtistOfTheWeek />
      <IGEmbed />
      <Footer />
    </>
  );
}

export default Home;
