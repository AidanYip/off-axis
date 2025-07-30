import { FC } from "react";
import Navbar from "../components/Navbar";
import Border from "../components/Border";
import IGEmbed from "../components/IGEmbed.tsx";
import Footer from "../components/Footer.tsx";
import ArtistProfile from "../components/Artists/ArtistProfile";

const ArtistProfilePage: FC = () => {
  return (
    <>
      <Border />
      <Navbar />
      <ArtistProfile />
      <IGEmbed />
      <Footer />
    </>
  );
};

export default ArtistProfilePage;
