import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@assets/generated_images/Hero_image_three_models_634e2247.png";

interface HeroProps {
  onShopClick?: () => void;
}

export default function Hero({ onShopClick }: HeroProps) {
  const shouldReduceMotion = useReducedMotion();

  const springConfig = { stiffness: 120, damping: 14 };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-accent/20 to-background min-h-[85vh] flex items-center">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background pointer-events-none" />
      
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
              <span className="text-primary">Your Day.</span>
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
                className="gap-2"
                onClick={onShopClick}
                data-testid="button-shop-now"
              >
                Shop Now <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
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
            <div className="aspect-[16/10] rounded-lg overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="Three models wearing Lumio hoodies on rooftop at dusk"
                className="w-full h-full object-cover"
                data-testid="img-hero"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
