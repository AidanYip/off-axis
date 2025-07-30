import { FC } from "react";
import Navbar from "../components/Navbar";
import Border from "../components/Border";
import IGEmbed from "../components/IGEmbed.tsx";
import Footer from "../components/Footer.tsx";
import SupportRequests from "../components/Artists/SupportRequests";

const SupportRequestsPage: FC = () => {
  return (
    <>
      <Border />
      <Navbar />
      <SupportRequests />
      <IGEmbed />
      <Footer />
    </>
  );
};

export default SupportRequestsPage;
