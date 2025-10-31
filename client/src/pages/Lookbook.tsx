import { motion, useReducedMotion } from "framer-motion";
import LookbookCard from "@/components/LookbookCard";
import SunBeams from "@/components/SunBeams";
import lookbookYellow from "@assets/Tropical realistic on beach_1761942261349.png";
import lookbookCoral from "@assets/Berries realistic on beach_1761942261350.png";
import lookbookBeach from "@assets/citrus realisic on beach_1761942261352.png";

const lookbookItems = [
  { id: 1, image: lookbookYellow, title: "Tropical Vibes" },
  { id: 2, image: lookbookCoral, title: "Berry Sunset" },
  { id: 3, image: lookbookBeach, title: "Beach Days" },
  { id: 4, image: lookbookCoral, title: "Island Life" },
  { id: 5, image: lookbookYellow, title: "Golden Hour" },
  { id: 6, image: lookbookBeach, title: "Ocean Breeze" },
];

export default function Lookbook() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="min-h-screen relative">
      <SunBeams className="opacity-10" />
      <div className="bg-gradient-to-br from-accent/30 to-background py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            data-testid="text-lookbook-title"
          >
            Lookbook
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Fresh styles, bold colors, unforgettable vibes. See how our hoodies come to life in the streets.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lookbookItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <LookbookCard
                image={item.image}
                title={item.title}
                onClick={() => console.log("Lookbook item clicked:", item.id)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
