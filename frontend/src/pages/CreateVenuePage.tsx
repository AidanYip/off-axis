import { FC } from "react";
import Navbar from "../components/Navbar";
import Border from "../components/Border";
import CreateVenueForm from "../components/CreateVenue/CreateVenueForm";
import IGEmbed from "../components/IGEmbed.tsx";
import Footer from "../components/Footer.tsx";

const CreateVenuePage: FC = () => {
  return (
    <>
      <Border />
      <Navbar />
      <CreateVenueForm />
      <IGEmbed />
      <Footer />
    </>
  );
};

export default CreateVenuePage;
