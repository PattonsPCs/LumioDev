import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { CartItem } from "@/components/Cart";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("lumio-cart");
    if (saved) {
      try {
        setCartItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e);
      }
    }
  }, []);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("lumio-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback((item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    setCartItems((prevItems) => {
      // Create a unique cart item ID (product id + size + color)
      const cartItemId = `${item.id}-${item.size}-${item.color}`;
      
      // Check if item with same combination already exists
      const existingIndex = prevItems.findIndex(
        (existing) => existing.id === cartItemId
      );

      if (existingIndex >= 0) {
        // Update quantity if item exists
        return prevItems.map((existing, index) =>
          index === existingIndex
            ? { ...existing, quantity: existing.quantity + (item.quantity || 1) }
            : existing
        );
      } else {
        // Add new item with composite ID
        return [...prevItems, { ...item, id: cartItemId, quantity: item.quantity || 1 }];
      }
    });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setCartItems((prevItems) => {
      if (quantity === 0) {
        return prevItems.filter((item) => item.id !== id);
      } else {
        return prevItems.map((item) => (item.id === id ? { ...item, quantity } : item));
      }
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, []);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeItem,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

