import { Button } from "react-bootstrap"
import { useEffect, useState } from "react";
import { useShoppingCart } from "../../context/ShoppingCartContext"
import './CartItem.css';

interface CartItemProps {
  gig_id: number;
  quantity: number;
}

interface gigData {
  image_path: string;
  gig_name: string;
  booking_fee: number;
  sale_price: number;
}

const CartItem: React.FC<CartItemProps> = ({ gig_id, quantity }) => {
    const { removeFromCart, setGigQuantity } = useShoppingCart();
    const { cartGigs } = useShoppingCart();
    const [gigData, setGigData] = useState<gigData | null>(null);
    const [addQuantity, setQuantity] = useState(quantity);

    useEffect(() => {
        const fetchGigCartInfo = async () => {    
            try {
                const response = await fetch("/api/gig/getGigCartInfo", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ gig_id }),
                });
    
                if (!response.ok) {
                    throw new Error("Failed to fetch gig in cart.");
                }
    
                const data = await response.json();
                setGigData(data.result);
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchGigCartInfo();
    }, [cartGigs]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = Number(e.target.value);
        setQuantity(newQuantity);
        setGigQuantity(gig_id, newQuantity);
    };

    return (
        <tr className="h-stack">
            <td>
                <Button
                    className="circular-button"
                    variant="outline-danger"
                    size="sm"
                    onClick={() => removeFromCart(gig_id)}
                >
                    &times;
                </Button>
            </td>
            <td>
                <a href={`/gigs/${gigData?.gig_name.replace(/\s+/g, "-").toLowerCase()}/${gig_id}`}>
                    <img
                        src={gigData?.image_path}
                        style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    />
                </a>
            </td>
            <td>
                <div>
                    <a id="cart-item-gig" href={`/gigs/${gigData?.gig_name.replace(/\s+/g, "-").toLowerCase()}/${gig_id}`}>{gigData?.gig_name}</a>
                </div>
                <div>
                    Booking Fee per Ticket: £{gigData?.booking_fee ?? 0}
                </div>
            </td>
            <td>
                £{gigData?.sale_price}
            </td>
            <td>
                <input className="small-input" type="number" name="quantity" value={addQuantity} min="1" max="99" step="1" inputMode='numeric' onChange={handleQuantityChange}></input>
            </td>
            <td>
                £{(((gigData?.sale_price ?? 0) * quantity) + ((gigData?.booking_fee ?? 0) * quantity)).toFixed(2)}
            </td>
        </tr>
    )
};

export default CartItem;
