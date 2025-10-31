import { motion, useReducedMotion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface LookbookCardProps {
  image: string;
  title: string;
  onClick?: () => void;
}

export default function LookbookCard({ image, title, onClick }: LookbookCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
      transition={{ duration: 0.3 }}
      data-testid={`lookbook-card-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <Card
        className="overflow-hidden cursor-pointer group hover-elevate"
        onClick={onClick}
      >
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            data-testid={`img-lookbook-${title.toLowerCase().replace(/\s+/g, '-')}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-xl font-bold drop-shadow-lg" data-testid={`text-lookbook-title-${title.toLowerCase().replace(/\s+/g, '-')}`}>
              {title}
            </h3>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
