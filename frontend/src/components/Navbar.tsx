import { FC } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../interface';
import { useShoppingCart } from "../context/ShoppingCartContext"
import './Navbar.css';

const Navbar: FC = () => {
    const { cartQuantity, cartGigs } = useShoppingCart();
    const [user, setUser] = useState<User | null>(null);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("jwt_token");
            if (!token) {
                setUser(null);
                return;
            }
    
            try {
                const response = await fetch("/api/auth/verify", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
    
                const data = await response.json();
    
                if (data.success) {
                    setUser(data.result);
                } else {
                    setUser(null);
                    localStorage.removeItem('jwt_token');
                }
            } catch (err) {
                console.error("User verification failed:", err);
                setUser(null);
            }
        };
    
        fetchUser();
    }, []); // Runs only on mount
    
    useEffect(() => {
        const fetchTotalPrice = async () => {
            if (cartGigs.length === 0) {
                setTotalPrice(0);
                localStorage.setItem('total-price', '0');
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

                // Calculate the total price based on the quantities in the cart
                const calculateTotalPrice = cartGigs.reduce((total, cartGig) => {
                    const gig = data.result.find((g: { gig_id: number }) => g.gig_id === cartGig.gig_id);
                    if (gig) {
                        total += parseFloat(gig.total_price) * cartGig.quantity;
                    }
                    return total;
                }, 0);

                setTotalPrice(calculateTotalPrice);
                localStorage.setItem('total-price', calculateTotalPrice.toString()); // Total price store in localStorage
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchTotalPrice();
    }, [cartGigs, user]); // Runs whenever cartGigs or user changes

    const handleLogout = () => {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('shopping-cart');
        localStorage.removeItem('total-price');
        setUser(null);
        navigate(0);
    };

    return (
        <nav className='oanavbar'>
            <div className='logo'>
                <a href='/'>
                    <img src='/images/logo.png' alt='Logo' />
                </a>
            </div>
            <menu className='menu-items'>
                <li><a href='/'>HOME</a></li>
                <li><a href='/gigs'>GIGS</a></li>
                <li><a href='/artists'>ARTISTS</a></li>
                <li><a href='/festivals'>FESTIVALS</a></li>
                <li><a href='/join'>JOIN</a></li>
                <li><a href='/contact'>CONTACT</a></li>
            </menu>
            <div className='cart-items'>
                <div className='dropdown'>
                    <img src='/images/user.svg' alt='User' />
                    <div className='dropdown-content'>
                        {user ?
                            (
                                <>
                                    <a href='/profile'>My Profile</a>
                                    <div onClick={handleLogout}>Logout</div>
                                </>
                                
                            )
                        : 
                            (
                                <>
                                    <a href='/login'>Login</a>
                                    <a href='/register'>Register</a>
                                </>
                            )
                        }
                    </div>
                    <span>{user ? user.first_name : 'Guest'}</span>
                </div>
                <a href='/cart' id='cart-span'>{cartQuantity ? cartQuantity : 0} items - £{totalPrice.toFixed(2)}</a>
            </div>
        </nav>
    );
};

export default Navbar;
