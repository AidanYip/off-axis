import { FC } from "react";
import Navbar from "../components/Navbar";
import Border from "../components/Border";
import CreateGigForm from "../components/CreateGig/CreateGigForm";
import IGEmbed from "../components/IGEmbed.tsx";
import Footer from "../components/Footer.tsx";

const CreateGigPage: FC = () => {
  return (
    <>
      <Border />
      <Navbar />
      <CreateGigForm />
      <IGEmbed />
      <Footer />
    </>
  );
};

export default CreateGigPage;
