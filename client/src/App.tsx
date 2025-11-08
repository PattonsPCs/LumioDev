import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CartProvider, useCart } from "@/contexts/CartContext";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Cart from "@/components/Cart";
import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import Product from "@/pages/Product";
import Lookbook from "@/pages/Lookbook";
import About from "@/pages/About";
import Sizing from "@/pages/Sizing";
import FAQ from "@/pages/FAQ";
import Contact from "@/pages/Contact";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import Shipping from "@/pages/Shipping";
import NotFound from "@/pages/not-found";
import { useToast } from "@/hooks/use-toast";

function Router() {
  return (
    <AnimatePresence mode="wait">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/shop" component={Shop} />
        <Route path="/product/:id" component={Product} />
        <Route path="/lookbook" component={Lookbook} />
        <Route path="/about" component={About} />
        <Route path="/sizing" component={Sizing} />
        <Route path="/faq" component={FAQ} />
        <Route path="/contact" component={Contact} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route path="/shipping" component={Shipping} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function AppContent() {
  const [cartOpen, setCartOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const { cartItems, updateQuantity, removeItem, cartCount } = useCart();
  const { toast } = useToast();

  const handleCheckout = useCallback(async () => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some items to your cart before checking out.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsCheckingOut(true);
      const response = await fetch("/api/square/checkout-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            id: item.id,
            quantity: item.quantity,
            size: item.size,
            color: item.color,
          })),
        }),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody.message || response.statusText);
      }

      const data = await response.json();
      if (data?.url) {
        setCartOpen(false);
        window.location.href = data.url;
      } else {
        throw new Error("Failed to create checkout link. Please try again.");
      }
    } catch (error) {
      console.error("Square checkout error", error);
      toast({
        title: "Checkout error",
        description:
          error instanceof Error
            ? error.message
            : "We couldn't start your checkout. Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setIsCheckingOut(false);
    }
  }, [cartItems, toast]);

  return (
    <div className="flex flex-col min-h-screen">
      <Nav cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
      
      <motion.main
        className="flex-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Router />
      </motion.main>

      <Footer />

      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeItem}
        onCheckout={handleCheckout}
        isProcessingCheckout={isCheckingOut}
      />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <AppContent />
          <Toaster />
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
