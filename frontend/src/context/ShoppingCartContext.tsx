import { createContext, ReactNode, useContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartGig = {
  gig_id: number;
  quantity: number;
  price?: number;
};

type ShoppingCartContext = {
  getGigQuantity: (gig_id: number) => number;
  increaseCartQuantity: (gig_id: number, addQuantity: number, price?: number) => void;
  decreaseCartQuantity: (gig_id: number) => void;
  removeFromCart: (gig_id: number) => void;
  setGigQuantity: (gig_id: number, quantity: number) => void;
  updateGigPrice: (gig_id: number, price: number) => void;
  cartQuantity: number;
  cartGigs: CartGig[];
  totalPrice: number;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() { // eslint-disable-line react-refresh/only-export-components
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartGigs, setCartGigs] = useLocalStorage<CartGig[]>(
    "shopping-cart",
    []
  );
  
  const [totalPrice, setTotalPrice] = useLocalStorage<number>(
    "total-price",
    0
  );

  const cartQuantity = cartGigs.reduce(
    (quantity, gig) => gig.quantity + quantity,
    0
  );

  // Calculate total price whenever cartGigs changes
  useEffect(() => {
    const calculatedTotal = cartGigs.reduce(
      (total, gig) => total + (gig.price || 0) * gig.quantity, 
      0
    );
    setTotalPrice(calculatedTotal);
  }, [cartGigs, setTotalPrice]);

  function getGigQuantity(gig_id: number) {
    return cartGigs.find((gig) => gig.gig_id === gig_id)?.quantity || 0;
  }

  function increaseCartQuantity(gig_id: number, addQuantity: number, price?: number) {
    setCartGigs((currGigs) => {
      if (!currGigs.find((gig) => gig.gig_id === gig_id)) {
        return [...currGigs, { gig_id, quantity: addQuantity, price }];
      } else {
        return currGigs.map((gig) =>
          gig.gig_id === gig_id
            ? { 
                ...gig, 
                quantity: gig.quantity + addQuantity,
                // Only update price if provided and price not already set
                price: price !== undefined ? (gig.price ?? price) : gig.price 
              }
            : gig
        );
      }
    });
  }

  function decreaseCartQuantity(gig_id: number) {
    setCartGigs((currGigs) => {
      if (currGigs.find((gig) => gig.gig_id === gig_id)?.quantity === 1) {
        return currGigs.filter((gig) => gig.gig_id !== gig_id);
      } else {
        return currGigs.map((gig) =>
          gig.gig_id === gig_id ? { ...gig, quantity: gig.quantity - 1 } : gig
        );
      }
    });
  }

  function removeFromCart(gig_id: number) {
    setCartGigs((currGigs) =>
      currGigs.filter((gig) => gig.gig_id !== gig_id)
    );
  }

  function setGigQuantity(gig_id: number, quantity: number) {
    setCartGigs((currGigs) => {
      return currGigs.map((gig) =>
        gig.gig_id === gig_id ? { ...gig, quantity } : gig
      );
    });
  }

  function updateGigPrice(gig_id: number, price: number) {
    setCartGigs((currGigs) => {
      return currGigs.map((gig) =>
        gig.gig_id === gig_id ? { ...gig, price } : gig
      );
    });
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getGigQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        setGigQuantity,
        updateGigPrice,
        cartGigs,
        cartQuantity,
        totalPrice,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
