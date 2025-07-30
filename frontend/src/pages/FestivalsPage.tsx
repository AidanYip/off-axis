import { FC } from "react";
import Navbar from "../components/Navbar";
import Border from "../components/Border";
import Festivals from "../components/Festivals/Festivals.tsx";
import IGEmbed from "../components/IGEmbed.tsx";
import Footer from "../components/Footer.tsx";

const FestivalsPage: FC = () => {
  return (
    <>
      <Border />
      <Navbar />
      <Festivals />
      <IGEmbed />
      <Footer />
    </>
  );
};

export default FestivalsPage;
