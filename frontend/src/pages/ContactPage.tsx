import { FC } from "react";
import Navbar from "../components/Navbar";
import Border from "../components/Border";
import ContactForm from "../components/Contact/ContactForm";
import IGEmbed from "../components/IGEmbed.tsx";
import Footer from "../components/Footer.tsx";

const ContactPage: FC = () => {
  return (
    <>
      <Border />
      <Navbar />
      <ContactForm />
      <IGEmbed />
      <Footer />
    </>
  );
};

export default ContactPage;
