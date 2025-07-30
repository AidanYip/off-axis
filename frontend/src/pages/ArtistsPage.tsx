import { FC } from "react";
import Navbar from "../components/Navbar";
import Border from "../components/Border";
import Artists from "../components/Artists/Artists.tsx";
import IGEmbed from "../components/IGEmbed.tsx";
import Footer from "../components/Footer.tsx";

const ArtistsPage: FC = () => {
  return (
    <>
      <Border />
      <Navbar />
      <Artists />
      <IGEmbed />
      <Footer />
    </>
  );
};

export default ArtistsPage;
