import { FC } from "react";
import Navbar from "../components/Navbar";
import Border from "../components/Border";
import EditArtistProfile from "../components/EditArtistProfile/EditArtistProfile";
import IGEmbed from "../components/IGEmbed.tsx";
import Footer from "../components/Footer.tsx";

const EditArtistProfilePage: FC = () => {
  return (
    <>
      <Border />
      <Navbar />
      <EditArtistProfile />
      <IGEmbed />
      <Footer />
    </>
  );
};

export default EditArtistProfilePage;
