import { FC } from "react";
import Navbar from "../components/Navbar";
import Border from "../components/Border";
import IGEmbed from "../components/IGEmbed";
import Footer from "../components/Footer";
import JoinForm from "../components/Join/JoinForm";

const JoinPage: FC = () => {
  return (
    <>
      <Border />
      <Navbar />
      <JoinForm />
      <IGEmbed />
      <Footer />
    </>
  );
};

export default JoinPage;
