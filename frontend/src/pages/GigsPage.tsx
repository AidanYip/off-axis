import { FC } from "react";
import Navbar from "../components/Navbar";
import Border from "../components/Border";
import Gigs from "../components/Gigs/Gigs.tsx";
import IGEmbed from "../components/IGEmbed.tsx";
import Footer from "../components/Footer.tsx";

const GigsPage: FC = () => {
  return (
    <>
      <Border />
      <Navbar />
      <Gigs />
      <IGEmbed />
      <Footer />
    </>
  );
};

export default GigsPage;
