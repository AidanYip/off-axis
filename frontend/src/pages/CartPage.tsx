import { FC } from "react";
import Navbar from "../components/Navbar";
import Border from "../components/Border";
import CartForm from "../components/Cart/CartForm";
import IGEmbed from "../components/IGEmbed.tsx";
import Footer from "../components/Footer.tsx";

const CartPage: FC = () => {
  return (
    <>
      <Border />
      <Navbar />
      <CartForm />
      <IGEmbed />
      <Footer />
    </>
  );
};

export default CartPage;
