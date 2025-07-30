import "../components/Gigs/GigProfile.css"
import { FC } from "react";
import Border from "../components/Border.tsx";
import Navbar from "../components/Navbar.tsx";
import IGEmbed from "../components/IGEmbed.tsx";
import Footer from "../components/Footer.tsx";
import GigProfile from "../components/Gigs/GigProfile.tsx";

const GigProfilePage: FC = () => {
  return (
    <>
      <Border />
      <Navbar />
      <GigProfile />
      <IGEmbed />
      <Footer />
    </>
  );
}

export default GigProfilePage;
