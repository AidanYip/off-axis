import { FC } from "react";
import Navbar from "../components/Navbar";
import Border from "../components/Border";
import EditGigForm from "../components/EditGig/EditGigForm";
import IGEmbed from "../components/IGEmbed.tsx";
import Footer from "../components/Footer.tsx";

const EditGigPage: FC = () => {
  return (
    <>
      <Border />
      <Navbar />
      <EditGigForm />
      <IGEmbed />
      <Footer />
    </>
  );
};

export default EditGigPage;
