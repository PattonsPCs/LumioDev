import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sun } from "lucide-react";
import SunLogo from "./SunLogo";
import SunBeams from "./SunBeams";
import heroImage from "@assets/citrus berries tropical Lumio light up your day_1761942261351.png";

interface HeroProps {
  onShopClick?: () => void;
}

export default function Hero({ onShopClick }: HeroProps) {
  const shouldReduceMotion = useReducedMotion();

  const springConfig = { stiffness: 120, damping: 14 };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-accent/40 via-background to-secondary/20 min-h-[85vh] flex items-center">
      <SunBeams className="opacity-30" />
      
      <motion.div
        className="absolute top-20 right-20 hidden lg:block"
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, scale: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
      >
        <SunLogo size={120} animate={true} />
      </motion.div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background pointer-events-none" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? {} : { duration: 0.6, ...springConfig }}
            className="space-y-6"
          >
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
              initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.98 }}
              animate={shouldReduceMotion ? {} : { 
                opacity: 1, 
                scale: [0.98, 1.02, 1],
              }}
              transition={shouldReduceMotion ? {} : { 
                duration: 0.8,
                times: [0, 0.5, 1],
                ...springConfig 
              }}
              data-testid="text-hero-title"
            >
              Light Up <br />
              <span className="text-primary drop-shadow-lg">Your Day.</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground max-w-md"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? {} : { delay: 0.2, duration: 0.5 }}
              data-testid="text-hero-subtitle"
            >
              Premium streetwear hoodies with bold colors and photogenic style. 350gsm brushed fleece, reinforced seams.
            </motion.p>

            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? {} : { delay: 0.4, duration: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                className="gap-2 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                onClick={onShopClick}
                data-testid="button-shop-now"
              >
                Shop Now <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full"
                data-testid="button-view-lookbook"
              >
                View Lookbook
              </Button>
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={shouldReduceMotion ? {} : { delay: 0.6, duration: 0.5 }}
              className="flex flex-wrap gap-8 pt-4"
            >
              <div>
                <div className="text-2xl font-bold text-primary" data-testid="text-stat-shipping">Free Shipping</div>
                <div className="text-sm text-muted-foreground">On orders $50+</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary" data-testid="text-stat-returns">Free Returns</div>
                <div className="text-sm text-muted-foreground">30-day guarantee</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary" data-testid="text-stat-quality">Premium Quality</div>
                <div className="text-sm text-muted-foreground">350gsm fleece</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? {} : { delay: 0.3, duration: 0.8, ...springConfig }}
            className="relative"
          >
            <div className="aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src={heroImage}
                alt="Lumio cans - tropical mood-boosting functional drinks on beach"
                className="w-full h-full object-cover"
                loading="eager"
                fetchPriority="high"
                data-testid="img-hero"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
