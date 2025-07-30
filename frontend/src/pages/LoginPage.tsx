import { FC } from "react";
import Navbar from "../components/Navbar";
import Border from "../components/Border";
import LoginForm from "../components/Login/LoginForm";
import IGEmbed from "../components/IGEmbed.tsx";
import Footer from "../components/Footer.tsx";

const LoginPage: FC = () => {
  return (
    <>
      <Border />
      <Navbar />
      <LoginForm />
      <IGEmbed />
      <Footer />
    </>
  );
};

export default LoginPage;
