import { FC } from "react";
import Navbar from "../components/Navbar";
import Border from "../components/Border";
import IGEmbed from "../components/IGEmbed.tsx";
import Footer from "../components/Footer.tsx";
import ArtistManager from "../components/Artists/ArtistManager";

const ArtistManagerPage: FC = () => {
  return (
    <>
      <Border />
      <Navbar />
      <ArtistManager />
      <IGEmbed />
      <Footer />
    </>
  );
};

export default ArtistManagerPage;
