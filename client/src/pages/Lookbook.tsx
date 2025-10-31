import { motion, useReducedMotion } from "framer-motion";
import LookbookCard from "@/components/LookbookCard";
import lookbookYellow from "@assets/generated_images/Lookbook_editorial_photo_yellow_1a515cdc.png";
import lookbookMagenta from "@assets/generated_images/Lookbook_editorial_photo_magenta_7eccdd9e.png";

const lookbookItems = [
  { id: 1, image: lookbookYellow, title: "Urban Sunset" },
  { id: 2, image: lookbookMagenta, title: "Street Vibrance" },
  { id: 3, image: lookbookYellow, title: "Golden Hour" },
  { id: 4, image: lookbookMagenta, title: "City Lights" },
  { id: 5, image: lookbookYellow, title: "Weekend Vibes" },
  { id: 6, image: lookbookMagenta, title: "Night Out" },
];

export default function Lookbook() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="min-h-screen">
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
