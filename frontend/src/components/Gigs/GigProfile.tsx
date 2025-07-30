import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useShoppingCart } from "../../context/ShoppingCartContext"
import GradientButton from '../GradientButton';
import Venue from './Venue';
import Support from './Support';
import "./GigProfile.css";

interface GigProfileProperties {
    gig_id: number;
    gig_name: string;
    venue_id: number;
    date: Date;
    doors_time: string;
    original_price: number;
    sale_price: number;
    booking_fee: number;
    tickets_available: number;
    tickets_sold: number;
    disclaimer: string;
    description: string;
    venue_name: string;
    image_path: string;
}

const GigProfile: FC = () => {
    const { gig_id } = useParams(); // Extract gigId from the URL
    const [gigProfile, setGigs] = useState<GigProfileProperties | null>(null);
    const [addQuantity, setQuantity] = useState(1);
    const gigId = Number(gig_id);
    const { increaseCartQuantity } = useShoppingCart();

    useEffect(() => {
        const fetchGig = async () => {
            const response = await fetch('/api/gig/getGigByGigId', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ gig_id }), // Send gig_id in the request body
            });
            if (!response.ok) {
                throw new Error('Failed to fetch gig.');
            }
            const data = await response.json();
            setGigs(data.result[0]);
        };
    fetchGig();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (!gigProfile){
        return <div>Loading...</div>;
    }

    return (
        <>
        <div id="gigProfile">
            <div className="gigImage">
                <img src={gigProfile.image_path} alt={gigProfile.gig_name}></img>
            </div>

            <div className="gigInfo">
                <h1 className="gigHeader">{gigProfile.gig_name}</h1>

                <div className='gigDetails'>
                    <p>{new Date(gigProfile.date).toLocaleDateString("en-GB")}</p>
                    <p>Start Time - {gigProfile.doors_time && gigProfile.doors_time.slice(0, 5)}</p>
                    <p>Venue: {gigProfile.venue_name}</p>
                </div>

                <span className='priceLabel'>Ticket Price</span>
                <span className='price'>£{gigProfile.original_price}</span>
                <span className='discountedPrice'>£{gigProfile.sale_price}</span>

                <p className='availability'>{gigProfile.tickets_available <= gigProfile.tickets_sold ? "Sold Out!" : "Available!"}</p>

                <table className='table'>
                    <tr>
                        <td>Booking Fee per Ticket:</td>
                        <td>£{gigProfile.booking_fee}</td>
                    </tr>
                    <tr>
                        <td>Total Payable Amount:</td>
                        <td>£{(Number(gigProfile.sale_price) + Number(gigProfile.booking_fee)).toFixed(2)}</td>
                    </tr>
                </table> 

                <form className='gigForm'>
                    <div className='quantity'>
                        <p>Quantity</p>
                        <input type="number" name="quantity" value={addQuantity} min="1" max="99" step="1" inputMode='numeric' onChange={(e) => setQuantity(Number(e.target.value))}></input>
                    </div>
                </form>
                <div className='gigButton'>
                    <a onClick={() => increaseCartQuantity(gigId, addQuantity)}>
                        <GradientButton text="Add to cart" link={'/cart'}/>
                    </a>
                </div>
                <div className='gigDescription'>
                    <p>{gigProfile.disclaimer}
                        <br /><br />
                        {gigProfile.description}
                    </p>
                </div>
            </div>
        </div>
        <div>
            <Support />
        </div>
        <div>
            <Venue venue_id={gigProfile.venue_id}/>
        </div>
    </>
    )
}

export default GigProfile;
