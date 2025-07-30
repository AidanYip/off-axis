import React, { useEffect, useState } from "react";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import CartItem from "./CartItem";
import "./CartForm.css";

const CartForm: React.FC = () => {
  const { cartGigs } = useShoppingCart();
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const fetchTotalPrice = async () => {
      if (cartGigs.length === 0) {
        setTotalPrice(0);
        localStorage.setItem("total-price", "0");
        return;
      }

      try {
        const response = await fetch("/api/gig/getTotalPriceOfGigs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ gig_ids: cartGigs.map((g) => g.gig_id) }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch gigs.");
        }

        const data = await response.json();

        const calculateTotalPrice = cartGigs.reduce((total, cartGig) => {
          const gig = data.result.find((g: { gig_id: number }) => g.gig_id === cartGig.gig_id);
          if (gig) {
            total += parseFloat(gig.total_price) * cartGig.quantity;
          }
          return total;
        }, 0);

        setTotalPrice(calculateTotalPrice);
        localStorage.setItem("total-price", calculateTotalPrice.toString());
      } catch (error) {
        console.error(error);
      }
    };

    fetchTotalPrice();
  }, [cartGigs]);

  const handleCheckout = async () => {
    try {
      const response = await fetch("/api/gig/getGigsCheckoutInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gig_ids: cartGigs.map((g) => g.gig_id) }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch gigs.");
      }
  
      const data = await response.json();
  
      const gigDetails = data.result.map((gig: { gig_name: string; date: string; sale_price: string; booking_fee: string; }, index: number) => ({
        gig_id: cartGigs[index].gig_id,
        quantity: cartGigs[index].quantity,
        gig_name: gig.gig_name,
        date: gig.date.split("T")[0].replace(/-/g, "/"),
        price: parseFloat(gig.sale_price) + parseFloat(gig.booking_fee),
      }));
  
      const checkoutResponse = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gigs: gigDetails }),
      });
  
      if (!checkoutResponse.ok) {
        const errorData = await checkoutResponse.json();
        throw new Error(errorData.error || "Checkout session creation failed.");
      }
  
      const { url } = await checkoutResponse.json();
      window.location = url;
    } catch (error) {
      console.error(error instanceof Error ? error.message : "An unknown error occurred.");
    }
  };  

  return (
    <div>
      <div>
        <h1 id="cart-h1">Cart</h1>
        <form className="cart-form">
          <table className="cart-table">
            <thead>
              <tr className="cart-header">
                <th></th>
                <th></th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody className="cart-body">
              {cartGigs.map((gig) => (
                <CartItem key={gig.gig_id} {...gig} />
              ))}
              <tr>
                <td colSpan={2}></td>
                <td>
                  <input className="coupon-input" placeholder="Coupon Code"></input>
                  <button className="update-basket-button">Apply Coupon</button>
                </td>
                <td colSpan={3}></td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
      <div className="basket-total">
        <h1 id="basket-h1">Basket Totals</h1>
        <table className="cart-table">
          <tbody className="cart-body">
            <tr className="cart-row">
              <td>Subtotal</td>
              <td>£{totalPrice.toFixed(2)}</td>
            </tr>
            <tr className="cart-row">
              <td>Total</td>
              <td>£{totalPrice.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
};

export default CartForm;
