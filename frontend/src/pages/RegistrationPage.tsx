import { FC } from "react";
import Navbar from "../components/Navbar";
import Border from "../components/Border";
import IGEmbed from "../components/IGEmbed";
import Footer from "../components/Footer";
import RegistrationForm from "../components/Registration/RegistrationForm";

const RegistrationPage: FC = () => {
  return (
    <>
      <Border />
      <Navbar />
      <RegistrationForm />
      <IGEmbed />
      <Footer />
    </>
  );
};

export default RegistrationPage;
