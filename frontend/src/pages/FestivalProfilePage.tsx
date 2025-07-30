import "../components/Festivals/FestivalProfile.css"
import { FC } from "react";
import Border from "../components/Border.tsx";
import Navbar from "../components/Navbar.tsx";
import IGEmbed from "../components/IGEmbed.tsx";
import Footer from "../components/Footer.tsx";
import FestivalProfile from "../components/Festivals/FestivalProfile.tsx";

const FestivalProfilePage: FC = () => {
  return (
    <>
      <Border />
      <Navbar />
      <FestivalProfile />
      <IGEmbed />
      <Footer />
    </>
  );
}

export default FestivalProfilePage;
